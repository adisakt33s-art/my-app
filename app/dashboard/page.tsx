"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Ci from "@/components/Ci";

// ── Data ───────────────────────────────────────────────────────
const skills = [
  { label: "Grammar",    score: 72, col: "#38bdf8" },
  { label: "Speaking",   score: 55, col: "#22d3a0" },
  { label: "Listening",  score: 81, col: "#38bdf8" },
  { label: "Vocabulary", score: 68, col: "#22d3a0" },
];

const todayPlan = [
  { icon: "📝", title: "Present Perfect",   type: "Grammar",    xp: 30, duration: "10 min", done: true  },
  { icon: "📚", title: "Business Vocab #12", type: "Vocabulary", xp: 20, duration: "5 min",  done: false },
  { icon: "🎧", title: "Interview Podcast",  type: "Listening",  xp: 40, duration: "8 min",  done: false },
];

const navItems = [
  { icon: "⊞",  label: "Dashboard",   href: "/dashboard", active: true },
  { icon: "▶",  label: "Learn",       href: "/dashboard" },
  { icon: "◈",  label: "AI Tutor",    href: "/dashboard" },
  { icon: "◎",  label: "Missions",    href: "/dashboard" },
  { icon: "▲",  label: "Leaderboard", href: "/dashboard" },
  { icon: "◐",  label: "Progress",    href: "/dashboard" },
];

