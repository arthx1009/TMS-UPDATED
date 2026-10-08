import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineCodeBracket, HiOutlineSparkles, HiOutlineBeaker, HiOutlineCpuChip, HiOutlineAcademicCap, HiOutlineCube, HiOutlineCloud, HiOutlineCircleStack, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";
import CourseCatalog from "./Courses";
import tmsLogo from "../assets/tms-logo.png";
import type { ComponentType, CSSProperties } from "react";

export type ServiceCardData = {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  title: string;
  desc: string;
};

type TechItem = {
  label: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
};

type ServiceOverlayProps = {
  service: ServiceCardData | null;
  open: boolean;
  onClose: () => void;
};

const TECHNOLOGY_STACK: TechItem[] = [
  { label: "React", icon: HiOutlineCodeBracket },
  { label: "Next.js", icon: HiOutlineSparkles },
  { label: "TypeScript", icon: HiOutlineBeaker },
  { label: "Node.js", icon: HiOutlineCpuChip },
  { label: "Python", icon: HiOutlineAcademicCap },
  { label: "Java", icon: HiOutlineCube },
  { label: "Docker", icon: HiOutlineCloud },
  { label: "Kubernetes", icon: HiOutlineCircleStack },
  { label: "AWS", icon: HiOutlineCloud },
  { label: "Azure", icon: HiOutlineCloud },
  { label: "PostgreSQL", icon: HiOutlineCircleStack },
  { label: "MongoDB", icon: HiOutlineBeaker },
  { label: "Redis", icon: HiOutlineSparkles },
  { label: "Git", icon: HiOutlineCodeBracket },
];

const WORKFLOW = [
  "Architecture",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Continuous Improvement",
];

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.72, type: "spring" as const, stiffness: 180, damping: 24 } },
  exit: { opacity: 0, y: 20, scale: 0.92, transition: { duration: 0.35, ease: "easeInOut" as const } },
} as const;

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const SOFTWARE_PRODUCTS = [
  { name: "NEXORA", status: "BUILDING", accent: "violet", title: "The intelligence layer for software engineering.", body: "Understands architecture, codebases, dependencies and system impact as one connected software graph.", items: ["Codebase intelligence", "Dependency reasoning", "Impact analysis", "Technical-debt discovery"] },
  { name: "CODELYS", status: "RESEARCH", accent: "cyan", title: "From intent to intelligent software.", body: "Transforms human intent, constraints and desired behaviour into a validated engineering plan.", items: ["Intent capture", "Architecture synthesis", "API design", "Test strategy"] },
  { name: "VERIDIS", status: "RESEARCH", accent: "emerald", title: "Software correctness intelligence.", body: "Reasons about whether software behaves according to its intended specification before release.", items: ["Behavioural verification", "Property-based testing", "Regression reasoning", "Edge-case discovery"] },
  { name: "SYNDEX", status: "FUTURE", accent: "amber", title: "A runtime intelligence system for software.", body: "Connects source code, service behaviour and runtime monitoring in one intelligence layer.", items: ["Traffic simulation", "Failure analysis", "Resource intelligence", "User behaviour tracing"] },
  { name: "EVOLIS", status: "RESEARCH", accent: "pink", title: "Software that understands its own evolution.", body: "Identifies architecture drift, technical debt and recommended changes before they become expensive.", items: ["Drift detection", "Risk mapping", "Maintainability forecasting", "Evolution recommendations"] },
  { name: "ORYON", status: "FUTURE", accent: "blue", title: "Autonomous software operations intelligence.", body: "Observes, diagnoses and simulates software operations while keeping human approval as the control point.", items: ["Failure prediction", "Root-cause reasoning", "Deployment risk", "Controlled remediation"] },
] as const;

const AI_PRODUCTS = [
  { name: "NEURIX", status: "BUILDING", accent: "violet", title: "Adaptive Intelligence That Learns Beyond Static Training", body: "Continual learning platform for AI systems that adapt as their environment changes." },
  { name: "PERCEVA", status: "RESEARCH", accent: "cyan", title: "Machine Perception for Complex Reality", body: "Contextual perception combining visual, spatial and temporal understanding." },
  { name: "KYNARA", status: "RESEARCH", accent: "emerald", title: "Knowledge Intelligence Engine", body: "Reasoning over structured and unstructured knowledge across domains." },
  { name: "OMNEXA", status: "BUILDING", accent: "amber", title: "Multimodal Intelligence Platform", body: "Unified intelligence across text, vision, audio and structured data." },
  { name: "SYNVORA", status: "RESEARCH", accent: "pink", title: "Synthetic Data & World Models", body: "Generates high-fidelity synthetic environments for training intelligent systems." },
  { name: "HYPERA", status: "FUTURE", accent: "blue", title: "Hyperscale Model Intelligence", body: "Infrastructure and optimisation for large-scale AI model training and deployment." },
] as const;

const AUTOMOTIVE_PRODUCTS = [
  { name: "LUMENIX", status: "BUILDING", accent: "violet", title: "Vehicle Perception Intelligence", body: "Advanced multi-sensor perception for real-world driving environments." },
  { name: "VELION", status: "RESEARCH", accent: "cyan", title: "Predictive Vehicle Intelligence", body: "Anticipates road conditions, hazards and system states before they become critical." },
  { name: "AERIVA", status: "RESEARCH", accent: "emerald", title: "Aerodynamic Intelligence System", body: "Adaptive aerodynamic modelling for performance and efficiency." },
  { name: "MOTARA", status: "BUILDING", accent: "amber", title: "Software-Defined Vehicle Platform", body: "Centralised intelligence architecture for next-generation vehicles." },
  { name: "AUTERRA", status: "RESEARCH", accent: "pink", title: "Autonomous Driving Intelligence", body: "End-to-end autonomy stack from perception to decision to motion." },
  { name: "ELYRON", status: "BUILDING", accent: "blue", title: "Electric Vehicle Intelligence", body: "Energy management, range optimisation and battery intelligence." },
  { name: "ENERION", status: "RESEARCH", accent: "violet", title: "Vehicle Energy Systems", body: "Intelligent energy distribution and regeneration for electric and hybrid platforms." },
  { name: "AUTONARA", status: "FUTURE", accent: "cyan", title: "Mobility Simulation Engine", body: "High-fidelity simulation for autonomous system development and validation." },
  { name: "ROADYN", status: "FUTURE", accent: "emerald", title: "Infrastructure Intelligence", body: "Real-time understanding of road networks, signals and traffic systems." },
] as const;

const QUANTUM_PRODUCTS = [
  { name: "QYRON", status: "BUILDING", accent: "violet", title: "Quantum Algorithm Intelligence", body: "Develops and benchmarks quantum algorithms for real-world computational problems." },
  { name: "QUANTARA", status: "RESEARCH", accent: "cyan", title: "Quantum-Classical Hybrid Platform", body: "Bridges classical and quantum computing for practical near-term applications." },
  { name: "QORVEX", status: "RESEARCH", accent: "emerald", title: "Quantum Optimisation Engine", body: "Solves large-scale optimisation problems using quantum and quantum-inspired methods." },
  { name: "QENTRA", status: "BUILDING", accent: "amber", title: "Quantum Simulation Platform", body: "Simulates quantum systems for materials science, chemistry and physics research." },
  { name: "CRYPTARA", status: "RESEARCH", accent: "pink", title: "Quantum-Safe Cryptography", body: "Post-quantum cryptographic protocols and security system migration." },
  { name: "QUBERA", status: "FUTURE", accent: "blue", title: "Quantum Machine Learning", body: "Explores quantum-enhanced learning algorithms and model architectures." },
] as const;

