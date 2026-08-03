import { motion } from "framer-motion";
import { Section, SectionTitle, GlassCard } from "./UI";
import { HiOutlineLightBulb, HiOutlineEye, HiOutlineShieldCheck, HiOutlineGlobeAlt, HiOutlineBeaker, HiOutlineSparkles } from "react-icons/hi2";

const CARDS = [
  { icon: HiOutlineLightBulb, title: "Who We Are", body: "An engineering studio building AI, software, automotive and quantum systems for enterprise clients." },
  { icon: HiOutlineEye, title: "Mission", body: "Turn ambitious ideas into production-grade intelligent systems, without cutting corners on rigor." },
  { icon: HiOutlineSparkles, title: "Vision", body: "Become the trusted engineering partner behind the next decade's defining technology products." },
  { icon: HiOutlineBeaker, title: "Research", body: "Dedicated R&D across ML, embeddings and quantum mechanisms — published and applied in the field." },
  { icon: HiOutlineShieldCheck, title: "Engineering Excellence", body: "Delivering robust, scalable, and high-performance solutions through modern engineering practices and technical excellence." },
  { icon: HiOutlineGlobeAlt, title: "Global Delivery", body: "Distributed delivery pods serving clients across India, the Gulf, Europe and North America." },
];

export default function About() {
  return (
    <Section id="about">
      <SectionTitle
        eyebrow="What is TarvyX Mind Systems"
        title="A modern engineering partner built for excellence."
        sub="TMS delivers thoughtful, high-impact technology solutions through disciplined engineering, deep expertise, and a commitment to performance."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <GlassCard className="h-full group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-colors duration-300 group-hover:border-transparent"
                style={{ borderColor: "var(--hairline-10)", background: "rgba(var(--color-electric-rgb), 0.08)" }}>
                <c.icon className="w-5 h-5" style={{ color: "var(--color-electric)" }} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{c.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
