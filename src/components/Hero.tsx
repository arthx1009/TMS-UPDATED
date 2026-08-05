import { motion } from "framer-motion";
import Scene3D from "./Scene3D";
import { MagneticButton } from "./UI";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 -mt-8 lg:-mt-10">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass mb-7">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-cyan)" }} />
          </motion.div>

          <motion.h1 variants={item} className="font-display font-semibold text-[clamp(38px,5.6vw,68px)] leading-[1.04] tracking-tight">
            Building <span className="text-gradient">AI</span> software,
            <br />
            automotive & <span className="text-gradient">quantum</span>
            <br />
            technologies.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-[16px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            TarvyX Mind Systems (TMS) is a product engineering company building intelligent technologies across AI, Automotive, Embedded Systems, Quantum Computing, and advanced software.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Services
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center gap-6 flex-wrap">
            {["AI-Powered Innovation", "Secure & Confidential", "Research-Driven"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-electric)" }} />
                <span className="font-mono text-[11px] tracking-wide uppercase text-white/50">{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative h-[380px] md:h-[520px] -mt-4 md:-mt-8"
        >
          <Scene3D />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="w-px h-8" style={{ background: "linear-gradient(180deg, var(--color-electric), transparent)" }} />
      </motion.div>
    </section>
  );
}
