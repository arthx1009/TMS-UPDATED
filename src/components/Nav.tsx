import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import logoUrl from "../assets/tms-logo.png";
import { useTheme } from "../lib/theme";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Blogs", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncModalVisibility = () => setModalOpen(document.body.classList.contains("modal-open"));
    syncModalVisibility();
    const observer = new MutationObserver(syncModalVisibility);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: modalOpen ? -100 : 0, opacity: modalOpen ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      inert={modalOpen}
      aria-hidden={modalOpen}
      style={{ pointerEvents: modalOpen ? "none" : undefined }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-3 px-4"
    >
      <nav
        className={`flex items-center justify-between w-full max-w-5xl rounded-full px-4 md:px-6 py-1.5 transition-all duration-500 ${
          scrolled ? "glass shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : "border border-[rgba(229,9,20,0.65)] bg-black/55 shadow-[0_0_24px_rgba(229,9,20,0.18)]"
        }`}
      >
        <a href="#top" className="nav-brand flex items-center gap-2.5 group">
          <img src={logoUrl} alt="TMS" className="h-10 w-auto transition-transform duration-500 group-hover:rotate-[8deg]" />
          <span className="font-display font-semibold text-lg tracking-wide block">TarvyX Mind Systems</span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link relative px-5 py-3 text-[15px] font-medium text-white/85 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute left-4 right-4 bottom-1 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: "var(--color-electric)" }} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#contact" className="nav-cta hidden md:inline-flex">Get in Touch <span aria-hidden="true">↗</span></a>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] transition-colors hover:border-[var(--tms-coral)] hover:text-[var(--tms-coral)]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "light"}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
          </button>
        </div>

        <button className="nav-menu-button md:hidden p-3 text-white" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <div className="nav-menu-bar w-6 h-px bg-white mb-2" />
          <div className="nav-menu-bar w-6 h-px bg-white" />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-mobile-menu absolute top-16 left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-1 md:hidden"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-link px-5 py-3 text-[15px] text-white/85">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="nav-cta nav-mobile-cta">Get in Touch <span aria-hidden="true">↗</span></a>
        </motion.div>
      )}
    </motion.header>
  );
}
