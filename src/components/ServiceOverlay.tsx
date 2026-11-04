import { lazy, Suspense, useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineCodeBracket, HiOutlineSparkles, HiOutlineBeaker, HiOutlineCpuChip, HiOutlineAcademicCap, HiOutlineCube, HiOutlineCloud, HiOutlineCircleStack, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";
import CourseCatalog from "./Courses";
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

const SoftwareVisual = lazy(() => import("./SoftwareVisual"));
type SoftwareVisualProps = ComponentProps<typeof SoftwareVisual>;

function LazySoftwareVisual(props: SoftwareVisualProps) {
  return (
    <Suspense fallback={<div className={`software-visual-fallback ${props.className ?? ""}`} aria-hidden="true" />}>
      <SoftwareVisual {...props} />
    </Suspense>
  );
}

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const SOFTWARE_LIFECYCLE = [
  { title: "Human Intent", detail: "Understand requirements", icon: HiOutlineSparkles },
  { title: "Architecture", detail: "Design systems", icon: HiOutlineCircleStack },
  { title: "Implementation", detail: "Build with intelligence", icon: HiOutlineCodeBracket },
  { title: "Validation", detail: "Verify correctness", icon: HiOutlineCheckCircle },
  { title: "Deployment", detail: "Release with confidence", icon: HiOutlineCloud },
  { title: "Runtime", detail: "Learn and evolve", icon: HiOutlineCpuChip },
] as const;

const SOFTWARE_PRODUCTS = [
  {
    id: "nexora", number: "01", name: "NEXORA", status: "BUILDING", accent: "violet", visual: "nexora",
    title: "The intelligence layer for software engineering.",
    commercial: "Enterprise software intelligence",
    body: "Nexora is Tarvyx's next-generation software intelligence platform, designed to understand software as a living system rather than a collection of source-code files. It connects requirements, architecture, code, dependencies, tests, infrastructure and runtime behaviour into a continuously evolving software model. It aims to help engineering teams understand complex systems, identify architectural risks, simulate changes, generate implementation strategies and continuously improve software throughout its lifecycle.",
    project: "NEXORA SOFTWARE GRAPH", projectDetail: "Requirements → Services → Code → APIs → Data → Infrastructure → Users → Runtime behaviour",
    capabilities: ["Architecture analysis", "Codebase intelligence", "Dependency reasoning", "Change-risk prediction"],
  },
  {
    id: "codelys", number: "02", name: "CODELYS", status: "RESEARCH", accent: "cyan", visual: "codelys",
    title: "From intent to intelligent software.",
    commercial: "AI-native development platform",
    body: "Codelys explores a new model of software creation in which developers express system intent, constraints and desired behaviour while intelligent engineering systems assist in transforming those specifications into validated software. Architecture, correctness, testing, security and maintainability remain part of the process.",
    project: "CODELYS INTENT ENGINE", projectDetail: "Intent → Architecture → Components → APIs → Data model → Security → Tests → Implementation plan",
    capabilities: ["Intent to architecture", "Implementation planning", "Testing and security", "Validated software design"],
  },
  {
    id: "evolis", number: "03", name: "EVOLIS", status: "RESEARCH", accent: "pink", visual: "evolis",
    title: "Software that continuously understands its own evolution.",
    commercial: "Software evolution intelligence",
    body: "Evolis analyses how systems change over time, identifying architectural drift, technical debt and future risks. It helps engineering teams understand how today's decisions may affect tomorrow's reliability, performance and maintainability.",
    project: "ARCHITECTURE EVOLUTION ENGINE", projectDetail: "Version changes → Architecture drift → Technical debt → Risk → Recommended evolution",
    capabilities: ["Architecture evolution", "Technical-debt analysis", "Change-impact analysis", "Future-risk prediction"],
  },
  {
    id: "syndex", number: "04", name: "SYNDEX", status: "FUTURE", accent: "blue", visual: "syndex",
    title: "A runtime intelligence system for software.",
    commercial: "Runtime and software-system intelligence",
    body: "Syndex connects software architecture with runtime behaviour to reveal not only what systems are designed to do, but how they actually behave in production. Its digital software twin models services, traffic, dependencies, failures, resources and user behaviour.",
    project: "SYNDEX DIGITAL SOFTWARE TWIN", projectDetail: "Explore what happens when traffic rises 10×, a dependency fails, or the architecture changes.",
    capabilities: ["Service-behaviour modelling", "Traffic and failure simulation", "Runtime-architecture links", "What-if analysis"],
  },
  {
    id: "veridis", number: "05", name: "VERIDIS", status: "RESEARCH", accent: "emerald", visual: "veridis",
    title: "Software correctness intelligence.",
    commercial: "Software verification intelligence",
    body: "Veridis reasons about whether software behaves according to its intended specification. Its behaviour engine connects requirements to expected and observed behaviour, then identifies differences and evaluates their risk.",
    project: "VERIDIS BEHAVIOUR ENGINE", projectDetail: "Requirement → Expected behaviour → Implementation → Observed behaviour → Difference → Risk. Research: property-based testing, formal-method integration and regression reasoning.",
    capabilities: ["Behavioural verification", "AI-assisted test generation", "Security validation", "Edge-case discovery"],
  },
  {
    id: "oryon", number: "06", name: "ORYON", status: "FUTURE", accent: "violet", visual: "oryon",
    title: "Autonomous software operations intelligence.",
    commercial: "Autonomous software operations",
    body: "Oryon is a future-facing system for understanding and coordinating software infrastructure. It observes, diagnoses and simulates operations, recommends actions for human approval, and verifies outcomes under controlled permissions.",
    project: "ORYON AUTONOMOUS OPERATIONS", projectDetail: "Observe → Understand → Diagnose → Simulate → Recommend → Human approval → Execute → Verify. Potential capabilities include deployment-risk analysis, incident intelligence and capacity simulation.",
    capabilities: ["Failure prediction", "Root-cause reasoning", "Infrastructure optimisation", "Controlled remediation"],
  },
] as const;

type AIProduct = {
  id: string;
  number: string;
  name: string;
  status: string;
  accent: "violet" | "cyan" | "emerald" | "amber" | "pink" | "blue";
  visual: SoftwareVisualProps["kind"];
  title: string;
  body: string;
  project: string;
  projectDetail: string;
  commercial?: string;
  capabilities: string[];
  applications?: string[];
};

const AI_PRODUCTS: AIProduct[] = [
  {
    id: "neurix", number: "01", name: "TARVYX NEURIX", status: "RESEARCH", accent: "violet", visual: "nexora",
    title: "Adaptive Intelligence That Learns Beyond Static Training.",
    body: "Neurix is Tarvyx's adaptive machine-learning platform focused on systems that can learn from changing environments without treating every new situation as a completely new training problem. Neurix explores continual learning, contextual adaptation, experience-based learning and controlled model evolution to create AI systems capable of remaining useful as their environment changes.",
    project: "NEURIX CONTINUAL LEARNING ENGINE",
    projectDetail: "Initial Knowledge → Real-World Experience → New Information → Knowledge Conflict Detection → Adaptation → Evaluation → Validated Knowledge → Updated Intelligence",
    commercial: "Enterprise Adaptive AI Infrastructure",
    capabilities: ["Continual learning", "Concept-drift detection", "Catastrophic-forgetting mitigation", "Experience replay", "Adaptive model routing", "Online evaluation", "Knowledge consolidation"],
  },
  {
    id: "perceva", number: "02", name: "TARVYX PERCEVA", status: "RESEARCH", accent: "cyan", visual: "syndex",
    title: "Machine Perception for Complex Reality.",
    body: "Perceva is Tarvyx's machine-perception platform designed to help intelligent systems understand visual, spatial and temporal information as interconnected events rather than isolated inputs. The platform combines perception, context and temporal understanding to create richer representations of complex environments.",
    project: "PERCEVA WORLD PERCEPTION ENGINE",
    projectDetail: "Camera + Video + Sensors + Spatial Information → Objects + Relationships + Events + Movement + Environmental Context",
    capabilities: ["Visual understanding", "Spatial understanding", "Temporal understanding", "Object and relationship analysis", "Event and movement context"],
    applications: ["Robotics", "Industrial intelligence", "Automotive", "Smart environments", "Autonomous systems", "Scientific imaging"],
  },
  {
    id: "kynara", number: "03", name: "TARVYX KYNARA", status: "RESEARCH", accent: "emerald", visual: "evolis",
    title: "Learning Through Experience, Not Just Data.",
    body: "Kynara explores machine-learning architectures in which intelligent systems learn not only from static datasets but also from sequences of interaction, feedback and outcomes. The objective is to develop systems that can build increasingly useful internal representations from experience while maintaining controlled evaluation and human oversight.",
    project: "KYNARA EXPERIENCE ENGINE",
    projectDetail: "Environment → Observation → Action → Outcome → Feedback → Experience Memory → Policy / Model Update → Evaluation",
    capabilities: ["Reinforcement learning", "Experience modelling", "World-state representation", "Reward modelling", "Behaviour evaluation", "Simulation-based learning"],
    applications: ["Potential future connection to robotics and autonomous systems"],
  },
  {
    id: "omnexa", number: "04", name: "TARVYX OMNEXA", status: "RESEARCH", accent: "amber", visual: "codelys",
    title: "Intelligence Across Every Modality.",
    body: "Omnexa is a multimodal intelligence platform designed to unify information across language, vision, audio, video, documents and structured data into a shared computational context. Rather than processing each modality independently, Omnexa explores how different forms of information can reinforce one another to create richer machine understanding.",
    project: "OMNEXA FUSION ENGINE",
    projectDetail: "Text + Images + Audio + Video + Sensors + Documents → Unified Representation → Reasoning → Decision",
    capabilities: ["Cross-modal representation", "Multimodal reasoning", "Context fusion", "Information relationship analysis"],
    commercial: "High-value enterprise AI infrastructure",
  },
  {
    id: "synvora", number: "05", name: "TARVYX SYNVORA", status: "RESEARCH", accent: "pink", visual: "veridis",
    title: "Machine Intelligence for Unknown Situations.",
    body: "Synvora is a research-driven intelligence platform focused on uncertainty, novelty and unfamiliar situations. It explores how machine-learning systems can recognize when an observation falls outside their learned experience and respond appropriately rather than producing unjustified confidence. The objective is to make intelligent systems more aware of uncertainty and novelty.",
    project: "SYNVORA NOVELTY ENGINE",
    projectDetail: "Observation → Known? → Process / Novelty Detection → Uncertainty → Investigation → Human or External Knowledge",
    capabilities: ["Out-of-distribution detection", "Uncertainty estimation", "Novelty detection", "Confidence calibration", "Unknown-event classification", "Human escalation"],
    applications: ["Safety-critical and high-consequence environments"],
  },
  {
    id: "hypera", number: "06", name: "TARVYX HYPERA", status: "RESEARCH", accent: "blue", visual: "oryon",
    title: "Machines That Search the Space of Possibilities.",
    body: "Hypera explores many possible solutions instead of only predicting a single output. Its discovery-engine concept generates and evaluates alternatives, eliminates weak solutions, explores new variants, simulates outcomes and ranks candidates for human validation.",
    project: "HYPERA DISCOVERY ENGINE",
    projectDetail: "Problem → Generate Possibilities → Evaluate → Eliminate Weak Solutions → Explore New Variants → Simulate → Rank → Human Validation",
    capabilities: ["Possibility generation", "Alternative evaluation", "Simulation", "Solution ranking", "Human validation"],
    applications: ["Engineering", "Materials", "Drug discovery", "Optimization", "Architecture", "Energy", "Manufacturing"],
  },
  {
    id: "lumenix", number: "07", name: "TARVYX LUMENIX", status: "RESEARCH", accent: "violet", visual: "lumenix",
    title: "Machine Learning That Understands Relationships.",
    body: "Lumenix explores machine-learning systems that focus on structured relationships between entities, rather than only feature-to-prediction relationships. Its knowledge-engine concept builds dynamic representations of entities, relationships, events, time and dependencies.",
    project: "LUMENIX KNOWLEDGE ENGINE",
    projectDetail: "Entities + Relationships + Events + Time + Dependencies",
    capabilities: ["Knowledge-graph representations", "Entity relationships", "Event and time modelling", "Dependency reasoning"],
    applications: ["Enterprise intelligence", "Scientific research", "Supply-chain intelligence", "Financial analysis", "Cybersecurity", "Healthcare research"],
  },
] as const;

const AI_LIFECYCLE = [
  { title: "Perception", detail: "Understand complex inputs", icon: HiOutlineSparkles },
  { title: "Learning", detail: "Discover patterns and knowledge", icon: HiOutlineAcademicCap },
  { title: "Memory", detail: "Retain useful experience", icon: HiOutlineCircleStack },
  { title: "Context", detail: "Connect information and relationships", icon: HiOutlineBeaker },
  { title: "Reasoning", detail: "Evaluate possibilities", icon: HiOutlineCodeBracket },
  { title: "Adaptation", detail: "Improve with experience", icon: HiOutlineArrowRight },
] as const;

type AutomotiveProduct = {
  id: string;
  number: string;
  name: string;
  title: string;
  body: string;
  project: string;
  projectDetail: string;
  status: string;
  accent: keyof typeof PRODUCT_ACCENTS;
  visual: SoftwareVisualProps["kind"];
  capabilities: string[];
};

const AUTOMOTIVE_PRODUCTS: AutomotiveProduct[] = [
  {
    id: "velion", number: "01", name: "VELION", status: "RESEARCH", accent: "violet", visual: "nexora",
    title: "A Cognitive Layer for the Software-Defined Vehicle.",
    body: "Velion is TarvyX's next-generation vehicle intelligence architecture designed for software-defined vehicles. It creates a unified computational layer through which vehicle systems can interpret information from multiple sources, understand vehicle state and support intelligent decisions. Velion is designed around modular intelligence rather than a collection of isolated automotive functions, enabling future vehicle capabilities to evolve primarily through software.",
    project: "VELION VEHICLE INTELLIGENCE CORE",
    projectDetail: "Sensors → Vehicle State → Perception → Context → Prediction → Decision Support → Vehicle Systems → Feedback",
    capabilities: ["Vehicle-state modelling", "Sensor fusion", "Context modelling", "Edge AI", "Real-time inference", "Driver and vehicle interaction", "Safety monitoring", "Software-defined vehicle architecture"],
  },
  {
    id: "aeriva", number: "02", name: "AERIVA", status: "RESEARCH", accent: "cyan", visual: "syndex",
    title: "Perception Beyond the Camera.",
    body: "Aeriva is TarvyX's automotive perception platform focused on transforming heterogeneous sensor information into a contextual representation of the vehicle's surrounding environment. Rather than treating perception as isolated object recognition, Aeriva explores the relationships between objects, movement, road structure, environmental conditions and temporal events.",
    project: "AERIVA SPATIOTEMPORAL ENGINE",
    projectDetail: "Camera + Radar + LiDAR + Vehicle Sensors + Maps → Contextual Environment Model",
    capabilities: ["Camera, radar and LiDAR data integration", "Object and movement understanding", "Road-structure interpretation", "Environmental context modelling", "Trajectory analysis", "Temporal event understanding"],
  },
  {
    id: "motara", number: "03", name: "MOTARA", status: "RESEARCH", accent: "emerald", visual: "evolis",
    title: "Predicting What the Vehicle Cannot Yet See.",
    body: "Motara explores predictive vehicle intelligence by modelling how surrounding traffic participants, vehicle systems and environmental conditions may evolve over time. The objective is to move automotive intelligence from reactive perception toward anticipatory understanding.",
    project: "MOTARA MOTION PREDICTION ENGINE",
    projectDetail: "Current Scene → Historical Context → Behaviour Models → Possible Futures → Probability and Uncertainty → Decision Support",
    capabilities: ["Traffic prediction", "Motion prediction", "Behaviour modelling", "Collision-risk analysis", "Fleet safety intelligence", "Autonomous mobility research"],
  },
  {
    id: "auterra", number: "04", name: "AUTERRA", status: "RESEARCH", accent: "blue", visual: "oryon",
    title: "A Computational World for Automotive Intelligence.",
    body: "Auterra is TarvyX's simulation intelligence platform for creating computational environments in which automotive systems can be evaluated against diverse, dynamic and difficult-to-reproduce scenarios. The platform explores simulation, synthetic environments and intelligent scenario generation to accelerate the development and validation of advanced vehicle systems.",
    project: "AUTERRA SCENARIO FORGE",
    projectDetail: "Scenario Generation → Simulation → Vehicle Response → Failure and Edge-Case Detection → Analysis → Scenario Refinement",
    capabilities: ["Virtual vehicle environments", "Intelligent scenario generation", "Traffic and weather simulation", "Sensor-condition modelling", "Edge-case discovery", "Vehicle-response evaluation", "Simulation-driven validation"],
  },
  {
    id: "elyron", number: "05", name: "ELYRON", status: "RESEARCH", accent: "pink", visual: "codelys",
    title: "The Intelligence Layer for Vehicle Software.",
    body: "Elyron is an automotive software intelligence platform designed to help engineering teams understand, validate and evolve complex vehicle software architectures. It connects software components, vehicle functions, dependencies, diagnostics and system behaviour into a unified engineering model.",
    project: "ELYRON VEHICLE SOFTWARE GRAPH",
    projectDetail: "Vehicle → Domain Controllers → ECUs → Software → Services → APIs → Sensors and Actuators → Vehicle Behaviour",
    capabilities: ["Vehicle software architecture analysis", "Domain-controller and ECU mapping", "Software dependency analysis", "Sensor and actuator relationships", "Change-impact analysis", "Vehicle-function validation"],
  },
  {
    id: "enerion", number: "06", name: "ENERION", status: "RESEARCH", accent: "amber", visual: "veridis",
    title: "Intelligence for the Energy-Aware Vehicle.",
    body: "Enerion explores intelligent energy management for electric and software-defined vehicles by modelling energy consumption, battery state, thermal behaviour, driving conditions and anticipated vehicle demand.",
    project: "ENERION BATTERY INTELLIGENCE",
    projectDetail: "Vehicle + Battery + Route + Weather + Driving Behaviour → Unified Energy Model",
    capabilities: ["Battery-state modelling", "Energy-consumption prediction", "Thermal intelligence", "Charging optimisation", "Driving-range prediction", "Battery-degradation modelling", "Route-energy optimisation"],
  },
  {
    id: "autonara", number: "07", name: "AUTONARA", status: "RESEARCH", accent: "violet", visual: "codelys",
    title: "Engineering Intelligence for Autonomous Mobility.",
    body: "Autonara is a modular autonomous-systems research platform focused on the computational foundations of autonomous mobility. It explores how perception, world representation, prediction, planning and decision-making can work together within a system that includes safety validation and human override.",
    project: "AUTONARA DECISION ENGINE",
    projectDetail: "Perception → World Representation → Prediction → Planning → Decision → Control Interface",
    capabilities: ["Behaviour planning", "Motion planning", "Uncertainty modelling", "Edge-case analysis", "Simulation", "Safety validation", "Human override"],
  },
  {
    id: "roadyn", number: "08", name: "ROADYN", status: "RESEARCH", accent: "cyan", visual: "fabric",
    title: "Intelligence for the Moving World.",
    body: "Roadyn focuses on mobility ecosystem intelligence beyond a single vehicle. It explores how vehicles, roads, traffic, infrastructure and environmental information can be connected into a dynamic mobility model.",
    project: "ROADYN MOBILITY INTELLIGENCE",
    projectDetail: "Vehicles + Roads + Traffic + Infrastructure + Environmental Information → Dynamic Mobility Model",
    capabilities: ["Mobility-network modelling", "Traffic intelligence", "Infrastructure-data integration", "Environmental information analysis", "Vehicle-to-infrastructure intelligence", "Network-level mobility insights"],
  },
] as const;

const AUTOMOTIVE_LIFECYCLE = [
  { title: "Perception", detail: "Understand the environment", icon: HiOutlineSparkles },
  { title: "Vehicle State", detail: "Model systems and sensors", icon: HiOutlineCpuChip },
  { title: "Prediction", detail: "Anticipate what may happen", icon: HiOutlineArrowRight },
  { title: "Simulation", detail: "Evaluate dynamic scenarios", icon: HiOutlineBeaker },
  { title: "Decision", detail: "Support safe responses", icon: HiOutlineCheckCircle },
  { title: "Feedback", detail: "Validate and improve", icon: HiOutlineCircleStack },
] as const;

type QuantumProduct = {
  id: string;
  number: string;
  name: string;
  title: string;
  body: string;
  project: string;
  projectDetail: string;
  accent: keyof typeof PRODUCT_ACCENTS;
  visual: SoftwareVisualProps["kind"];
  capabilities: string[];
  applications?: string[];
};

const QUANTUM_PRODUCTS: QuantumProduct[] = [
  {
    id: "qyron", number: "01", name: "QYRON", title: "The Intelligence Layer for Quantum Computing.", accent: "violet", visual: "nexora",
    body: "Qyron is TarvyX's quantum intelligence platform for designing, evaluating and orchestrating computational workloads across classical and quantum environments. It explores how intelligent systems can determine which parts of a computational problem are suitable for quantum processing, which should remain classical, and how the two environments can be coordinated efficiently.",
    project: "QYRON HYBRID COMPUTE ENGINE",
    projectDetail: "Complex Problem → Problem Decomposition → Classical Task + Quantum Task → Result Fusion → Validation Layer → Final Solution",
    capabilities: ["Quantum-classical orchestration", "Circuit selection", "Workload decomposition", "Quantum resource estimation", "Backend-aware execution", "Result verification", "Adaptive hybrid algorithms"],
  },
  {
    id: "quantara", number: "02", name: "QUANTARA", title: "A Laboratory for Discovering Quantum Algorithms.", accent: "cyan", visual: "codelys",
    body: "Quantara is a computational research environment for designing, testing and evaluating quantum algorithms against complex optimization, simulation and machine-learning problems. It enables researchers to explore algorithmic approaches across simulated and available quantum hardware while comparing them against classical baselines.",
    project: "QUANTARA ALGORITHM FORGE",
    projectDetail: "Problem → Mathematical Representation → Candidate Algorithms → Quantum Simulation → Classical Benchmark → Noise and Resource Analysis → Performance Evaluation → Best Candidate",
    capabilities: ["Quantum algorithm experimentation", "Mathematical problem representation", "Quantum circuit evaluation", "Classical benchmarking", "Noise and resource analysis", "Performance evaluation"],
  },
  {
    id: "qorvex", number: "03", name: "QORVEX", title: "Quantum Simulation Intelligence.", accent: "emerald", visual: "evolis",
    body: "Qorvex is TarvyX's quantum simulation platform for studying complex quantum systems through classical simulation, hybrid computation and emerging quantum hardware. It provides researchers with computational tools for modelling quantum behaviour, experimenting with algorithms and analysing the practical limits of different simulation approaches.",
    project: "QORVEX QUANTUM WORLD",
    projectDetail: "Quantum States → Gates → Circuits → Noise → Measurement → Algorithms",
    capabilities: ["Quantum-state modelling", "Quantum-gate experimentation", "Circuit simulation", "Noise modelling", "Measurement analysis", "Algorithm experimentation"],
  },
  {
    id: "qentra", number: "04", name: "QENTRA", title: "Quantum Machine Intelligence.", accent: "blue", visual: "syndex",
    body: "Qentra explores quantum machine-learning architectures and hybrid learning systems that combine classical machine learning with quantum computational techniques. It experimentally evaluates where quantum representations, circuits and optimization methods may provide useful computational advantages or new modelling capabilities.",
    project: "QENTRA HYBRID LEARNING ENGINE",
    projectDetail: "Dataset → Classical Preprocessing → Feature Representation → Quantum Circuit → Measurement → Classical Optimizer",
    capabilities: ["Variational quantum circuits", "Quantum kernels", "Hybrid neural architectures", "Quantum optimization", "Quantum data representations"],
  },
  {
    id: "cryptara", number: "05", name: "CRYPTARA", title: "Preparing Digital Security for the Quantum Era.", accent: "pink", visual: "veridis",
    body: "Cryptara is a quantum-readiness platform designed to help organizations understand and prepare their cryptographic infrastructure for the emerging post-quantum security landscape. It can map cryptographic dependencies, identify potentially vulnerable algorithms and support migration planning toward post-quantum cryptographic standards.",
    project: "CRYPTARA QUANTUM READINESS ENGINE",
    projectDetail: "Organization → Discover Cryptography → Map Dependencies → Identify Risk → Classify Algorithms → Migration Plan → Validation → Quantum-Ready Infrastructure",
    capabilities: ["Cryptographic asset discovery", "Dependency mapping", "Algorithm risk identification", "Cryptographic inventory", "Post-quantum migration planning", "Security validation"],
  },
  {
    id: "qubera", number: "06", name: "QUBERA", title: "Quantum Optimization Intelligence.", accent: "amber", visual: "oryon",
    body: "Qubera is a quantum optimization research platform focused on complex combinatorial and constrained optimization problems. It explores hybrid classical-quantum approaches for large solution spaces, including scheduling, routing, allocation and resource optimization.",
    project: "QUBERA OPTIMIZATION LAB",
    projectDetail: "Problem Space → Constraint Model → Classical + Quantum Search → Candidate Solutions → Cost and Constraint Evaluation → Optimized Solution",
    capabilities: ["Combinatorial optimization", "Constraint modelling", "Hybrid search strategies", "Candidate-solution evaluation", "Resource allocation", "Cost and constraint analysis"],
    applications: ["Logistics", "Manufacturing", "Energy", "Finance", "Mobility"],
  },
  {
    id: "moleq", number: "07", name: "MOLEQ", title: "Computational Intelligence for Molecular Discovery.", accent: "violet", visual: "lumenix",
    body: "Moleq explores computational methods for modelling molecular systems and supporting scientific discovery through the combination of quantum simulation, machine learning and classical computational chemistry. Its long-term objective is to investigate more efficient approaches for understanding molecular behaviour and exploring candidate materials and compounds.",
    project: "MOLEQ MOLECULAR SIMULATOR",
    projectDetail: "Molecular Structure → Classical Approximation → Quantum Simulation → Energy and State Estimation → AI Analysis → Candidate Ranking",
    capabilities: ["Molecular simulation", "Materials discovery", "Battery-material research", "Catalyst modelling", "Molecular energy estimation", "Computational drug-discovery research"],
  },
  {
    id: "q-synth", number: "08", name: "Q-SYNTH", title: "Quantum-Classical Computational Experimentation.", accent: "cyan", visual: "fabric",
    body: "Q-Synth is a research platform for experimenting with classical algorithms, quantum algorithms and hybrid computational approaches. Rather than assuming quantum computing is automatically better, the platform evaluates alternatives using measurable performance criteria.",
    project: "Q-SYNTH BENCHMARK ENGINE",
    projectDetail: "Problem → Classical Algorithm → Quantum Algorithm → Hybrid Algorithm → Performance Comparison → Validation → Best-Fit Approach",
    capabilities: ["Classical and quantum algorithm comparison", "Runtime measurement", "Accuracy evaluation", "Memory analysis", "Quantum resource assessment", "Noise evaluation", "Cost and scalability analysis"],
  },
] as const;

const QUANTUM_LIFECYCLE = [
  { title: "Problem", detail: "Understand the computational challenge", icon: HiOutlineSparkles },
  { title: "Model", detail: "Build a mathematical representation", icon: HiOutlineBeaker },
  { title: "Decompose", detail: "Identify classical and quantum tasks", icon: HiOutlineCircleStack },
  { title: "Compute", detail: "Simulate and execute approaches", icon: HiOutlineCpuChip },
  { title: "Evaluate", detail: "Measure noise, resources and performance", icon: HiOutlineCheckCircle },
  { title: "Optimize", detail: "Validate the best-fit approach", icon: HiOutlineArrowRight },
] as const;

type IntelligenceProduct = {
  id: string;
  number: string;
  name: string;
  title: string;
  visual: SoftwareVisualProps["kind"];
  body: string[];
  project: string;
  projectDetail: string;
  capabilities: string[];
  notes?: { title: string; paragraphs?: string[]; items?: string[] }[];
};

type IntelligenceResearchStage = { title: string; detail: string };

type IntelligenceDomain = {
  id: string;
  headerTitle?: string;
  title: string;
  eyebrow: string;
  tagline: string;
  introduction: string[];
  lifecycleTitle: string;
  lifecycleDescription: string;
  lifecycle: IntelligenceResearchStage[];
  productHeading: string;
  productDescription: string;
  products: IntelligenceProduct[];
  flagshipLabel: string;
  flagshipTitle: string;
  flagshipSubtitle: string;
  flagshipBody: string[];
  architectureTitle: string;
  architecture: { title: string; description: string }[];
  architectureFlow: string;
  additionalResearch?: { title: string; body: string[]; flow?: string; items?: string[] }[];
  portfolio: { product: string; direction: string }[];
  vision: string[];
  visionTagline: string;
  action: string;
};

const CLOUD_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "aetheron", number: "01", name: "AETHERON", title: "The Intelligence Layer for Computational Infrastructure.", visual: "nexora",
    body: [
      "Aetheron is TarvyX's computational intelligence platform for understanding and optimizing complex infrastructure environments.",
      "It analyses workload characteristics, resource behaviour, application dependencies, performance requirements and infrastructure conditions to determine how computational resources should be allocated and coordinated.",
      "Rather than treating infrastructure as a collection of isolated servers and services, Aetheron explores how computational resources can operate as a coordinated system that adapts to the needs of the applications running on it.",
    ],
    project: "AETHERON COMPUTE BRAIN",
    projectDetail: "Workload → Workload Understanding → Resource Prediction → Computational Planning → Resource Allocation → Execution → Observation → Adaptation",
    capabilities: ["Workload intelligence and classification", "Resource-demand prediction", "Intelligent computational scheduling", "Infrastructure utilization analysis", "Cost and performance optimization", "Autonomous scaling research", "Cross-environment orchestration", "Workload placement recommendations"],
    notes: [{ title: "Compute Brain", paragraphs: ["The Compute Brain explores how infrastructure decisions can be informed by workload requirements, resource availability and operational constraints."] }],
  },
  {
    id: "elastra", number: "02", name: "ELASTRA", title: "Infrastructure That Anticipates Demand.", visual: "codelys",
    body: [
      "Elastra is TarvyX's predictive infrastructure intelligence platform designed to anticipate computational demand and prepare resources before workload conditions change.",
      "By combining historical workload patterns, current system telemetry, application behaviour and predictive modelling, Elastra explores proactive resource planning instead of relying exclusively on reactive scaling.",
      "The platform aims to help organizations understand when additional capacity may be required, where infrastructure pressure could emerge and how resources can be prepared efficiently.",
    ],
    project: "ELASTRA DEMAND ENGINE",
    projectDetail: "Historical Workload → Current Behaviour → Operational Signals → Demand Prediction → Future Resource Requirements → Infrastructure Preparation",
    capabilities: ["Historical workload analysis", "Computational demand forecasting", "Resource requirement prediction", "Proactive capacity planning", "Infrastructure preparation", "Workload-spike anticipation", "Capacity utilization analysis", "Predictive scaling recommendations"],
    notes: [{ title: "Demand Engine", paragraphs: ["The Demand Engine explores how infrastructure can prepare for anticipated demand instead of waiting for resource shortages or performance degradation."] }],
  },
  {
    id: "nexus-fabric", number: "03", name: "NEXUS FABRIC", title: "One Computational Fabric Across Every Environment.", visual: "evolis",
    body: [
      "Nexus Fabric is TarvyX's distributed computational infrastructure platform designed to coordinate computing resources across heterogeneous environments.",
      "It explores how workloads can be distributed across public cloud, private infrastructure, edge systems and specialized computing resources according to latency, performance, security, availability and cost requirements.",
      "The objective is to make distributed computing environments operate as a coordinated computational fabric rather than disconnected infrastructure silos.",
    ],
    project: "NEXUS COMPUTE FABRIC",
    projectDetail: "Application → Workload Intelligence → Computational Graph → Resource Selection → Cloud / Edge / Local Infrastructure → Execution → Result Integration",
    capabilities: ["Multi-environment workload orchestration", "Distributed computing coordination", "Intelligent workload placement", "Latency-aware execution", "Resource coordination", "Data-locality-aware computing", "Cross-environment result integration", "Workload dependency management"],
    notes: [{ title: "Nexus Compute Fabric", paragraphs: ["Nexus Fabric explores how computational tasks can be assigned to appropriate resources while respecting application dependencies, operational requirements and infrastructure constraints."] }],
  },
  {
    id: "quantexa", number: "04", name: "QUANTEXA", title: "Infrastructure for Heterogeneous Computing.", visual: "syndex",
    body: [
      "Quantexa is TarvyX's research platform for heterogeneous computational orchestration, exploring how workloads can be mapped across different computing architectures.",
      "The platform investigates workload characteristics, hardware capabilities, computational complexity, latency requirements and execution cost to determine suitable computational strategies.",
      "Its long-term direction includes research into coordination between conventional computing, hardware accelerators and specialized computational backends.",
    ],
    project: "QUANTEXA COMPUTE SELECTOR",
    projectDetail: "Workload → Computational Analysis → Hardware Capability Assessment → CPU / GPU / NPU / FPGA / Quantum / Edge → Best Execution Path",
    capabilities: ["CPU, GPU and NPU workload mapping", "FPGA and accelerator coordination", "Hardware-aware scheduling", "Computational resource assessment", "Execution-path optimization", "Workload-to-hardware matching", "Specialized compute integration research", "Quantum-backend orchestration research"],
    notes: [{ title: "Quantum-backend orchestration research", paragraphs: ["Quantexa could eventually connect with TarvyX Qyron from the Quantum Intelligence domain to explore orchestration across classical, accelerated and quantum computation.", "Quantum execution remains a research direction dependent on available hardware, supported workloads and backend capabilities."] }],
  },
  {
    id: "cloudra", number: "05", name: "CLOUDRA", title: "A Living Model of Your Computational Infrastructure.", visual: "veridis",
    body: [
      "Cloudra creates a continuously evolving computational model of applications, infrastructure, dependencies, resources and workload behaviour.",
      "The system is designed to help organizations understand how infrastructure changes could affect performance, reliability, capacity and cost before those changes are deployed.",
      "Instead of simply presenting monitoring information, Cloudra explores infrastructure simulation intelligence: modelling the relationships within a digital environment and evaluating possible future states.",
    ],
    project: "CLOUDRA INFRASTRUCTURE MODEL",
    projectDetail: "Applications → Services → Dependencies → Infrastructure → Resources → Network → Runtime Behaviour → Simulation",
    capabilities: ["Infrastructure dependency mapping", "Application and service modelling", "Resource utilization analysis", "Infrastructure simulation", "Capacity and reliability assessment", "Change-impact analysis", "Performance scenario evaluation", "Infrastructure cost modelling"],
    notes: [
      { title: "Questions Cloudra explores", items: ["What happens if a cloud region goes offline?", "What happens if traffic becomes 20 times higher?", "What happens if a database is moved?", "Which services depend on a particular infrastructure component?", "What infrastructure could provide equivalent performance at a lower cost?", "How might a planned infrastructure change affect reliability?"] },
      { title: "Infrastructure decisions", paragraphs: ["Cloudra aims to help engineering teams evaluate infrastructure decisions through a model of the system rather than relying only on isolated metrics."] },
    ],
  },
  {
    id: "edgion", number: "06", name: "EDGION", title: "Intelligence at the Edge of Computation.", visual: "oryon",
    body: [
      "Edgion is TarvyX's edge intelligence platform for coordinating computation between devices and centralized infrastructure.",
      "Cloud computing is not always the best location for every computational task. Latency, privacy, bandwidth availability, reliability and local processing requirements can make edge computing essential.",
      "Edgion explores adaptive workload placement, local inference, distributed intelligence and resilient edge-cloud coordination for environments where computation must operate close to where data is generated.",
    ],
    project: "EDGION EDGE MIND",
    projectDetail: "Device → Local Intelligence → Edge Node → Cloud → Global Intelligence → Feedback",
    capabilities: ["Edge-cloud workload coordination", "Local AI inference", "Adaptive workload placement", "Distributed intelligence", "Latency-aware computation", "Bandwidth optimization", "Resilient edge operations", "Device-to-cloud coordination"],
    notes: [
      { title: "Edge Mind", paragraphs: ["The Edge Mind explores how a computational system can determine which operations should run locally, which should run on an edge node and which require centralized cloud infrastructure."] },
      { title: "Potential application areas", items: ["Automotive systems", "Robotics", "Manufacturing", "Smart infrastructure", "Telecommunications", "Industrial IoT"] },
    ],
  },
  {
    id: "autonomia", number: "07", name: "AUTONOMIA", title: "Self-Optimizing Computational Infrastructure.", visual: "lumenix",
    body: [
      "Autonomia explores autonomous infrastructure systems capable of observing their computational environment, identifying inefficiencies, modelling potential changes and recommending or executing validated infrastructure adaptations under defined safety and governance constraints.",
      "The long-term vision is infrastructure that continuously evaluates its operating state and determines how it should be optimized.",
      "Rather than focusing only on conventional infrastructure automation, Autonomia explores the reasoning layer behind infrastructure decisions.",
    ],
    project: "AUTONOMIA INFRASTRUCTURE EVOLUTION ENGINE",
    projectDetail: "Observe → Understand → Detect Inefficiency → Generate Alternatives → Simulate → Evaluate → Human / Policy Approval → Execute → Verify → Learn",
    capabilities: ["Infrastructure-state observation", "Inefficiency detection", "Optimization strategy generation", "Change simulation", "Policy-based approval", "Controlled infrastructure execution", "Post-change verification", "Continuous improvement"],
    notes: [{ title: "Infrastructure Evolution Engine", paragraphs: ["The engine explores a controlled feedback loop in which infrastructure improvements are evaluated before execution and verified afterward.", "Autonomia is a long-term research direction. Its implementation would require suitable observability, policy enforcement, execution safeguards and rollback mechanisms."] }],
  },
  {
    id: "sovereignx", number: "08", name: "SOVEREIGNX", title: "Intelligent Infrastructure for Data Sovereignty.", visual: "fabric",
    body: [
      "SovereignX is a computational governance platform designed to help organizations understand and control where data, workloads and intelligent computation operate across distributed infrastructure.",
      "Organizations increasingly need to understand where their data is stored, where computation takes place, who controls the infrastructure and which policies govern access and processing.",
      "SovereignX combines policy, workload placement and infrastructure intelligence to support environments with strict requirements around data locality, security and regulatory boundaries.",
    ],
    project: "SOVEREIGN COMPUTE CONTROLLER",
    projectDetail: "Data Classification → Security Policy → Geographic Constraints → Compliance Requirements → Workload Placement → Policy Validation",
    capabilities: ["Data-location visibility", "Workload-location governance", "Geographic computing constraints", "Data classification", "Security-policy enforcement", "Infrastructure ownership visibility", "Compliance-oriented workload placement", "Policy validation and auditability"],
  },
];

