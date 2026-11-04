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
  { icon: HiOutlineCpuChip, title: "Software Intelligence", desc: "Engineering systems that understand, build, validate and evolve software." },
  { icon: HiOutlineChatBubbleLeftRight, title: "AI & Machine Learning", desc: "Adaptive learning, machine perception and intelligent systems engineered for complex and changing environments." },
  { icon: HiOutlineTruck, title: "Automotive Engineering", desc: "Vehicle intelligence, automotive perception, predictive mobility and software-defined transportation systems." },
  { icon: HiOutlineBeaker, title: "Quantum Research", desc: "Quantum algorithms, hybrid quantum-classical computing, simulation and quantum-ready security." },
  { icon: HiOutlineCloud, title: "Cloud Computing", desc: "Intelligent infrastructure that understands workloads, anticipates demand, and coordinates computation." },
  { icon: HiOutlineShieldCheck, title: "Cyber Security", desc: "Cyber intelligence for understanding risk, strengthening defenses, and engineering digital resilience." },
  { icon: HiOutlineHeart, title: "Global Health & Medical Sciences", desc: "Medical intelligence for hospitals, clinical research, biomedical science, and global health." },
  { icon: HiOutlineSwatch, title: "UI / UX", desc: "Adaptive, multimodal, spatial interfaces shaped around human intent and context." },
  { icon: HiOutlineWrenchScrewdriver, title: "Embedded Systems", desc: "Edge intelligence, real-time computing, embedded AI, sensor fusion, and secure physical systems." },
  { icon: HiOutlineWifi, title: "IoT", desc: "Ambient intelligence and connected systems that sense, understand, predict, and respond." },
  { icon: HiOutlineCube, title: "Robotics", desc: "Embodied intelligence, spatial perception, manipulation, simulation, and collaborative autonomous systems." },
  { icon: HiOutlineSparkles, title: "Supply Chain & Logistics", desc: "Building adaptive supply networks that predict disruption, simulate decisions and coordinate resilient operations." },
  { icon: HiOutlineBuildingOffice2, title: "Hotels & Resorts Intelligence", desc: "Creating adaptive hospitality environments that coordinate guest experiences, property operations, intelligent services and resource systems." },
  { icon: HiOutlinePhone, title: "Telecommunication", desc: "Extending intelligent connectivity beyond terrestrial network boundaries." },
  { icon: HiOutlineBanknotes, title: "Financial Intelligence", desc: "Building intelligent financial systems for a programmable, adaptive and globally connected economy." },
  { icon: HiOutlineShoppingBag, title: "Consumer & Retail", desc: "Building commerce systems that understand intent, products, environments and changing demand." },
  { icon: HiOutlineCircleStack, title: "Enterprise Solutions", desc: "Building intelligent operating layers for organizations of the future." },
  { icon: HiOutlineCpuChip, title: "Semiconductors", desc: "Engineering the silicon foundations of intelligent technology through specialized computing architectures and embedded processing." },
  { icon: HiOutlineSparkles, title: "Space & Aerospace", desc: "Engineering intelligent systems for the future of flight through aerospace simulation, avionics, flight intelligence, and embedded computing." },
  { icon: HiOutlineAcademicCap, title: "Pharmaceuticals", desc: "Discovering, developing and manufacturing the medicines of tomorrow with AI, biological science, computational discovery, and pharmaceutical engineering." },
  { icon: HiOutlineSwatch, title: "Camera & Imaging", desc: "Engineering imaging systems that perceive, interpret and understand the world through computational vision and sensor fusion." },
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
      whileHover={{ y: -6, boxShadow: active ? "0 0 0 32px var(--coral-glow)" : "0 24px 60px var(--coral-glow)" }}
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
      className={`glass glass-card hover-card rounded-2xl p-5 sm:p-6 group relative flex h-full flex-col overflow-hidden cursor-pointer ${active ? "border border-cyan-300/20 bg-[rgba(15,23,42,0.95)]" : ""}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ background: "var(--color-electric)" }} />
      <s.icon className="w-6 h-6 mb-3 sm:mb-4" style={{ color: "var(--color-electric)" }} />
      <h3 className="font-display font-semibold text-[15px] mb-1.5 break-words">{s.title}</h3>
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
        className="mt-auto min-h-10 -mx-2 inline-flex items-center gap-1 px-2 text-[12px] font-medium text-white/60 transition-colors hover:text-white"
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
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <TiltCard key={s.title} s={s} i={i} active={overlayOpen && selectedService?.title === s.title} onLearnMore={() => handleOpen(s)} />
        ))}
      </div>
      <ServiceOverlay service={selectedService} open={overlayOpen} onClose={handleClose} />
    </Section>
  );
}
