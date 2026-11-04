type VisualKind = "core" | "nexora" | "codelys" | "evolis" | "syndex" | "veridis" | "oryon" | "fabric" | "lumenix";

const SOFTWARE_INTELLIGENCE_IMAGES: Record<VisualKind, string> = {
  core: "/assets/software-intelligence/01.TMS%20SOFTWARE%20INTELLIGENCE.png",
  nexora: "/assets/software-intelligence/nexora01.png",
  codelys: "/assets/software-intelligence/codex.02.png",
  evolis: "/assets/software-intelligence/evolis.03.png",
  syndex: "/assets/software-intelligence/syndex.04.png",
  veridis: "/assets/software-intelligence/Veridis.06.png",
  oryon: "/assets/software-intelligence/oryon.07.png",
  fabric: "/assets/software-intelligence/Tarvyx%20Intelligence%20Fabric.png",
  lumenix: "/assets/software-intelligence/luminax.png",
};

export default function SoftwareVisual({ kind, label, className = "" }: { kind: VisualKind; label: string; className?: string }) {
  return (
    <div className={`software-visual relative isolate overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(41,45,80,0.36),rgba(5,9,20,0.96)_72%)] ${kind === "core" ? "software-visual-core" : ""} ${className}`}>
      <img
        src={SOFTWARE_INTELLIGENCE_IMAGES[kind]}
        alt={label}
        className="software-intelligence-illustration"
        loading={kind === "core" ? "eager" : "lazy"}
      />
    </div>
  );
}
