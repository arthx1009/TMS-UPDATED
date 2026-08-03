export default function AmbientBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 transition-[background] duration-500"
        style={{
          background: "radial-gradient(circle at 20% 20%, rgba(var(--color-electric-rgb), 0.18), transparent 35%), radial-gradient(circle at 80% 10%, rgba(var(--color-cyan-rgb), 0.08), transparent 25%), radial-gradient(circle at 50% 100%, rgba(var(--color-brand-rgb), 0.12), transparent 45%), var(--color-ink)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] transition-[background-image] duration-500"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
        }}
      />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-aurora"
        style={{ background: "var(--color-brand)", top: "-10%", left: "-10%", opacity: 0.2 }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[130px] animate-aurora-slow"
        style={{ background: "var(--color-electric)", top: "40%", right: "-10%", opacity: 0.15 }} />
      <div className="absolute inset-0 grain" style={{ opacity: 0.03 }} />
      <style>{`
        @keyframes aurora { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,60px) scale(1.15); } }
        @keyframes aurora-slow { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,-30px) scale(1.1); } }
        .animate-aurora { animation: aurora 22s ease-in-out infinite; }
        .animate-aurora-slow { animation: aurora-slow 28s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
