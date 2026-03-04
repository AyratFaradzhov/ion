import { Link } from "react-router";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  ExternalLink,
  Users,
  Github,
  Code2,
  Palette,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useInView } from "../hooks/useInView";
import atvImage from "../../styles/atv.png";
import beritravelImage from "../../styles/beritravel.png";

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3.5-4.726 3.5-2.704 0-4.576-1.989-4.576-5.5 0-3.512 1.866-5.5 4.576-5.5 2.462 0 3.829 1.908 4.055 3.5h2.551c-.223-2.3-2.061-6.5-6.606-6.5-4.167 0-7 3.033-7 9.5s2.833 9.5 7 9.5c4.545 0 6.383-4.2 6.606-6.5h-2.506zm-6.726-9.5c-2.704 0-4.576 1.989-4.576 5.5 0 3.512 1.866 5.5 4.576 5.5 2.462 0 3.829-1.908 4.055-3.5h-2.551c-.223 2.3-2.061 6.5-6.606 6.5-4.167 0-7-3.033-7-9.5s2.833-9.5 7-9.5c4.545 0 6.383 4.2 6.606 6.5h2.506c-.226-1.592-1.593-3.5-4.055-3.5zM2 2h20v20h-20v-20z" />
    </svg>
  );
}

const TEAM_ROLES = [
  {
    name: "Разработчик",
    role: "Веб‑разработка и архитектура",
    gradient: "from-[#8b5cf6] to-[#06b6d4]",
    icon: Code2,
    link: { url: "https://github.com/AyratFaradzhov", label: "Проекты разработчика", type: "github" as const },
  },
  {
    name: "Дизайнер",
    role: "Дизайн и продукт",
    gradient: "from-[#06b6d4] to-[#8b5cf6]",
    icon: Palette,
    link: { url: "https://www.behance.net/dariad_o", label: "Работы дизайнера", type: "behance" as const },
  },
];