const CLOUD_PRODUCTS = [
  { name: "AETHERON", status: "BUILDING", accent: "violet", title: "Intelligent Cloud Orchestration", body: "Self-optimising cloud infrastructure that adapts to workload patterns." },
  { name: "ELASTRA", status: "RESEARCH", accent: "cyan", title: "Elastic Compute Intelligence", body: "Predictive scaling and resource allocation for distributed systems." },
  { name: "QUANTEXA", status: "RESEARCH", accent: "emerald", title: "Data Intelligence Platform", body: "Connects and reasons across structured and unstructured data at cloud scale." },
  { name: "CLOUDRA", status: "BUILDING", accent: "amber", title: "Multi-Cloud Intelligence", body: "Unified intelligence layer across heterogeneous cloud environments." },
  { name: "EDGION", status: "RESEARCH", accent: "pink", title: "Edge Computing Intelligence", body: "Brings adaptive computation to edge and IoT environments." },
  { name: "AUTONOMIA", status: "FUTURE", accent: "blue", title: "Autonomous Infrastructure Operations", body: "Self-healing, self-optimising infrastructure under human governance." },
  { name: "SOVEREIGNX", status: "FUTURE", accent: "violet", title: "Sovereign Cloud Platform", body: "Private and compliant cloud intelligence for regulated industries." },
] as const;

const CYBERSECURITY_PRODUCTS = [
  { name: "AEGIX", status: "BUILDING", accent: "violet", title: "Cyber Threat Intelligence Platform", body: "Detects, correlates and reasons about threats across the enterprise surface." },
  { name: "SENTRIX", status: "RESEARCH", accent: "cyan", title: "Behavioural Security Intelligence", body: "Identifies anomalous behaviour patterns before they become breaches." },
  { name: "PREVORA", status: "RESEARCH", accent: "emerald", title: "Predictive Threat Intelligence", body: "Anticipates attack vectors based on adversary modelling and system exposure." },
  { name: "CYBERA", status: "BUILDING", accent: "amber", title: "Autonomous Cyber Defence", body: "Detects and responds to threats under controlled human oversight." },
  { name: "IMMUNYX", status: "RESEARCH", accent: "pink", title: "Security Immunisation Platform", body: "Hardens systems through continuous vulnerability identification and remediation." },
  { name: "IDENTARA", status: "FUTURE", accent: "blue", title: "Identity Intelligence System", body: "Adaptive identity verification and access governance." },
  { name: "TRUSTRA", status: "RESEARCH", accent: "violet", title: "Zero-Trust Intelligence", body: "Continuous trust evaluation across users, devices and workloads." },
  { name: "VULNEXA", status: "BUILDING", accent: "cyan", title: "Vulnerability Intelligence Engine", body: "Discovers, prioritises and contextualises security vulnerabilities at scale." },
  { name: "RESILION", status: "FUTURE", accent: "emerald", title: "Cyber Resilience Platform", body: "Ensures continuity and recovery intelligence for critical systems." },
] as const;

const MEDICAL_PRODUCTS = [
  { name: "MEDYRA", status: "BUILDING", accent: "violet", title: "Clinical Intelligence Platform", body: "AI-assisted diagnostic reasoning across imaging, lab data and patient history." },
  { name: "BIOVANA", status: "RESEARCH", accent: "cyan", title: "Biomedical Discovery Engine", body: "Accelerates drug and therapeutic target discovery using AI and biological data." },
  { name: "CLYNEXA", status: "RESEARCH", accent: "emerald", title: "Clinical Trial Intelligence", body: "Optimises trial design, recruitment, monitoring and outcome analysis." },
  { name: "VIZERA", status: "BUILDING", accent: "amber", title: "Medical Imaging Intelligence", body: "Advanced image analysis for radiology, pathology and clinical interpretation." },
  { name: "GENEVRA", status: "RESEARCH", accent: "pink", title: "Genomic Intelligence Platform", body: "Analyses genomic data to identify variants, pathways and therapeutic opportunities." },
  { name: "VITALORA", status: "FUTURE", accent: "blue", title: "Patient Intelligence System", body: "Continuous patient monitoring and predictive clinical decision support." },
  { name: "SURGYNEX", status: "BUILDING", accent: "violet", title: "Surgical Intelligence Platform", body: "Real-time guidance and simulation for complex surgical procedures." },
  { name: "PHARMAREX", status: "RESEARCH", accent: "cyan", title: "Pharmaceutical Intelligence", body: "Drug interaction, formulation and regulatory intelligence." },
  { name: "NEUROVA", status: "RESEARCH", accent: "emerald", title: "Neuroscience Intelligence", body: "Computational models for brain function, neurological conditions and neuro-AI." },
  { name: "EPIDORA", status: "FUTURE", accent: "amber", title: "Epidemiological Intelligence", body: "Models disease spread, intervention outcomes and global health risk." },
] as const;

const HUMAN_INTERFACE_PRODUCTS = [
  { name: "SENTARA", status: "BUILDING", accent: "violet", title: "Affective Intelligence Platform", body: "Understands emotional context and adapts system responses accordingly." },
  { name: "FLUXIA", status: "RESEARCH", accent: "cyan", title: "Adaptive Interface Engine", body: "Interfaces that reconfigure based on user behaviour and context." },
  { name: "VOXARA", status: "RESEARCH", accent: "emerald", title: "Voice Intelligence System", body: "Natural, contextual voice interaction beyond simple command recognition." },
  { name: "SPATIRA", status: "BUILDING", accent: "amber", title: "Spatial Computing Platform", body: "Intelligence for AR, VR and mixed-reality environments." },
  { name: "COGNIVUE", status: "RESEARCH", accent: "pink", title: "Cognitive Interface Intelligence", body: "Interfaces designed around human attention, memory and decision patterns." },
  { name: "AGENTIA", status: "FUTURE", accent: "blue", title: "Agentic Interface Platform", body: "Intelligent agents that act on behalf of users across digital environments." },
  { name: "GENERIA", status: "BUILDING", accent: "violet", title: "Generative Interface Engine", body: "Creates personalised interface experiences dynamically." },
  { name: "INCLUVIA", status: "FUTURE", accent: "cyan", title: "Inclusive Intelligence Platform", body: "Adaptive interfaces ensuring access for diverse cognitive and physical abilities." },
] as const;

const EMBEDDED_PRODUCTS = [
  { name: "SYNTHRA", status: "BUILDING", accent: "violet", title: "Embedded AI Compiler", body: "Optimises and deploys neural models for constrained embedded targets." },
  { name: "EMBERA", status: "RESEARCH", accent: "cyan", title: "Embedded Intelligence Platform", body: "End-to-end framework for on-device intelligence development." },
  { name: "SYNTRIX", status: "RESEARCH", accent: "emerald", title: "Hardware-Accelerated Inference", body: "Low-latency inference for dedicated AI hardware." },
  { name: "SENZORA", status: "BUILDING", accent: "amber", title: "Embedded Sensor Intelligence", body: "Real-time signal processing and interpretation at the sensor level." },
  { name: "ADAPTRON", status: "RESEARCH", accent: "pink", title: "Adaptive Embedded Control", body: "Self-tuning control systems for dynamic physical environments." },
  { name: "FORTEXA", status: "FUTURE", accent: "blue", title: "Safety-Critical Intelligence", body: "Certified intelligence for automotive, aerospace and industrial safety systems." },
  { name: "NEUROEDGE", status: "FUTURE", accent: "violet", title: "Neuromorphic Edge Computing", body: "Energy-efficient intelligence using neuromorphic computing architectures." },
] as const;

const IOT_PRODUCTS = [
  { name: "VITALINK", status: "BUILDING", accent: "violet", title: "IoT Connectivity Intelligence", body: "Adaptive, resilient connectivity management for large device networks." },
  { name: "VELOXIS", status: "RESEARCH", accent: "cyan", title: "Real-Time IoT Analytics", body: "Low-latency intelligence at the edge for time-critical IoT applications." },
  { name: "SYNARA", status: "RESEARCH", accent: "emerald", title: "IoT System Coordination", body: "Orchestrates distributed device behaviours and system-level responses." },
  { name: "AMBIORA", status: "BUILDING", accent: "amber", title: "Ambient Intelligence Platform", body: "Environment-aware systems that learn from physical spaces over time." },
  { name: "MESHRA", status: "RESEARCH", accent: "pink", title: "Mesh Network Intelligence", body: "Self-organising, adaptive mesh networks for complex environments." },
  { name: "SENTIARA", status: "FUTURE", accent: "blue", title: "Sensor Fusion Intelligence", body: "Combines heterogeneous sensor streams into coherent situational understanding." },
] as const;

