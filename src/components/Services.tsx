import { useState } from "react";
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

function ServiceCard({ s, i, onLearnMore, active }: { s: ServiceCardData; i: number; onLearnMore: () => void; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05, type: "spring", stiffness: 220, damping: 22 }}
      onClick={onLearnMore}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onLearnMore();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${s.title}. Learn more`}
      className={`service-card group${active ? " service-card--active" : ""}`}
    >
      <span className="service-card__icon" aria-hidden="true">
        <s.icon />
      </span>
      <span className="service-card__separator" aria-hidden="true" />
      <span className="service-card__content">
        <span className="service-card__title">{s.title}</span>
        <span className="service-card__description">{s.desc}</span>
      </span>
      <span className="service-card__arrow" aria-hidden="true">→</span>
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
    <Section id="services" className="services-section">
      <SectionTitle
        eyebrow="Our Core Services"
        title="Twenty Two disciplines. One engineering standard."
        sub="From embedded automotive systems to applied AI research — each service is delivered by a dedicated pod, not a generalist bench."
      />
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} s={s} i={i} active={overlayOpen && selectedService?.title === s.title} onLearnMore={() => handleOpen(s)} />
        ))}
      </div>
      <ServiceOverlay service={selectedService} open={overlayOpen} onClose={handleClose} />
    </Section>
  );
}
