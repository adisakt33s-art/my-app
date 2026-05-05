"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Ci from "./Ci";

const links = [
  { label: "ฟีเจอร์",    href: "#features" },
  { label: "คลังคำ",     href: "#vocab" },
  { label: "วิธีใช้",   href: "#how-it-works" },
  { label: "ราคา",       href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all"
      style={{
        background: scrolled ? "rgba(6,15,32,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Ci size={28} />
          <span className="font-black text-sm tracking-tight" style={{ color: "var(--blue)" }}>English</span>
          <span className="font-black text-sm tracking-tight" style={{ color: "var(--ink)" }}>Hub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm transition-colors hover:text-[var(--blue)]"
              style={{ color: "var(--ink-2)" }}
            >{l.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard"
            className="text-sm transition-colors hover:text-[var(--blue)]"
            style={{ color: "var(--ink-2)" }}
          >เข้าสู่ระบบ</Link>
          <Link href="/dashboard"
            className="text-sm font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-85"
            style={{ background: "var(--blue)", color: "#050e1e" }}
          >เริ่มฟรี</Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-1" style={{ color: "var(--ink-2)" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open
              ? <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              : <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-5 py-4 flex flex-col gap-3"
          style={{ background: "rgba(6,15,32,0.97)", borderTop: "1px solid var(--border)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm" style={{ color: "var(--ink-2)" }}>{l.label}</a>
          ))}
          <Link href="/dashboard"
            className="text-sm font-bold text-center py-2.5 rounded-lg mt-1"
            style={{ background: "var(--blue)", color: "#050e1e" }}
          >เริ่มเรียนฟรี</Link>
        </div>
      )}
    </header>
  );
}
