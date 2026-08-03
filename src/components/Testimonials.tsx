import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionTitle } from "./UI";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const TESTIMONIALS = [
  { quote: "TMS delivered our AI platform ahead of schedule, with a level of rigor our internal team hadn't seen before.", name: "VP Engineering", org: "Enterprise SaaS Client" },
  { quote: "The confidentiality practices gave our legal team full confidence to move forward with a sensitive automotive build.", name: "Director of Product", org: "Automotive OEM" },
  { quote: "Their research group's embeddings work directly improved our search relevance by a wide margin.", name: "Head of Data", org: "Retail Platform" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[i];

  return (
    <Section className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle eyebrow="Testimonials" title="Experience Center" align="center" />
      <div className="max-w-2xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, rotateY: 25, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -25, scale: 0.95 }}
            whileHover={{ y: -3, boxShadow: "0 28px 80px rgba(56, 189, 248, 0.16)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-3xl p-10 text-center hover-card"
            style={{ perspective: 1000 }}
          >
            <p className="font-display text-[19px] md:text-[22px] leading-relaxed text-white/90">"{t.quote}"</p>
            <div className="mt-6 font-mono text-[12px] tracking-wide text-white/50">{t.name} · {t.org}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-3 mt-6">
          <button onClick={prev} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"><HiChevronLeft /></button>
          <button onClick={next} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"><HiChevronRight /></button>
        </div>
      </div>
    </Section>
  );
}
