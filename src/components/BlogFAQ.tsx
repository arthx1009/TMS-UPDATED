import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionTitle } from "./UI";
import { HiOutlinePlus } from "react-icons/hi2";

const POSTS = [
  { tag: "AI", title: "Why Embeddings Are the Backbone of Modern Search", img: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=1200&auto=format&fit=crop" },
  { tag: "Automotive", title: "Sensor Fusion Explained: Building Reliable ADAS", img: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=1200&auto=format&fit=crop" },
  { tag: "Cloud", title: "Cutting Cloud Spend Without Cutting Reliability", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop" },
];

const FAQS = [
  { q: "How does TMS handle confidentiality and NDAs?", a: "Every engagement begins with an NDA. Source code, models, research and strategy remain the client's property and are never disclosed or reused across engagements." },
  { q: "What industries do you typically work with?", a: "We work across healthcare, finance, automotive, retail, manufacturing, energy and government, alongside early-stage startups building novel products." },
  { q: "Can TMS work as an extension of our internal team?", a: "Yes — most engagements are staffed as dedicated pods that integrate with your existing engineering and product workflows." },
  { q: "Do you offer fixed-scope or ongoing engagements?", a: "Both. We scope fixed-deliverable projects as well as ongoing retainer-based partnerships depending on what the work requires." },
  { q: "How do the courses relate to your consulting work?", a: "Courses are taught by the same engineers delivering client work, so the curriculum reflects current, real production practice." },
];

export function Blog() {
  return (
    <Section id="blog">
      <SectionTitle eyebrow="Latest Blogs" title="Notes from the engineering floor." />
      <div className="grid md:grid-cols-3 gap-5">
        {POSTS.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: "0 28px 80px rgba(56, 189, 248, 0.16)" }}
            className="glass glass-card hover-card rounded-2xl overflow-hidden group block"
          >
            <div className="h-40 overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-5">
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-electric)" }}>{p.tag}</span>
              <h3 className="font-display font-semibold text-[15px] mt-2 leading-snug">{p.title}</h3>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle eyebrow="FAQ" title="Common questions, answered plainly." align="center" />
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {FAQS.map((f, i) => (
          <div key={f.q} className="glass glass-card hover-card rounded-2xl overflow-hidden group">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-[14px]">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
                <HiOutlinePlus className="w-4 h-4 text-white/60" />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
