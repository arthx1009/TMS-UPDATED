import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle, MagneticButton } from "./UI";
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import logoUrl from "../assets/tms-logo.png";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" className="border-t" style={{ borderColor: "var(--hairline-06)" }}>
      <SectionTitle eyebrow="Contact" title="Tell us what you're building." sub="We reply within one business day. All discussions are covered under NDA on request." />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[
            { icon: HiOutlineMapPin, label: "Office", value: "Chennai, Tamil Nadu, India" },
            { icon: HiOutlinePhone, label: "Phone", value: "+91 00000 00000" },
            { icon: HiOutlineEnvelope, label: "Email", value: "hello@tarvyxmind.com" },
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
  return (
    <footer className="relative border-t px-6 md:px-12 lg:px-20 py-14 max-w-[1440px] mx-auto" style={{ borderColor: "var(--hairline-06)" }}>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img src={logoUrl} alt="TMS" className="h-7 w-auto" />
            <span className="font-display font-semibold text-sm">TarvyX Mind Systems</span>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "var(--color-text-muted)" }}>Engineering Intelligence for the Future — AI, software, automotive and quantum systems, delivered under strict confidentiality.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          {[
            { h: "Company", items: ["About", "Careers", "Research"] },
            { h: "Services", items: ["AI & ML", "Cloud", "Automotive"] },
            { h: "Learn", items: ["Courses", "Blog", "FAQ"] },
            { h: "Legal", items: ["Privacy", "Terms", "NDA Policy"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-3">{col.h}</div>
              <div className="flex flex-col gap-2">
                {col.items.map((it) => (
                  <a key={it} href="#" className="text-white/65 hover:text-white transition-colors">{it}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-white/35" style={{ borderColor: "var(--hairline-06)" }}>
        <span>© {new Date().getFullYear()} TarvyX Mind Systems. All rights reserved.</span>
        <span className="font-mono">Chennai, India · Serving clients worldwide</span>
      </div>
    </footer>
  );
}
