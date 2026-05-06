"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Ci from "@/components/Ci";
import { getScores, type UserScores } from "@/lib/supabase";
import { levelFromScore } from "@/lib/grammar-questions";

const todayPlan = [
  { icon: "📝", title: "Present Perfect",    type: "Grammar",    xp: 30, duration: "10 min", href: "/dashboard/grammar" },
  { icon: "📚", title: "Business Vocab #12", type: "Vocabulary", xp: 20, duration: "5 min",  href: "/dashboard" },
  { icon: "🎧", title: "Interview Podcast",  type: "Listening",  xp: 40, duration: "8 min",  href: "/dashboard" },
];

const navItems = [
  { icon: "⊞",  label: "Dashboard",   href: "/dashboard",         active: true  },
  { icon: "▶",  label: "Learn",       href: "/dashboard/grammar" },
  { icon: "◈",  label: "AI Tutor",    href: "/dashboard" },
  { icon: "◎",  label: "Missions",    href: "/dashboard" },
  { icon: "▲",  label: "Leaderboard", href: "/dashboard" },
  { icon: "◐",  label: "Progress",    href: "/dashboard" },
  { icon: "👤", label: "โปรไฟล์",     href: "/dashboard/profile" },
];

// Bottom nav สำหรับมือถือ
const bottomNav = [
  { icon: "⊞",  label: "หน้าหลัก",  href: "/dashboard",         active: true },
  { icon: "▶",  label: "เรียน",      href: "/dashboard/grammar" },
  { icon: "◈",  label: "AI Tutor",   href: "/dashboard" },
  { icon: "👤", label: "โปรไฟล์",    href: "/dashboard/profile" },
];

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
  const name = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "ผู้เรียน";
  const initial = (name[0] || "?").toUpperCase();

  const [scores, setScores] = useState<UserScores>({ user_id: "", grammar: 0, vocabulary: 0, listening: 0, speaking: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (user?.id) getScores(user.id).then(setScores);
  }, [user?.id]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const skills = [
    { label: "Grammar",    score: scores.grammar,    col: "#38bdf8", href: "/dashboard/grammar" },
    { label: "Speaking",   score: scores.speaking,   col: "#22d3a0", href: "/dashboard" },
    { label: "Listening",  score: scores.listening,  col: "#38bdf8", href: "/dashboard" },
    { label: "Vocabulary", score: scores.vocabulary, col: "#22d3a0", href: "/dashboard" },
  ];
  const grammarLevel = levelFromScore(scores.grammar);

  if (!isLoaded) return null;

  const today = new Date();
  const dayNames = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];
  const monthNames = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
  const dateStr = `วัน${dayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear() + 543}`;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.white, fontFamily: "'LINESeedSansTH', system-ui, sans-serif", display: "flex" }}>

      {/* ── Sidebar (Desktop only) ── */}
      {!isMobile && (
        <aside style={{
          width: 200, flexShrink: 0, display: "flex", flexDirection: "column",
          position: "fixed", top: 0, left: 0, bottom: 0,
          background: T.surface, borderRight: `1px solid ${T.border}`,
          zIndex: 20,
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 20px 16px", textDecoration: "none" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: T.blue }}>English</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: T.white }}>Hub</span>
          </Link>
          <nav style={{ flex: 1, padding: "4px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 10, textDecoration: "none",
                fontSize: 13, fontWeight: item.active ? 600 : 400,
                background: item.active ? `rgba(56,189,248,0.12)` : "transparent",
                color: item.active ? T.blue : T.muted,
                boxShadow: item.active ? `inset 0 0 0 1px rgba(56,189,248,0.25)` : "none",
              }}>
                <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/dashboard/profile" style={{
            padding: "14px 16px", borderTop: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", gap: 10, textDecoration: "none",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#050e1e",
            }}>{initial}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{name}</div>
             <div style={{ fontSize: 11, color: T.muted }}>Lv.1</div>
          </Link>
        </aside>
      )}

      {/* ── Main ── */}
      <main style={{
        flex: 1,
        marginLeft: isMobile ? 0 : 200,
        paddingBottom: isMobile ? 80 : 0,
      }}>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: `${T.surface}ee`, backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.border}`,
          padding: isMobile ? "0 16px" : "0 24px", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Ci size={28} />
            <div>
              <span style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: T.white }}>สวัสดี {name}!</span>
              {!isMobile && <span style={{ fontSize: 12, color: T.muted, marginLeft: 8 }}>{dateStr}</span>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 5, padding: "5px 10px",
              borderRadius: 20, background: "rgba(250,140,0,0.1)",
              border: "1px solid rgba(250,140,0,0.25)", fontSize: 12, fontWeight: 600, color: "#fa8c00",
            }}>🔥 0</div>
            <Link href="/dashboard/profile">
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#050e1e", cursor: "pointer",
              }}>{initial}</div>
            </Link>
          </div>
        </div>

        <div style={{ padding: isMobile ? "16px 16px 40px" : "24px 24px 40px", maxWidth: 900 }}>

          {/* XP card */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 16, padding: isMobile ? "16px" : "20px 24px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: isMobile ? 12 : 24, flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontSize: 10, color: T.muted, marginBottom: 2, letterSpacing: 1, textTransform: "uppercase" }}>Level 1 — Beginner</div>
              <div style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: T.blue, lineHeight: 1.1 }}>0 XP</div>
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.muted, marginBottom: 6 }}>
                <span>0</span><span>500 → Lv.2</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: T.border, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "0%", borderRadius: 99, background: `linear-gradient(90deg, ${T.blue}, ${T.green})` }} />
              </div>
            </div>
            {!isMobile && (
              <div style={{ display: "flex", gap: 8 }}>
                {[{icon:"🔒"},{icon:"🔒"},{icon:"🔒"}].map((b, i) => (
                  <div key={i} style={{ width: 38, height: 38, borderRadius: "50%", background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, opacity: 0.4 }}>{b.icon}</div>
                ))}
              </div>
            )}
          </div>

          {/* Grid Layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
            gap: 20,
          }}>

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Today's plan */}
              <div>
                <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>แผนวันนี้</div>
                <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  {todayPlan.map((item, i) => (
                    <Link key={item.title} href={item.href} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px", background: T.surface,
                      borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                      textDecoration: "none",
                    }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.white }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: T.muted }}>{item.type} · {item.duration}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>+{item.xp} XP</div>
                        <div style={{ fontSize: 11, color: T.blue, marginTop: 2 }}>เริ่ม →</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Skill scores */}
              <div>
                <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Skill Scores</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  {skills.map((s) => (
                    <Link key={s.label} href={s.href} style={{ background: T.surface, padding: "14px 16px", textDecoration: "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: T.muted }}>{s.label}</span>
                        <span style={{ fontSize: 18, fontWeight: 900, color: s.col }}>{s.score}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: T.border }}>
                        <div style={{ height: "100%", width: `${s.score}%`, borderRadius: 99, background: s.col }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Start (Mobile only) */}
              {isMobile && (
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.white }}>⚡ Quick Start</span>
                  </div>
                  {[
                    { icon: "🎤", label: "Speaking Practice", sub: "Job interview" },
                    { icon: "📚", label: "Vocab Review",      sub: "0 cards due" },
                    { icon: "🧪", label: "Placement Test",    sub: "อัปเดตระดับ" },
                  ].map((q, i) => (
                    <Link key={q.label} href="/dashboard" style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 16px", textDecoration: "none",
                      borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                    }}>
                      <span style={{ fontSize: 18 }}>{q.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{q.label}</div>
                        <div style={{ fontSize: 11, color: T.muted }}>{q.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right (Desktop only) */}
            {!isMobile && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* AI Tutor */}
                <div style={{
                  borderRadius: 16, padding: "22px 20px", textAlign: "center",
                  background: T.surface, border: `1px solid ${T.borderHi}`,
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
                    color: "#050e1e",
                  }}>เปิด AI Tutor →</Link>
                </div>

                {/* Streak Calendar */}
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "18px 16px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.white, marginBottom: 14 }}>
                    🔥 {monthNames[today.getMonth()].replace(".", "")} {today.getFullYear() + 543}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isToday = day === today.getDate();
                      return (
                        <div key={day} style={{
                          aspectRatio: "1", borderRadius: 6, fontSize: 10, fontWeight: 600,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isToday ? T.blue : T.surface2,
                          color: isToday ? "#050e1e" : T.muted,
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
                    { icon: "📚", label: "Vocab Review",      sub: "0 cards due" },
                    { icon: "🧪", label: "Placement Test",    sub: "อัปเดตระดับ" },
                  ].map((q, i) => (
                    <Link key={q.label} href="/dashboard" style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 16px", textDecoration: "none",
                      borderTop: i > 0 ? `1px solid ${T.border}` : "none",
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
            )}
          </div>
        </div>
      </main>

      {/* ── Bottom Navigation (Mobile only) ── */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20,
          background: `${T.surface}f5`, backdropFilter: "blur(16px)",
          borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-around", alignItems: "center",
          height: 64, padding: "0 8px",
        }}>
          {bottomNav.map((item) => (
            <Link key={item.label} href={item.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "8px 16px", borderRadius: 12, textDecoration: "none",
              color: item.active ? T.blue : T.muted,
              background: item.active ? "rgba(56,189,248,0.1)" : "transparent",
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: item.active ? 700 : 400 }}>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}

    </div>
  );
}