const CYBERSECURITY_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "aegix", number: "01", name: "AEGIX", title: "Enterprise Security Intelligence.", visual: "nexora",
    body: [
      "Aegix is TarvyX's enterprise security intelligence platform designed to connect security signals, digital assets, identities, infrastructure dependencies and operational context into a unified representation of an organization's security state.",
      "Rather than treating every security alert as an isolated event, Aegix explores how individual signals relate to broader system behaviour and potential business impact.",
      "The platform aims to help security teams understand relationships between assets, identify meaningful exposure and prioritize investigations according to operational context.",
    ],
    project: "AEGIX SECURITY INTELLIGENCE ENGINE",
    projectDetail: "Digital Environment → Asset Discovery → Security Signals → Context Correlation → Risk Assessment → Prioritized Investigation → Defensive Action",
    capabilities: ["Enterprise security-state modelling", "Security-event correlation", "Digital asset visibility", "Risk prioritization", "Security-context analysis", "Cross-system dependency awareness", "Investigation support"],
    notes: [{ title: "Security Intelligence Engine", paragraphs: ["The Security Intelligence Engine explores how different security observations can be connected to support a clearer understanding of enterprise exposure."] }],
  },
  {
    id: "sentrix", number: "02", name: "SENTRIX", title: "Behavioral Intelligence for Digital Environments.", visual: "codelys",
    body: [
      "Sentrix is TarvyX's behavioral security intelligence platform designed to identify meaningful deviations in digital environments by learning patterns across users, applications, devices and services.",
      "Rather than relying exclusively on predefined indicators, Sentrix explores behavioural context to distinguish ordinary operational changes from potentially significant security anomalies.",
    ],
    project: "SENTRIX BEHAVIOR ENGINE",
    projectDetail: "Digital Activity → Behavioral Baseline → Context Analysis → Deviation Detection → Risk Correlation → Confidence Assessment → Human Investigation",
    capabilities: ["Behavioural baseline modelling", "User and entity behaviour analysis", "Anomaly detection", "Contextual event correlation", "Risk assessment", "Confidence evaluation", "Investigation prioritization"],
    notes: [{ title: "Advanced Direction", paragraphs: ["The system considers: Who + What + Where + When + Context + Historical Behaviour.", "Rather than simply reporting that an event was detected, Sentrix aims to provide context about the activity, its deviation from established patterns and the reasons it may deserve investigation."] }],
  },
  {
    id: "prevora", number: "03", name: "PREVORA", title: "Predictive Cyber Defense.", visual: "evolis",
    body: [
      "Prevora explores predictive cybersecurity by analysing security signals, infrastructure changes, behavioural patterns and environmental conditions to identify emerging risk before it becomes a confirmed security incident.",
      "The objective is to help organizations shift from reactive security operations toward proactive risk reduction.",
    ],
    project: "PREVORA RISK FORECAST ENGINE",
    projectDetail: "Current Security State → Historical Patterns → System Changes → Behavioral Signals → Risk Modelling → Potential Future States → Priority Actions",
    capabilities: ["Security-state assessment", "Historical pattern analysis", "Infrastructure-change analysis", "Behavioural risk signals", "Predictive risk modelling", "Potential future-state assessment", "Defensive action prioritization"],
    notes: [{ title: "Example", paragraphs: ["Instead of reporting only that an organization's security posture has degraded, Prevora aims to identify which changes have increased exposure, which failure scenarios could become more likely and which corrective actions could reduce the largest portion of modeled risk.", "The purpose is to turn security observations into actionable, prioritized risk intelligence."] }],
  },
  {
    id: "cybera", number: "04", name: "CYBERA", title: "A Simulation Environment for Digital Security.", visual: "syndex",
    body: [
      "Cybera is TarvyX's cyber-resilience simulation platform for modelling digital environments and evaluating how security controls, dependencies and recovery strategies behave under simulated disruption scenarios.",
      "Cybera enables organizations to explore potential weaknesses in their defensive architecture before those weaknesses are exposed by real-world incidents.",
    ],
    project: "CYBERA DIGITAL RESILIENCE LAB",
    projectDetail: "Enterprise Environment → Computational Security Model → Scenario Generation → Controlled Simulation → System Behaviour → Security Control Evaluation → Recovery Analysis → Architecture Improvement",
    capabilities: ["Digital-environment modelling", "Defensive scenario generation", "Controlled security simulation", "Security-control evaluation", "Dependency-failure analysis", "Recovery assessment", "Architecture improvement"],
    notes: [
      { title: "Possible Scenarios", items: ["Service outage", "Identity-compromise simulation", "Dependency failure", "Data-access anomaly", "Infrastructure disruption", "Ransomware-resilience testing in an isolated environment"] },
      { title: "Defensive validation", paragraphs: ["The goal is defensive validation, not attack execution.", "Cybera explores how organizations can evaluate their defensive architecture in controlled conditions and identify improvements before a real incident occurs."] },
    ],
  },
  {
    id: "immunyx", number: "05", name: "IMMUNYX", title: "Self-Hardening Digital Infrastructure.", visual: "veridis",
    body: [
      "Immunyx is TarvyX's research platform for adaptive cyber defense, exploring how digital environments can continuously strengthen their defensive posture based on observed risk, validated security intelligence and changing operational conditions.",
      "The long-term vision is infrastructure that can recommend and safely apply defensive adaptations under explicit organizational policies and human governance.",
    ],
    project: "IMMUNYX ADAPTIVE DEFENSE ENGINE",
    projectDetail: "Observe → Understand → Detect Risk → Assess Impact → Generate Defensive Options → Simulate / Validate → Policy Check → Human Approval → Apply Defense → Verify → Learn",
    capabilities: ["Security-state observation", "Risk assessment", "Defensive-option generation", "Policy-aware adaptation", "Controlled isolation and containment", "Recovery support", "Continuous defensive improvement"],
    notes: [{ title: "Human approval and policy boundaries are critical.", paragraphs: ["An AI security system should not make uncontrolled changes to production systems.", "Immunyx explores a controlled approach in which defensive changes are evaluated, authorized, applied and verified."] }],
  },
  {
    id: "identara", number: "06", name: "IDENTARA", title: "Intelligence for Digital Identity.", visual: "oryon",
    body: [
      "Identara is TarvyX's identity intelligence platform focused on understanding how users, services, devices and applications interact with digital resources.",
      "It explores contextual access decisions based on identity, behaviour, resource sensitivity and environmental conditions rather than treating access control as a static collection of permissions.",
    ],
    project: "IDENTARA CONTEXT ENGINE",
    projectDetail: "Identity + Device + Location / Environment + Requested Resource + Behaviour + Risk → Contextual Access Decision",
    capabilities: ["Identity and access intelligence", "Context-aware access decisions", "Identity relationship modelling", "Behavioural risk assessment", "Device and environment context", "Permission analysis", "Zero-trust architecture support"],
    notes: [
      { title: "Contextual access", paragraphs: ["Instead of relying exclusively on: User = Admin → Access Granted.", "Identara explores a contextual model: Identity + Device + Location / Environment + Requested Resource + Behaviour + Risk → Contextual Access Decision.", "The goal is to evaluate access using relevant contextual information rather than a role or permission in isolation."] },
      { title: "Potential commercial direction", paragraphs: ["Zero-trust infrastructure and identity intelligence."] },
    ],
  },
  {
    id: "trustra", number: "07", name: "TRUSTRA", title: "An Intelligence Layer for AI Security.", visual: "lumenix",
    body: [
      "Trustra is TarvyX's AI security and governance platform designed to help organizations understand, evaluate and control intelligent systems operating within their environments.",
      "It focuses on model behaviour, AI permissions, data boundaries, agent actions, system dependencies and auditability.",
      "As AI systems increasingly interact with enterprise data, tools and external services, Trustra explores how their operations can remain observable, governed and accountable.",
    ],
    project: "TRUSTRA AI CONTROL FABRIC",
    projectDetail: "AI Model → Agent → Tools → Data → External Systems → Actions",
    capabilities: ["AI model and agent security", "Permission and access governance", "Data-boundary controls", "Agent-action monitoring", "Policy enforcement", "Audit trails", "Human approval workflows"],
    notes: [{ title: "AI Control Fabric", paragraphs: ["Trustra establishes identity, permissions, policies, monitoring, audit and approval around intelligent systems.", "This platform can connect directly with TarvyX's Advanced Artificial Intelligence platform and its wider intelligent-systems ecosystem."] }],
  },
  {
    id: "vulnexa", number: "08", name: "VULNEXA", title: "Understanding Software Weakness as a System.", visual: "fabric",
    body: [
      "Vulnexa is TarvyX's software security intelligence platform designed to connect application architecture, dependencies, configuration, code and deployment environments to understand the context and potential impact of security weaknesses.",
      "The platform aims to prioritize security remediation based on system context rather than vulnerability counts alone.",
    ],
    project: "VULNEXA IMPACT ENGINE",
    projectDetail: "Security Finding → Affected Component → Dependencies → Application Context → Critical Assets → Exposure → Potential Impact → Remediation Priority",
    capabilities: ["Software security analysis", "Dependency-aware vulnerability assessment", "Application-context modelling", "Exposure analysis", "Critical-asset identification", "Security-impact assessment", "Remediation prioritization"],
    notes: [{ title: "Impact Engine", paragraphs: ["The objective is to help engineering teams determine which weaknesses are most important to address based on their relationships with critical assets, exposed components and application dependencies.", "Rather than simply presenting a large list of vulnerability records, Vulnexa explores how security findings relate to the actual system and its potential business impact."] }],
  },
  {
    id: "resilion", number: "09", name: "RESILION", title: "Engineering Systems That Recover.", visual: "nexora",
    body: [
      "Resilion is TarvyX's cyber-resilience intelligence platform focused on understanding how organizations withstand disruption, recover critical systems and restore trusted operations.",
      "It combines dependency modelling, recovery planning, simulation and readiness assessment to help organizations improve resilience before an actual incident occurs.",
    ],
    project: "RESILION RECOVERY GRAPH",
    projectDetail: "Applications → Services → Databases → Infrastructure → Dependencies → Recovery Priorities",
    capabilities: ["Critical-system dependency mapping", "Recovery-priority analysis", "Business-continuity support", "Recovery-readiness assessment", "Service-dependency modelling", "Restoration planning", "Resilience evaluation"],
    notes: [{ title: "Recovery planning", paragraphs: ["Resilion explores how organizations can identify critical dependencies and determine which components should be restored first when a system becomes unavailable.", "The central question is: If this component becomes unavailable, what must recover first?", "The resulting dependency model can support recovery planning, continuity exercises and resilience improvements."] }],
  },
];

const CLOUD_DOMAIN: IntelligenceDomain = {
  id: "cloud",
  title: "Engineering the Intelligence Behind Computation",
  eyebrow: "COMPUTATIONAL INTELLIGENCE INFRASTRUCTURE",
  tagline: "Computing that understands the workload it is running.",
  introduction: [
    "TarvyX develops next-generation computational infrastructure designed to make cloud environments more intelligent, adaptive and autonomous.",
    "Our research moves beyond conventional infrastructure management toward systems that can understand workload behaviour, predict computational demand, dynamically allocate resources and intelligently distribute workloads across cloud, edge, on-premises and specialized computing environments.",
    "We explore the future of self-optimizing infrastructure, intelligent orchestration, distributed computation, infrastructure simulation and autonomous cloud systems.",
    "Our objective is to transform computational infrastructure from a passive collection of resources into an intelligent environment capable of understanding workloads, anticipating demand and adapting to changing operational conditions.",
  ],
  lifecycleTitle: "THE COMPUTATIONAL INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From workload understanding to continuously adapting computation.",
  lifecycle: [
    { title: "Workload", detail: "Understand computational needs" },
    { title: "Predict", detail: "Anticipate demand and resources" },
    { title: "Plan", detail: "Design computational execution" },
    { title: "Allocate", detail: "Select suitable resources" },
    { title: "Execute", detail: "Coordinate distributed compute" },
    { title: "Adapt", detail: "Learn from validated outcomes" },
  ],
  productHeading: "OUR COMPUTATIONAL INTELLIGENCE PRODUCTS",
  productDescription: "Eight platforms exploring adaptive, distributed and workload-aware infrastructure.",
  products: CLOUD_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX CLOUD PROJECT",
  flagshipTitle: "PROJECT ATLAS",
  flagshipSubtitle: "Intelligent Orchestration Across Computational Systems.",
  flagshipBody: [
    "Atlas is TarvyX's proposed flagship cloud research platform for coordinating workloads, execution resources and computational dependencies across distributed computing environments.",
    "Its objective is to build an intelligence layer that understands a workload, evaluates available computational resources, creates an execution plan and monitors the resulting computation.",
    "Instead of treating cloud infrastructure as the final product, Atlas explores how infrastructure can become a coordinated execution environment for increasingly complex computational systems.",
  ],
  architectureTitle: "Atlas Research Architecture",
  architecture: [
    { title: "1. Application Workload", description: "Receive computational tasks, application requirements and execution constraints." },
    { title: "2. Workload Understanding", description: "Analyse workload characteristics, dependencies, latency requirements and resource needs." },
    { title: "3. Computational Planning", description: "Determine how tasks can be organized into an execution graph." },
    { title: "4. Resource Selection", description: "Evaluate available computing resources according to capability, availability and operational constraints." },
    { title: "5. Distributed Execution", description: "Coordinate execution across cloud, edge, local infrastructure and supported specialized accelerators." },
    { title: "6. Result Integration", description: "Collect outputs and combine them according to the workload's computational dependencies." },
    { title: "7. Verification", description: "Validate execution results, system state and relevant operational requirements." },
    { title: "8. Optimization", description: "Evaluate performance, utilization and cost to identify potential improvements." },
    { title: "9. Adaptation", description: "Update future execution strategies using validated observations." },
  ],
  architectureFlow: "Application Workload → Workload Understanding → Computational Planning → Resource Selection → Execution Graph → Cloud / Edge / Specialized Accelerators → Results → Verification → Optimization → Adaptation",
  additionalResearch: [{
    title: "Long-Term Research Direction",
    body: ["Atlas could eventually connect with Q-Fusion from TarvyX's Quantum domain to explore intelligent orchestration across classical computation, accelerated computation, distributed computing and quantum computation.", "This direction depends on the capabilities of supported execution backends and the suitability of individual workloads."],
    flow: "Classical computation · Accelerated computation · Distributed computing · Quantum computation",
  }],
  portfolio: [
    { product: "Aetheron", direction: "Computational intelligence platform" },
    { product: "Elastra", direction: "Predictive capacity intelligence" },
    { product: "Nexus Fabric", direction: "Multi-environment compute orchestration" },
    { product: "Quantexa", direction: "Heterogeneous compute orchestration" },
    { product: "Cloudra", direction: "Infrastructure modelling and simulation" },
    { product: "Edgion", direction: "Edge-cloud intelligence" },
    { product: "Autonomia", direction: "Self-optimizing computational infrastructure" },
    { product: "SovereignX", direction: "Data sovereignty and computational governance" },
  ],
  vision: [
    "TarvyX explores a future in which computational infrastructure can understand the workloads it serves, anticipate changing demand, coordinate resources intelligently and adapt within defined operational and governance boundaries.",
    "From cloud and edge computing to specialized accelerators and distributed infrastructure, our objective is to build the intelligence layer that makes complex computational environments more adaptive, efficient and resilient.",
  ],
  visionTagline: "TarvyX Cloud — Building the Intelligence Behind Computation.",
  action: "Explore Computational Intelligence",
};

const CYBERSECURITY_DOMAIN: IntelligenceDomain = {
  id: "cyber",
  title: "Engineering Digital Systems That Understand Risk",
  eyebrow: "CYBERSECURITY INTELLIGENCE",
  tagline: "Engineering systems that defend intelligently, anticipate risk and recover with confidence.",
  introduction: [
    "TarvyX develops advanced cyber intelligence technologies that move beyond conventional threat detection toward a deeper understanding of digital security, behavioural patterns, system dependencies and organizational resilience.",
    "Our research explores how intelligent systems can understand the security state of an organization, identify meaningful behavioural deviations, anticipate emerging risks, simulate defensive scenarios and support controlled responses to security incidents.",
    "From enterprise security intelligence and identity protection to AI governance, software security and cyber-resilience engineering, TarvyX is building the foundations for a more adaptive and context-aware approach to digital security.",
    "Our objective is to help organizations understand not only what is happening within their digital environments, but why it matters, how risks could propagate and which defensive actions deserve priority.",
  ],
  lifecycleTitle: "THE CYBER INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From understanding security state to validated defensive action.",
  lifecycle: [
    { title: "Discover", detail: "Map assets and identities" },
    { title: "Observe", detail: "Understand security signals" },
    { title: "Reason", detail: "Connect context and behaviour" },
    { title: "Anticipate", detail: "Model emerging risk" },
    { title: "Validate", detail: "Simulate and evaluate response" },
    { title: "Recover", detail: "Strengthen digital resilience" },
  ],
  productHeading: "OUR CYBER INTELLIGENCE PRODUCTS",
  productDescription: "Nine systems connecting security intelligence, identity, software, governance and resilience.",
  products: CYBERSECURITY_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX CYBER PROJECT",
  flagshipTitle: "PROJECT SENTINEL",
  flagshipSubtitle: "Systemic Enterprise Threat & Intelligence Network for Enhanced Resilience",
  flagshipBody: [
    "Sentinel is TarvyX's long-term cybersecurity research platform.",
    "Its objective is to create a computational representation of an organization's digital security state and continuously reason about its resilience.",
    "Rather than treating cybersecurity as a collection of disconnected tools, Sentinel explores how assets, identities, dependencies, behaviour, risks and defensive controls can be connected into a unified intelligence architecture.",
  ],
  architectureTitle: "Sentinel Research Architecture",
  architecture: [
    { title: "1. Digital Environment", description: "Establish visibility into the organization's digital assets, applications, infrastructure and services." },
    { title: "2. Asset Discovery", description: "Identify relevant digital assets and their relationships." },
    { title: "3. Identity Graph", description: "Represent relationships between users, devices, services and access permissions." },
    { title: "4. Dependency Graph", description: "Map relationships between applications, services, databases, infrastructure and critical resources." },
    { title: "5. Security Graph", description: "Connect security findings, exposure, identities, dependencies and defensive controls." },
    { title: "6. Behavioral Intelligence", description: "Evaluate activity patterns and identify meaningful deviations." },
    { title: "7. Risk Modelling", description: "Assess the potential impact and propagation of identified risks." },
    { title: "8. Future Scenarios", description: "Explore plausible future security states and potential failure conditions." },
    { title: "9. Simulation", description: "Evaluate defensive options and resilience under controlled scenarios." },
    { title: "10. Defensive Strategies", description: "Identify potential actions for reducing exposure and improving resilience." },
    { title: "11. Policy and Governance", description: "Evaluate proposed actions against organizational rules, permissions and operational constraints." },
    { title: "12. Human Validation", description: "Obtain appropriate human review and approval for consequential decisions." },
    { title: "13. Controlled Response", description: "Apply authorized defensive measures within established boundaries." },
    { title: "14. Verification", description: "Evaluate whether the response achieved the intended defensive outcome." },
    { title: "15. Memory", description: "Retain validated observations to support future analysis and continuous improvement." },
  ],
  architectureFlow: "Digital Environment → Asset Discovery → Identity Graph → Dependency Graph → Security Graph → Behavioral Intelligence → Risk Modelling → Future Scenarios → Simulation → Defensive Strategies → Policy / Governance → Human Validation → Controlled Response → Verification → Memory",
  additionalResearch: [
    {
      title: "Sentinel Architecture Cycle",
      body: ["The cycle continues as new observations become available and the organization's digital environment changes."],
    },
    {
      title: "The TarvyX Cybersecurity Vision",
      body: ['Not simply: "We provide cybersecurity."', 'Instead: "We build computational intelligence that helps organizations understand, simulate and continuously strengthen their digital resilience."'],
    },
    {
      title: "Frontier Research — TarvyX Digital Immune System",
      body: [
        "Internal Research: DIS-01",
        "The TarvyX Digital Immune System is a proposed long-term research direction exploring how digital environments could improve their defensive posture through validated security intelligence and controlled adaptation.",
        "The concept draws inspiration from the general principles of detection, isolation, recovery and adaptation while remaining a conventional engineered cybersecurity system.",
      ],
      flow: "Identity → Memory → Detection → Reasoning → Isolation → Recovery → Adaptation",
    },
    {
      title: "Research Objective",
      body: [
        "Can defensive infrastructure continuously learn from validated security events and safely improve its defensive posture?",
        "The research would explore how validated observations can inform future defensive decisions while preserving human oversight, operational stability and explicit security boundaries.",
        "The Digital Immune System remains a frontier research concept rather than a claim of an existing fully autonomous defensive capability.",
      ],
    },
  ],
  portfolio: [
    { product: "Aegix", direction: "Enterprise security intelligence" },
    { product: "Sentrix", direction: "Behavioral security intelligence" },
    { product: "Prevora", direction: "Predictive cyber-risk" },
    { product: "Cybera", direction: "Cyber-resilience simulation" },
    { product: "Immunyx", direction: "Adaptive defense" },
    { product: "Identara", direction: "Identity intelligence" },
    { product: "Trustra", direction: "AI security and governance" },
    { product: "Vulnexa", direction: "Software security intelligence" },
    { product: "Resilion", direction: "Cyber-resilience and recovery intelligence" },
  ],
  vision: [
    "TarvyX is exploring a new approach to cybersecurity in which digital systems can understand their security state, recognize meaningful behavioural changes, anticipate emerging risks and support validated defensive decisions.",
    "Our research connects enterprise security intelligence, identity, software security, AI governance, controlled simulation and recovery engineering into a coherent cyber-intelligence ecosystem.",
    "We aim to move beyond simply detecting threats toward helping organizations understand their exposure, prioritize their defenses and strengthen their ability to withstand and recover from disruption.",
  ],
  visionTagline: "TarvyX Cybersecurity — Building Intelligence for a More Resilient Digital World.",
  action: "Explore Cyber Intelligence",
};

const MEDICAL_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "medyra", number: "01", name: "MEDYRA", title: "The Intelligence Layer for Modern Hospitals.", visual: "nexora",
    body: [
      "Medyra is TarvyX's hospital intelligence platform, designed to create a unified computational view of hospital operations, clinical information and resource coordination.",
      "Medyra explores how fragmented information across departments can be transformed into a connected, context-aware hospital intelligence layer that supports clinicians, administrators and operational teams.",
    ],
    project: "MEDYRA HOSPITAL INTELLIGENCE FABRIC",
    projectDetail: "Emergency → ICU → OT → Labs → Imaging → Pharmacy → Wards → Specialists → Bed Capacity → Staff → Equipment",
    capabilities: ["Clinical intelligence — patient-related information and care coordination", "Operational intelligence — department workflows and hospital operations", "Resource intelligence — staff, equipment, beds and capacity"],
    notes: [
      { title: "Medical Knowledge Layer and Intelligence Engine", paragraphs: ["Clinical intelligence, operational intelligence and resource intelligence connect through a Medical Knowledge Layer and an Intelligence Engine."] },
      { title: "Advanced Projects", items: ["Medyra Flow — Predict hospital demand and resource bottlenecks.", "Medyra Nexus — Connect clinical and operational information.", "Medyra Continuum — Track the longitudinal care journey across departments and institutions."] },
    ],
  },
  {
    id: "biovana", number: "02", name: "BIOVANA", title: "Computational Intelligence for Biomedical Discovery.", visual: "codelys",
    body: [
      "Biovana is a computational life-sciences platform exploring how artificial intelligence, scientific computing and biological data can accelerate research into diseases, therapies, biomarkers and biological mechanisms.",
      "The platform is designed to help researchers integrate heterogeneous scientific information, generate hypotheses and evaluate candidate explanations using computational methods.",
    ],
    project: "BIOVANA DISCOVERY ENGINE",
    projectDetail: "Scientific Data → Biological Representation → Knowledge Integration → Hypothesis Generation → Computational Analysis → Candidate Ranking → Research Validation",
    capabilities: ["Biomarker research", "Therapeutic hypothesis generation", "Protein and structure research", "Disease mechanism modelling", "Drug-discovery support"],
    notes: [{ title: "Research assistance", paragraphs: ["Biovana is positioned as a research-assistance platform. Scientific hypotheses and computational findings require appropriate experimental validation."] }],
  },
  {
    id: "clynexa", number: "03", name: "CLYNEXA", title: "Clinical Intelligence for Complex Medicine.", visual: "evolis",
    body: [
      "Clynexa is a clinical intelligence platform designed to help healthcare professionals synthesize complex patient information, clinical evidence and longitudinal context.",
      "Rather than replacing clinical judgement, Clynexa is designed to organize information, surface relevant evidence, identify potentially important patterns and support clinical reasoning within appropriate professional oversight.",
    ],
    project: "CLYNEXA CLINICAL REASONING ENGINE",
    projectDetail: "Inputs: Patient history + laboratory results + imaging + medications + observations + relevant clinical literature. Outputs: Structured context + evidence + potential considerations + uncertainty.",
    capabilities: ["Patient information synthesis", "Clinical evidence organization", "Longitudinal context", "Pattern surfacing", "Professional oversight"],
    notes: [{ title: "Core principle", paragraphs: ["The clinician makes the clinical decision. Clynexa is intended to support professional reasoning, not replace it."] }],
  },
  {
    id: "vizera", number: "04", name: "VIZERA", title: "Medical Perception for the Next Generation of Diagnostics.", visual: "syndex",
    body: [
      "Vizera is TarvyX's medical perception platform exploring advanced computational analysis of medical images and multimodal diagnostic information.",
      "The platform focuses on extracting structured information from complex medical data and assisting qualified professionals in reviewing patterns, measurements and areas that may warrant further attention.",
    ],
    project: "VIZERA MULTIMODAL DIAGNOSTICS",
    projectDetail: "Medical Imaging + Clinical Context + Laboratory Data + Patient History",
    capabilities: ["Radiology", "Pathology", "Dermatology", "Ophthalmology", "Ultrasound"],
    notes: [
      { title: "Multimodal context", paragraphs: ["Rather than treating every image as an isolated classification problem, Vizera explores how multiple sources of information can contribute to a more complete research or clinical context."] },
      { title: "Medical validation", paragraphs: ["Medical deployment would require extensive validation and applicable regulatory approval."] },
    ],
  },
  {
    id: "genevra", number: "05", name: "GENEVRA", title: "Intelligence for Genomic Medicine.", visual: "veridis",
    body: [
      "Genevra is TarvyX's computational genomics platform exploring how genomic, clinical and biological information can be integrated to support research and personalized medicine.",
      "Genevra is designed to help researchers and clinicians investigate relationships between genetic variation, biological pathways and observed phenotypes while maintaining appropriate clinical safeguards and privacy protections.",
    ],
    project: "GENEVRA GENOMIC INTELLIGENCE ENGINE",
    projectDetail: "Genomic Data + Clinical Data + Biological Knowledge → Computational Representation → Variant and Pattern Analysis → Evidence Mapping → Research and Clinical Support",
    capabilities: ["Rare disease research", "Precision medicine research", "Pharmacogenomics research", "Population genomics"],
  },
  {
    id: "vitalora", number: "06", name: "VITALORA", title: "Continuous Intelligence for Human Health.", visual: "oryon",
    body: [
      "Vitalora explores continuous health intelligence by combining longitudinal physiological information, patient-reported information and contextual signals to identify meaningful changes over time.",
      "The platform is intended to support monitoring, early attention and coordinated care under appropriate clinical oversight.",
    ],
    project: "VITALORA LONGITUDINAL HEALTH ENGINE",
    projectDetail: "Instead of looking only at a single measurement, such as “Heart rate = 82”, Vitalora explores: “How is this person's physiological state changing over days, weeks and months?”",
    capabilities: ["Wearables", "Medical devices", "Clinical observations", "Patient-reported information"],
    notes: [{ title: "Longitudinal health", paragraphs: ["The goal is to understand changes over time rather than rely exclusively on isolated readings."] }],
  },
  {
    id: "surgynex", number: "07", name: "SURGYNEX", title: "Computational Intelligence for Surgical Systems.", visual: "lumenix",
    body: [
      "Surgynex is TarvyX's surgical intelligence research platform exploring computational tools for preoperative planning, procedural simulation, intraoperative information support and postoperative analysis.",
      "The platform investigates how medical imaging, patient-specific models, simulation and intelligent software can help surgical teams prepare for complex procedures.",
      "Surgynex focuses on computational support and research rather than claiming to build a complete robotic surgery system.",
    ],
    project: "SURGYNEX PATIENT-SPECIFIC SIMULATION",
    projectDetail: "Patient Data → 3D Anatomical Model → Procedure Simulation → Scenario Comparison → Risk and Constraint Analysis → Clinical Planning",
    capabilities: ["Preoperative planning", "Procedural simulation", "Intraoperative information support", "Postoperative analysis", "Medical imaging", "Patient-specific models"],
    notes: [{ title: "Clinical supervision", paragraphs: ["The objective is to explore patient-specific computational models that support preparation and evaluation under qualified clinical supervision."] }],
  },
  {
    id: "pharmarex", number: "08", name: "PHARMAREX", title: "Computational Intelligence for Therapeutic Research.", visual: "fabric",
    body: [
      "Pharmarex explores computational approaches for pharmaceutical research by connecting biological knowledge, molecular information, scientific literature and predictive modelling.",
      "The platform is designed to support researchers in exploring candidate compounds, understanding biological relationships and prioritizing computational hypotheses for further laboratory validation.",
    ],
    project: "PHARMAREX MOLECULAR DISCOVERY ENGINE",
    projectDetail: "Disease Target → Biological Model → Candidate Generation → Computational Screening → Property Prediction → Candidate Ranking → Laboratory Validation",
    capabilities: ["Biological knowledge integration", "Molecular information analysis", "Candidate-compound exploration", "Predictive modelling", "Research prioritization"],
    notes: [{ title: "Research validation", paragraphs: ["Pharmarex supports the exploration and prioritization of research candidates. Computational predictions do not replace experimental testing or scientific review."] }],
  },
  {
    id: "neurova", number: "09", name: "NEUROVA", title: "Computational Intelligence for the Human Brain.", visual: "nexora",
    body: [
      "Neurova is TarvyX's neuroscience intelligence research platform exploring computational approaches for understanding complex neurological information.",
      "The platform investigates brain-related data, neurological patterns, computational modelling and multimodal analysis as tools for research and clinical decision support.",
    ],
    project: "NEUROVA BRAIN MODEL",
    projectDetail: "Brain Imaging + Clinical Observations + Longitudinal Data + Computational Models",
    capabilities: ["Neurological research", "Brain imaging research", "Neurodegenerative disease research", "Cognitive science"],
    notes: [{ title: "Clinical oversight", paragraphs: ["Any clinical application requires appropriate validation and professional oversight."] }],
  },
  {
    id: "epidora", number: "10", name: "EPIDORA", title: "Intelligence for Population Health.", visual: "codelys",
    body: [
      "Epidora is TarvyX's population-health intelligence platform for analysing large-scale health patterns, healthcare demand and emerging trends.",
      "It explores how diverse health, environmental and demographic information can be combined to help public-health organizations and healthcare networks understand changing population needs.",
    ],
    project: "EPIDORA HEALTH SIGNAL ENGINE",
    projectDetail: "Population Data → Health Signals → Temporal Analysis → Trend Detection → Scenario Modelling → Public Health Intelligence",
    capabilities: ["Public health planning", "Healthcare capacity planning", "Disease surveillance research", "Regional health-resource planning"],
    notes: [{ title: "Research scope", paragraphs: ["Epidora is a population-health research and planning direction, not an autonomous outbreak predictor without rigorous epidemiological validation."] }],
  },
  {
    id: "medsim", number: "11", name: "MEDSIM", title: "A Computational Environment for Medicine.", visual: "evolis",
    body: [
      "Medsim is envisioned as a medical simulation environment for exploring relationships between clinical state, physiology, longitudinal observations and intervention scenarios.",
      "Rather than focusing on only one hospital function, Medsim investigates how computational models can help researchers and healthcare professionals explore possible changes in complex medical scenarios.",
    ],
    project: "MEDSIM HUMAN DIGITAL MODEL",
    projectDetail: "Clinical State + Physiology + Longitudinal Observations + Intervention Scenarios",
    capabilities: ["Clinical-state modelling", "Physiological modelling", "Longitudinal observations", "Intervention scenario exploration"],
    notes: [{ title: "Research and decision support", paragraphs: ["The model can be used to explore questions such as: “What could change if this condition or intervention progresses in a particular way?”", "Medsim is a research and decision-support simulation concept, not a virtual replacement for a clinician or a real patient."] }],
  },
];

const HUMAN_INTERFACE_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "sentara", number: "01", name: "SENTARA", title: "Interfaces That Understand Intent.", visual: "nexora",
    body: [
      "Sentara explores interfaces that understand what the user is trying to accomplish, rather than forcing the user to navigate predefined screens.",
      "Sentara is TarvyX's intent-aware interaction platform, designed to explore interfaces that dynamically adapt around the user's objective, context and interaction patterns.",
      "Instead of requiring users to navigate a fixed hierarchy of menus and screens, Sentara investigates interfaces that can reorganize information and interaction pathways around the task being performed.",
    ],
    project: "SENTARA INTENT ENGINE",
    projectDetail: "Human Intent → Context Understanding → Task Model → Interface Generation → Interaction → User Feedback → Interface Adaptation",
    capabilities: ["Intent-aware interaction", "Dynamic information organization", "Adaptive interaction pathways", "User-feedback-driven interface adaptation"],
    notes: [{ title: "Example", paragraphs: ["Instead of navigating Dashboard → Reports → Sales → Filter → Export, the user asks: “Show me why sales dropped this month and prepare the relevant report.” The interface dynamically constructs the interaction needed to complete the task.", "This is intent-driven UX rather than traditional screen navigation."] }],
  },
  {
    id: "fluxia", number: "02", name: "FLUXIA", title: "An Interface That Changes With the Situation.", visual: "codelys",
    body: [
      "Conventional interfaces are mostly static. Fluxia explores context-adaptive interfaces that dynamically change according to user context, task, environment, device and information priority.",
      "The interface becomes responsive not only to screen size, but also to the circumstances in which it is being used.",
    ],
    project: "FLUXIA ADAPTIVE UI ENGINE",
    projectDetail: "User + Task + Environment + Device + Attention + Context → Interface State → Dynamic Layout → Interaction Priority",
    capabilities: ["Healthcare — prioritize critical patient information for a clinician", "Research — provide graphs, references and simulation controls", "Manufacturing — present alerts, machine state and spatial information"],
    notes: [{ title: "Adaptive experiences", paragraphs: ["The same underlying system could provide different interface experiences according to the user's context and requirements."] }],
  },
  {
    id: "voxara", number: "03", name: "VOXARA", title: "Interaction Beyond Touch.", visual: "evolis",
    body: [
      "Voxara explores multimodal human-computer interaction in which users can communicate with digital systems through combinations of voice, text, vision, gesture and contextual interaction.",
      "The objective is to move from application-specific commands toward more natural interaction between humans and intelligent systems.",
    ],
    project: "VOXARA MULTIMODAL INTERFACE",
    projectDetail: "Voice + Text + Vision + Gesture + Context + Environment → Intent Model → Interaction",
    capabilities: ["Voice interaction", "Text interaction", "Visual and gesture input", "Context-aware interaction"],
    notes: [{ title: "Example", paragraphs: ["A user points toward a chart and asks: “Why did this change?” The system explores how to interpret both what the person said and what they were pointing at.", "By combining multiple interaction signals, Voxara investigates more context-aware and natural ways for people to communicate with intelligent applications."] }],
  },
  {
    id: "spatira", number: "04", name: "SPATIRA", title: "Interfaces That Exist in Space.", visual: "syndex",
    body: [
      "Spatira is TarvyX's spatial interaction platform exploring interfaces that operate within three-dimensional environments rather than being restricted to conventional flat displays.",
      "The platform investigates how information can be positioned, manipulated and understood relative to the user's physical environment.",
    ],
    project: "SPATIRA SPATIAL OS",
    projectDetail: "3D Space + Objects + User Position + Gestures + Voice + Intelligent Agents",
    capabilities: ["Automotive", "Manufacturing", "Healthcare", "Education", "Robotics", "Engineering"],
    notes: [
      { title: "Example", paragraphs: ["Instead of opening a conventional monitoring dashboard, a user could enter a virtual or augmented industrial environment where machines appear in their corresponding physical positions and the system highlights anomalies spatially."] },
      { title: "Spatial computing", paragraphs: ["Spatira explores spatial computing as an alternative way to represent, understand and interact with complex information."] },
    ],
  },
  {
    id: "cognivue", number: "05", name: "COGNIVUE", title: "Interfaces That Know What Matters.", visual: "veridis",
    body: [
      "The challenge is not always a lack of information. In many professional environments, the challenge is having too much information to process.",
      "Cognivue is TarvyX's contextual information-interface platform, designed to investigate how complex information can be dynamically organized according to relevance, urgency, relationships and user objectives.",
      "The system aims to reduce cognitive overload by presenting the information that matters most for the decision currently being made.",
    ],
    project: "COGNIVUE ATTENTION ENGINE",
    projectDetail: "Available Information → Context → User Goal → Importance → Urgency → Relationship → Information Prioritization → Adaptive Presentation",
    capabilities: ["Doctors", "Engineers", "Pilots", "Security analysts", "Researchers", "Executives"],
    notes: [{ title: "Information presentation", paragraphs: ["Cognivue explores how intelligent information presentation can help people focus on relevant evidence without losing access to the wider context."] }],
  },
  {
    id: "agentia", number: "06", name: "AGENTIA", title: "Interfaces for Working With Autonomous Intelligence.", visual: "oryon",
    body: [
      "As intelligent agents become more capable, another important question emerges: How should humans interact with autonomous systems?",
      "Agentia is TarvyX's human-agent interaction platform for designing interfaces through which people can supervise, collaborate with and control intelligent agents.",
      "The platform explores new interaction patterns for delegating objectives, reviewing decisions, understanding system confidence and approving consequential actions.",
    ],
    project: "AGENTIA COMMAND INTERFACE",
    projectDetail: "Human Objective → AI Plan → System Reasoning Summary → Proposed Actions → Human Approval → Execution → Outcome → Review",
    capabilities: ["Define objectives for intelligent agents", "Review proposed plans and actions", "Understand system reasoning summaries", "Assess confidence and uncertainty", "Approve consequential operations", "Review execution outcomes"],
    notes: [
      { title: "Human oversight", paragraphs: ["Human oversight and clear approval boundaries remain important when agents perform consequential actions.", "This direction connects with TarvyX's broader Advanced Artificial Intelligence roadmap."] },
    ],
  },
  {
    id: "generia", number: "07", name: "GENERIA", title: "Interfaces Generated Around the User.", visual: "lumenix",
    body: [
      "Generia explores dynamically generated interfaces based on intent, task, data, context and accessibility needs.",
      "Rather than treating an interface as a fixed artifact that must be designed screen by screen, Generia investigates interfaces as computational systems that can assemble and adapt themselves around the task being performed.",
    ],
    project: "GENERIA UI SYNTHESIS ENGINE",
    projectDetail: "Input: “Create an interface for monitoring 500 industrial machines.” → Information Hierarchy + Visualizations + Controls + Alerts + Workflows",
    capabilities: ["Intent-driven interface generation", "Adaptive information structures", "Accessibility-aware interface assembly", "Task-oriented controls and workflows"],
    notes: [{ title: "Research Direction", paragraphs: ["Generia explores how an application could construct an appropriate information structure and set of interactions from a user's objective, while accounting for usability, accessibility and task requirements.", "The interface can then adapt as requirements change."] }],
  },
  {
    id: "incluvia", number: "08", name: "INCLUVIA", title: "Interfaces That Adapt to Human Diversity.", visual: "fabric",
    body: [
      "Incluvia explores adaptive accessibility rather than relying exclusively on fixed accessibility settings.",
      "The platform investigates interfaces that dynamically adapt interaction mechanisms according to individual user requirements, device constraints and environmental conditions.",
      "The goal is to make digital systems more naturally accessible and adaptable to different ways of interacting.",
    ],
    project: "INCLUVIA ADAPTIVE ACCESS ENGINE",
    projectDetail: "Voice ↔ Touch ↔ Keyboard ↔ Visual Interaction ↔ Simplified Interaction",
    capabilities: ["Adapt interaction to user requirements", "Account for device constraints", "Adapt to environmental conditions"],
    notes: [{ title: "Integrated accessibility", paragraphs: ["Incluvia's direction is to make accessibility an integrated part of the interaction system rather than a separate set of optional controls."] }],
  },
  {
    id: "synthra", number: "09", name: "SYNTHRA", title: "The Operating Layer Between Humans and Intelligence.", visual: "nexora",
    body: [
      "Synthra explores a universal interaction layer through which humans can communicate with multiple intelligent systems, applications and computational resources without needing to understand the underlying complexity of each system.",
      "The long-term objective is to make interaction increasingly centered around human intent rather than application navigation.",
    ],
    project: "SYNTHRA HUMAN-INTELLIGENCE INTERFACE",
    projectDetail: "Human → Intent → Synthra Layer → Connected Systems → Result",
    capabilities: ["Advanced Artificial Intelligence", "Software systems", "Data platforms", "Robotics", "Cloud infrastructure", "Applications"],
    notes: [{ title: "Cross-system interaction", paragraphs: ["The user would express an objective without needing to know which underlying application or computational system must perform the task. Synthra would coordinate the interaction across supported systems."] }],
  },
];

