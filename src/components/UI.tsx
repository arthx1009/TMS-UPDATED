import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import { cn } from "../lib/utils";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-gradient-to-r from-[var(--color-electric)] to-transparent" />
      <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--color-electric)" }}>
        {children}
      </span>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl mb-14", align === "center" && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.1] text-white"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-[15px] leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  style,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section id={id} style={style} className={cn("relative px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-[1440px] mx-auto", className)}>
      {children}
    </section>
  );
}

export function GlassCard({
  children,
  className,
  hoverLift = true,
}: {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}) {
  return (
    <motion.div
      whileHover={
        hoverLift
          ? {
              y: -6,
              boxShadow: "0 28px 80px rgba(56, 189, 248, 0.16)",
              borderColor: "rgba(var(--color-electric-rgb), 0.28)",
            }
          : undefined
      }
      whileTap={hoverLift ? { scale: 0.995 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("glass glass-card rounded-2xl p-6 relative overflow-hidden group hover-card", className)}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-display font-bold text-[clamp(28px,3.2vw,40px)] text-gradient">{value}</div>
      <div className="font-mono text-[11px] tracking-widest uppercase mt-1" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </div>
    </div>
  );
}

export function MagneticButton({
  children,
  variant = "primary",
  onClick,
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative px-7 py-3.5 rounded-full font-medium text-sm tracking-wide overflow-hidden group",
        variant === "primary" ? "text-ink" : "text-white border",
        className
      )}
      style={
        variant === "primary"
          ? { background: "linear-gradient(135deg, var(--color-brand), var(--color-electric))", color: "var(--color-ink)" }
          : { borderColor: "var(--hairline-15)", background: "rgba(10, 19, 34, 0.7)" }
      }
    >
      <span className="relative z-10">{children}</span>
      {variant === "ghost" && (
        <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      )}
    </motion.button>
  );
}
