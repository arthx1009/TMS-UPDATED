import { motion } from "framer-motion";
import { Section } from "./UI";

const REASONS = [
  "Research Driven",
  "Industry Experts",
  "Latest Technologies",
  "Premium Support",
  "Real Projects",
  "Enterprise Experience",
  "Secure",
  "AI Features",
];

export default function WhyChoose() {
  return (
    <Section id="why" className="why-choose-section border-t" style={{ borderColor: "rgba(57, 184, 255, 0.12)" }}>
      <div className="why-choose-section__content">
        <div className="why-choose-section__heading">
          <p className="why-choose-section__eyebrow">Why Choose TMS</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="why-choose-section__title"
          >
            Eight reasons enterprise teams pick us back.
          </motion.h2>
          <span className="why-choose-section__underline" aria-hidden="true" />
        </div>

        <div className="why-choose-section__grid">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.045, duration: 0.45 }}
              className="why-choose-item"
            >
              <img
                className="why-choose-item__logo"
                src={`/assets/why-choose/reason-${String(index + 1).padStart(2, "0")}.png`}
                alt={`${reason} 3D logo`}
                loading="lazy"
                decoding="async"
              />
              <p className="why-choose-item__label">
                <span className="why-choose-item__number">{String(index + 1).padStart(2, "0")}</span>
                <span>{reason}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
