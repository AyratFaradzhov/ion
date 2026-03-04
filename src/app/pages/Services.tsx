import { Link } from "react-router";
import { ArrowRight, Box, Calendar, Clock, Package, Palette } from "lucide-react";

const mainServices = [
  {
    icon: Package,
    title: "Стратегия и планирование",
    description: "Помогаем сформулировать цели продукта, приоритеты и реалистичный план: что делаем в первую очередь и за какой срок.",
    features: [
      "Анализ задачи и целевой аудитории",
      "Определение объёма работ и этапов",
      "Оценка сроков и рисков",
    ],
    color: "from-[#8b5cf6] to-[#a78bfa]",
  },
  {
    icon: Palette,
    title: "Дизайн интерфейсов",
    description: "Проектируем и рисуем интерфейсы: сценарии, прототипы, визуальный стиль. Делаем так, чтобы было понятно и удобно пользоваться.",
    features: [
      "UX-сценарии и структура",
      "UI-дизайн и дизайн-системы",
      "Прототипы для согласования",
    ],
    color: "from-[#06b6d4] to-[#8b5cf6]",
  },
  {
    icon: Box,
    title: "Разработка",
    description: "Верстаем и программируем сайты и веб-приложения. Используем привычный стек: React, TypeScript, при необходимости — бэкенд и базы данных.",
    features: [
      "Сайты и лендинги",
      "Веб-приложения и админки",
      "Интеграции и API",
    ],
    color: "from-[#a78bfa] to-[#06b6d4]",
  },
  {
    icon: ArrowRight,
    title: "Поддержка и доработки",
    description: "Подключаемся к уже существующему проекту: правки, новые блоки, обновления, консультации по коду и архитектуре.",
    features: [
      "Исправления и доработки",
      "Новые страницы и функции",
      "Обновления и оптимизация",
    ],
    color: "from-[#8b5cf6] to-[#06b6d4]",
  },
];

const pricing = [
  {
    type: "Лендинг",
    desc: "Одностраничный сайт с формой, блоками под контент, адаптивом и базовой аналитикой.",
    deadline: "2–3 недели",
    price: "от 80 000 ₽",
    gradient: "from-[#8b5cf6] to-[#a78bfa]",
  },
  {
    type: "Многостраничный сайт",
    desc: "Корпоративный или продуктовый сайт: несколько страниц, меню, CMS или статика, формы обратной связи.",
    deadline: "4–8 недель",
    price: "от 150 000 ₽",
    gradient: "from-[#a78bfa] to-[#06b6d4]",
  },
  {
    type: "Веб-приложение / MVP",
    desc: "Приложение с авторизацией, личным кабинетом, базовой логикой. Оценка под конкретную задачу.",
    deadline: "8–16 недель",
    price: "от 400 000 ₽",
    gradient: "from-[#06b6d4] to-[#8b5cf6]",
  },
  {
    type: "Дизайн (UI/UX)",
    desc: "Прототипы, макеты, дизайн-система или доработка существующего интерфейса без разработки.",
    deadline: "3–6 недель",
    price: "от 60 000 ₽",
    gradient: "from-[#8b5cf6] to-[#06b6d4]",
  },
  {
    type: "Поддержка и доработки",
    desc: "Правки на существующем сайте, добавление блоков, консультации. Оплата по задачам или по часам.",
    deadline: "по договорённости",
    price: "от 2 500 ₽ / час",
    gradient: "from-[#a78bfa] to-[#8b5cf6]",
  },
];

export function Services() {
  return (
    <div className="bg-[#fafafa]">
      {/* Hero */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-[#06b6d4]/15 to-[#a78bfa]/15 rounded-full blur-3xl" />

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0a0a0a] leading-tight mb-6 md:mb-8">
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  Услуги
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[#6b7280] leading-relaxed font-light">
                Делаем сайты, интерфейсы и небольшие веб-приложения. Ниже — чем занимаемся, ориентировочные сроки и цены. Итоговую оценку даём после обсуждения задачи.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Чем занимаемся */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-10 lg:mb-12">
            Чем занимаемся
          </h2>
          <div className="space-y-8">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 md:p-8 lg:p-12 relative z-10">
                  <div className="lg:col-span-4 space-y-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a]">{service.title}</h3>
                    <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="lg:col-span-8 space-y-3">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-xl bg-[#fafafa] border border-black/[0.04] px-5 py-4 hover:bg-white transition-all"
                      >
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${service.color} flex-shrink-0`} />
                        <span className="text-sm md:text-base text-[#0a0a0a] font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Цены и сроки */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] leading-tight mb-4">
              Сроки и{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                ориентировочные цены
              </span>
            </h2>
            <p className="text-base md:text-lg text-[#6b7280] max-w-2xl">
              Цифры ниже — для ориентира. Итоговая стоимость и срок зависят от объёма и сложности. После обсуждения задачи пришлём оценку без обязательств.
            </p>
          </div>

          <div className="space-y-6">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#fafafa] border border-black/[0.06] p-6 md:p-8 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
                  <div className="flex-1">
                    <div className={`inline-flex px-3 py-1.5 rounded-full bg-gradient-to-r ${item.gradient} mb-4`}>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{item.type}</span>
                    </div>
                    <p className="text-base text-[#6b7280] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 lg:gap-8 shrink-0">
                    <div className="flex items-center gap-2 text-[#0a0a0a]">
                      <Clock className="w-5 h-5 text-[#8b5cf6]" />
                      <span className="text-sm font-medium">Срок:</span>
                      <span className="font-semibold">{item.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0a0a0a]">
                      <Calendar className="w-5 h-5 text-[#06b6d4]" />
                      <span className="text-sm font-medium">Цена:</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-[#fafafa] border border-black/[0.06]">
            <p className="text-sm text-[#6b7280] leading-relaxed">
              <strong className="text-[#0a0a0a]">Важно:</strong> цены указаны в рублях, без НДС (ИП). Для сложных или нестандартных задач оценку делаем индивидуально. Договор и этапы работ обсудим после того, как поймём задачу.
            </p>
          </div>
        </div>
      </section>

      {/* Технологии */}
      <section className="py-20 md:py-32 lg:py-40 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] leading-tight">
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  Стек
                </span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-center">
              <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                В работе используем привычный набор: React, TypeScript, Tailwind, при необходимости — Node, базы данных, CMS.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { category: "Frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"], gradient: "from-[#8b5cf6] to-[#a78bfa]" },
              { category: "Backend и данные", tools: ["Node.js", "REST API", "PostgreSQL", "Prisma"], gradient: "from-[#a78bfa] to-[#06b6d4]" },
              { category: "Дизайн и прототипы", tools: ["Figma", "Прототипы", "Дизайн-системы"], gradient: "from-[#06b6d4] to-[#8b5cf6]" },
            ].map((stack, index) => (
              <div key={index} className="rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 hover:shadow-lg transition-all">
                <div className={`inline-flex px-3 py-1.5 rounded-full bg-gradient-to-r ${stack.gradient} mb-6`}>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{stack.category}</span>
                </div>
                <ul className="space-y-2">
                  {stack.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stack.gradient}`} />
                      <span className="text-sm text-[#0a0a0a] font-medium">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#06b6d4] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-6 md:space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Обсудим задачу
            </h2>
            <p className="text-base md:text-lg lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Напишите, что нужно сделать — подготовим оценку по срокам и стоимости без обязательств.
            </p>
            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 md:px-10 md:py-6 text-lg md:text-xl font-bold text-[#8b5cf6] shadow-2xl hover:scale-105 transition-all"
              >
                Написать нам
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