// ── Theme tokens ──────────────────────────────────────────────
const T = {
  bg:       "#060f20",
  surface:  "#0c1830",
  surface2: "#102040",
  border:   "#1a3260",
  borderHi: "#2a4880",
  blue:     "#38bdf8",
  green:    "#22d3a0",
  white:    "#e8f4ff",
  muted:    "#4a6a8a",
  glowBlue: "0 0 16px rgba(56,189,248,0.35)",
  glowGrn:  "0 0 16px rgba(34,211,160,0.35)",
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  // Get display name: firstName → username → email prefix → fallback
  const name = user?.firstName
    || user?.username
    || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0]
    || "ผู้เรียน";
  const initial = (name[0] || "?").toUpperCase();
  if (!isLoaded) return null; // Middleware already guards; this prevents flash
  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.white, fontFamily: "'LINESeedSansTH', system-ui, sans-serif", display: "flex" }}>

      {/* ── Sidebar ──────────────────────────────── */}
      <aside style={{
        width: 200, flexShrink: 0, display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0,
        background: T.surface, borderRight: `1px solid ${T.border}`,
      }} className="hidden md:flex">

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 20px 16px", textDecoration: "none" }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.blue, letterSpacing: -0.5 }}>English</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.white }}>Hub</span>
        </Link>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "4px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 10, textDecoration: "none",
              fontSize: 13, fontWeight: item.active ? 600 : 400, transition: "all 0.15s",
              background: item.active ? `rgba(56,189,248,0.12)` : "transparent",
              color: item.active ? T.blue : T.muted,
              boxShadow: item.active ? `inset 0 0 0 1px rgba(56,189,248,0.25)` : "none",
            }}>
              <span style={{ fontSize: 15, width: 18, textAlign: "center", opacity: item.active ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "14px 16px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#050e1e",
          }}>{initial}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>B1 · Intermediate</div>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────── */}
      <main style={{ flex: 1, marginLeft: 200 }} className="md:ml-[200px]">

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: `${T.surface}ee`, backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "0 24px", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Ci size={32} />
            <div>
              <span style={{ fontSize: 15, fontWeight: 700, color: T.white }}>สวัสดี {name}!</span>
              <span style={{ fontSize: 12, color: T.muted, marginLeft: 8 }}>วันศุกร์ 2 พ.ค. 2026</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
              borderRadius: 20, background: "rgba(250,140,0,0.1)",
              border: "1px solid rgba(250,140,0,0.25)", fontSize: 13, fontWeight: 600, color: "#fa8c00",
            }}>🔥 7 วัน</div>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#050e1e", cursor: "pointer",
            }}>{initial}</div>
          </div>
        </div>

        <div style={{ padding: "24px 24px 40px", maxWidth: 900 }}>

          {/* ── XP card ─── */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 16, padding: "20px 24px", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 2, letterSpacing: 1, textTransform: "uppercase" }}>Level 12 — Scholar</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: T.blue, lineHeight: 1.1, letterSpacing: -1 }}>2,340 XP</div>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.muted, marginBottom: 6 }}>
                <span>2,340</span><span>2,500 → Lv.13</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: T.border, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: "68%", borderRadius: 99,
                  background: `linear-gradient(90deg, ${T.blue}, ${T.green})`,
                  boxShadow: `0 0 10px ${T.blue}80`,
                }} />
              </div>
            </div>
            {/* Badges */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "🔥", label: "7-day Streak",  glow: "#fa8c00" },
                { icon: "📝", label: "Grammar 101",   glow: T.blue },
                { icon: "🎯", label: "First Quiz",    glow: T.green },
              ].map((b) => (
                <div key={b.label} title={b.label} style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: T.surface2, border: `1px solid ${T.borderHi}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, cursor: "pointer",
                  boxShadow: `0 0 8px ${b.glow}40`,
                  transition: "box-shadow 0.2s",
                }}>{b.icon}</div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }} className="grid-cols-1 lg:grid-cols-[1fr_300px]">

            {/* ── Left ─────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Today's plan */}
              <div>
                <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>แผนวันนี้</div>
                <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  {todayPlan.map((item, i) => (
                    <div key={item.title} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px", background: item.done ? T.surface : T.surface,
                      borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                      opacity: item.done ? 0.4 : 1,
                      cursor: item.done ? "default" : "pointer",
                      transition: "background 0.15s",
                    }}>
                      <span style={{ fontSize: 20 }}>{item.done ? "✅" : item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.white }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: T.muted }}>{item.type} · {item.duration}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>+{item.xp} XP</div>
                        {!item.done && <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>เริ่ม →</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill scores */}
              <div>
                <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Skill Scores</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  {skills.map((s) => (
                    <div key={s.label} style={{ background: T.surface, padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: T.muted }}>{s.label}</span>
                        <span style={{ fontSize: 18, fontWeight: 900, color: s.col, fontVariantNumeric: "tabular-nums" }}>{s.score}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: T.border }}>
                        <div style={{
                          height: "100%", width: `${s.score}%`, borderRadius: 99,
                          background: s.col, boxShadow: `0 0 8px ${s.col}80`,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right ────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* AI Tutor / Ci */}
              <div style={{
                borderRadius: 16, padding: "22px 20px", textAlign: "center",
                background: T.surface,
                border: `1px solid ${T.borderHi}`,
                boxShadow: `inset 0 0 30px rgba(56,189,248,0.06)`,
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                  <Ci size={88} />
                </div>
                <div style={{ fontSize: 11, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Mascot Ci</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.white, marginBottom: 6 }}>AI Tutor พร้อมแล้ว</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>ถามได้ทุกอย่าง อธิบายเป็นภาษาไทย</div>
                <Link href="/dashboard" style={{
                  display: "block", textAlign: "center", textDecoration: "none",
                  fontSize: 13, fontWeight: 700, padding: "10px 0", borderRadius: 10,
                  background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
                  color: "#050e1e", boxShadow: T.glowBlue,
                }}>เปิด AI Tutor →</Link>
              </div>

              {/* Streak */}
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "18px 16px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.white, marginBottom: 14 }}>🔥 พฤษภาคม</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const active = day <= 7;
                    const today = day === 5;
                    return (
                      <div key={day} style={{
                        aspectRatio: "1", borderRadius: 6, fontSize: 10, fontWeight: 600,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: today ? T.blue : active ? `rgba(56,189,248,0.15)` : T.surface2,
                        color: today ? "#050e1e" : active ? T.blue : T.muted,
                        boxShadow: today ? T.glowBlue : "none",
                      }}>{day}</div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Start */}
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.white }}>⚡ Quick Start</span>
                </div>
                {[
                  { icon: "🎤", label: "Speaking Practice", sub: "Job interview" },
                  { icon: "📚", label: "Vocab Review",      sub: "12 cards due" },
                  { icon: "🧪", label: "Placement Test",    sub: "อัปเดตระดับ" },
                ].map((q, i) => (
                  <Link key={q.label} href="/dashboard" style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "11px 16px", textDecoration: "none",
                    borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                    background: "transparent", transition: "background 0.15s",
                  }}>
                    <span style={{ fontSize: 18 }}>{q.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{q.label}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>{q.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
