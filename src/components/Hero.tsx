import { motion } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlineCpuChip, HiOutlineShieldCheck } from "react-icons/hi2";
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

const BENEFITS = [
  { label: "AI-Powered Innovation", icon: HiOutlineCpuChip },
  { label: "Secure & Confidential", icon: HiOutlineShieldCheck },
  { label: "Research-Driven", icon: HiOutlineAcademicCap },
];

export default function Hero() {
  return (
    <section id="top" className="hero-reference relative min-h-[100svh] flex items-center pt-16 lg:pt-8 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden">
      <div className="hero-reference__layout grid lg:grid-cols-[0.94fr_1.06fr] gap-8 xl:gap-10 items-center w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="hero-reference__copy relative z-10 -mt-8 lg:-mt-10">
          <motion.div variants={item} className="hero-reference__eyebrow mb-7">
            <span className="hero-reference__badge">TMS</span>
            <span className="hero-reference__eyebrow-label">Product Engineering Company</span>
          </motion.div>

          <motion.h1 variants={item} className="hero-reference__title font-display font-semibold text-[clamp(38px,5.6vw,68px)] leading-[1.04] tracking-tight">
            Building <span className="hero-reference__highlight">AI software,</span>
            <br />
            Automotive &
            <br />
            <span className="hero-reference__accent">Quantum technologies.</span>
          </motion.h1>

          <motion.p variants={item} className="hero-reference__description mt-6 max-w-lg text-[16px] leading-relaxed">
            TarvyX Mind Systems (TMS) is a product engineering company building intelligent technologies across AI, Automotive, Embedded Systems, Quantum Computing, and advanced software.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton className="hero-reference__cta" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Services
              <span className="hero-reference__cta-arrow" aria-hidden="true">→</span>
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="hero-reference__benefits mt-6 flex items-center gap-3 flex-wrap">
            {BENEFITS.map(({ label, icon: Icon }) => (
              <div key={label} className="hero-reference__benefit">
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="hero-reference__visual relative h-[420px] md:h-[580px] lg:h-[820px] -mt-4 md:-mt-8"
        >
          <Scene3D />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="hero-reference__scroll absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="hero-reference__scroll-chevron" aria-hidden="true">⌄</motion.span>
        <span className="hero-reference__scroll-chevron hero-reference__scroll-chevron--second" aria-hidden="true">⌄</span>
      </motion.div>
    </section>
  );
}