const ROBOTICS_PRODUCTS = [
  { name: "EVORA", status: "BUILDING", accent: "violet", title: "Robotic Perception Intelligence", body: "Multi-modal perception for robots operating in unstructured environments." },
  { name: "AUTORA", status: "RESEARCH", accent: "cyan", title: "Autonomous Task Intelligence", body: "End-to-end task planning and execution for autonomous robotic systems." },
  { name: "ECOGNA", status: "RESEARCH", accent: "emerald", title: "Embodied Cognition Platform", body: "Robots that learn tasks through experience rather than explicit programming." },
  { name: "IDENTRA", status: "BUILDING", accent: "amber", title: "Human-Robot Interaction Intelligence", body: "Natural, safe and contextual interaction between humans and robotic systems." },
  { name: "VECTRAI", status: "RESEARCH", accent: "pink", title: "Motion Intelligence Engine", body: "Adaptive motion planning for complex manipulation and navigation tasks." },
  { name: "URBIXA", status: "FUTURE", accent: "blue", title: "Urban Robotics Platform", body: "Intelligence for robots operating in public and urban environments." },
  { name: "ROVARA", status: "FUTURE", accent: "violet", title: "Field Robotics Intelligence", body: "Autonomous systems for outdoor, unstructured and hazardous environments." },
  { name: "DEXORA", status: "BUILDING", accent: "cyan", title: "Dexterous Manipulation Platform", body: "Fine-motor intelligence for complex manipulation tasks." },
  { name: "SIMVORA", status: "RESEARCH", accent: "emerald", title: "Robotic Simulation Engine", body: "High-fidelity simulation for training and validating robotic intelligence." },
  { name: "ADAPTRA", status: "FUTURE", accent: "amber", title: "Adaptive Robot Learning", body: "Continuous learning and adaptation for deployed robotic systems." },
] as const;

const SUPPLY_CHAIN_PRODUCTS = [
  { name: "SYNTRAQ", status: "BUILDING", accent: "violet", title: "Supply Network Intelligence", body: "Models and monitors complex supply networks in real time." },
  { name: "ORBITRA", status: "RESEARCH", accent: "cyan", title: "Logistics Optimisation Engine", body: "Dynamic routing, scheduling and logistics decision intelligence." },
  { name: "CAUSIQ", status: "RESEARCH", accent: "emerald", title: "Causal Intelligence Platform", body: "Identifies root causes of supply disruptions and models intervention outcomes." },
  { name: "SCENARA", status: "BUILDING", accent: "amber", title: "Scenario Planning Intelligence", body: "Simulates supply-chain scenarios for risk assessment and strategic planning." },
  { name: "LOGIXA", status: "RESEARCH", accent: "pink", title: "Warehouse Intelligence System", body: "Autonomous coordination and optimisation for warehouse operations." },
  { name: "DEMARA", status: "FUTURE", accent: "blue", title: "Demand Intelligence Platform", body: "Anticipates demand signals across markets, channels and timeframes." },
  { name: "TRACEA", status: "BUILDING", accent: "violet", title: "Traceability Intelligence", body: "End-to-end visibility and provenance tracking across the supply network." },
  { name: "RESILIA", status: "FUTURE", accent: "cyan", title: "Supply Chain Resilience Engine", body: "Identifies vulnerabilities and builds adaptive resilience into supply networks." },
] as const;

const HOTELS_PRODUCTS = [
  { name: "AURIVA", status: "BUILDING", accent: "violet", title: "Property Brain", body: "Unified intelligence across guest experience, operations and service orchestration." },
  { name: "RESORA", status: "RESEARCH", accent: "cyan", title: "Resort World Model", body: "Models the live state of resort operations and guest environments in one adaptive system." },
  { name: "GUESTRA", status: "RESEARCH", accent: "emerald", title: "Experience Engine", body: "Maps guest preference, service journeys and engagement signals into adaptive operations." },
  { name: "ORBELA", status: "BUILDING", accent: "amber", title: "Operations Graph", body: "Connects staffing, facilities, service flows and experience delivery into a single operating model." },
  { name: "SERVONA", status: "RESEARCH", accent: "pink", title: "Robotic Service Grid", body: "Coordinates autonomous service operations and guest-facing delivery systems." },
  { name: "ECORA", status: "FUTURE", accent: "blue", title: "Resort Energy Brain", body: "Optimises energy, comfort and sustainability across hotel and resort operations." },
  { name: "ANTICIA", status: "BUILDING", accent: "violet", title: "Experience Prediction Engine", body: "Forecasts guest needs, demand patterns and service intensity before they materialise." },
  { name: "VIVORA", status: "FUTURE", accent: "cyan", title: "Experience Graph", body: "Links service interactions, loyalty behaviour and guest context across the destination ecosystem." },
  { name: "DESTINARA", status: "RESEARCH", accent: "emerald", title: "Destination Model", body: "Combines hospitality, mobility, experiences and service operations into one strategic intelligence surface." },
  { name: "MEMORA", status: "BUILDING", accent: "amber", title: "Hotel Knowledge Graph", body: "Creates a live operating memory of guest needs, service outcomes and operational decisions." },
  { name: "RESILIQA", status: "FUTURE", accent: "pink", title: "Resort Resilience Model", body: "Predicts disruptions, service stress and recovery needs in complex guest environments." },
] as const;

const TELECOMMUNICATION_PRODUCTS = [
  { name: "ORBIVA", status: "BUILDING", accent: "violet", title: "Global Connectivity Fabric", body: "Maps the behaviour of networks, users and services as a single adaptive communication system." },
  { name: "OBRIX", status: "RESEARCH", accent: "cyan", title: "Connectivity Intelligence Platform", body: "Optimises traffic, coverage and quality of service across distributed networks." },
  { name: "LUNARA", status: "RESEARCH", accent: "emerald", title: "D2D Core", body: "Enables direct-device communication intelligence for resilient, localised and low-latency connectivity." },
  { name: "ASTRAQ", status: "BUILDING", accent: "amber", title: "Orbital Network Engine", body: "Applies network intelligence to space-based and high-altitude connectivity systems." },
  { name: "MARIVA", status: "RESEARCH", accent: "pink", title: "Ocean Connect", body: "Supports remote, maritime and distributed connectivity environments with intelligent network logic." },
  { name: "ALTARA", status: "FUTURE", accent: "blue", title: "Remote Connectivity Intelligence", body: "Adapts service delivery to low-bandwidth, remote and high-friction infrastructure environments." },
] as const;

const FINANCE_PRODUCTS = [
  { name: "LUMORA", status: "BUILDING", accent: "violet", title: "Financial Intelligence Platform", body: "Connects risk, operations, compliance and customer behaviour into one intelligent decision fabric." },
  { name: "AUREXA", status: "RESEARCH", accent: "cyan", title: "Risk Intelligence Engine", body: "Models financial exposure and decision risk across complex portfolios and transactions." },
  { name: "QALORA", status: "RESEARCH", accent: "emerald", title: "Compliance Intelligence", body: "Reasoning over policy, exposure and behaviour to support regulated financial operations." },
  { name: "VANTRA", status: "BUILDING", accent: "amber", title: "Adaptive Banking Intelligence", body: "Links customer insight, digital services and operational performance into one control layer." },
  { name: "CREDIXA", status: "FUTURE", accent: "pink", title: "Market Signal Intelligence", body: "Monitors financial signals and contextual shifts to support more resilient decisions." },
] as const;

const PHARMA_PRODUCTS = [
  { name: "PHARMAREX", status: "BUILDING", accent: "violet", title: "Pharmaceutical Intelligence", body: "Uses computational reasoning to accelerate discovery, formulation and translational research." },
  { name: "BIOVANA", status: "RESEARCH", accent: "cyan", title: "Biomedical Discovery Engine", body: "Maps molecular relationships and discovery pathways across large biological data sets." },
  { name: "CLYNEXA", status: "RESEARCH", accent: "emerald", title: "Clinical Trial Intelligence", body: "Optimises recruitment, monitoring and decision support for modern clinical studies." },
  { name: "GENEVRA", status: "BUILDING", accent: "amber", title: "Genomic Intelligence Platform", body: "Analyses genomic context, variants and biological pathways for research and insight." },
  { name: "NEUROVA", status: "FUTURE", accent: "blue", title: "Neuroscience Intelligence", body: "Builds computational models for complex biomedical and neurological understanding." },
] as const;

