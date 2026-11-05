import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionTitle } from "./UI";
import {
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineBeaker,
  HiOutlineSparkles,
} from "react-icons/hi2";

const ITEMS = [
  {
    icon: HiOutlineLightBulb,
    title: "Who We Are",
    body: "An engineering studio building AI, software, automotive and quantum systems.",
  },
  {
    icon: HiOutlineEye,
    title: "Mission",
    body: "Turn ambitious ideas into production-grade intelligent systems, without cutting corners on rigor.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Vision",
    body: "Become the trusted engineering partner behind the next decade's defining technology products.",
  },
  {
    icon: HiOutlineBeaker,
    title: "Research",
    body: "Dedicated R&D across ML, embeddings and quantum mechanisms — published and applied in the field.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Engineering Excellence",
    body: "Delivering robust, scalable, and high-performance solutions through modern engineering practices and technical excellence.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Global Delivery",
    body: "Distributed delivery pods serving across India and on time process.",
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="about" wave="about">
      <SectionTitle
        eyebrow="What is TarvyX Mind Systems"
        title="A modern engineering partner built for excellence."
        sub="TMS delivers thoughtful, high-impact technology solutions through disciplined engineering, deep expertise, and a commitment to performance."
      />
      <div className="about-hub">
        <div className="about-hub__visual" aria-label="TMS technology hub">
          <img
            className="about-hub__image"
            src="/assets/software-intelligence/Neon TMS AI Chip Hub.png"
            alt="TMS AI chip surrounded by technology panels"
          />
        </div>
        <svg
          className="about-hub__connections"
          viewBox="0 0 1200 520"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <circle className="about-hub__orbit" cx="600" cy="260" r="205" />
          <path className="about-hub__connector" d="M365 88 C392 88 405 112 421 145" />
          <path className="about-hub__connector" d="M380 260 H395" />
          <path className="about-hub__connector" d="M365 432 C392 432 405 408 421 375" />
          <path className="about-hub__connector" d="M835 88 C808 88 795 112 779 145" />
          <path className="about-hub__connector" d="M820 260 H805" />
          <path className="about-hub__connector" d="M835 432 C808 432 795 408 779 375" />
          {[
            [421, 145],
            [395, 260],
            [421, 375],
            [779, 145],
            [805, 260],
            [779, 375],
          ].map(([cx, cy]) => (
            <g className="about-hub__node" key={`${cx}-${cy}`}>
              <circle className="about-hub__node-glow" cx={cx} cy={cy} r="8" />
              <circle className="about-hub__node-core" cx={cx} cy={cy} r="4" />
            </g>
          ))}
        </svg>
        {ITEMS.map((item, index) => {
          const Icon = item.icon;
          const side = index < 3 ? "left" : "right";

          return (
            <motion.article
              key={item.title}
              className={`about-hub__item about-hub__item--${side}`}
              style={{ gridArea: `item-${index + 1}` }}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : (index % 3) * 0.06 }}
            >
              <span className="about-hub__icon" aria-hidden="true">
                <Icon />
              </span>
              <div className="about-hub__copy">
                <h3>
                  <span className="about-hub__number">{String(index + 1).padStart(2, "0")} / </span>
                  {item.title}
                </h3>
                <p>{item.body}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
