"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProfile, saveProfile, getScores, type UserProfile, type UserScores } from "@/lib/supabase";

const T = {
  bg: "#060f20", surface: "#0c1830", surface2: "#102040",
  border: "#1a3260", borderHi: "#2a4880", blue: "#38bdf8",
  green: "#22d3a0", white: "#e8f4ff", muted: "#4a6a8a",
  glowBlue: "0 0 16px rgba(56,189,248,0.35)",
};

const navItems = [
  { icon: "⊞", label: "Dashboard",   href: "/dashboard" },
  { icon: "▶", label: "Learn",       href: "/dashboard" },
  { icon: "◈", label: "AI Tutor",    href: "/dashboard" },
  { icon: "◎", label: "Missions",    href: "/dashboard" },
  { icon: "▲", label: "Leaderboard", href: "/dashboard" },
  { icon: "◐", label: "Progress",    href: "/dashboard" },
  { icon: "👤", label: "โปรไฟล์",   href: "/dashboard/profile", active: true },
];

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const name = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "ผู้เรียน";
  const initial = (name[0] || "?").toUpperCase();
  const email = user?.emailAddresses?.[0]?.emailAddress || "-";

  const [profile, setProfile] = useState<UserProfile>({ user_id: "", xp: 0, level: 1, streak: 0, lessons_completed: 0 });
  const [scores, setScores] = useState<UserScores>({ user_id: "", grammar: 0, vocabulary: 0, listening: 0, speaking: 0 });
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([getProfile(user.id), getScores(user.id)]).then(([p, s]) => {
      setProfile(p);
      setPhone(p.phone || "");
      setAddress(p.address || "");
      setScores(s);
      setLoading(false);
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const updated: UserProfile = { ...profile, user_id: user.id, name, phone, address };
    await saveProfile(updated);
    setProfile(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isLoaded || loading) return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: T.muted, fontSize: 14 }}>กำลังโหลด...</div>
    </div>
  );

  const skillList = [
    { label: "Grammar",    score: scores.grammar,    col: T.blue },
    { label: "Speaking",   score: scores.speaking,   col: T.green },
    { label: "Listening",  score: scores.listening,  col: T.blue },
    { label: "Vocabulary", score: scores.vocabulary, col: T.green },
  ];
  const totalScore = skillList.reduce((sum, s) => sum + s.score, 0);
  const overallPercent = Math.round(totalScore / (skillList.length * 100) * 100);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.white, fontFamily: "system-ui, sans-serif", display: "flex" }}>
      <aside style={{ width: 200, flexShrink: 0, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, background: T.surface, borderRight: `1px solid ${T.border}` }} className="hidden md:flex">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 20px 16px", textDecoration: "none" }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.blue }}>English</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.white }}>Hub</span>
        </Link>
        <nav style={{ flex: 1, padding: "4px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: item.active ? 600 : 400, background: item.active ? "rgba(56,189,248,0.12)" : "transparent", color: item.active ? T.blue : T.muted }}>
              <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <Link href="/dashboard/profile" style={{ padding: "14px 16px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#050e1e" }}>{initial}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>Lv.{profile.level}</div>
          </div>
        </Link>
      </aside>
      <main style={{ flex: 1, marginLeft: 200, padding: "32px 24px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <Link href="/dashboard" style={{ fontSize: 12, color: T.muted, textDecoration: "none" }}>← กลับ Dashboard</Link>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: T.white, marginTop: 8 }}>โปรไฟล์ของฉัน</h1>
          </div>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "28px 24px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#050e1e", flexShrink: 0 }}>{initial}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.white }}>{name}</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>{email}</div>
                <div style={{ display: "inline-block", marginTop: 8, padding: "3px 10px", borderRadius: 20, background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", fontSize: 11, color: T.blue, fontWeight: 600 }}>Level {profile.level}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, color: T.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>ชื่อ-นามสกุล</label>
                <div style={{ padding: "11px 14px", borderRadius: 10, fontSize: 14, color: T.white, background: T.surface2, border: `1px solid ${T.border}` }}>{name}</div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: T.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>อีเมล</label>
                <div style={{ padding: "11px 14px", borderRadius: 10, fontSize: 14, color: T.muted, background: T.surface2, border: `1px solid ${T.border}` }}>{email}</div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: T.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>เบอร์โทรติดต่อ</label>
                {editing ? (
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="เช่น 081-234-5678" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, color: T.white, background: T.surface2, border: `1px solid ${T.blue}`, outline: "none", boxSizing: "border-box" }} />
                ) : (
                  <div style={{ padding: "11px 14px", borderRadius: 10, fontSize: 14, color: phone ? T.white : T.muted, background: T.surface2, border: `1px solid ${T.border}` }}>{phone || "ยังไม่ได้กรอก"}</div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 11, color: T.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>ที่อยู่</label>
                {editing ? (
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="เช่น 123 ถ.สุขุมวิท กรุงเทพฯ" rows={3} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, color: T.white, background: T.surface2, border: `1px solid ${T.blue}`, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                ) : (
                  <div style={{ padding: "11px 14px", borderRadius: 10, fontSize: 14, color: address ? T.white : T.muted, background: T.surface2, border: `1px solid ${T.border}`, minHeight: 60 }}>{address || "ยังไม่ได้กรอก"}</div>
                )}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                {editing ? (
                  <>
                    <button onClick={handleSave} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, color: "#050e1e", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>💾 บันทึก</button>
                    <button onClick={() => setEditing(false)} style={{ padding: "11px 20px", borderRadius: 10, background: "transparent", border: `1px solid ${T.border}`, color: T.muted, fontSize: 14, cursor: "pointer" }}>ยกเลิก</button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: `1px solid ${T.borderHi}`, background: "transparent", color: T.blue, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>✏️ แก้ไขข้อมูล</button>
                )}
              </div>
              {saved && <div style={{ textAlign: "center", fontSize: 13, color: T.green }}>✅ บันทึกลง Supabase เรียบร้อยแล้ว</div>}
            </div>
          </div>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "24px" }}>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>ผลการเรียนโดยรวม</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, padding: "16px", background: T.surface2, borderRadius: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: `conic-gradient(${T.blue} ${overallPercent * 3.6}deg, ${T.border} 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: T.blue }}>{overallPercent}%</div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: T.white }}>Overall Score</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>คะแนนรวมจากทุกทักษะ</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {skillList.map((s) => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: T.white }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.col }}>{s.score}/100</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: T.border }}>
                    <div style={{ height: "100%", width: `${s.score}%`, borderRadius: 99, background: s.col }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
              {[
                { label: "บทเรียนที่เรียน", value: profile.lessons_completed, unit: "บท" },
                { label: "XP สะสม", value: profile.xp, unit: "XP" },
                { label: "วันที่เรียน", value: profile.streak, unit: "วัน" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: T.surface2, borderRadius: 12, padding: "14px", textAlign: "center", border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: T.blue }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{stat.unit}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}