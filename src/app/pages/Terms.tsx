import { Link } from "react-router";

const OPERATOR_NAME = 'ООО «Т Трэвел»';
const INN = '9722031597';
const SITE_NAME = 'ИОН Студия';

export function Terms() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-[#06b6d4]/10 to-[#8b5cf6]/10 rounded-full blur-3xl" />
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] mb-4">
            Пользовательское соглашение
          </h1>
          <p className="text-base text-[#6b7280]">
            Условия использования сайта {SITE_NAME} и направления заявок.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="prose prose-neutral max-w-none text-[#0a0a0a] space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">1. Общие положения</h2>
              <p className="text-[#374151] leading-relaxed">
                Настоящее соглашение регулирует отношения между владельцем сайта — {OPERATOR_NAME} (ИНН {INN}) — и пользователем при использовании сайта, отправке заявок и обращений через формы связи и чат.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">2. Использование сайта</h2>
              <p className="text-[#374151] leading-relaxed">
                Использование сайта означает принятие условий настоящего соглашения. Материалы сайта предназначены для ознакомления с услугами студии. Запрещается копирование, распространение и коммерческое использование материалов без письменного согласия правообладателя.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">3. Заявки и обратная связь</h2>
              <p className="text-[#374151] leading-relaxed">
                Отправка заявки через форму или чат не является заключением договора. Мы свяжемся с вами для уточнения запроса и подготовки предложения. Договор на оказание услуг заключается в порядке, определённом отдельным соглашением или офертой.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">4. Персональные данные</h2>
              <p className="text-[#374151] leading-relaxed">
                Обработка персональных данных осуществляется в соответствии с{' '}
                <Link to="/privacy" className="text-[#8b5cf6] font-medium hover:underline">
                  Политикой конфиденциальности
                </Link>
                . Отправляя заявку, вы подтверждаете согласие на обработку указанных данных.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">5. Ограничение ответственности</h2>
              <p className="text-[#374151] leading-relaxed">
                Сайт предоставляется «как есть». Мы не несём ответственности за временную недоступность, сбои передачи данных по независящим от нас причинам, а также за действия пользователей за пределами нашего сайта.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">6. Изменения</h2>
              <p className="text-[#374151] leading-relaxed">
                Мы вправе изменять условия соглашения. Актуальная версия всегда доступна на этой странице. Продолжение использования сайта после изменений означает принятие новых условий.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">7. Контакты</h2>
              <p className="text-[#374151] leading-relaxed">
                По вопросам, связанным с использованием сайта и условиями соглашения, обращайтесь через раздел «Контакты» или на контактный email, указанный на сайте.
              </p>
            </div>

            <p className="text-sm text-[#6b7280] pt-4">
              Дата публикации: 2025 г.
            </p>
          </div>

          <div className="mt-12 flex gap-6">
            <Link
              to="/privacy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] hover:gap-3 transition-all"
            >
              Политика конфиденциальности
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
            >
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
