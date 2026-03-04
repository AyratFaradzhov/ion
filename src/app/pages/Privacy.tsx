import { Link } from "react-router";

const OPERATOR_NAME = 'ООО «Т Трэвел»';
const INN = '9722031597';
const SITE_NAME = 'ИОН Студия';

export function Privacy() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-[#8b5cf6]/10 to-[#06b6d4]/10 rounded-full blur-3xl" />
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-base text-[#6b7280]">
            Документ действует в отношении сайта {SITE_NAME} и определяет порядок обработки персональных данных (152-ФЗ).
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="prose prose-neutral max-w-none text-[#0a0a0a] space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">1. Оператор персональных данных</h2>
              <p className="text-[#374151] leading-relaxed">
                Оператором персональных данных является <strong>{OPERATOR_NAME}</strong>, ИНН {INN}.
                Юридический адрес и контактные данные для обращений по вопросам персональных данных можно уточнить по запросу на контактную почту, указанную на сайте.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">2. Какие данные мы обрабатываем</h2>
              <p className="text-[#374151] leading-relaxed mb-2">
                При заполнении формы обратной связи, заявки на проект или при использовании чата мы можем получать:
              </p>
              <ul className="list-disc pl-6 text-[#374151] space-y-1">
                <li>имя (или иное обращение);</li>
                <li>адрес электронной почты;</li>
                <li>название компании (при указании);</li>
                <li>текст сообщения и прикреплённые файлы;</li>
                <li>технические данные (IP, тип устройства, cookies при использовании аналитики — если подключена).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">3. Цели обработки</h2>
              <p className="text-[#374151] leading-relaxed">
                Персональные данные используются исключительно для ответа на запросы, подготовки коммерческих предложений, заключения и исполнения договоров, а также для улучшения работы сайта (в объёме, разрешённом настройками аналитики).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">4. Правовые основания</h2>
              <p className="text-[#374151] leading-relaxed">
                Обработка осуществляется на основании согласия субъекта персональных данных (при отправке формы), а также в случаях, когда обработка необходима для исполнения договора или для законных интересов оператора в объёме, не нарушающем права субъекта.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">5. Срок хранения и уничтожение</h2>
              <p className="text-[#374151] leading-relaxed">
                Данные хранятся в течение срока, необходимого для целей обработки (ответ на заявку, ведение переговоров, исполнение договора), но не дольше срока, установленного действующим законодательством. По истечении срока данные уничтожаются или обезличиваются.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">6. Передача данных третьим лицам</h2>
              <p className="text-[#374151] leading-relaxed">
                Данные из форм могут передаваться в сервисы доставки сообщений (почтовый сервер, мессенджеры) исключительно для обработки вашего запроса. Мы не передаём персональные данные третьим лицам в маркетинговых целях без отдельного согласия.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">7. Ваши права</h2>
              <p className="text-[#374151] leading-relaxed mb-2">
                Вы вправе запросить доступ к своим данным, их исправление, удаление или ограничение обработки, а также отозвать согласие. Для этого достаточно направить запрос на контактный email, указанный на сайте. Мы рассмотрим обращение в срок, установленный законом.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">8. Защита данных</h2>
              <p className="text-[#374151] leading-relaxed">
                Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения или блокирования.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">9. Изменение политики</h2>
              <p className="text-[#374151] leading-relaxed">
                Актуальная версия политики конфиденциальности размещена на этой странице. При существенных изменениях мы укажем дату обновления. Продолжение использования сайта после публикации изменений означает принятие обновлённой политики.
              </p>
            </div>

            <p className="text-sm text-[#6b7280] pt-4">
              Дата публикации: 2025 г.
            </p>
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] hover:gap-3 transition-all"
            >
              ← Вернуться к контактам
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
