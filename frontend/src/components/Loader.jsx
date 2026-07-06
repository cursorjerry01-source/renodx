import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "../data";

export const Loader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="page-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030008]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-[#B026FF]/15 blur-[130px]" />

          <div className="relative flex items-center justify-center">
            <div
              className="absolute h-28 w-28 rounded-full animate-spin"
              style={{
                animationDuration: "1.3s",
                background: "conic-gradient(from 0deg, transparent 15%, #B026FF 55%, #E35BFF 75%, transparent 95%)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
            />
            <motion.img
              src={ASSETS.logo}
              alt="SYSTEM O-JDEV"
              className="h-20 w-20 rounded-full object-cover drop-shadow-[0_0_40px_rgba(176,38,255,0.8)]"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="font-display font-bold text-white text-sm sm:text-base mt-8"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            SYSTEM O-JDEV
          </motion.div>

          <div className="mt-6 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #B026FF, #E35BFF)", boxShadow: "0 0 14px rgba(214,70,255,0.8)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-[#E35BFF]/80 mt-5 animate-blink">
            Inicializando sistema
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
