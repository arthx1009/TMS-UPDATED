import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "./UI";

type Person = {
  name: string;
  title: string;
  bio: string;
  badge: string;
  initials: string;
  accent: string;
};

const EXECUTIVES: Person[] = [
  {
    name: "S Sahera Tazeen",
    title: "Founder & Managing Director",
    bio: "Shaping vision, driving strategic growth, and building long-term value through innovation, trusted partnerships, and a commitment to excellence.",
    badge: "Strategic Vision",
    initials: "ST",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    name: "S Manoj Kumar",
    title: "Founder & Chief Executive Officer",
    bio: "Leading with purpose, fostering innovation, and delivering reliable technology solutions through excellence in execution and continuous improvement.",
    badge: "Executive Lead",
    initials: "MK",
    accent: "from-sky-400 via-cyan-500 to-indigo-600",
  },
];

const ADVISORS: Person[] = [
  {
    name: "Agishan J",
    title: "Advisory Partner",
    bio: "Brings deep expertise in transformation, technology leadership, and enterprise modernization.",
    badge: "Advisory",
    initials: "AJ",
    accent: "from-sky-500 via-cyan-500 to-blue-600",
  },
  {
    name: "Meenakshi R",
    title: "Growth Advisor",
    bio: "Shapes market strategy, partnerships, and scalable expansion with an emphasis on long-term value.",
    badge: "Growth",
    initials: "MR",
    accent: "from-cyan-400 via-sky-500 to-indigo-600",
  },
  {
    name: "Saharika Teppa",
    title: "Innovation Advisor",
    bio: "Guides product innovation, research direction, and next-generation digital experiences.",
    badge: "Innovation",
    initials: "ST",
    accent: "from-sky-400 via-blue-500 to-cyan-600",
  },
];

function LeadershipCard({ person, index }: { person: Person; index: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setRotation({ x: -y, y: x, active: true });
  };

  const onLeave = () => setRotation({ x: 0, y: 0, active: false });

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-[24px] border border-[var(--hairline-15)] glass p-7 md:p-8 min-h-[280px]"
    >
      <div className="absolute inset-0 opacity-70"
        style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.08), transparent 45%, rgba(59,130,246,0.12))" }} />
      <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-cyan-400/20 blur-2xl" style={{ background: "rgba(56,189,248,0.12)" }} />
      <div className="absolute bottom-4 right-4 h-24 w-24 rounded-full border border-cyan-300/10 blur-3xl" style={{ background: "rgba(34,211,238,0.08)" }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.06) 35%, transparent 70%)", transform: "translateX(-120%) skewX(-18deg)" }} />

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-start"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-[0_0_30px_rgba(56,189,248,0.18)]">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${person.accent} opacity-80 blur-[2px]`} />
            <div className="absolute inset-[3px] rounded-full border border-white/10" />
            <span className="relative z-10 text-sm font-semibold tracking-[0.2em] text-white">{person.initials}</span>
          </div>
          <div className="rounded-full border border-cyan-400/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: "var(--color-electric)", background: "rgba(56,189,248,0.1)" }}>
            {person.badge}
          </div>
        </div>

        <h3 className="font-display text-[20px] font-semibold text-white transition-all duration-300 group-hover:text-cyan-200">{person.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[13px] font-medium" style={{ color: "var(--color-electric)" }}>{person.title}</span>
          <span className="h-px w-8 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: "linear-gradient(90deg, var(--color-electric), transparent)" }} />
        </div>
        <p className="mt-4 max-w-[32rem] text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>{person.bio}</p>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-cyan-400/10 transition-all duration-500 group-hover:border-cyan-300/30" />
      <div className={`pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 ${rotation.active ? "opacity-100" : "opacity-0"}`} style={{ boxShadow: "inset 0 0 28px rgba(56,189,248,0.12)" }} />
    </motion.article>
  );
}

export default function Leadership() {
  return (
    <Section id="leadership" className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle
        eyebrow="Leadership Team"
        title="Meet the leaders shaping TarvyX Mind Systems."
        sub="Meet the leaders driving innovation, strategy, and long-term growth at TarvyX Mind Systems."
        align="center"
      />

      <div className="mx-auto mb-12 max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="font-display text-[22px] font-semibold text-white">Executive Leadership</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
            Strategic minds guiding delivery, trust, and long-term growth across every engagement.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {EXECUTIVES.map((person, index) => (
            <LeadershipCard key={person.name} person={person} index={index} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="font-display text-[22px] font-semibold text-white">Board of Advisors</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
            Experienced advisors supporting innovation, growth, and strategic direction.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ADVISORS.map((person, index) => (
            <LeadershipCard key={person.name} person={person} index={index + 2} />
          ))}
        </div>
      </div>
    </Section>
  );
}
