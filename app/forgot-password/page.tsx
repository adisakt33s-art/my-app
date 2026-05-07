"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Ci from "@/components/Ci";
import { getBrowserClient } from "@/lib/supabase-browser";

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
  error:    "#f87171",
};

function supaErr(msg: string): string {
  if (msg.includes("User not found") || msg.includes("Email not confirmed"))
    return "ไม่พบอีเมลนี้ในระบบ";
  if (msg.includes("rate limit") || msg.includes("too many"))
    return "ลองมากเกินไป กรุณารอสักครู่";
  return msg || "เกิดข้อผิดพลาด กรุณาลองใหม่";
}

function Field({ label, type = "text", placeholder, value, onChange, error }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>
        {label}
      </label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          background: T.surface2,
          border: `1px solid ${error ? T.error : focused ? T.blue : T.border}`,
          borderRadius: 10, padding: "11px 14px", fontSize: 14, color: T.white,
          outline: "none", width: "100%", transition: "border-color 0.15s, box-shadow 0.15s",
          boxShadow: focused ? `0 0 0 3px ${error ? T.error : T.blue}18` : "none",
          boxSizing: "border-box",
        }}
      />
      {error && <span style={{ fontSize: 11, color: T.error, marginTop: 1 }}>{error}</span>}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)];
  const score = checks.filter(Boolean).length;
  const labels = ["อ่อนมาก", "อ่อน", "ปานกลาง", "แข็งแรง"];
  const colors = [T.error, "#f97316", "#fbbf24", T.green];
  return (
    <div style={{ marginTop: -6 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 99,
            background: i < score ? colors[score - 1] : T.border,
            transition: "background 0.25s",
          }} />
        ))}
      </div>
      <p style={{ fontSize: 11, color: colors[score - 1] || T.muted }}>
        ความแข็งแรง: {labels[score - 1] || "—"}
      </p>
    </div>
  );
}

type Step = "email" | "sent" | "newpass" | "done";

function ForgotPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step,    setStep]    = useState<Step>(() => searchParams.get("step") === "newpass" ? "newpass" : "email");
  const [email,   setEmail]   = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  // Step 1: send reset email
  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setErrors({ email: "กรุณากรอกอีเมล" }); return; }
    setLoading(true);
    const supabase = getBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=/forgot-password&type=recovery`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (error) { setErrors({ email: supaErr(error.message) }); return; }
    setErrors({});
    setStep("sent");
  }

  // Step 2 (after redirect back): update password
  async function handleNewPass(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!newPass) errs.newPass = "กรุณากรอกรหัสผ่านใหม่";
    else if (newPass.length < 8) errs.newPass = "ต้องมีอย่างน้อย 8 ตัวอักษร";
    if (newPass !== confirm) errs.confirm = "รหัสผ่านไม่ตรงกัน";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.updateUser({ password: newPass });
    setLoading(false);
    if (error) { setErrors({ newPass: supaErr(error.message) }); return; }
    setStep("done");
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 50% 45% at 80% 15%, rgba(56,189,248,0.07) 0%, transparent 65%),
          radial-gradient(ellipse 35% 40% at 15% 85%, rgba(34,211,160,0.05) 0%, transparent 60%)
        `,
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: T.muted, marginBottom: 24, transition: "color 0.15s", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.blue)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
        >← กลับหน้าเข้าสู่ระบบ</Link>

        <div style={{
          background: T.surface, border: `1px solid ${T.borderHi}`, borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 0 40px rgba(56,189,248,0.06), 0 24px 60px rgba(0,0,0,0.45)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <Ci size={34} />
            <span style={{ fontSize: 16, fontWeight: 800, color: T.blue }}>English</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.white }}>Hub</span>
          </div>

          <h1 style={{ fontSize: 17, fontWeight: 800, color: T.white, marginBottom: 4 }}>รีเซ็ตรหัสผ่าน</h1>

          {/* Step: email */}
          {step === "email" && (
            <>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 24, lineHeight: 1.7 }}>
                กรอกอีเมลที่ลงทะเบียนไว้ ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้
              </p>
              <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="อีเมล" type="email" placeholder="you@example.com"
                  value={email} onChange={setEmail} error={errors.email} />
                <button type="submit" disabled={loading} style={{
                  padding: "13px 0", borderRadius: 11, fontSize: 14, fontWeight: 800,
                  border: "none", cursor: loading ? "not-allowed" : "pointer", width: "100%",
                  background: T.blue, color: "#050e1e", opacity: loading ? 0.6 : 1,
                }}>{loading ? "กำลังส่ง…" : "ส่งลิงก์รีเซ็ต →"}</button>
              </form>
            </>
          )}

          {/* Step: sent */}
          {step === "sent" && (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                background: "rgba(56,189,248,0.1)", border: `1px solid ${T.blue}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, boxShadow: `0 0 24px ${T.blue}40`,
              }}>📧</div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: T.white, marginBottom: 10 }}>ตรวจสอบอีเมลของคุณ</h2>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8 }}>
                ส่งลิงก์รีเซ็ตรหัสผ่านไปที่<br />
                <span style={{ color: T.blue, fontWeight: 700 }}>{email}</span><br />
                คลิกลิงก์ในอีเมลเพื่อตั้งรหัสผ่านใหม่
              </p>
              <button type="button" onClick={() => { setStep("email"); setErrors({}); }}
                style={{ marginTop: 20, background: "none", border: "none", color: T.muted, fontSize: 12, cursor: "pointer" }}>
                ← ส่งอีกครั้ง / เปลี่ยนอีเมล
              </button>
            </div>
          )}

          {/* Step: newpass (reached via email link redirect) */}
          {step === "newpass" && (
            <>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 24, lineHeight: 1.7 }}>
                ตั้งรหัสผ่านใหม่ของคุณ
              </p>
              <form onSubmit={handleNewPass} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="รหัสผ่านใหม่" type="password" placeholder="อย่างน้อย 8 ตัวอักษร"
                  value={newPass} onChange={setNewPass} error={errors.newPass} />
                {newPass.length > 0 && <PasswordStrength password={newPass} />}
                <Field label="ยืนยันรหัสผ่านใหม่" type="password" placeholder="••••••••"
                  value={confirm} onChange={setConfirm} error={errors.confirm} />
                <button type="submit" disabled={loading} style={{
                  padding: "13px 0", borderRadius: 11, fontSize: 14, fontWeight: 800,
                  border: "none", cursor: loading ? "not-allowed" : "pointer", width: "100%",
                  background: T.blue, color: "#050e1e", opacity: loading ? 0.6 : 1,
                }}>{loading ? "กำลังบันทึก…" : "บันทึกรหัสผ่านใหม่ →"}</button>
              </form>
            </>
          )}

          {/* Step: done */}
          {step === "done" && (
            <div style={{ textAlign: "center", padding: "4px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                background: "rgba(34,211,160,0.12)", border: `1px solid ${T.green}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, color: T.green, boxShadow: `0 0 24px ${T.green}40`,
              }}>✓</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: T.white, marginBottom: 8 }}>
                เปลี่ยนรหัสผ่านสำเร็จ!
              </h2>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
                กำลังพาไปหน้า Dashboard…
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordInner />
    </Suspense>
  );
}
