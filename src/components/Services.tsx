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
  { icon: HiOutlineAcademicCap, title: "Education", desc: "AI-native learning systems, digital campuses, and student intelligence platforms." },
  { icon: HiOutlineCpuChip, title: "Software Engineering", desc: "Software intelligence systems that understand architecture, dependencies, runtime behaviour, and evolution." },
  { icon: HiOutlineChatBubbleLeftRight, title: "AI & Machine Learning", desc: "Adaptive learning, multimodal reasoning, perception, and intelligence systems for real-world decisioning." },
  { icon: HiOutlineTruck, title: "Automotive Engineering", desc: "Vehicle perception, predictive mobility intelligence, and software-defined automotive systems." },
  { icon: HiOutlineBeaker, title: "Quantum Research", desc: "Quantum algorithm design, hybrid computing, and next-generation computational intelligence." },
  { icon: HiOutlineCloud, title: "Cloud Computing", desc: "Adaptive cloud, edge, and computational infrastructure with workload-aware intelligence." },
  { icon: HiOutlineShieldCheck, title: "Cyber Security", desc: "Behavioural threat intelligence, zero-trust systems, and autonomous defense platforms." },
  { icon: HiOutlineHeart, title: "Global Health & Medical Sciences", desc: "Clinical intelligence, biomedical discovery, and medical systems that reason across health data." },
  { icon: HiOutlineSwatch, title: "UI / UX", desc: "Human-interface intelligence, adaptive user experiences, and multimodal interaction systems." },
  { icon: HiOutlineWrenchScrewdriver, title: "Embedded Systems", desc: "On-device intelligence, constrained computing, and embedded safety-critical systems." },
  { icon: HiOutlineWifi, title: "IoT", desc: "Connected intelligence across devices, environments, and real-time operational systems." },
  { icon: HiOutlineCube, title: "Robotics", desc: "Embodied intelligence, autonomous task execution, and adaptive robot learning." },
  { icon: HiOutlineSparkles, title: "Supply Chain & Logistics", desc: "Supply network intelligence, disruption modelling, and adaptive logistics orchestration." },
  { icon: HiOutlineBuildingOffice2, title: "Hotels & Resorts Intelligence", desc: "Guest experience intelligence, resort operations, and autonomous hospitality systems." },
  { icon: HiOutlinePhone, title: "Telecommunication", desc: "Network intelligence, connectivity systems, and adaptive communication fabrics." },
  { icon: HiOutlineBanknotes, title: "Financial Intelligence", desc: "Risk-aware financial systems, compliance intelligence, and adaptive operational decisioning." },
  { icon: HiOutlineShoppingBag, title: "Consumer & Retail", desc: "Commerce intelligence, customer journey systems, and adaptive retail experiences." },
  { icon: HiOutlineCircleStack, title: "Enterprise Solutions", desc: "Large-scale enterprise intelligence, governance systems, and adaptive operating platforms." },
  { icon: HiOutlineCpuChip, title: "Semiconductors", desc: "Semiconductor-scale compute intelligence, hardware optimisation, and intelligent silicon systems." },
  { icon: HiOutlineSparkles, title: "Space & Aerospace", desc: "Mission intelligence, autonomous aerospace systems, and deep-technology operations." },
  { icon: HiOutlineAcademicCap, title: "Pharmaceuticals", desc: "Computational discovery, molecular intelligence, and clinical research acceleration." },
  { icon: HiOutlineSwatch, title: "Camera & Imaging", desc: "Vision intelligence, sensor fusion, and spatial perception systems for sensing and analysis." },
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
