import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { motion } from "framer-motion";

const scrollPositions = new Map<string, number>();

const ScrollManager = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigationType = useNavigationType(); // PUSH | POP | REPLACE
  const pathname = location.pathname;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SAVE scroll position when leaving page
    return () => {
      scrollPositions.set(pathname, window.scrollY);
    };
  }, [pathname]);

  useEffect(() => {
    // RESTORE scroll when going back
    if (navigationType === "POP") {
      const y = scrollPositions.get(pathname) ?? 0;
      window.scrollTo({ top: y, behavior: "instant" });
    } else {
      // NEW navigation → scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, navigationType]);

  return (
    <motion.div
      ref={wrapperRef}
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollManager;
