import Link from "next/link";

const steps = [
  { n: "01", icon: "🎯", title: "ทดสอบระดับ",    time: "15 นาที" },
  { n: "02", icon: "🗺️", title: "รับแผนการเรียน", time: "ทันที" },
  { n: "03", icon: "⚡", title: "เรียนทุกวัน",    time: "10–20 นาที/วัน" },
  { n: "04", icon: "📈", title: "วัดผลจริง",      time: "ทุก 30 วัน" },
];

const pricing = [
  {
    name: "Free", icon: "🌱", price: "0", unit: "ฟรีตลอดไป",
    features: ["3 บทเรียน/วัน", "Placement test", "50 flashcard", "Daily missions"],
    no: ["AI Tutor", "Speaking"],
    cta: "เริ่มฟรีเลย", primary: false,
  },
  {
    name: "Pro", icon: "🚀", price: "299", unit: "บาท/เดือน",
    features: ["บทเรียนไม่จำกัด", "AI Tutor", "Speaking + Scoring", "ออฟไลน์ได้"],
    no: [],
    cta: "ลอง 7 วันฟรี", primary: true,
  },
  {
    name: "Team", icon: "🏢", price: "599", unit: "บาท/คน/เดือน",
    features: ["ทุกอย่างใน Pro", "Team dashboard", "Admin analytics"],
    no: [],
    cta: "ติดต่อทีมงาน", primary: false,
  },
];

const testimonials = [
  { name: "ภูมิ",  role: "นักศึกษา",    text: "3 สัปดาห์ IELTS Listening ขึ้น 7.0", r: 5 },
  { name: "นิภา",  role: "พนักงาน",      text: "มั่นใจสัมภาษณ์งานต่างชาติมากขึ้น",   r: 5 },
  { name: "ธนา",  role: "ฟรีแลนซ์",     text: "Streak 45 วัน ไม่เคย miss",           r: 5 },
];

export default function HowItWorks() {
  return (
    <>
      {/* Steps */}
      <section id="how-it-works" className="py-24 px-5 max-w-6xl mx-auto"
        style={{ borderTop: "1px solid var(--border)" }}>

        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--blue)" }}>วิธีใช้งาน</p>
        <h2 className="text-4xl font-black tracking-tight mb-14" style={{ color: "var(--ink)" }}>4 ขั้นตอน</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "var(--bg-sub)", padding: "24px" }}>
              <p className="font-mono text-xs mb-5" style={{ color: "var(--blue)" }}>{s.n}</p>
              <span className="text-2xl block mb-4">{s.icon}</span>
              <h3 className="font-bold text-sm mb-3" style={{ color: "var(--ink)" }}>{s.title}</h3>
              <span className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ background: "rgba(56,189,248,0.08)", color: "var(--ink-3)", border: "1px solid var(--border)" }}>
                ⏱ {s.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-5 max-w-6xl mx-auto"
        style={{ borderTop: "1px solid var(--border)" }}>

        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-10" style={{ color: "var(--blue)" }}>รีวิว</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "var(--bg-sub)", padding: "24px" }}>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.r }).map((_, i) => (
                  <span key={i} className="text-xs" style={{ color: "var(--green)" }}>★</span>
                ))}
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--ink-2)" }}>&quot;{t.text}&quot;</p>
              <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>{t.name}</p>
              <p className="text-xs" style={{ color: "var(--ink-3)" }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-5 max-w-6xl mx-auto"
        style={{ borderTop: "1px solid var(--border)" }}>

        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--blue)" }}>ราคา</p>
        <h2 className="text-4xl font-black tracking-tight mb-14" style={{ color: "var(--ink)" }}>เริ่มต้นฟรี</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricing.map((p) => (
            <div key={p.name}
              className="rounded-2xl p-6 flex flex-col"
              style={p.primary ? {
                background: "var(--bg-sub)",
                border: "1px solid var(--blue)",
                boxShadow: "0 0 28px rgba(56,189,248,0.18), inset 0 0 28px rgba(56,189,248,0.04)",
              } : {
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Badge */}
              {p.primary && (
                <div className="text-xs font-black uppercase tracking-widest mb-4 self-start px-2.5 py-1 rounded-full"
                  style={{ background: "var(--blue)", color: "#050e1e" }}>
                  แนะนำ
                </div>
              )}

              <p className="text-xl mb-3">{p.icon}</p>
              <p className="font-black text-lg mb-2" style={{ color: "var(--ink)" }}>{p.name}</p>

              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black"
                  style={{ color: p.primary ? "var(--blue)" : "var(--ink)" }}>
                  ฿{p.price}
                </span>
                <span className="text-xs mb-1.5" style={{ color: "var(--ink-3)" }}>{p.unit}</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="text-sm flex gap-2" style={{ color: "var(--ink-2)" }}>
                    <span style={{ color: p.primary ? "var(--green)" : "var(--blue)" }}>✓</span>{f}
                  </li>
                ))}
                {p.no.map((f) => (
                  <li key={f} className="text-sm flex gap-2" style={{ color: "var(--ink-3)" }}>
                    <span>✕</span>{f}
                  </li>
                ))}
              </ul>

              <Link href="/dashboard"
                className="text-center text-sm font-bold py-3 rounded-xl transition-opacity hover:opacity-85"
                style={p.primary
                  ? { background: "var(--blue)", color: "#050e1e", boxShadow: "0 0 16px rgba(56,189,248,0.35)" }
                  : { background: "var(--bg-hi)", color: "var(--ink)", border: "1px solid var(--border)" }
                }
              >{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-5 text-center max-w-6xl mx-auto"
        style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-8"
          style={{ color: "var(--ink)" }}>
          เริ่มได้เลยวันนี้
        </h2>
        <Link href="/dashboard"
          className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-opacity hover:opacity-85"
          style={{ background: "var(--blue)", color: "#050e1e", boxShadow: "0 0 28px rgba(56,189,248,0.4)" }}
        >
          เริ่มเรียนฟรีเลย →
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-black text-sm">
            <span style={{ color: "var(--blue)" }}>English</span>
            <span style={{ color: "var(--ink)" }}>Hub</span>
          </p>
          <p className="text-xs" style={{ color: "var(--ink-3)" }}>© 2026 EnglishHub</p>
          <div className="flex gap-5 text-xs" style={{ color: "var(--ink-3)" }}>
            <a href="#" className="hover:text-[var(--blue)] transition-colors">ความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-[var(--blue)] transition-colors">ติดต่อ</a>
          </div>
        </div>
      </footer>
    </>
  );
}
