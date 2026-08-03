import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionTitle, MagneticButton } from "./UI";
import { COURSES, type Course } from "../data/courses";
import { HiOutlineStar, HiOutlineClock, HiOutlineUserGroup, HiOutlineXMark } from "react-icons/hi2";

function CourseCard({ c, onOpen }: { c: Course; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, boxShadow: "0 28px 80px rgba(56, 189, 248, 0.16)" }}
      transition={{ duration: 0.5 }}
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
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[12px] text-white/55 mb-4 mt-auto">
          <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{c.duration}</span>
          <span className="flex items-center gap-1"><HiOutlineStar className="w-3.5 h-3.5" style={{ color: "var(--color-gold)" }} />{c.rating}</span>
          <span className="flex items-center gap-1"><HiOutlineUserGroup className="w-3.5 h-3.5" />{c.students}</span>
        </div>
        <div className="flex gap-2">
          <MagneticButton className="!py-2 !px-4 !text-[12px] flex-1">Enroll Now</MagneticButton>
          <button onClick={onOpen} className="text-[12px] font-medium px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 transition-colors">
            Brochure
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BrochureModal({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass glass-card hover-card rounded-3xl max-w-lg w-full overflow-hidden"
      >
        <div className="relative h-48">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center">
            <HiOutlineXMark className="w-4 h-4" />
          </button>
          <h3 className="absolute bottom-4 left-5 font-display font-semibold text-xl">{course.title}</h3>
        </div>
        <div className="p-6">
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{course.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-[12px]">
            <div><div className="text-white/40 uppercase text-[10px] mb-1">Duration</div>{course.duration}</div>
            <div><div className="text-white/40 uppercase text-[10px] mb-1">Eligibility</div>Open to all levels</div>
            <div><div className="text-white/40 uppercase text-[10px] mb-1">Modules</div>8–12 modules</div>
            <div><div className="text-white/40 uppercase text-[10px] mb-1">Career Path</div>{course.category} Engineer</div>
          </div>
          <div className="flex gap-3">
            <MagneticButton className="flex-1 !py-3">Apply Now</MagneticButton>
            <MagneticButton variant="ghost" className="flex-1 !py-3">Download PDF</MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Courses() {
  const [active, setActive] = useState<Course | null>(null);
  return (
    <Section id="courses">
      <SectionTitle
        eyebrow="Featured Courses"
        title="Learn what we build with, every day."
        sub="Cohort-based programs across AI, cloud, security, automotive and quantum — taught by the engineers shipping production systems."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {COURSES.map((c) => (
          <CourseCard key={c.title} c={c} onOpen={() => setActive(c)} />
        ))}
      </div>
      <AnimatePresence>{active && <BrochureModal course={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </Section>
  );
}