const MEDICAL_DOMAIN: IntelligenceDomain = {
  id: "medical",
  title: "Medical Intelligence & Life Sciences",
  eyebrow: "TARVYX GLOBAL HEALTH & MEDICAL SCIENCES",
  tagline: "Engineering intelligent systems for the future of medicine, hospitals and human health.",
  introduction: [
    "TarvyX Medical Intelligence & Life Sciences is focused on developing advanced technologies for hospitals, clinical research, biomedical science and global health.",
    "We explore the convergence of artificial intelligence, computational medicine, biomedical data, simulation, medical imaging, genomics, robotics and intelligent clinical infrastructure to create systems that can help healthcare organizations understand complex medical information and improve how care, research and medical operations are coordinated.",
    "Our long-term vision is to build a connected medical intelligence ecosystem spanning hospital systems, clinical decision support, medical discovery, diagnostics, simulation, biomedical research and population health.",
    "TarvyX does not aim to replace clinicians or researchers. We aim to build computational systems that extend human capability, surface evidence, model complexity and support better decisions under appropriate clinical, ethical and regulatory oversight.",
  ],
  lifecycleTitle: "THE MEDICAL INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "Connecting clinical context, research, insight and validated application.",
  lifecycle: [
    { title: "Observe", detail: "Connect clinical and scientific information" },
    { title: "Integrate", detail: "Build coherent medical context" },
    { title: "Understand", detail: "Surface evidence and relationships" },
    { title: "Model", detail: "Explore patterns and scenarios" },
    { title: "Validate", detail: "Apply scientific and clinical review" },
    { title: "Support", detail: "Extend human expertise and care" },
  ],
  productHeading: "OUR MEDICAL INTELLIGENCE PRODUCTS",
  productDescription: "Eleven systems connecting hospital intelligence, clinical reasoning, discovery and population health.",
  products: MEDICAL_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX MEDICAL PROJECT",
  flagshipTitle: "PROJECT HELIX",
  flagshipSubtitle: "Human & Healthcare Intelligence Exchange",
  flagshipBody: ["Helix is the proposed long-term medical-sciences architecture connecting patient information, hospital operations, scientific research and computational intelligence."],
  architectureTitle: "Helix Architecture",
  architecture: [
    { title: "Patient", description: "Longitudinal context" },
    { title: "Hospital", description: "Operational information" },
    { title: "Science", description: "Research data" },
    { title: "Medical Knowledge", description: "Connect and contextualize the information domains" },
    { title: "AI / ML Systems", description: "Computational intelligence for analysis and support" },
    { title: "Simulation, Reasoning and Analytics", description: "Explore, model and reason across connected context" },
    { title: "Human Oversight", description: "Keep qualified people in the decision loop" },
    { title: "Validated Application", description: "Apply under appropriate validation and oversight" },
  ],
  architectureFlow: "Patient + Hospital + Science → Medical Knowledge → AI / ML Systems → Simulation, Reasoning and Analytics → Human Oversight → Validated Application",
  additionalResearch: [
    {
      title: "Product Ecosystem",
      body: [],
      items: ["Medyra — hospital intelligence", "Clynexa — clinical intelligence", "Vizera — medical perception", "Biovana — biomedical discovery", "Genevra — genomic intelligence", "Vitalora — longitudinal health", "Surgynex — surgical intelligence", "Pharmarex — therapeutic research", "Neurova — neuroscience", "Epidora — population health", "Medsim — medical simulation"],
    },
    {
      title: "TarvyX Global Medical Network — Internal concept: GMN",
      body: [
        "The TarvyX Global Medical Network explores how participating hospitals could use medical intelligence infrastructure while maintaining their own governance, data boundaries and regulatory requirements.",
        "The objective is not to centralize every patient's data. Future architectures could investigate federated and privacy-preserving approaches that allow institutions to retain appropriate control over their information while contributing to approved computational workflows.",
      ],
      flow: "Hospital A → Local Intelligence · Hospital B → Local Intelligence · Hospital C → Local Intelligence",
      items: ["Federated intelligence", "Privacy-preserving computation research", "Approved collaborative research", "Global research insights"],
    },
    {
      title: "TarvyX Medical Sciences — Research Frontier",
      body: ["Development Philosophy: Research → Experimental Systems → Validated Prototypes → Clinically Validated and Appropriately Regulated Products.", "TarvyX's long-term ambition is to build computational intelligence for hospitals and medical sciences while maintaining rigorous scientific, clinical, ethical, privacy and regulatory standards."],
      items: ["Clinical Intelligence: Clynexa", "Hospital Intelligence: Medyra", "Biomedical Intelligence: Biovana", "Genomic Intelligence: Genevra", "Medical Perception: Vizera", "Medical Simulation: Medsim", "Therapeutic Discovery: Pharmarex", "Neuroscience: Neurova", "Population Intelligence: Epidora"],
    },
  ],
  portfolio: MEDICAL_PRODUCTS.map((product) => ({ product: product.name[0] + product.name.slice(1).toLowerCase(), direction: product.title })),
  vision: ["Our long-term vision is to build connected medical intelligence for hospitals, clinical research, biomedical science and global health while maintaining appropriate human expertise and oversight."],
  visionTagline: "TarvyX Medical Intelligence & Life Sciences — Engineering Intelligence for Better Healthcare and Scientific Discovery.",
  action: "Explore Medical Intelligence",
};

const HUMAN_INTERFACE_DOMAIN: IntelligenceDomain = {
  id: "human-interface",
  headerTitle: "Human Interface Intelligence",
  title: "Designing Interfaces Beyond Screens",
  eyebrow: "TARVYX HUMAN INTERFACE INTELLIGENCE",
  tagline: "Engineering the next generation of interaction between humans and intelligent systems.",
  introduction: [
    "TarvyX researches and develops next-generation human-computer interaction systems that move beyond conventional screen-based interfaces.",
    "Our work explores adaptive interfaces, multimodal interaction, spatial computing, contextual experiences and intelligent interfaces that understand user intent and dynamically respond to the situation.",
    "We believe the future of interaction will not be limited to clicking through static screens. It will emerge through a continuous interaction between human intent, intelligent systems, voice, vision, spatial environments and adaptive interfaces.",
    "TarvyX builds the interaction technologies required for that transition.",
  ],
  lifecycleTitle: "THE HUMAN INTERACTION LIFECYCLE",
  lifecycleDescription: "From human intent to adaptive interaction with intelligent systems.",
  lifecycle: [
    { title: "Human", detail: "Express an objective or request" },
    { title: "Intent", detail: "Understand the desired outcome" },
    { title: "Context", detail: "Consider task and situation" },
    { title: "Interaction", detail: "Choose appropriate modalities" },
    { title: "Intelligence", detail: "Coordinate relevant systems" },
    { title: "Feedback", detail: "Adapt to the interaction outcome" },
  ],
  productHeading: "OUR HUMAN INTERFACE PRODUCTS",
  productDescription: "Nine platforms exploring intent-aware, adaptive, multimodal and spatial interaction.",
  products: HUMAN_INTERFACE_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX PROJECT",
  flagshipTitle: "PROJECT HORIZON",
  flagshipSubtitle: "Human-Oriented Responsive & Intelligent eXperience Operating Network",
  flagshipBody: [
    "Horizon is TarvyX's proposed long-term research platform for building an adaptive interface layer capable of translating human intent into dynamic interactions across software, AI systems and spatial environments.",
    "Instead of treating each application as a separate interface, Horizon explores how an interaction layer could understand human objectives and coordinate the most appropriate form of interaction.",
  ],
  architectureTitle: "Horizon Architecture",
  architecture: [
    { title: "1. Human", description: "The person initiates an objective, request or interaction." },
    { title: "2. Intent", description: "The system interprets the intended outcome rather than relying only on predefined commands." },
    { title: "3. Context Engine", description: "The system considers the task, available information, environment and interaction context." },
    { title: "4. Cognitive Interpretation", description: "The interpreted intent and context are converted into an appropriate interaction model." },
    { title: "5. Multimodal Interaction", description: "The system can explore visual, voice, spatial, touch, gesture and environmental interaction." },
    { title: "6. Interaction Model", description: "The system determines how information and controls should be presented." },
    { title: "7. Intelligence", description: "The interface coordinates with the relevant intelligent systems and computational resources." },
    { title: "8. Action", description: "The requested interaction or approved operation is performed." },
    { title: "9. Feedback", description: "The system receives feedback and evaluates whether the interaction met the user's objective." },
  ],
  architectureFlow: "Human → Intent → Context Engine → Cognitive Interpretation → Visual / Voice / Spatial / Touch / Gesture → Interaction Model → Intelligence → Action → Feedback → Adaptation",
  additionalResearch: [
    {
      title: "Frontier Project — TarvyX ZERO UI",
      body: [
        "When Software Stops Looking Like Software.",
        "Zero UI is TarvyX's frontier research direction for exploring interaction experiences that are not dependent on conventional application screens and fixed navigation.",
        "Instead of Open App → Find Feature → Click Buttons, the proposed experience becomes: Express Intent → Construct the Appropriate Interaction → Execute → Verify.",
        "The interface could become a combination of voice, visual, spatial, contextual and agent-based interaction depending on the task.",
        "Zero UI explores a future in which software adapts to the person and the situation rather than requiring the person to adapt to a fixed interface.",
        "This should be presented as a TarvyX research direction, not as an already-solved or production-ready capability.",
      ],
    },
    {
      title: "Core Research Areas",
      body: [],
      items: ["Adaptive Interfaces", "Spatial Interaction", "Multimodal Interaction", "Intent-Aware UX", "AI-Native Interfaces", "Human-Agent Interaction", "Accessibility Intelligence", "Interface Generation"],
    },
  ],
  portfolio: [
    { product: "Sentara", direction: "Intent-aware interfaces" },
    { product: "Fluxia", direction: "Context-adaptive interfaces" },
    { product: "Voxara", direction: "Multimodal interaction" },
    { product: "Spatira", direction: "Spatial interfaces" },
    { product: "Cognivue", direction: "Cognitive information interfaces" },
    { product: "Agentia", direction: "Human-agent interaction" },
    { product: "Generia", direction: "Generated interfaces" },
    { product: "Incluvia", direction: "Adaptive accessibility" },
    { product: "Synthra", direction: "Human-intelligence interaction layer" },
    { product: "Core Research Platform", direction: "Horizon" },
    { product: "Frontier Research", direction: "Zero UI" },
  ],
  vision: [
    "TarvyX explores a future in which human-computer interaction moves beyond static screens and conventional application navigation.",
    "Our research focuses on interfaces that understand intent, adapt to context, connect multiple interaction modes and enable people to work more naturally with intelligent systems.",
    "From adaptive interfaces and multimodal interaction to spatial computing, accessibility intelligence and human-agent collaboration, TarvyX aims to investigate the interaction technologies that will shape the next generation of digital experiences.",
  ],
  visionTagline: "TarvyX Human Interface Intelligence — Designing the Future of Human–Machine Interaction.",
  action: "Explore Human Interface Intelligence",
};

const EMBEDDED_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "embera", number: "01", name: "EMBERA", title: "Intelligence at the Point of Action.", visual: "nexora",
    body: [
      "Embera is TarvyX's edge-intelligence platform for bringing perception, decision-making and adaptive computation closer to the physical environment.",
      "It is designed for systems where latency, privacy, reliability and offline operation are critical, enabling intelligent workloads to operate directly on embedded and edge hardware.",
      "Embera is not intended to replace an operating system or a microcontroller framework. It explores an intelligence architecture for deploying computational capabilities within constrained physical devices.",
    ],
    project: "EMBERA EDGE CORE",
    projectDetail: "Sensors → Signal Processing → Local AI → Context → Decision → Actuation → Feedback",
    capabilities: ["TinyML and edge inference", "Hardware-aware model optimization", "Sensor fusion", "Real-time inference", "Low-power intelligence", "Offline intelligence", "Edge-cloud coordination", "Adaptive computation"],
    notes: [{ title: "First Prototype", paragraphs: ["Build a development-board platform capable of sensing, inferring, deciding and acting without requiring a permanent cloud connection."] }],
  },
  {
    id: "fortexa", number: "02", name: "FORTEXA", title: "Security Intelligence for Embedded Systems.", visual: "codelys",
    body: [
      "Fortexa explores security technologies for embedded devices and connected physical systems. The platform focuses on protecting firmware, device identities, communication pathways and hardware-software interfaces.",
      "Its research direction is to help embedded systems maintain integrity and trust throughout their operational lifecycle.",
    ],
    project: "FORTEXA EMBEDDED TRUST ENGINE",
    projectDetail: "Device Identity → Secure Boot → Firmware Integrity → Runtime Monitoring → Threat Detection → Policy Evaluation → Controlled Response → Verification",
    capabilities: ["Firmware integrity", "Device identity and authentication", "Secure boot and trusted execution concepts", "Embedded threat detection", "Secure update workflows", "Hardware-rooted trust", "Device lifecycle security"],
    notes: [{ title: "Security engineering", paragraphs: ["Fortexa is intended to support security engineering and validation across embedded products rather than claim that every device is automatically secure."] }],
  },
  {
    id: "senzora", number: "03", name: "SENZORA", title: "Intelligence from Physical Signals.", visual: "evolis",
    body: [
      "Senzora is TarvyX's sensor-intelligence platform exploring how raw sensor readings can be transformed into useful contextual information.",
      "Rather than interpreting each sensor independently, Senzora investigates the combination of signal processing, sensor fusion, calibration and temporal analysis to help systems understand changing physical conditions.",
    ],
    project: "SENZORA SENSOR INTELLIGENCE ENGINE",
    projectDetail: "Sensor Signals → Signal Conditioning → Calibration → Sensor Fusion → Feature Extraction → Context Interpretation → State Estimation → Output",
    capabilities: ["Multisensor fusion", "Signal processing", "Noise and anomaly detection", "Sensor calibration", "Temporal signal analysis", "Physical-state estimation", "Low-power sensing", "Real-time sensor interpretation"],
    notes: [{ title: "Potential Applications", paragraphs: ["Automotive systems, industrial machinery, robotics, medical devices, environmental monitoring and connected infrastructure."] }],
  },
  {
    id: "embodia", number: "04", name: "EMBODIA", title: "Physical Intelligence Across Intelligent Machines.", visual: "syndex",
    body: [
      "Embodia is TarvyX's proposed physical-intelligence platform for connecting embedded computation, machine perception, control systems and adaptive behaviour.",
      "The platform explores how intelligence can be designed around the physical capabilities and limitations of a machine, including its sensors, actuators, energy budget, operating environment and safety constraints.",
    ],
    project: "EMBODIA PHYSICAL INTELLIGENCE CORE",
    projectDetail: "Physical Environment → Sensors → State Estimation → Local Intelligence → Action Planning → Control Interface → Physical Response → Feedback",
    capabilities: ["Hardware-aware intelligence", "Physical-state modelling", "Embedded decision support", "Adaptive control research", "Sensor-actuator coordination", "Resource-constrained AI", "Cross-platform embedded architectures"],
    notes: [{ title: "Cross-Domain Opportunity", paragraphs: ["Embodia can provide a conceptual connection between TarvyX Embedded Intelligence, Advanced Artificial Intelligence, Automotive Intelligence and Robotics."] }],
  },
  {
    id: "vitalink", number: "05", name: "VITALINK", title: "Intelligence for Medical Devices.", visual: "veridis",
    body: [
      "Vitalink explores embedded intelligence for medical and health-related devices, focusing on the processing, interpretation and reliable transmission of device-generated information.",
      "The platform investigates how medical-device data can be processed closer to its source while considering reliability, privacy, power consumption and system integration.",
    ],
    project: "VITALINK MEDICAL DEVICE INTELLIGENCE",
    projectDetail: "Medical Sensors → Signal Processing → Device-State Assessment → Local Analysis → Data Validation → Secure Communication → Clinical-System Integration",
    capabilities: ["Embedded medical-device processing", "Physiological signal analysis", "Device-state monitoring", "Low-power computing", "Secure device communication", "Reliability and fault monitoring", "Edge processing for health-related devices"],
    notes: [{ title: "Medical-device validation", paragraphs: ["Any clinical use would require appropriate medical-device validation and regulatory compliance."] }],
  },
  {
    id: "veloxis", number: "06", name: "VELOXIS", title: "Real-Time Intelligence for Responsive Systems.", visual: "oryon",
    body: [
      "Veloxis is TarvyX's real-time embedded AI research platform, exploring how intelligent computation can operate within strict timing, memory, energy and processing constraints.",
      "The platform focuses on predictable execution, hardware-aware inference and coordination between real-time software and intelligent workloads.",
    ],
    project: "VELOXIS REAL-TIME INFERENCE ENGINE",
    projectDetail: "Input Signals → Real-Time Scheduling → Optimized Inference → Deadline Evaluation → Decision Output → Controlled Execution → Runtime Monitoring",
    capabilities: ["Real-time inference", "Scheduling and resource allocation", "Model compression and optimization", "Hardware acceleration", "Latency measurement", "Deadline-aware computation", "Runtime monitoring", "Predictable system behaviour"],
    notes: [{ title: "Safety-critical engineering", paragraphs: ["Veloxis explores the integration of AI with real-time systems; safety-critical deployment would require appropriate verification and engineering."] }],
  },
  {
    id: "neuroedge", number: "07", name: "NEUROEDGE", title: "Adaptive Intelligence at the Edge.", visual: "lumenix",
    body: [
      "Neuroedge is TarvyX's frontier research direction for exploring embedded intelligence that can adapt to changing operating conditions while remaining within defined resource and safety constraints.",
      "The platform investigates how devices can use local experience, validated updates and controlled adaptation without depending on continuous remote retraining.",
    ],
    project: "NEUROEDGE ADAPTATION ENGINE",
    projectDetail: "Initial Model → Local Observation → Change Detection → Adaptation Candidate → Evaluation → Policy Validation → Approved Update → Monitoring",
    capabilities: ["On-device learning research", "Continual-learning methods", "Edge model adaptation", "Drift detection", "Local model evaluation", "Resource-aware intelligence", "Controlled model updates"],
    notes: [{ title: "Research scope", paragraphs: ["This is a research direction, not a claim that unrestricted autonomous learning on embedded devices is already available."] }],
  },
  {
    id: "selfware", number: "08", name: "SELFWARE", title: "Software That Understands Its Physical Execution Environment.", visual: "fabric",
    body: [
      "Selfware explores adaptive software architectures for embedded systems that can monitor their runtime behaviour, identify operational constraints and recommend validated adjustments.",
      "Its long-term direction is to connect software behaviour with hardware conditions such as power consumption, temperature, workload, memory and processing capacity.",
    ],
    project: "SELFWARE ADAPTIVE RUNTIME",
    projectDetail: "Runtime State → Resource Monitoring → Constraint Detection → Alternative Configuration → Simulation or Evaluation → Policy Check → Approved Change → Verification",
    capabilities: ["Adaptive runtime systems", "Hardware-software coordination", "Runtime resource optimization", "Power-aware execution", "Fault and anomaly detection", "Controlled configuration updates", "Runtime verification"],
    notes: [{ title: "Controlled adaptation", paragraphs: ["The objective is controlled adaptation rather than unrestricted self-modification of deployed systems."] }],
  },
];

const IOT_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "synara", number: "01", name: "SYNARA", title: "An Intelligence Fabric for Connected Worlds.", visual: "nexora",
    body: [
      "Synara is TarvyX's distributed intelligence platform for connecting sensors, devices, edge systems and intelligent applications into a coordinated computational environment.",
      "Rather than treating connected devices as independent endpoints, Synara models their relationships, events, states and interactions as part of a larger intelligent system.",
    ],
    project: "SYNARA INTELLIGENCE FABRIC",
    projectDetail: "Sensors → Devices → Edge Intelligence → Event Understanding → Environment Model → Distributed Reasoning → Coordinated Action → Feedback",
    capabilities: ["Device intelligence", "Event correlation", "Edge processing", "Distributed reasoning", "Context modelling", "Device-to-device coordination", "Real-time state modelling", "Intelligent orchestration"],
    notes: [{ title: "Common intelligence layer", paragraphs: ["Synara is intended to provide a common intelligence layer for connected environments rather than functioning as only a device-management dashboard."] }],
  },
  {
    id: "ambiora", number: "02", name: "AMBIORA", title: "Intelligence That Understands the Environment.", visual: "codelys",
    body: [
      "Ambiora is TarvyX's ambient intelligence platform for understanding complex physical environments through distributed sensing and contextual interpretation.",
      "It combines information from multiple physical sources to construct a continuously evolving representation of environmental conditions, activity and interactions.",
      "Instead of asking only which sensor triggered, Ambiora explores the broader question: What is happening in this environment?",
    ],
    project: "AMBIORA ENVIRONMENT MODEL",
    projectDetail: "Temperature + Camera + Motion + Sound + Air Quality + Machines + People → Sensor Fusion → Context Model → Environmental State",
    capabilities: ["Smart buildings", "Industrial environments", "Healthcare facilities", "Environmental monitoring", "Intelligent workplaces", "Connected infrastructure"],
    notes: [{ title: "Example", paragraphs: ["Instead of reporting only that a sensor has measured a temperature of 31°C, an intelligent environment model could investigate whether an abnormal thermal pattern is occurring while machine load is increasing."] }],
  },
  {
    id: "meshra", number: "03", name: "MESHRA", title: "Distributed Intelligence Without a Single Point of Intelligence.", visual: "evolis",
    body: [
      "Meshra is TarvyX's distributed IoT intelligence platform exploring how connected devices can collaborate locally while selectively sharing information with edge and cloud infrastructure.",
      "The platform is designed for environments where low latency, resilience, bandwidth efficiency and local decision-making are important.",
    ],
    project: "MESHRA COLLECTIVE EDGE",
    projectDetail: "Device ↔ Device ↔ Edge ↔ Cloud",
    capabilities: ["Distributed device coordination", "Local processing", "Selective data exchange", "Resilient communication", "Event-driven collaboration", "Edge-cloud coordination", "Network-aware computation"],
    notes: [{ title: "Research direction", paragraphs: ["The platform explores how connected systems can exchange relevant information, coordinate local responses and continue useful operations when central connectivity is limited.", "The goal is to reduce unnecessary dependence on a central cloud while preserving the ability to coordinate across the wider system."] }],
  },
  {
    id: "iotra", number: "04", name: "IOTRA", title: "A Unified Intelligence Layer for Connected Devices.", visual: "syndex",
    body: [
      "Iotra explores how heterogeneous IoT devices can be represented, managed and coordinated through a consistent computational model.",
      "The platform's proposed direction is to connect device identity, capabilities, state, communication and operational context so that applications can work with different device types through a common abstraction.",
    ],
    project: "IOTRA DEVICE GRAPH",
    projectDetail: "Device Discovery → Device Identity → Capability Mapping → State Representation → Relationship Mapping → Policy Evaluation → Device Coordination",
    capabilities: ["Device abstraction", "Device discovery", "Interoperability", "Device-state modelling", "Connected-system integration", "Lifecycle management", "Policy-based coordination"],
    notes: [{ title: "Device integration", paragraphs: ["Iotra focuses on the software and intelligence layer that can make diverse connected devices easier to integrate."] }],
  },
  {
    id: "predictra", number: "05", name: "PREDICTRA", title: "Predictive Intelligence for Connected Infrastructure.", visual: "veridis",
    body: [
      "Predictra explores how device telemetry, historical behaviour and contextual signals can be used to identify emerging operational issues before they develop into major disruptions.",
      "The platform focuses on predictive monitoring and condition analysis across connected equipment and environments.",
    ],
    project: "PREDICTRA EVENT INTELLIGENCE ENGINE",
    projectDetail: "Telemetry → Historical Patterns → Current State → Anomaly Detection → Trend Analysis → Risk Assessment → Recommended Action → Verification",
    capabilities: ["Equipment condition monitoring", "Predictive maintenance research", "Energy-consumption analysis", "Environmental anomaly detection", "Infrastructure performance", "Connected-facility operations"],
    notes: [{ title: "Prediction validation", paragraphs: ["Predictra is designed to support investigation and prioritization; predictions must be evaluated against real operating data before being relied upon."] }],
  },
  {
    id: "enviora", number: "06", name: "ENVIORA", title: "Intelligence for the Living Environment.", visual: "oryon",
    body: [
      "Enviora explores connected environmental intelligence by combining information from distributed sensors and connected infrastructure.",
      "The platform investigates how changes in temperature, humidity, air quality, energy use, movement and equipment activity can be interpreted together to understand environmental conditions.",
    ],
    project: "ENVIORA ENVIRONMENTAL INTELLIGENCE",
    projectDetail: "Environmental Sensors → Data Validation → Sensor Fusion → Environmental Context → Trend Analysis → Alerts and Insights → Feedback",
    capabilities: ["Environmental sensing", "Air-quality intelligence", "Energy and resource monitoring", "Environmental trend analysis", "Connected-building intelligence", "Context-aware alerts", "Sustainability analytics"],
    notes: [{ title: "Potential applications", paragraphs: ["Potential applications include smart buildings, industrial sites, campuses, public infrastructure and environmental research."] }],
  },
  {
    id: "autonetra", number: "07", name: "AUTONETRA", title: "Coordination Intelligence for Connected Networks.", visual: "lumenix",
    body: [
      "Autonetra explores how connected devices and infrastructure can coordinate actions according to shared objectives, operational conditions and defined policies.",
      "Rather than treating each device as an isolated endpoint, the platform investigates how local events and system-wide priorities can inform coordinated responses.",
    ],
    project: "AUTONETRA COORDINATION ENGINE",
    projectDetail: "Network State → Event Detection → Context Analysis → Coordination Model → Policy Check → Action Selection → Device Execution → Feedback",
    capabilities: ["Device coordination", "Event-driven workflows", "Network-state modelling", "Local and distributed decision-making", "Policy-based automation", "Resilience and fault handling", "Multi-device orchestration"],
    notes: [{ title: "Operational boundaries", paragraphs: ["Any automated action affecting physical infrastructure should operate within appropriate authorization, safety and operational boundaries."] }],
  },
  {
    id: "digisphera", number: "08", name: "DIGISPHERA", title: "A Computational Model of the Connected Physical World.", visual: "fabric",
    body: [
      "Digisphera explores the creation of digital representations of connected environments by linking devices, sensor streams, infrastructure, relationships and operational events.",
      "The platform investigates how these representations can help organizations understand current conditions and evaluate potential changes before acting on physical systems.",
    ],
    project: "DIGISPHERA DIGITAL ENVIRONMENT MODEL",
    projectDetail: "Physical Assets → Device Graph → Live Telemetry → State Model → Relationship Mapping → Scenario Analysis → Operational Insight",
    capabilities: ["Smart infrastructure", "Industrial facilities", "Connected campuses", "Building operations", "Environmental systems", "Infrastructure planning"],
    notes: [{ title: "Model validation", paragraphs: ["Digisphera is a proposed digital-environment intelligence direction, with accuracy depending on sensor quality, model coverage and validation."] }],
  },
];

const ROBOTICS_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  {
    id: "rovara", number: "01", name: "ROVARA", title: "An Intelligence Architecture for Physical Machines.", visual: "nexora",
    body: [
      "Rovara is TarvyX's embodied-intelligence platform for developing robotic systems capable of integrating perception, spatial understanding, memory, planning and controlled action.",
      "Rather than coupling intelligence to a single machine, Rovara is designed as a modular architecture that can support different robotic embodiments and task environments.",
    ],
    project: "ROVARA EMBODIED CORE",
    projectDetail: "Task → Scene Perception → World Representation → Memory → Task Reasoning → Action Planning → Motion and Control → Action → Physical Feedback",
    capabilities: ["3D scene understanding", "Spatial memory", "Task planning", "Manipulation planning", "Uncertainty handling", "Real-time perception", "Human supervision"],
    notes: [{ title: "Commercial Direction", paragraphs: ["Robotics intelligence SDK, enterprise licensing and platform deployment."] }],
  },
  {
    id: "dexora", number: "02", name: "DEXORA", title: "Intelligence for General-Purpose Robotic Manipulation.", visual: "codelys",
    body: [
      "Robots are often highly effective at narrow, predefined tasks. Dexora explores how robotic systems can understand unfamiliar objects and perform new manipulation tasks.",
      "Dexora is TarvyX's robotic manipulation intelligence platform exploring generalized object understanding, grasp planning and task-oriented physical interaction.",
      "The system is designed around the relationship between visual perception, object properties, spatial reasoning and action planning.",
    ],
    project: "DEXORA MANIPULATION ENGINE",
    projectDetail: "Object and Scene → Visual and Spatial Understanding → Object Properties → Task Understanding → Grasp and Action Candidates → Simulation → Execution → Physical Feedback → Adaptation",
    capabilities: ["Object and scene understanding", "Grasp planning", "Manipulation planning", "Object-property estimation", "Task-oriented interaction", "Simulation-based evaluation", "Feedback-driven adaptation"],
    notes: [{ title: "Research scope", paragraphs: ["Dexora is a research direction for more flexible manipulation, not a claim that general-purpose manipulation has already been solved."] }],
  },
  {
    id: "adaptra", number: "03", name: "ADAPTRA", title: "Robots That Learn From Experience.", visual: "evolis",
    body: [
      "Adaptra explores controlled robot-learning approaches in which robotic systems use observations, actions and feedback to improve their performance over time.",
      "The platform investigates how robots can adapt to changing tasks and environments while maintaining evaluation, safety constraints and human oversight.",
    ],
    project: "ADAPTRA EXPERIENCE ENGINE",
    projectDetail: "Environment → Observation → Action → Outcome → Feedback → Experience Memory → Candidate Adaptation → Evaluation → Approved Update",
    capabilities: ["Robot learning", "Reinforcement-learning research", "Experience modelling", "Simulation-based learning", "Policy evaluation", "Adaptation to changing conditions", "Safe learning under constraints"],
    notes: [{ title: "Validated improvement", paragraphs: ["The objective is validated improvement, not uncontrolled modification of a robot's operating behaviour."] }],
  },
  {
    id: "simvora", number: "04", name: "SIMVORA", title: "A Computational Laboratory for Robotics.", visual: "syndex",
    body: [
      "Simvora is TarvyX's robotics simulation research platform for modelling robots, sensors, objects, tasks and physical environments before moving toward physical prototypes.",
      "The platform explores how simulated environments can support system development, scenario generation, behaviour evaluation and repeatable testing.",
    ],
    project: "SIMVORA ROBOTICS SIMULATION ENGINE",
    projectDetail: "Robot Model + Sensors + Objects + Tasks + Physics + Environment → Scenario Generation → Simulation → Behaviour Evaluation → Failure Analysis → Improved Model",
    capabilities: ["Virtual robot environments", "Physics-based simulation", "Sensor simulation", "Scenario generation", "Task evaluation", "Synthetic training data", "Simulation-to-reality research"],
    notes: [{ title: "Development Direction", paragraphs: ["Simvora provides a practical starting point for testing robotics concepts before investing in complex physical hardware."] }],
  },
  {
    id: "perion", number: "05", name: "PERION", title: "Spatial Intelligence for Physical Machines.", visual: "veridis",
    body: [
      "Perion explores how robots can construct and maintain representations of three-dimensional environments.",
      "The platform focuses on spatial perception, object relationships, location, movement and memory to help robotic systems understand where things are and how their environment changes.",
    ],
    project: "PERION SPATIAL INTELLIGENCE ENGINE",
    projectDetail: "Sensor Input → 3D Perception → Localization → Mapping → Object Relationships → Spatial Memory → Environment Update → Task Context",
    capabilities: ["3D scene understanding", "Spatial mapping", "Localization", "Object relationships", "Spatial memory", "Dynamic environment modelling", "Perception under uncertainty"],
    notes: [{ title: "Rovara integration", paragraphs: ["Perion can provide spatial representations for Rovara's reasoning and planning architecture."] }],
  },
  {
    id: "robynex", number: "06", name: "ROBYNEX", title: "Software Infrastructure for Intelligent Robotics.", visual: "oryon",
    body: [
      "Robynex explores the software infrastructure required to integrate robotic perception, planning, control interfaces, sensors and hardware components into maintainable robotic systems.",
      "The platform's proposed direction is to reduce the complexity of connecting different software modules and robotic platforms.",
    ],
    project: "ROBYNEX ROBOTICS SOFTWARE FABRIC",
    projectDetail: "Robot Hardware → Device Interfaces → Sensor Services → Perception Modules → Planning Services → Control Interfaces → Diagnostics → System Monitoring",
    capabilities: ["Robotics software architecture", "Modular system integration", "Hardware abstraction", "Communication between robot components", "Diagnostics and monitoring", "Reusable robotics software", "Deployment and testing workflows"],
    notes: [{ title: "Software foundations", paragraphs: ["Robynex focuses on the software foundations that support robotics applications rather than representing a single robot design."] }],
  },
  {
    id: "collabria", number: "07", name: "COLLABRIA", title: "Intelligence for Human-Robot Collaboration.", visual: "lumenix",
    body: [
      "Collabria explores interaction models that allow people and robots to work together in shared environments.",
      "The platform investigates how robotic systems can interpret task context, communicate their intended actions and account for human presence when coordinating physical work.",
    ],
    project: "COLLABRIA COLLABORATION ENGINE",
    projectDetail: "Human Task → Shared Context → Robot Perception → Action Proposal → Safety and Constraint Evaluation → Human Coordination → Controlled Execution → Feedback",
    capabilities: ["Human-robot interaction", "Shared workspace understanding", "Task coordination", "Intent interpretation", "Action communication", "Human supervision", "Collaborative workflow evaluation"],
    notes: [{ title: "Safety", paragraphs: ["Safety, predictable behaviour and clear human authority are central to any deployment in shared physical environments."] }],
  },
  {
    id: "selfia", number: "08", name: "SELFIA", title: "Self-Adaptive Intelligence for Robotic Systems.", visual: "fabric",
    body: [
      "Selfia is a frontier research direction exploring how robotic systems could identify performance changes, evaluate alternative behaviours and improve through controlled adaptation.",
      "The platform investigates how feedback and experience can inform robotic behaviour without bypassing safety constraints or human authority.",
    ],
    project: "SELFIA ADAPTIVE ROBOT ENGINE",
    projectDetail: "Observe → Detect Change → Diagnose → Generate Alternatives → Simulate → Evaluate → Policy Validation → Human Approval → Controlled Update → Verify",
    capabilities: ["Adaptive robotic behaviour", "Runtime monitoring", "Performance evaluation", "Controlled policy updates", "Simulation-based validation", "Fault-aware adaptation", "Learning from validated feedback"],
    notes: [{ title: "Research scope", paragraphs: ["Selfia should be positioned as research until its adaptation methods have been demonstrated and validated."] }],
  },
  {
    id: "athena", number: "09", name: "ATHENA", title: "Reasoning and Planning for Intelligent Machines.", visual: "nexora",
    body: [
      "Athena explores higher-level reasoning and planning for robotic systems that must translate objectives into sequences of physical actions.",
      "The platform investigates how a robot can break a task into smaller steps, consider constraints, assess possible outcomes and coordinate with lower-level perception and control systems.",
    ],
    project: "ATHENA ROBOT REASONING ENGINE",
    projectDetail: "Human Objective → Task Interpretation → Task Decomposition → World-State Assessment → Plan Generation → Constraint Evaluation → Simulation → Approved Execution → Outcome Verification",
    capabilities: ["Task decomposition", "Goal-conditioned planning", "Action sequencing", "Constraint-aware reasoning", "Uncertainty assessment", "Simulation-assisted planning", "Human approval and verification"],
    notes: [{ title: "Platform integration", paragraphs: ["Athena can be explored as a higher-level reasoning component that works with Rovara, Perion, Dexora and Simvora."] }],
  },
];

