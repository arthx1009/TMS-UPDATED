export default function AmbientBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 transition-[background] duration-500"
        style={{
          background: "var(--gradient-hero)",
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
      <div className="absolute w-[420px] h-[420px] rounded-full blur-[110px] animate-aurora"
        style={{ background: "var(--tms-indigo)", top: "-12%", left: "-12%", opacity: 0.11 }} />
      <div className="absolute w-[320px] h-[320px] rounded-full blur-[110px] animate-aurora-slow"
        style={{ background: "var(--tms-coral)", top: "42%", right: "-12%", opacity: 0.055 }} />
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
