import { useEffect, useRef, useState } from "react";

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -80px 0px",
  threshold: 0.15,
};

export function useInView(options: Partial<IntersectionObserverInit> = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const opts = { ...defaultOptions, ...options };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, opts);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
