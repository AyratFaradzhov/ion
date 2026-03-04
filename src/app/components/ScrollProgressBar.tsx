import { useEffect, useState } from "react";

/**
 * Тонкая полоска прогресса скролла вверху страницы (градиент).
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[#e5e7eb] z-[100]"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }}
      />
    </div>
  );
}
