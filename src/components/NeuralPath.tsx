import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Signature element: a vertical "signal trace" running down the left edge of the
 * viewport — reads as a PCB trace / neural pathway. It fills with the brand
 * gradient as the visitor progresses through the story, and pulses a traveling
 * node, tying the "engineering + intelligence" identity to the scroll itself.
 */
export default function NeuralPath() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.2 });
  const topPct = useTransform(smooth, (v) => `${v * 100}%`);

  return (
    <div className="fixed left-0 top-0 h-full w-[3px] md:w-[4px] z-40 hidden md:block" aria-hidden>
      <div className="absolute inset-0 bg-white/[0.06]" />
      <motion.div
        className="absolute inset-x-0 top-0 origin-top"
        style={{
          height: "100%",
          scaleY: smooth,
          background: "linear-gradient(180deg, var(--color-electric), var(--color-brand) 55%, var(--color-hover))",
        }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full -left-[3px]"
        style={{
          top: topPct,
          background: "var(--color-electric)",
          boxShadow: "0 0 12px 3px var(--color-electric)",
        }}
      />
    </div>
  );
}
