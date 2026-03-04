import "dotenv/config";
import http from "http";
import nodemailer from "nodemailer";

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const MAX_PAYLOAD_MB = Number(process.env.MAX_PAYLOAD_MB) || 20; // максимум ~20 МБ по умолчанию
const MAX_PAYLOAD_BYTES = MAX_PAYLOAD_MB * 1024 * 1024;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.yandex.ru",
  port: Number(process.env.SMTP_PORT) || 465,
  secure:
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE === "true"
      : true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendContactEmail(payload) {
  const { name, email, company, budget, message, filesMeta, files } = payload;

  const subject = `Новое сообщение с сайта ИОН Студия${company ? ` — ${company}` : ""}`;

  const textLines = [
    `Имя: ${name || "—"}`,
    `Email: ${email || "—"}`,
    `Компания: ${company || "—"}`,
    `Бюджет: ${budget || "—"}`,
    "",
    "Сообщение:",
    message || "—",
    "",
    "Файлы:",
  ];

  if (Array.isArray(filesMeta) && filesMeta.length > 0) {
    for (const f of filesMeta) {
      textLines.push(`• ${f.name} (${f.sizeReadable || f.size} / ${f.type || "unknown"})`);
    }
  } else {
    textLines.push("— без вложений (в списке только имена файлов из формы)");
  }

  const attachments =
    Array.isArray(files) && files.length > 0
      ? files
          .filter((f) => f && typeof f.content === "string" && f.content.length)
          .map((f) => ({
            filename: f.name || "attachment",
            content: Buffer.from(f.content, "base64"),
            contentType: f.type || undefined,
          }))
      : undefined;

  const mailOptions = {
    from: `"ИОН Студия" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject,
    text: textLines.join("\n"),
    attachments,
  };

  await transporter.sendMail(mailOptions);
}

async function sendTelegramMessage(payload) {
  const { name, email, company, message } = payload;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram is not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing)");
  }

  const lines = [
    "💬 Новый запрос в живой чат",
    "",
    `Имя: ${name || "—"}`,
    `Email: ${email || "—"}`,
    `Компания: ${company || "—"}`,
    "",
    "Сообщение:",
    message || "—",
  ];

  const text = lines.join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

async function sendTelegramContactNotification(payload) {
  const { name, email, company, budget, message, filesMeta, files } = payload;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  const lines = [
    "🧾 Новая заявка с формы контактов",
    "",
    `Имя: ${name || "—"}`,
    `Email: ${email || "—"}`,
    `Компания: ${company || "—"}`,
    `Бюджет: ${budget || "—"}`,
    "",
    "Сообщение:",
    message || "—",
    "",
    "Файлы:",
  ];

  if (Array.isArray(filesMeta) && filesMeta.length > 0) {
    for (const f of filesMeta) {
      lines.push(`• ${f.name} (${f.sizeReadable || f.size} / ${f.type || "unknown"})`);
    }
  } else {
    lines.push("— без вложений");
  }

  const text = lines.join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage (contact) failed: ${response.status} ${body}`);
  }

  // Если есть файлы — отправляем каждый как document
  if (Array.isArray(files) && files.length > 0) {
    for (const f of files) {
      if (!f || typeof f.content !== "string" || !f.content.length) continue;

      const buffer = Buffer.from(f.content, "base64");
      const blob = new Blob([buffer], {
        type: f.type || "application/octet-stream",
      });

      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("document", blob, f.name || "file");

      const docResponse = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
        method: "POST",
        body: formData,
      });

      if (!docResponse.ok) {
        const body = await docResponse.text();
        console.error(
          `Telegram sendDocument (contact) failed for ${f.name}: ${docResponse.status} ${body}`
        );
      }
    }
  }
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > MAX_PAYLOAD_BYTES) {
        req.socket.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        const json = data ? JSON.parse(data) : {};
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/contact") {
    try {
      const body = await parseJsonBody(req);
      // Отправляем письмо асинхронно, чтобы ответ пользователю приходил сразу
      sendContactEmail(body).catch((err) => {
        console.error("Async email error:", err);
      });
      // Дублируем заявку в Telegram асинхронно
      sendTelegramContactNotification(body).catch((err) => {
        console.error("Async telegram (contact) error:", err);
      });

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ORIGIN,
      });
      res.end(JSON.stringify({ ok: true }));
    } catch (err) {
      console.error("Email error:", err);
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ORIGIN,
      });
      res.end(JSON.stringify({ ok: false, error: "Email send failed" }));
    }
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat-message") {
    try {
      const body = await parseJsonBody(req);
      await sendTelegramMessage(body);

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ORIGIN,
      });
      res.end(JSON.stringify({ ok: true }));
    } catch (err) {
      console.error("Telegram error:", err);
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ORIGIN,
      });
      res.end(JSON.stringify({ ok: false, error: "Telegram send failed" }));
    }
    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ORIGIN,
  });
  res.end(JSON.stringify({ ok: false, error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});

