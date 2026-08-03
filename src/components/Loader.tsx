import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoUrl from "../assets/tms-logo.png";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--color-ink)" }}
        >
          <motion.img
            src={logoUrl}
            alt="TMS"
            className="h-14 w-auto mb-8"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="w-48 h-px overflow-hidden relative" style={{ background: "var(--hairline-10)" }}>
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg, var(--color-electric), var(--color-brand))" }}
            />
          </div>
          <span className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-text-muted)" }}>
            {Math.round(progress * 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
