import { motion } from "motion/react";
import { useLocation } from "react-router";

type PageTransitionProps = {
  children: React.ReactNode;
};

/**
 * Лёгкая анимация появления контента при смене страницы.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