const IMAGING_PRODUCTS = [
  { name: "VIZERA", status: "BUILDING", accent: "violet", title: "Medical Imaging Intelligence", body: "Multimodal image interpretation for diagnostics, monitoring and decision support." },
  { name: "SPECTRA", status: "RESEARCH", accent: "cyan", title: "Vision Intelligence Platform", body: "Combines visual sensing, spatial reasoning and contextual analysis into one system." },
  { name: "LUMOSAI", status: "RESEARCH", accent: "emerald", title: "Sensor Fusion Intelligence", body: "Integrates camera, radar, lidar and image data into coherent perception systems." },
  { name: "PIXARA", status: "BUILDING", accent: "amber", title: "Spatial Vision Engine", body: "Maps objects, motion and environment states for machine understanding and monitoring." },
  { name: "NOVAIR", status: "FUTURE", accent: "pink", title: "Imaging Intelligence Network", body: "Supports distributed sensing across industrial, environmental and medical intelligence systems." },
] as const;

const SEMICONDUCTOR_PRODUCTS = [
  { name: "SILVERA", status: "BUILDING", accent: "violet", title: "Compute Intelligence Platform", body: "Designs and optimises silicon-aware intelligence for next-generation compute systems." },
  { name: "NEXRAY", status: "RESEARCH", accent: "cyan", title: "Hardware-Accelerated Intelligence", body: "Improves performance and power efficiency for AI and compute workloads at silicon scale." },
  { name: "MIRRORA", status: "RESEARCH", accent: "emerald", title: "Embedded Compute Engine", body: "Bridges system design, device behaviour and intelligent optimisation for hardware products." },
  { name: "DIODEA", status: "BUILDING", accent: "amber", title: "Intelligent Hardware Fabric", body: "Optimises compute, power and thermal performance through system-aware intelligence." },
  { name: "CHIPVA", status: "FUTURE", accent: "blue", title: "Silicon Intelligence System", body: "Designs the intelligence layer for semiconductor platforms across edge and performance computing." },
] as const;

const SPACE_PRODUCTS = [
  { name: "ORBITRA", status: "BUILDING", accent: "violet", title: "Mission Intelligence Platform", body: "Supports autonomous aerospace systems through reasoning, forecasting and operational intelligence." },
  { name: "AERION", status: "RESEARCH", accent: "cyan", title: "Autonomous Flight Intelligence", body: "Models flight conditions, resilience and adaptive mission decision-making at scale." },
  { name: "SOLARA", status: "RESEARCH", accent: "emerald", title: "Space Systems Intelligence", body: "Adapts sensing, planning and counter-risk models for advanced orbital and mission operations." },
  { name: "ASTRIVA", status: "BUILDING", accent: "amber", title: "Deep-Space Operations Engine", body: "Supports autonomous planning and system awareness for complex mission operations." },
  { name: "ECLIPXA", status: "FUTURE", accent: "pink", title: "Mission Simulation Intelligence", body: "Creates realistic, high-fidelity simulation for aerospace performance, risk and decision planning." },
] as const;

const PRODUCT_ACCENTS = {
  violet: { border: "border-violet-300/45", soft: "bg-violet-400/10", text: "text-violet-200", glow: "shadow-[0_0_32px_rgba(167,139,250,0.16)]" },
  cyan: { border: "border-cyan-300/45", soft: "bg-cyan-400/10", text: "text-cyan-200", glow: "shadow-[0_0_32px_rgba(34,211,238,0.16)]" },
  emerald: { border: "border-emerald-300/45", soft: "bg-emerald-400/10", text: "text-emerald-200", glow: "shadow-[0_0_32px_rgba(52,211,153,0.16)]" },
  amber: { border: "border-amber-300/45", soft: "bg-amber-400/10", text: "text-amber-200", glow: "shadow-[0_0_32px_rgba(251,191,36,0.16)]" },
  pink: { border: "border-pink-300/45", soft: "bg-pink-400/10", text: "text-pink-200", glow: "shadow-[0_0_32px_rgba(244,114,182,0.16)]" },
  blue: { border: "border-blue-300/45", soft: "bg-blue-400/10", text: "text-blue-200", glow: "shadow-[0_0_32px_rgba(96,165,250,0.16)]" },
} as const;

function SoftwareEngineeringPanel() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const product = SOFTWARE_PRODUCTS[selectedProduct];
  const accent = PRODUCT_ACCENTS[product.accent];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,18,34,0.98),rgba(10,14,31,0.86))] p-4 sm:p-6 md:p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid gap-8 xl:grid-cols-[1fr_1.05fr] xl:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Software Intelligence Engineering</div>
            <h3 className="mt-4 max-w-xl font-display text-[clamp(32px,4vw,58px)] leading-[0.98] tracking-tight text-white">Software that understands itself.</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">Tarvyx develops intelligent engineering systems that understand, build, validate and evolve software across its complete lifecycle.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">Human intent, architecture, code, verification and runtime behaviour become one connected intelligence system.</p>
          </div>

          <div className="service-domain-diagram relative mx-auto h-[300px] w-full max-w-[560px] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),rgba(3,10,24,0.95)_62%)] sm:h-[350px]">
            <div className="service-domain-logo absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-cyan-300/60 bg-slate-950/85 shadow-[0_0_60px_rgba(34,211,238,0.25)] sm:h-36 sm:w-36 sm:rounded-[28px]">
              <div className="absolute inset-1.5 rounded-[16px] border border-cyan-300/25 sm:inset-2 sm:rounded-[23px]" />
              <img src={tmsLogo} alt="TMS logo" className="relative z-10 h-10 w-auto drop-shadow-[0_0_18px_rgba(96,165,250,0.8)] sm:h-20" />
            </div>
            {[
              ["HUMAN INTENT", "Understand goals", "left-1/2 top-4 -translate-x-1/2 border-cyan-300/40"],
              ["ARCHITECTURE", "Design systems", "left-4 top-1/2 -translate-y-1/2 border-violet-300/40"],
              ["CODE", "Build with quality", "right-4 top-1/2 -translate-y-1/2 border-cyan-300/40"],
              ["VALIDATION", "Verify correctness", "left-8 bottom-5 border-emerald-300/40"],
              ["EVOLUTION", "Improve continuously", "right-8 bottom-5 border-pink-300/40"],
            ].map(([label, detail, position], index) => (
              <div key={label} className={`service-domain-node service-domain-node-${index} absolute ${position} z-10 w-[112px] rounded-xl border bg-slate-950/80 px-2 py-2 backdrop-blur-xl sm:w-[150px] sm:rounded-2xl sm:px-3 sm:py-2.5`}>
                <div className="font-mono text-[9px] tracking-[0.18em] text-white/85">{label}</div>
                <div className="mt-1 text-[11px] text-white/55">{detail}</div>
              </div>
            ))}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 350" aria-hidden="true">
              <g fill="none" stroke="rgba(34,211,238,0.65)" strokeWidth="1.5" strokeDasharray="5 7">
                <path d="M300 125 L300 65" /><path d="M230 175 L155 175" /><path d="M370 175 L445 175" /><path d="M255 235 L180 295" /><path d="M345 235 L420 295" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Our Software Intelligence Products</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SOFTWARE_PRODUCTS.map((item, index) => (
            <button key={item.name} type="button" onClick={() => setSelectedProduct(index)} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${selectedProduct === index ? `${PRODUCT_ACCENTS[item.accent].border} ${PRODUCT_ACCENTS[item.accent].soft} ${PRODUCT_ACCENTS[item.accent].glow}` : "border-white/10 bg-white/5 hover:border-white/30"}`}>
              <div className={`absolute inset-x-0 top-0 h-1 ${PRODUCT_ACCENTS[item.accent].soft}`} />
              <div className="flex items-center justify-between gap-2"><span className="font-display text-lg font-semibold text-white">{item.name}</span><span className={`font-mono text-[8px] tracking-[0.15em] ${PRODUCT_ACCENTS[item.accent].text}`}>{item.status}</span></div>
              <p className="mt-3 text-xs leading-5 text-white/60">{item.title}</p>
              <span className={`mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${PRODUCT_ACCENTS[item.accent].text}`}>Explore <HiOutlineArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-[28px] border ${accent.border} ${accent.soft} ${accent.glow} p-4 sm:p-6 md:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0"><div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent.text}`}>Product intelligence brief</div><h4 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">{product.name}</h4><p className={`mt-2 max-w-2xl text-base sm:text-lg ${accent.text}`}>{product.title}</p></div>
          <span className={`rounded-full border ${accent.border} px-3 py-1 font-mono text-[9px] tracking-[0.2em] ${accent.text}`}>{product.status}</span>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65">{product.body}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{product.items.map((item) => <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white/70"><HiOutlineCheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />{item}</div>)}</div>
      </section>

    </div>
  );
}

