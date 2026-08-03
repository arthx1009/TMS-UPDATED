import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Section } from "./UI";

const STATS = [
  { value: 500, suffix: "+", label: "Projects" },
  { value: 100, suffix: "+", label: "Secure & Confidential" },
  { value: 199, suffix: "+", label: "Technologies" },
  { value: 150, suffix: "+", label: "Research Works" },
  { value: 99, suffix: "%", label: "Satisfaction" },
  { value: 24, suffix: "/7", label: "Support" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize at 0
    el.textContent = `0${suffix}`;

    const duration = 2200; // 2.2s within 2-2.5s requirement

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      let t = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(t);
      const current = Math.round(eased * value);
      if (el) el.textContent = `${current}${suffix}`;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Ensure exact final value and cleanup
        if (el) el.textContent = `${value}${suffix}`;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          rafRef.current = requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });

    io.observe(el);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [value, suffix]);

  return <span ref={ref} className="font-display font-bold text-[clamp(26px,3vw,38px)] text-gradient">0{suffix}</span>;
}

export default function TrustBar() {
  return (
    <Section className="!py-16 border-y" style={{ borderColor: "var(--hairline-06)" }}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-white/35 mb-10"
      >
        Trusted for delivery, discretion & scale
      </motion.p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
            className="text-center"
          >
            <AnimatedNumber value={s.value} suffix={s.suffix} />
            <div className="font-mono text-[10px] tracking-widest uppercase mt-1.5 text-white/45">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
