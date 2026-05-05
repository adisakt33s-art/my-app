import Link from "next/link";
import CiAnimated from "@/components/CiAnimated";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 55% at 70% 50%, rgba(56,189,248,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 30% 60%, rgba(34,211,160,0.05) 0%, transparent 60%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-5 w-full pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-6">

          {/* Text */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ color: "var(--blue)" }}>
              English Learning Platform
            </p>

            <h1 style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginBottom: "1.5rem",
            }}>
              เรียนอังกฤษ<br />
              <span style={{ color: "var(--blue)" }}>ครบทุกทักษะ</span><br />
              ในที่เดียว
            </h1>

            <p className="text-base mb-10" style={{ color: "var(--ink-2)", maxWidth: "28rem" }}>
              AI สร้างแผนเฉพาะตัว อธิบายเป็นภาษาไทย
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/dashboard"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-opacity hover:opacity-85"
                style={{ background: "var(--blue)", color: "#050e1e", boxShadow: "0 0 24px rgba(56,189,248,0.4)" }}
              >
                เริ่มเรียนฟรีเลย →
              </Link>
              <a href="#how-it-works"
                className="text-sm font-semibold transition-colors hover:text-[var(--blue)]"
                style={{ color: "var(--ink-2)" }}
              >ดูวิธีใช้งาน</a>
            </div>

            {/* Stats strip */}
            <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { val: "50K+",   lab: "ผู้เรียน" },
                { val: "4.9 ★",  lab: "คะแนน" },
                { val: "30 วัน", lab: "เห็นผล" },
              ].map((s) => (
                <div key={s.lab}>
                  <div className="text-xl font-black" style={{ color: "var(--blue)" }}>{s.val}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ink-3)" }}>{s.lab}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ci mascot — 3D interactive */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <CiAnimated size={240} />
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--ink-3)" }}>
              Ci · AI Tutor
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
