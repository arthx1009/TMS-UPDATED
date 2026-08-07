import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "./UI";
import ServiceOverlay, { type ServiceCardData } from "./ServiceOverlay";
import {
  HiOutlineCpuChip, HiOutlineCloud, HiOutlineShieldCheck, HiOutlineTruck,
  HiOutlineCircleStack, HiOutlineChatBubbleLeftRight, HiOutlineSwatch,
  HiOutlineWrenchScrewdriver, HiOutlineWifi, HiOutlineBuildingOffice2, HiOutlineBeaker,
  HiOutlineCube, HiOutlineHeart, HiOutlineSparkles, HiOutlineAcademicCap,
  HiOutlinePhone, HiOutlineBanknotes, HiOutlineShoppingBag,
} from "react-icons/hi2";

const SERVICES: ServiceCardData[] = [
  { icon: HiOutlineAcademicCap, title: "Education", desc: "Modern learning platforms, digital campuses, and student engagement systems." },
  { icon: HiOutlineCpuChip, title: "Software Engineering", desc: "Full-stack, high-performance product engineering from architecture to deployment." },
  { icon: HiOutlineChatBubbleLeftRight, title: "AI & Machine Learning", desc: "LLM applications, embeddings, computer vision and predictive systems." },
  { icon: HiOutlineTruck, title: "Automotive Engineering", desc: "Embedded automotive software, ADAS support tooling and vehicle intelligence." },
  { icon: HiOutlineBeaker, title: "Quantum Research", desc: "Applied quantum mechanism research for next-generation computation." },
  { icon: HiOutlineCloud, title: "Cloud Computing", desc: "Cloud-native architecture, migration and cost-optimized infrastructure." },
  { icon: HiOutlineShieldCheck, title: "Cyber Security", desc: "Threat modeling, secure architecture review and hardened delivery pipelines." },
  { icon: HiOutlineHeart, title: "Healthcare & Life Sciences", desc: "Clinical-grade digital products, data platforms, and intelligent care experiences." },
  { icon: HiOutlineSwatch, title: "UI / UX", desc: "Interface design systems that balance clarity, brand and conversion." },
  { icon: HiOutlineWrenchScrewdriver, title: "Embedded Systems", desc: "Firmware and embedded platform engineering for hardware products." },
  { icon: HiOutlineWifi, title: "IoT", desc: "Connected device platforms, from sensor layer to cloud dashboards." },
  { icon: HiOutlineCube, title: "Robotics", desc: "Control systems, autonomy workflows, and intelligent robotics integrations." },
  { icon: HiOutlineSparkles, title: "Supply Chain & Logistics", desc: "Operational intelligence, optimization platforms, and resilient logistics systems." },
  { icon: HiOutlineBuildingOffice2, title: "Hospitality", desc: "Guest experience platforms, service operations, and smart hospitality technology." },
  { icon: HiOutlinePhone, title: "Telecommunication", desc: "Next-generation connectivity products and secure communication platforms." },
  { icon: HiOutlineBanknotes, title: "Banking & Finance Services", desc: "Digital banking experiences, compliance tooling, and secure financial products." },
  { icon: HiOutlineShoppingBag, title: "Consumer & Retail", desc: "Commerce enablement, loyalty platforms, and customer-centric digital experiences." },
  { icon: HiOutlineCircleStack, title: "Enterprise Solutions", desc: "Large-scale enterprise applications built for reliability and scale." },
];

function TiltCard({ s, i, onLearnMore, active }: { s: ServiceCardData; i: number; onLearnMore: () => void; active: boolean }) {
  const [style, setStyle] = useState({});
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)` });
  };

  const onLeave = () => setStyle({ transform: "perspective(600px) rotateX(0) rotateY(0)" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, boxShadow: active ? "0 0 0 32px rgba(56, 189, 248, 0.18)" : "0 28px 80px rgba(56, 189, 248, 0.16)" }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05, type: "spring", stiffness: 220, damping: 22 }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onLearnMore}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onLearnMore();
        }
      }}
      tabIndex={0}
      role="button"
      style={{ transition: "transform 0.25s ease-out", ...style }}
      className={`glass glass-card hover-card rounded-2xl p-6 group relative overflow-hidden cursor-pointer ${active ? "border border-cyan-300/20 bg-[rgba(15,23,42,0.95)]" : ""}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ background: "var(--color-electric)" }} />
      <s.icon className="w-6 h-6 mb-4" style={{ color: "var(--color-electric)" }} />
      <h3 className="font-display font-semibold text-[15px] mb-1.5">{s.title}</h3>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
      <motion.button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onLearnMore();
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="text-[12px] font-medium inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors"
      >
        Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </motion.button>
    </motion.div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleOpen = (service: ServiceCardData) => {
    setSelectedService(service);
    setOverlayOpen(true);
  };

  const handleClose = () => {
    setOverlayOpen(false);
    setTimeout(() => setSelectedService(null), 320);
  };

  return (
    <Section id="services">
      <SectionTitle
        eyebrow="Our Core Services"
        title="Eighteen disciplines. One engineering standard."
        sub="From embedded automotive systems to applied AI research — each service is delivered by a dedicated pod, not a generalist bench."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <TiltCard key={s.title} s={s} i={i} active={overlayOpen && selectedService?.title === s.title} onLearnMore={() => handleOpen(s)} />
        ))}
      </div>
      <ServiceOverlay service={selectedService} open={overlayOpen} onClose={handleClose} />
    </Section>
  );
}
