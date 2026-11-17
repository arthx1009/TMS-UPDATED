import { motion } from "framer-motion";
import { Section } from "./UI";

type Person = {
  name: string;
  title: string;
  initials: string;
  description: string;
  avatar?: "female" | "male";
};

const EXECUTIVES: Person[] = [
  {
    name: "MANOJ KUMAR S",
    title: "MANAGING DIRECTOR & CHIEF EXECUTIVE OFFICER",
    initials: "MK",
    description: "Leading organizational strategy, innovation, and long-term business growth.",
    avatar: "male",
  },
  {
    name: "SAHERA TAZEEN S",
    title: "DIRECTOR",
    initials: "ST",
    description: "Supporting corporate strategy, leadership, and organizational development.",
    avatar: "female",
  },
];

const BOARD_GROUPS: { title: string; members: Person[] }[] = [
  {
    title: "Executive Directors",
    members: [
      {
        name: "PRIYANKA S",
        title: "EXECUTIVE DIRECTOR",
        initials: "PS",
        description: "Supporting executive operations and strategic business growth.",
      },
      {
        name: "SAHARIKA T",
        title: "EXECUTIVE DIRECTOR",
        initials: "ST",
        description: "Driving strategic initiatives and operational excellence.",
      },
    ],
  },
  {
    title: "Non-Executive Directors",
    members: [
      {
        name: "SAFA SALSABEEL Z",
        title: "NON-EXECUTIVE DIRECTOR",
        initials: "SZ",
        description: "Supporting corporate governance and strategic oversight.",
      },
      {
        name: "DEVI SREE N B",
        title: "NON-EXECUTIVE DIRECTOR",
        initials: "DB",
        description: "Contributing independent perspectives to board-level decisions.",
      },
    ],
  },
  {
    title: "Independent Directors",
    members: [
      {
        name: "MAHAMMED BAASHIK",
        title: "INDEPENDENT DIRECTOR",
        initials: "MB",
        description: "Providing objective guidance and independent board oversight.",
      },
      {
        name: "AGISHAN J",
        title: "INDEPENDENT DIRECTOR",
        initials: "AJ",
        description: "Supporting effective governance and strategic decision-making.",
      },
      {
        name: "SURYA BHAGAWAN",
        title: "INDEPENDENT DIRECTOR",
        initials: "SB",
        description: "Offering objective guidance on corporate matters.",
      },
    ],
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
        </div>

        <h3 className="leadership-card__name">{person.name}</h3>
        <p className="leadership-card__title">{person.title}</p>
        <span className="leadership-card__separator" />
        <p className="leadership-card__bio">{person.description}</p>
      </div>
      <div className="leadership-card__glow" />
    </motion.article>
  );
}

function LeadershipSectionHeading({ title, variant }: { title: string; variant?: "main" | "subsection" | "independent" }) {
  const variantClass = variant ? ` leadership-section-heading--${variant}` : "";

  return (
    <div className={`leadership-section-heading${variantClass}`}>
      <span className="leadership-section-heading__rule" />
      <h3 className="leadership-section-heading__title">{title}</h3>
      <span className="leadership-section-heading__rule" />
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
        </div>

        <div className="leadership-page__group leadership-page__group--executive">
          <LeadershipSectionHeading title="Executive Leadership" />
          <div className="leadership-page__executives">
            {EXECUTIVES.map((person, index) => (
              <LeadershipCard key={person.name} person={person} index={index} />
            ))}
          </div>
        </div>

        <div className="leadership-page__group leadership-page__group--board">
          <LeadershipSectionHeading title="Board of Directors" variant="main" />
          {BOARD_GROUPS.map((group, groupIndex) => (
            <div className="leadership-page__board-category" key={group.title}>
              <LeadershipSectionHeading
                title={group.title}
                variant={group.title === "Independent Directors" ? "independent" : "subsection"}
              />
              <div
                className={`leadership-page__executives${
                  group.title === "Independent Directors"
                    ? " leadership-page__executives--three"
                    : " leadership-page__executives--compact"
                }`}
              >
                {group.members.map((person, memberIndex) => (
                  <LeadershipCard
                    key={person.name}
                    person={person}
                    index={EXECUTIVES.length + groupIndex * 3 + memberIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
