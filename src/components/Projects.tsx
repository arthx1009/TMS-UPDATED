import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "./UI";

const CATEGORIES = ["All", "AI", "Automotive", "Enterprise", "Cloud", "IoT"];

const PROJECTS = [
  { title: "Predictive Maintenance Platform", cat: "AI", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" },
  { title: "In-Vehicle Driver Assist Module", cat: "Automotive", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop" },
  { title: "Enterprise Resource Suite", cat: "Enterprise", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" },
  { title: "Multi-Region Cloud Migration", cat: "Cloud", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop" },
  { title: "Smart Factory Sensor Network", cat: "IoT", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" },
  { title: "Enterprise Knowledge Copilot", cat: "AI", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <Section id="projects">
      <SectionTitle eyebrow="Projects Showcase" title="Our TMS Projects" />
      <div className="flex flex-wrap gap-2 mb-9">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-xs font-medium font-mono tracking-wide transition-colors ${
              filter === c ? "text-ink" : "text-white/60 border border-white/10 hover:text-white"
            }`}
            style={filter === c ? { background: "var(--color-electric)", color: "var(--color-ink)" } : undefined}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((p) => (
          <motion.div
            key={p.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -6, boxShadow: "0 28px 80px rgba(56, 189, 248, 0.16)" }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer hover-card"
          >
            <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-electric)" }}>{p.cat}</span>
              <h3 className="font-display font-semibold text-[17px] mt-1">{p.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
