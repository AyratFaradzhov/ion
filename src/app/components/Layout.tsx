import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { ArrowRight } from "lucide-react";
import { IonLogo } from "./IonLogo";
import { ScrollToTop } from "./ScrollToTop";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { BackToTop } from "./BackToTop";
import { PageTransition } from "./PageTransition";
import { getSEO } from "../seo";

const SITE_BASE_URL = "https://ionstudio.ru";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    const { title, description } = getSEO(location.pathname);
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    const canonical = document.getElementById("canonical-link");
    if (canonical) canonical.setAttribute("href", `${SITE_BASE_URL}${location.pathname === "/" ? "" : location.pathname}`);
    const ogUrl = document.getElementById("og-url");
    if (ogUrl) ogUrl.setAttribute("content", `${SITE_BASE_URL}${location.pathname === "/" ? "" : location.pathname}`);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <ScrollToTop />
      <ScrollProgressBar />
      <BackToTop />
      {/* Navigation - Light with blur */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 md:py-0 md:h-20 md:grid md:grid-cols-12 md:gap-6">
            {/* Logo */}
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <IonLogo className="h-5 w-5 text-white" />
                </div>
                <span className="text-base font-bold text-[#0a0a0a] tracking-tight">ИОН Студия</span>
              </Link>
            </div>

            {/* Navigation Links - wrap on small screens */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:col-span-8 md:gap-8 w-full md:w-auto order-last md:order-none basis-full md:basis-auto">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-[#0a0a0a]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Главная
              </Link>
              <Link
                to="/work"
                className={`text-sm font-medium transition-colors ${
                  isActive("/work")
                    ? "text-[#0a0a0a]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Подход
              </Link>
              <Link
                to="/services"
                className={`text-sm font-medium transition-colors ${
                  isActive("/services")
                    ? "text-[#0a0a0a]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Услуги
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "text-[#0a0a0a]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                О команде
              </Link>
            </div>

            {/* CTA - aligned right on desktop */}
            <div className="md:col-span-2 flex justify-end w-full md:w-auto">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
              >
                Связаться
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[5.5rem] md:pt-20">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Footer - Dark section for contrast */}
      <footer className="border-t border-black/[0.06] bg-gradient-to-b from-[#0a0a0a] to-[#141414] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-16 lg:mb-24">
            {/* Brand */}
            <div className="lg:col-span-5">
              <Link to="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <IonLogo className="h-5 w-5 text-white" />
                </div>
                <span className="text-base font-bold text-white tracking-tight">ИОН Студия</span>
              </Link>
              <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-md">
                Студия разработки. Разработчики и дизайнеры работают вместе над каждым проектом.
              </p>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-sm font-semibold text-white mb-6">Навигация</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/work" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    Подход
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    О команде
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-6">Соцсети</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar — юридическая информация и копирайт */}
          <div className="pt-8 border-t border-white/[0.1] flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">
                  ООО «Т Трэвел»
                </p>
                <p className="text-xs text-[#71717a]">
                  ИНН 9722031597 · С 2022 года
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <Link to="/privacy" className="text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors">
                  Конфиденциальность
                </Link>
                <Link to="/terms" className="text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors">
                  Условия
                </Link>
              </div>
            </div>
            <p className="text-xs text-[#71717a]">
              © 2022–{new Date().getFullYear()} ИОН Студия
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