const EMBEDDED_DOMAIN: IntelligenceDomain = {
  id: "embedded",
  title: "Embodied Intelligence & Edge Systems",
  eyebrow: "TARVYX EMBEDDED INTELLIGENCE",
  tagline: "Engineering intelligent machines where computation meets the physical world.",
  introduction: [
    "TarvyX develops advanced embedded and edge-computing technologies that bring intelligence directly into physical systems.",
    "Our work combines real-time computing, sensor fusion, edge AI, embedded security, adaptive control and hardware-software co-design to create systems capable of understanding their environment and responding with low latency.",
    "We explore a future in which intelligent systems do not depend entirely on remote infrastructure. Instead, computation can exist directly at the point where data is generated—inside vehicles, robots, machines, medical devices and intelligent environments.",
    "Our embedded research spans edge intelligence, real-time AI, autonomous devices, adaptive hardware-software architectures and resilient physical computing systems.",
  ],
  lifecycleTitle: "THE EMBEDDED INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From physical sensing to low-latency intelligence, action and feedback.",
  lifecycle: [
    { title: "Sense", detail: "Gather physical signals" },
    { title: "Process", detail: "Condition and interpret data" },
    { title: "Understand", detail: "Build contextual state" },
    { title: "Decide", detail: "Evaluate actions within constraints" },
    { title: "Act", detail: "Respond at the point of need" },
    { title: "Verify", detail: "Monitor outcomes and feedback" },
  ],
  productHeading: "OUR EMBEDDED INTELLIGENCE PRODUCTS",
  productDescription: "Eight systems exploring secure, real-time and adaptive intelligence at the edge.",
  products: EMBEDDED_DOMAIN_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX EMBEDDED PROJECT",
  flagshipTitle: "PROJECT EMBODIA",
  flagshipSubtitle: "A Unified Architecture for Physical Intelligence.",
  flagshipBody: ["The proposed Embodia platform connects sensing, embedded computation, machine intelligence, control and physical feedback into a reusable architecture.", "The architecture is intended to support research across multiple device categories without requiring every product to develop a separate intelligence foundation."],
  architectureTitle: "Embodia Architecture",
  architecture: [
    { title: "Physical Environment", description: "The system's operating context and constraints." },
    { title: "Sensors", description: "Acquire signals from the environment." },
    { title: "Signal Processing", description: "Validate and interpret sensor information." },
    { title: "Embedded Intelligence", description: "Perform local computation and reasoning." },
    { title: "Context", description: "Represent the state and relevant conditions." },
    { title: "Decision Support", description: "Determine candidate responses within constraints." },
    { title: "Control Interface", description: "Connect validated decisions with system control." },
    { title: "Actuation", description: "Produce physical response." },
    { title: "Feedback and Validation", description: "Observe outcomes and evaluate behaviour." },
  ],
  architectureFlow: "Physical Environment → Sensors → Signal Processing → Embedded Intelligence → Context → Decision Support → Control Interface → Actuation → Feedback → Validation",
  additionalResearch: [
    { title: "Core Research Areas", body: [], items: ["Edge Intelligence", "Real-Time Computing", "Embedded AI", "Sensor Fusion", "TinyML", "Embedded Security", "Hardware-Software Co-Design", "Low-Power Computing", "Adaptive Control"] },
    { title: "Product Ecosystem", body: [], items: ["Embera — edge intelligence", "Fortexa — embedded security", "Senzora — sensor intelligence", "Embodia — physical intelligence platform", "Vitalink — medical-device intelligence", "Veloxis — real-time embedded AI", "Neuroedge — adaptive edge intelligence research", "Selfware — adaptive embedded runtime research"] },
    { title: "Recommended Development Direction", body: ["Early prototypes: Embera Edge Core, Senzora Sensor Intelligence Engine and Fortexa Embedded Trust Engine.", "Platform integration: Connect sensor processing, edge inference and controlled actuation through a shared embedded architecture.", "Frontier research: Explore Neuroedge and Selfware after establishing reliable monitoring, evaluation and update mechanisms."] },
  ],
  portfolio: EMBEDDED_DOMAIN_PRODUCTS.map((product) => ({ product: product.name[0] + product.name.slice(1).toLowerCase(), direction: product.title })),
  vision: ["TarvyX develops advanced embedded and edge technologies combining real-time computation, sensor intelligence, adaptive systems and secure hardware-software architectures."],
  visionTagline: "Embodied Intelligence — Engineering intelligent systems where computation meets the physical world.",
  action: "Explore Embodied Intelligence",
};

const IOT_DOMAIN: IntelligenceDomain = {
  id: "iot",
  title: "Ambient Intelligence & Connected Systems",
  eyebrow: "TARVYX IoT",
  tagline: "Building intelligent environments that sense, understand, predict and respond.",
  introduction: [
    "TarvyX develops next-generation connected systems that transform distributed physical environments into intelligent, responsive ecosystems.",
    "Our work goes beyond connecting devices. We explore how networks of sensors, machines, edge intelligence, AI models and digital environments can work together to build a continuously aware representation of the physical world.",
    "TarvyX's IoT research focuses on distributed intelligence, ambient sensing, edge autonomy, machine-to-machine collaboration, event-driven computing, digital environments and intelligent physical infrastructure.",
    "The objective is to move from connected things to systems that understand what is happening, why it is happening and what should happen next.",
  ],
  lifecycleTitle: "THE CONNECTED INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From distributed sensing to coordinated, responsive environments.",
  lifecycle: [
    { title: "Sense", detail: "Connect devices and sensors" },
    { title: "Connect", detail: "Represent states and relationships" },
    { title: "Understand", detail: "Interpret events in context" },
    { title: "Predict", detail: "Identify emerging conditions" },
    { title: "Coordinate", detail: "Select policy-aware actions" },
    { title: "Respond", detail: "Verify system feedback" },
  ],
  productHeading: "OUR AMBIENT INTELLIGENCE PRODUCTS",
  productDescription: "Eight platforms connecting sensing, edge systems and intelligent physical environments.",
  products: IOT_DOMAIN_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX IoT PROJECT",
  flagshipTitle: "PROJECT SYNARA INTELLIGENCE FABRIC",
  flagshipSubtitle: "Coordinating connected devices and distributed intelligence across physical environments.",
  flagshipBody: ["Synara is the proposed central platform for coordinating connected devices and distributed intelligence across physical environments."],
  architectureTitle: "Synara Architecture",
  architecture: [
    { title: "Physical World", description: "Connected environments, infrastructure and activity." },
    { title: "Sensing", description: "Observe conditions through distributed sensors." },
    { title: "Device Layer", description: "Represent connected devices and their state." },
    { title: "Edge Intelligence", description: "Process information close to where it is generated." },
    { title: "Event Understanding", description: "Interpret observations in operational context." },
    { title: "Environment Model", description: "Build a continuously updated representation." },
    { title: "Distributed Reasoning", description: "Coordinate understanding across the network." },
    { title: "Coordinated Action", description: "Respond within authorization and safety boundaries." },
    { title: "Feedback", description: "Verify effects and adapt to new observations." },
  ],
  architectureFlow: "Physical World → Sensing → Device Layer → Edge Intelligence → Event Understanding → Environment Model → Distributed Reasoning → Coordinated Action → Feedback",
  additionalResearch: [
    { title: "Core Research Areas", body: [], items: ["Ambient Intelligence", "Connected Systems", "Sensor Networks", "Edge IoT", "Distributed Intelligence", "Machine-to-Machine Collaboration", "Digital Environments", "Predictive Monitoring", "Intelligent Infrastructure"] },
    { title: "Cross-Domain Architecture", body: [], items: ["Embedded Intelligence provides local computation.", "Advanced Machine Intelligence contributes perception and reasoning.", "Cloud Intelligence provides distributed computational resources.", "Cyber Intelligence supports security and trust.", "Robotics enables physical action.", "Automotive Intelligence applies connected intelligence to mobility."] },
    { title: "Product Portfolio", body: [], items: ["Synara — connected-world intelligence", "Ambiora — ambient intelligence", "Meshra — distributed IoT intelligence", "Iotra — device and interoperability intelligence", "Predictra — predictive infrastructure intelligence", "Enviora — environmental intelligence", "Autonetra — connected-network coordination", "Digisphera — digital-environment modelling"] },
  ],
  portfolio: IOT_DOMAIN_PRODUCTS.map((product) => ({ product: product.name[0] + product.name.slice(1).toLowerCase(), direction: product.title })),
  vision: ["TarvyX develops next-generation connected systems combining distributed sensing, edge intelligence, device coordination and contextual understanding to transform physical environments into responsive computational ecosystems."],
  visionTagline: "Ambient Intelligence & Connected Systems — Building intelligent environments that sense, understand, predict and respond.",
  action: "Explore Ambient Intelligence",
};

const ROBOTICS_DOMAIN: IntelligenceDomain = {
  id: "robotics",
  title: "Embodied Intelligence & Autonomous Robotics",
  eyebrow: "TARVYX ROBOTICS",
  tagline: "Building machines that can perceive, reason, learn and act in the physical world.",
  introduction: [
    "TarvyX develops advanced robotics technologies centered on embodied intelligence—the integration of perception, cognition, planning, control and physical action within intelligent machines.",
    "Our research explores robots that can build representations of their environment, understand objects and tasks, reason about uncertainty, plan actions and adapt to changing conditions.",
    "Beyond individual robots, TarvyX investigates robotic learning, general-purpose manipulation, multi-robot intelligence, simulation-to-reality transfer and collaborative physical intelligence.",
    "Our long-term vision is to create reusable intelligence architectures that can operate across different robotic platforms and environments rather than designing isolated automation for a single task.",
  ],
  lifecycleTitle: "THE EMBODIED ROBOTICS LIFECYCLE",
  lifecycleDescription: "From environment perception to evaluated physical action.",
  lifecycle: [
    { title: "Perceive", detail: "Observe scenes and objects" },
    { title: "Represent", detail: "Build world and spatial models" },
    { title: "Reason", detail: "Understand objectives and uncertainty" },
    { title: "Plan", detail: "Generate constrained action plans" },
    { title: "Act", detail: "Control and execute physical actions" },
    { title: "Evaluate", detail: "Learn from feedback safely" },
  ],
  productHeading: "OUR ROBOTICS INTELLIGENCE PRODUCTS",
  productDescription: "Nine platforms exploring embodied reasoning, manipulation, simulation and collaboration.",
  products: ROBOTICS_DOMAIN_PRODUCTS,
  flagshipLabel: "THE BIG TARVYX ROBOTICS PROJECT",
  flagshipTitle: "PROJECT ROVARA",
  flagshipSubtitle: "A Unified Intelligence Architecture for Embodied Machines.",
  flagshipBody: ["Rovara is the proposed core robotics platform connecting perception, spatial understanding, memory, reasoning, planning and physical action."],
  architectureTitle: "Rovara Architecture",
  architecture: [
    { title: "Task", description: "Establish the objective and constraints." },
    { title: "Scene Perception", description: "Observe and interpret the environment." },
    { title: "World Representation", description: "Model objects, relationships and conditions." },
    { title: "Spatial Memory", description: "Retain relevant environment context." },
    { title: "Task Reasoning", description: "Interpret the objective and possible outcomes." },
    { title: "Action Planning", description: "Generate and evaluate candidate plans." },
    { title: "Motion and Control", description: "Translate plans into controlled movement." },
    { title: "Physical Action", description: "Perform approved actions in the environment." },
    { title: "Feedback and Evaluation", description: "Observe results and validate behaviour." },
  ],
  architectureFlow: "Task → Scene Perception → World Representation → Spatial Memory → Task Reasoning → Action Planning → Motion and Control → Physical Action → Feedback → Evaluation",
  additionalResearch: [
    { title: "Core Research Areas", body: [], items: ["Embodied Intelligence", "Robotic Perception", "Spatial Intelligence", "General-Purpose Manipulation", "Autonomous Systems", "Robot Learning", "Simulation", "Human-Robot Collaboration", "Multi-Robot Coordination"] },
    { title: "Connected Product Ecosystem", body: [], items: ["Rovara — embodied robotic intelligence", "Dexora — general-purpose manipulation research", "Adaptra — learning from experience", "Simvora — robotics simulation", "Perion — spatial intelligence", "Robynex — robotics software infrastructure", "Collabria — human-robot collaboration", "Selfia — adaptive robotics research", "Athena — reasoning and planning"] },
    { title: "Recommended Development Roadmap", body: ["Phase 1 — Simvora: Build a virtual robotic environment with robot models, sensors, objects, tasks, physics and scenario generation.", "Phase 2 — Perion: Add 3D environment understanding, localization and spatial memory.", "Phase 3 — Rovara: Integrate reasoning, planning and task decomposition.", "Phase 4 — Dexora: Explore generalized manipulation in simulation and controlled test environments.", "Phase 5 — Adaptra: Investigate controlled learning from experience.", "Phase 6 — Physical Prototypes: Move from simulation toward carefully controlled hardware experiments with appropriate safety systems."] },
    { title: "Cross-Domain Integration", body: ["IoT and Ambient Intelligence → sense environments.", "Embedded Intelligence → compute at the edge.", "Advanced Machine Intelligence → perceive and reason.", "Cloud Intelligence → provide distributed computation.", "Robotics → act in the physical world.", "Cyber Intelligence → protect connected systems.", "Automotive Intelligence → apply embodied intelligence to mobility."], flow: "INTELLIGENCE THAT MOVES FROM COMPUTATION INTO REALITY." },
  ],
  portfolio: ROBOTICS_DOMAIN_PRODUCTS.map((product) => ({ product: product.name[0] + product.name.slice(1).toLowerCase(), direction: product.title })),
  vision: ["TarvyX develops next-generation robotics technologies spanning embodied intelligence, spatial perception, adaptive learning, simulation, manipulation and collaborative autonomous systems."],
  visionTagline: "Embodied Intelligence — Building machines that perceive, reason, learn and act in the physical world.",
  action: "Explore Embodied Intelligence",
};

const SUPPLY_CHAIN_PRODUCTS: IntelligenceProduct[] = [
  { id: "syntraq", number: "01", name: "TARVYX SYNTRAQ", title: "The Intelligence Layer for Global Supply Networks.", visual: "nexora", body: ["Syntraq is Tarvyx's supply-network intelligence platform for representing suppliers, facilities, inventory, logistics routes, products and demand as one connected system.", "It explores how live network visibility can help organizations understand dependencies, monitor changing conditions and identify where disruption could propagate."], project: "SYNTRAQ SUPPLY NETWORK BRAIN", projectDetail: "Suppliers + Facilities + Inventory + Logistics + Demand → Supply Graph → Current State → Intelligence", capabilities: ["Supply-network mapping", "Supplier and facility visibility", "Inventory and logistics monitoring", "Dependency analysis", "Network-state modelling", "Disruption visibility"] },
  { id: "orbitra", number: "02", name: "TARVYX ORBITRA", title: "Logistics That Thinks Ahead.", visual: "codelys", body: ["Orbitra is Tarvyx's logistics intelligence platform for evaluating routing, scheduling, transport capacity and delivery constraints across changing network conditions.", "It explores how logistics decisions can account for time, cost, capacity, service requirements and risk rather than optimizing routes in isolation."], project: "ORBITRA LOGISTICS OPTIMIZATION", projectDetail: "Orders + Routes + Capacity + Constraints → Logistics Model → Route and Schedule Alternatives → Evaluation → Coordinated Plan", capabilities: ["Dynamic routing", "Transport scheduling", "Capacity optimization", "Delivery planning", "Logistics constraint analysis", "Cost and time evaluation"] },
  { id: "casiq", number: "03", name: "TARVYX CASIQ", title: "Understanding Why Disruption Happens.", visual: "evolis", body: ["Casiq is Tarvyx's causal intelligence platform for investigating how supply-network events and dependencies contribute to disruption.", "It explores causal models that help distinguish root causes from downstream symptoms and evaluate possible interventions before action."], project: "CASIQ CAUSAL INTELLIGENCE", projectDetail: "Event → Dependency Analysis → Causal Hypothesis → Propagation Model → Intervention → Outcome Evaluation", capabilities: ["Root-cause analysis", "Causal dependency modelling", "Disruption propagation", "Intervention evaluation", "Supply-event analysis", "Decision support"] },
  { id: "scenara", number: "04", name: "TARVYX SCENARA", title: "A Computational Future for Supply Chains.", visual: "syndex", body: ["Scenara is Tarvyx's scenario-planning and simulation platform for exploring how supply networks may respond to changing demand, capacity, disruption and operating conditions.", "Teams can compare possible futures and evaluate their implications before changing real-world operations."], project: "SCENARA SUPPLY SIMULATION", projectDetail: "Current Network → Scenario Definition → Demand and Disruption Inputs → Simulation → Strategy Comparison → Cost / Time / Risk Evaluation", capabilities: ["Scenario generation", "Supply-network simulation", "Disruption modelling", "Strategy comparison", "Cost and risk analysis", "Resilience planning"] },
  { id: "logixa", number: "05", name: "TARVYX LOGIXA", title: "Intelligence for Logistics Operations.", visual: "veridis", body: ["Logixa coordinates logistics and warehouse operations by connecting orders, inventory, facilities, people, equipment and transportation activities.", "Its research explores how operational plans can adapt to changing workload, capacity and task dependencies while retaining human oversight."], project: "LOGIXA LOGISTICS ORCHESTRATION", projectDetail: "Orders → Inventory → Warehouse Capacity → Task Dependencies → Logistics Plan → Execution → Outcome Monitoring", capabilities: ["Logistics orchestration", "Warehouse coordination", "Inventory movement planning", "Capacity awareness", "Task sequencing", "Operational monitoring"] },
  { id: "demara", number: "06", name: "TARVYX DEMARA", title: "Seeing Demand Before It Arrives.", visual: "oryon", body: ["Demara is Tarvyx's demand-intelligence platform for modelling demand signals across markets, channels, products and time horizons.", "It explores how forecasts can be connected to inventory, production and logistics decisions so organizations can evaluate demand changes as part of the wider network."], project: "DEMARA DEMAND INTELLIGENCE", projectDetail: "Market Signals + Orders + History + Context → Demand Model → Forecast → Inventory and Capacity Implications", capabilities: ["Demand forecasting", "Market-signal analysis", "Demand variability modelling", "Inventory planning support", "Channel-level insight", "Forecast evaluation"] },
  { id: "tracea", number: "07", name: "TARVYX TRACEA", title: "The Journey Behind Every Product.", visual: "lumenix", body: ["Tracea is Tarvyx's product-traceability platform for representing product provenance, movement, transformation and custody across a supply network.", "It explores how traceability data can support operational visibility, verification and informed response to quality or sourcing events."], project: "TRACEA PRODUCT JOURNEY", projectDetail: "Origin → Transformation → Custody → Movement → Destination → Verified Product History", capabilities: ["Product provenance", "End-to-end traceability", "Custody and movement records", "Transformation history", "Supply-event investigation", "Verification support"] },
  { id: "resilia", number: "08", name: "TARVYX RESILIA", title: "Building Supply Networks That Recover.", visual: "fabric", body: ["Resilia is Tarvyx's supply-chain resilience platform for identifying vulnerabilities, evaluating dependencies and exploring recovery strategies.", "It models alternative suppliers, routes, capacity and inventory options to help teams compare ways of responding to disruption."], project: "RESILIA NETWORK RESILIENCE", projectDetail: "Network Dependencies → Vulnerability Analysis → Disruption Scenario → Recovery Options → Resilience Evaluation", capabilities: ["Vulnerability analysis", "Disruption readiness", "Recovery planning", "Alternative-network evaluation", "Dependency mapping", "Resilience measurement"] },
  { id: "enerqo", number: "09", name: "TARVYX ENERQO", title: "Energy Intelligence for Supply Networks.", visual: "nexora", body: ["Enerqo explores energy use, emissions and resource efficiency across supply-chain operations.", "It connects energy considerations to facilities, production, transportation and network planning to support more informed operational choices."], project: "ENERQO SUPPLY ENERGY MODEL", projectDetail: "Facilities + Production + Transportation → Energy and Emissions Model → Operational Alternatives → Efficiency Evaluation", capabilities: ["Supply-chain energy modelling", "Emissions visibility", "Facility and transport analysis", "Efficiency evaluation", "Resource-aware planning"] },
  { id: "synova", number: "10", name: "TARVYX SYNOVA", title: "Networks That Reconfigure When Conditions Change.", visual: "codelys", body: ["Synova is Tarvyx's adaptive-network research platform for computationally evaluating how supply networks could reorganize when conditions change.", "It considers suppliers, production allocation, transportation and inventory strategies, then evaluates alternatives against operational constraints."], project: "SYNOVA ADAPTIVE NETWORK ENGINE", projectDetail: "Current Network → Changing Conditions → Constraint Analysis → Generate Alternatives → Evaluate → Reconfigure Network → Monitor Outcome", capabilities: ["Network adaptation", "Alternative supply configurations", "Constraint analysis", "Scenario evaluation", "Disruption response", "Outcome monitoring"] },
  { id: "phoren", number: "11", name: "TARVYX PHOREN", title: "Intelligence for Physical Flow.", visual: "evolis", body: ["Phoren is a foundational research concept for modelling the movement of materials, products, energy, information and capacity through complex networks.", "Each flow state can be evaluated using time, cost, capacity, probability and risk, providing a potential mathematical foundation for the wider supply-chain portfolio."], project: "PHOREN FLOW ENGINE", projectDetail: "Material → Transformation → Movement → Storage → Transformation → Movement. Evaluate each state by time, cost, capacity, probability and risk.", capabilities: ["Physical-flow modelling", "Transformation and movement analysis", "Capacity modelling", "Time and cost evaluation", "Risk and probability analysis"] },
];

const HOTELS_PRODUCTS: IntelligenceProduct[] = [
  { id: "auriva", number: "01", name: "TARVYX AURIVA", title: "The Intelligence Layer for Hotels & Resorts.", visual: "nexora", body: ["Auriva creates a unified computational representation of a hotel's guests, spaces, services, assets and operational conditions.", "It connects information from rooms, facilities, service operations, environmental systems and guest interactions, helping properties understand the destination as a whole rather than as isolated departments."], project: "AURIVA PROPERTY BRAIN", projectDetail: "Guests + Rooms + Restaurants + Spa + Housekeeping + Maintenance + Energy + Mobility → Property State → Intelligence → Prediction → Coordination", capabilities: ["Unified property intelligence", "Cross-department operational visibility", "Guest and room context integration", "Service and maintenance coordination", "Resource and capacity awareness", "Multi-property intelligence potential"], notes: [{ title: "Operational coordination example", paragraphs: ["A housekeeping request can be considered alongside room occupancy, checkout schedules, housekeeping capacity, guest arrival patterns and maintenance status to help determine an appropriate operational sequence."] }] },
  { id: "resora", number: "02", name: "TARVYX RESORA", title: "A Digital Intelligence Model of the Entire Resort.", visual: "codelys", body: ["Resora models physical spaces, guest movement, facilities, services, resources and environmental conditions within a dynamic digital resort model.", "Operators can explore dependencies and simulate changes or new experiences before implementing them in the physical property."], project: "RESORA RESORT WORLD MODEL", projectDetail: "Model rooms, villas, restaurants, pools, spas, activities, transport, staff, utilities and landscape.", capabilities: ["Resort digital modelling", "Guest-flow and capacity analysis", "Operational dependency modelling", "Change simulation", "Facility and resource planning"], notes: [{ title: "Example simulations", items: ["What happens if occupancy rises to 95%?", "What happens if one facility closes?", "What happens if an event brings 2,000 additional guests?", "How should staffing and mobility be redistributed?"] }] },
  { id: "guestra", number: "03", name: "TARVYX GUESTRA", title: "A Personal Intelligence Layer for Every Guest.", visual: "evolis", body: ["Guestra explores personalized hospitality through a context-aware intelligence layer that can coordinate guest preferences, activities, services and interactions throughout a stay.", "It is designed to build an appropriate understanding of preferences and context while respecting privacy, consent and property policies."], project: "GUESTRA EXPERIENCE ENGINE", projectDetail: "Guest Context → Preferences → Current Stay → Environment → Available Services → Experience Model → Personalized Recommendations or Actions", capabilities: ["Guest preference modelling", "Connected stay experiences", "Context-aware recommendations", "Service-journey coordination", "Privacy- and consent-aware personalization"], notes: [{ title: "Connected stay example", paragraphs: ["A guest's spa booking, dinner reservation and airport transfer could be coordinated as parts of one connected stay experience."] }] },
  { id: "orbela", number: "04", name: "TARVYX ORBELA", title: "A Self-Coordinating Resort Operations Network.", visual: "syndex", body: ["Orbela coordinates interconnected operational activities across housekeeping, maintenance, food service, transportation, facilities and guest services.", "It explores how operational decisions can adapt to demand, capacity, timing, dependencies and real-time conditions."], project: "ORBELA OPERATIONS GRAPH", projectDetail: "Guest Demand → Operational Requirements → Staff Capacity → Asset Availability → Service Dependencies → Optimal Coordination", capabilities: ["Cross-department coordination", "Staff and asset capacity modelling", "Service dependency analysis", "Demand-aware operations", "Adaptive operational planning"], notes: [{ title: "Operational coordination example", paragraphs: ["If an event increases restaurant demand, Orbela could evaluate staffing, kitchen capacity, supplies, seating, transport and housekeeping requirements together instead of optimizing each department independently."] }] },
  { id: "servona", number: "05", name: "TARVYX SERVONA", title: "Physical Intelligence for Resort Services.", visual: "veridis", body: ["Servona explores robotics and embodied intelligence for safely supporting repetitive, logistics-oriented and environment-aware hospitality tasks.", "The platform is intended to coordinate robotic systems with human staff rather than simply replacing existing hospitality roles."], project: "SERVONA ROBOTIC SERVICE GRID", projectDetail: "Hotel Task → Task Planner → Robot Assignment → Navigation → Execution → Human / Guest Interaction → Verification", capabilities: ["Delivery and room-service logistics", "Linen and inventory movement", "Cleaning assistance", "Grounds monitoring", "Robot-to-staff coordination", "Controlled indoor deployment"], notes: [{ title: "Development approach", paragraphs: ["Development should begin in controlled indoor environments with defined safety boundaries and human oversight."] }] },
  { id: "ecora", number: "06", name: "TARVYX ECORA", title: "A Resort That Understands Its Resource Ecosystem.", visual: "oryon", body: ["Ecora models energy, comfort and sustainability across hotel and resort operations.", "It explores how occupancy, environmental conditions, facilities and resource demand can inform property-level energy decisions."], project: "ECORA RESORT ENERGY BRAIN", projectDetail: "Occupancy + Weather + Facilities + Energy Systems → Resource State → Comfort and Demand Analysis → Coordinated Optimization", capabilities: ["Energy and resource modelling", "Comfort-aware operations", "Facility demand analysis", "Sustainability intelligence", "Property-wide optimization"] },
  { id: "anticia", number: "07", name: "TARVYX ANTICIA", title: "Anticipating the Next Guest Need.", visual: "lumenix", body: ["Anticia forecasts guest needs, demand patterns and service intensity before they materialize.", "It explores how context and operational signals can support anticipatory service planning while keeping recommendations appropriate to guest preferences and property policies."], project: "ANTICIA EXPERIENCE PREDICTION ENGINE", projectDetail: "Guest Context + Stay Patterns + Demand + Service Conditions → Experience Forecast → Service Readiness", capabilities: ["Guest-need forecasting", "Demand prediction", "Service-intensity modelling", "Anticipatory operations", "Context-aware planning"] },
  { id: "vivora", number: "08", name: "TARVYX VIVORA", title: "The Intelligence Graph Behind Every Experience.", visual: "fabric", body: ["Vivora links service interactions, loyalty behaviour and guest context across the destination ecosystem.", "It explores how connected experience data can help properties understand guest journeys across multiple services and touchpoints."], project: "VIVORA EXPERIENCE GRAPH", projectDetail: "Guest Context → Service Interactions → Experience Journey → Loyalty Behaviour → Connected Experience Model", capabilities: ["Guest-journey intelligence", "Service-interaction mapping", "Experience relationship modelling", "Destination-wide context", "Loyalty behaviour analysis"] },
  { id: "destinara", number: "09", name: "TARVYX DESTINARA", title: "Intelligence for the Entire Destination.", visual: "nexora", body: ["Destinara combines hospitality, mobility, experiences and service operations into one strategic intelligence surface.", "It explores destination-level models that connect properties and visitor experiences with the wider operating environment."], project: "DESTINARA DESTINATION MODEL", projectDetail: "Hospitality + Mobility + Experiences + Services + Environment → Destination State → Planning and Intelligence", capabilities: ["Destination modelling", "Visitor-flow analysis", "Hospitality and mobility integration", "Experience planning", "Cross-property intelligence"] },
  { id: "memora", number: "10", name: "TARVYX MEMORA", title: "The Institutional Memory of a Hotel or Resort.", visual: "codelys", body: ["Memora preserves operational knowledge, property procedures, service patterns and organizational expertise.", "It transforms fragmented institutional knowledge into an accessible intelligence layer for authorized employees."], project: "MEMORA HOTEL KNOWLEDGE GRAPH", projectDetail: "Standard Operating Procedures + Property Knowledge + Maintenance History + Service Patterns + Operational Decisions + Asset Information → Hotel Knowledge Graph → Intelligent Retrieval", capabilities: ["Property knowledge graph", "Procedure retrieval", "Operational memory", "Maintenance-history access", "Authorized employee knowledge support"] },
  { id: "resiliqa", number: "11", name: "TARVYX RESILIQA", title: "Resilience Intelligence for Hospitality Infrastructure.", visual: "evolis", body: ["Resiliqa models infrastructure dependencies, operational vulnerabilities and recovery strategies across hotel and resort environments.", "It explores how properties can evaluate their ability to maintain essential services during disruptions and improve resilience through computational planning."], project: "RESILIQA RESORT RESILIENCE MODEL", projectDetail: "Simulate power disruption, water disruption, network outage, extreme occupancy and critical equipment failure; evaluate essential systems, dependencies and recovery sequences.", capabilities: ["Infrastructure dependency modelling", "Disruption simulation", "Operational vulnerability analysis", "Essential-service prioritization", "Recovery-sequence evaluation"] },
];

const TELECOMMUNICATION_PRODUCTS: IntelligenceProduct[] = [
  { id: "orbiva", number: "01", name: "TARVYX ORBIVA", title: "Your Network Beyond the Tower.", visual: "nexora", body: ["Orbiva is Tarvyx's satellite-enabled mobile connectivity platform designed to extend cellular communication beyond conventional terrestrial coverage.", "It is envisioned as an intelligent connectivity layer that selects an available terrestrial or non-terrestrial network based on location, network conditions, device capabilities and service requirements."], project: "ORBIVA CONNECTIVITY EXPERIENCE", projectDetail: "Terrestrial Network + Satellite / NTN Network → Network Fusion → Connected Device. The intelligence layer would manage transitions where technically and commercially supported.", capabilities: ["Satellite-enabled mobile connectivity", "Terrestrial and non-terrestrial network selection", "Connectivity availability assessment", "Device and service compatibility", "Remote-environment connectivity", "Network-partner integration"] },
  { id: "obrix", number: "02", name: "TARVYX OBRIX", title: "Connectivity for Places Without Towers.", visual: "codelys", body: ["Obrix orchestrates connectivity across terrestrial, satellite and edge network environments.", "It explores intelligent network selection, session continuity, routing, resource allocation and connectivity management across heterogeneous communication infrastructures."], project: "OBRIX GLOBAL CONNECTIVITY FABRIC", projectDetail: "Device → Connectivity Scan → Network Options → Network Intelligence → Best Available Path → Internet. Options may include 4G/5G, satellite and Wi-Fi, depending on device compatibility and availability.", capabilities: ["Network selection and routing", "Session continuity", "Connectivity resource allocation", "Heterogeneous network management", "Coverage-aware connectivity", "Network-condition monitoring"] },
  { id: "lunara", number: "03", name: "TARVYX LUNARA", title: "Direct-to-Device Connectivity Intelligence.", visual: "evolis", body: ["Lunara explores communication between compatible mobile and connected devices and satellite-based network infrastructure.", "It focuses on technologies and software required for device authentication, satellite access, network selection, mobility and service continuity across non-terrestrial environments."], project: "LUNARA D2D CORE", projectDetail: "Research areas: non-terrestrial network device registration, satellite network discovery, cell and beam selection, mobility management, authentication, session continuity, timing and synchronization, and link adaptation.", capabilities: ["NTN device registration", "Satellite network discovery", "Cell and beam selection", "Mobility management", "Authentication and session continuity", "Timing, synchronization and link adaptation"] },
  { id: "astraq", number: "04", name: "TARVYX ASTRAQ", title: "Intelligence for the Orbital Network.", visual: "syndex", body: ["Astraq models satellite availability, coverage areas, connectivity demand and orbital network conditions.", "It explores coordination between spacecraft, ground infrastructure and terrestrial networks to improve coverage continuity and resource utilization."], project: "ASTRAQ ORBITAL NETWORK ENGINE", projectDetail: "Satellite Constellation → Orbital Network Model → Coverage State → Connectivity Demand → Resource Planning", capabilities: ["Satellite availability modelling", "Coverage-state analysis", "Connectivity-demand modelling", "Orbital resource planning", "Ground and terrestrial network coordination"] },
  { id: "mariva", number: "05", name: "TARVYX MARIVA", title: "Connectivity Across the Open Ocean.", visual: "veridis", body: ["Mariva is a maritime connectivity platform for resilient communication by vessels and connected systems beyond reliable terrestrial coverage.", "It explores hybrid terrestrial-satellite connectivity, intelligent bandwidth management, maritime edge services and continuous connectivity for ocean environments."], project: "MARIVA OCEAN CONNECT", projectDetail: "Designed for cargo ships, cruise ships, fishing vessels, offshore platforms, research vessels and maritime emergency systems. Mariva adapts to vessel location, service requirements and available network resources.", capabilities: ["Maritime connectivity", "Hybrid terrestrial-satellite networking", "Bandwidth management", "Maritime edge services", "Connectivity adaptation by location and service"] },
  { id: "altara", number: "06", name: "TARVYX ALTARA", title: "Connectivity Where Infrastructure Ends.", visual: "oryon", body: ["Altara explores resilient connectivity for remote terrestrial environments where conventional mobile infrastructure is limited or unavailable.", "It focuses on satellite-enabled communication for mountainous regions, deserts, forests, remote communities, disaster areas and critical infrastructure."], project: "ALTARA REMOTE CONNECT", projectDetail: "Potential applications include mountain rescue, disaster response, remote scientific expeditions, rural connectivity, mining operations, oil and gas facilities, and remote or border infrastructure.", capabilities: ["Remote-area connectivity", "Satellite-enabled communications", "Disaster and rescue support", "Rural and critical-infrastructure use cases", "Coverage-limited environment modelling"] },
  { id: "resqon", number: "07", name: "TARVYX RESQON", title: "Connectivity When Conventional Networks Fail.", visual: "lumenix", body: ["Resqon explores resilient communications during infrastructure disruption, natural disasters and large-scale network outages.", "The platform focuses on satellite-enabled emergency communications, priority networking and continuity for critical users and organizations."], project: "RESQON EMERGENCY FABRIC", projectDetail: "Earthquake / Flood / Cyclone → Terrestrial Network Failure → Satellite Connectivity → Emergency Priority Layer → Rescue / Medical / Government → Coordinated Communication", capabilities: ["Emergency communications", "Priority connectivity", "Network-outage resilience", "Critical-user service continuity", "Response coordination"] },
  { id: "aerion", number: "08", name: "TARVYX AERION", title: "Intelligent Connectivity for the Moving World.", visual: "fabric", body: ["Aerion explores connectivity management for mobile assets operating across changing network environments, including aircraft, ships, vehicles, remote machinery and IoT devices.", "Its proposed role is to manage transitions subject to device capabilities, coverage, agreements and applicable network requirements."], project: "AERION MOBILITY NETWORK", projectDetail: "5G → Satellite → Wi-Fi → Private Network → Satellite → 5G", capabilities: ["Mobile-asset connectivity", "Network transition management", "Connectivity continuity", "Multinetwork path awareness", "Device and coverage-aware operation"] },
  { id: "elysyn", number: "09", name: "TARVYX ELYSYN", title: "One Identity Across Every Network.", visual: "nexora", body: ["Elysyn explores a single subscriber identity that can securely operate across terrestrial cellular and non-terrestrial network environments.", "It focuses on SIM/eSIM identity, authentication, subscription management and intelligent network authorization across heterogeneous connectivity environments."], project: "ELYSYN UNIVERSAL ESIM", projectDetail: "One Tarvyx Identity → Identity and Authentication → Terrestrial Cellular + Satellite + Wi-Fi → Authorized Connectivity. It is intended as the identity and authorization layer for the wider connectivity ecosystem.", capabilities: ["SIM/eSIM identity", "Authentication", "Subscription management", "Network authorization", "Cross-network identity concepts"] },
  { id: "continua", number: "10", name: "TARVYX CONTINUA", title: "Connectivity That Follows You.", visual: "codelys", body: ["Continua explores maintaining communication sessions while users and machines move between terrestrial and non-terrestrial networks.", "It focuses on network handover, path selection, latency-aware routing and service continuity across changing connectivity environments."], project: "CONTINUA SEAMLESS HANDOFF ENGINE", projectDetail: "User → 5G Cell → Coverage Lost → Satellite NTN → Satellite Beam → Terrestrial Network → 5G Again. The network may change without unnecessarily interrupting the user's session.", capabilities: ["Network handover", "Path selection", "Latency-aware routing", "Session continuity", "Terrestrial and NTN transitions"] },
  { id: "universa", number: "11", name: "TARVYX UNIVERSA", title: "A Global Connectivity Abstraction Layer.", visual: "evolis", body: ["Universa is Tarvyx's long-term connectivity abstraction layer for integrating terrestrial cellular, satellite, Wi-Fi, private and future communication networks behind one architecture.", "It explores how an intelligent service layer can evaluate connectivity paths according to location, performance, resilience, policy and application requirements."], project: "UNIVERSA CONNECTIVITY OS", projectDetail: "Application → Tarvyx Universa → Connectivity Intelligence → 5G + Satellite + Wi-Fi + Private Networks + Future Networks → Selected Connectivity Path", capabilities: ["Connectivity abstraction", "Multinetwork integration", "Policy- and application-aware path evaluation", "Performance and resilience evaluation", "Unified connectivity architecture"] },
];

