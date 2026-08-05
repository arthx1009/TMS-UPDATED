import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./UI";
import { COURSES, type Course } from "../data/courses";
import { HiOutlineStar, HiOutlineClock, HiOutlineUserGroup, HiOutlineXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";

const FILTER_CHIPS = [
  "All",
  "AI",
  "Software",
  "Cloud",
  "Automotive",
  "Quantum",
  "Embedded",
  "Cyber Security",
];

const filterPredicates: Record<string, (course: Course) => boolean> = {
  All: () => true,
  AI: (course) => course.category.toLowerCase().includes("artificial") || course.tags.some((tag) => tag.toLowerCase().includes("ai")),
  Software: (course) => course.category.toLowerCase().includes("software") || course.tags.some((tag) => tag.toLowerCase().includes("react") || tag.toLowerCase().includes("node")),
  Cloud: (course) => course.category.toLowerCase().includes("cloud") || course.tags.some((tag) => tag.toLowerCase().includes("aws") || tag.toLowerCase().includes("kubernetes") || tag.toLowerCase().includes("docker")),
  Automotive: (course) => course.category.toLowerCase().includes("automotive") || course.tags.some((tag) => tag.toLowerCase().includes("adas") || tag.toLowerCase().includes("embedded")),
  Quantum: (course) => course.category.toLowerCase().includes("quantum"),
  Embedded: (course) => course.tags.some((tag) => tag.toLowerCase().includes("embedded")),
  "Cyber Security": (course) => course.category.toLowerCase().includes("security") || course.tags.some((tag) => tag.toLowerCase().includes("security") || tag.toLowerCase().includes("pentesting")),
};

function CourseCard({ c, onOpen, index }: { c: Course; onOpen: (trigger: HTMLElement) => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, boxShadow: "0 28px 80px rgba(56, 189, 248, 0.16)" }}
      className="glass glass-card hover-card rounded-2xl overflow-hidden group flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full glass">{c.category}</span>
        <span className="absolute top-3 right-3 text-[10px] font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(var(--color-electric-rgb), 0.15)", color: "var(--color-electric)" }}>{c.difficulty}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-[16px] mb-1.5">{c.title}</h3>
        <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--color-text-muted)" }}>{c.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.tags.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100/80 text-slate-700">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[12px] text-slate-600 mb-4 mt-auto">
          <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{c.duration}</span>
          <span className="flex items-center gap-1"><HiOutlineStar className="w-3.5 h-3.5" style={{ color: "var(--color-gold)" }} />{c.rating}</span>
          <span className="flex items-center gap-1"><HiOutlineUserGroup className="w-3.5 h-3.5" />{c.students}</span>
        </div>
        <div className="flex gap-2">
          <MagneticButton className="!py-2 !px-4 !text-[12px] flex-1">Enroll Now</MagneticButton>
          <button onClick={(event) => onOpen(event.currentTarget)} className="text-[12px] font-medium px-4 py-2 rounded-full border border-slate-200/80 bg-white text-slate-950 transition-colors hover:border-slate-300">
            Brochure
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BrochureModal({ course, onClose, returnFocusTo }: { course: Course; onClose: () => void; returnFocusTo: HTMLElement | null }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusTo?.focus();
    };
  }, [onClose, returnFocusTo]);

  const curriculum = [
    "Foundational concepts and architecture patterns",
    "Hands-on labs with core technology stacks",
    "Advanced integration and deployment scenarios",
    "Capstone project with real-world outcomes",
    "Career guidance and certification readiness",
  ];

  const requirements = [
    "Comfort with basic programming concepts",
    "Familiarity with software development workflows",
    "Desire to apply new technologies in real products",
  ];

  const skills = [
    "System design and implementation",
    "Cloud-native service delivery",
    "Data-driven AI workflows",
    "Secure development practices",
    "Collaborative engineering delivery",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-slate-950/30 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-title"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="glass rounded-[24px] border border-white/10 bg-[rgba(15,23,42,0.9)] w-full max-w-[900px] max-h-[85vh] overflow-hidden shadow-[0_40px_120px_rgba(56,189,248,0.28)]"
      >
        <div className="relative border-b border-white/10 px-8 py-6 bg-slate-950/95">
          <h2 id="brochure-title" className="font-display text-[clamp(28px,2.3vw,36px)] font-semibold text-white">Brochure</h2>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(85vh-7.5rem)] overflow-y-auto bg-white px-8 py-6 text-slate-900 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6 text-slate-900">
              <div>
                <p className="text-sm leading-7">{course.desc}</p>
              </div>

              <div className="rounded-3xl border border-slate-200/60 bg-white p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-3">Course Details</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-100 p-4">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Duration</div>
                    <div className="mt-2 text-sm font-semibold text-slate-950">{course.duration}</div>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Category</div>
                    <div className="mt-2 text-sm font-semibold text-slate-950">{course.category}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/60 bg-white p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">Technology Badges</div>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-[11px] text-slate-900">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 text-slate-900">
              <div className="rounded-3xl border border-slate-200/60 bg-white p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">Skills Covered</div>
                <ul className="space-y-3 text-sm list-disc list-inside">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200/60 bg-white p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">Requirements</div>
                <ul className="space-y-3 text-sm list-disc list-inside">
                  {requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200/60 bg-white p-6 text-slate-900">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">Curriculum Overview</div>
            <div className="space-y-3 text-sm">
              {curriculum.map((item) => (
                <div key={item} className="rounded-3xl bg-slate-100 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/50 bg-slate-50 px-8 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-700">Download the full course brochure or request additional details for your learning team.</div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton className="!py-3 !px-6">Download PDF</MagneticButton>
              <MagneticButton variant="ghost" className="!py-3 !px-6">Request Info</MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

type CourseCatalogProps = {
  onBrochureOpenChange?: (open: boolean) => void;
};

export default function CourseCatalog({ onBrochureOpenChange }: CourseCatalogProps) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [lastBrochureTrigger, setLastBrochureTrigger] = useState<HTMLElement | null>(null);

  useEffect(() => {
    onBrochureOpenChange?.(Boolean(activeCourse));
  }, [activeCourse, onBrochureOpenChange]);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return COURSES.filter((course) => {
      const matchesFilter = filterPredicates[filter](course);
      if (!matchesFilter) return false;
      if (!query) return true;
      const haystack = [course.title, course.desc, course.category, ...course.tags].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [filter, search]);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="w-full rounded-3xl border border-[rgba(15,23,42,0.10)] bg-slate-50 p-3 backdrop-blur-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Education</div>
            <h3 className="mt-3 font-display text-[clamp(26px,2.5vw,36px)] font-semibold text-slate-950">Modern Learning Platform</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Explore the complete TMS course catalog inside a premium glass modal experience built for technical leaders and learners.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-end">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Courses..."
                className="w-full rounded-full border border-slate-200/80 bg-white/90 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-[var(--color-electric)] focus:ring-2 focus:ring-[rgba(37,99,235,0.12)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFilter(chip)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === chip ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  {chip}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="rounded-3xl border border-[rgba(15,23,42,0.10)] bg-slate-50 p-4 text-sm text-slate-600">
            {filteredCourses.length} courses available
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <CourseCard
            key={course.title}
            c={course}
            onOpen={(trigger) => {
              setLastBrochureTrigger(trigger);
              setActiveCourse(course);
            }}
            index={index}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeCourse && (
          <BrochureModal
            course={activeCourse}
            onClose={() => setActiveCourse(null)}
            returnFocusTo={lastBrochureTrigger}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
