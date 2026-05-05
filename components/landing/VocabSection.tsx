"use client";
import { useState } from "react";

const categories = [
  { id: "business", label: "💼 ธุรกิจ" },
  { id: "travel",   label: "✈️ ท่องเที่ยว" },
  { id: "daily",    label: "🏠 ชีวิตประจำวัน" },
  { id: "academic", label: "🎓 IELTS" },
];

const vocab: Record<string, Array<{ word: string; phonetic: string; th: string; example: string; exampleTh: string; level: string }>> = {
  business: [
    { word: "negotiate", phonetic: "/nɪˈɡoʊ.ʃi.eɪt/", th: "เจรจาต่อรอง", example: "We need to negotiate the contract terms.", exampleTh: "เราต้องเจรจาเงื่อนไขสัญญา", level: "B2" },
    { word: "deadline",  phonetic: "/ˈded.laɪn/",      th: "กำหนดเส้นตาย",  example: "The deadline is next Friday.",          exampleTh: "วันครบกำหนดคือวันศุกร์หน้า",    level: "B1" },
    { word: "stakeholder", phonetic: "/ˈsteɪk.hoʊl.dər/", th: "ผู้มีส่วนได้เสีย", example: "We must inform all stakeholders.", exampleTh: "เราต้องแจ้งผู้มีส่วนได้เสียทราบ", level: "C1" },
  ],
  travel: [
    { word: "itinerary", phonetic: "/aɪˈtɪn.ər.er.i/", th: "กำหนดการเดินทาง", example: "Here is our travel itinerary.", exampleTh: "นี่คือกำหนดการเดินทางของเรา", level: "B2" },
    { word: "layover",   phonetic: "/ˈleɪ.oʊ.vər/",    th: "หยุดพักระหว่างบิน", example: "We have a 3-hour layover.",     exampleTh: "เราต้องหยุดพักที่กรุงเทพ 3 ชม.", level: "B1" },
    { word: "customs",   phonetic: "/ˈkʌs.təmz/",       th: "ด่านศุลกากร",      example: "Declare items at customs.",    exampleTh: "แจ้งสิ่งของที่ด่านศุลกากร",       level: "A2" },
  ],
  daily: [
    { word: "commute",     phonetic: "/kəˈmjuːt/",       th: "เดินทางไป-กลับ",  example: "My commute takes 45 minutes.", exampleTh: "การเดินทางใช้เวลา 45 นาที",       level: "B1" },
    { word: "groceries",   phonetic: "/ˈɡroʊ.sər.iz/",   th: "ของชำ",            example: "I need to buy groceries.",     exampleTh: "ฉันต้องซื้อของชำวันนี้",          level: "A2" },
    { word: "appointment", phonetic: "/əˈpɔɪnt.mənt/",   th: "การนัดหมาย",       example: "Doctor's appointment at 3pm.", exampleTh: "ฉันมีนัดหมอบ่าย 3 โมง",          level: "A2" },
  ],
  academic: [
    { word: "hypothesis", phonetic: "/haɪˈpɒθ.ə.sɪs/", th: "สมมติฐาน",         example: "The hypothesis was correct.",  exampleTh: "สมมติฐานได้รับการพิสูจน์แล้ว",    level: "C1" },
    { word: "coherent",   phonetic: "/koʊˈhɪr.ənt/",    th: "สอดคล้องกัน",       example: "Write a coherent argument.",   exampleTh: "เขียนข้อโต้แย้งที่สอดคล้องกัน", level: "C1" },
    { word: "elaborate",  phonetic: "/ɪˈlæb.ər.ɪt/",    th: "อธิบายอย่างละเอียด", example: "Elaborate on your point.",    exampleTh: "กรุณาอธิบายประเด็นเพิ่มเติม",    level: "B2" },
  ],
};

export default function VocabSection() {
  const [cat, setCat]       = useState("business");
  const [flipped, setFlipped] = useState<number | null>(null);
  const words = vocab[cat];

  return (
    <section id="vocab" className="py-24 px-5 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}>

      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--blue)" }}>คลังคำศัพท์</p>
      <h2 className="text-4xl font-black tracking-tight mb-10" style={{ color: "var(--ink)" }}>
        10,000+ คำ พร้อมความหมายไทย
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button key={c.id}
            onClick={() => { setCat(c.id); setFlipped(null); }}
            className="text-sm px-4 py-2 rounded-lg font-semibold transition-all"
            style={cat === c.id
              ? { background: "var(--blue)", color: "#050e1e", boxShadow: "0 0 12px rgba(56,189,248,0.4)" }
              : { background: "var(--bg-sub)", color: "var(--ink-2)", border: "1px solid var(--border)" }
            }
          >{c.label}</button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        {words.map((w, i) => (
          <div key={w.word}
            className="cursor-pointer transition-colors"
            style={{ background: flipped === i ? "var(--bg-hi)" : "var(--bg-sub)", padding: "24px" }}
            onClick={() => setFlipped(flipped === i ? null : i)}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xl font-black" style={{ color: "var(--blue)" }}>{w.word}</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono font-bold"
                style={{ background: "rgba(56,189,248,0.1)", color: "var(--blue)", border: "1px solid rgba(56,189,248,0.2)" }}>
                {w.level}
              </span>
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: "var(--ink-3)" }}>{w.phonetic}</p>
            <div className="flex items-center gap-2 mb-4">
              <span>🇹🇭</span>
              <span className="font-bold text-sm" style={{ color: "var(--ink)" }}>{w.th}</span>
            </div>

            <span className="text-xs" style={{ color: "var(--green)" }}>
              {flipped === i ? "▲ ซ่อน" : "▼ ดูตัวอย่าง"}
            </span>

            {flipped === i && (
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <p className="text-sm mb-1" style={{ color: "var(--ink)" }}>{w.example}</p>
                <p className="text-xs" style={{ color: "var(--ink-2)" }}>🇹🇭 {w.exampleTh}</p>
              </div>
            )}

            <button
              className="mt-4 text-xs font-bold px-3 py-1.5 rounded-lg w-full transition-all hover:opacity-85"
              style={{ background: "var(--bg-hi)", color: "var(--ink-2)", border: "1px solid var(--border)" }}
              onClick={(e) => { e.stopPropagation(); alert(`เพิ่ม "${w.word}" ลง deck แล้ว`); }}
            >+ เพิ่มลงคลัง</button>
          </div>
        ))}
      </div>

      <a href="/dashboard" className="inline-block mt-6 text-sm font-semibold transition-colors hover:text-[var(--blue)]"
        style={{ color: "var(--ink-3)" }}>เข้าสู่คลังทั้งหมด →</a>
    </section>
  );
}
