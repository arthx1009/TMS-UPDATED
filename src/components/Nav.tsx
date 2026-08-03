import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoUrl from "../assets/tms-logo.png";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Blogs", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav
        className={`flex items-center justify-between w-full max-w-6xl rounded-full px-4 md:px-6 py-2.5 transition-all duration-500 ${
          scrolled ? "glass shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : "bg-transparent border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 group">
          <img src={logoUrl} alt="TMS" className="h-12 w-auto transition-transform duration-500 group-hover:rotate-[8deg]" />
          <span className="font-display font-semibold text-lg tracking-wide hidden sm:block">TarvyX Mind Systems</span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-5 py-3 text-[15px] font-medium text-white/85 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute left-4 right-4 bottom-1 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: "var(--color-electric)" }} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2"></div>

        <button className="md:hidden p-3 text-white" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <div className="w-6 h-px bg-white mb-2" />
          <div className="w-6 h-px bg-white" />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-1 md:hidden"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-5 py-3 text-[15px] text-white/85">
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
