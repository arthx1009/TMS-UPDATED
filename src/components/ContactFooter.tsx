import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle, MagneticButton } from "./UI";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineChatBubbleLeftEllipsis,
} from "react-icons/hi2";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import logoUrl from "../assets/tms-logo.png";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle eyebrow="Contact" title="Tell us what you're building." sub="We reply within one business day. All discussions are covered under NDA on request." />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[
            { icon: HiOutlineMapPin, label: "Office", value: "Bangalore, Karnataka, India" },
            { icon: HiOutlinePhone, label: "Phone", value: "+91 8374144574 • +91 9391777916" },
            { icon: HiOutlineEnvelope, label: "Email", value: "hello@tarvyxmindsystems.com" },
            { icon: HiOutlineChatBubbleLeftEllipsis, label: "WhatsApp", value: "Start a chat" },
          ].map((c) => (
            <motion.div key={c.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass glass-card hover-card rounded-2xl p-4 flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(var(--color-cyan-rgb), 0.1)" }}>
                <c.icon className="w-4.5 h-4.5" style={{ color: "var(--color-electric)" }} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{c.label}</div>
                <div className="text-sm font-medium">{c.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-3 glass glass-card hover-card rounded-2xl p-6 flex flex-col gap-4 group"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="Full name" className="bg-white/[0.04] border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-electric)] transition-colors" style={{ borderColor: "rgba(var(--color-electric-rgb), 0.10)" }} />
            <input required type="email" placeholder="Work email" className="bg-white/[0.04] border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-electric)] transition-colors" style={{ borderColor: "rgba(var(--color-electric-rgb), 0.10)" }} />
          </div>
          <input placeholder="Company" className="bg-white/[0.04] border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-electric)] transition-colors" style={{ borderColor: "rgba(var(--color-electric-rgb), 0.10)" }} />
          <textarea required rows={4} placeholder="What are you building?" className="bg-white/[0.04] border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-electric)] transition-colors resize-none" style={{ borderColor: "rgba(var(--color-electric-rgb), 0.10)" }} />
          <MagneticButton className="self-start !py-3 !px-7">{sent ? "Sent — we'll be in touch" : "Send message"}</MagneticButton>
        </motion.form>
      </div>
    </Section>
  );
}

export function Footer() {
  const socialLinks = [
    { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
    { icon: FaGithub, label: "GitHub", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
    { icon: FaXTwitter, label: "X", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t px-6 md:px-12 lg:px-20 py-20 max-w-[1440px] mx-auto" style={{ borderColor: "var(--hairline-06)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-12%] top-0 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: "rgba(56, 189, 248, 0.16)" }} />
        <div className="absolute right-[-10%] bottom-0 h-56 w-56 rounded-full blur-3xl opacity-15" style={{ background: "rgba(59, 130, 246, 0.14)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.05),transparent_25%)]" />
        <div className="footer-footer-particle footer-particle-1" />
        <div className="footer-footer-particle footer-particle-2" />
        <div className="footer-footer-particle footer-particle-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-10 overflow-hidden rounded-[24px] border border-[var(--hairline-15)] glass px-6 py-8 md:px-8 lg:px-10"
        animate={{ y: [0, -2, 0] }}
      >
        <div className="absolute inset-0 opacity-70" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.09), transparent 45%, rgba(59,130,246,0.12))" }} />
        <div className="absolute inset-x-8 top-6 h-0.5 rounded-full bg-white/10 blur-sm" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_45%)] opacity-60" />
        <div className="absolute left-6 top-8 h-2 w-2 rounded-full bg-cyan-300/40 blur-2xl animate-footer-particle" />
        <div className="absolute right-10 bottom-10 h-2 w-2 rounded-full bg-cyan-400/30 blur-2xl animate-footer-particle delay-200" />
        <div className="absolute left-1/2 top-16 h-2 w-2 rounded-full bg-cyan-500/20 blur-2xl animate-footer-particle delay-400" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl relative z-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--color-electric)" }}>Next Step</div>
            <h3 className="mt-2 font-display text-[clamp(22px,3vw,32px)] font-semibold text-white">Innovate. Build. Grow.</h3>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>Become part of a culture driven by creativity, engineering excellence, and continuous innovation..</p>
          </div>
          <div className="flex flex-wrap gap-3 relative z-10">
            <MagneticButton className="!py-3 !px-6">Careers</MagneticButton>
            <MagneticButton
              variant="ghost"
              className="!py-3 !px-6"
              onClick={() => {
                window.location.hash = "#contact";
              }}
            >
              Contact Us
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      <div className="relative flex flex-col md:flex-row justify-between gap-10">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 shadow-[0_0_32px_rgba(56,189,248,0.16)]"
            >
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 opacity-50" />
              <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent)]" />
              <img src={logoUrl} alt="TMS" className="relative h-7 w-auto" />
            </motion.div>
            <span className="font-display text-sm font-semibold text-white">TarvyX Mind Systems</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-xs text-sm leading-7"
            style={{ color: "var(--color-text-muted)" }}
          >
            Engineering Intelligence for the Future — Delivering innovative software, cloud, AI, and enterprise solutions with excellence.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  whileHover={{ y: -8, scale: 1.1, rotate: 8, boxShadow: "0 18px 40px rgba(56, 189, 248, 0.22)" }}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-15)] bg-white/[0.04] text-white/75 transition-all duration-300"
                >
                  <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)" }} />
                  <span className="absolute inset-0 rounded-full opacity-0 scale-90 transition duration-500 group-hover:opacity-100 group-hover:scale-105" style={{ boxShadow: "0 0 0 8px rgba(56,189,248,0.05)" }} />
                  <Icon className="relative h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm relative z-10">
          {[
            { h: "Company", items: ["About", "Leadership", "Careers", "Research"] },
            { h: "Solutions", items: ["Software", "Cloud", "AI", "Enterprise"] },
            { h: "Resources", items: ["Blog", "Courses", "FAQ", "Case Studies"] },
            { h: "Legal", items: ["Privacy", "Terms", "Cookies", "NDA"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{col.h}</div>
              <div className="flex flex-col gap-2">
                {col.items.map((it) => (
                  <motion.a
                    key={it}
                    href="#"
                    whileHover={{ x: 4, color: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                    className="group relative inline-flex w-fit items-center gap-2 text-white/65 transition-colors hover:text-white"
                  >
                    <span>{it}</span>
                    <span className="block h-px w-0 bg-gradient-to-r from-[var(--color-electric)] to-transparent transition-all duration-300 group-hover:w-4" />
                    <span className="text-[10px] opacity-0 transition-all duration-300 group-hover:opacity-100">→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-10">
        <div className="relative h-px overflow-hidden rounded-full border-0" style={{ background: "rgba(56, 189, 248, 0.16)" }}>
          <motion.div
            animate={{ x: [-120, 320] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-24 rounded-full blur-sm"
            style={{ background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)" }}
          />
        </div>
      </div>

      <div className="relative mt-6 flex flex-col gap-4 border-t border-white/5 pt-8 text-[12px] text-white/35 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--hairline-06)" }}>
        <div>
          <div className="text-sm font-semibold text-white">© {new Date().getFullYear()} TarvyX Mind Systems</div>
          <div className="mt-2 text-[12px] text-white/55">Crafted with Precision • Engineered for the Future</div>
        </div>
        <div className="text-[12px] font-mono text-white/45">Bangalore,Karnataka -India • Building the Future</div>
      </div>
    </footer>
  );
}
 