const SUPPLY_CHAIN_DOMAIN: IntelligenceDomain = {
  id: "supply-chain",
  title: "Autonomous Supply Intelligence",
  eyebrow: "TARVYX SUPPLY CHAIN & LOGISTICS",
  tagline: "Building adaptive supply networks that predict disruption, simulate decisions and coordinate resilient operations.",
  introduction: [
    "Tarvyx explores next-generation supply-chain intelligence across supplier networks, inventory, logistics, demand, traceability and operational resilience.",
    "The platform vision connects network visibility, forecasting, simulation and operational decision support to help supply networks understand changing conditions and evaluate their options.",
  ],
  lifecycleTitle: "THE SUPPLY INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From network visibility to adaptive, resilient operations.",
  lifecycle: [
    { title: "Discover", detail: "Map supply networks and dependencies" },
    { title: "Understand", detail: "Model current state and demand" },
    { title: "Predict", detail: "Identify risks and changing conditions" },
    { title: "Simulate", detail: "Evaluate possible future scenarios" },
    { title: "Decide", detail: "Compare strategies and trade-offs" },
    { title: "Adapt", detail: "Coordinate validated operational change" },
  ],
  productHeading: "OUR SUPPLY CHAIN INTELLIGENCE PRODUCTS",
  productDescription: "A connected portfolio spanning supply-network intelligence, demand, simulation, logistics, traceability and resilience.",
  products: SUPPLY_CHAIN_PRODUCTS,
  flagshipLabel: "FLAGSHIP SUPPLY RESEARCH PLATFORM",
  flagshipTitle: "PROJECT ATLAS-S",
  flagshipSubtitle: "Adaptive Trans-Network Logistics & Supply Intelligence System",
  flagshipBody: ["Project Atlas-S is the proposed foundational platform for representing an organization's physical supply network and its possible future states.", "It connects supply-network visibility, forecasting, simulation, resilience analysis and operational decision support in one computational intelligence layer."],
  architectureTitle: "ATLAS-S ARCHITECTURE",
  architecture: [
    { title: "Real Supply Network", description: "Connect the physical network and its operational signals." },
    { title: "Network Intelligence", description: "Discover dependencies and model the current state." },
    { title: "Scenario Intelligence", description: "Analyze demand, capacity, risk and disruption propagation." },
    { title: "Simulation & Evaluation", description: "Compare future scenarios by cost, time and risk." },
    { title: "Decision & Feedback", description: "Support human-approved execution and learn from outcomes." },
  ],
  architectureFlow: "Real Supply Network → Network Discovery → Supply Graph → Current State Model → Demand + Capacity + Risk Analysis → Causal and Disruption Propagation → Future Scenario Generation → Simulation Engine → Strategy Comparison → Cost / Time / Risk Evaluation → Decision Intelligence → Human Approval → Operational Execution → New Reality and Feedback",
  additionalResearch: [
    { title: "TARVYX AUTOSUPPLY — Self-Reconfiguring Supply Networks", body: ["Autosupply is the long-term research direction exploring whether a supply network can computationally identify how it should reorganize itself when its environment changes."], items: ["Network adaptation", "Causal modelling", "Simulation and optimization", "Multi-agent systems", "Uncertainty modelling", "Alternative network configuration", "Validated decision execution"] },
    { title: "Potential Applications", body: ["Potential applications span complex supply networks, logistics and operations where organizations need to anticipate disruption and evaluate response options."], items: ["Supplier networks", "Inventory and demand planning", "Transportation and logistics", "Product traceability", "Operational resilience"] },
    { title: "Development Principle", body: ["Begin with supply-network mapping and scenario simulation, then expand into predictive disruption analysis and controlled operational orchestration. Present each capability according to its actual research, prototype or deployment status."] },
  ],
  portfolio: [
    { product: "Syntraq", direction: "Core supply-network model" }, { product: "Orbitra", direction: "Logistics optimization" },
    { product: "Casiq", direction: "Causal analysis" }, { product: "Scenara", direction: "Simulation" },
    { product: "Logixa", direction: "Logistics orchestration" }, { product: "Demara", direction: "Demand intelligence" },
    { product: "Tracea", direction: "Product traceability" }, { product: "Resilia", direction: "Network resilience" },
    { product: "Enerqo", direction: "Energy intelligence" }, { product: "Synova", direction: "Adaptive networks" },
    { product: "Phoren", direction: "Foundational physical-flow research" }, { product: "Project Atlas-S", direction: "Flagship platform" },
    { product: "Tarvyx Autosupply", direction: "Frontier research" },
  ],
  vision: ["Tarvyx explores adaptive supply networks that can model their dependencies, anticipate disruption, compare response strategies and coordinate resilient operations."],
  visionTagline: "Autonomous Supply Intelligence — Building adaptive supply networks that predict disruption, simulate decisions and coordinate resilient operations.",
  action: "Explore Supply Intelligence",
};

const HOTELS_DOMAIN: IntelligenceDomain = {
  id: "hospitality",
  title: "Intelligent Hospitality & Resort Systems",
  eyebrow: "TARVYX HOTELS & RESORTS",
  tagline: "Building hotels and resorts that understand environments, anticipate needs, and intelligently coordinate every experience.",
  introduction: [
    "Tarvyx develops next-generation technologies for hotels, resorts and destination properties by combining artificial intelligence, ambient intelligence, robotics, IoT, computational infrastructure and predictive systems.",
    "Our vision extends beyond conventional property-management software. We explore intelligent hospitality environments where guest preferences, physical spaces, service operations, energy systems, mobility, maintenance and experiences can operate as one coordinated ecosystem.",
    "The long-term objective is to transform a hotel or resort from a collection of rooms and operational departments into a continuously aware, adaptive and intelligent environment.",
  ],
  lifecycleTitle: "THE HOSPITALITY INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From understanding the property to coordinating every experience.",
  lifecycle: [
    { title: "Sense", detail: "Understand guests, spaces and conditions" },
    { title: "Connect", detail: "Link services, facilities and operations" },
    { title: "Model", detail: "Represent the live property state" },
    { title: "Anticipate", detail: "Forecast needs and operational demand" },
    { title: "Coordinate", detail: "Align staff, assets and services" },
    { title: "Adapt", detail: "Improve experiences with feedback" },
  ],
  productHeading: "OUR HOSPITALITY INTELLIGENCE PRODUCTS",
  productDescription: "A connected portfolio for property intelligence, guest experience, resort operations, service robotics and destination systems.",
  products: HOTELS_PRODUCTS,
  flagshipLabel: "FLAGSHIP HOSPITALITY RESEARCH PLATFORM",
  flagshipTitle: "PROJECT HAVEN",
  flagshipSubtitle: "Hospitality Adaptive Virtual Environment Network",
  flagshipBody: ["Project Haven is the proposed flagship research program for representing a hotel or resort as a living computational system.", "The goal is to connect the physical environment, guest experience, service operations, resource usage and intelligent decision support within one coordinated architecture."],
  architectureTitle: "HAVEN ARCHITECTURE",
  architecture: [
    { title: "Physical Resort", description: "Represent the property and its connected environment." },
    { title: "Property State", description: "Combine ambient sensing, spaces and guest experience." },
    { title: "Operational Graph", description: "Connect services, resources and operating dependencies." },
    { title: "Intelligence Engine", description: "Enable prediction, simulation and coordination." },
    { title: "Action & Feedback", description: "Support human or AI decisions and learn from outcomes." },
  ],
  architectureFlow: "Physical Resort → Ambient Sensing → Property State → Guest Experience → Operational Graph → Resource Model → Intelligence Engine → Prediction + Simulation + Coordination → Human / AI Decision → Physical Action → Feedback",
  additionalResearch: [
    { title: "Potential Applications", body: ["The platform vision can support hotel groups, destination properties and hospitality operators across guest experience, facilities and operations."], items: ["Luxury hotels and multi-property groups", "Large resorts and destination properties", "Hospitality operations and service coordination", "Guest-experience personalization", "Energy and resource management", "Indoor service robotics", "Predictive maintenance", "Destination and visitor-flow planning", "Operational knowledge management", "Infrastructure resilience"] },
    { title: "Development Principle", body: ["Start with property data integration, operational visibility and guest-journey modelling. Introduce predictive coordination and robotics only as the necessary integrations, testing and safety processes mature. The portfolio describes a technology vision, not a claim that every product is already commercially available."] },
  ],
  portfolio: [
    { product: "Auriva", direction: "Property intelligence" }, { product: "Resora", direction: "Resort digital modelling" },
    { product: "Guestra", direction: "Guest personalization" }, { product: "Orbela", direction: "Operational coordination" },
    { product: "Servona", direction: "Service robotics" }, { product: "Ecora", direction: "Environmental intelligence" },
    { product: "Anticia", direction: "Anticipatory experiences" }, { product: "Vivora", direction: "Guest-journey intelligence" },
    { product: "Destinara", direction: "Destination intelligence" }, { product: "Memora", direction: "Institutional knowledge" },
    { product: "Resiliqa", direction: "Resilience modelling" }, { product: "Project Haven", direction: "Flagship research platform" },
  ],
  vision: ["Tarvyx is exploring intelligent hospitality environments that connect guest experience, property operations, service systems and resource intelligence."],
  visionTagline: "Intelligent Hospitality — Creating adaptive environments that anticipate needs and coordinate every experience.",
  action: "Explore Hospitality Intelligence",
};

const TELECOMMUNICATION_DOMAIN: IntelligenceDomain = {
  id: "telecommunication",
  title: "Orbital Connectivity & Space Networks",
  eyebrow: "TARVYX TELECOMMUNICATION",
  tagline: "A communications network beyond the boundaries of terrestrial towers.",
  introduction: [
    "Tarvyx is developing a next-generation connectivity vision that extends mobile communication beyond terrestrial network coverage through satellite-enabled cellular and non-terrestrial networking technologies.",
    "Our objective is to create a resilient communications ecosystem in which compatible devices can intelligently transition between terrestrial cellular networks and satellite connectivity when conventional coverage is unavailable.",
    "Our long-term vision is to make geographic isolation less relevant to connectivity—extending communication capabilities across remote regions, oceans, aviation corridors, disaster zones and other environments where conventional cellular infrastructure cannot provide reliable coverage.",
  ],
  lifecycleTitle: "THE CONNECTIVITY INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From network discovery to resilient, continuous connectivity.",
  lifecycle: [
    { title: "Discover", detail: "Identify available networks and coverage" },
    { title: "Authenticate", detail: "Verify device and connectivity identity" },
    { title: "Evaluate", detail: "Assess service, policy and network conditions" },
    { title: "Select", detail: "Choose a suitable available connectivity path" },
    { title: "Transition", detail: "Manage network handover and continuity" },
    { title: "Adapt", detail: "Monitor and respond to changing conditions" },
  ],
  productHeading: "OUR CONNECTIVITY INTELLIGENCE PRODUCTS",
  productDescription: "A connected portfolio spanning satellite-enabled connectivity, network orchestration, direct-to-device research and seamless mobility.",
  products: TELECOMMUNICATION_PRODUCTS,
  flagshipLabel: "FLAGSHIP CONNECTIVITY DEVELOPMENT PROGRAM",
  flagshipTitle: "PROJECT ORBITAL",
  flagshipSubtitle: "Universal Satellite–Terrestrial Connectivity Architecture",
  flagshipBody: ["Project Orbital is the proposed development program for an architecture in which a subscriber or device can remain connected across terrestrial and orbital network environments wherever compatible coverage, spectrum, infrastructure and regulatory conditions exist.", "The intended experience is one Tarvyx connectivity identity while the underlying network can change."],
  architectureTitle: "ORBITAL CONNECTIVITY ARCHITECTURE",
  architecture: [
    { title: "Device & Identity", description: "Connect a compatible device and Tarvyx eSIM identity." },
    { title: "Connectivity Intelligence", description: "Evaluate available terrestrial and non-terrestrial networks." },
    { title: "Network Selection", description: "Select supported cellular, satellite or partner connectivity." },
    { title: "Mobility & Continuity", description: "Coordinate service as network conditions change." },
    { title: "Connected Services", description: "Route to internet, edge and essential services." },
  ],
  architectureFlow: "Tarvyx Device → Tarvyx eSIM → Elysyn Identity → Universa Connectivity → Terrestrial Network + Non-Terrestrial Network → 4G / 5G + Satellite Networks → Obrix Connectivity Fabric → Astraq Orbital Intelligence → Internet / Edge Services",
  additionalResearch: [
    { title: "PROJECT ETERNET — An Always-Available Connectivity Fabric", body: ["Eternet is Tarvyx's long-term research vision for a resilient communications fabric that dynamically combines terrestrial, orbital, edge and future network technologies to maximize the probability of connectivity for authorized devices.", "This is a research direction focused on improving connectivity resilience across heterogeneous network environments, not a claim that connectivity will literally be available everywhere under all conditions."], flow: "Terrestrial Networks + Orbital Networks + Edge Networks → Connectivity AI → Network Availability and Policy Evaluation → Optimal Available Network Path → Connected Device" },
    { title: "Potential Applications", body: ["Potential applications include consumer and enterprise services, remote regions and mobile assets, subject to device compatibility, coverage, provider agreements and applicable requirements."], items: ["Consumer mobile connectivity", "Remote communities and rural regions", "Maritime and offshore communications", "Aviation and mobile assets", "Emergency and disaster communications", "Industrial IoT and remote machinery", "Satellite-enabled connectivity services", "Enterprise connectivity orchestration", "Terrestrial and satellite network integration"] },
    { title: "Recommended Development Strategy", body: ["Phase 1 — Connectivity software foundation: prototype network availability modelling, connectivity selection, device identity concepts and status interfaces. Phase 2 — Partner-based connectivity: explore integration with mobile and satellite operators. Phase 3 — Controlled non-terrestrial network testing through authorized partner environments. Phase 4 — Expand into maritime, remote-area, enterprise and emergency applications as feasibility and partnerships mature. Phase 5 — Progressively integrate terrestrial, orbital and edge networks through Universa and Eternet."] },
    { title: "Technical and Business Boundary", body: ["Tarvyx can begin with software prototypes, network modelling and partnership-based integration. A commercial satellite-to-phone service requires suitable network partners, compatible devices, spectrum and regulatory approvals. Actual speed, availability and coverage depend on the technology and service deployed. Describe concepts as research, prototypes or planned services until implemented and validated."] },
  ],
  portfolio: [
    { product: "Orbiva", direction: "Customer connectivity platform" }, { product: "Obrix", direction: "Network orchestration" },
    { product: "Lunara", direction: "Direct-to-device technology" }, { product: "Astraq", direction: "Orbital network intelligence" },
    { product: "Mariva", direction: "Maritime connectivity" }, { product: "Altara", direction: "Remote-area connectivity" },
    { product: "Resqon", direction: "Emergency connectivity" }, { product: "Aerion", direction: "Mobile-asset connectivity" },
    { product: "Elysyn", direction: "SIM/eSIM identity" }, { product: "Continua", direction: "Seamless network handoff" },
    { product: "Universa", direction: "Connectivity abstraction layer" }, { product: "Project Orbital", direction: "Development program" },
    { product: "Project Eternet", direction: "Frontier research" },
  ],
  vision: ["Tarvyx explores next-generation terrestrial–satellite connectivity technologies designed to keep people, machines and critical systems connected across remote and infrastructure-limited environments."],
  visionTagline: "Orbital Connectivity — Extending intelligent connectivity beyond terrestrial network boundaries.",
  action: "Explore Orbital Connectivity",
};

const RETAIL_PRODUCTS: IntelligenceProduct[] = [
  { id: "velora", number: "01", name: "TARVYX VELORA", title: "The Intelligence Layer for Commerce.", visual: "nexora", body: ["Velora is Tarvyx's adaptive commerce intelligence platform for modelling relationships between consumers, products, inventory, demand, pricing, environments and fulfillment.", "It explores commerce as a continuously changing system whose behaviour can be understood, predicted and intelligently adapted."], project: "VELORA COMMERCE WORLD MODEL", projectDetail: "Consumer → Intent → Products → Inventory → Pricing → Demand → Fulfillment → Experience → Feedback. Understand what is being bought, why, under what conditions and what may happen next.", capabilities: ["Unified commerce-state modelling", "Product and inventory relationships", "Demand and pricing context", "Consumer-journey analysis", "Fulfillment coordination", "Commerce scenario evaluation"] },
  { id: "intelia", number: "02", name: "TARVYX INTELIA", title: "Commerce That Understands Intent.", visual: "codelys", body: ["Intelia is an intent-driven commerce interface designed to interpret consumer objectives rather than relying solely on keywords or predefined navigation.", "It explores how products, information and purchasing pathways can reorganize around what consumers are actually trying to accomplish."], project: "INTELIA CONSUMER INTENT ENGINE", projectDetail: "Consumer Objective → Context → Constraints → Product Relationships → Alternatives → Bundles → Trade-offs. For example, organize suitable equipment for a week-long mountain trip under ₹30,000 based on duration, activity, weather and availability.", capabilities: ["Intent-based discovery", "Context and constraint understanding", "Product relationship analysis", "Alternative and bundle exploration", "Transparent trade-off support"], notes: [{ title: "Consumer control", paragraphs: ["The consumer remains in control of the final decision."] }] },
  { id: "scenora", number: "03", name: "TARVYX SCENORA", title: "Simulating Consumer Decisions Before They Happen.", visual: "evolis", body: ["Scenora models how changes in price, availability, product features, delivery timing and purchasing conditions could affect consumer decisions."], project: "SCENORA DECISION SIMULATOR", projectDetail: "Consumer Context → Available Options → Constraints → Scenario Generation → Trade-off Analysis → Decision Support", capabilities: ["Product and bundle comparison", "Price and feature trade-offs", "Delivery-option comparison", "Purchase scenario modelling", "Retail experience testing", "Transparent decision support"] },
  { id: "autova", number: "04", name: "TARVYX AUTOVA", title: "An Intelligent Agent for Commerce.", visual: "syndex", body: ["Autova explores agent-based commerce experiences in which intelligent software assists with research, product comparison, planning and permitted purchasing workflows.", "It focuses on interpreting goals, gathering relevant information and coordinating tasks under explicit consumer authorization."], project: "AUTOVA COMMERCE AGENT", projectDetail: "Goal → Context → Research → Compare → Verify Availability → Present Options → Consumer Approval → Authorized Action", capabilities: ["Shopping research", "Product shortlist generation", "Comparison summaries", "Complex purchasing workflow assistance", "Authorized task coordination"], notes: [{ title: "Authorization boundary", paragraphs: ["Any purchase, payment or consequential action should require the appropriate authorization."] }] },
  { id: "mallora", number: "05", name: "TARVYX MALLORA", title: "The Intelligent Physical Store.", visual: "veridis", body: ["Mallora explores how stores can become more context-aware through spatial information, inventory visibility, environmental sensing and operational intelligence."], project: "MALLORA STORE INTELLIGENCE MODEL", projectDetail: "Store Layout + Product Placement + Inventory + Footfall + Environment + Operations → Store State → Insights and Recommendations", capabilities: ["Store-layout analysis", "Product availability awareness", "Shelf and inventory intelligence", "Visitor-flow analysis", "Operational coordination", "Physical and digital retail integration"], notes: [{ title: "Privacy and sensing", paragraphs: ["Camera- or sensor-based analytics should use appropriate privacy controls, access restrictions and data-retention policies."] }] },
  { id: "sensora", number: "06", name: "TARVYX SENSORA", title: "Perception for Intelligent Retail Environments.", visual: "oryon", body: ["Sensora explores computer-vision and sensor-based perception for understanding physical retail environments, including relevant objects, product-placement conditions, movement patterns and environmental events."], project: "SENSORA RETAIL PERCEPTION ENGINE", projectDetail: "Camera / Sensors → Object and Event Detection → Contextual Interpretation → Store-State Model → Operational Insight", capabilities: ["Shelf-state detection research", "Queue estimation", "Stock visibility", "Environment monitoring", "Contextual event interpretation"] },
  { id: "pricera", number: "07", name: "TARVYX PRICERA", title: "Context-Aware Pricing Intelligence.", visual: "lumenix", body: ["Pricera explores how retail pricing decisions can be evaluated using demand, inventory, costs, competition, timing and business constraints."], project: "PRICERA PRICING INTELLIGENCE ENGINE", projectDetail: "Product + Inventory + Demand + Cost + Market Conditions + Business Policies → Scenario Analysis → Pricing Recommendation", capabilities: ["Price scenario comparison", "Markdown planning", "Inventory-aware recommendations", "Promotion evaluation", "Margin and demand trade-offs"], notes: [{ title: "Fair pricing", paragraphs: ["Recommendations should follow applicable laws, contractual obligations and fair-pricing policies. Sensitive competitor or consumer information should not be used improperly."] }] },
  { id: "persona", number: "08", name: "TARVYX PERSONA", title: "Understanding Consumer Context Responsibly.", visual: "fabric", body: ["Persona is a proposed consumer-context platform for organizing consented preferences, stated requirements and relevant interaction context to improve commerce experiences.", "It explores personalization without assuming every aspect of a person's behaviour should be collected or inferred."], project: "PERSONA CONTEXT ENGINE", projectDetail: "Consumer-Provided Preferences → Current Intent → Relevant Context → Suitable Options → Personalized Experience", capabilities: ["Consented preferences", "Relevant context organization", "User-controlled personalization", "Preference updates and removal"], notes: [{ title: "Privacy principles", items: ["Data minimization", "Transparency", "User control", "Ability to update or remove preferences"] }] },
  { id: "mentora", number: "09", name: "TARVYX MENTORA", title: "Intelligence for the Customer Journey.", visual: "nexora", body: ["Mentora explores how commerce platforms can understand and improve the sequence of interactions that make up a consumer's journey.", "It aims to identify unnecessary friction, information gaps and service problems across digital and physical commerce."], project: "MENTORA JOURNEY GRAPH", projectDetail: "Discovery → Research → Comparison → Purchase → Delivery → Usage → Support → Feedback", capabilities: ["Journey analysis", "Service improvement", "Interaction consistency", "Experience measurement", "Friction and information-gap identification"] },
  { id: "circula", number: "10", name: "TARVYX CIRCULA", title: "Intelligence for the Complete Product Lifecycle.", visual: "codelys", body: ["Circula connects product identity, usage, maintenance, resale, refurbishment, recycling and end-of-life information into a continuous lifecycle model.", "It can connect with Tarvyx Tracea from Supply Chain to explore continuity between supply-chain traceability and product-lifecycle intelligence."], project: "CIRCULA PRODUCT LIFECYCLE GRAPH", projectDetail: "Raw Material → Manufacturing → Retail → Consumer → Usage → Repair → Resale → Refurbishment → Recycling", capabilities: ["Product lifecycle modelling", "Usage and maintenance context", "Repair and resale pathways", "Refurbishment and recycling intelligence", "Supply-chain traceability integration"] },
  { id: "demora", number: "11", name: "TARVYX DEMORA", title: "Demand Intelligence Beyond Forecasting.", visual: "evolis", body: ["Demora explores how consumer intent, cultural signals, product interactions, pricing, social behaviour and environmental factors influence emerging demand.", "It focuses on understanding how demand forms and changes rather than merely extrapolating historical sales."], project: "DEMORA DEMAND FORMATION ENGINE", projectDetail: "Signals → Consumer Intent → Behavioural Patterns → Product Interest → Emerging Demand → Market Scenario", capabilities: ["Demand formation modelling", "Consumer-intent analysis", "Emerging product-interest signals", "Market scenario modelling", "Validated supply and inventory planning integrations"] },
  { id: "choiceva", number: "12", name: "TARVYX CHOICEVA", title: "Decision Intelligence for Consumers.", visual: "syndex", body: ["Choiceva helps people compare complex choices using transparent criteria, trade-offs and constraints, centering decision support on the consumer's stated goals rather than simply recommending another product."], project: "CHOICEVA DECISION ENGINE", projectDetail: "Consumer Goal → Evaluation Criteria → Candidate Options → Cost and Benefit Analysis → Trade-offs → Decision Support. Example: compare an electric vehicle using price, range, charging access, maintenance, usage and long-term cost.", capabilities: ["Transparent option comparison", "Goal-based evaluation criteria", "Cost and benefit analysis", "Trade-off explanations", "Consumer-led decision support"], notes: [{ title: "Decision ownership", paragraphs: ["The system explains differences between options. It does not make the final decision for the user."] }] },
];

const FINANCE_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  { id: "aurixa", number: "01", name: "TARVYX AURIXA", title: "The Intelligence Layer for Financial Systems.", visual: "nexora", body: ["Aurixa creates a unified computational representation of financial activity, obligations, assets, risk, liquidity and relationships.", "Instead of analyzing transactions as isolated events, it explores how financial events interact across customers, businesses, accounts, institutions, markets and obligations."], project: "AURIXA FINANCIAL STATE ENGINE", projectDetail: "Accounts → Transactions → Assets → Liabilities → Obligations → Cash Flow → Relationships → Financial State → Intelligence. What is the current state, and how is it changing?", capabilities: ["Financial-state modelling", "Account and transaction relationship mapping", "Asset and liability representation", "Cash-flow visibility", "Financial dependency analysis", "Anomaly context", "Cross-account and organizational intelligence"] },
  { id: "futuris", number: "02", name: "TARVYX FUTURIS", title: "Simulating Financial Futures Before Decisions Are Made.", visual: "codelys", body: ["Futuris evaluates how financial decisions, market changes and operational events could affect future financial states.", "Rather than relying on a single forecast, it explores multiple possible scenarios and their consequences to support strategic decision-making."], project: "FUTURIS FINANCIAL WORLD ENGINE", projectDetail: "Current Financial State → Decision / Intervention → Scenario Generator → Multiple Futures → Risk / Return / Liquidity Analysis → Decision Intelligence", capabilities: ["Financial scenario generation", "Stress testing", "What-if analysis", "Risk and return comparison", "Financial forecasting support", "Strategic decision modelling"], notes: [{ title: "Example scenario", paragraphs: ["Model how a bank's change to lending criteria could affect customer demand, loan volume, risk profiles, liquidity, defaults, capital requirements and revenue."] }] },
  { id: "caelora", number: "03", name: "TARVYX CAELORA", title: "Understanding How Financial Risk Propagates.", visual: "evolis", body: ["Caelora models relationships between financial events, exposures, institutions, obligations and potential risk outcomes.", "It explores how an initial change can propagate through a financial system and affect connected entities."], project: "CAELORA RISK PROPAGATION ENGINE", projectDetail: "Financial Event → Exposure → Dependency → Risk Transmission → Potential Impact → Response Options", capabilities: ["Financial dependency mapping", "Risk propagation analysis", "Counterparty exposure modelling", "Scenario-based risk assessment", "Causal investigation", "Risk prioritization"] },
  { id: "sentiva", number: "04", name: "TARVYX SENTIVA", title: "Behavioral Intelligence for Financial Systems.", visual: "syndex", body: ["Sentiva analyses patterns in financial activity to help identify meaningful changes, unusual behaviour and evolving financial conditions.", "It is intended to distinguish normal variation from patterns that may require review, without treating every unusual transaction as confirmed fraud."], project: "SENTIVA FINANCIAL BEHAVIOUR ENGINE", projectDetail: "Financial Activity → Behavioural Pattern → Contextual Analysis → Deviation Detection → Risk Assessment → Review", capabilities: ["Behavioural pattern modelling", "Unusual activity detection", "Contextual anomaly analysis", "Financial behaviour change detection", "Explainable alerts", "Human-reviewed investigation support"], notes: [{ title: "Sensitive data protection", paragraphs: ["Protect sensitive financial information and ensure personal financial data use follows appropriate consent, access-control and regulatory requirements."] }] },
  { id: "liquida", number: "05", name: "TARVYX LIQUIDA", title: "Intelligence for Cash Flow and Liquidity.", visual: "veridis", body: ["Liquida models cash positions, incoming and outgoing payments, financial obligations and potential liquidity requirements.", "It explores how organizations can understand cash-flow timing and uncertainty rather than relying only on static balance reports."], project: "LIQUIDA LIQUIDITY ENGINE", projectDetail: "Opening Cash Position + Expected Inflows − Expected Outflows → Forecast Cash Position → Liquidity Scenarios → Funding Options", capabilities: ["Cash-flow forecasting", "Liquidity-position modelling", "Payment obligation tracking", "Scenario-based liquidity assessment", "Shortfall-risk indicators", "Treasury decision support"] },
  { id: "argent", number: "06", name: "TARVYX ARGENT", title: "The Intelligence Engine for Financial Operations.", visual: "oryon", body: ["Argent brings validated financial-state information, risk signals, liquidity conditions and scenario results together to support controlled operational decisions."], project: "ARGENT FINANCIAL DECISION ENGINE", projectDetail: "Financial State → Business Rules → Risk Assessment → Decision Options → Authorization → Execution → Reconciliation → Verification", capabilities: ["Financial operations coordination", "Decision support", "Payment workflow intelligence", "Exception handling", "Financial process monitoring", "Audit and verification support"], notes: [{ title: "Authorization and oversight", paragraphs: ["Financial actions remain subject to applicable authorization, fraud controls, compliance checks and human approval where required."] }] },
  { id: "regulia", number: "07", name: "TARVYX REGULIA", title: "Regulatory Intelligence for Financial Operations.", visual: "lumenix", body: ["Regulia is a proposed regulatory-intelligence platform for organizing financial policies, obligations, controls, evidence and compliance workflows.", "It explores how financial organizations can connect regulatory requirements to the processes and systems responsible for satisfying them."], project: "REGULIA COMPLIANCE GRAPH", projectDetail: "Regulatory Requirement → Applicable Policy → Process → Control → Evidence → Review → Audit Record", capabilities: ["Regulatory requirement mapping", "Compliance workflow support", "Control and evidence tracking", "Policy-change impact analysis", "Audit preparation", "Compliance status reporting"], notes: [{ title: "Professional judgment", paragraphs: ["Regulia supports compliance work; it does not replace qualified legal, regulatory or compliance judgment."] }] },
  { id: "identara", number: "08", name: "TARVYX IDENTARA", title: "Secure Identity for Financial Interactions.", visual: "fabric", body: ["Identara explores identity and authorization intelligence for financial environments, linking a person, organization, device or service to permitted actions and appropriate verification."], project: "IDENTARA FINANCIAL IDENTITY LAYER", projectDetail: "Identity → Verification → Authorization → Risk and Policy Checks → Approved Interaction → Audit Trail", capabilities: ["Financial identity workflows", "Role-based access", "Authorization context", "Secure service-to-service interactions", "Identity-related risk signals", "Auditability and traceability"] },
  { id: "fabrica", number: "09", name: "TARVYX FABRICA", title: "Programmable Financial Infrastructure.", visual: "nexora", body: ["Fabrica is a proposed programmable-finance infrastructure concept for representing financial rules, obligations and authorized workflows in software.", "It explores how processes can become more transparent, testable and automatable without removing governance and authorization."], project: "FABRICA FINANCIAL WORKFLOW ENGINE", projectDetail: "Financial Agreement → Rules → Conditions → Authorized Event → Workflow Execution → Settlement / Reconciliation → Verification", capabilities: ["Programmable payment workflows", "Business-to-business financial processes", "Testable financial rules", "Licensed-provider integrations"] },
  { id: "univault", number: "10", name: "TARVYX UNIVAULT", title: "A Unified Model for Financial Assets and Obligations.", visual: "codelys", body: ["Univault is a proposed intelligence platform for structuring financial positions across supported accounts, instruments and connected systems.", "It helps represent relationships between assets, liabilities, ownership, obligations and financial events."], project: "UNIVAULT ASSET GRAPH", projectDetail: "Accounts + Assets + Liabilities + Ownership + Obligations + Transactions → Unified Financial View", capabilities: ["Financial asset and obligation modelling", "Ownership relationships", "Connected-system integration", "Unified financial-state representation"], notes: [{ title: "Platform boundary", paragraphs: ["This is an intelligence and integration concept, not a claim that Tarvyx operates a bank, custodian or regulated asset platform."] }] },
  { id: "settlia", number: "11", name: "TARVYX SETTLIA", title: "Intelligence for Settlement and Reconciliation.", visual: "evolis", body: ["Settlia explores intelligent settlement and reconciliation workflows across financial systems.", "It is designed to identify mismatches, connect related records, explain exceptions and support verification of financial outcomes."], project: "SETTLIA RECONCILIATION ENGINE", projectDetail: "Transaction Records → Matching → Difference Detection → Exception Classification → Review → Reconciliation → Audit Trail", capabilities: ["Payment reconciliation", "Business transaction matching", "Exception classification", "Review workflows", "Financial-outcome verification"] },
];

const ENTERPRISE_PRODUCTS: IntelligenceProduct[] = [
  { id: "organa", number: "01", name: "TARVYX ORGANA", title: "A Computational Model of the Enterprise.", visual: "nexora", body: ["Organa creates a unified computational representation of an organization's people, processes, systems, resources, knowledge and dependencies.", "It explores how enterprises can be represented as dynamic systems rather than disconnected applications and departments."], project: "ORGANA ENTERPRISE GRAPH", projectDetail: "People + Processes + Applications + Data + Infrastructure + Assets + Partners + Customers → Enterprise Graph → Organizational State. What is happening, and how are the parts connected?", capabilities: ["Enterprise relationship modelling", "Application and process mapping", "Organizational-state visibility", "Dependency analysis", "Cross-department intelligence", "Decision context", "Enterprise knowledge integration"] },
  { id: "entera", number: "02", name: "TARVYX ENTERA", title: "Intelligence for Organizational Decisions.", visual: "codelys", body: ["Entera helps teams evaluate decisions using connected business information, organizational constraints, operational dependencies and possible outcomes.", "It supports decision-makers by making alternatives and consequences easier to evaluate, not by removing leadership accountability."], project: "ENTERA DECISION ENGINE", projectDetail: "Business Objective → Current State → Constraints → Candidate Decisions → Scenario Analysis → Risk and Impact → Recommendation → Authorized Action", capabilities: ["Resource-allocation support", "Operational planning", "Investment scenarios", "Workflow prioritization", "Strategic decision support"] },
  { id: "synvex", number: "03", name: "TARVYX SYNVEX", title: "Understanding How Work Moves Through an Organization.", visual: "evolis", body: ["Synvex models how work moves across departments, applications, people and systems.", "It explores how process dependencies, bottlenecks, handoffs and repeated exceptions can be identified and analysed."], project: "SYNVEX PROCESS GRAPH", projectDetail: "Business Request → Process Steps → People and Systems → Dependencies → Bottlenecks → Process Analysis → Improvement Opportunities", capabilities: ["Process mapping", "Workflow dependency analysis", "Bottleneck identification", "Exception-pattern analysis", "Process performance insights", "Improvement scenario modelling"] },
  { id: "knowara", number: "04", name: "TARVYX KNOWARA", title: "The Organizational Memory and Knowledge Layer.", visual: "syndex", body: ["Knowara connects documents, policies, procedures, project records, decisions and institutional expertise while maintaining source traceability and appropriate access controls.", "It should distinguish documented facts from generated interpretations and provide source references wherever possible."], project: "KNOWARA KNOWLEDGE GRAPH", projectDetail: "Documents + Policies + Procedures + Decisions + Project History + Expertise → Knowledge Graph → Source-Aware Retrieval → Contextual Answers and References", capabilities: ["Employee knowledge support", "Procedural guidance", "Organizational search", "Project continuity", "Institutional-memory preservation", "Source-aware retrieval"] },
  { id: "autoraq", number: "05", name: "TARVYX AUTORAQ", title: "Controlled Enterprise Agent Orchestration.", visual: "veridis", body: ["Autoraq explores how multiple AI agents and software services can coordinate tasks across enterprise systems.", "It focuses on task planning, capability selection, permissions, dependencies, execution monitoring and verification."], project: "AUTORAQ AGENT ORCHESTRATOR", projectDetail: "Business Objective → Task Decomposition → Agent / Tool Selection → Permission Check → Execution Plan → Authorized Actions → Verification", capabilities: ["Research assistance", "Document workflows", "Support operations", "Information retrieval", "Cross-application task coordination"], notes: [{ title: "Approval boundaries", paragraphs: ["Actions affecting finances, personal information, access permissions, customer commitments or critical systems should use appropriate authorization and approval boundaries."] }] },
  { id: "worldex", number: "06", name: "TARVYX WORLDEX", title: "Simulating the Future of an Organization.", visual: "oryon", body: ["Worldex models how operational, structural and strategic changes could affect an enterprise through relationships between resources, workflows, dependencies, constraints and external conditions."], project: "WORLDEX ORGANIZATIONAL SIMULATOR", projectDetail: "Current Organizational State → Proposed Change → Scenario Generation → Simulation → Operational / Financial / Risk Analysis → Decision Support", capabilities: ["Organizational scenario generation", "Operational and structural simulation", "Financial and risk analysis", "Decision support"], notes: [{ title: "Example scenarios", items: ["What if a department is reorganized?", "What if a critical supplier becomes unavailable?", "What if demand increases significantly?", "What if a key enterprise application fails?", "What if a process is automated?"], paragraphs: ["Simulation outputs depend on models and assumptions and should not be presented as guaranteed predictions."] }] },
  { id: "riskora", number: "07", name: "TARVYX RISKORA", title: "Systemic Enterprise Risk Intelligence.", visual: "lumenix", body: ["Riskora maps operational, technological, dependency and process risks across an organization.", "Rather than treating risks as isolated entries, it explores how risks interact and propagate across interconnected systems."], project: "RISKORA ENTERPRISE RISK GRAPH", projectDetail: "Assets + Processes + Applications + Dependencies + External Conditions → Risk Relationships → Impact and Likelihood Assessment → Scenario Analysis → Mitigation Priorities → Monitoring and Review", capabilities: ["Enterprise risk mapping", "Dependency-based risk analysis", "Operational resilience assessment", "Scenario-based impact evaluation", "Risk prioritization", "Mitigation tracking"], notes: [{ title: "Governance", paragraphs: ["Riskora supports enterprise risk management; it does not replace professional judgment or formal governance processes."] }] },
  { id: "evolara", number: "08", name: "TARVYX EVOLARA", title: "Intelligence for Organizational Evolution.", visual: "fabric", body: ["Evolara understands how an organization changes over time and identifies emerging complexity, operational friction and architectural drift.", "It connects conceptually with Tarvyx Evolis from Software Intelligence, focusing on the broader organization rather than software alone."], project: "EVOLARA ORGANIZATIONAL EVOLUTION ENGINE", projectDetail: "Current State → Change History → System Behaviour → Complexity Growth → Risk / Friction → Future Projection → Recommended Evolution", capabilities: ["Organizational change analysis", "Process-degradation detection", "Dependency growth monitoring", "Technology transformation planning", "Organizational complexity assessment", "Long-term improvement planning"] },
  { id: "flovia", number: "09", name: "TARVYX FLOVIA", title: "An Intelligence Layer for Enterprise Work.", visual: "nexora", body: ["Flovia explores dynamic coordination of complex enterprise tasks across people, software agents, applications and physical operations.", "It determines appropriate execution pathways while respecting organizational policies, dependencies and human responsibilities."], project: "FLOVIA WORK ORCHESTRATOR", projectDetail: "Objective → Task Model → Resources → Dependencies → Human / AI Allocation → Execution → Verification", capabilities: ["Task and resource modelling", "Human / AI work allocation", "Policy-aware execution pathways", "Verification planning"], notes: [{ title: "Human responsibility", items: ["What should a human do?", "What can AI safely assist with?", "What can existing software automate?", "Where must human approval remain mandatory?", "How should the result be verified?"] }] },
  { id: "intera", number: "10", name: "TARVYX INTERA", title: "The Interface Between Enterprise Intelligence Systems.", visual: "codelys", body: ["Intera connects humans, AI systems, agents, applications, data and physical systems within a coordinated operational environment.", "It explores interoperability between intelligent systems rather than assuming one AI or enterprise application will handle every organizational task."], project: "INTERA ENTERPRISE INTELLIGENCE FABRIC", projectDetail: "Human ↔ AI ↔ Agents ↔ Applications ↔ Data ↔ Physical Systems", capabilities: ["Cross-system coordination", "Enterprise integration", "Context exchange", "Task routing", "Permission-aware communication", "Execution tracking", "Result verification"], notes: [{ title: "Shared coordination layer", paragraphs: ["Intera could eventually connect multiple Tarvyx products and external enterprise systems through a common coordination layer."] }] },
];

