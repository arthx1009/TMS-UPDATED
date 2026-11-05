export type RedWaveVariant =
  | "hero"
  | "about"
  | "services"
  | "research"
  | "stats"
  | "contact"
  | "footer";

const WAVE_ASSET = "/assets/software-intelligence/Glowing Red Neon Wave Ribbons.png";

export default function RedWaves({ variant }: { variant: RedWaveVariant }) {
  const isHero = variant === "hero";
  const image = (position?: "top" | "bottom") => (
    <img
      className={`tms-wave__image${position ? ` tms-wave__image--${position}` : ""}`}
      src={WAVE_ASSET}
      alt=""
      draggable={false}
      loading={isHero ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={isHero ? "high" : "auto"}
    />
  );

  return (
    <div className={`tms-wave tms-wave--${variant}`} aria-hidden="true">
      {variant === "hero" || variant === "about" || variant === "services"
        ? <>{image("top")}{image("bottom")}</>
        : image()}
    </div>
  );
}
