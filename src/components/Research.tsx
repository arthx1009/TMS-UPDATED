import { motion } from "framer-motion";
import { Section, SectionTitle, GlassCard } from "./UI";

const PAPERS = [
  { tag: "Machine Learning", title: "Efficient Embedding Retrieval for Domain-Specific Corpora", year: "2025" },
  { tag: "Quantum", title: "Hybrid Classical-Quantum Optimization for Logistics Routing", year: "2025" },
  { tag: "Automotive AI", title: "Low-Latency Sensor Fusion for Embedded ADAS Pipelines", year: "2024" },
  { tag: "Applied AI", title: "Confidential Fine-Tuning Workflows for Enterprise LLMs", year: "2024" },
];

export default function Research() {
  return (
    <Section id="research" className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle
        eyebrow="Research & Innovation"
        title="R&D that feeds directly into delivery."
        sub="Our research group publishes and applies work across ML, quantum mechanisms and embedded intelligence."
      />
      <div className="grid md:grid-cols-2 gap-5">
        {PAPERS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <GlassCard hoverLift className="flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-electric)" }}>{p.tag} · {p.year}</span>
                <h3 className="font-display font-medium text-[16px] mt-2">{p.title}</h3>
              </div>
              <span className="text-white/40 text-xl group-hover:text-white shrink-0">→</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