function AIMachineLearningPanel() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const product = AI_PRODUCTS[selectedProduct];
  const accent = PRODUCT_ACCENTS[product.accent];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,18,34,0.98),rgba(10,14,31,0.86))] p-4 sm:p-6 md:p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid gap-8 xl:grid-cols-[1fr_1.05fr] xl:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Advanced Machine Intelligence</div>
            <h3 className="mt-4 max-w-xl font-display text-[clamp(32px,4vw,58px)] leading-[0.98] tracking-tight text-white">Building learning systems that perceive, reason, adapt and discover.</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">Tarvyx develops advanced machine intelligence systems that move beyond conventional model training and prediction. Our work explores adaptive learning, multimodal perception, machine reasoning, generative intelligence, continual learning and intelligent models capable of operating across changing environments.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">We engineer AI systems not only to recognise patterns, but to learn from experience, construct knowledge, understand context, reason over complex information and continuously improve their capabilities.</p>
          </div>

          <div className="service-domain-diagram relative mx-auto h-[300px] w-full max-w-[560px] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),rgba(3,10,24,0.95)_62%)] sm:h-[350px]">
            <div className="service-domain-logo absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-cyan-300/60 bg-slate-950/85 shadow-[0_0_60px_rgba(34,211,238,0.25)] sm:h-36 sm:w-36 sm:rounded-[28px]"><div className="absolute inset-1.5 rounded-[16px] border border-cyan-300/25 sm:inset-2 sm:rounded-[23px]" /><img src={tmsLogo} alt="TMS logo" className="relative z-10 h-10 w-auto drop-shadow-[0_0_18px_rgba(96,165,250,0.8)] sm:h-20" /></div>
            {["PERCEPTION", "REASONING", "LEARNING", "KNOWLEDGE", "DISCOVERY"].map((label, index) => {
              const positions = ["left-1/2 top-4 -translate-x-1/2 border-cyan-300/40", "left-4 top-1/2 -translate-y-1/2 border-violet-300/40", "right-4 top-1/2 -translate-y-1/2 border-cyan-300/40", "left-8 bottom-5 border-emerald-300/40", "right-8 bottom-5 border-pink-300/40"];
              return <div key={label} className={`service-domain-node service-domain-node-${index} absolute ${positions[index]} z-10 w-[112px] rounded-xl border bg-slate-950/80 px-2 py-2 backdrop-blur-xl sm:w-[150px] sm:rounded-2xl sm:px-3 sm:py-2.5`}><div className="font-mono text-[9px] tracking-[0.12em] sm:tracking-[0.18em] text-white/85">{label}</div></div>;
            })}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 350" aria-hidden="true"><g fill="none" stroke="rgba(34,211,238,0.65)" strokeWidth="1.5" strokeDasharray="5 7"><path d="M300 125 L300 65" /><path d="M230 175 L155 175" /><path d="M370 175 L445 175" /><path d="M255 235 L180 295" /><path d="M345 235 L420 295" /></g></svg>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Our Advanced Machine Intelligence Products</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AI_PRODUCTS.map((item, index) => (
            <button key={item.name} type="button" onClick={() => setSelectedProduct(index)} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${selectedProduct === index ? `${PRODUCT_ACCENTS[item.accent].border} ${PRODUCT_ACCENTS[item.accent].soft} ${PRODUCT_ACCENTS[item.accent].glow}` : "border-white/10 bg-white/5 hover:border-white/30"}`}>
              <div className={`absolute inset-x-0 top-0 h-1 ${PRODUCT_ACCENTS[item.accent].soft}`} />
              <div className="flex items-center justify-between gap-2"><span className="font-display text-lg font-semibold text-white">{item.name}</span><span className={`font-mono text-[8px] tracking-[0.15em] ${PRODUCT_ACCENTS[item.accent].text}`}>{item.status}</span></div>
              <p className="mt-3 text-xs leading-5 text-white/60">{item.title}</p>
              <span className={`mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${PRODUCT_ACCENTS[item.accent].text}`}>Explore <HiOutlineArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-[28px] border ${accent.border} ${accent.soft} ${accent.glow} p-4 sm:p-6 md:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0"><div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent.text}`}>Product intelligence brief</div><h4 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">{product.name}</h4><p className={`mt-2 max-w-2xl text-base sm:text-lg ${accent.text}`}>{product.title}</p></div><span className={`rounded-full border ${accent.border} px-3 py-1 font-mono text-[9px] tracking-[0.2em] ${accent.text}`}>{product.status}</span></div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65">{product.body}</p>
      </section>

    </div>
  );
}

function AutomotivePanel() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const product = AUTOMOTIVE_PRODUCTS[selectedProduct];
  const accent = PRODUCT_ACCENTS[product.accent];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,18,34,0.98),rgba(10,14,31,0.86))] p-4 sm:p-6 md:p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid gap-8 xl:grid-cols-[1fr_1.05fr] xl:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Automotive Intelligence &amp; Mobility Systems</div>
            <h3 className="mt-4 max-w-xl font-display text-[clamp(32px,4vw,58px)] leading-[0.98] tracking-tight text-white">Engineering intelligence for vehicles that perceive, reason, predict and adapt.</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">Tarvyx develops advanced automotive intelligence systems spanning vehicle perception, predictive intelligence, software-defined vehicles, simulation, embedded intelligence and autonomous mobility.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">Our work focuses on the transition from vehicles that execute predefined functions to vehicles that can understand their environment, reason about changing conditions and intelligently adapt their behaviour.</p>
          </div>

          <div className="service-domain-diagram relative mx-auto h-[300px] w-full max-w-[560px] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),rgba(3,10,24,0.95)_62%)] sm:h-[350px]">
            <div className="service-domain-logo absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-cyan-300/60 bg-slate-950/85 shadow-[0_0_60px_rgba(34,211,238,0.25)] sm:h-36 sm:w-36 sm:rounded-[28px]"><div className="absolute inset-1.5 rounded-[16px] border border-cyan-300/25 sm:inset-2 sm:rounded-[23px]" /><img src={tmsLogo} alt="TMS logo" className="relative z-10 h-10 w-auto drop-shadow-[0_0_18px_rgba(96,165,250,0.8)] sm:h-20" /></div>
            {["PERCEPTION", "PREDICTION", "MOBILITY", "SIMULATION", "ENERGY"].map((label, index) => {
              const positions = ["left-1/2 top-4 -translate-x-1/2 border-cyan-300/40", "left-4 top-1/2 -translate-y-1/2 border-violet-300/40", "right-4 top-1/2 -translate-y-1/2 border-cyan-300/40", "left-8 bottom-5 border-emerald-300/40", "right-8 bottom-5 border-pink-300/40"];
              return <div key={label} className={`service-domain-node service-domain-node-${index} absolute ${positions[index]} z-10 w-[112px] rounded-xl border bg-slate-950/80 px-2 py-2 backdrop-blur-xl sm:w-[150px] sm:rounded-2xl sm:px-3 sm:py-2.5`}><div className="font-mono text-[9px] tracking-[0.12em] sm:tracking-[0.18em] text-white/85">{label}</div></div>;
            })}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 350" aria-hidden="true"><g fill="none" stroke="rgba(34,211,238,0.65)" strokeWidth="1.5" strokeDasharray="5 7"><path d="M300 125 L300 65" /><path d="M230 175 L155 175" /><path d="M370 175 L445 175" /><path d="M255 235 L180 295" /><path d="M345 235 L420 295" /></g></svg>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Our Automotive Intelligence Products</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMOTIVE_PRODUCTS.map((item, index) => (
            <button key={item.name} type="button" onClick={() => setSelectedProduct(index)} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${selectedProduct === index ? `${PRODUCT_ACCENTS[item.accent].border} ${PRODUCT_ACCENTS[item.accent].soft} ${PRODUCT_ACCENTS[item.accent].glow}` : "border-white/10 bg-white/5 hover:border-white/30"}`}>
              <div className={`absolute inset-x-0 top-0 h-1 ${PRODUCT_ACCENTS[item.accent].soft}`} />
              <div className="flex items-center justify-between gap-2"><span className="font-display text-lg font-semibold text-white">{item.name}</span><span className={`font-mono text-[8px] tracking-[0.15em] ${PRODUCT_ACCENTS[item.accent].text}`}>{item.status}</span></div>
              <p className="mt-3 text-xs leading-5 text-white/60">{item.title}</p>
              <span className={`mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${PRODUCT_ACCENTS[item.accent].text}`}>Explore <HiOutlineArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-[28px] border ${accent.border} ${accent.soft} ${accent.glow} p-4 sm:p-6 md:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0"><div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent.text}`}>Product intelligence brief</div><h4 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">{product.name}</h4><p className={`mt-2 max-w-2xl text-base sm:text-lg ${accent.text}`}>{product.title}</p></div><span className={`rounded-full border ${accent.border} px-3 py-1 font-mono text-[9px] tracking-[0.2em] ${accent.text}`}>{product.status}</span></div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65">{product.body}</p>
      </section>
    </div>
  );
}

