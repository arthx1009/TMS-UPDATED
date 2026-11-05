import { motion } from "framer-motion";
import { Section } from "./UI";

type Person = {
  name: string;
  title: string;
  bio: string;
  badge: string;
  initials: string;
  avatar?: "female" | "male";
};

const EXECUTIVES: Person[] = [
  {
    name: "S Sahera Tazeen",
    title: "Founder & Managing Director",
    bio: "Shaping vision, driving strategic growth, and building long-term value through innovation, trusted partnerships, and a commitment to excellence.",
    badge: "Strategic Vision",
    initials: "ST",
    avatar: "female",
  },
  {
    name: "S Manoj Kumar",
    title: "Founder & Chief Executive Officer",
    bio: "Leading with purpose, fostering innovation, and delivering reliable technology solutions through excellence in execution and continuous improvement.",
    badge: "Executive Lead",
    initials: "MK",
    avatar: "male",
  },
];

const ADVISORS: Person[] = [
  {
    name: "Agishan J",
    title: "Advisory Partner",
    bio: "Brings deep expertise in transformation, technology leadership, and enterprise modernization.",
    badge: "Advisory",
    initials: "AJ",
  },
  {
    name: "Meenakshi R",
    title: "Growth Advisor",
    bio: "Shapes market strategy, partnerships, and scalable expansion with an emphasis on long-term value.",
    badge: "Growth",
    initials: "MR",
  },
  {
    name: "Saharika Teppa",
    title: "Innovation Advisor",
    bio: "Guides product innovation, research direction, and next-generation digital experiences.",
    badge: "Innovation",
    initials: "ST",
  },
];

function ProfileAvatar({ person }: { person: Person }) {
  if (!person.avatar) {
    return <span className="leadership-card__initials">{person.initials}</span>;
  }

  return (
    <img
      className={`leadership-card__portrait leadership-card__portrait--${person.avatar}`}
      src="/assets/leadership/Executive%20Profile%20Avatars.png"
      alt={`${person.avatar} executive profile`}
    />
  );
}

function LeadershipCard({ person, index }: { person: Person; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="leadership-card group"
    >
      <div className="leadership-card__content">
        <div className="leadership-card__profile">
          <div className={`leadership-card__avatar${person.avatar ? " leadership-card__avatar--executive" : ""}`}>
            <ProfileAvatar person={person} />
          </div>
          <span className="leadership-card__profile-divider" />
          <div className="leadership-card__badge">
            {person.badge}
          </div>
        </div>

        <h3 className="leadership-card__name">{person.name}</h3>
        <p className="leadership-card__title">{person.title}</p>
        <span className="leadership-card__separator" />
        <p className="leadership-card__bio">{person.bio}</p>
      </div>
      <div className="leadership-card__glow" />
    </motion.article>
  );
}

function LeadershipSectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="leadership-section-heading">
      <span className="leadership-section-heading__rule" />
      <h3 className="leadership-section-heading__title">{title}</h3>
      <span className="leadership-section-heading__rule" />
      <p className="leadership-section-heading__description">{description}</p>
    </div>
  );
}

export default function Leadership() {
  return (
    <Section id="leadership" className="leadership-page border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <div className="leadership-page__waves" aria-hidden="true">
        <img src="/assets/software-intelligence/Glowing Red Neon Wave Ribbons.png" alt="" className="leadership-page__wave leadership-page__wave--top" />
        <img src="/assets/software-intelligence/Glowing Red Neon Wave Ribbons.png" alt="" className="leadership-page__wave leadership-page__wave--bottom" />
      </div>

      <div className="leadership-page__content">
        <div className="leadership-page__intro">
          <div className="leadership-page__eyebrow">
            <span />
            <span>Leadership Team</span>
            <span />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="leadership-page__title"
          >
            Meet the leaders shaping TarvyX Mind Systems.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="leadership-page__description"
          >
            Meet the leaders driving innovation, strategy, and long-term growth at TarvyX Mind Systems.
          </motion.p>
        </div>

        <div className="leadership-page__group leadership-page__group--executive">
          <LeadershipSectionHeading
            title="Executive Leadership"
            description="Strategic minds guiding delivery, trust, and long-term growth across every engagement."
          />
          <div className="leadership-page__executives">
            {EXECUTIVES.map((person, index) => (
              <LeadershipCard key={person.name} person={person} index={index} />
            ))}
          </div>
        </div>

        <div className="leadership-page__group leadership-page__group--advisors">
          <LeadershipSectionHeading
            title="Board of Advisors"
            description="Experienced advisors supporting innovation, growth, and strategic direction."
          />
          <div className="leadership-page__advisors">
            {ADVISORS.map((person, index) => (
              <LeadershipCard key={person.name} person={person} index={index + 2} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
