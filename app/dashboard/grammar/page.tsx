"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import Ci from "@/components/Ci";
import {
  getQuestions, getTopicQuestionCount, levelFromScore, xpFromScore,
  GRAMMAR_TOPICS,
  type GrammarQuestion, type FillBlankQ, type MultipleChoiceQ, type SentenceReorderQ,
} from "@/lib/grammar-questions";
import { getScores, saveSession, type UserScores } from "@/lib/supabase";

// ── Theme ─────────────────────────────────────────────────────
const T = {
  bg: "#060f20", surface: "#0c1830", surface2: "#102040",
  border: "#1a3260", borderHi: "#2a4880",
  blue: "#38bdf8", green: "#22d3a0", white: "#e8f4ff",
  muted: "#4a6a8a", error: "#f87171", warn: "#fb923c",
};

type ExType = "fill-blank" | "multiple-choice" | "sentence-reorder";
type Mode = "topics" | "type-pick" | "quiz" | "results";
type Feedback = "correct" | "wrong" | null;

const EX_TYPES: { id: ExType; icon: string; labelTh: string; desc: string; color: string; countKey: "fb" | "mc" | "sr" }[] = [
  { id: "fill-blank",       icon: "✏️", labelTh: "เติมคำในช่องว่าง", desc: "เลือกคำที่ถูกต้องเติมในประโยค",   color: T.blue,   countKey: "fb" },
  { id: "multiple-choice",  icon: "✦",  labelTh: "เลือกคำตอบ",       desc: "4 ตัวเลือก เลือกคำตอบที่ถูก",    color: T.green,  countKey: "mc" },
  { id: "sentence-reorder", icon: "↕",  labelTh: "เรียงประโยค",      desc: "แตะคำเพื่อเรียงเป็นประโยคที่ถูก", color: "#818cf8", countKey: "sr" },
];

const navItems = [
  { icon: "⊞", label: "Dashboard",   href: "/dashboard" },
  { icon: "▶", label: "Learn",       href: "/dashboard/grammar", active: true },
  { icon: "◈", label: "AI Tutor",    href: "/dashboard" },
  { icon: "◎", label: "Missions",    href: "/dashboard" },
  { icon: "▲", label: "Leaderboard", href: "/dashboard" },
  { icon: "◐", label: "Progress",    href: "/dashboard" },
  { icon: "👤", label: "โปรไฟล์",    href: "/dashboard/profile" },
];

// ── Explanation card ──────────────────────────────────────────
function ExplainBox({ feedback, explanationTh, explanation }: {
  feedback: Feedback; explanationTh: string; explanation: string;
}) {
  if (!feedback) return null;
  const ok = feedback === "correct";
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 12, lineHeight: 1.7,
      background: ok ? "rgba(34,211,160,0.08)" : "rgba(248,113,113,0.08)",
      border: `1px solid ${ok ? T.green : T.error}`,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: ok ? T.green : T.error, marginBottom: 6 }}>
        {ok ? "✓ ถูกต้อง!" : "✗ ยังไม่ถูกต้อง"}
      </div>
      <div style={{ fontSize: 13, color: T.white, marginBottom: 4 }}>{explanationTh}</div>
      <div style={{ fontSize: 11, color: T.muted, fontStyle: "italic" }}>{explanation}</div>
    </div>
  );
}

// ── WordChip ──────────────────────────────────────────────────
function WordChip({ word, onClick, variant }: { word: string; onClick?: () => void; variant: "pool" | "answer" }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 13px", borderRadius: 8, fontSize: 13, fontWeight: 600,
      background: variant === "answer" ? "rgba(56,189,248,0.15)" : T.surface2,
      border: `1px solid ${variant === "answer" ? T.blue : T.border}`,
      color: T.white, cursor: "pointer", transition: "all 0.12s", userSelect: "none",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >{word}</button>
  );
}