type DomainProduct = {
  name: string;
  status: string;
  accent: keyof typeof PRODUCT_ACCENTS;
  title: string;
  body: string;
};

function DomainProductPanel({
  domainName,
  tagline,
  body,
  secondBody,
  products,
  productHeading,
}: {
  domainName: string;
  tagline: string;
  body: string;
  secondBody: string;
  products: readonly DomainProduct[];
  productHeading: string;
}) {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const product = products[selectedProduct];
  const accent = PRODUCT_ACCENTS[product.accent];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,18,34,0.98),rgba(10,14,31,0.86))] p-4 sm:p-6 md:p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid gap-8 xl:grid-cols-[1fr_1.05fr] xl:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">{domainName}</div>
            <h3 className="mt-4 max-w-xl font-display text-[clamp(32px,4vw,58px)] leading-[0.98] tracking-tight text-white">{tagline}</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">{body}</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">{secondBody}</p>
          </div>

          <div className="service-domain-diagram relative mx-auto h-[300px] w-full max-w-[560px] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),rgba(3,10,24,0.95)_62%)] sm:h-[350px]">
            <div className="service-domain-logo absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-cyan-300/60 bg-slate-950/85 shadow-[0_0_60px_rgba(34,211,238,0.25)] sm:h-36 sm:w-36 sm:rounded-[28px]"><div className="absolute inset-1.5 rounded-[16px] border border-cyan-300/25 sm:inset-2 sm:rounded-[23px]" /><img src={tmsLogo} alt="TMS logo" className="relative z-10 h-10 w-auto drop-shadow-[0_0_18px_rgba(96,165,250,0.8)] sm:h-20" /></div>
            {["PERCEPTION", "REASONING", "LEARNING", "KNOWLEDGE", "DISCOVERY"].map((label, index) => {
              const positions = ["left-1/2 top-4 -translate-x-1/2 border-cyan-300/40", "left-4 top-1/2 -translate-y-1/2 border-violet-300/40", "right-4 top-1/2 -translate-y-1/2 border-cyan-300/40", "left-8 bottom-5 border-emerald-300/40", "right-8 bottom-5 border-pink-300/40"];
              return <div key={label} className={`service-domain-node service-domain-node-${index} absolute ${positions[index]} z-10 w-[112px] rounded-xl border bg-slate-950/80 px-2 py-2 backdrop-blur-xl sm:w-[150px] sm:rounded-2xl sm:px-3 sm:py-2.5`}><div className="font-mono text-[9px] tracking-[0.12em] sm:tracking-[0.18em] text-white/85">{label}</div></div>;
            })}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 350" aria-hidden="true"><g fill="none" stroke="rgba(34,211,238,0.65)" strokeWidth="1.5" strokeDasharray="5 7"><path d="M300 125 L300 65" /><path d="M230 175 L155 175" /><path d="M370 175 L445 175" /><path d="M255 235 L180 295" /><path d="M345 235 L420 295" /></g></svg>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">{productHeading}</div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {products.map((item, index) => (
            <button key={item.name} type="button" onClick={() => setSelectedProduct(index)} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${selectedProduct === index ? `${PRODUCT_ACCENTS[item.accent].border} ${PRODUCT_ACCENTS[item.accent].soft} ${PRODUCT_ACCENTS[item.accent].glow}` : "border-white/10 bg-white/5 hover:border-white/30"}`}>
              <div className={`absolute inset-x-0 top-0 h-1 ${PRODUCT_ACCENTS[item.accent].soft}`} />
              <div className="flex items-center justify-between gap-2"><span className="font-display text-lg font-semibold text-white">{item.name}</span><span className={`font-mono text-[8px] tracking-[0.15em] ${PRODUCT_ACCENTS[item.accent].text}`}>{item.status}</span></div>
              <p className="mt-3 text-xs leading-5 text-white/60">{item.title}</p>
              <span className={`mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${PRODUCT_ACCENTS[item.accent].text}`}>Explore <HiOutlineArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-[28px] border ${accent.border} ${accent.soft} ${accent.glow} p-4 sm:p-6 md:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0"><div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent.text}`}>Product intelligence brief</div><h4 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">{product.name}</h4><p className={`mt-2 max-w-2xl text-base sm:text-lg ${accent.text}`}>{product.title}</p></div><span className={`rounded-full border ${accent.border} px-3 py-1 font-mono text-[9px] tracking-[0.2em] ${accent.text}`}>{product.status}</span></div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65">{product.body}</p>
      </section>
    </div>
  );
}

function buildOverlayContent(service: ServiceCardData) {
  const title = service.title;
  const subtitle =
    title === "Software Engineering"
      ? "Building scalable, secure, and intelligent software products engineered for performance, innovation, and long-term growth."
      : `Delivering premium ${title.toLowerCase()} solutions with performance, reliability, and intelligent engineering.`;

  const overview =
    title === "Software Engineering"
      ? "We design and develop enterprise-grade software using modern architectures, cloud-native technologies, AI integration, and high-performance engineering principles to deliver reliable digital products."
      : `We design and develop enterprise-grade ${title.toLowerCase()} solutions using modern architectures, cloud-native technologies, AI integration, and high-performance engineering principles to deliver reliable business outcomes.`;

  const capabilities = [
    "Product Architecture",
    "Full-Stack Development",
    title.includes("Cloud") ? "Cloud Native Development" : "Enterprise Applications",
    "REST & GraphQL APIs",
    "Database Engineering",
    "DevOps & CI/CD",
    "AI Integration",
    title.includes("Security") ? "Security Posture" : "Performance Optimization",
    title.includes("Software") ? "Software Testing" : "Resilience Engineering",
    title.includes("Research") ? "Quantum Modeling" : "Operational Excellence",
  ];

  const metrics = [
    { label: "Projects Delivered", value: 42, suffix: "+" },
    { label: "Technologies", value: 18, suffix: "+" },
    { label: "Research Areas", value: 8, suffix: "+" },
    { label: "Code Quality", value: 999, suffix: "%" },
  ];

  return { title, subtitle, overview, capabilities, techStack: TECHNOLOGY_STACK.slice(0, 12), metrics, workflow: WORKFLOW };
}

