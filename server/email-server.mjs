import "dotenv/config";
import http from "http";
import nodemailer from "nodemailer";
import { createLogger } from "./utils/logger.js";

const log = createLogger("EMAIL SERVER");

const PORT = Number(process.env.PORT) || 4000;
const ORIGIN = process.env.FRONTEND_ORIGIN || "https://ion-studio.ru";
const MAX_PAYLOAD_MB = Number(process.env.MAX_PAYLOAD_MB) || 20; // максимум ~20 МБ по умолчанию
const MAX_PAYLOAD_BYTES = MAX_PAYLOAD_MB * 1024 * 1024;
const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS) || 15_000;

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
        log.error("Telegram sendDocument (contact) failed", {
          filename: f.name,
          status: docResponse.status,
          body,
        });
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

function getClientIp(req) {
  const h = req.headers || {};
  return (
    h["cf-connecting-ip"] ||
    h["x-real-ip"] ||
    (Array.isArray(h["x-forwarded-for"]) ? h["x-forwarded-for"][0] : (h["x-forwarded-for"] || "")).split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    ""
  );
}

function validateContactPayload(body) {
  const errors = [];
  if (!body || typeof body !== "object") {
    errors.push("Body must be an object");
    return errors;
  }
  const { name, email, message } = body;
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required");
  }
  if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errors.push("Valid email is required");
  }
  if (!message || typeof message !== "string" || message.trim().length < 5) {
    errors.push("Message is too short");
  }
  return errors;
}

function validateChatPayload(body) {
  const errors = [];
  if (!body || typeof body !== "object") {
    errors.push("Body must be an object");
    return errors;
  }
  const { message } = body;
  if (!message || typeof message !== "string" || message.trim().length < 2) {
    errors.push("Message is too short");
  }
  return errors;
}

function sendJson(res, statusCode, data) {
  const payload = {
    success: statusCode >= 200 && statusCode < 300,
    ...data,
  };
  if (!Object.prototype.hasOwnProperty.call(payload, "ok")) {
    payload.ok = payload.success;
  }
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ORIGIN,
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const ip = getClientIp(req);
  const { method, url, headers } = req;
  const start = Date.now();

  log.info("Incoming request", {
    method,
    url,
    ip,
    userAgent: headers["user-agent"],
    cfRay: headers["cf-ray"],
  });

  // Per-request timeout
  const timeout = setTimeout(() => {
    log.error("Request timeout", { method, url, ip, ms: REQUEST_TIMEOUT_MS });
    if (!res.headersSent) {
      sendJson(res, 504, { error: "Request timeout" });
    }
    try {
      req.destroy();
    } catch {
      // ignore
    }
  }, REQUEST_TIMEOUT_MS);

  res.on("finish", () => {
    clearTimeout(timeout);
    log.info("Response sent", {
      method,
      url,
      ip,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (method === "GET" && url === "/api/health") {
    log.info("Health check", { ip });
    sendJson(res, 200, { status: "ok" });
    return;
  }

  if (method === "POST" && url === "/api/contact") {
    try {
      const body = await parseJsonBody(req);
      log.info("Contact request body", {
        ip,
        hasFiles: Array.isArray(body?.files) && body.files.length > 0,
        hasFilesMeta: Array.isArray(body?.filesMeta) && body.filesMeta.length > 0,
      });

      const errors = validateContactPayload(body);
      if (errors.length > 0) {
        log.warn("Contact validation failed", { ip, errors });
        sendJson(res, 400, { error: "Validation error", details: errors });
        return;
      }

      // Отправляем письмо и Telegram асинхронно — но логируем результат
      sendContactEmail(body)
        .then(() => {
          log.info("Email sent successfully", { ip, email: body.email });
        })
        .catch((err) => {
          log.error("Async email error", { ip, error: String(err?.message || err) });
        });

      sendTelegramContactNotification(body)
        .then(() => {
          log.info("Telegram contact notification sent", { ip });
        })
        .catch((err) => {
          log.error("Async telegram (contact) error", { ip, error: String(err?.message || err) });
        });

      sendJson(res, 200, {});
    } catch (err) {
      log.error("Contact handler error", {
        ip,
        error: String(err?.message || err),
      });
      sendJson(res, 500, { error: "Email send failed" });
    }
    return;
  }

  if (method === "POST" && url === "/api/chat-message") {
    try {
      const body = await parseJsonBody(req);
      log.info("Chat request body", {
        ip,
        hasName: Boolean(body?.name),
        hasEmail: Boolean(body?.email),
      });

      const errors = validateChatPayload(body);
      if (errors.length > 0) {
        log.warn("Chat validation failed", { ip, errors });
        sendJson(res, 400, { error: "Validation error", details: errors });
        return;
      }

      await sendTelegramMessage(body);
      log.info("Chat telegram message sent", { ip });
      sendJson(res, 200, {});
    } catch (err) {
      log.error("Chat handler error", { ip, error: String(err?.message || err) });
      sendJson(res, 500, { error: "Telegram send failed" });
    }
    return;
  }

  log.warn("Not found", { method, url, ip });
  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  log.info(`Email server listening`, { port: PORT, origin: ORIGIN });
});

