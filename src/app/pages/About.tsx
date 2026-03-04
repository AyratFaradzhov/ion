import { Link } from "react-router";
import { Heart, Shield, TrendingUp, Users, Github, Code2, Palette } from "lucide-react";

const team = [
  {
    name: "Разработчик",
    role: "Веб‑разработка и архитектура",
    skills: ["React", "TypeScript", "Node.js", "API", "Базы данных"],
    gradient: "from-[#8b5cf6] to-[#06b6d4]",
    icon: Code2,
    link: {
      url: "https://github.com/AyratFaradzhov",
      label: "Проекты разработчика",
      type: "github" as const,
    },
  },
  {
    name: "Дизайнер",
    role: "Дизайн и продукт",
    skills: ["UX/UI", "Прототипирование", "Дизайн-системы", "Исследования"],
    gradient: "from-[#06b6d4] to-[#8b5cf6]",
    icon: Palette,
    link: {
      url: "https://www.behance.net/dariad_o",
      label: "Работы дизайнера",
      type: "behance" as const,
    },
  },
];

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3.5-4.726 3.5-2.704 0-4.576-1.989-4.576-5.5 0-3.512 1.866-5.5 4.576-5.5 2.462 0 3.829 1.908 4.055 3.5h2.551c-.223-2.3-2.061-6.5-6.606-6.5-4.167 0-7 3.033-7 9.5s2.833 9.5 7 9.5c4.545 0 6.383-4.2 6.606-6.5h-2.506zm-6.726-9.5c-2.704 0-4.576 1.989-4.576 5.5 0 3.512 1.866 5.5 4.576 5.5 2.462 0 3.829-1.908 4.055-3.5h-2.551c-.223 2.3-2.061 6.5-6.606 6.5-4.167 0-7-3.033-7-9.5s2.833-9.5 7-9.5c4.545 0 6.383 4.2 6.606 6.5h2.506c-.226-1.592-1.593-3.5-4.055-3.5zM2 2h20v20h-20v-20z" />
    </svg>
  );
}

const values = [
  {
    icon: TrendingUp,
    title: "Качество над скоростью",
    description: "Делаем правильно, а не быстро.",
    gradient: "from-[#8b5cf6] to-[#a78bfa]",
  },
  {
    icon: Shield,
    title: "Честность",
    description: "Прямо говорим о сроках, рисках и возможностях.",
    gradient: "from-[#a78bfa] to-[#06b6d4]",
  },
  {
    icon: Users,
    title: "Прозрачность",
    description: "Вы всегда в курсе, на каком этапе проект.",
    gradient: "from-[#06b6d4] to-[#8b5cf6]",
  },
  {
    icon: Heart,
    title: "Развитие",
    description: "Учимся на каждом проекте и следим за технологиями.",
    gradient: "from-[#8b5cf6] to-[#06b6d4]",
  },
];

export function About() {
  return (
    <div className="bg-[#fafafa]">
      {/* Hero */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-gradient-to-tl from-[#06b6d4]/15 to-[#a78bfa]/15 rounded-full blur-3xl" />

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0a0a0a] leading-tight mb-6 md:mb-8">
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  О нас
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[#6b7280] leading-relaxed font-light">
                Мы — небольшая команда разработчиков и дизайнеров, которые работают вместе над каждым проектом. Собираем сайты и интерфейсы от идеи до релиза, опираясь на понятный процесс и качество результата.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team block — фото, имена, роли, навыки */}
      <section className="py-20 md:py-32 lg:py-40 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] mb-4 lg:mb-6">
            Наша{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              команда
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#6b7280] max-w-2xl mb-12 lg:mb-16">
            Разработчики и дизайнеры работают в одной связке: без лишних слоёв, с прямой коммуникацией и общим фокусом на задаче.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {team.map((person) => (
              <div
                key={person.name}
                className="group/card rounded-3xl bg-white border border-black/[0.06] p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Роль: градиент + иконка (без фото) */}
                <div
                  className={`mb-6 flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${person.gradient} shadow-lg ring-2 ring-transparent ring-offset-2 ring-offset-white transition-all duration-500 ease-out group-hover/card:ring-[#8b5cf6]/40 group-hover/card:shadow-[0_0_0_1px_rgba(139,92,246,0.2),0_20px 40px_-12px_rgba(139,92,246,0.25)] group-hover/card:scale-[1.03]`}
                >
                  <person.icon className="h-12 w-12 text-white transition-transform duration-300 group-hover/card:scale-110" aria-hidden />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0a0a0a] mb-2">
                  {person.name}
                </h3>
                <p className="text-[#6b7280] font-medium mb-6">{person.role}</p>
                <p className="text-sm font-semibold text-[#0a0a0a] mb-3">Навыки</p>
                <div className="flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-black/[0.06] text-xs font-medium text-[#6b7280]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {person.link && (
                  <a
                    href={person.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-6 inline-flex items-center gap-2 rounded-xl border border-black/[0.08] bg-[#fafafa] px-4 py-3 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:border-[#8b5cf6]/40 hover:bg-gradient-to-r hover:from-[#8b5cf6]/10 hover:to-[#06b6d4]/10 hover:shadow-md hover:shadow-purple-500/10"
                  >
                    {person.link.type === "github" ? (
                      <Github className="h-5 w-5 text-[#0a0a0a] transition-transform duration-300 group-hover/link:scale-110 group-hover/link:-translate-y-0.5" />
                    ) : (
                      <BehanceIcon className="h-5 w-5 text-[#0a0a0a] transition-transform duration-300 group-hover/link:scale-110 group-hover/link:-translate-y-0.5" />
                    )}
                    <span>{person.link.label}</span>
                    <span className="ml-0.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как мы работаем — один короткий блок */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] leading-tight mb-8">
              Как мы{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                работаем
              </span>
            </h2>
            <div className="rounded-3xl bg-[#fafafa] border border-black/[0.06] p-8 md:p-10">
              <p className="text-lg md:text-xl text-[#0a0a0a] leading-relaxed mb-6">
                Мы не агентство с десятками проектов. Работаем над небольшим числом задач, чтобы каждому уделить внимание. Погружаемся в задачу, честно оцениваем сроки и держим слово.
              </p>
              <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                Разработка и дизайн в одной связке — меньше потерь при передаче и быстрее результат.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="py-20 md:py-32 lg:py-40 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] mb-12 lg:mb-16">
            Наши{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              принципы
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white border border-black/[0.06] p-6 md:p-8 h-full hover:shadow-xl transition-all"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} shadow-lg mb-6`}
                >
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a] mb-3">{value.title}</h3>
                <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">
                  {value.description}
                </p>
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
              Обсудим проект?
            </h2>
            <p className="text-base md:text-lg lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Напишите нам — ответим и честно скажем, сможем ли помочь.
            </p>
            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 md:px-10 md:py-6 text-lg md:text-xl font-bold text-[#8b5cf6] shadow-2xl hover:scale-105 transition-all"
              >
                Связаться
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