// ── FillBlank ─────────────────────────────────────────────────
function FillBlankExercise({ q, onAnswer }: { q: FillBlankQ; onAnswer: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  function handleSelect(opt: string) {
    if (feedback) return;
    setChosen(opt);
    const ok = opt === q.answer;
    setFeedback(ok ? "correct" : "wrong");
    setTimeout(() => onAnswer(ok), 1600);
  }

  const parts = q.sentence.split("___");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: T.white, lineHeight: 1.7, textAlign: "center" }}>
        {parts[0]}
        <span style={{
          display: "inline-block", minWidth: 90, borderBottom: `2px solid ${feedback === "correct" ? T.green : feedback === "wrong" ? T.error : T.blue}`,
          padding: "0 8px", marginBottom: 2,
          color: chosen ? (feedback === "correct" ? T.green : T.error) : T.muted,
          fontWeight: 800, transition: "all 0.2s",
        }}>{chosen || "   "}</span>
        {parts[1]}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.options.map((opt) => {
          const isChosen = chosen === opt;
          const isCorrect = opt === q.answer;
          let bg = T.surface2, bord = T.border, color = T.white;
          if (feedback && isCorrect) { bg = "rgba(34,211,160,0.15)"; bord = T.green; color = T.green; }
          else if (feedback && isChosen) { bg = "rgba(248,113,113,0.15)"; bord = T.error; color = T.error; }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!feedback} style={{
              padding: "14px 18px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              background: bg, border: `1px solid ${bord}`, color,
              cursor: feedback ? "default" : "pointer", transition: "all 0.18s", textAlign: "left",
            }}>{opt}</button>
          );
        })}
      </div>
      <ExplainBox feedback={feedback} explanationTh={`${feedback === "wrong" ? `✗ คำตอบที่ถูก: "${q.answer}" · ` : ""}${q.explanationTh}`} explanation={q.explanation} />
    </div>
  );
}

// ── MultipleChoice ────────────────────────────────────────────
function MultipleChoiceExercise({ q, onAnswer }: { q: MultipleChoiceQ; onAnswer: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  function handleSelect(idx: number) {
    if (feedback) return;
    setChosen(idx);
    const ok = idx === q.answer;
    setFeedback(ok ? "correct" : "wrong");
    setTimeout(() => onAnswer(ok), 1600);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: T.white, lineHeight: 1.6 }}>{q.question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, idx) => {
          const isChosen = chosen === idx;
          const isCorrect = idx === q.answer;
          let bg = T.surface2, bord = T.border, color = T.white;
          if (feedback && isCorrect) { bg = "rgba(34,211,160,0.15)"; bord = T.green; color = T.green; }
          else if (feedback && isChosen) { bg = "rgba(248,113,113,0.15)"; bord = T.error; color = T.error; }
          const letter = String.fromCharCode(65 + idx);
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={!!feedback} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", borderRadius: 12, fontSize: 14, fontWeight: 500,
              background: bg, border: `1px solid ${bord}`, color,
              cursor: feedback ? "default" : "pointer", transition: "all 0.18s", textAlign: "left",
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800,
                background: feedback && isCorrect ? T.green : feedback && isChosen ? T.error : T.border,
                color: (feedback && (isCorrect || isChosen)) ? "#050e1e" : T.muted,
              }}>{letter}</span>
              {opt}
            </button>
          );
        })}
      </div>
      <ExplainBox
        feedback={feedback}
        explanationTh={`${feedback === "wrong" ? `✗ คำตอบที่ถูก: "${q.options[q.answer]}" · ` : ""}${q.explanationTh}`}
        explanation={q.explanation}
      />
    </div>
  );
}