const RETAIL_DOMAIN: IntelligenceDomain = {
  id: "retail",
  title: "Adaptive Commerce Intelligence",
  eyebrow: "TARVYX CONSUMER & RETAIL",
  tagline: "Building commerce systems that understand intent, products, environments and changing demand.",
  introduction: [
    "Tarvyx develops next-generation consumer and retail technologies that combine artificial intelligence, ambient intelligence, behavioural modelling, computer vision, computational commerce and intelligent physical environments.",
    "We explore retail systems that understand consumer intent, dynamically organize products and experiences, model demand, adapt physical and digital environments and coordinate fulfillment across the commerce ecosystem.",
    "The long-term vision is context-aware, predictive, adaptive commerce—while keeping consumers in control of their choices, privacy and financial decisions.",
  ],
  lifecycleTitle: "THE ADAPTIVE COMMERCE LIFECYCLE",
  lifecycleDescription: "From consumer intent to an adaptive, connected experience.",
  lifecycle: [
    { title: "Understand", detail: "Interpret intent and relevant context" },
    { title: "Discover", detail: "Organize useful products and choices" },
    { title: "Simulate", detail: "Explore options and trade-offs" },
    { title: "Decide", detail: "Support transparent consumer decisions" },
    { title: "Fulfill", detail: "Coordinate inventory and delivery" },
    { title: "Adapt", detail: "Learn from the experience and feedback" },
  ],
  productHeading: "OUR ADAPTIVE COMMERCE PRODUCTS",
  productDescription: "A connected portfolio across commerce intelligence, intent, simulation, agents, physical retail and consumer decision support.",
  products: RETAIL_PRODUCTS,
  flagshipLabel: "FLAGSHIP COMMERCE RESEARCH PROGRAM",
  flagshipTitle: "PROJECT MERIDIAN",
  flagshipSubtitle: "Multi-Environment Retail Intelligence & Dynamic Interaction Network",
  flagshipBody: ["Project Meridian connects consumer intent, products, stores, marketplaces, inventory, fulfillment and environmental context into one adaptive commerce system.", "It aims to create a connected intelligence layer across physical and digital commerce rather than another isolated shopping website."],
  architectureTitle: "MERIDIAN ARCHITECTURE",
  architecture: [
    { title: "Consumer Intent", description: "Understand goals and relevant, user-controlled context." },
    { title: "Commerce Intelligence", description: "Connect product, store and marketplace information." },
    { title: "Commerce State", description: "Relate inventory, environment and pricing conditions." },
    { title: "Decision & Fulfillment", description: "Support choice and coordinate fulfillment pathways." },
    { title: "Experience & Feedback", description: "Measure outcomes and adapt the connected experience." },
  ],
  architectureFlow: "Consumer → Intent → Personal Context → Commerce Intelligence → Products + Stores + Marketplace → Inventory + Environment + Pricing → Decision Engine → Fulfillment Engine → Experience → Feedback and Adaptation",
  additionalResearch: [
    { title: "The Future of Commerce", body: ["The goal is for commerce to intelligently organize itself around consumer intent instead of requiring consumers to navigate disconnected product catalogues and shopping experiences."], flow: "Traditional retail: Customer → Search → Product → Cart → Payment. Tarvyx Adaptive Commerce: Intent → Context → Discovery → Simulation → Personalization → Decision → Fulfillment → Experience" },
    { title: "Frontier Product — TARVYX OMNISPHERE", body: ["Omnisphere is the long-term research direction for modelling relationships across consumers, products, markets, stores, supply networks and environments. It investigates whether a connected computational model can explain how changes in one part of the commerce ecosystem influence the rest."], flow: "Consumer ↔ Product ↔ Market ↔ Store ↔ Supply Network ↔ Environment" },
    { title: "Development Roadmap", body: ["Phase 1 — Intelia: intent-based discovery and comparison using a controlled catalogue. Phase 2 — Autova: authorized, task-oriented commerce assistance. Phase 3 — Mallora: physical-store intelligence and sensor-based insights. Phase 4 — Velora: connect consumers, products, inventory and fulfillment. Phase 5 — Meridian: build the unified commerce intelligence layer. Phase 6 — Omnisphere: research full commerce-world modelling."] },
    { title: "Cross-Domain Integration", body: ["Consumer & Retail connects with Tarvyx Supply Chain for inventory, supplier visibility and fulfillment; IoT for environmental sensing; Embedded Systems for local perception and edge computation; Robotics for physical assistance and inventory movement; AI & Machine Learning for personalization, perception and decision support; and Financial Intelligence for payment integrations through appropriate providers."] },
    { title: "Website Card Content", body: ["Adaptive Commerce Intelligence — Building commerce systems that understand intent, products, environments and changing demand. Tarvyx develops intelligent consumer and retail technologies spanning adaptive commerce, decision intelligence, physical retail perception, intelligent agents and computational commerce environments."] },
  ],
  portfolio: [
    { product: "Velora", direction: "Commerce intelligence" }, { product: "Intelia", direction: "Intent-driven discovery" },
    { product: "Scenora", direction: "Consumer decision simulation" }, { product: "Autova", direction: "Authorized commerce agent" },
    { product: "Mallora", direction: "Physical-store intelligence" }, { product: "Sensora", direction: "Retail perception" },
    { product: "Pricera", direction: "Context-aware pricing" }, { product: "Persona", direction: "Responsible consumer context" },
    { product: "Mentora", direction: "Customer-journey intelligence" }, { product: "Circula", direction: "Product-lifecycle intelligence" },
    { product: "Demora", direction: "Demand formation" }, { product: "Choiceva", direction: "Consumer decision intelligence" },
    { product: "Project Meridian", direction: "Flagship commerce research" }, { product: "Omnisphere", direction: "Frontier commerce-world modelling" },
  ],
  vision: ["The goal is to build intelligent commerce systems that understand what people need, how markets behave and how physical and digital commerce can adapt around them."],
  visionTagline: "Adaptive Commerce Intelligence — Building commerce systems that understand intent, products, environments and changing demand.",
  action: "Explore Adaptive Commerce",
};

const FINANCE_DOMAIN: IntelligenceDomain = {
  id: "finance",
  title: "Intelligent Financial Systems & Computational Finance",
  eyebrow: "TARVYX FINANCIAL INTELLIGENCE",
  tagline: "Building intelligent financial systems for a programmable, adaptive and globally connected economy.",
  introduction: [
    "Tarvyx develops next-generation financial intelligence technologies for banking, payments, treasury, risk, compliance and digital financial infrastructure.",
    "We explore how artificial intelligence, computational finance, secure digital identity, real-time decision systems and programmable infrastructure can help financial institutions understand and manage complex environments.",
    "The long-term vision is to move from transaction-centric systems toward intelligent financial ecosystems that understand the state of capital, obligations, risk and opportunity in real time, with security, auditability, regulatory controls and human oversight.",
  ],
  lifecycleTitle: "THE FINANCIAL INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From financial state to controlled, verifiable operations.",
  lifecycle: [
    { title: "Identify", detail: "Apply identity and access controls" },
    { title: "Model", detail: "Understand financial state and relationships" },
    { title: "Analyze", detail: "Assess behaviour, exposure and risk" },
    { title: "Simulate", detail: "Compare possible financial futures" },
    { title: "Decide", detail: "Support informed, authorized choices" },
    { title: "Verify", detail: "Reconcile outcomes and preserve auditability" },
  ],
  productHeading: "OUR FINANCIAL INTELLIGENCE PRODUCTS",
  productDescription: "A connected portfolio for financial state, risk, liquidity, compliance, identity, operations and reconciliation.",
  products: FINANCE_DOMAIN_PRODUCTS,
  flagshipLabel: "FLAGSHIP FINANCIAL PLATFORM",
  flagshipTitle: "TARVYX FINANCIAL INTELLIGENCE ENGINE",
  flagshipSubtitle: "A unified financial model for intelligence and controlled operations",
  flagshipBody: ["The flagship platform combines core intelligence capabilities into a unified financial model.", "Its goal is to connect financial-state understanding, behavioural intelligence, causal analysis, simulation and controlled financial operations."],
  architectureTitle: "FINANCIAL INTELLIGENCE ARCHITECTURE",
  architecture: [
    { title: "Financial State", description: "Represent financial data with identity and access controls." },
    { title: "Behaviour & Risk", description: "Model behaviour and causal risk relationships." },
    { title: "Scenario Intelligence", description: "Generate futures and analyze liquidity and financial impact." },
    { title: "Decision & Execution", description: "Support decision intelligence and authorized actions." },
    { title: "Verification & Memory", description: "Reconcile outcomes and maintain audit records." },
  ],
  architectureFlow: "Financial Data → Identity and Access Controls → Financial State Graph → Behavioural Intelligence → Causal Risk Modelling → Scenario Generation and Simulation → Liquidity and Financial Analysis → Decision Intelligence → Authorized Execution → Reconciliation and Verification → Audit and System Memory",
  additionalResearch: [
    { title: "The Future of Financial Intelligence", body: ["The objective is not to build another basic banking application or expense tracker. Tarvyx explores intelligence infrastructure underneath financial systems."], flow: "Traditional finance: Bank → Account → Transaction → Report. Tarvyx Financial Intelligence: Identity → Intent → Financial State → Simulation → Risk → Decision → Execution → Verification" },
    { title: "Development Roadmap", body: ["Phase 1 — Aurixa: build a financial-state graph using synthetic or sandbox data for accounts, transactions, assets, liabilities and relationships. Phase 2 — Sentiva: add behavioural intelligence and contextual anomaly analysis. Phase 3 — Caelora: add causal relationships and risk propagation. Phase 4 — Futuris: introduce scenario generation and simulation. Phase 5 — Liquida: add cash-flow and liquidity modelling. Phase 6 — Argent: combine validated components into the Tarvyx Financial Intelligence Engine."] },
    { title: "Positioning Principle", body: ["Tarvyx should be positioned as a financial technology and intelligence company building infrastructure for future financial systems, rather than as a bank. Future products can integrate with appropriately licensed financial institutions, payment providers and technology partners as regulatory, security and commercial arrangements mature. Product descriptions should identify whether each capability is in research, prototype development or commercial deployment."] },
    { title: "Website Card Content", body: ["Financial Intelligence — Building intelligent financial systems for a programmable, adaptive and globally connected economy. Tarvyx develops technologies spanning risk, liquidity, regulatory intelligence, financial simulation, secure identity and intelligent financial operations."] },
  ],
  portfolio: [
    { product: "Aurixa", direction: "Financial intelligence and state graph" }, { product: "Futuris", direction: "Financial scenario intelligence" },
    { product: "Caelora", direction: "Causal risk modelling" }, { product: "Sentiva", direction: "Behavioural financial intelligence" },
    { product: "Liquida", direction: "Cash flow and liquidity" }, { product: "Argent", direction: "Financial operations intelligence" },
    { product: "Regulia", direction: "Regulatory intelligence" }, { product: "Identara", direction: "Secure financial identity" },
    { product: "Fabrica", direction: "Programmable financial infrastructure" }, { product: "Univault", direction: "Assets and obligations model" },
    { product: "Settlia", direction: "Settlement and reconciliation" },
  ],
  vision: ["Tarvyx explores the intelligence infrastructure beneath future financial systems: systems that understand changing financial states, model risk, evaluate alternatives and support controlled, verifiable operations."],
  visionTagline: "Intelligent Financial Systems — Secure, auditable intelligence for a programmable financial ecosystem.",
  action: "Explore Financial Intelligence",
};

const ENTERPRISE_DOMAIN: IntelligenceDomain = {
  id: "enterprise",
  title: "Enterprise Intelligence & Autonomous Systems",
  eyebrow: "TARVYX ENTERPRISE",
  tagline: "Building intelligent operating layers for organizations of the future.",
  introduction: [
    "Tarvyx develops enterprise intelligence systems that connect organizational knowledge, software, data, workflows, infrastructure and decision processes into unified computational environments.",
    "We explore architectures that understand organizational relationships and operating state, identify emerging risks, simulate strategic alternatives and coordinate complex workflows.",
    "Tarvyx combines artificial intelligence, software intelligence, computational infrastructure, cybersecurity, automation and human-intelligence interfaces to move enterprise technology beyond static applications toward adaptive organizational systems.",
  ],
  lifecycleTitle: "THE ENTERPRISE INTELLIGENCE LIFECYCLE",
  lifecycleDescription: "From organizational understanding to verified, continuous improvement.",
  lifecycle: [
    { title: "Connect", detail: "Bring organizational systems and data together" },
    { title: "Understand", detail: "Model graph, state, knowledge and process" },
    { title: "Assess", detail: "Identify dependencies, friction and risk" },
    { title: "Plan", detail: "Simulate alternatives and coordinate tasks" },
    { title: "Authorize", detail: "Preserve permissions and human accountability" },
    { title: "Verify", detail: "Validate execution and retain organizational memory" },
  ],
  productHeading: "OUR ENTERPRISE INTELLIGENCE PRODUCTS",
  productDescription: "A connected portfolio for organizational graphs, knowledge, processes, decisions, risks, simulation and authorized execution.",
  products: ENTERPRISE_PRODUCTS,
  flagshipLabel: "FLAGSHIP ENTERPRISE PLATFORM",
  flagshipTitle: "PROJECT NEXUS",
  flagshipSubtitle: "Networked Enterprise Intelligence & Unified eXecution System",
  flagshipBody: ["Project Nexus is Tarvyx's proposed flagship enterprise platform. It aims to understand organizational state and coordinate authorized work across people, AI, applications and infrastructure.", "Nexus brings enterprise knowledge, process intelligence, risk modelling, decision support and authorized execution together."],
  architectureTitle: "NEXUS ARCHITECTURE",
  architecture: [
    { title: "Enterprise Graph", description: "Represent organizational relationships and operating state." },
    { title: "Knowledge + Process + Risk", description: "Connect institutional knowledge and operational dependencies." },
    { title: "Intelligence & Planning", description: "Support analysis, decisions and task orchestration." },
    { title: "Authorized Execution", description: "Coordinate people, AI and systems within boundaries." },
    { title: "Verification & Memory", description: "Verify outcomes and support continuous improvement." },
  ],
  architectureFlow: "Enterprise → Enterprise Graph → Organizational State → Knowledge + Process + Risk → Advanced Intelligence Engine → Decision and Planning → Task Orchestration → Human + AI + Systems → Authorized Execution → Verification → Organizational Memory → Continuous Improvement",
  additionalResearch: [
    { title: "The Future of Enterprise Intelligence", body: ["An enterprise is a complex system involving people, software, data, infrastructure, processes, assets, decisions and external events. Tarvyx explores how these elements can be represented and understood as one connected organizational environment."], flow: "Traditional enterprise technology: Departments → Applications → Dashboards → Reports → Manual Decisions. Tarvyx Enterprise Intelligence: Organizational Data → Enterprise Graph → Organizational State → Knowledge + Process + Risk → Intelligence → Decision and Planning → Task Orchestration → Execution → Verification → Memory" },
    { title: "Enterprise Autonomy — Research Program: ORCHESTRA", body: ["Orchestra explores how much organizational complexity can be computationally understood and coordinated while preserving human accountability. The goal is not to let AI run an organization without oversight, but to investigate intelligent assistance through explicit boundaries and governance."], flow: "Observe → Understand → Simulate → Recommend → Authorize → Execute → Verify" },
    { title: "TARVYX ORG-TWIN — An Organizational Digital Twin", body: ["Org-Twin is a long-term research concept for representing an organization through a computational model of its people, processes, technology, assets, resources, dependencies and external conditions. It explores the effects of organizational change, affected systems, emerging bottlenecks, operational risk and alternative outcomes. Org-Twin could eventually combine Organa, Worldex, Riskora and Evolara."] },
    { title: "Development Roadmap", body: ["Phase 1 — Organa: build an enterprise graph with synthetic or controlled data. Phase 2 — Synvex: map work and dependencies. Phase 3 — Knowara: add organizational memory, retrieval and provenance. Phase 4 — Entera: add decision support and scenario reasoning. Phase 5 — Autoraq: introduce permission-aware enterprise agents. Phase 6 — Worldex: add organizational simulation. Phase 7 — Nexus: unify validated capabilities."] },
    { title: "Cross-Domain Integration", body: ["Enterprise Intelligence can connect Advanced AI for reasoning and agents; Software Intelligence for architecture and evolution; Cloud for infrastructure; Cybersecurity for access control and resilience; Human Interface Intelligence for decision support; IoT and Embedded Systems for physical data; Robotics for controlled physical coordination; Supply Chain for supplier and logistics intelligence; and Financial Intelligence through authorized integrations. Each integration should be independently validated, secure and governed."] },
    { title: "Website Card Content", body: ["Enterprise Intelligence — Building intelligent operating layers for organizations of the future. Tarvyx connects knowledge, processes, technology, people and decision-making into adaptive computational environments."] },
  ],
  portfolio: [
    { product: "Organa", direction: "Enterprise intelligence graph" }, { product: "Entera", direction: "Decision intelligence" },
    { product: "Synvex", direction: "Process intelligence" }, { product: "Knowara", direction: "Organizational knowledge intelligence" },
    { product: "Autoraq", direction: "Enterprise-agent orchestration" }, { product: "Worldex", direction: "Organizational simulation" },
    { product: "Riskora", direction: "Systemic enterprise risk" }, { product: "Evolara", direction: "Enterprise evolution intelligence" },
    { product: "Flovia", direction: "Intelligent work orchestration" }, { product: "Intera", direction: "Enterprise intelligence fabric" },
    { product: "Project Nexus", direction: "Core enterprise platform" }, { product: "Org-Twin / Orchestra", direction: "Frontier research" },
  ],
  vision: ["Tarvyx explores adaptive organizational systems that understand how people, processes, knowledge, technology and decisions connect—and help organizations evolve with explicit governance and human accountability."],
  visionTagline: "Enterprise Intelligence — Connecting organizational knowledge, processes, technology and decisions.",
  action: "Explore Enterprise Intelligence",
};

const SEMICONDUCTOR_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  { id: "neuronex", number: "01", name: "NEURONEX", title: "AI Compute Architecture.", visual: "nexora", body: ["Neuronex explores specialized computing architectures intended to support machine-learning inference and other AI workloads."], project: "NEURONEX INTELLIGENCE ENGINE", projectDetail: "AI Workload → Model Analysis → Hardware Mapping → Compute Execution → Performance Evaluation → Optimization", capabilities: ["AI inference acceleration", "Neural-network workload optimization", "Parallel computation", "Memory and compute coordination", "Edge-AI architecture", "Performance and power analysis"] },
  { id: "visilyx", number: "02", name: "VISILYX", title: "Intelligent Vision Processing.", visual: "codelys", body: ["Visilyx explores processing architectures for computational imaging, computer vision and multisensor visual workloads."], project: "VISILYX VISION CORE", projectDetail: "Image Sensor → Image Acquisition → Preprocessing → Vision Acceleration → Visual Representation → Application Interface", capabilities: ["Image-processing acceleration", "Computer-vision workloads", "Camera and sensor interfaces", "Visual data pipelines", "Edge-vision processing", "Real-time imaging architecture"] },
  { id: "edgexa", number: "03", name: "EDGEXA", title: "Edge Computing Systems.", visual: "evolis", body: ["Edgexa focuses on computing architectures for local processing in industrial equipment, smart sensors, robotics and connected devices."], project: "EDGEXA EDGE CORE", projectDetail: "Sensors → Local Processing → Edge Intelligence → Decision Support → Device Output", capabilities: ["Edge-processing architecture", "Low-power computation", "Local AI inference", "Device-level data processing", "Real-time processing", "Edge-cloud coordination"] },
  { id: "autonex", number: "04", name: "AUTONEX", title: "Automotive Semiconductor Systems.", visual: "syndex", body: ["Autonex explores semiconductor and processing architectures suitable for automotive computing and software-defined vehicle research."], project: "AUTONEX VEHICLE COMPUTE PLATFORM", projectDetail: "Vehicle Sensors → Data Processing → Perception Workloads → Vehicle Intelligence → Validated System Interface", capabilities: ["Automotive processing architecture", "Sensor-interface research", "Vehicle-computing systems", "Embedded AI", "Real-time processing", "Power and thermal analysis", "Hardware reliability research"] },
  { id: "rovix", number: "05", name: "ROVIX", title: "Robotics Compute Systems.", visual: "veridis", body: ["Rovix explores computing platforms for robotics, machine perception, motion systems and real-time control applications."], project: "ROVIX ROBOTICS CORE", projectDetail: "Sensors → Embedded Compute → Perception → Planning Interface → Control Interface → Feedback", capabilities: ["Robotics compute architecture", "Sensor and actuator interfaces", "Real-time data processing", "Embedded machine learning", "Motion-system integration", "Hardware-software co-design"] },
  { id: "memryx", number: "06", name: "MEMRYX", title: "Memory Intelligence.", visual: "oryon", body: ["Memryx explores memory-system architecture and data movement as key factors in intelligent computing performance."], project: "MEMRYX MEMORY ENGINE", projectDetail: "Workload Analysis → Memory Mapping → Data Movement → Compute Coordination → Performance Measurement", capabilities: ["Memory hierarchy modelling", "Data movement optimization", "Memory bandwidth analysis", "Workload-aware memory management", "Storage and compute coordination", "Memory-performance evaluation"] },
  { id: "trusil", number: "07", name: "TRUSIL", title: "Semiconductor Reliability Intelligence.", visual: "lumenix", body: ["Trusil explores methods for monitoring, modelling and analysing semiconductor and computing-system reliability."], project: "TRUSIL RELIABILITY ENGINE", projectDetail: "Hardware Telemetry → Condition Analysis → Anomaly Detection → Reliability Assessment → Engineering Review", capabilities: ["Hardware reliability analysis", "Thermal behaviour modelling", "Performance degradation research", "Fault monitoring", "Hardware diagnostics", "Reliability-data analysis"] },
  { id: "hetrix", number: "08", name: "HETRIX", title: "Heterogeneous Computing.", visual: "fabric", body: ["Hetrix explores how workloads can be distributed across processor and accelerator types according to performance, power, latency and resource requirements."], project: "HETRIX COMPUTE SELECTOR", projectDetail: "Workload → Computational Analysis → Hardware Selection → Execution → Result Validation → Benchmarking", capabilities: ["CPU and GPU workload mapping", "FPGA acceleration research", "NPU integration", "Hardware-aware scheduling", "Processor interoperability", "Performance benchmarking"] },
  { id: "qubrix", number: "09", name: "QUBRIX", title: "Quantum Computing Interfaces.", visual: "nexora", body: ["Qubrix is a proposed research direction for software and hardware interfaces connecting classical computing infrastructure with quantum systems. It does not imply Tarvyx currently manufactures quantum processors."], project: "QUBRIX HYBRID INTERFACE", projectDetail: "Classical Workload → Problem Decomposition → Quantum Interface → Quantum Backend or Simulator → Result Integration → Verification", capabilities: ["Quantum-control interface research", "Classical–quantum system integration", "Workload orchestration", "Data-transfer architecture", "Quantum-resource monitoring", "Hybrid-computing benchmarks"] },
  { id: "biosil", number: "10", name: "BIOSIL", title: "Biomedical Semiconductor Systems.", visual: "codelys", body: ["Biosil explores semiconductor-based processing and sensor interfaces for scientific instrumentation and biomedical research devices."], project: "BIOSIL SENSOR CORE", projectDetail: "Sensor Input → Signal Conditioning → Data Acquisition → Embedded Processing → Data Output", capabilities: ["Biomedical sensor interfaces", "Low-power signal processing", "Data acquisition systems", "Embedded processing", "Scientific instrumentation", "Sensor-data integration"] },
  { id: "neurosil", number: "11", name: "NEUROSIL", title: "Neuromorphic Computing Research.", visual: "evolis", body: ["Neurosil is a proposed research direction investigating computing architectures inspired by aspects of neural processing."], project: "NEUROSIL NEURAL ARCHITECTURE", projectDetail: "Input Events → Neural Representation → Hardware Mapping → Computation → Output Evaluation", capabilities: ["Neuromorphic computing research", "Event-driven processing", "Sparse computation", "Neural-network hardware mapping", "Energy-efficiency evaluation", "Experimental architecture modelling"] },
  { id: "comnexa", number: "12", name: "COMNEXA", title: "Semiconductor Connectivity.", visual: "syndex", body: ["Comnexa explores communication interfaces and connectivity architectures for data exchange between processors, sensors, memory and embedded devices."], project: "COMNEXA INTERCONNECT FABRIC", projectDetail: "Device → Interface → Data Transfer → Processing Unit → System Integration → Validation", capabilities: ["Hardware communication interfaces", "Sensor connectivity", "Interconnect architecture", "Data-transfer efficiency", "Embedded connectivity", "Interface performance testing"] },
  { id: "envirox", number: "13", name: "ENVIROX", title: "Power and Thermal Intelligence.", visual: "veridis", body: ["Envirox explores power and thermal analysis for semiconductor-based computing systems."], project: "ENVIROX POWER ENGINE", projectDetail: "Workload → Power Analysis → Thermal Model → Operating Constraints → Optimization → Validation", capabilities: ["Power consumption modelling", "Thermal-performance analysis", "Workload-aware power management", "Cooling-system evaluation", "Energy-efficiency benchmarking", "Thermal reliability research"] },
];

const PHARMA_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  { id: "biovanta", number: "01", name: "BIOVANTA", title: "Computational Drug Discovery.", visual: "nexora", body: ["Biovanta supports the identification, analysis and prioritization of potential therapeutic candidates by combining molecular data, biological knowledge, scientific literature and machine-learning methods."], project: "BIOVANTA DISCOVERY ENGINE", projectDetail: "Scientific Data → Biological Knowledge → Target Identification → Molecular Analysis → Candidate Ranking → Research Validation", capabilities: ["Computational drug discovery", "Molecular data analysis", "Biological knowledge graphs", "Target identification and prioritization", "Candidate ranking", "AI-assisted scientific hypothesis generation", "Drug–target interaction research", "Research-data integration"] },
  { id: "moleq", number: "02", name: "MOLEQ", title: "Molecular Science.", visual: "codelys", body: ["Moleq investigates molecular structures, interactions and properties through computational chemistry, simulation and AI-assisted analysis."], project: "MOLEQ MOLECULAR SIMULATOR", projectDetail: "Molecular Structure → Computational Modelling → Interaction Analysis → Property Estimation → AI Analysis → Candidate Evaluation", capabilities: ["Molecular structure analysis", "Molecular property prediction", "Molecular interaction modelling", "Computational chemistry workflows", "Molecular simulation research", "Candidate comparison", "AI-assisted molecular analysis", "Scientific visualization"] },
  { id: "cellora", number: "03", name: "CELLORA", title: "Cellular Modelling.", visual: "evolis", body: ["Cellora focuses on computational cellular modelling and analysis of biological processes to help researchers explore cellular behaviour, pathways and interactions."], project: "CELLORA CELLULAR MODEL", projectDetail: "Biological Data → Cell-State Representation → Pathway and Interaction Analysis → Computational Systems Model → Research Insight", capabilities: ["Cellular data modelling", "Biological pathway analysis", "Cell-state representation", "Cellular interaction research", "Biological data integration", "Computational systems biology", "AI-assisted pattern discovery"] },
  { id: "genova", number: "04", name: "GENOVA", title: "Genomic Intelligence.", visual: "syndex", body: ["Genova analyses genomic and biological data to support research into genetic variation, gene function and their relationships with biological processes."], project: "GENOVA GENOMIC INTELLIGENCE", projectDetail: "Genomic Data → Variant and Gene Context → Biological Relationships → Pattern Analysis → Research Interpretation", capabilities: ["Genomic data analysis", "Gene and variant interpretation support", "Biological data integration", "Genomic pattern discovery", "Computational biology workflows", "Research knowledge management"] },
  { id: "clinova", number: "05", name: "CLINOVA", title: "Clinical Development Intelligence.", visual: "veridis", body: ["Clinova organizes clinical data, study information, research workflows and evidence-generation activities to support clinical-development research."], project: "CLINOVA CLINICAL EVIDENCE", projectDetail: "Study Information → Research Workflows → Clinical Data → Evidence Organization → Analysis and Documentation", capabilities: ["Clinical research data organization", "Study workflow support", "Clinical evidence management", "Research documentation", "Study-data analysis", "Trial-planning support", "Clinical research intelligence"] },
  { id: "theravia", number: "06", name: "THERAVIA", title: "Therapeutic Development.", visual: "oryon", body: ["Theravia coordinates therapeutic-development activities from candidate evaluation through preclinical research planning and development-stage assessment."], project: "THERAVIA DEVELOPMENT TRACKER", projectDetail: "Candidate Evaluation → Evidence Integration → Preclinical Research Planning → Development-Stage Assessment → Milestone Monitoring", capabilities: ["Therapeutic candidate tracking", "Development-stage management", "Research evidence integration", "Preclinical research planning", "Candidate comparison", "Development milestone monitoring"] },
  { id: "formera", number: "07", name: "FORMERA", title: "Pharmaceutical Sciences.", visual: "lumenix", body: ["Formera explores pharmaceutical formulation science, ingredient compatibility, material properties and computational approaches to formulation development."], project: "FORMERA FORMULATION INTELLIGENCE", projectDetail: "Ingredients + Excipient Data + Material Properties → Formulation Comparison → Stability and Experimental Results", capabilities: ["Formulation research management", "Ingredient and excipient data analysis", "Formulation comparison", "Stability-study data organization", "Pharmaceutical material modelling", "Experimental result analysis"] },
  { id: "pharmora", number: "08", name: "PHARMORA", title: "Pharmaceutical Manufacturing.", visual: "fabric", body: ["Pharmora focuses on pharmaceutical manufacturing intelligence, production-data integration, process monitoring and manufacturing workflow optimization."], project: "PHARMORA MANUFACTURING INTELLIGENCE", projectDetail: "Production Data → Process Monitoring → Batch Records → Quality Integration → Traceable Manufacturing Workflow", capabilities: ["Manufacturing process monitoring", "Production-data management", "Batch-record support", "Process analytics", "Manufacturing workflow intelligence", "Production traceability", "Quality-data integration"], notes: [{ title: "Manufacturing requirements", paragraphs: ["Manufacturing requires suitable facilities, qualified personnel, validated processes and applicable regulatory approvals."] }] },
  { id: "qualyx", number: "09", name: "QUALYX", title: "Pharmaceutical Quality Intelligence.", visual: "nexora", body: ["Qualyx supports pharmaceutical quality management through structured documentation, quality-event tracking, process analysis and compliance-oriented workflows."], project: "QUALYX QUALITY INTELLIGENCE", projectDetail: "Quality Documentation → Event Tracking → Process Analysis → Corrective Action → Audit-Trail and Regulatory Support", capabilities: ["Quality documentation", "Deviation and corrective-action tracking", "Batch-quality data analysis", "Audit-trail support", "Quality-event management", "Process consistency monitoring", "Regulatory documentation support"] },
  { id: "viventa", number: "10", name: "VIVENTA", title: "Medical Evidence Intelligence.", visual: "codelys", body: ["Viventa organizes and analyses medical and scientific evidence to help research teams understand published findings, clinical evidence and therapeutic outcomes."], project: "VIVENTA EVIDENCE ENGINE", projectDetail: "Scientific Literature + Clinical Evidence → Organized Research Knowledge → Comparison and Visualization → Research Insight", capabilities: ["Scientific literature analysis", "Evidence organization", "Research knowledge management", "Clinical evidence comparison", "Medical data visualization", "Research-report support"] },
  { id: "immunova", number: "11", name: "IMMUNOVA", title: "Immunology Research.", visual: "evolis", body: ["Immunova is a research direction focused on computational immunology, immune-response modelling and analysis of biological interactions involved in immune-system function."], project: "IMMUNOVA IMMUNOLOGY MODEL", projectDetail: "Immunological Data → Biological Interactions → Immune-Response Modelling → Computational Research Workflow", capabilities: ["Immunological data analysis", "Immune-response modelling research", "Biological interaction analysis", "Scientific dataset integration", "Computational immunology workflows"] },
  { id: "regenara", number: "12", name: "REGENARA", title: "Regenerative Science.", visual: "syndex", body: ["Regenara focuses on computational and scientific research related to regenerative biology, tissue modelling and biological repair processes."], project: "REGENARA REGENERATIVE SCIENCE", projectDetail: "Regenerative Biology Data → Tissue and Cellular Models → Pathway Analysis → Scientific Visualization", capabilities: ["Regenerative biology data analysis", "Tissue-modelling research", "Cellular regeneration research support", "Biological pathway analysis", "Scientific data visualization"] },
  { id: "q-molecule", number: "13", name: "Q-MOLECULE", title: "Quantum Molecular Research.", visual: "veridis", body: ["Q-Molecule is a long-term research direction combining quantum simulation, molecular modelling, AI and pharmaceutical science to investigate molecular behaviour and potential therapeutic candidates."], project: "Q-MOLECULE QUANTUM WORKFLOW", projectDetail: "Molecular Model → Quantum-Classical Computation → Property Estimation → AI-Assisted Analysis → Candidate Comparison → Benchmarking", capabilities: ["Molecular simulation research", "Quantum-classical computational workflows", "Molecular property estimation", "AI-assisted molecular analysis", "Candidate comparison", "Scientific computation benchmarking"] },
  { id: "laboris", number: "14", name: "LABORIS", title: "Autonomous Research Infrastructure.", visual: "oryon", body: ["Laboris is envisioned as integrated research infrastructure connecting scientific datasets, computational tools, laboratory workflows and experimental observations."], project: "LABORIS RESEARCH ENVIRONMENT", projectDetail: "Scientific Datasets + Computational Tools + Laboratory Workflows + Experimental Observations → Coordinated Research Records", capabilities: ["Research workflow coordination", "Scientific data integration", "Experimental record management", "Computational research support", "Laboratory-data organization", "Research-result tracking"] },
];

const IMAGING_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  { id: "lumevra", number: "01", name: "LUMEVRA", title: "Computational Imaging.", visual: "nexora", body: ["Lumevra combines sensor information, image processing and intelligent reconstruction to improve how visual information is captured and interpreted."], project: "LUMEVRA COMPUTATIONAL IMAGING", projectDetail: "Sensor Information → Image Processing → Intelligent Reconstruction → Image Quality and Interpretation", capabilities: ["Computational image processing", "Multi-frame image fusion", "Image enhancement", "Image reconstruction research", "Image-quality analysis", "Intelligent imaging workflows", "Computational photography"] },
  { id: "neuricam", number: "02", name: "NEURICAM", title: "Cognitive Camera Intelligence.", visual: "codelys", body: ["Neuricam explores camera systems that interpret visual information as more than pixels or isolated objects by connecting perception with scene context, relationships, movement and environmental conditions."], project: "NEURICAM COGNITIVE CAMERA", projectDetail: "Visual Capture → Scene Context → Object Relationships → Movement → Environmental Conditions → Scene Understanding", capabilities: ["Context-aware visual perception", "Object and scene understanding", "Temporal event analysis", "Visual relationship modelling", "Intelligent camera processing", "Edge-based vision intelligence"] },
  { id: "eventra", number: "03", name: "EVENTRA", title: "Event-Based Vision.", visual: "evolis", body: ["Eventra explores event-driven visual processing focused on changes in a scene rather than relying exclusively on conventional frame-based imaging."], project: "EVENTRA EVENT VISION", projectDetail: "Scene Change → Event Stream → Temporal Visual Processing → Dynamic-Scene Interpretation", capabilities: ["Motion-event analysis", "Temporal visual processing", "Dynamic-scene interpretation", "Event-stream processing research", "Low-latency vision workflows", "Event-based sensor integration"] },
  { id: "depthra", number: "04", name: "DEPTHRA", title: "Depth & Spatial Imaging.", visual: "syndex", body: ["Depthra focuses on computational depth estimation and spatial representation to help imaging systems understand distances, surfaces and three-dimensional environments."], project: "DEPTHRA SPATIAL MODEL", projectDetail: "Image + Depth Data → Three-Dimensional Scene Reconstruction → Spatial Mapping → Geometry Analysis", capabilities: ["Depth estimation", "Three-dimensional scene reconstruction", "Spatial mapping", "RGB-depth fusion", "Surface and geometry analysis", "Spatial data visualization"] },
  { id: "spectrava", number: "05", name: "SPECTRAVA", title: "Multispectral Imaging.", visual: "veridis", body: ["Spectrava explores imaging systems that combine information from different spectral bands to reveal characteristics not visible in conventional RGB images."], project: "SPECTRAVA SPECTRAL ENGINE", projectDetail: "Spectral Bands → Spectral-Image Processing → Sensor Fusion → Feature Analysis → Scientific Visualization", capabilities: ["Multispectral data analysis", "Spectral-image processing", "Spectral-band comparison", "Sensor-data fusion", "Scientific imaging workflows", "Spectral feature analysis"] },
  { id: "noctera", number: "06", name: "NOCTERA", title: "Low-Light Imaging.", visual: "oryon", body: ["Noctera focuses on computational imaging for low-light scenes, where noise, limited exposure and reduced visual detail affect image quality."], project: "NOCTERA LOW-LIGHT ENGINE", projectDetail: "Low-Light Capture → Noise and Exposure Analysis → Enhancement and Fusion → Detail Evaluation", capabilities: ["Low-light image enhancement", "Noise reduction", "Exposure fusion", "Detail reconstruction research", "Night-scene analysis", "Image-quality evaluation"] },
  { id: "thermara", number: "07", name: "THERMARA", title: "Thermal Imaging Intelligence.", visual: "lumenix", body: ["Thermara explores computational methods for processing thermal imagery and combining thermal information with other sensor modalities."], project: "THERMARA THERMAL INTELLIGENCE", projectDetail: "Thermal Data → Temperature Patterns → Thermal / RGB Fusion → Event and Scene Analysis", capabilities: ["Thermal-image processing", "Temperature-pattern visualization", "Thermal and RGB sensor fusion", "Thermal-event analysis", "Thermal-scene interpretation", "Industrial inspection research support"] },
  { id: "medivis", number: "08", name: "MEDIVIS", title: "Medical Imaging Intelligence.", visual: "fabric", body: ["Medivis organizes, visualizes and analyses medical imaging data in research environments."], project: "MEDIVIS RESEARCH IMAGING", projectDetail: "Medical Images → Processing and Multimodal Integration → Segmentation Research → Three-Dimensional Visualization", capabilities: ["Medical-image visualization", "Image-processing workflows", "Multimodal image integration", "Three-dimensional visualization", "Image segmentation research support", "Medical-imaging data organization"], notes: [{ title: "Clinical boundary", paragraphs: ["Medical applications require appropriate clinical validation and regulatory compliance before use in diagnosis or patient care."] }] },
  { id: "astravis", number: "09", name: "ASTRAVIS", title: "Astronomical Imaging.", visual: "nexora", body: ["Astravis explores computational imaging and data-analysis techniques for astronomical observation and scientific image processing."], project: "ASTRAVIS OBSERVATION ENGINE", projectDetail: "Observation Data → Multi-Frame Stacking → Noise Reduction → Image Reconstruction → Scientific Visualization", capabilities: ["Astronomical-image processing", "Multi-frame stacking", "Noise reduction", "Image reconstruction", "Scientific visualization", "Observation-data analysis"] },
  { id: "autovis", number: "10", name: "AUTOVIS", title: "Automotive Vision.", visual: "codelys", body: ["Autovis studies visual perception for automotive research, including scene interpretation, object movement and road-environment analysis."], project: "AUTOVIS ROAD SCENE ENGINE", projectDetail: "Camera Data → Road-Scene Understanding → Object and Motion Analysis → Visual Sensor Fusion → Driving-Scene Representation", capabilities: ["Road-scene understanding", "Vehicle and object detection research", "Motion analysis", "Camera-data processing", "Visual sensor fusion", "Driving-scene representation"], notes: [{ title: "Automotive safety boundary", paragraphs: ["Automotive safety applications require rigorous testing and validation before deployment in real vehicles."] }] },
  { id: "camora", number: "11", name: "CAMORA", title: "Camera Systems Engineering.", visual: "evolis", body: ["Camora focuses on camera-system integration, image acquisition, camera calibration and engineering workflows for reliable imaging systems."], project: "CAMORA CAMERA SYSTEM", projectDetail: "Camera Configuration → Calibration → Sensor Integration → Image-Acquisition Pipeline → Performance Evaluation and Testing", capabilities: ["Camera-system configuration", "Camera calibration", "Sensor integration", "Image-acquisition pipelines", "Camera performance evaluation", "Imaging-system testing"] },
  { id: "resona", number: "12", name: "RESONA", title: "Image Reconstruction Intelligence.", visual: "syndex", body: ["Resona explores computational methods for reconstructing and improving images when information is incomplete, blurred, noisy or captured across multiple frames."], project: "RESONA RECONSTRUCTION ENGINE", projectDetail: "Incomplete / Blurred / Noisy Frames → Reconstruction → Multi-Frame and Sensor Fusion → Image-Quality Assessment", capabilities: ["Image reconstruction research", "Super-resolution", "Motion-blur reduction", "Multi-frame fusion", "Missing-data reconstruction", "Sensor-fusion research", "Image-quality assessment"] },
  { id: "optiryn", number: "13", name: "OPTIRYN", title: "Computational Optics.", visual: "veridis", body: ["Optiryn explores how optical-system characteristics and computational processing can work together to improve imaging performance."], project: "OPTIRYN COMPUTATIONAL OPTICS", projectDetail: "Optical-System Model → Image Formation Analysis → Performance Simulation → Sensor Integration → Imaging Optimization", capabilities: ["Optical-system modelling", "Computational optics research", "Image formation analysis", "Optical performance simulation", "Optics and sensor integration", "Imaging-system optimization"] },
  { id: "imagena", number: "14", name: "IMAGENA", title: "Scientific Imaging Intelligence.", visual: "oryon", body: ["Imagena is a scientific-imaging research direction for computational analysis of images generated in scientific and experimental environments."], project: "IMAGENA SCIENTIFIC IMAGING", projectDetail: "Scientific Images → Computational Analysis → Reconstruction and Visualization → Research Interpretation", capabilities: ["Biology", "Materials science", "Microscopy", "Chemistry", "Astronomy", "Scientific image reconstruction", "Computational visualization"] },
];

