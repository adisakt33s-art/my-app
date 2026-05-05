"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "bot" | "user"; text: string };

const FAQ = [
  { keywords: ["ราคา", "ค่าใช้จ่าย", "ฟรี", "subscription", "เสียเงิน"],
    answer: "EnglishHub มีแผนฟรีใช้งานได้เลย ไม่ต้องใส่บัตรเครดิต\n\n• Free — 3 บทเรียน/วัน, 50 flashcard, placement test\n• Pro — ฿299/เดือน ไม่จำกัดบทเรียน + AI Tutor เต็มรูปแบบ\n• Team — ฿599/คน/เดือน สำหรับองค์กร\n\nลอง Pro ได้ฟรี 7 วัน ยกเลิกได้ทุกเมื่อ" },
  { keywords: ["ai tutor", "ai", "ครู", "แชท", "ถามคำถาม"],
    answer: "AI Tutor เปรียบเหมือนครูส่วนตัวที่พร้อมตอบทุกคำถาม 24 ชม.\n\n• อธิบายไวยากรณ์เป็นภาษาไทย\n• ตรวจ essay และให้คำแนะนำ\n• Role-play สัมภาษณ์งาน\n• วิเคราะห์จุดอ่อนและแนะนำบทเรียน" },
  { keywords: ["ielts", "toeic", "สอบ", "เตรียมสอบ"],
    answer: "มีเนื้อหาเตรียมสอบ IELTS และ TOEIC โดยเฉพาะ\n\n• Grammar & Vocabulary ตาม Band ที่ต้องการ\n• Listening จากเสียงหลายสำเนียง\n• Writing correction โดย AI\n• แนะนำเริ่มจาก Placement Test เพื่อรู้ระดับก่อน" },
  { keywords: ["คำศัพท์", "vocab", "flashcard", "จำ"],
    answer: "คลังคำศัพท์มีมากกว่า 10,000 คำ พร้อมความหมายภาษาไทย\n\n• แบ่งหมวด: ธุรกิจ, ท่องเที่ยว, ชีวิตประจำวัน, วิชาการ\n• Spaced Repetition ช่วยให้จำได้นาน\n• เสียงออกเสียงโดยเจ้าของภาษา\n• สร้าง deck ส่วนตัวได้" },
  { keywords: ["เริ่ม", "สมัคร", "วิธี", "ใช้งาน"],
    answer: "เริ่มต้นง่ายมาก ไม่ต้องสมัครก็ใช้งานได้\n\n1. คลิก 'เริ่มเรียนฟรีเลย'\n2. ทำ Placement Test (15 นาที)\n3. รับแผนการเรียนส่วนตัวทันที" },
  { keywords: ["มือถือ", "app", "ios", "android"],
    answer: "ใช้งานผ่านเว็บบราวเซอร์ได้ทั้งมือถือและคอมพิวเตอร์ รองรับ Mobile-first design\n\nMobile App (iOS/Android) อยู่ระหว่างพัฒนา จะออกเร็วๆ นี้" },
];

const getReply = (input: string) => {
  const low = input.toLowerCase();
  for (const f of FAQ) {
    if (f.keywords.some((k) => low.includes(k))) return f.answer;
  }
  return "ขอบคุณที่ถามนะครับ ทีมงานจะตอบกลับโดยเร็ว\n\nลองถามด้วยคำเหล่านี้:\nราคา · AI Tutor · คำศัพท์ · IELTS · วิธีเริ่มต้น · มือถือ";
};

const QUICK = ["ราคาเท่าไหร่?", "AI Tutor ทำอะไรได้?", "IELTS / TOEIC", "วิธีเริ่มต้น"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "สวัสดีครับ 👋 ฉัน EnglishBot ยินดีตอบทุกคำถามเกี่ยวกับ EnglishHub\n\nสอบถามได้เลยครับ!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { role: "bot", text: getReply(text) }]);
    }, 800);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        title="ถาม-ตอบ"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full text-white text-lg flex items-center justify-center transition-opacity hover:opacity-90 shadow-lg"
        style={{ background: "var(--ink)" }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Window */}
      {open && (
        <div
          className="fixed bottom-22 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", bottom: "80px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--bg-sub)" }}>🤖</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>EnglishBot</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs" style={{ color: "var(--ink-3)" }}>ออนไลน์ตลอด 24 ชม.</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 h-64 overflow-y-auto px-4 py-3 flex flex-col gap-3" style={{ background: "var(--bg-sub)" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] text-xs leading-relaxed px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap"
                  style={
                    m.role === "user"
                      ? { background: "var(--ink)", color: "#fff", borderBottomRightRadius: 4 }
                      : { background: "var(--bg)", color: "var(--ink)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <span className="inline-flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--ink-3)", animationDelay: `${d}ms` }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid var(--border)" }}>
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-sub)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 px-3 py-3" style={{ borderTop: "1px solid var(--border)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="พิมพ์คำถาม..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-lg outline-none"
              style={{ background: "var(--bg-sub)", border: "1px solid var(--border)", color: "var(--ink)" }}
            />
            <button
              onClick={() => send(input)}
              className="w-9 h-9 rounded-lg text-white flex items-center justify-center flex-shrink-0 text-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--ink)" }}
            >↑</button>
          </div>
        </div>
      )}
    </>
  );
}
