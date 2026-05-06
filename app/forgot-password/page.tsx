"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Ci from "@/components/Ci";

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

function clerkErr(err: unknown): string {
  if (!err) return "เกิดข้อผิดพลาด กรุณาลองใหม่";
  const api = err as { errors?: Array<{ code?: string; longMessage?: string; message?: string }> };
  if (api.errors && api.errors.length > 0) {
    const code = api.errors[0].code ?? "";
    const map: Record<string, string> = {
      form_identifier_not_found: "ไม่พบอีเมลนี้ในระบบ",
      form_code_incorrect:       "รหัส OTP ไม่ถูกต้อง",
      form_code_expired:         "รหัส OTP หมดอายุ กรุณาขอใหม่",
      form_password_pwned:       "รหัสผ่านนี้ไม่ปลอดภัย กรุณาเปลี่ยน",
      too_many_requests:         "ลองมากเกินไป กรุณารอสักครู่",
    };
    return map[code] ?? (api.errors[0].longMessage || api.errors[0].message || "เกิดข้อผิดพลาด");
  }
  const ce = err as { code?: string; longMessage?: string; message?: string };
  const code = ce.code ?? "";
  const map: Record<string, string> = {
    form_identifier_not_found: "ไม่พบอีเมลนี้ในระบบ",
    form_code_incorrect:       "รหัส OTP ไม่ถูกต้อง",
    form_code_expired:         "รหัส OTP หมดอายุ กรุณาขอใหม่",
    form_password_pwned:       "รหัสผ่านนี้ไม่ปลอดภัย กรุณาเปลี่ยน",
    too_many_requests:         "ลองมากเกินไป กรุณารอสักครู่",
  };
  return map[code] ?? (ce.longMessage || ce.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
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
        }}
      />
      {error && <span style={{ fontSize: 11, color: T.error, marginTop: 1 }}>{error}</span>}
    </div>
  );
}