export function Home() {
  const { ref: teamSectionRef, inView: teamInView } = useInView();

  return (
    <div className="bg-[#fafafa]">
      {/* Hero Section - Light with floating gradients */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Animated gradient blobs - prepared for animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#8b5cf6]/30 via-[#a78bfa]/20 to-[#06b6d4]/30 rounded-full blur-3xl opacity-60 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#06b6d4]/30 to-[#8b5cf6]/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#a78bfa]/20 to-[#06b6d4]/20 rounded-full blur-2xl opacity-40" />
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left side - asymmetric layout */}
            <div className="lg:col-span-7 space-y-6 md:space-y-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8b5cf6]/10 to-[#06b6d4]/10 border border-[#8b5cf6]/20">
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-sm font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  Творческая продуктовая студия
                </span>
              </div>

              {/* Oversized Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[7rem] font-bold leading-[0.95] tracking-tight text-[#0a0a0a]">
                Создаём
                <br />
                <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#06b6d4] bg-clip-text text-transparent">
                  продукты
                </span>
                <br />с душой
              </h1>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl lg:text-2xl text-[#6b7280] max-w-xl leading-relaxed font-light">
                Проектируем и разрабатываем цифровые продукты,
                где технологии встречаются с креативностью и
                вниманием к деталям.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4 md:pt-6">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-6 py-4 md:px-8 md:py-5 text-base md:text-lg font-bold text-white shadow-2xl shadow-purple-500/30 transition-all hover:shadow-purple-500/40 hover:scale-105"
                >
                  Начать проект
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#0a0a0a] bg-white px-6 py-4 md:px-8 md:py-5 text-base md:text-lg font-bold text-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-white"
                >
                  Наш подход
                </Link>
              </div>
            </div>

            {/* Right side - visual element placeholder for animation */}
            <div className="lg:col-span-5 flex items-center justify-center hidden lg:flex">
              <div className="relative w-full h-[500px]">
                {/* Floating card elements - prepared for animation */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-3xl bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] shadow-2xl shadow-purple-500/30 transform rotate-6 hover:rotate-12 transition-transform" />
                <div className="absolute bottom-10 left-10 w-72 h-48 rounded-3xl bg-white border border-black/[0.08] shadow-xl p-6 hover:scale-105 transition-transform">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6]" />
                    <div className="h-4 w-3/4 bg-gradient-to-r from-[#e5e7eb] to-[#f3f4f6] rounded" />
                    <div className="h-4 w-1/2 bg-gradient-to-r from-[#e5e7eb] to-[#f3f4f6] rounded" />
                  </div>
                </div>
                <div className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-[#06b6d4]/40 to-[#8b5cf6]/40 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section - Light cards on light background */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: "Структура",
                desc: "Системный подход к каждому проекту",
              },
              {
                icon: Sparkles,
                title: "Прозрачность",
                desc: "Открытая коммуникация на всех этапах",
              },
              {
                icon: Target,
                title: "Качество",
                desc: "Внимание к деталям и стандартам",
              },
              {
                icon: ArrowRight,
                title: "Партнёрство",
                desc: "Тесная работа с вашей командой",
              },
            ].map((item, index) => (
              <div key={index} className="lg:col-span-3 group">
                <div className="rounded-3xl bg-white border border-black/[0.06] p-8 h-full shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-[#0a0a0a] mb-3 text-[20px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда: разработка и дизайн — карточки ролей с иконками и ссылками */}
      <section ref={teamSectionRef} className="py-20 md:py-28 lg:py-36 bg-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div
            className={`flex flex-col items-center text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
              teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fafafa] border border-black/[0.06] mb-6">
              <Users className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-sm font-semibold text-[#6b7280]">Разработка и дизайн в одной связке</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0a0a0a] mb-4 leading-tight">
              Наша{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                команда
              </span>
            </h2>
            <p className="text-base md:text-lg text-[#6b7280] max-w-xl">
              Разработчики и дизайнеры работают вместе — от идеи до запуска, без потерь на передачу.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
            {TEAM_ROLES.map((item, index) => (
              <div
                key={item.name}
                className="group/card flex flex-col items-center rounded-3xl bg-[#fafafa] border border-black/[0.06] p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
                style={{
                  transitionDelay: teamInView ? `${200 + index * 150}ms` : "0ms",
                  opacity: teamInView ? 1 : 0,
                  transform: teamInView
                    ? "translateY(0)"
                    : index === 0
                      ? "translateY(24px)"
                      : "translateY(24px)",
                }}
              >
                <div
                  className={`mb-6 flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-xl transition-transform duration-300 group-hover/card:scale-105`}
                >
                  <item.icon className="h-14 w-14 text-white" aria-hidden />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#0a0a0a] mb-1">{item.name}</h3>
                <p className="text-sm text-[#6b7280] mb-6">{item.role}</p>
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm font-semibold text-[#0a0a0a] shadow-sm transition-all duration-300 hover:border-[#8b5cf6]/40 hover:bg-gradient-to-r hover:from-[#8b5cf6]/10 hover:to-[#06b6d4]/10 hover:shadow-md"
                >
                  {item.link.type === "github" ? (
                    <Github className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  ) : (
                    <BehanceIcon className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  )}
                  <span>{item.link.label}</span>
                  <ExternalLink className="h-3.5 w-3 opacity-0 -translate-x-0.5 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                </a>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 md:mt-16 text-center transition-all duration-700 ease-out ${
              teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: teamInView ? "550ms" : "0ms" }}
          >
            <p className="text-base md:text-lg text-[#6b7280] max-w-2xl mx-auto mb-6">
              Совместные проекты и отдельные услуги: только дизайн или только разработка.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#06b6d4]/10 border border-[#8b5cf6]/20 px-6 py-3 text-sm font-semibold text-[#8b5cf6] hover:from-[#8b5cf6]/20 hover:to-[#06b6d4]/20 hover:gap-3 transition-all"
            >
              Подробнее о нас
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Наши кейсы — сразу на главной */}
      <section className="py-20 md:py-32 lg:py-40 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] mb-4 leading-tight">
              Наши{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                кейсы
              </span>
            </h2>
            <p className="text-base md:text-lg text-[#6b7280] max-w-2xl">
              Примеры проектов, которые мы сделали вместе: от дизайна до запуска или отдельными этапами.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Project 1: ATB GROUP */}
            <div className="lg:col-span-5 lg:col-start-2 group">
              <div className="relative rounded-3xl bg-white border border-black/[0.06] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
                  <ImageWithFallback 
                    src={atvImage}
                    alt="АТВ ГРУПП - дистрибьютор кондитерских изделий"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="inline-flex px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-bold text-[#0a0a0a]">Веб-сайт</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-[#0a0a0a] mb-3">АТВ ГРУПП</h3>
                  <p className="text-base text-[#6b7280] leading-relaxed mb-6">
                    Корпоративный сайт для дистрибьютора кондитерских изделий с каталогом продукции, информацией о компании и формами обратной связи.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "React", "Tailwind CSS", "CMS"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-black/[0.06] text-xs font-medium text-[#6b7280]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://groupatv.ru/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent group-hover:gap-3 transition-all"
                  >
                    <span>Посмотреть проект</span>
                    <ExternalLink className="w-4 h-4 text-[#8b5cf6]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: Beritravel */}
            <div className="lg:col-span-5 group">
              <div className="relative rounded-3xl bg-white border border-black/[0.06] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#06b6d4]/5 to-[#8b5cf6]/5">
                  <ImageWithFallback 
                    src={beritravelImage}
                    alt="Beritravel - поиск дешёвых авиабилетов"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="inline-flex px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-bold text-[#0a0a0a]">Сайт + Приложение</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-[#0a0a0a] mb-3">Beritravel</h3>
                  <p className="text-base text-[#6b7280] leading-relaxed mb-6">
                    Платформа для поиска и бронирования недорогих авиабилетов с удобным интерфейсом, фильтрами и сравнением предложений от разных авиакомпаний.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["React", "TypeScript", "API Integration", "Mobile App"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-black/[0.06] text-xs font-medium text-[#6b7280]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://avia.beritravel.ru/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6] bg-clip-text text-transparent group-hover:gap-3 transition-all"
                  >
                    <span>Посмотреть проект</span>
                    <ExternalLink className="w-4 h-4 text-[#06b6d4]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - Dark section for contrast */}
      <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-b from-[#0a0a0a] to-[#141414] text-white relative overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 blur-3xl" />

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          {/* Asymmetric header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Как мы
                <br />
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  работаем
                </span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-center">
              <p className="text-base md:text-lg lg:text-xl text-[#a1a1aa] leading-relaxed">
                Мы не гонимся за трендами и не идём на
                компромиссы. Каждое решение опирается на анализ,
                проверенные паттерны и понятные бизнес-цели.
              </p>
            </div>
          </div>

          {/* Dynamic grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Large card */}
            <div className="md:col-span-2 lg:col-span-6 lg:row-span-2">
              <div className="rounded-3xl bg-white/[0.03] border border-white/[0.1] p-12 h-full backdrop-blur-sm hover:bg-white/[0.05] transition-all">
                <div className="h-1 w-24 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-8" />
                <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Продуманная
                  <br />
                  архитектура
                </h3>
                <p className="text-lg text-[#a1a1aa] leading-relaxed mb-8">
                  Начинаем с логики, структуры данных и
                  системного проектирования, а не с визуального
                  слоя.
                </p>
                <div className="space-y-4">
                  {[
                    "Модульная архитектура",
                    "Чистый код",
                    "Масштабируемость",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]" />
                      <span className="text-sm text-[#a1a1aa]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smaller cards */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white/[0.03] border border-white/[0.1] p-8 h-full backdrop-blur-sm hover:bg-white/[0.05] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Чистая разработка
                </h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  Современный стек, стандарты кода и проверенные
                  паттерны.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white/[0.03] border border-white/[0.1] p-8 h-full backdrop-blur-sm hover:bg-white/[0.05] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Обоснованный UX
                </h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  Каждое решение имеет причину: логика,
                  сценарии, иерархия.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#06b6d4]/10 border border-[#8b5cf6]/20 p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Измеримые цели
                </h3>
                <p className="text-base text-[#a1a1aa] leading-relaxed">
                  Привязываем решения к реальным задачам —
                  конверсии, удобству, производительности.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Light with gradient accents */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] mb-4 lg:mb-6 leading-tight">
              Направления{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                работы
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[#6b7280] max-w-3xl mx-auto px-2">
              Работаем над цифровыми продуктами, где важны
              технологическая экспертиза и стратегическое
              мышление.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {[
              {
                title: "Продуктовые сайты",
                desc: "Маркетинговые платформы для B2B и SaaS продуктов.",
                tags: ["Next.js", "CMS", "SEO"],
                color: "from-[#8b5cf6] to-[#a78bfa]",
              },
              {
                title: "Внутренние платформы",
                desc: "Инструменты для команд и операций.",
                tags: ["React", "TypeScript", "API"],
                color: "from-[#06b6d4] to-[#8b5cf6]",
              },
              {
                title: "UX/UI дизайн",
                desc: "Дизайн-системы и интерфейсы.",
                tags: [
                  "Design Systems",
                  "Prototyping",
                  "Testing",
                ],
                color: "from-[#8b5cf6] to-[#06b6d4]",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`group ${index < 2 ? "lg:col-span-5" : "lg:col-span-6 lg:col-start-4"} ${index === 0 ? "lg:col-start-2" : ""}`}
              >
                <div className="relative rounded-3xl bg-[#fafafa] border border-black/[0.06] p-10 h-full overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  {/* Gradient glow on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${service.color} mb-6`}
                    >
                      <span className="text-xs font-bold text-white">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-[#0a0a0a] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-base text-[#6b7280] leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-white border border-black/[0.06] text-xs font-medium text-[#6b7280]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Light with visual timeline */}
      <section className="py-20 md:py-32 lg:py-40 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] mb-4 lg:mb-6">
              Процесс{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                работы
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[#6b7280] max-w-2xl mx-auto px-2">
              Прозрачный процесс с чёткими этапами и регулярной
              синхронизацией.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-2 lg:col-start-2 relative">
              <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-sm hover:shadow-xl hover:scale-105 transition-all h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                  Погружение
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Изучаем рынок, пользователей, требования
                </p>
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                <div className="w-6 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-2 relative">
              <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-sm hover:shadow-xl hover:scale-105 transition-all h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                  Проектирование
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Архитектура, технологии, планирование
                </p>
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                <div className="w-6 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-2 relative">
              <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-sm hover:shadow-xl hover:scale-105 transition-all h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                  Дизайн
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Сценарии, структура, UI-дизайн
                </p>
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                <div className="w-6 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-2 relative">
              <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-sm hover:shadow-xl hover:scale-105 transition-all h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                  Разработка
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Итеративная разработка, тестирование
                </p>
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                <div className="w-6 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-2 relative">
              <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-sm hover:shadow-xl hover:scale-105 transition-all h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold mb-4">
                  5
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                  Запуск
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Развёртывание, мониторинг, поддержка
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning - Light */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-10 lg:col-start-2">
              <div className="text-center mb-12 lg:mb-20">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] mb-4 lg:mb-6 leading-tight">
                  Мы работаем{" "}
                  <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                    не со всеми
                  </span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed px-2">
                  Мы фокусируемся на проектах, где ценятся
                  качество исполнения, продуманный подход и
                  прозрачная коммуникация.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    title: "Без хаотичных сроков",
                    desc: "Мы избегаем нереалистичных дедлайнов. Качество требует времени.",
                  },
                  {
                    title: "Не только про цену",
                    desc: "Если критерий — найти дшевле, мы не подходим.",
                  },
                  {
                    title: "Нужны понятные цели",
                    desc: "Проекты без чётких задач редко приводят к хорошему результату.",
                  },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="rounded-3xl bg-[#fafafa] border border-black/[0.06] p-10 h-full hover:bg-white hover:shadow-xl transition-all">
                      <div className="h-1 w-16 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-6" />
                      <h3 className="text-2xl font-bold text-[#0a0a0a] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-base text-[#6b7280] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Gradient section */}
      <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#06b6d4] text-white relative overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-6 md:space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Обсудим ваш проект
            </h2>
            <p className="text-base md:text-lg lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Расскажите о задаче, и мы честно оценим, подходим
              ли мы друг другу.
            </p>
            <div className="pt-4 md:pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 md:px-10 md:py-6 text-base md:text-xl font-bold text-[#8b5cf6] shadow-2xl hover:scale-105 transition-all"
              >
                Связаться
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}