const AEROSPACE_DOMAIN_PRODUCTS: IntelligenceProduct[] = [
  { id: "aeriona", number: "01", name: "AERIONA", title: "Flight Intelligence.", visual: "nexora", body: ["Aeriona focuses on computational flight intelligence and integrating aircraft-state, flight and mission information."], project: "AERIONA FLIGHT INTELLIGENCE", projectDetail: "Flight Data → Aircraft State → Performance Analysis → Mission Integration → Flight-Condition Visualization", capabilities: ["Flight-data analysis", "Aircraft-state modelling", "Flight-performance analysis", "Mission-data integration", "Intelligent flight-system research", "Flight-condition visualization"] },
  { id: "vayora", number: "02", name: "VAYORA", title: "Autonomous Aerial Systems.", visual: "codelys", body: ["Vayora explores software and computational architectures for uncrewed aerial systems, including perception, navigation support, mission planning and controlled autonomy research."], project: "VAYORA AERIAL SYSTEM", projectDetail: "Aerial-System Model → Sensor Integration → Mission Planning → Navigation Research → Controlled Autonomy → Performance Evaluation", capabilities: ["Aerial-system simulation", "Mission planning", "Sensor-data integration", "Navigation research", "Autonomous-system modelling", "Flight-performance evaluation"], notes: [{ title: "Safety and regulatory boundary", paragraphs: ["Real-world autonomous flight requires appropriate safety engineering, testing and regulatory approval."] }] },
  { id: "skyra", number: "03", name: "SKYRA", title: "Airspace Intelligence.", visual: "evolis", body: ["Skyra models airspace, aircraft movement, environmental conditions and mission coordination."], project: "SKYRA AIRSPACE MODEL", projectDetail: "Airspace + Aircraft Movement + Environment → Flight-Path Analysis → Traffic and Trajectory Visualization → Scenario Evaluation", capabilities: ["Airspace modelling", "Flight-path analysis", "Environmental data integration", "Traffic and trajectory visualization", "Mission coordination research", "Scenario-based evaluation"] },
  { id: "elyntra", number: "04", name: "ELYNTRA", title: "Electric Aerospace.", visual: "syndex", body: ["Elyntra investigates computational and engineering approaches for electric aerospace systems, including energy use, propulsion integration and flight-performance modelling."], project: "ELYNTRA ELECTRIC FLIGHT MODEL", projectDetail: "Propulsion + Battery + Mission → Energy and Thermal Model → Flight-Performance Simulation", capabilities: ["Electric propulsion modelling", "Energy-consumption analysis", "Battery-system integration research", "Flight-performance simulation", "Thermal and power modelling", "Mission-energy estimation"] },
  { id: "aerosyn", number: "05", name: "AEROSYN", title: "Aircraft Systems Engineering.", visual: "veridis", body: ["Aerosyn integrates aircraft-system engineering workflows to study relationships between avionics, propulsion, structures, controls and mission requirements."], project: "AEROSYN SYSTEMS MODEL", projectDetail: "Aircraft Systems → Engineering Data → Dependencies and Interfaces → Performance Analysis → Coordinated Workflow", capabilities: ["Aircraft-system modelling", "Engineering data integration", "System-dependency analysis", "Interface modelling", "Performance analysis", "Engineering workflow coordination"] },
  { id: "strativa", number: "06", name: "STRATIVA", title: "High-Altitude Systems.", visual: "oryon", body: ["Strativa explores aerospace platforms and computational models associated with high-altitude operation, environmental conditions and long-duration missions."], project: "STRATIVA ENVIRONMENT MODEL", projectDetail: "High-Altitude Conditions → Mission and Energy Estimates → Platform Performance → Environmental Simulation", capabilities: ["High-altitude environment modelling", "Atmospheric-condition analysis", "Mission planning research", "Energy and endurance estimation", "Platform-performance modelling", "Environmental simulation"] },
  { id: "avionex", number: "07", name: "AVIONEX", title: "Advanced Avionics.", visual: "lumenix", body: ["Avionex studies avionics architecture, embedded computing, system interfaces and computational methods for integrating information across aircraft subsystems."], project: "AVIONEX AVIONICS ARCHITECTURE", projectDetail: "Aircraft Subsystems → Sensor and Interface Integration → Data Processing → System Monitoring → Validation", capabilities: ["Avionics-system modelling", "Embedded-computing architecture", "Sensor and interface integration", "Data-processing workflows", "System monitoring", "Hardware-in-the-loop research support"], notes: [{ title: "Certification and safety", paragraphs: ["Operational aircraft avionics require rigorous verification, certification and safety validation."] }] },
  { id: "aerisys", number: "08", name: "AERISYS", title: "Aircraft Health Intelligence.", visual: "fabric", body: ["Aerisys explores aircraft-health monitoring through sensor readings, maintenance information, operating conditions and system-performance data."], project: "AERISYS AIRCRAFT HEALTH", projectDetail: "Aircraft Sensors + Maintenance + Operating Conditions → Condition Monitoring → Anomaly and Component Performance Analysis → Maintenance Insight", capabilities: ["Aircraft-condition monitoring", "Sensor-data analysis", "Anomaly-detection research", "Maintenance-data organization", "Component-performance tracking", "Predictive-maintenance research"] },
  { id: "mobilara", number: "09", name: "MOBILARA", title: "Advanced Air Mobility.", visual: "nexora", body: ["Mobilara explores coordination of emerging aerial transportation systems, including electric and autonomous vertical-flight concepts."], project: "MOBILARA AERIAL MOBILITY NETWORK", projectDetail: "Aircraft + Vertiports + Airspace + Weather + Energy + Passenger Demand → Mobility Model → Dynamic Routing → Capacity Planning", capabilities: ["Aerial-mobility modelling", "Airspace interaction analysis", "Route planning research", "Energy and infrastructure modelling", "Weather-data integration", "Capacity-planning support"] },
  { id: "strucora", number: "10", name: "STRUCORA", title: "Aerospace Structural Intelligence.", visual: "codelys", body: ["Strucora computationally models aircraft structures, materials, loads and degradation by combining simulation and data-driven methods."], project: "STRUCORA DIGITAL AIRFRAME", projectDetail: "Loads + Temperature + Vibration + Flight Cycles + Material State → Structural-Condition Intelligence", capabilities: ["Structural modelling", "Load analysis", "Material-behaviour research", "Vibration analysis", "Flight-cycle data integration", "Structural-condition intelligence"] },
  { id: "aeromorph", number: "11", name: "AEROMORPH", title: "Adaptive Aerospace.", visual: "evolis", body: ["Aeromorph is a frontier research direction exploring computational optimization of aircraft configurations, control strategies or operating parameters for changing missions and environments. This is a research concept, not a claim that Tarvyx currently develops adaptive or shape-changing aircraft."], project: "AEROMORPH ADAPTIVE FLIGHT", projectDetail: "Flight Profile + Control Strategy + Energy Usage + Aerodynamic Configuration → Computational Optimization → Validated Candidate", capabilities: ["Flight-profile optimization", "Control-strategy analysis", "Energy-use optimization", "Aerodynamic-configuration modelling", "Computational design exploration", "Safety-constrained optimization"] },
  { id: "flightlab", number: "12", name: "FLIGHTLAB", title: "Aerospace Simulation.", visual: "syndex", body: ["Flightlab is Tarvyx's proposed aerospace simulation and experimentation environment for aircraft, environments, propulsion, flight controls and mission scenarios.", "It provides a computational foundation for evaluating aerospace concepts before progressing toward physical prototypes."], project: "FLIGHTLAB DIGITAL FLIGHT ENGINE", projectDetail: "Aircraft Model + Environment + Propulsion + Control + Mission → Simulation → Scenario Generation → Performance Analysis → Optimization", capabilities: ["Aircraft digital modelling", "Flight-dynamics simulation", "Environmental simulation", "Propulsion modelling", "Flight-control experimentation", "Mission-scenario generation", "Performance analysis", "Computational optimization"] },
];

const SEMICONDUCTOR_DOMAIN: IntelligenceDomain = {
  id: "semiconductors",
  title: "Intelligent Semiconductor & Computing Systems",
  eyebrow: "TARVYX SEMICONDUCTORS",
  tagline: "Engineering the silicon foundations of intelligent technology.",
  introduction: [
    "Tarvyx Semiconductors is a proposed technology division focused on semiconductor architecture, intelligent computing hardware, embedded processing, sensor interfaces, memory systems and heterogeneous computing.",
    "The vision is to explore how specialized computing architectures can support artificial intelligence, automotive systems, robotics, imaging, aerospace and advanced scientific computation.",
    "The product concepts below define a proposed portfolio for future research and development. They are research directions or planned products until working prototypes and validated capabilities exist.",
  ],
  lifecycleTitle: "THE SEMICONDUCTOR ENGINEERING LIFECYCLE",
  lifecycleDescription: "From workload needs to validated intelligent computing architectures.",
  lifecycle: [
    { title: "Understand", detail: "Analyze workload and system requirements" },
    { title: "Architect", detail: "Map compute, memory and interfaces" },
    { title: "Model", detail: "Evaluate hardware and resource options" },
    { title: "Prototype", detail: "Explore with development platforms" },
    { title: "Measure", detail: "Benchmark performance, power and heat" },
    { title: "Validate", detail: "Assess reliability and system integration" },
  ],
  productHeading: "OUR SEMICONDUCTOR & COMPUTING PRODUCTS",
  productDescription: "A proposed portfolio spanning AI compute, vision, edge, automotive, robotics, memory, reliability and heterogeneous architectures.",
  products: SEMICONDUCTOR_DOMAIN_PRODUCTS,
  flagshipLabel: "FLAGSHIP SEMICONDUCTOR RESEARCH PLATFORM",
  flagshipTitle: "TITAN",
  flagshipSubtitle: "Tarvyx Intelligent Technology and Architecture Network",
  flagshipBody: ["TITAN is a proposed semiconductor research platform connecting processing architectures, memory systems, sensor interfaces, embedded computing and hardware-performance analysis.", "Its modular architecture explores how compute, intelligence, memory, connectivity, embedded systems, power, thermal limits and validation fit together."],
  architectureTitle: "TITAN ARCHITECTURE",
  architecture: [
    { title: "Compute Layer", description: "General-purpose processors and specialized accelerators." },
    { title: "Intelligence Layer", description: "AI inference and workload-specific processing." },
    { title: "Memory Layer", description: "Storage, memory hierarchy and bandwidth management." },
    { title: "Connectivity Layer", description: "Interfaces connecting processors, sensors and peripherals." },
    { title: "Embedded + Validation", description: "Real-time interfaces, power, thermal modelling and hardware validation." },
  ],
  architectureFlow: "Compute → Intelligence → Memory → Connectivity → Embedded Processing → Power and Thermal Analysis → Validation and Benchmarking",
  additionalResearch: [
    { title: "Advanced Project — MORPHIC", body: ["Modular Optimization and Reconfigurable Hardware Intelligence Concept. Morphic explores mapping workloads to suitable hardware architectures and how reconfigurable computing may support changing requirements."], flow: "Workload Analysis → Hardware Architecture Selection → Resource Allocation → Execution → Performance Measurement → Optimization" },
    { title: "Development Roadmap", body: ["Phase 1: build software architecture models, workload benchmarks and simulation tools. Phase 2: prototype embedded processing and sensor interfaces using development boards and commercial components. Phase 3: evaluate FPGA acceleration and hardware-software co-design. Phase 4: develop specialized prototypes and test power, thermal, reliability and performance. Phase 5: explore design partnerships, fabrication and validation. Phase 6: progress toward commercial hardware when engineering and manufacturing requirements are met."] },
    { title: "Website Content", body: ["Tarvyx explores specialized computing architectures, embedded processing, AI acceleration, sensor interfaces and heterogeneous computing to support intelligent devices and advanced computational systems. From edge intelligence to future computing architectures, our vision is to connect hardware innovation with intelligent software."] },
  ],
  portfolio: [
    { product: "Neuronex", direction: "AI compute architecture" }, { product: "Visilyx", direction: "Intelligent vision processing" },
    { product: "Edgexa", direction: "Edge computing systems" }, { product: "Autonex", direction: "Automotive semiconductor systems" },
    { product: "Rovix", direction: "Robotics compute systems" }, { product: "Memryx", direction: "Memory intelligence" },
    { product: "Trusil", direction: "Semiconductor reliability intelligence" }, { product: "Hetrix", direction: "Heterogeneous computing" },
    { product: "Qubrix", direction: "Quantum computing interfaces" }, { product: "Biosil", direction: "Biomedical semiconductor systems" },
    { product: "Neurosil", direction: "Neuromorphic computing research" }, { product: "Comnexa", direction: "Semiconductor connectivity" },
    { product: "Envirox", direction: "Power and thermal intelligence" },
  ],
  vision: ["Tarvyx explores specialized computing architectures, embedded processing, AI acceleration, sensor interfaces and heterogeneous computing to support the next generation of intelligent devices and advanced computational systems."],
  visionTagline: "Intelligent Semiconductor & Computing Systems — Connecting hardware innovation with intelligent software.",
  action: "Explore Semiconductor Intelligence",
};

const PHARMA_DOMAIN: IntelligenceDomain = {
  id: "pharmaceuticals",
  title: "Pharmaceutical & Therapeutic Sciences",
  eyebrow: "TARVYX PHARMACEUTICALS",
  tagline: "Discovering, developing and manufacturing the medicines of tomorrow.",
  introduction: [
    "Tarvyx Pharmaceuticals combines artificial intelligence, biological science, computational discovery and pharmaceutical engineering to advance therapeutic research from scientific hypothesis to validated medicine.",
    "Our vision connects computational drug discovery, molecular science, biological modelling, clinical development, pharmaceutical manufacturing and advanced therapeutic research.",
    "We aim to transform how potential medicines are discovered, evaluated, developed and manufactured through intelligent scientific systems and data-driven research.",
  ],
  lifecycleTitle: "THE THERAPEUTIC DEVELOPMENT LIFECYCLE",
  lifecycleDescription: "From scientific discovery to validated development pathways.",
  lifecycle: [
    { title: "Discover", detail: "Integrate scientific data and biological knowledge" },
    { title: "Model", detail: "Study molecular and cellular systems" },
    { title: "Evaluate", detail: "Prioritize candidates and evidence" },
    { title: "Develop", detail: "Coordinate clinical and therapeutic research" },
    { title: "Manufacture", detail: "Connect validated processes and quality" },
    { title: "Verify", detail: "Support evidence, controls and regulatory pathways" },
  ],
  productHeading: "OUR PHARMACEUTICAL & THERAPEUTIC PRODUCTS",
  productDescription: "A proposed research ecosystem connecting computational discovery, molecular science, clinical development, manufacturing, quality and research infrastructure.",
  products: PHARMA_DOMAIN_PRODUCTS,
  flagshipLabel: "FLAGSHIP THERAPEUTIC DEVELOPMENT PLATFORM",
  flagshipTitle: "HELIX-P",
  flagshipSubtitle: "Integrated Therapeutic Development",
  flagshipBody: ["HELIX-P is Tarvyx Pharmaceuticals' proposed integrated therapeutic-development ecosystem, connecting discovery, molecular science, biological modelling, clinical development, manufacturing and quality.", "The proposed business pathways include medicine development, licensing, co-development, contract research and scientific-platform services, and manufacturing or distribution partnerships subject to required approvals."],
  architectureTitle: "HELIX-P INTEGRATED ARCHITECTURE",
  architecture: [
    { title: "Scientific Reasoning", description: "Organize scientific evidence and research questions." },
    { title: "Discovery + Molecular Science", description: "Connect Biovanta discovery with Moleq molecular research." },
    { title: "Biological + Clinical Research", description: "Integrate Cellora modelling and Clinova development intelligence." },
    { title: "Manufacturing + Quality", description: "Connect Pharmora manufacturing and Qualyx quality workflows." },
    { title: "Integrated Development", description: "Coordinate the therapeutic-development ecosystem." },
  ],
  architectureFlow: "Scientific Reasoning → BIOVANTA → Drug Discovery → MOLEQ → Molecular Science → CELLORA → Cellular Modelling → CLINOVA → Clinical Development → PHARMORA → Manufacturing → HELIX-P → Integrated Therapeutic Development",
  additionalResearch: [
    { title: "Development Roadmap", body: ["Phase 1: build BIOVANTA using appropriate public, licensed or synthetic datasets. Phase 2: develop MOLEQ for molecular modelling and research. Phase 3: establish a bioresearch lab with qualified scientists and suitable infrastructure. Phase 4: progress toward target validation, preclinical research and candidate selection. Phase 5: develop formulation, manufacturing and quality capabilities. Phase 6: establish clinical-development and regulatory pathways. Phase 7: pursue commercialization and suitable pharmaceutical partnerships."] },
    { title: "Business Model", body: ["Potential pathways include proprietary medicine development and commercialization; licensing validated candidates and research technologies; co-development partnerships; contract research and scientific-platform services; pharmaceutical manufacturing subject to required approvals; and pharmaceutical supply and distribution partnerships."] },
    { title: "Website Content", body: ["Tarvyx combines artificial intelligence, biological science, computational discovery and pharmaceutical engineering to advance therapeutic research from scientific hypothesis to validated medicine. Product and research capabilities should be represented according to validated development status and applicable clinical and regulatory requirements."] },
  ],
  portfolio: [
    { product: "Biovanta", direction: "Computational drug discovery" }, { product: "Moleq", direction: "Molecular science" },
    { product: "Cellora", direction: "Cellular modelling" }, { product: "Genova", direction: "Genomic intelligence" },
    { product: "Clinova", direction: "Clinical development intelligence" }, { product: "Theravia", direction: "Therapeutic development" },
    { product: "Formera", direction: "Pharmaceutical sciences" }, { product: "Pharmora", direction: "Pharmaceutical manufacturing" },
    { product: "Qualyx", direction: "Pharmaceutical quality intelligence" }, { product: "Viventa", direction: "Medical evidence intelligence" },
    { product: "Immunova", direction: "Immunology research" }, { product: "Regenara", direction: "Regenerative science" },
    { product: "Q-Molecule", direction: "Quantum molecular research" }, { product: "Laboris", direction: "Autonomous research infrastructure" },
    { product: "HELIX-P", direction: "Integrated therapeutic development" },
  ],
  vision: ["Tarvyx aims to advance therapeutic research by connecting computational discovery, biological science, clinical evidence, pharmaceutical engineering and validated development pathways."],
  visionTagline: "Pharmaceutical & Therapeutic Sciences — Discovering, developing and manufacturing the medicines of tomorrow.",
  action: "Explore Pharmaceutical Sciences",
};

const IMAGING_DOMAIN: IntelligenceDomain = {
  id: "imaging",
  title: "Intelligent Imaging & Computational Vision",
  eyebrow: "TARVYX CAMERA & IMAGING",
  tagline: "Engineering imaging systems that perceive, interpret and understand the world.",
  introduction: [
    "Tarvyx Camera & Imaging focuses on the convergence of optics, computational imaging, sensor fusion, machine perception and intelligent image processing.",
    "We explore systems that understand visual information, reconstruct missing details, interpret motion, combine sensor modalities and develop richer representations of real-world environments.",
    "From advanced imaging architectures to scientific visualization and intelligent camera systems, Tarvyx aims to develop computational technologies for the next generation of imaging.",
  ],
  lifecycleTitle: "THE COMPUTATIONAL IMAGING LIFECYCLE",
  lifecycleDescription: "From optical capture to contextual visual understanding.",
  lifecycle: [
    { title: "Capture", detail: "Acquire optical and sensor information" },
    { title: "Fuse", detail: "Combine compatible sensor modalities" },
    { title: "Process", detail: "Enhance, reconstruct and interpret images" },
    { title: "Represent", detail: "Model depth, motion and scene structure" },
    { title: "Understand", detail: "Interpret objects, events and context" },
    { title: "Adapt", detail: "Refine sensing and processing to conditions" },
  ],
  productHeading: "OUR IMAGING & COMPUTATIONAL VISION PRODUCTS",
  productDescription: "A broad research portfolio across computational imaging, cognitive cameras, spatial, spectral, thermal, medical and scientific vision.",
  products: IMAGING_DOMAIN_PRODUCTS,
  flagshipLabel: "FLAGSHIP IMAGING PROJECT",
  flagshipTitle: "SPECTRA",
  flagshipSubtitle: "Self-Perceiving Computational Technology for Real-world Advanced Imaging",
  flagshipBody: ["SPECTRA is Tarvyx's proposed intelligent imaging architecture, combining optical capture, multisensor inputs, computational imaging, spatial understanding and machine perception in a modular system.", "Expected outputs may include images, depth and motion information, object and scene representations, event descriptions, material-related visual clues, environmental-state estimates and uncertainty information."],
  architectureTitle: "SPECTRA ARCHITECTURE",
  architecture: [
    { title: "Optical Layer", description: "Lens, optics and image acquisition." },
    { title: "Multisensor + Fusion", description: "RGB, depth, thermal and compatible sensor inputs." },
    { title: "Computational Imaging", description: "Enhancement, reconstruction, image fusion and processing." },
    { title: "Edge Intelligence", description: "Local visual analysis and intelligent processing." },
    { title: "Spatial + Understanding", description: "Represent scene geometry, objects, relations, events and context." },
  ],
  architectureFlow: "Optical Capture → Multisensor Inputs → Sensor Fusion → Computational Imaging → Edge Intelligence → Spatial and Scene Model → Machine Understanding",
  additionalResearch: [
    { title: "Flagship Research Concept — Cognitive Camera", body: ["The Cognitive Camera connects image capture with contextual interpretation. Instead of producing only an image, the system aims to generate a richer scene representation: what is present, how elements relate, how they move and what changes over time."] },
    { title: "Advanced Project — AURA", body: ["Adaptive Unified Reality Acquisition explores imaging systems that adjust sensing and computational processing according to environmental conditions and imaging requirements."], items: ["Scene-condition assessment", "Adaptive sensor selection", "Exposure and imaging optimization", "Multisensor coordination", "Computational resource management", "Image-quality feedback"] },
    { title: "Website Content", body: ["Tarvyx explores computational imaging, intelligent cameras, multisensor fusion, spatial perception and scientific image reconstruction to transform visual data into richer computational understanding."] },
  ],
  portfolio: [
    { product: "Lumevra", direction: "Computational imaging" }, { product: "Neuricam", direction: "Cognitive camera intelligence" },
    { product: "Eventra", direction: "Event-based vision" }, { product: "Depthra", direction: "Depth and spatial imaging" },
    { product: "Spectrava", direction: "Multispectral imaging" }, { product: "Noctera", direction: "Low-light imaging" },
    { product: "Thermara", direction: "Thermal imaging intelligence" }, { product: "Medivis", direction: "Medical imaging intelligence" },
    { product: "Astravis", direction: "Astronomical imaging" }, { product: "Autovis", direction: "Automotive vision" },
    { product: "Camora", direction: "Camera systems engineering" }, { product: "Resona", direction: "Image reconstruction intelligence" },
    { product: "Optiryn", direction: "Computational optics" }, { product: "Imagena", direction: "Scientific imaging intelligence" },
    { product: "SPECTRA", direction: "Flagship imaging architecture" }, { product: "Cognitive Camera / AURA", direction: "Frontier imaging research" },
  ],
  vision: ["Our vision is to transform visual data into richer computational understanding—from adaptive camera architectures to advanced imaging research."],
  visionTagline: "Intelligent Imaging & Computational Vision — Engineering imaging systems that perceive, interpret and understand the world.",
  action: "Explore Camera & Imaging",
};

const AEROSPACE_DOMAIN: IntelligenceDomain = {
  id: "aerospace",
  title: "Aerospace Intelligence & Flight Systems",
  eyebrow: "TARVYX AEROSPACE",
  tagline: "Engineering intelligent systems for the future of flight.",
  introduction: [
    "Tarvyx Aerospace explores advanced aerospace engineering, flight simulation, avionics, embedded intelligence, aircraft-system modelling and intelligent mission technologies.",
    "Our vision connects computational engineering, simulation, autonomous-system research and aerospace technologies to support safer, more efficient and more intelligent flight systems.",
    "The initial focus is on software, simulation, computational models and engineering tools, followed by controlled prototyping and validation.",
  ],
  lifecycleTitle: "THE AEROSPACE ENGINEERING LIFECYCLE",
  lifecycleDescription: "From digital aircraft models to controlled and validated engineering.",
  lifecycle: [
    { title: "Model", detail: "Represent aircraft, systems and environment" },
    { title: "Integrate", detail: "Connect propulsion, avionics and structure" },
    { title: "Simulate", detail: "Evaluate flight, mission and scenarios" },
    { title: "Analyze", detail: "Assess performance, energy and risk" },
    { title: "Prototype", detail: "Test selected hardware in controlled settings" },
    { title: "Validate", detail: "Prepare appropriate verification pathways" },
  ],
  productHeading: "OUR AEROSPACE INTELLIGENCE PRODUCTS",
  productDescription: "A proposed engineering portfolio spanning flight intelligence, uncrewed systems, avionics, aircraft health, mobility and simulation.",
  products: AEROSPACE_DOMAIN_PRODUCTS,
  flagshipLabel: "FLAGSHIP AEROSPACE PROJECT",
  flagshipTitle: "SKYLARK",
  flagshipSubtitle: "Smart Knowledge & Intelligent Learning Architecture for Resilient Aerospace Research",
  flagshipBody: ["SKYLARK is Tarvyx Aerospace's proposed foundational engineering environment, designed to connect aircraft models, simulation, intelligent systems, sensor models, mission planning and hardware-in-the-loop development.", "Its workflow supports computational evaluation and flight-test preparation before any physical flight testing."],
  architectureTitle: "SKYLARK ARCHITECTURE",
  architecture: [
    { title: "Aircraft Digital Model", description: "Computational representation of the aircraft and major systems." },
    { title: "Propulsion + Avionics", description: "Model propulsion behaviour and onboard system interfaces." },
    { title: "Structure + Flight Dynamics", description: "Represent material behaviour, aircraft motion and response." },
    { title: "Environment + Mission", description: "Model atmospheric conditions, requirements and constraints." },
    { title: "Simulation + Validation", description: "Evaluate virtually, test controlled hardware and prepare flight tests." },
  ],
  architectureFlow: "Aircraft Digital Model → Propulsion / Avionics / Structure → Flight Dynamics → Environment Model → Mission Intelligence → Simulation → Hardware-in-the-Loop → Flight-Test Preparation",
  additionalResearch: [
    { title: "Frontier Project — AETHERFLIGHT", body: ["Aetherflight explores moving selected mission reasoning and computational capabilities closer to the aircraft while maintaining defined operational boundaries. Research includes onboard computation, autonomy, navigation and communications, environmental modelling, mission-state analysis, embedded intelligence, safety constraints and human authority."] },
    { title: "Aerospace-to-Space Project — HORIZON-X", body: ["Horizon-X is a proposed research direction connecting aerospace systems, uncrewed aerial platforms, launch systems and future orbital technologies through reusable engineering capabilities."], flow: "Aircraft + Uncrewed Aerial Systems + Launch Systems → Shared Aerospace Engineering → Autonomous Systems → Space and Orbital Systems" },
    { title: "Development Roadmap", body: ["Phase 1 — Simulation Foundation: Flightlab with a virtual aircraft and environment, sensor simulation, flight-dynamics model, scenario generator and evaluation framework. Phase 2 — Data Integration: suitable real sensor datasets, complex environments and validation scenarios. Phase 3 — Controlled Hardware Prototypes: physical sensor platforms, embedded hardware and hardware-in-the-loop in controlled environments. Phase 4 — Research Partnerships and validation pathways. Phase 5 — Explore advanced aerospace and space technologies when expertise, infrastructure and regulatory requirements are available."] },
    { title: "Website Content", body: ["Tarvyx explores aerospace simulation, avionics, flight intelligence, embedded computing and advanced mission systems. From digital aircraft models to intelligent flight research, our vision connects computational engineering with the future of flight."] },
  ],
  portfolio: [
    { product: "Aeriona", direction: "Flight intelligence" }, { product: "Vayora", direction: "Autonomous aerial systems" },
    { product: "Skyra", direction: "Airspace intelligence" }, { product: "Elyntra", direction: "Electric aerospace" },
    { product: "Aerosyn", direction: "Aircraft systems engineering" }, { product: "Strativa", direction: "High-altitude systems" },
    { product: "Avionex", direction: "Advanced avionics" }, { product: "Aerisys", direction: "Aircraft health intelligence" },
    { product: "Mobilara", direction: "Advanced air mobility" }, { product: "Strucora", direction: "Aerospace structural intelligence" },
    { product: "Aeromorph", direction: "Adaptive aerospace research" }, { product: "Flightlab", direction: "Aerospace simulation" },
    { product: "SKYLARK", direction: "Foundational engineering platform" }, { product: "Aetherflight", direction: "Frontier research" },
    { product: "Horizon-X", direction: "Aerospace-to-space research" },
  ],
  vision: ["Tarvyx explores aerospace simulation, avionics, flight intelligence, embedded computing and advanced mission systems to support the next generation of aerospace technologies."],
  visionTagline: "Aerospace Intelligence & Flight Systems — Connecting computational engineering with the future of flight.",
  action: "Explore Aerospace",
};

const PRODUCT_ACCENTS = {
  violet: { border: "border-violet-300/45", soft: "bg-violet-400/10", text: "text-violet-200", glow: "shadow-[0_0_32px_rgba(167,139,250,0.16)]" },
  cyan: { border: "border-cyan-300/45", soft: "bg-cyan-400/10", text: "text-cyan-200", glow: "shadow-[0_0_32px_rgba(34,211,238,0.16)]" },
  emerald: { border: "border-emerald-300/45", soft: "bg-emerald-400/10", text: "text-emerald-200", glow: "shadow-[0_0_32px_rgba(52,211,153,0.16)]" },
  amber: { border: "border-amber-300/45", soft: "bg-amber-400/10", text: "text-amber-200", glow: "shadow-[0_0_32px_rgba(251,191,36,0.16)]" },
  pink: { border: "border-pink-300/45", soft: "bg-pink-400/10", text: "text-pink-200", glow: "shadow-[0_0_32px_rgba(244,114,182,0.16)]" },
  blue: { border: "border-blue-300/45", soft: "bg-blue-400/10", text: "text-blue-200", glow: "shadow-[0_0_32px_rgba(96,165,250,0.16)]" },
} as const;