function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");
  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0)
      (document.getElementById(`fp-otp-${i - 1}`) as HTMLInputElement)?.focus();
  }
  function handleChange(i: number, v: string) {
    if (!/^\d*$/.test(v)) return;
    onChange(digits.map((d, idx) => (idx === i ? v.slice(-1) : d)).join(""));
    if (v && i < 5) (document.getElementById(`fp-otp-${i + 1}`) as HTMLInputElement)?.focus();
  }
  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(p);
    (document.getElementById(`fp-otp-${Math.min(p.length, 5)}`) as HTMLInputElement)?.focus();
  }
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {digits.map((d, i) => (
        <input key={i} id={`fp-otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)} onPaste={handlePaste}
          style={{
            flex: 1, aspectRatio: "1", textAlign: "center",
            fontSize: 20, fontWeight: 800, color: T.white,
            background: T.surface2, border: `1px solid ${d ? T.blue : T.border}`,
            borderRadius: 10, outline: "none",
            boxShadow: d ? `0 0 10px ${T.blue}30` : "none",
            transition: "border-color 0.15s",
          }}
        />
      ))}
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

function Btn({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit" disabled={loading}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "13px 0", borderRadius: 11, fontSize: 14, fontWeight: 800,
        border: "none", cursor: loading ? "not-allowed" : "pointer", width: "100%",
        background: T.blue, color: "#050e1e",
        boxShadow: `0 0 20px ${T.blue}${hov && !loading ? "70" : "45"}`,
        opacity: loading ? 0.6 : hov ? 0.88 : 1, transition: "opacity 0.15s",
      }}
    >{loading ? "กำลังดำเนินการ…" : children}</button>
  );
}

// ── Steps ─────────────────────────────────────────────────────
type Step = "email" | "verify" | "newpass" | "done";

function StepBar({ current }: { current: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "email", label: "อีเมล" }, { id: "verify", label: "OTP" },
    { id: "newpass", label: "รหัสใหม่" }, { id: "done", label: "เสร็จ" },
  ];
  const idx = steps.findIndex((s) => s.id === current);
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : undefined }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800,
              background: i < idx ? "rgba(34,211,160,0.15)" : i === idx ? T.blue : T.surface2,
              border: `1px solid ${i < idx ? T.green : i === idx ? T.blue : T.border}`,
              color: i < idx ? T.green : i === idx ? "#050e1e" : T.muted,
              boxShadow: i === idx ? `0 0 12px ${T.blue}60` : "none",
              transition: "all 0.3s",
            }}>{i < idx ? "✓" : i + 1}</div>
            <span style={{ fontSize: 10, fontWeight: 600, color: i === idx ? T.white : T.muted, whiteSpace: "nowrap" }}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, margin: "0 4px", marginBottom: 14, background: i < idx ? T.green : T.border, transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  // Clerk v7 Signal API — no setActive, no isLoaded
  const { signIn } = useSignIn();

  const [step,    setStep]    = useState<Step>("email");
  const [email,   setEmail]   = useState("");
  const [otp,     setOtp]     = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  // Step 1: identify + send reset code
  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setErrors({ email: "กรุณากรอกอีเมล" }); return; }
    if (!signIn) return;
    setLoading(true);
    try {
      // Identify the user
      const { error: createErr } = await signIn.create({ identifier: email });
      if (createErr) { setErrors({ email: clerkErr(createErr) }); return; }

      // Send password reset code
      const { error: sendErr } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendErr) { setErrors({ email: clerkErr(sendErr) }); return; }

      setErrors({});
      setStep("verify");
    } catch (err) {
      setErrors({ email: clerkErr(err) });
    } finally {
      setLoading(false);
    }
  }

  // Step 2: verify OTP code
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length < 6) { setErrors({ otp: "กรุณากรอก OTP ให้ครบ 6 หลัก" }); return; }
    if (!signIn) return;
    setLoading(true);
    try {
      const { error: verifyErr } = await signIn.resetPasswordEmailCode.verifyCode({ code: otp });
      if (verifyErr) { setErrors({ otp: clerkErr(verifyErr) }); return; }

      setErrors({});
      setStep("newpass");
    } catch (err) {
      setErrors({ otp: clerkErr(err) });
    } finally {
      setLoading(false);
    }
  }

  // Step 3: submit new password
  async function handleNewPass(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!newPass) errs.newPass = "กรุณากรอกรหัสผ่านใหม่";
    else if (newPass.length < 8) errs.newPass = "ต้องมีอย่างน้อย 8 ตัวอักษร";
    if (newPass !== confirm) errs.confirm = "รหัสผ่านไม่ตรงกัน";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!signIn) return;
    setLoading(true);
    try {
      // Submit new password (status becomes 'complete')
      const { error: passErr } = await signIn.resetPasswordEmailCode.submitPassword({ password: newPass });
      if (passErr) { setErrors({ newPass: clerkErr(passErr) }); return; }

      // Create the session
      const { error: finalErr } = await signIn.finalize();
      if (finalErr) { setErrors({ newPass: clerkErr(finalErr) }); return; }

      setStep("done");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setErrors({ newPass: clerkErr(err) });
    } finally {
      setLoading(false);
    }
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
        <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: T.muted, marginBottom: 24, transition: "color 0.15s" }}
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
          <p style={{ fontSize: 12, color: T.muted, marginBottom: 24 }}>ทำตาม 3 ขั้นตอนเพื่อตั้งรหัสผ่านใหม่</p>

          <StepBar current={step} />

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="อีเมลที่ลงทะเบียนไว้" type="email" placeholder="you@example.com"
                value={email} onChange={setEmail} error={errors.email} />
              <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.7, marginTop: -6 }}>
                ระบบจะส่งรหัส OTP ไปยังอีเมลของคุณทันที
              </p>
              <Btn loading={loading}>ส่งรหัส OTP →</Btn>
            </form>
          )}

          {/* Step 2: Verify OTP */}
          {step === "verify" && (
            <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(56,189,248,0.06)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: T.muted, lineHeight: 1.7 }}>
                ส่ง OTP ไปที่{" "}
                <span style={{ color: T.blue, fontWeight: 700 }}>{email}</span>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  รหัส OTP (6 หลัก)
                </label>
                <OtpInput value={otp} onChange={setOtp} />
                {errors.otp && <span style={{ fontSize: 11, color: T.error, marginTop: 6, display: "block" }}>{errors.otp}</span>}
              </div>
              <Btn loading={loading}>ยืนยัน OTP →</Btn>
              <button type="button" onClick={() => { setStep("email"); setOtp(""); setErrors({}); }}
                style={{ background: "none", border: "none", color: T.muted, fontSize: 12, cursor: "pointer", textAlign: "center" }}>
                ← กลับ / ส่ง OTP ใหม่
              </button>
            </form>
          )}

          {/* Step 3: New password */}
          {step === "newpass" && (
            <form onSubmit={handleNewPass} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="รหัสผ่านใหม่" type="password" placeholder="อย่างน้อย 8 ตัวอักษร"
                value={newPass} onChange={setNewPass} error={errors.newPass} />
              {newPass.length > 0 && <PasswordStrength password={newPass} />}
              <Field label="ยืนยันรหัสผ่านใหม่" type="password" placeholder="••••••••"
                value={confirm} onChange={setConfirm} error={errors.confirm} />
              <Btn loading={loading}>บันทึกรหัสผ่านใหม่ →</Btn>
            </form>
          )}

          {/* Done */}
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
