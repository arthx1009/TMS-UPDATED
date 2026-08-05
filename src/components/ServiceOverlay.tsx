import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineCodeBracket, HiOutlineSparkles, HiOutlineBeaker, HiOutlineCpuChip, HiOutlineAcademicCap, HiOutlineCube, HiOutlineCloud, HiOutlineCircleStack } from "react-icons/hi2";
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

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

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
            className="fixed top-1/2 left-1/2 z-[9999] flex min-h-[0] w-[95vw] max-w-[1100px] h-[min(85vh,900px)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(8,12,24,0.88)] shadow-[0_40px_120px_rgba(56,189,248,0.28)] backdrop-blur-[18px]"
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

            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[rgba(7,11,22,0.92)]/95 px-6 py-5 backdrop-blur-xl">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{service.title}</span>
                <h2 className="font-display text-[clamp(28px,2.8vw,38px)] font-semibold tracking-tight text-white">
                  {content?.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-white/10 text-white shadow-[0_0_24px_rgba(56,189,248,0.15)] transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]"
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-cyan-300/10"
                  whileTap={{ scale: 1.4, opacity: [0.6, 0] }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                />
                <motion.span
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-black/20"
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </motion.span>
              </button>
            </div>

            <div className={`modal-body flex-1 min-h-0 max-h-full ${brochureOpen ? "overflow-hidden" : "overflow-y-auto"} overscroll-contain touch-pan-y px-6 py-8 md:px-8 lg:px-10 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent`}>
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