function SoftwareEngineeringPanel() {
  return (
    <div className="software-engineering-page -mx-4 space-y-0 sm:-mx-6 md:-mx-8 lg:-mx-10">
      <section className="software-hero relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="max-w-xl">
            <div className="software-eyebrow">OUR CORE SERVICES</div>
            <h3 className="mt-4 font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] text-white">Software <span className="text-[var(--software-coral)]">Intelligence</span></h3>
            <div className="mt-4 font-display text-xl font-medium leading-snug text-white sm:text-2xl">Engineering systems that build, understand, evolve, and operate software.</div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">TarvyX develops next-generation software intelligence technologies that connect human intent, architecture, code, verification and runtime behaviour into intelligent engineering systems.</p>
            <a href="#software-products" className="software-primary-action mt-7 inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40"><HiOutlineArrowRight className="h-4 w-4" /></span>
              Explore Our Technology
            </a>
          </div>

          <div className="software-core-visual-wrap relative mx-auto w-full max-w-[650px]">
            <LazySoftwareVisual kind="core" label="Rotating interconnected glass cubes surrounding the official TarvyX logo" className="h-[300px] sm:h-[390px] lg:h-[450px]" />
          </div>
        </div>
      </section>

      <section className="software-lifecycle border-y border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">THE ENGINEERING LIFECYCLE</div>
          <h3 className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">From human intent to continuously evolving software.</h3>
          <div className="software-lifecycle-track mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {SOFTWARE_LIFECYCLE.map((stage, index) => (
              <div key={stage.title} className="relative flex flex-col items-center text-center">
                <div className="software-lifecycle-node"><stage.icon className="h-5 w-5" /></div>
                <div className="software-lifecycle-copy">
                  <h4 className="mt-3 text-sm font-semibold text-white">{stage.title}</h4>
                  <p className="mt-1 max-w-32 text-xs leading-5 text-white/55">{stage.detail}</p>
                </div>
                {index < SOFTWARE_LIFECYCLE.length - 1 && <span className="software-lifecycle-link" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="software-products" className="software-products px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">OUR SOFTWARE INTELLIGENCE PRODUCTS</div>
          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Six intelligent systems.<br />One engineering vision.</h3>
            <p className="max-w-md text-sm leading-6 text-white/55">Each product focuses on a key part of the software lifecycle, working towards a unified Software Intelligence Fabric.</p>
          </div>

          <div className="software-timeline relative mt-10 space-y-10 md:space-y-0">
            {SOFTWARE_PRODUCTS.map((product, index) => {
              const visualFirst = index % 2 === 1;
              return (
                <article id={`software-product-${product.id}`} key={product.id} className="software-product-row relative grid grid-cols-[30px_minmax(0,1fr)] gap-x-3 gap-y-4 md:min-h-[330px] md:grid-cols-[minmax(0,1fr)_76px_minmax(0,1fr)] md:gap-x-0 md:gap-y-0">
                  <div className={`software-product-copy min-w-0 ${visualFirst ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className={`software-product-number ${index % 2 ? "is-blue" : ""}`}>{product.number}</span>
                      <h4 className={`font-display text-2xl font-bold ${index % 2 ? "text-[var(--software-blue)]" : "text-[var(--software-coral)]"}`}>{product.name}</h4>
                      <span className="software-status-pill">{product.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{product.title}</p>
                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{product.body}</p>
                    <div className="mt-3 border-l-2 border-[var(--software-coral)]/50 pl-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">{product.project}</div>
                      <p className="mt-1 text-[11px] leading-5 text-white/65">{product.projectDetail}</p>
                    </div>
                    <p className="software-commercial mt-2"><span>COMMERCIAL DIRECTION</span>{product.commercial}</p>
                    <ul className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {product.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{capability}</li>)}
                    </ul>
                    <a href={`#software-product-${product.id}`} aria-label={`Explore ${product.name}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore <HiOutlineArrowRight className="h-3.5 w-3.5" /></a>
                  </div>

                  <div className="software-product-marker row-start-1 col-start-1 md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span>{product.number}</span>
                    <i />
                  </div>

                  <LazySoftwareVisual kind={product.visual} label={`${product.name}: ${product.project}`} className={`software-product-visual col-start-2 row-start-2 h-[190px] w-full md:col-span-1 md:row-start-1 md:h-[280px] ${visualFirst ? "md:col-start-1" : "md:col-start-3"}`} />
                </article>
              );
            })}
          </div>

          <div id="software-productization" className="mt-8 border-y border-white/10 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div><div className="software-eyebrow">PRODUCTIZATION PATH</div><p className="mt-1 text-sm text-white/70">Research → MVP → Product → Platform</p></div>
              <div className="flex flex-wrap gap-2">{["Developer", "Team", "Business", "Enterprise", "Private Deployment", "API / Platform"].map((tier) => <span key={tier} className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/65">{tier}</span>)}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-[0.12em] text-white/45">{["Phase 1 · Nexora Software Graph", "Phase 2 · Codelys Intent Engine", "Phase 3 · Veridis Behaviour Engine", "Phase 4 · Syndex Software Twin", "Then · Software Intelligence Fabric"].map((phase) => <span key={phase}>{phase}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="software-intelligence-fabric" className="software-fabric relative overflow-hidden border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="software-eyebrow">THE BIGGER PICTURE</div>
            <h3 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">TarvyX Software Intelligence Fabric</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">A unified intelligence layer capable of understanding software from human intent all the way to production behaviour.</p>
            <span className="mt-4 inline-flex rounded-full border border-[var(--software-blue)]/40 bg-[var(--software-blue)]/10 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-[var(--software-blue)]">SIF-01</span>
            <a href="#software-products" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore the Vision <HiOutlineArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="software-fabric-visual-wrap relative">
            <LazySoftwareVisual kind="fabric" label="Orbital sphere representing the TarvyX Software Intelligence Fabric" className="h-[300px] sm:h-[420px] lg:h-[500px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

function AIMachineLearningPanel() {
  return (
    <div className="software-engineering-page -mx-4 space-y-0 sm:-mx-6 md:-mx-8 lg:-mx-10">
      <section className="software-hero relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="max-w-xl">
            <div className="software-eyebrow">OUR CORE TECHNOLOGIES</div>
            <h3 className="mt-4 font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] text-white">Advanced Machine Intelligence</h3>
            <div className="mt-4 font-display text-xl font-medium leading-snug text-white sm:text-2xl">Building learning systems that perceive, reason, adapt and discover.</div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">TarvyX develops advanced machine intelligence systems that move beyond conventional model training and prediction. Our work explores adaptive learning, multimodal perception, machine reasoning, generative intelligence, continual learning and intelligent models capable of operating across changing environments.</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">We engineer AI systems not only to recognize patterns, but to learn from experience, construct knowledge, understand context, reason over complex information and continuously improve their capabilities. From foundational intelligence engines to specialized machine intelligence for real-world environments, TarvyX is building the computational foundations for the next generation of intelligent systems.</p>
            <a href="#machine-intelligence-products" className="software-primary-action mt-7 inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40"><HiOutlineArrowRight className="h-4 w-4" /></span>
              Explore Our Intelligence
            </a>
          </div>

          <div className="software-core-visual-wrap relative mx-auto w-full max-w-[650px]">
            <LazySoftwareVisual kind="core" label="TarvyX Machine Intelligence core surrounded by connected intelligence systems" className="h-[300px] sm:h-[390px] lg:h-[450px]" />
          </div>
        </div>
      </section>

      <section className="software-lifecycle border-y border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">THE MACHINE INTELLIGENCE LIFECYCLE</div>
          <h3 className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">From complex inputs to continuously adapting intelligence.</h3>
          <div className="software-lifecycle-track mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {AI_LIFECYCLE.map((stage, index) => (
              <div key={stage.title} className="relative flex flex-col items-center text-center">
                <div className="software-lifecycle-node"><stage.icon className="h-5 w-5" /></div>
                <div className="software-lifecycle-copy">
                  <h4 className="mt-3 text-sm font-semibold text-white">{stage.title}</h4>
                  <p className="mt-1 max-w-32 text-xs leading-5 text-white/55">{stage.detail}</p>
                </div>
                {index < AI_LIFECYCLE.length - 1 && <span className="software-lifecycle-link" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="machine-intelligence-products" className="software-products px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">OUR MACHINE INTELLIGENCE SYSTEMS</div>
          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Seven intelligent systems.<br />One machine intelligence vision.</h3>
          </div>

          <div className="software-timeline relative mt-10 space-y-10 md:space-y-0">
            {AI_PRODUCTS.map((product, index) => {
              const visualFirst = index % 2 === 1;
              return (
                <article id={`machine-intelligence-product-${product.id}`} key={product.id} className="software-product-row relative grid grid-cols-[30px_minmax(0,1fr)] gap-x-3 gap-y-4 md:min-h-[330px] md:grid-cols-[minmax(0,1fr)_76px_minmax(0,1fr)] md:gap-x-0 md:gap-y-0">
                  <div className={`software-product-copy min-w-0 ${visualFirst ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className={`software-product-number ${index % 2 ? "is-blue" : ""}`}>{product.number}</span>
                      <h4 className={`font-display text-2xl font-bold ${index % 2 ? "text-[var(--software-blue)]" : "text-[var(--software-coral)]"}`}>{product.name}</h4>
                      <span className="software-status-pill">{product.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{product.title}</p>
                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{product.body}</p>
                    <div className="mt-3 border-l-2 border-[var(--software-coral)]/50 pl-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">{product.project}</div>
                      <p className="mt-1 text-[11px] leading-5 text-white/65">{product.projectDetail}</p>
                    </div>
                    {product.commercial && <p className="software-commercial mt-2"><span>COMMERCIAL POSITIONING</span>{product.commercial}</p>}
                    <ul className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {product.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{capability}</li>)}
                    </ul>
                    {product.applications && (
                      <div className="mt-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">{product.id === "perceva" ? "ADVANCED APPLICATIONS" : product.id === "hypera" ? "POTENTIAL APPLICATIONS" : "COMMERCIAL APPLICATIONS"}</div>
                        <ul className="mt-1 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                          {product.applications.map((application) => <li key={application} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{application}</li>)}
                        </ul>
                      </div>
                    )}
                    <a href={`#machine-intelligence-product-${product.id}`} aria-label={`Explore ${product.name}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore <HiOutlineArrowRight className="h-3.5 w-3.5" /></a>
                  </div>

                  <div className="software-product-marker row-start-1 col-start-1 md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span>{product.number}</span>
                    <i />
                  </div>

                  <LazySoftwareVisual kind={product.visual} label={`${product.name}: ${product.project}`} className={`software-product-visual col-start-2 row-start-2 h-[190px] w-full md:col-span-1 md:row-start-1 md:h-[280px] ${visualFirst ? "md:col-start-1" : "md:col-start-3"}`} />
                </article>
              );
            })}
          </div>

          <div className="mt-8 border-y border-white/10 py-5">
            <div className="software-eyebrow">DEVELOPMENT PRIORITY</div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-[0.12em] text-white/55">
              {["1 · Omnexa multimodal foundation", "2 · Neurix adaptive learning", "3 · Synvora uncertainty and novelty", "4 · Perceva machine perception", "5 · Kynara experience learning", "6 · Hypera discovery and optimization"].map((priority) => <span key={priority}>{priority}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="machine-intelligence-engine" className="software-fabric relative overflow-hidden border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="software-eyebrow">THE FLAGSHIP PROJECT</div>
            <h3 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">TarvyX Machine Intelligence Engine</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">The computational foundation for adaptive, contextual and evolving intelligence. A modular architecture for perception, learning, memory, adaptation, uncertainty estimation and reasoning.</p>
            <span className="mt-4 inline-flex rounded-full border border-[var(--software-blue)]/40 bg-[var(--software-blue)]/10 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-[var(--software-blue)]">MIE-01</span>
          </div>
          <div className="software-fabric-visual-wrap relative">
            <LazySoftwareVisual kind="fabric" label="TarvyX Machine Intelligence Engine architecture core" className="h-[300px] sm:h-[420px] lg:h-[500px]" />
            <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/45 p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                {["Perception", "Learning", "Memory"].map((component) => <span key={component} className="rounded-md border border-[var(--software-blue)]/30 bg-[var(--software-blue)]/10 px-2 py-2 text-center text-[10px] text-white/80">{component}</span>)}
              </div>
              <div className="py-1 text-center text-xs text-[var(--software-blue)]" aria-hidden="true">↓</div>
              <div className="grid grid-cols-2 gap-2">
                {["Context", "Reasoning"].map((component) => <span key={component} className="rounded-md border border-[var(--software-coral)]/30 bg-[var(--software-coral)]/10 px-2 py-2 text-center text-[10px] text-white/80">{component}</span>)}
              </div>
              <div className="py-1 text-center text-xs text-[var(--software-blue)]" aria-hidden="true">↓</div>
              <div className="grid grid-cols-3 gap-2">
                {["Uncertainty", "Decision", "Action"].map((component) => <span key={component} className="rounded-md border border-[var(--software-blue)]/30 bg-[var(--software-blue)]/10 px-2 py-2 text-center text-[10px] text-white/80">{component}</span>)}
              </div>
              <div className="py-1 text-center text-xs text-[var(--software-coral)]" aria-hidden="true">↓</div>
              <div className="rounded-md border border-[var(--software-coral)]/30 bg-[var(--software-coral)]/10 px-2 py-2 text-center text-[10px] text-white/80">Experience <span className="px-1 text-[var(--software-coral)]" aria-label="feeds back to">↻</span> Learning</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">WHERE THIS CONNECTS WITH THE AAI VISION</div>
          <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">One connected TarvyX intelligence vision.</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">Advanced Intelligence and Machine Intelligence connect through TarvyX Intelligence, alongside software, robotics and science intelligence.</p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6">
            <div className="mx-auto max-w-xs rounded-lg border border-[var(--software-coral)]/40 bg-[var(--software-coral)]/10 px-4 py-3 text-center font-display text-lg font-semibold text-white">TARVYX</div>
            <div className="py-2 text-center text-xs text-[var(--software-blue)]" aria-hidden="true">↓</div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 p-4">
                <h4 className="font-mono text-xs tracking-[0.15em] text-[var(--software-coral)]">ADVANCED INTELLIGENCE (AAI)</h4>
                <div className="mt-3 flex flex-wrap gap-2">{["AIONYX", "AEVORA", "EIDORA"].map((system) => <span key={system} className="rounded-full border border-[var(--software-coral)]/30 px-3 py-1.5 text-xs text-white/80">{system}</span>)}</div>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <h4 className="font-mono text-xs tracking-[0.15em] text-[var(--software-blue)]">MACHINE INTELLIGENCE</h4>
                <div className="mt-3 flex flex-wrap gap-2">{["NEURIX", "PERCEVA", "KYNARA", "OMNEXA", "SYNVORA", "HYPERA", "LUMENIX"].map((system) => <span key={system} className="rounded-full border border-[var(--software-blue)]/30 px-3 py-1.5 text-xs text-white/80">{system}</span>)}</div>
              </div>
            </div>
            <div className="py-2 text-center text-xs text-[var(--software-blue)]" aria-hidden="true">↓</div>
            <div className="mx-auto max-w-md rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-center font-display text-lg font-semibold text-white">TARVYX INTELLIGENCE</div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {["Software Intelligence", "Robotics Intelligence", "Science Intelligence"].map((area) => <div key={area} className="rounded-lg border border-white/10 px-3 py-3 text-center text-xs text-white/75">{area}</div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AutomotivePanel() {
  return (
    <div className="software-engineering-page -mx-4 space-y-0 sm:-mx-6 md:-mx-8 lg:-mx-10">
      <section className="software-hero relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="max-w-xl">
            <div className="software-eyebrow">OUR CORE SERVICES</div>
            <h3 className="mt-4 font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] text-white">Automotive Intelligence &amp; Mobility Systems</h3>
            <div className="mt-4 font-display text-xl font-medium leading-snug text-white sm:text-2xl">Engineering intelligence for vehicles that perceive, reason, predict and adapt.</div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">TarvyX develops advanced automotive intelligence systems spanning vehicle perception, predictive intelligence, software-defined vehicles, simulation, embedded intelligence and autonomous mobility.</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">Our work focuses on the transition from vehicles that execute predefined functions to vehicles that can understand their environment, reason about changing conditions, anticipate system behaviour and continuously improve through validated software intelligence. From intelligent vehicle architectures and perception systems to simulation-driven engineering and autonomous mobility infrastructure, TarvyX is building technology for the next generation of software-defined transportation.</p>
            <a href="#automotive-products" className="software-primary-action mt-7 inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40"><HiOutlineArrowRight className="h-4 w-4" /></span>
              Explore Automotive Intelligence
            </a>
          </div>

          <div className="software-core-visual-wrap relative mx-auto w-full max-w-[650px]">
            <LazySoftwareVisual kind="core" label="TarvyX automotive intelligence architecture with connected vehicle systems" className="h-[300px] sm:h-[390px] lg:h-[450px]" />
          </div>
        </div>
      </section>

      <section className="software-lifecycle border-y border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">CORE AUTOMOTIVE INTELLIGENCE AREAS</div>
          <h3 className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">Intelligence across the vehicle and mobility ecosystem.</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Vehicle Intelligence Architecture", "Automotive Perception and Sensor Fusion", "Predictive Mobility Intelligence", "Automotive Simulation Intelligence", "Vehicle Software Intelligence", "Battery and Energy Intelligence", "Autonomous Mobility Research", "Mobility Ecosystem Intelligence"].map((area) => <span key={area} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] leading-4 text-white/65 sm:text-xs">{area}</span>)}
          </div>
          <div className="software-eyebrow mt-8">THE AUTOMOTIVE INTELLIGENCE LIFECYCLE</div>
          <div className="software-lifecycle-track mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {AUTOMOTIVE_LIFECYCLE.map((stage, index) => (
              <div key={stage.title} className="relative flex flex-col items-center text-center">
                <div className="software-lifecycle-node"><stage.icon className="h-5 w-5" /></div>
                <div className="software-lifecycle-copy">
                  <h4 className="mt-3 text-sm font-semibold text-white">{stage.title}</h4>
                  <p className="mt-1 max-w-32 text-xs leading-5 text-white/55">{stage.detail}</p>
                </div>
                {index < AUTOMOTIVE_LIFECYCLE.length - 1 && <span className="software-lifecycle-link" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="automotive-products" className="software-products px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">OUR AUTOMOTIVE INTELLIGENCE PRODUCTS</div>
          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Eight intelligent systems.<br />One mobility vision.</h3>
          </div>
          <div className="software-timeline relative mt-10 space-y-10 md:space-y-0">
            {AUTOMOTIVE_PRODUCTS.map((product, index) => {
              const visualFirst = index % 2 === 1;
              return (
                <article id={`automotive-product-${product.id}`} key={product.id} className="software-product-row relative grid grid-cols-[30px_minmax(0,1fr)] gap-x-3 gap-y-4 md:min-h-[330px] md:grid-cols-[minmax(0,1fr)_76px_minmax(0,1fr)] md:gap-x-0 md:gap-y-0">
                  <div className={`software-product-copy min-w-0 ${visualFirst ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className={`software-product-number ${index % 2 ? "is-blue" : ""}`}>{product.number}</span>
                      <h4 className={`font-display text-2xl font-bold ${index % 2 ? "text-[var(--software-blue)]" : "text-[var(--software-coral)]"}`}>TARVYX {product.name}</h4>
                      <span className="software-status-pill">{product.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{product.title}</p>
                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{product.body}</p>
                    <div className="mt-3 border-l-2 border-[var(--software-coral)]/50 pl-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">PROJECT: {product.project}</div>
                      <p className="mt-1 text-[11px] leading-5 text-white/65">{product.projectDetail}</p>
                    </div>
                    <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">CORE CAPABILITIES</div>
                    <ul className="mt-1 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {product.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{capability}</li>)}
                    </ul>
                    <a href={`#automotive-product-${product.id}`} aria-label={`Explore TarvyX ${product.name}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore <HiOutlineArrowRight className="h-3.5 w-3.5" /></a>
                  </div>
                  <div className="software-product-marker row-start-1 col-start-1 md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span>{product.number}</span>
                    <i />
                  </div>
                  <LazySoftwareVisual kind={product.visual} label={`TarvyX ${product.name}: ${product.project}`} className={`software-product-visual col-start-2 row-start-2 h-[190px] w-full md:col-span-1 md:row-start-1 md:h-[280px] ${visualFirst ? "md:col-start-1" : "md:col-start-3"}`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="project-aurora" className="software-fabric relative overflow-hidden border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="software-eyebrow">FLAGSHIP AUTOMOTIVE RESEARCH PLATFORM</div>
            <h3 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">PROJECT AURORA</h3>
            <p className="mt-2 max-w-md text-base font-medium text-[var(--software-blue)]">Automotive Unified Reasoning &amp; Observation Research Architecture</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Aurora is the foundational automotive intelligence research platform connecting TarvyX's automotive products. It provides a research architecture for combining perception, vehicle state, environmental understanding, prediction, simulation and decision models into a unified development and evaluation workflow.</p>
            <a href="#project-aurora-roadmap" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore Automotive Intelligence <HiOutlineArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="software-fabric-visual-wrap relative">
            <LazySoftwareVisual kind="fabric" label="TarvyX automotive intelligence and mobility systems architecture" className="h-[300px] sm:h-[420px] lg:h-[500px]" />
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Perception + Vehicle State + Environment", "World Representation", "Prediction", "Simulation", "Decision Model", "Safety and Validation", "Vehicle System", "Feedback"].map((component) => <span key={component} className="rounded-md border border-white/10 bg-slate-950/45 px-2 py-2 text-center text-[10px] leading-4 text-white/75">{component}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="project-aurora-roadmap" className="border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">PROJECT AURORA DEVELOPMENT ROADMAP</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { phase: "PHASE 1 — RESEARCH PROTOTYPE", items: ["Virtual vehicle and environment", "Sensor simulation", "Perception pipeline", "Vehicle-state model", "Scenario generator", "Prediction engine", "Decision layer", "Evaluation framework"] },
              { phase: "PHASE 2 — ADVANCED SIMULATION", items: ["Real sensor datasets", "Hardware-in-the-loop testing", "Edge inference", "Complex environments", "Rare and adversarial scenarios"] },
              { phase: "PHASE 3 — CONTROLLED HARDWARE PROTOTYPE", items: ["Physical sensor platform", "Controlled test environment", "Embedded hardware", "Real-time perception"] },
              { phase: "PHASE 4 — INDUSTRY INTEGRATION", items: ["Explore OEM and Tier-1 partnerships", "Regulated validation pathways"] },
            ].map((stage) => (
              <div key={stage.phase} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <h4 className="font-mono text-[10px] leading-5 tracking-[0.12em] text-[var(--software-blue)]">{stage.phase}</h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {stage.items.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-white/65"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-coral)]" />{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-y border-white/10 py-5">
            <div className="software-eyebrow">OUR VISION</div>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-white/65">TarvyX is exploring the intelligence infrastructure behind future mobility: vehicles that understand their environment, software that evolves through validated engineering, and simulation systems that help engineers evaluate complex scenarios before deployment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuantumResearchPanel() {
  return (
    <div className="software-engineering-page -mx-4 space-y-0 sm:-mx-6 md:-mx-8 lg:-mx-10">
      <section className="software-hero relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="max-w-xl">
            <div className="software-eyebrow">OUR CORE SERVICES</div>
            <h3 className="mt-4 font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] text-white">Quantum Intelligence</h3>
            <div className="mt-4 font-display text-xl font-medium leading-snug text-white sm:text-2xl">Engineering algorithms and computational architectures for the post-classical era.</div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">TarvyX explores the intersection of quantum computing, artificial intelligence and advanced computational science to develop algorithms and software systems designed for problems that challenge conventional computation.</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">Our research focuses on quantum algorithms, hybrid quantum-classical architectures, quantum simulation, optimization, quantum machine learning and computational methods that can operate across emerging quantum and classical infrastructures. Rather than treating quantum computing as a replacement for conventional computing, TarvyX investigates how classical intelligence and quantum computation can work together to solve specific classes of complex problems.</p>
            <a href="#quantum-products" className="software-primary-action mt-7 inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40"><HiOutlineArrowRight className="h-4 w-4" /></span>
              Explore Quantum Intelligence
            </a>
          </div>

          <div className="software-core-visual-wrap relative mx-auto w-full max-w-[650px]">
            <LazySoftwareVisual kind="core" label="TarvyX quantum intelligence core with interconnected classical and quantum systems" className="h-[300px] sm:h-[390px] lg:h-[450px]" />
          </div>
        </div>
      </section>

      <section className="software-lifecycle border-y border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">QUANTUM AND CLASSICAL TECHNOLOGY AREAS</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Quantum Algorithms and Circuit Design", "Hybrid Quantum-Classical Computing", "Quantum Simulation", "Quantum Machine Learning", "Quantum Optimization", "Post-Quantum Security", "Molecular and Materials Discovery", "Quantum-Classical Benchmarking"].map((area) => <span key={area} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] leading-4 text-white/65 sm:text-xs">{area}</span>)}
          </div>
          <div className="software-eyebrow mt-8">THE QUANTUM COMPUTATION LIFECYCLE</div>
          <div className="software-lifecycle-track mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {QUANTUM_LIFECYCLE.map((stage, index) => (
              <div key={stage.title} className="relative flex flex-col items-center text-center">
                <div className="software-lifecycle-node"><stage.icon className="h-5 w-5" /></div>
                <div className="software-lifecycle-copy">
                  <h4 className="mt-3 text-sm font-semibold text-white">{stage.title}</h4>
                  <p className="mt-1 max-w-32 text-xs leading-5 text-white/55">{stage.detail}</p>
                </div>
                {index < QUANTUM_LIFECYCLE.length - 1 && <span className="software-lifecycle-link" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quantum-products" className="software-products px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">OUR QUANTUM INTELLIGENCE PRODUCTS</div>
          <div className="mt-2">
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Eight computational systems.<br />One quantum-classical vision.</h3>
          </div>

          <div className="software-timeline relative mt-10 space-y-10 md:space-y-0">
            {QUANTUM_PRODUCTS.map((product, index) => {
              const visualFirst = index % 2 === 1;
              return (
                <article id={`quantum-product-${product.id}`} key={product.id} className="software-product-row relative grid grid-cols-[30px_minmax(0,1fr)] gap-x-3 gap-y-4 md:min-h-[330px] md:grid-cols-[minmax(0,1fr)_76px_minmax(0,1fr)] md:gap-x-0 md:gap-y-0">
                  <div className={`software-product-copy min-w-0 ${visualFirst ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className={`software-product-number ${index % 2 ? "is-blue" : ""}`}>{product.number}</span>
                      <h4 className={`font-display text-2xl font-bold ${index % 2 ? "text-[var(--software-blue)]" : "text-[var(--software-coral)]"}`}>TARVYX {product.name}</h4>
                      <span className="software-status-pill">RESEARCH</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{product.title}</p>
                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{product.body}</p>
                    <div className="mt-3 border-l-2 border-[var(--software-coral)]/50 pl-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">PROJECT: {product.project}</div>
                      <p className="mt-1 text-[11px] leading-5 text-white/65">{product.projectDetail}</p>
                    </div>
                    <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">CORE CAPABILITIES</div>
                    <ul className="mt-1 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {product.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{capability}</li>)}
                    </ul>
                    {product.applications && (
                      <div className="mt-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">POTENTIAL APPLICATIONS</div>
                        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          {product.applications.map((application) => <li key={application} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{application}</li>)}
                        </ul>
                      </div>
                    )}
                    <a href={`#quantum-product-${product.id}`} aria-label={`Explore TarvyX ${product.name}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore <HiOutlineArrowRight className="h-3.5 w-3.5" /></a>
                  </div>
                  <div className="software-product-marker row-start-1 col-start-1 md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span>{product.number}</span>
                    <i />
                  </div>
                  <LazySoftwareVisual kind={product.visual} label={`TarvyX ${product.name}: ${product.project}`} className={`software-product-visual col-start-2 row-start-2 h-[190px] w-full md:col-span-1 md:row-start-1 md:h-[280px] ${visualFirst ? "md:col-start-1" : "md:col-start-3"}`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="q-fusion" className="software-fabric relative overflow-hidden border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="software-eyebrow">FLAGSHIP QUANTUM RESEARCH PLATFORM</div>
            <h3 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">PROJECT Q-FUSION</h3>
            <p className="mt-2 max-w-md text-base font-medium text-[var(--software-blue)]">Quantum-Classical Intelligence Fusion Architecture</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Q-Fusion explores how intelligent computational systems can decide which parts of a problem belong on classical infrastructure and which may benefit from quantum processing. It connects problem understanding, mathematical modelling, computational analysis, classical processing, quantum execution and result verification within a unified architecture.</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">Q-Fusion could eventually provide the computational foundation for Qyron, Quantara, Qentra and Qubera.</p>
          </div>
          <div className="software-fabric-visual-wrap relative">
            <LazySoftwareVisual kind="fabric" label="Quantum-classical computational fusion architecture" className="h-[300px] sm:h-[420px] lg:h-[500px]" />
            <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/45 p-3 sm:p-4">
              <div className="grid gap-2 sm:grid-cols-2">
                {["Complex Problem", "Problem Understanding", "Mathematical Model", "Computational Analysis"].map((stage) => <span key={stage} className="rounded-md border border-[var(--software-blue)]/30 bg-[var(--software-blue)]/10 px-2 py-2 text-center text-[10px] text-white/80">{stage}</span>)}
              </div>
              <div className="py-1 text-center text-xs text-[var(--software-blue)]" aria-hidden="true">↓</div>
              <div className="grid grid-cols-2 gap-2">
                {["Classical Compute", "Quantum Compute"].map((stage) => <span key={stage} className="rounded-md border border-[var(--software-coral)]/30 bg-[var(--software-coral)]/10 px-2 py-2 text-center text-[10px] text-white/80">{stage}</span>)}
              </div>
              <div className="py-1 text-center text-xs text-[var(--software-blue)]" aria-hidden="true">↓</div>
              <div className="grid gap-2 sm:grid-cols-4">
                {["Result Fusion", "Verification", "Optimization", "Final Solution"].map((stage) => <span key={stage} className="rounded-md border border-[var(--software-blue)]/30 bg-[var(--software-blue)]/10 px-2 py-2 text-center text-[10px] text-white/80">{stage}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <div className="software-eyebrow">FRONTIER RESEARCH</div>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Q-ORACLE</h3>
            <p className="mt-4 text-sm leading-7 text-white/65">Q-Oracle is a proposed research system that evaluates a computational problem and explores which algorithmic approach is most appropriate. Potential approaches include classical algorithms, GPU computation, quantum algorithms, hybrid algorithms, approximation methods and classical quantum-system simulation.</p>
            <p className="mt-3 text-sm leading-7 text-white/55">The objective is to investigate intelligent selection of computational pathways based on problem characteristics, resource constraints and measured performance.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Classical algorithms", "GPU computation", "Quantum algorithms", "Hybrid algorithms", "Approximation methods", "Classical quantum-system simulation"].map((method) => <span key={method} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-white/70">{method}</span>)}
            </div>
          </div>
          <div>
            <div className="software-eyebrow">DEVELOPMENT PRIORITIES</div>
            <div className="mt-4 space-y-3">
              {[
                ["NEAR-TERM OPPORTUNITY — CRYPTARA", "Explore cryptographic inventory and post-quantum migration planning."],
                ["RESEARCH PRIORITY — QYRON + Q-FUSION", "Investigate quantum-classical orchestration and computational workload selection."],
                ["LONG-TERM RESEARCH — MOLEQ", "Explore quantum simulation, AI and scientific discovery."],
              ].map(([title, description]) => <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><h4 className="font-mono text-[10px] leading-5 tracking-[0.12em] text-[var(--software-blue)]">{title}</h4><p className="mt-2 text-xs leading-5 text-white/65">{description}</p></div>)}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-y border-white/10 py-5">
          <div className="software-eyebrow">OUR VISION</div>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-white/65">TarvyX is exploring the convergence of quantum computing, artificial intelligence and advanced computational science. We build experimental platforms and algorithms that investigate where quantum and classical computation can work together to solve complex problems. Our research spans quantum algorithms, hybrid architectures, quantum simulation, optimization, quantum machine learning and quantum-ready security.</p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/55">We don't assume quantum is the answer to every problem. We build the intelligence required to discover where it can become one.</p>
          <a href="#quantum-products" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore Quantum Intelligence <HiOutlineArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}

function IntelligenceDomainPanel({ domain }: { domain: IntelligenceDomain }) {
  const lifecycleIcons = [HiOutlineSparkles, HiOutlineCircleStack, HiOutlineBeaker, HiOutlineCpuChip, HiOutlineCheckCircle, HiOutlineArrowRight];

  return (
    <div className="software-engineering-page -mx-4 space-y-0 sm:-mx-6 md:-mx-8 lg:-mx-10">
      <section className="software-hero relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="max-w-xl">
            <div className="software-eyebrow">{domain.eyebrow}</div>
            <h3 className="mt-4 font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] text-white">{domain.title}</h3>
            <div className="mt-4 font-display text-xl font-medium leading-snug text-white sm:text-2xl">{domain.tagline}</div>
            {domain.introduction.map((paragraph, index) => (
              <p key={paragraph} className={`mt-4 max-w-lg text-sm leading-7 ${index === 0 ? "text-white/70 sm:text-base" : "text-white/55"}`}>{paragraph}</p>
            ))}
            <a href={`#${domain.id}-products`} className="software-primary-action mt-7 inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40"><HiOutlineArrowRight className="h-4 w-4" /></span>
              Explore Our Technology
            </a>
          </div>
          <div className="software-core-visual-wrap relative mx-auto w-full max-w-[650px]">
            <LazySoftwareVisual kind="core" label={`TarvyX ${domain.title} intelligence system`} className="h-[300px] sm:h-[390px] lg:h-[450px]" />
          </div>
        </div>
      </section>

      <section className="software-lifecycle border-y border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">{domain.lifecycleTitle}</div>
          <h3 className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{domain.lifecycleDescription}</h3>
          <div className="software-lifecycle-track mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {domain.lifecycle.map((stage, index) => {
              const StageIcon = lifecycleIcons[index % lifecycleIcons.length];
              return (
                <div key={stage.title} className="relative flex flex-col items-center text-center">
                  <div className="software-lifecycle-node"><StageIcon className="h-5 w-5" /></div>
                  <div className="software-lifecycle-copy">
                    <h4 className="mt-3 text-sm font-semibold text-white">{stage.title}</h4>
                    <p className="mt-1 max-w-32 text-xs leading-5 text-white/55">{stage.detail}</p>
                  </div>
                  {index < domain.lifecycle.length - 1 && <span className="software-lifecycle-link" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id={`${domain.id}-products`} className="software-products px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">{domain.productHeading}</div>
          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{domain.products.length} intelligent systems.<br />One intelligence vision.</h3>
            <p className="max-w-md text-sm leading-6 text-white/55">{domain.productDescription}</p>
          </div>

          <div className="software-timeline relative mt-10 space-y-10 md:space-y-0">
            {domain.products.map((product, index) => {
              const visualFirst = index % 2 === 1;
              return (
                <article id={`${domain.id}-product-${product.id}`} key={product.id} className="software-product-row relative grid grid-cols-[30px_minmax(0,1fr)] gap-x-3 gap-y-4 md:min-h-[330px] md:grid-cols-[minmax(0,1fr)_76px_minmax(0,1fr)] md:gap-x-0 md:gap-y-0">
                  <div className={`software-product-copy min-w-0 ${visualFirst ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className={`software-product-number ${index % 2 ? "is-blue" : ""}`}>{product.number}</span>
                      <h4 className={`font-display text-2xl font-bold ${index % 2 ? "text-[var(--software-blue)]" : "text-[var(--software-coral)]"}`}>{product.name}</h4>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{product.title}</p>
                    {product.body.map((paragraph) => <p key={paragraph} className="mt-2 max-w-xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{paragraph}</p>)}
                    <div className="mt-3 border-l-2 border-[var(--software-coral)]/50 pl-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">PROJECT — {product.project}</div>
                      <p className="mt-1 text-[11px] leading-5 text-white/65">{product.projectDetail}</p>
                    </div>
                    <ul className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {product.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{capability}</li>)}
                    </ul>
                    {product.notes?.map((note) => (
                      <div key={note.title} className="mt-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">{note.title}</div>
                        {note.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-1 text-[11px] leading-5 text-white/65">{paragraph}</p>)}
                        {note.items && <ul className="mt-1 grid gap-x-4 gap-y-1 sm:grid-cols-2">{note.items.map((item) => <li key={item} className="flex items-start gap-2 text-[11px] leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{item}</li>)}</ul>}
                      </div>
                    ))}
                    <a href={`#${domain.id}-product-${product.id}`} aria-label={`Explore ${product.name}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">Explore <HiOutlineArrowRight className="h-3.5 w-3.5" /></a>
                  </div>

                  <div className="software-product-marker row-start-1 col-start-1 md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span>{product.number}</span>
                    <i />
                  </div>
                  <LazySoftwareVisual kind={product.visual} label={`${product.name}: ${product.project}`} className={`software-product-visual col-start-2 row-start-2 h-[190px] w-full md:col-span-1 md:row-start-1 md:h-[280px] ${visualFirst ? "md:col-start-1" : "md:col-start-3"}`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="software-fabric border-y border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="software-eyebrow">{domain.flagshipLabel}</div>
          <div className="mt-2 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
            <div>
              <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">{domain.flagshipTitle}</h3>
              <p className="mt-2 text-lg font-medium text-[var(--software-blue)]">{domain.flagshipSubtitle}</p>
              {domain.flagshipBody.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-white/65">{paragraph}</p>)}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--software-muted)]">{domain.architectureTitle}</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {domain.architecture.map((stage) => <div key={stage.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <h4 className="font-mono text-[10px] leading-5 tracking-[0.08em] text-[var(--software-blue)]">{stage.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-white/65">{stage.description}</p>
                </div>)}
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/10 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--software-muted)]">{domain.flagshipTitle} Architecture Flow</div>
            <p className="mt-2 text-xs leading-6 text-white/70">{domain.architectureFlow}</p>
          </div>
          {domain.additionalResearch?.map((research) => (
            <div key={research.title} className="mt-5 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--software-blue)]">{research.title}</h4>
              {research.body.map((paragraph) => <p key={paragraph} className="mt-2 text-xs leading-6 text-white/65">{paragraph}</p>)}
              {research.items && <ul className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">{research.items.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-white/75"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--software-blue)]" />{item}</li>)}</ul>}
              {research.flow && <p className="mt-3 rounded-lg border-l-2 border-[var(--software-coral)]/50 bg-black/10 px-3 py-2 text-xs leading-6 text-white/75">{research.flow}</p>}
            </div>
          ))}

          <div className="mt-8">
            <div className="software-eyebrow">{domain.id === "cyber" ? "TARVYX CYBERSECURITY — BILLABLE PRODUCT PORTFOLIO" : domain.id === "cloud" ? "TARVYX CLOUD — BILLABLE PRODUCT PORTFOLIO" : domain.id === "medical" ? "TARVYX MEDICAL SCIENCES — RESEARCH FRONTIER" : domain.id === "retail" ? "TARVYX CONSUMER & RETAIL — PRODUCT PORTFOLIO" : domain.id === "finance" ? "TARVYX FINANCIAL INTELLIGENCE — PRODUCT PORTFOLIO" : domain.id === "enterprise" ? "TARVYX ENTERPRISE — PRODUCT PORTFOLIO" : domain.id === "supply-chain" ? "TARVYX SUPPLY CHAIN — PRODUCT PORTFOLIO" : domain.id === "hospitality" ? "TARVYX HOSPITALITY — PRODUCT PORTFOLIO" : domain.id === "telecommunication" ? "TARVYX TELECOMMUNICATION — PRODUCT PORTFOLIO" : "TARVYX HUMAN INTERFACE INTELLIGENCE — PRODUCT PORTFOLIO"}</div>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] border-b border-white/10 bg-white/[0.05] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--software-blue)]">
                <span>Product</span><span>Commercial direction</span>
              </div>
              {domain.portfolio.map((item) => <div key={item.product} className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] border-b border-white/[0.06] px-4 py-3 text-xs text-white/70 last:border-b-0"><span>{item.product}</span><span>{item.direction}</span></div>)}
            </div>
          </div>

          <div className="mt-8 border-y border-white/10 py-5">
            <div className="software-eyebrow">OUR VISION</div>
            {domain.vision.map((paragraph) => <p key={paragraph} className="mt-2 max-w-4xl text-sm leading-7 text-white/65">{paragraph}</p>)}
            <p className="mt-3 max-w-4xl text-sm font-semibold leading-7 text-white/75">{domain.visionTagline}</p>
            <a href={`#${domain.id}-products`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--software-coral)] hover:text-[var(--software-coral-light)]">{domain.action} <HiOutlineArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
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
            className="fixed top-0 left-0 z-[9999] flex min-h-[0] w-full h-[100dvh] sm:top-1/2 sm:left-1/2 sm:w-[95vw] sm:max-w-[1100px] sm:h-[min(85vh,900px)] sm:-translate-x-1/2 sm:-translate-y-1/2 flex-col overflow-hidden rounded-none sm:rounded-[30px] border border-white/10 bg-[var(--glass-surface)] shadow-[0_40px_120px_rgba(56,189,248,0.28)] backdrop-blur-[18px]"
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

            <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[var(--glass-surface)] px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-5">
              <div className="min-w-0 flex-1">
                <span className="block break-words font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.3em]">{service.title}</span>
                      <h2 className="break-words font-display text-[clamp(22px,6vw,38px)] font-semibold leading-tight tracking-tight text-white">
                        {service.title === "Software Intelligence" ? "Software Intelligence Engineering" : service.title === "AI & Machine Learning" ? "Advanced Machine Intelligence" : service.title === "Automotive Engineering" ? "Automotive Intelligence & Mobility Systems" : service.title === "Quantum Research" ? "Quantum Intelligence & Computational Systems" : service.title === "Cloud Computing" ? CLOUD_DOMAIN.title : service.title === "Cyber Security" ? CYBERSECURITY_DOMAIN.title : service.title === "Global Health & Medical Sciences" ? MEDICAL_DOMAIN.headerTitle ?? MEDICAL_DOMAIN.title : service.title === "UI / UX" ? HUMAN_INTERFACE_DOMAIN.headerTitle ?? HUMAN_INTERFACE_DOMAIN.title : service.title === "Embedded Systems" ? EMBEDDED_DOMAIN.title : service.title === "IoT" ? IOT_DOMAIN.title : service.title === "Robotics" ? ROBOTICS_DOMAIN.title : service.title === "Supply Chain & Logistics" ? SUPPLY_CHAIN_DOMAIN.title : service.title === "Hotels & Resorts Intelligence" ? HOTELS_DOMAIN.title : service.title === "Telecommunication" ? TELECOMMUNICATION_DOMAIN.title : service.title === "Consumer & Retail" ? RETAIL_DOMAIN.title : service.title === "Financial Intelligence" ? FINANCE_DOMAIN.title : service.title === "Enterprise Solutions" ? ENTERPRISE_DOMAIN.title : service.title === "Semiconductors" ? SEMICONDUCTOR_DOMAIN.title : service.title === "Pharmaceuticals" ? PHARMA_DOMAIN.title : service.title === "Camera & Imaging" ? IMAGING_DOMAIN.title : service.title === "Space & Aerospace" ? AEROSPACE_DOMAIN.title : content?.title}
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
              {service.title === "Software Intelligence" ? (
                <SoftwareEngineeringPanel />
              ) : service.title === "AI & Machine Learning" ? (
                <AIMachineLearningPanel />
              ) : service.title === "Automotive Engineering" ? (
                <AutomotivePanel />
              ) : service.title === "Quantum Research" ? (
                <QuantumResearchPanel />
              ) : service.title === "Cloud Computing" ? (
                <IntelligenceDomainPanel domain={CLOUD_DOMAIN} />
              ) : service.title === "Cyber Security" ? (
                <IntelligenceDomainPanel domain={CYBERSECURITY_DOMAIN} />
              ) : service.title === "Global Health & Medical Sciences" ? (
                <IntelligenceDomainPanel domain={MEDICAL_DOMAIN} />
              ) : service.title === "UI / UX" ? (
                <IntelligenceDomainPanel domain={HUMAN_INTERFACE_DOMAIN} />
              ) : service.title === "Embedded Systems" ? (
                <IntelligenceDomainPanel domain={EMBEDDED_DOMAIN} />
              ) : service.title === "IoT" ? (
                <IntelligenceDomainPanel domain={IOT_DOMAIN} />
              ) : service.title === "Robotics" ? (
                <IntelligenceDomainPanel domain={ROBOTICS_DOMAIN} />
              ) : service.title === "Supply Chain & Logistics" ? (
                <IntelligenceDomainPanel domain={SUPPLY_CHAIN_DOMAIN} />
              ) : service.title === "Hotels & Resorts Intelligence" ? (
                <IntelligenceDomainPanel domain={HOTELS_DOMAIN} />
              ) : service.title === "Telecommunication" ? (
                <IntelligenceDomainPanel domain={TELECOMMUNICATION_DOMAIN} />
              ) : service.title === "Consumer & Retail" ? (
                <IntelligenceDomainPanel domain={RETAIL_DOMAIN} />
              ) : service.title === "Financial Intelligence" ? (
                <IntelligenceDomainPanel domain={FINANCE_DOMAIN} />
              ) : service.title === "Enterprise Solutions" ? (
                <IntelligenceDomainPanel domain={ENTERPRISE_DOMAIN} />
              ) : service.title === "Pharmaceuticals" ? (
                <IntelligenceDomainPanel domain={PHARMA_DOMAIN} />
              ) : service.title === "Semiconductors" ? (
                <IntelligenceDomainPanel domain={SEMICONDUCTOR_DOMAIN} />
              ) : service.title === "Space & Aerospace" ? (
                <IntelligenceDomainPanel domain={AEROSPACE_DOMAIN} />
              ) : service.title === "Camera & Imaging" ? (
                <IntelligenceDomainPanel domain={IMAGING_DOMAIN} />
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
