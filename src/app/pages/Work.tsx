import { ArrowRight, Code2, Sparkles, Users, Zap } from "lucide-react";

export function Work() {
  return (
    <div className="bg-[#fafafa]">
      {/* Hero Section - Light with gradient accents */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 bg-white relative overflow-hidden">
        {/* Floating gradient blobs */}
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-[#06b6d4]/15 to-[#a78bfa]/15 rounded-full blur-3xl" />
        
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8b5cf6]/10 to-[#06b6d4]/10 border border-[#8b5cf6]/20 mb-6 md:mb-8">
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-sm font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  Наш подход
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0a0a0a] leading-tight mb-6 md:mb-8">
                Как мы<br />
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  работаем
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[#6b7280] leading-relaxed font-light">
                Мы не обещаем впечатляющих кейсов и революционных результатов. Мы фокусируемся на качественном исполнении, продуманной архитектуре и прозрачном процессе.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles - Light cards */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-20">
            <div className="lg:col-span-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] mb-4 lg:mb-6">
                Что для нас <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">важно</span>
              </h2>
              <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
                Вместо громких обещаний — конкретные принципы, на которых строится наша работа.
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Principle 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 rounded-3xl bg-white border border-black/[0.06] p-6 md:p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all">
              <div className="lg:col-span-4 space-y-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] shadow-lg shadow-purple-500/25">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#0a0a0a]">Чистая архитектура</h3>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                  Проектируем структуру данных, API и компоненты так, чтобы код был понятным, расширяемым и поддерживаемым. Используем проверенные паттерны, а не изобретаем велосипед.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Модульная архитектура", "Читаемый код", "Продуманные API", "Типизация и валидация"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] mt-2 flex-shrink-0" />
                      <span className="text-base text-[#0a0a0a] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 rounded-3xl bg-white border border-black/[0.06] p-6 md:p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all">
              <div className="lg:col-span-4 space-y-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] shadow-lg shadow-cyan-500/25">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#0a0a0a]">Внимание к деталям</h3>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                  Качество не в эффектных презентациях, а в проработке edge cases, обработке ошибок, производительности, доступности и тестировании.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Code review процесс", "Обработка граничных случаев", "Оптимизация производительности", "Тестирование функционала"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] mt-2 flex-shrink-0" />
                      <span className="text-base text-[#0a0a0a] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 rounded-3xl bg-white border border-black/[0.06] p-6 md:p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all">
              <div className="lg:col-span-4 space-y-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#06b6d4] shadow-lg shadow-purple-500/25">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#0a0a0a]">Прозрачный процесс</h3>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                  Вы всегда понимаете, на каком этапе проект, что сделано, что в работе, какие есть риски и сколько времени осталось. Без сюрпризов.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Регулярные синхронизации", "Открытый доступ к задачам", "Честная оценка сроков", "Документация решений"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#06b6d4] mt-2 flex-shrink-0" />
                      <span className="text-base text-[#0a0a0a] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - Dark section for contrast */}
      <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-b from-[#0a0a0a] to-[#141414] text-white relative overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-r from-[#8b5cf6]/30 to-[#06b6d4]/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-l from-[#06b6d4]/20 to-[#8b5cf6]/20 blur-3xl" />
        
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Как строится<br />
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  работа
                </span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-center">
              <p className="text-base md:text-lg lg:text-xl text-[#a1a1aa] leading-relaxed">
                Мы не работаем по фиксированным шаблонам. Процесс адаптируется под задачу, но всегда включает эти этапы.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {[
              {
                number: "01",
                title: "Погружение",
                description: "Разбираемся в задаче, целях, пользователях, ограничениях. Задаём вопросы, уточняем требования, собираем контекст.",
              },
              {
                number: "02",
                title: "Проектирование",
                description: "Продумываем архитектуру, выбираем технологии, планируем структуру, оцениваем риски и сложность.",
              },
              {
                number: "03",
                title: "Реализация",
                description: "Работаем итеративно: разрабатываем, тестируем, показываем результат, собираем обратную связь, корректируем.",
              },
              {
                number: "04",
                title: "Запуск и поддержка",
                description: "Разворачиваем, настраиваем мониторинг, исправляем проблемы, помогаем с адаптацией, планируем развитие.",
              },
            ].map((step, index) => (
              <div key={index} className="lg:col-span-3">
                <div className="rounded-3xl bg-white/[0.05] border border-white/[0.1] p-8 h-full backdrop-blur-sm hover:bg-white/[0.08] transition-all">
                  <div className="text-sm text-[#a1a1aa] mb-6 font-mono">{step.number}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Value - Light background */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-10 lg:col-start-2 rounded-3xl bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5 border border-[#8b5cf6]/20 p-8 md:p-12 lg:p-16">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a0a0a] leading-relaxed mb-8 lg:mb-12 max-w-4xl">
                Мы не гонимся за портфолио с десятками проектов. Мы выбираем задачи, где можем сделать действительно хорошо — где есть время разобраться, продумать и качественно реализовать.
              </div>
              <p className="text-lg text-[#6b7280] leading-relaxed max-w-3xl">
                Это означает, что мы работаем не со всеми. Мы отказываемся от проектов с хаотичными дедлайнами, размытыми целями или фокусом только на цене. Нам важно, чтобы у клиента было понимание, что качественный результат требует времени и вовлечённости.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Gradient */}
      <section className="py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Хотите обсудить проект?
            </h2>
            <p className="text-base md:text-lg lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Расскажите о задаче, и мы честно оценим, подходим ли мы для её решения.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-6 text-xl font-bold text-[#8b5cf6] shadow-2xl hover:scale-105 transition-all"
            >
              Связаться
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
