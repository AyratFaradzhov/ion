import { Link } from "react-router";
import { Mail, MessageCircle, Phone, Send, Paperclip, X, FileText, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;

// API для обратной связи. Все URL должны быть HTTPS в production (избегаем Mixed Content).
// — VITE_API_BASE_URL — ваш бэкенд (POST /api/contact, /api/chat-message)
// — либо VITE_CONTACT_FORM_ENDPOINT / VITE_CHAT_FORM_ENDPOINT — Formspree и т.п.
const env = (import.meta as any).env || {};
const isProd = env.PROD === true;
let rawApi = (env.VITE_API_BASE_URL as string)?.trim()?.replace(/\/+$/, "") || "";
if (isProd && rawApi.startsWith("http://")) {
  rawApi = rawApi.replace(/^http:\/\//i, "https://");
}
const API_BASE_URL = rawApi || (isProd ? "" : "http://localhost:4000");
const CONTACT_FORM_ENDPOINT = (env.VITE_CONTACT_FORM_ENDPOINT as string)?.trim() || "";
const CHAT_FORM_ENDPOINT = (env.VITE_CHAT_FORM_ENDPOINT as string)?.trim() || "";

export function Contact() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [isChatSending, setIsChatSending] = useState(false);
  const [chatStatus, setChatStatus] = useState<"idle" | "sent" | "error">("idle");
  const [consentAccepted, setConsentAccepted] = useState(false);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const withRetry = async <T,>(fn: () => Promise<T>, retries = 2, delayMs = 1200): Promise<T> => {
    let attempt = 0;
    let lastError: unknown;
    while (attempt <= retries) {
      try {
        if (attempt > 0) {
          console.warn("[CONTACT FORM] retry attempt", attempt);
        }
        return await fn();
      } catch (err) {
        lastError = err;
        attempt += 1;
        if (attempt > retries) {
          break;
        }
        await sleep(delayMs);
      }
    }
    throw lastError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!consentAccepted) {
      setErrorMessage("Для отправки заявки необходимо согласие на обработку персональных данных.");
      setShowSuccessDialog(false);
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      console.log("[CONTACT FORM] submit", {
        hasFiles: files.length > 0,
        endpointType: CONTACT_FORM_ENDPOINT ? "external" : "api",
        apiBase: API_BASE_URL,
      });

      if (CONTACT_FORM_ENDPOINT) {
        await withRetry(async () => {
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("email", formData.email);
          formDataToSend.append("company", formData.company);
          formDataToSend.append("budget", formData.budget);
          formDataToSend.append("message", formData.message);
          formDataToSend.append("_subject", `Заявка с сайта: ${formData.name || formData.email}`);
          files.forEach((file) => formDataToSend.append("files", file));

          console.log("[CONTACT FORM] sending external request", { url: CONTACT_FORM_ENDPOINT });
          const response = await fetch(CONTACT_FORM_ENDPOINT, {
            method: "POST",
            body: formDataToSend,
          });
          console.log("[CONTACT FORM] external response", { status: response.status });
          if (!response.ok) {
            throw new Error(`External form error: ${response.status}`);
          }
        });
      } else {
        await withRetry(async () => {
          const filesMeta = files.map((f) => ({
            name: f.name,
            size: f.size,
            sizeReadable: formatSize(f.size),
            type: f.type,
          }));
          const filesPayload = await Promise.all(
            files.map(
              (file) =>
                new Promise<{ name: string; type: string; size: number; content: string }>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const result = reader.result as string | ArrayBuffer | null;
                    if (typeof result === "string") {
                      const base64 = result.includes(",") ? result.split(",")[1] : result;
                      resolve({ name: file.name, type: file.type, size: file.size, content: base64 });
                    } else if (result instanceof ArrayBuffer) {
                      const bytes = new Uint8Array(result);
                      let binary = "";
                      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
                      resolve({ name: file.name, type: file.type, size: file.size, content: btoa(binary) });
                    } else {
                      resolve({ name: file.name, type: file.type, size: file.size, content: "" });
                    }
                  };
                  reader.onerror = () => reject(new Error("File read error"));
                  reader.readAsDataURL(file);
                })
            )
          );

          const url = `${API_BASE_URL || ""}/api/contact`;
          console.log("[CONTACT FORM] sending API request", { url, hasFiles: files.length > 0 });
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, filesMeta, files: filesPayload }),
          });

          let data: any = null;
          try {
            data = await response.json();
          } catch {
            // ignore
          }
          console.log("[CONTACT FORM] API response", { status: response.status, data });

          const isError =
            !response.ok ||
            (data && (data.success === false || data.ok === false));

          if (isError) {
            const serverError = data?.error || `Server error ${response.status}`;
            const err: any = new Error(serverError);
            err.details = data;
            throw err;
          }
        });
      }

      setFormData({ name: "", email: "", company: "", budget: "", message: "" });
      setFiles([]);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("[CONTACT FORM] error", error);
      const err = error as any;
      const message: string = err?.message || "";
      const details = err?.details;

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setErrorMessage("Похоже, нет подключения к интернету. Проверьте сеть и попробуйте ещё раз.");
      } else if (details?.error === "Validation error") {
        setErrorMessage("Проверьте, что вы корректно заполнили имя, email и сообщение.");
      } else if (/timeout/i.test(message)) {
        setErrorMessage("Сервер долго не отвечает. Попробуйте ещё раз чуть позже или напишите на почту.");
      } else {
        setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз или напишите нам на почту.");
      }
      setShowSuccessDialog(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " Б";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " КБ";
    return (bytes / (1024 * 1024)).toFixed(1) + " МБ";
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles?.length) return;
    const list = Array.from(newFiles).filter((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024);
    setFiles((prev) => {
      const combined = [...prev, ...list].slice(0, MAX_FILES);
      return combined;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsChatOpen(true);
    setChatStatus("idle");
    setChatMessage("");
    // подтягиваем данные из формы, но позволяем их редактировать отдельно
    setChatName(formData.name || "");
    setChatEmail(formData.email || "");
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isChatSending) return;
    setIsChatSending(true);
    setChatStatus("idle");

    const name = chatName || formData.name;
    const email = chatEmail || formData.email;

    try {
      console.log("[CONTACT CHAT] submit", {
        hasName: Boolean(name),
        hasEmail: Boolean(email),
        endpointType: CHAT_FORM_ENDPOINT ? "external" : "api",
      });

      if (CHAT_FORM_ENDPOINT) {
        await withRetry(async () => {
          const fd = new FormData();
          fd.append("name", name);
          fd.append("email", email);
          fd.append("company", formData.company);
          fd.append("message", chatMessage.trim());
          fd.append("_subject", "Сообщение из чата на сайте");
          console.log("[CONTACT CHAT] sending external request", { url: CHAT_FORM_ENDPOINT });
          const response = await fetch(CHAT_FORM_ENDPOINT, { method: "POST", body: fd });
          console.log("[CONTACT CHAT] external response", { status: response.status });
          if (!response.ok) throw new Error(`External chat error: ${response.status}`);
        });
      } else {
        await withRetry(async () => {
          const url = `${API_BASE_URL || ""}/api/chat-message`;
          console.log("[CONTACT CHAT] sending API request", { url });
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              company: formData.company,
              message: chatMessage.trim(),
            }),
          });

          let data: any = null;
          try {
            data = await response.json();
          } catch {
            // ignore
          }
          console.log("[CONTACT CHAT] API response", { status: response.status, data });

          const isError =
            !response.ok ||
            (data && (data.success === false || data.ok === false));

          if (isError) {
            const serverError = data?.error || `Server error ${response.status}`;
            const err: any = new Error(serverError);
            err.details = data;
            throw err;
          }
        });
      }
      setChatStatus("sent");
      setChatMessage("");
    } catch (err) {
      console.error("[CONTACT CHAT] error", err);
      setChatStatus("error");
    } finally {
      setIsChatSending(false);
    }
  };

  return (
    <div className="bg-[#fafafa]">
      {/* Hero Section - Light with gradient */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-gradient-to-tl from-[#06b6d4]/15 to-[#a78bfa]/15 rounded-full blur-3xl" />
        
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0a0a0a] leading-tight mb-6 md:mb-8">
                Свяжитесь <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">с нами</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[#6b7280] leading-relaxed font-light">
                Расскажите о вашей задаче, и мы честно оценим, подходим ли мы для её решения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div className="lg:col-span-4 group">
              <div className="rounded-3xl bg-white border border-black/[0.06] p-8 md:p-10 h-full shadow-sm hover:shadow-xl transition-all">
                <div className="mb-6 md:mb-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] shadow-lg shadow-purple-500/25">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0a0a0a] mb-3">Напишите нам</h3>
                <p className="text-base text-[#6b7280] mb-6">hello@prism.studio</p>
                <a href="mailto:hello@prism.studio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] hover:gap-3 transition-all">
                  Отправить письмо →
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 group">
              <div className="rounded-3xl bg-white border border-black/[0.06] p-8 md:p-10 h-full shadow-sm hover:shadow-xl transition-all">
                <div className="mb-6 md:mb-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] shadow-lg shadow-cyan-500/25">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0a0a0a] mb-3">Назначить звонок</h3>
                <p className="text-base text-[#6b7280] mb-6">30-минутная вводная встреча</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] hover:gap-3 transition-all">
                  Смотреть календарь →
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 group">
              <button
                type="button"
                onClick={handleOpenChat}
                className="w-full text-left rounded-3xl bg-white border border-black/[0.06] p-8 md:p-10 h-full shadow-sm hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40 focus:ring-offset-2 focus:ring-offset-[#fafafa]"
              >
                <div className="mb-6 md:mb-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#06b6d4] shadow-lg shadow-purple-500/25">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0a0a0a] mb-3">Живой чат</h3>
                <p className="text-base text-[#6b7280] mb-6">Пн-Пт, 9:00-18:00 EST</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] group-hover:gap-3 transition-all">
                  Начать чат →
                </span>
              </button>
            </div>
          </div>

          {/* Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-black/[0.06] p-6 md:p-8 lg:p-12 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fafafa] border border-black/[0.04] mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6b7280]">
                    Заявка на проект
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-3">
                  Расскажите о задаче
                </h2>
                <p className="text-sm md:text-base text-[#6b7280] mb-8 leading-relaxed">
                  Чем подробнее вы опишете цель, сроки и ограничения, тем точнее мы сможем ответить и предложить формат работы.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">
                        Имя
                      </label>
                      <p className="text-xs text-[#9ca3af] mb-2">
                        Как к вам обращаться в переписке
                      </p>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 text-base text-[#0a0a0a] placeholder:text-[#9ca3af] focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">
                        Email
                      </label>
                      <p className="text-xs text-[#9ca3af] mb-2">
                        Куда прислать ответ и уточняющие вопросы
                      </p>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 text-base text-[#0a0a0a] placeholder:text-[#9ca3af] focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all"
                        placeholder="ivan@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Компания
                    </label>
                    <p className="text-xs text-[#9ca3af] mb-2">
                      Можно оставить пустым, если проект личный
                    </p>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 text-base text-[#0a0a0a] placeholder:text-[#9ca3af] focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all"
                      placeholder="Ваша компания"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Бюджет проекта
                    </label>
                    <p className="text-xs text-[#9ca3af] mb-2">
                      Диапазон поможет предложить реалистичный формат и объём работ
                    </p>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 text-base text-[#0a0a0a] focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all"
                    >
                      <option value="">Выберите диапазон</option>
                      <option value="<100k">До 100 000 ₽</option>
                      <option value="100k-300k">100 000 – 300 000 ₽</option>
                      <option value="300k-500k">300 000 – 500 000 ₽</option>
                      <option value="500k-1m">500 000 – 1 000 000 ₽</option>
                      <option value=">1m">Более 1 000 000 ₽</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Детали проекта
                    </label>
                    <p className="text-xs text-[#9ca3af] mb-2">
                      Цель, текущий статус, сроки, примеры того, что вам нравится
                    </p>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 text-base text-[#0a0a0a] placeholder:text-[#9ca3af] focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all resize-none"
                      placeholder="Расскажите о вашем проекте, целях, таймлайне..."
                    />
                  </div>

                  {/* Прикрепление файлов — drag & drop + анимация */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0a0a0a] mb-3">
                      Файлы (необязательно)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.fig,.xd,.zip"
                      onChange={handleFileInputChange}
                      className="sr-only"
                      aria-label="Выбрать файлы"
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`
                        group relative rounded-2xl border-2 border-dashed px-6 py-8 md:py-10 cursor-pointer
                        transition-all duration-300 ease-out overflow-hidden
                        ${isDragging
                          ? "border-[#8b5cf6] bg-[#8b5cf6]/5 scale-[1.01] shadow-lg shadow-purple-500/20"
                          : "border-black/[0.12] bg-[#fafafa] hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/[0.07] hover:shadow-md"
                        }
                      `}
                    >
                      {/* Фоновый градиент при drag */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-[#06b6d4]/10 opacity-0 transition-opacity duration-300 ${isDragging ? "opacity-100" : ""}`}
                        aria-hidden
                      />
                      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                        <div
                          className={`
                            flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl
                            bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] shadow-lg
                            transition-transform duration-300
                            ${isDragging ? "scale-110 rotate-6" : "group-hover:scale-110"}
                          `}
                          style={{ transitionProperty: "transform" }}
                        >
                          <Paperclip
                            className={`h-8 w-8 text-white transition-transform duration-300 ${isDragging ? "rotate-[-20deg] scale-110" : ""}`}
                            strokeWidth={2}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0a0a0a] mb-1">
                            {isDragging ? "Отпустите файлы здесь" : "Прикрепить файлы"}
                          </p>
                          <p className="text-sm text-[#6b7280]">
                            Перетащите сюда или нажмите · до {MAX_FILES} файлов, до {MAX_FILE_SIZE_MB} МБ каждый · PDF, DOC, изображения, макеты
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Список выбранных файлов */}
                    {files.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="flex items-center gap-3 rounded-xl bg-white border border-black/[0.06] px-4 py-3 shadow-sm animate-in fade-in-0 slide-in-from-top-2 duration-300"
                            style={{ animationDelay: `${index * 40}ms` }}
                          >
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20">
                              <FileText className="h-5 w-5 text-[#8b5cf6]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-[#0a0a0a]">{file.name}</p>
                              <p className="text-xs text-[#6b7280]">{formatSize(file.size)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f0f0f0] hover:text-[#0a0a0a] transition-colors"
                              aria-label="Удалить файл"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-black/[0.2] text-[#8b5cf6] focus:ring-[#8b5cf6]/30"
                    />
                    <span className="text-sm text-[#374151] leading-relaxed">
                      Я соглашаюсь на{" "}
                      <Link to="/privacy" className="text-[#8b5cf6] font-medium underline hover:no-underline">
                        обработку персональных данных
                      </Link>{" "}
                      в соответствии с политикой конфиденциальности (152-ФЗ).
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-8 py-5 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить сообщение
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              {/* What to Expect */}
              <div className="rounded-3xl bg-white border border-black/[0.06] p-10 shadow-sm">
                <h3 className="text-2xl font-bold text-[#0a0a0a] mb-8">Как будем работать</h3>
                <div className="space-y-8">
                  {[
                    {
                      step: "1",
                      title: "Ответ в течение 1-2 дней",
                      description: "Изучим ваше сообщение и ответим, подходим ли мы для задачи.",
                    },
                    {
                      step: "2",
                      title: "Обсуждение проекта",
                      description: "Разберёмся в требованиях, целях, ограничениях и контексте.",
                    },
                    {
                      step: "3",
                      title: "Оценка и предложение",
                      description: "Подготовим честную оценку сроков, стоимости и scope работ.",
                    },
                    {
                      step: "4",
                      title: "Старт работы",
                      description: "Если всё подходит — начинаем с погружения и проектирования.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-base font-bold text-white">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-base font-bold text-[#0a0a0a] mb-2">{item.title}</div>
                        <div className="text-sm text-[#6b7280] leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Light */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 lg:col-start-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] mb-4 lg:mb-6 leading-tight">
                Работаем с{" "}
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  разными компаниями
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#6b7280] leading-relaxed max-w-2xl mx-auto px-2">
                От стартапов до established бизнесов — главное, чтобы был фокус на качество и готовность работать вместе.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Диалог после отправки / ошибки — в фирменном стиле */}
      {(showSuccessDialog || errorMessage) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          {/* Подложка */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => {
              setShowSuccessDialog(false);
              setErrorMessage(null);
            }}
          />

          {/* Карточка */}
          <div className="relative w-full max-w-lg animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="absolute -inset-[1px] rounded-[1.9rem] bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#06b6d4] opacity-80 blur-[1px]" />
            <div className="relative rounded-[1.8rem] bg-white/95 shadow-2xl border border-white/60 px-6 py-6 md:px-8 md:py-7">
              {/* Верхняя часть: иконка + заголовок */}
              <div className="flex items-start gap-4 md:gap-5 mb-5">
                <div
                  className={`flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-lg shadow-purple-500/25 ${
                    showSuccessDialog
                      ? "bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]"
                      : "bg-gradient-to-br from-[#f97373] to-[#fb923c]"
                  }`}
                >
                  {showSuccessDialog ? (
                    <span className="text-xl md:text-2xl font-bold text-white">✓</span>
                  ) : (
                    <span className="text-xl md:text-2xl font-bold text-white">!</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-2xl font-bold text-[#0a0a0a] mb-1.5">
                    {showSuccessDialog ? "Заявка отправлена" : "Не удалось отправить заявку"}
                  </h3>
                  <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">
                    {showSuccessDialog
                      ? "Мы получили вашу заявку. Проверим детали и вернёмся с ответом в течение 1–2 рабочих дней."
                      : errorMessage ||
                        "Что-то пошло не так на стороне сервера. Попробуйте ещё раз позже или свяжитесь с нами по почте."}
                  </p>
                </div>
              </div>

              {/* Маленькая статусная строка */}
              <div className="mb-6 flex items-center gap-2 text-xs md:text-sm text-[#9ca3af]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    showSuccessDialog ? "bg-emerald-400" : "bg-amber-400"
                  } shadow-[0_0_0_3px_rgba(16,185,129,0.25)]`}
                />
                <span>
                  {showSuccessDialog ? "Статус: успешно отправлено" : "Статус: отправка не удалась"}
                </span>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                {!showSuccessDialog && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setShowSuccessDialog(false);
                    }}
                    className="inline-flex items-center justify-center rounded-2xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] hover:bg-[#f4f4f5] hover:border-black/[0.14] transition-all"
                  >
                    Закрыть
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessDialog(false);
                    setErrorMessage(null);
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all"
                >
                  Понятно
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Живой чат — отправка сообщения в Telegram */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              if (!isChatSending) {
                setIsChatOpen(false);
                setChatStatus("idle");
              }
            }}
          />
          <div className="relative w-full max-w-lg animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="absolute -inset-[1px] rounded-[1.9rem] bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#06b6d4] opacity-80 blur-[1px]" />
            <div className="relative rounded-[1.8rem] bg-white/95 shadow-2xl border border-white/60 px-6 py-6 md:px-7 md:py-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a1a1aa] mb-1">
                    Живой чат
                  </p>
                  <h3 className="text-lg md:text-2xl font-bold text-[#0a0a0a]">
                    Напишите первый месседж
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-[#6b7280]">
                    Сообщение прилетит в наш Telegram-бот. Мы ответим вам как можно скорее.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!isChatSending) {
                      setIsChatOpen(false);
                      setChatStatus("idle");
                    }
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#f4f4f5] transition-all"
                  aria-label="Закрыть чат"
                >
                  ×
                </button>
              </div>

              {/* Данные отправителя — редактируемые поля в чате */}
              <div className="mb-4 rounded-2xl bg-[#fafafa] border border-black/[0.04] px-4 py-3 text-xs md:text-sm text-[#6b7280]">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 text-[11px] uppercase tracking-[0.12em] text-[#a1a1aa]">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={chatName}
                      onChange={(e) => setChatName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      className="w-full rounded-xl border border-black/[0.06] bg-white px-3 py-2 text-xs md:text-sm text-[#0a0a0a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/30"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 text-[11px] uppercase tracking-[0.12em] text-[#a1a1aa]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={chatEmail}
                      onChange={(e) => setChatEmail(e.target.value)}
                      placeholder="Почта для ответа"
                      className="w-full rounded-xl border border-black/[0.06] bg-white px-3 py-2 text-xs md:text-sm text-[#0a0a0a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/30"
                    />
                  </div>
                </div>
                {formData.company && (
                  <p className="mt-2 text-[11px] md:text-xs text-[#9ca3af]">
                    Компания: <span className="text-[#6b7280]">{formData.company}</span>
                  </p>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="space-y-4">
                <div className="rounded-2xl border border-black/[0.06] bg-[#fafafa] px-4 py-3">
                  <textarea
                    rows={4}
                    className="w-full bg-transparent text-sm md:text-base text-[#0a0a0a] placeholder:text-[#9ca3af] resize-none focus:outline-none"
                    placeholder="Кратко опишите, с чем нужен help..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    disabled={isChatSending}
                  />
                </div>

                {chatStatus === "sent" && (
                  <p className="text-xs md:text-sm text-emerald-600">
                    Сообщение отправлено в наш Telegram. Мы скоро выйдем с вами на связь.
                  </p>
                )}
                {chatStatus === "error" && (
                  <p className="text-xs md:text-sm text-rose-600">
                    Не получилось отправить сообщение. Попробуйте ещё раз или напишите нам на почту.
                  </p>
                )}

                <div className="flex justify-between items-center gap-3">
                  <span className="text-[10px] md:text-xs text-[#a1a1aa]">
                    Отправка через Telegram-бот ИОН Студии
                  </span>
                  <button
                    type="submit"
                    disabled={isChatSending || !chatMessage.trim()}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-4 py-2.5 text-xs md:text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isChatSending ? "Отправляем..." : "Отправить в чат"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
