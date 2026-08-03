import { motion } from "framer-motion";
import { Section, SectionTitle } from "./UI";

const STEPS = [
  { title: "Discovery & Planning", desc: "Understand goals, constraints and confidentiality needs." },
  { title: "Requirement Analysis", desc: "Translate goals into a scoped technical brief." },
  { title: "Architecture", desc: "Design a system that scales and stays maintainable." },
  { title: "Development", desc: "Build in focused sprints with continuous visibility." },
  { title: "Testing", desc: "Rigorous QA, security review and performance checks." },
  { title: "Deployment", desc: "Ship to production with zero-downtime rollout." },
  { title: "Support", desc: "Ongoing monitoring, iteration and premium support." },
];

export default function Process() {
  return (
    <Section id="process">
      <SectionTitle eyebrow="Our Process" title="Seven steps, one continuous thread." sub="Each engagement follows the same disciplined sequence — from first conversation to long-term support." />
      <div className="relative">
        <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/10" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="hidden lg:block absolute top-6 left-0 right-0 h-px origin-left"
          style={{ background: "linear-gradient(90deg, var(--color-electric), var(--color-brand), var(--color-hover))" }}
        />
        <div className="grid lg:grid-cols-7 gap-8 lg:gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(56, 189, 248, 0.12)" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group hover-card"
            >
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center font-mono text-xs mb-4 relative z-10" style={{ color: "var(--color-electric)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display font-semibold text-[15px] mb-1.5">{s.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