export default function ServiceOverlay({ service, open, onClose }: ServiceOverlayProps) {
  const scrollYRef = useRef(0);
  const prevBodyStyles = useRef<Partial<CSSStyleDeclaration>>({});
  const prevHtmlStyles = useRef<Partial<CSSStyleDeclaration>>({});

  useLayoutEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY || window.pageYOffset;

    scrollYRef.current = scrollY;
    prevBodyStyles.current = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    prevHtmlStyles.current = {
      position: html.style.position,
      top: html.style.top,
      left: html.style.left,
      right: html.style.right,
      width: html.style.width,
      overflow: html.style.overflow,
    };

    body.classList.add("modal-open");
    html.classList.add("modal-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.position = "fixed";
    html.style.top = `-${scrollY}px`;
    html.style.left = "0";
    html.style.right = "0";
    html.style.width = "100%";
    html.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.classList.remove("modal-open");
      html.classList.remove("modal-open");
      body.style.position = prevBodyStyles.current.position || "";
      body.style.top = prevBodyStyles.current.top || "";
      body.style.left = prevBodyStyles.current.left || "";
      body.style.right = prevBodyStyles.current.right || "";
      body.style.width = prevBodyStyles.current.width || "";
      body.style.overflow = prevBodyStyles.current.overflow || "";
      html.style.position = prevHtmlStyles.current.position || "";
      html.style.top = prevHtmlStyles.current.top || "";
      html.style.left = prevHtmlStyles.current.left || "";
      html.style.right = prevHtmlStyles.current.right || "";
      html.style.width = prevHtmlStyles.current.width || "";
      html.style.overflow = prevHtmlStyles.current.overflow || "";
      window.scrollTo(0, Math.abs(scrollYRef.current));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const [brochureOpen, setBrochureOpen] = useState(false);
  const content = service ? buildOverlayContent(service) : null;

  return (
    <AnimatePresence>
      {open && service && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-[rgba(5,10,18,0.72)] backdrop-blur-[14px]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={BACKDROP_VARIANTS}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="fixed top-0 left-0 z-[9999] flex min-h-[0] w-full h-[100dvh] sm:top-1/2 sm:left-1/2 sm:w-[95vw] sm:max-w-[1100px] sm:h-[min(85vh,900px)] sm:-translate-x-1/2 sm:-translate-y-1/2 flex-col overflow-hidden rounded-none sm:rounded-[30px] border border-white/10 bg-[rgba(8,12,24,0.88)] shadow-[0_40px_120px_rgba(56,189,248,0.28)] backdrop-blur-[18px]"
            variants={PANEL_VARIANTS}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-[-6%] top-8 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="absolute right-[-8%] bottom-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
              <motion.div
                animate={{ x: ["-110%", "110%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent"
              />
            </div>

            <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[rgba(7,11,22,0.92)]/95 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-5">
              <div className="min-w-0 flex-1">
                <span className="block break-words font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.3em]">{service.title}</span>
                <h2 className="break-words font-display text-[clamp(22px,6vw,38px)] font-semibold leading-tight tracking-tight text-white">
                  {service.title === "Software Engineering" ? "Software Intelligence Engineering" : service.title === "AI & Machine Learning" ? "Advanced Machine Intelligence" : service.title === "Automotive Engineering" ? "Automotive Intelligence & Mobility Systems" : service.title === "Quantum Research" ? "Quantum Intelligence & Computational Systems" : service.title === "Cloud Computing" ? "Computational Intelligence Infrastructure" : service.title === "Cyber Security" ? "Adaptive Cyber Intelligence" : service.title === "Global Health & Medical Sciences" ? "Medical Intelligence & Discovery Systems" : service.title === "UI / UX" ? "Human-Centred Intelligence Systems" : service.title === "Embedded Systems" ? "Embedded Systems Intelligence" : service.title === "IoT" ? "Intelligent Connected Systems" : service.title === "Robotics" ? "Autonomous Machine Intelligence" : service.title === "Supply Chain & Logistics" ? "Supply Chain Intelligence" : service.title === "Hotels & Resorts Intelligence" ? "Hotels & Resorts Intelligence" : service.title === "Telecommunication" ? "Telecommunication" : content?.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-white/10 text-white shadow-[0_0_24px_rgba(56,189,248,0.15)] transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] sm:h-12 sm:w-12"
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-cyan-300/10"
                  whileTap={{ scale: 1.4, opacity: [0.6, 0] }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                />
                <motion.span
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-black/20 sm:h-10 sm:w-10"
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </motion.span>
              </button>
            </div>

            <div className={`modal-body flex-1 min-h-0 max-h-full ${brochureOpen ? "overflow-hidden" : "overflow-y-auto"} overscroll-contain touch-pan-y px-4 py-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-6 sm:py-8 md:px-8 lg:px-10 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent`}>
              {service.title === "Software Engineering" ? (
                <SoftwareEngineeringPanel />
              ) : service.title === "AI & Machine Learning" ? (
                <AIMachineLearningPanel />
              ) : service.title === "Automotive Engineering" ? (
                <AutomotivePanel />
              ) : service.title === "Quantum Research" ? (
                <DomainProductPanel
                  domainName="Quantum Intelligence & Computational Systems"
                  tagline="Engineering algorithms and computational architectures for the post-classical era."
                  body="Tarvyx explores the intersection of quantum computing, artificial intelligence and advanced computational science to develop algorithms and software systems designed for problems that challenge conventional computation."
                  secondBody="Our research focuses on quantum algorithms, hybrid quantum-classical architectures, quantum simulation and the development of computational methods that are being designed now for the hardware that is emerging."
                  productHeading="Our Quantum Intelligence Products"
                  products={QUANTUM_PRODUCTS}
                />
              ) : service.title === "Cloud Computing" ? (
                <DomainProductPanel
                  domainName="Computational Intelligence Infrastructure"
                  tagline="Computing that understands the workload it is running."
                  body="Tarvyx develops next-generation computational infrastructure designed to make cloud environments more intelligent, adaptive and autonomous."
                  secondBody="Our research moves beyond conventional infrastructure management toward systems that can understand workload behaviour, predict computational demand, dynamically allocate resources and intelligently distribute workloads across cloud, edge, on-premises and hybrid environments."
                  productHeading="Our Computational Intelligence Products"
                  products={CLOUD_PRODUCTS}
                />
              ) : service.title === "Cyber Security" ? (
                <DomainProductPanel
                  domainName="Adaptive Cyber Intelligence"
                  tagline="Systems that learn how attackers think."
                  body="Tarvyx develops advanced cyber intelligence systems that move beyond signature-based detection toward adaptive, reasoning-capable security platforms."
                  secondBody="Our work explores threat intelligence, behavioural analysis, identity intelligence, vulnerability reasoning and autonomous cyber-defence systems designed for modern threat environments."
                  productHeading="Our Adaptive Cyber Intelligence Products"
                  products={CYBERSECURITY_PRODUCTS}
                />
              ) : service.title === "Healthcare & Life Sciences" ? (
                <DomainProductPanel
                  domainName="Medical Intelligence & Discovery Systems"
                  tagline="Accelerating discovery, diagnosis, and care through intelligent systems."
                  body="Tarvyx develops intelligent medical and life-science systems that apply AI, computational biology, simulation and advanced data science to healthcare, clinical research, genomics and global health challenges."
                  secondBody="Our work spans diagnostic intelligence, drug discovery, genomic analysis, surgical systems and epidemiological modelling."
                  productHeading="Our Medical Intelligence Products"
                  products={MEDICAL_PRODUCTS}
                />
              ) : service.title === "UI / UX" ? (
                <DomainProductPanel
                  domainName="Human-Centred Intelligence Systems"
                  tagline="Interfaces that understand people, not just inputs."
                  body="Tarvyx develops intelligent human-interface systems that adapt to individual users, understand context and intent, and create interactions that feel natural and purposeful."
                  secondBody="Our work spans voice intelligence, spatial computing, affective systems and generative interfaces."
                  productHeading="Our Human Interface Intelligence Products"
                  products={HUMAN_INTERFACE_PRODUCTS}
                />
              ) : service.title === "Embedded Systems" ? (
                <DomainProductPanel
                  domainName="Embedded Systems Intelligence"
                  tagline="Intelligence engineered for constrained, real-world environments."
                  body="Tarvyx develops advanced embedded and edge-computing technologies that bring intelligence directly into physical systems."
                  secondBody="Our work focuses on efficient, reliable intelligence for microcontrollers, FPGAs, dedicated hardware accelerators and safety-critical embedded environments."
                  productHeading="Our Embedded Intelligence Products"
                  products={EMBEDDED_PRODUCTS}
                />
              ) : service.title === "IoT" ? (
                <DomainProductPanel
                  domainName="Intelligent Connected Systems"
                  tagline="Infrastructure that learns from the physical world."
                  body="Tarvyx develops next-generation connected systems that transform distributed physical environments into intelligent, responsive ecosystems."
                  secondBody="Our work spans device management, edge intelligence, real-time analytics and autonomous IoT coordination."
                  productHeading="Our Intelligent Connected Systems Products"
                  products={IOT_PRODUCTS}
                />
              ) : service.title === "Robotics" ? (
                <DomainProductPanel
                  domainName="Autonomous Machine Intelligence"
                  tagline="Robots that understand, adapt and collaborate."
                  body="Tarvyx develops intelligent robotic systems that move beyond preprogrammed automation toward machines that perceive their environment, reason about tasks, adapt to unexpected situations and collaborate safely with humans."
                  secondBody="Our work spans manipulation intelligence, autonomous navigation, swarm systems and robotic simulation."
                  productHeading="Our Autonomous Machine Intelligence Products"
                  products={ROBOTICS_PRODUCTS}
                />
              ) : service.title === "Supply Chain & Logistics" ? (
                <DomainProductPanel
                  domainName="Supply Chain Intelligence"
                  tagline="Logistics systems that reason, predict and adapt."
                  body="Tarvyx develops advanced supply-chain intelligence systems designed to understand complex networks of suppliers, manufacturers, warehouses, transportation systems, markets and demand."
                  secondBody="Our work moves beyond conventional logistics optimisation toward dynamic supply-network modelling, predictive disruption management and autonomous supply-chain decision-making."
                  productHeading="Our Supply Chain Intelligence Products"
                  products={SUPPLY_CHAIN_PRODUCTS}
                />
              ) : service.title === "Hotels & Resorts" ? (
                <DomainProductPanel
                  domainName="Intelligent Hospitality & Resort Systems"
                  tagline="Guest experience platforms, resort operations, and autonomous hospitality intelligence."
                  body="Tarvyx develops hospitality technology that links guest experience, service operations, energy management and destination intelligence into one connected operating system."
                  secondBody="The platform combines operational intelligence with adaptive service delivery, so hotels and resorts can understand demand, personalise guest journeys and optimise experiences in real time."
                  productHeading="Our Hospitality Intelligence Products"
                  products={HOTELS_PRODUCTS}
                />
              ) : service.title === "Telecommunications" ? (
                <DomainProductPanel
                  domainName="Global Connectivity Intelligence"
                  tagline="Next-generation communication systems for resilient, adaptive, connected environments."
                  body="Tarvyx develops connectivity systems that reason over communication networks, device interactions and service quality across distributed environments."
                  secondBody="Our work spans terrestrial, remote and edge communication systems, enabling resilient and adaptive performance for highly connected operations and communities."
                  productHeading="Our Telecommunications Products"
                  products={TELECOMMUNICATION_PRODUCTS}
                />
              ) : service.title === "Financial Intelligence" ? (
                <DomainProductPanel
                  domainName="Financial Intelligence Systems"
                  tagline="Risk-aware financial systems built for adaptive compliance and operational intelligence."
                  body="Tarvyx develops intelligent financial infrastructure that connects risk, compliance, customer behaviour and operational performance into one adaptive decision layer."
                  secondBody="The focus is on financial systems that can understand changing conditions, predict risk, support better decisions and deliver trusted customer experiences."
                  productHeading="Our Financial Intelligence Products"
                  products={FINANCE_PRODUCTS}
                />
              ) : service.title === "Pharmaceuticals" ? (
                <DomainProductPanel
                  domainName="Pharmaceutical Intelligence"
                  tagline="Computational discovery, molecular intelligence, and clinical research acceleration."
                  body="Tarvyx develops intelligence systems that accelerate biomedical discovery, drug development and clinical research through data-driven reasoning and scientific modelling."
                  secondBody="Our work spans molecular intelligence, genomic interpretation, biomedical research and the translation of discovery into clinical impact."
                  productHeading="Our Pharmaceutical Intelligence Products"
                  products={PHARMA_PRODUCTS}
                />
              ) : service.title === "Semiconductors" ? (
                <DomainProductPanel
                  domainName="Semiconductor Intelligence"
                  tagline="Compute systems engineered for performance, scale and intelligent silicon operations."
                  body="Tarvyx develops semiconductor and hardware intelligence systems designed to optimise compute performance, power efficiency and system resilience at silicon scale."
                  secondBody="Our work links hardware design, performance modelling and intelligent software to build the next generation of compute platforms."
                  productHeading="Our Semiconductor Intelligence Products"
                  products={SEMICONDUCTOR_PRODUCTS}
                />
              ) : service.title === "Space & Aerospace" ? (
                <DomainProductPanel
                  domainName="Space & Aerospace Intelligence"
                  tagline="Mission intelligence for autonomous aerospace systems and deep-technology operations."
                  body="Tarvyx develops aerospace and space intelligence systems for mission planning, autonomous operations, resilient flight control and system awareness in complex environments."
                  secondBody="Our focus is on intelligence that supports flight systems, operational resilience and mission discovery under challenging, uncertain conditions."
                  productHeading="Our Space & Aerospace Products"
                  products={SPACE_PRODUCTS}
                />
              ) : service.title === "Camera & Imaging" ? (
                <DomainProductPanel
                  domainName="Imaging & Perception Intelligence"
                  tagline="Vision intelligence, sensor fusion and spatial understanding for real-world environments."
                  body="Tarvyx develops imaging and vision intelligence systems that connect sensors, perception models and operational context into a single intelligence layer."
                  secondBody="The work supports scientific imaging, machine vision, spatial understanding and multimodal perception in industrial, medical and commercial environments."
                  productHeading="Our Imaging Intelligence Products"
                  products={IMAGING_PRODUCTS}
                />
              ) : (
              <>
              <div className="mb-8 max-w-3xl">
                <p className="text-sm leading-7 text-white/70">{content?.subtitle}</p>
              </div>

              {service.title === "Education" ? (
                <div className="space-y-8">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Education Experience</div>
                    <p className="text-[15px] leading-8 text-white/75">{content?.overview}</p>
                  </div>
                  <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4 backdrop-blur-xl">
                    <CourseCatalog onBrochureOpenChange={setBrochureOpen} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 lg:grid-cols-[1.4fr_0.95fr]">
                    <div className="space-y-6">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Overview</div>
                        <p className="text-[15px] leading-8 text-white/75">{content?.overview}</p>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Core Capabilities</div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {content?.capabilities.map((capability) => (
                            <div key={capability} className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                              {capability}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Technology Stack</div>
                        <div className="grid grid-cols-3 gap-3">
                          {content?.techStack.map((tech) => {
                            const Icon = tech.icon;
                            return (
                              <motion.div
                                key={tech.label}
                                whileHover={{ y: -4, scale: 1.03, boxShadow: "0 0 0 10px rgba(56,189,248,0.08)" }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="group flex flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-black/20 p-3 text-[11px] text-white/70"
                              >
                                <Icon className="h-5 w-5 text-cyan-300" />
                                <span className="text-center text-[11px] text-white/75">{tech.label}</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Engineering Metrics</div>
                        <div className="grid grid-cols-2 gap-3">
                          {content?.metrics.map((metric) => (
                            <div key={metric.label} className="rounded-3xl border border-white/10 bg-black/20 p-4 text-center">
                              <div className="text-2xl font-semibold text-gradient">
                                {metric.suffix === "%" ? `${(metric.value / 10).toFixed(1)}${metric.suffix}` : `${metric.value}${metric.suffix || ""}`}
                              </div>
                              <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/40">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Development Workflow</div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70">
                      {content?.workflow.map((step, index) => (
                        <div key={step} className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-center text-[10px] text-white/75">{index + 1}</div>
                          <div>{step}</div>
                          {index < content.workflow.length - 1 && <span className="h-px w-10 bg-gradient-to-r from-cyan-300/70 to-transparent" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
