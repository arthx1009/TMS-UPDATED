import { motion } from "framer-motion";
import { Section, SectionTitle } from "./UI";

const REASONS = [
  "Research Driven", "Industry Experts", "Latest Technologies",
  "Premium Support", "Real Projects", "Enterprise Experience",
  "Secure", "AI Features",
];

export default function WhyChoose() {
  return (
    <Section id="why" className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle eyebrow="Why Choose TMS" title="Eight reasons enterprise teams pick us back." align="center" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REASONS.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(56, 189, 248, 0.12)" }}
            className="glass glass-card hover-card rounded-2xl p-5 text-center group"
          >
            <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-3 font-mono text-[11px]" style={{ background: "rgba(var(--color-electric-rgb), 0.1)", color: "var(--color-electric)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <span className="text-sm font-medium">{r}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
