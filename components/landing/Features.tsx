"use client";
import { useState } from "react";

const features = [
  {
    icon: "📝", title: "Grammar",    th: "ฝึกไวยากรณ์",
    details: ["Fill-in-blank", "Multiple Choice", "Sentence Reorder", "AI ตรวจคำตอบ"],
    col: "#38bdf8",
  },
  {
    icon: "🎤", title: "Speaking",   th: "ฝึกพูดกับ AI",
    details: ["สัมภาษณ์งาน", "Shadow Mode", "Score Report", "Role-play"],
    col: "#22d3a0",
  },
  {
    icon: "🎧", title: "Listening",  th: "ฝึกฟังหลายสำเนียง",
    details: ["Podcast & News", "Daily Dialogues", "Subtitle ไทย/EN", "Quiz"],
    col: "#38bdf8",
  },
  {
    icon: "🏆", title: "Challenges", th: "ท้าทายและแข่งขัน",
    details: ["Daily Mission", "Streak", "Leaderboard", "Badge"],
    col: "#22d3a0",
  },
  {
    icon: "🤖", title: "AI Tutor",   th: "ครู AI ตลอด 24 ชม.",
    details: ["ถามได้ทุกเรื่อง", "ตรวจ Essay", "Role-play", "วิเคราะห์จุดอ่อน"],
    col: "#38bdf8",
  },
  {
    icon: "📊", title: "Progress",   th: "ติดตามพัฒนาการ",
    details: ["Skill Radar", "กราฟ 30/60/90 วัน", "Streak Calendar", "Weak Spot"],
    col: "#22d3a0",
  },
];

export default function Features() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 px-5 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}>

      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--blue)" }}>Game Modes</p>
      <h2 className="text-4xl font-black tracking-tight mb-14" style={{ color: "var(--ink)" }}>ครบทุกทักษะ</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        {features.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.title}
              className="cursor-pointer transition-all group"
              style={{ background: isOpen ? "var(--bg-hi)" : "var(--bg-sub)", padding: "24px" }}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-xs font-bold transition-colors"
                  style={{ color: isOpen ? f.col : "var(--ink-3)" }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-black text-base mb-0.5" style={{ color: "var(--ink)" }}>{f.title}</h3>
              <p className="text-xs font-semibold" style={{ color: f.col }}>{f.th}</p>

              {/* Neon underline */}
              <div className="mt-4 h-px transition-all"
                style={{ background: isOpen ? f.col : "var(--border)", boxShadow: isOpen ? `0 0 8px ${f.col}` : "none" }} />

              {/* Expanded */}
              {isOpen && (
                <div className="mt-4 space-y-2">
                  {f.details.map((d) => (
                    <div key={d} className="flex items-center gap-2">
                      <span style={{ color: f.col, fontSize: 10 }}>▶</span>
                      <span className="text-sm" style={{ color: "var(--ink-2)" }}>{d}</span>
                    </div>
                  ))}
                  <a href="/dashboard" onClick={(e) => e.stopPropagation()}
                    className="inline-flex mt-3 text-xs font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-85"
                    style={{ background: f.col, color: "#050e1e" }}>
                    เริ่มเลย →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