// ── SentenceReorder ───────────────────────────────────────────
function SentenceReorderExercise({ q, onAnswer }: { q: SentenceReorderQ; onAnswer: (correct: boolean) => void }) {
  const [pool, setPool] = useState<string[]>([...q.words]);
  const [built, setBuilt] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);

  function pickWord(w: string, fromPool: boolean) {
    if (feedback) return;
    if (fromPool) {
      setPool((p) => { const i = p.indexOf(w); return [...p.slice(0, i), ...p.slice(i + 1)]; });
      setBuilt((b) => [...b, w]);
    } else {
      setBuilt((b) => { const i = b.indexOf(w); return [...b.slice(0, i), ...b.slice(i + 1)]; });
      setPool((p) => [...p, w]);
    }
  }

  function handleCheck() {
    if (built.length === 0 || feedback) return;
    const ok = built.join(" ") === q.answer.join(" ");
    setFeedback(ok ? "correct" : "wrong");
    setTimeout(() => onAnswer(ok), 1800);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 12, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>{q.hint}</div>
      <div style={{
        minHeight: 56, padding: "12px 14px", borderRadius: 12,
        background: T.surface2,
        border: `1px solid ${feedback === "correct" ? T.green : feedback === "wrong" ? T.error : T.borderHi}`,
        display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", transition: "border-color 0.2s",
      }}>
        {built.length === 0 && <span style={{ fontSize: 13, color: T.muted }}>แตะคำด้านล่างเพื่อเรียงประโยค…</span>}
        {built.map((w, i) => <WordChip key={i} word={w} variant="answer" onClick={() => pickWord(w, false)} />)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {pool.map((w, i) => <WordChip key={i} word={w} variant="pool" onClick={() => pickWord(w, true)} />)}
      </div>
      {!feedback && (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleCheck} disabled={built.length === 0} style={{
            flex: 1, padding: "12px 0", borderRadius: 11, fontSize: 14, fontWeight: 700,
            background: built.length ? T.blue : T.surface2,
            border: `1px solid ${built.length ? T.blue : T.border}`,
            color: built.length ? "#050e1e" : T.muted,
            cursor: built.length ? "pointer" : "not-allowed", transition: "all 0.15s",
          }}>ตรวจคำตอบ</button>
          <button onClick={() => { setBuilt([]); setPool([...q.words]); }} style={{
            padding: "12px 18px", borderRadius: 11, fontSize: 13,
            background: "transparent", border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer",
          }}>รีเซ็ต</button>
        </div>
      )}
      <ExplainBox
        feedback={feedback}
        explanationTh={`${feedback === "wrong" ? `✗ คำตอบที่ถูก: "${q.answer.join(" ")}" · ` : ""}${q.explanationTh}`}
        explanation={q.explanation}
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function GrammarPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = getBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const name    = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "ผู้เรียน";
  const initial = (name[0] || "?").toUpperCase();
  const userId  = user?.id ?? "";

  const [mode,         setMode]         = useState<Mode>("topics");
  const [selectedTopic,setSelectedTopic]= useState<string | null>(null);
  const [exType,       setExType]       = useState<ExType>("fill-blank");
  const [questions,    setQuestions]    = useState<GrammarQuestion[]>([]);
  const [qIndex,       setQIndex]       = useState(0);
  const [correct,      setCorrect]      = useState(0);
  const [scores,       setScores]       = useState<UserScores>({ user_id: "", grammar: 0, vocabulary: 0, listening: 0, speaking: 0 });
  const [newGrammar,   setNewGrammar]   = useState(0);
  const [saving,       setSaving]       = useState(false);
  const [saveErr,      setSaveErr]      = useState("");

  useEffect(() => {
    if (!userId) return;
    getScores(userId).then(setScores);
  }, [userId]);

  function startQuiz(type: ExType, topic: string | null) {
    const qs = getQuestions(type, topic, 10);
    setExType(type);
    setQuestions(qs);
    setQIndex(0);
    setCorrect(0);
    setMode("quiz");
    setSaveErr("");
  }

  async function handleAnswer(ok: boolean) {
    const nextCorrect = correct + (ok ? 1 : 0);
    if (qIndex < questions.length - 1) {
      setCorrect(nextCorrect);
      setQIndex((i) => i + 1);
    } else {
      const sessionScore = Math.round((nextCorrect / questions.length) * 100);
      const xp = xpFromScore(sessionScore);
      setSaving(true);
      const { newSkillScore, error } = await saveSession({
        userId, skill: "grammar", type: exType, sessionScore, xpEarned: xp, current: scores,
      });
      setSaving(false);
      if (error) setSaveErr("บันทึกไม่ได้ ตรวจสอบ Supabase key");
      setCorrect(nextCorrect);
      setNewGrammar(newSkillScore);
      setScores((s) => ({ ...s, grammar: newSkillScore }));
      setMode("results");
    }
  }

  const q        = questions[qIndex];
  const total    = questions.length;
  const sessionScore = mode === "results" ? Math.round((correct / total) * 100) : 0;
  const xp       = xpFromScore(sessionScore);
  const grammarLevel = levelFromScore(scores.grammar);
  const exInfo   = EX_TYPES.find((e) => e.id === exType)!;
  const topicMeta = GRAMMAR_TOPICS.find((t) => t.id === selectedTopic);

  // ─── TOPICS SCREEN ────────────────────────────────────────────
  if (mode === "topics") return (
    <Layout initial={initial} name={name}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link href="/dashboard" style={{ fontSize: 12, color: T.muted, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 24 }}>
          ← กลับ Dashboard
        </Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📝</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: T.white, margin: 0 }}>Grammar</h1>
            <div style={{ fontSize: 13, color: T.muted, marginTop: 3 }}>เลือกหมวดที่ต้องการฝึก · สลับข้อทุกครั้งโดยอัตโนมัติ</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: T.blue, lineHeight: 1 }}>{scores.grammar}</div>
            <div style={{ fontSize: 11, color: grammarLevel.color, fontWeight: 600, marginTop: 2 }}>{grammarLevel.label}</div>
          </div>
        </div>

        {/* Score bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.muted, marginBottom: 6 }}>
            <span>Grammar Score</span><span>{scores.grammar}/100</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: T.border, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${scores.grammar}%`, borderRadius: 99, background: `linear-gradient(90deg, ${T.blue}, ${T.green})`, boxShadow: `0 0 12px ${T.blue}60`, transition: "width 0.6s" }} />
          </div>
        </div>

        {/* "เล่นสุ่มทุกหัวข้อ" quick-start row */}
        <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
          เล่นสุ่มทุกหัวข้อ
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {EX_TYPES.map((ex) => (
            <button key={ex.id} onClick={() => { setSelectedTopic(null); startQuiz(ex.id, null); }} style={{
              flex: 1, minWidth: 140, display: "flex", alignItems: "center", gap: 10,
              padding: "12px 16px", borderRadius: 12, textAlign: "left",
              background: T.surface, border: `1px solid ${T.border}`,
              cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = ex.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; }}
            >
              <span style={{ fontSize: 18 }}>{ex.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>{ex.labelTh}</div>
                <div style={{ fontSize: 11, color: T.muted }}>สุ่มจากทุก topic</div>
              </div>
            </button>
          ))}
        </div>

        {/* Topic grid */}
        <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
          เลือกหมวดหมู่ Grammar
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {GRAMMAR_TOPICS.map((topic) => {
            const counts = getTopicQuestionCount(topic.id);
            return (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setMode("type-pick"); }} style={{
                padding: "16px 18px", borderRadius: 14, textAlign: "left",
                background: T.surface, border: `1px solid ${T.border}`,
                cursor: "pointer", transition: "all 0.15s", width: "100%",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = topic.color; e.currentTarget.style.background = `${topic.color}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.surface; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${topic.color}18`, border: `1px solid ${topic.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                  }}>{topic.icon}</div>
                  <span style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 700,
                    background: `${topic.color}18`, color: topic.color,
                  }}>{topic.level}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 4 }}>{topic.name}</div>
                <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.5, marginBottom: 10 }}>{topic.description}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {counts.fb > 0 && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 6, background: `${T.blue}15`, color: T.blue }}>{counts.fb} Fill</span>}
                  {counts.mc > 0 && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 6, background: `${T.green}15`, color: T.green }}>{counts.mc} MCQ</span>}
                  {counts.sr > 0 && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 6, background: "rgba(129,140,248,0.15)", color: "#818cf8" }}>{counts.sr} Order</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );

  // ─── TYPE PICKER ──────────────────────────────────────────────
  if (mode === "type-pick" && topicMeta) {
    const counts = getTopicQuestionCount(topicMeta.id);
    return (
      <Layout initial={initial} name={name}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <button onClick={() => setMode("topics")} style={{ fontSize: 12, color: T.muted, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 4 }}>
            ← เลือก Topic อื่น
          </button>

          {/* Topic header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `${topicMeta.color}18`, border: `1px solid ${topicMeta.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
            }}>{topicMeta.icon}</div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: T.white, margin: 0 }}>{topicMeta.name}</h2>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: `${topicMeta.color}18`, color: topicMeta.color, fontWeight: 600 }}>{topicMeta.level}</span>
            </div>
          </div>

          {/* Description box */}
          <div style={{ padding: "14px 16px", borderRadius: 12, background: T.surface2, border: `1px solid ${T.border}`, marginBottom: 28 }}>
            <div style={{ fontSize: 14, color: T.white, lineHeight: 1.7 }}>{topicMeta.description}</div>
          </div>

          {/* Exercise type picker */}
          <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>เลือกรูปแบบแบบฝึกหัด</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {EX_TYPES.map((ex) => {
              const cnt = counts[ex.countKey];
              if (cnt === 0) return null;
              return (
                <button key={ex.id} onClick={() => startQuiz(ex.id, topicMeta.id)} style={{
                  display: "flex", alignItems: "center", gap: 18,
                  padding: "18px 20px", borderRadius: 14, textAlign: "left",
                  background: T.surface, border: `1px solid ${T.border}`,
                  cursor: "pointer", transition: "all 0.15s", width: "100%",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ex.color; e.currentTarget.style.background = `${ex.color}06`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.surface; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${ex.color}18`, border: `1px solid ${ex.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{ex.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.white }}>{ex.labelTh}</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{ex.desc}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: ex.color, fontWeight: 600 }}>{Math.min(cnt, 10)} ข้อ</div>
                    <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>สุ่มทุกครั้ง</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>🔀</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>คำถามถูกสุ่มใหม่ทุกครั้ง</div>
              <div style={{ fontSize: 11, color: T.muted }}>ลำดับข้อสุ่มเพื่อช่วยให้จำได้จริง ไม่ท่องจำลำดับ</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ─── QUIZ ─────────────────────────────────────────────────────
  if (mode === "quiz" && q) {
    const progress = (qIndex / total) * 100;
    const topicLabel = selectedTopic ?? "All Topics";
    return (
      <Layout initial={initial} name={name}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <button onClick={() => selectedTopic ? setMode("type-pick") : setMode("topics")} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 13, padding: 0 }}>← ออก</button>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, borderRadius: 99, background: `linear-gradient(90deg, ${T.blue}, ${T.green})`, transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontSize: 12, color: T.muted, fontWeight: 600, flexShrink: 0 }}>{qIndex + 1}/{total}</span>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: `${exInfo.color}18`, color: exInfo.color }}>{exInfo.labelTh}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: T.surface2, color: T.blue }}>{topicLabel}</span>
          </div>

          {/* Dot progress */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
            {Array.from({ length: total }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < qIndex ? T.green : i === qIndex ? T.blue : T.border, opacity: i > qIndex ? 0.4 : 1, transition: "all 0.2s" }} />
            ))}
          </div>

          {/* Exercise card */}
          <div style={{ background: T.surface, border: `1px solid ${T.borderHi}`, borderRadius: 18, padding: "28px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.35)" }}>
            {q.type === "fill-blank"       && <FillBlankExercise       q={q as FillBlankQ}       onAnswer={handleAnswer} key={q.id} />}
            {q.type === "multiple-choice"  && <MultipleChoiceExercise  q={q as MultipleChoiceQ}  onAnswer={handleAnswer} key={q.id} />}
            {q.type === "sentence-reorder" && <SentenceReorderExercise q={q as SentenceReorderQ} onAnswer={handleAnswer} key={q.id} />}
          </div>

          {saving && <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: T.muted }}>กำลังบันทึกผล…</div>}
        </div>
      </Layout>
    );
  }

  // ─── RESULTS ─────────────────────────────────────────────────
  if (mode === "results") {
    const newLevel = levelFromScore(newGrammar);
    const prevLevel = levelFromScore(Math.max(0, Math.round((newGrammar / 0.3 - scores.grammar * 0.7 / 0.3))));
    const levelUp = prevLevel.label !== newLevel.label;
    return (
      <Layout initial={initial} name={name}>
        <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            width: 96, height: 96, borderRadius: "50%", margin: "0 auto 20px",
            background: sessionScore >= 70 ? "rgba(34,211,160,0.12)" : "rgba(56,189,248,0.12)",
            border: `2px solid ${sessionScore >= 70 ? T.green : T.blue}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40, boxShadow: `0 0 30px ${sessionScore >= 70 ? T.green : T.blue}40`,
          }}>{sessionScore >= 70 ? "🎉" : "📚"}</div>

          <h1 style={{ fontSize: 26, fontWeight: 900, color: T.white, marginBottom: 6 }}>{sessionScore >= 70 ? "ยอดเยี่ยม!" : "ทำได้ดี!"}</h1>
          <p style={{ fontSize: 14, color: T.muted, marginBottom: 8 }}>{exInfo.labelTh} · {topicMeta?.name ?? "All Topics"}</p>
          <p style={{ fontSize: 14, color: T.muted, marginBottom: 28 }}>{correct}/{total} ข้อถูก</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "ข้อถูก",    value: `${correct}/${total}`, color: T.green },
              { label: "คะแนน",    value: `${sessionScore}%`,     color: T.blue },
              { label: "XP ได้รับ", value: `+${xp} XP`,           color: T.warn },
            ].map((s) => (
              <div key={s.label} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 12px" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.borderHi}`, borderRadius: 16, padding: "20px 24px", marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Grammar Score อัปเดต</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: T.blue }}>{newGrammar}</span>
              <span style={{ fontSize: 14, color: T.muted }}>/100</span>
              <span style={{ fontSize: 13, color: T.green, fontWeight: 700, marginLeft: "auto" }}>
                {newGrammar >= scores.grammar ? `+${newGrammar - scores.grammar}` : `${newGrammar - scores.grammar}`} pts
              </span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${newGrammar}%`, borderRadius: 99, background: `linear-gradient(90deg, ${T.blue}, ${T.green})`, boxShadow: `0 0 12px ${T.blue}60` }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: newLevel.color, fontWeight: 600 }}>
              {levelUp ? `🎖 Level up: ${newLevel.label}!` : `ระดับ: ${newLevel.label}`}
            </div>
          </div>

          {saveErr && <div style={{ fontSize: 12, color: T.error, marginBottom: 16 }}>{saveErr}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => startQuiz(exType, selectedTopic)} style={{
              padding: "14px 0", borderRadius: 12, fontSize: 14, fontWeight: 800,
              background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
              border: "none", color: "#050e1e", cursor: "pointer", boxShadow: `0 0 20px ${T.blue}50`,
            }}>🔀 สลับข้อใหม่ เล่นอีกครั้ง →</button>
            {selectedTopic && (
              <button onClick={() => setMode("type-pick")} style={{ padding: "12px 0", borderRadius: 12, fontSize: 13, fontWeight: 600, background: "transparent", border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer" }}>
                เลือกรูปแบบอื่นใน {selectedTopic}
              </button>
            )}
            <button onClick={() => setMode("topics")} style={{ padding: "12px 0", borderRadius: 12, fontSize: 13, fontWeight: 600, background: "transparent", border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer" }}>
              เลือก Topic อื่น
            </button>
            <Link href="/dashboard" style={{ display: "block", padding: "12px 0", borderRadius: 12, fontSize: 13, textAlign: "center", textDecoration: "none", background: "transparent", border: `1px solid ${T.border}`, color: T.muted }}>
              กลับ Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
}

// ── Layout ────────────────────────────────────────────────────
function Layout({ children, initial, name }: { children: React.ReactNode; initial: string; name: string }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.white, fontFamily: "'LINESeedSansTH', system-ui, sans-serif", display: "flex" }}>
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
          <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg, ${T.blue}, #22d3a0)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#050e1e" }}>{initial}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>Grammar Practice</div>
          </div>
        </Link>
      </aside>
      <main style={{ flex: 1, marginLeft: 200, padding: "32px 24px 60px" }} className="md:ml-[200px]">
        {children}
      </main>
    </div>
  );
}
