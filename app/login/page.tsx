"use client";
import { useState, useEffect, Suspense } from "react";
import { useSignIn, useSignUp, useUser, useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Ci from "@/components/Ci";

// ── Theme ─────────────────────────────────────────────────────
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

// ── Map Clerk error codes → Thai ──────────────────────────────
function clerkErr(err: unknown): string {
  if (!err) return "เกิดข้อผิดพลาด กรุณาลองใหม่";
  // ClerkAPIResponseError has .errors array
  const api = err as { errors?: Array<{ code?: string; longMessage?: string; message?: string }> };
  if (api.errors && api.errors.length > 0) {
    const code = api.errors[0].code ?? "";
    const map: Record<string, string> = {
      form_password_incorrect:   "รหัสผ่านไม่ถูกต้อง",
      form_identifier_not_found: "ไม่พบอีเมลนี้ในระบบ กรุณาสมัครก่อน",
      form_identifier_exists:    "อีเมลนี้มีบัญชีอยู่แล้ว กรุณาเข้าสู่ระบบ",
      form_code_incorrect:       "รหัส OTP ไม่ถูกต้อง",
      form_code_expired:         "รหัส OTP หมดอายุ กรุณาขอใหม่",
      form_password_pwned:       "รหัสผ่านนี้ไม่ปลอดภัย กรุณาเปลี่ยน",
      too_many_requests:         "ลองมากเกินไป กรุณารอสักครู่",
    };
    return map[code] ?? (api.errors[0].longMessage || api.errors[0].message || "เกิดข้อผิดพลาด");
  }
  // ClerkError has .code and .longMessage directly
  const ce = err as { code?: string; longMessage?: string; message?: string };
  const code = ce.code ?? "";
  const map: Record<string, string> = {
    form_password_incorrect:   "รหัสผ่านไม่ถูกต้อง",
    form_identifier_not_found: "ไม่พบอีเมลนี้ในระบบ กรุณาสมัครก่อน",
    form_identifier_exists:    "อีเมลนี้มีบัญชีอยู่แล้ว กรุณาเข้าสู่ระบบ",
    form_code_incorrect:       "รหัส OTP ไม่ถูกต้อง",
    form_code_expired:         "รหัส OTP หมดอายุ กรุณาขอใหม่",
    form_password_pwned:       "รหัสผ่านนี้ไม่ปลอดภัย กรุณาเปลี่ยน",
    too_many_requests:         "ลองมากเกินไป กรุณารอสักครู่",
  };
  return map[code] ?? (ce.longMessage || ce.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
}

// ── Social providers ──────────────────────────────────────────
const socials: Array<{
  id: "oauth_google" | "oauth_facebook" | "oauth_line";
  label: string; bg: string; border: string; color: string;
  icon: React.ReactNode;
}> = [
  {
    id: "oauth_google", label: "Google",
    bg: T.surface2, border: "rgba(255,255,255,0.10)", color: T.white,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: "oauth_facebook", label: "Facebook",
    bg: "rgba(24,119,242,0.10)", border: "rgba(24,119,242,0.30)", color: "#74b3ff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#74b3ff">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: "oauth_line", label: "LINE",
    bg: "rgba(6,199,85,0.10)", border: "rgba(6,199,85,0.30)", color: "#4ade80",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#4ade80">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    ),
  },
];

// ── Field ─────────────────────────────────────────────────────
function Field({ label, type = "text", placeholder, value, onChange, error, autoComplete }: {
  label: string; type?: string; placeholder?: string; autoComplete?: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} value={value} autoComplete={autoComplete}
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

// ── OTP input ─────────────────────────────────────────────────
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={value}
        autoComplete="one-time-code"
        placeholder="— — — — — —"
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        onPaste={(e) => {
          e.preventDefault();
          onChange(e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6));
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: 220, textAlign: "center",
          fontSize: 22, fontWeight: 800, letterSpacing: "0.35em",
          padding: "12px 16px", background: T.surface2,
          border: `1px solid ${focused ? T.blue : value.length === 6 ? T.blue : T.border}`,
          borderRadius: 12, color: T.white, outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
          boxShadow: focused ? `0 0 0 3px ${T.blue}18` : "none",
        }}
      />
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%",
            background: i < value.length ? T.blue : T.border,
            transition: "background 0.12s",
            boxShadow: i < value.length ? `0 0 5px ${T.blue}80` : "none",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Primary button ────────────────────────────────────────────
function Btn({ children, onClick, gradient, loading }: {
  children: React.ReactNode; onClick?: () => void;
  gradient?: boolean; loading?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button type={onClick ? "button" : "submit"} onClick={onClick} disabled={loading}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "13px 0", borderRadius: 11, fontSize: 14, fontWeight: 800,
        border: "none", cursor: loading ? "not-allowed" : "pointer", width: "100%",
        transition: "opacity 0.15s",
        background: gradient ? `linear-gradient(135deg, ${T.blue}, ${T.green})` : T.blue,
        color: "#050e1e",
        boxShadow: `0 0 20px ${T.blue}${hov && !loading ? "70" : "45"}`,
        opacity: loading ? 0.6 : hov ? 0.88 : 1,
      }}
    >
      {loading ? "กำลังดำเนินการ…" : children}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────
type Mode = "signin" | "signup" | "pending" | "done";

function LoginContent() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const searchParams = useSearchParams();
  // Clerk v7 Signal API — no setActive, no isLoaded
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  // Server redirected here with ?redirect_url → client session is stale → sign out
  useEffect(() => {
    if (isLoaded && user && searchParams.has("redirect_url")) {
      signOut();
    }
  }, [isLoaded, user, searchParams, signOut]);

  const [mode, setMode]   = useState<Mode>("signin");
  const [loading, setLoading] = useState(false);

  // sign-in fields
  const [siEmail, setSiEmail] = useState("");
  const [siPass,  setSiPass]  = useState("");

  // sign-up fields
  const [suName,    setSuName]    = useState("");
  const [suEmail,   setSuEmail]   = useState("");
  const [suPass,    setSuPass]    = useState("");
  const [suConfirm, setSuConfirm] = useState("");

  // OTP
  const [otp,     setOtp]     = useState("");
  const [pending, setPending] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  function reset() { setErrors({}); }

  // ── OAuth ────────────────────────────────────────────────────
  async function handleOAuth(provider: typeof socials[number]["id"]) {
    if (!signIn) return;
    const { error } = await signIn.sso({
      strategy: provider,
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectCallbackUrl: `${window.location.origin}/dashboard`,
    });
    if (error) setErrors({ oauth: clerkErr(error) });
  }

  // ── Sign in ──────────────────────────────────────────────────
  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!siEmail) errs.siEmail = "กรุณากรอกอีเมล";
    if (!siPass)  errs.siPass  = "กรุณากรอกรหัสผ่าน";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!signIn) return;
    setLoading(true);
    try {
      // Step 1: set identifier
      const { error: createErr } = await signIn.create({ identifier: siEmail });
      if (createErr) { setErrors({ siEmail: clerkErr(createErr) }); return; }

      // Step 2: verify password
      const { error: passErr } = await signIn.password({ password: siPass });
      if (passErr) { setErrors({ siPass: clerkErr(passErr) }); return; }

      // Step 3: create session
      const { error: finalErr } = await signIn.finalize();
      if (finalErr) { setErrors({ siPass: clerkErr(finalErr) }); return; }

      router.push("/dashboard");
    } catch (err) {
      setErrors({ siPass: clerkErr(err) });
    } finally {
      setLoading(false);
    }
  }

  // ── Sign up ──────────────────────────────────────────────────
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!suName)  errs.suName    = "กรุณากรอกชื่อหรือชื่อเล่น";
    if (!suEmail) errs.suEmail   = "กรุณากรอกอีเมล";
    if (!suPass)  errs.suPass    = "กรุณากรอกรหัสผ่าน";
    else if (suPass.length < 8)  errs.suPass = "ต้องมีอย่างน้อย 8 ตัวอักษร";
    if (suPass !== suConfirm)    errs.suConfirm = "รหัสผ่านไม่ตรงกัน";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!signUp) return;
    setLoading(true);
    try {
      // Create sign-up
      const { error: createErr } = await signUp.create({
        firstName:    suName,
        emailAddress: suEmail,
        password:     suPass,
      });
      if (createErr) { setErrors({ suEmail: clerkErr(createErr) }); return; }

      // Send email verification code
      const { error: sendErr } = await signUp.verifications.sendEmailCode();
      if (sendErr) { setErrors({ suEmail: clerkErr(sendErr) }); return; }

      setPending(suEmail);
      setOtp("");
      setMode("pending");
    } catch (err) {
      setErrors({ suEmail: clerkErr(err) });
    } finally {
      setLoading(false);
    }
  }

  // ── Verify OTP ───────────────────────────────────────────────
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;
    if (otp.length < 6) { setErrors({ otp: "กรุณากรอก OTP ให้ครบ 6 หลัก" }); return; }
    setLoading(true);
    try {
      // Verify email code
      const { error: verifyErr } = await signUp.verifications.verifyEmailCode({ code: otp });
      if (verifyErr) { setErrors({ otp: clerkErr(verifyErr) }); return; }

      // Create session
      const { error: finalErr } = await signUp.finalize();
      if (finalErr) { setErrors({ otp: clerkErr(finalErr) }); return; }

      setMode("done");
      setTimeout(() => router.push("/dashboard"), 1800);
    } catch (err) {
      setErrors({ otp: clerkErr(err) });
    } finally {
      setLoading(false);
    }
  }

  // ── Resend OTP ───────────────────────────────────────────────
  async function resendOtp() {
    if (!signUp) return;
    try {
      const { error } = await signUp.verifications.sendEmailCode();
      if (error) { setErrors({ otp: clerkErr(error) }); return; }
      setOtp("");
      reset();
    } catch (err) {
      setErrors({ otp: clerkErr(err) });
    }
  }

  // Already signed in and NOT a server redirect → offer dashboard or sign out
  if (isLoaded && user && !searchParams.has("redirect_url")) return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.borderHi}`, borderRadius: 20,
        padding: "36px 28px", maxWidth: 380, width: "100%", textAlign: "center",
        boxShadow: "0 0 40px rgba(56,189,248,0.06), 0 24px 60px rgba(0,0,0,0.45)",
      }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>👋</div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: T.white, marginBottom: 8 }}>
          เข้าสู่ระบบอยู่แล้ว
        </h2>
        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, marginBottom: 24 }}>
          คุณ sign in ในชื่อ <span style={{ color: T.blue, fontWeight: 700 }}>
            {user.firstName || user.emailAddresses?.[0]?.emailAddress || "ผู้ใช้"}
          </span> อยู่แล้ว
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn onClick={() => router.push("/dashboard")} gradient>ไปหน้า Dashboard →</Btn>
          <button onClick={() => signOut(() => router.push("/login"))} style={{
            padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 700,
            border: `1px solid ${T.border}`, background: "transparent",
            color: T.muted, cursor: "pointer",
          }}>
            ออกจากระบบ (เปลี่ยนบัญชี)
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 55% 50% at 75% 20%, rgba(56,189,248,0.07) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(34,211,160,0.05) 0%, transparent 60%)
        `,
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>

        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: T.muted, marginBottom: 24, transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.blue)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
        >← กลับหน้าแรก</Link>

        <div style={{
          background: T.surface, border: `1px solid ${T.borderHi}`, borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 0 40px rgba(56,189,248,0.06), 0 24px 60px rgba(0,0,0,0.45)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
            <Ci size={34} />
            <span style={{ fontSize: 16, fontWeight: 800, color: T.blue }}>English</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.white }}>Hub</span>
          </div>

          {/* ── PENDING: email OTP ── */}
          {mode === "pending" && (
            <form onSubmit={handleVerifyOtp} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>📬</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: T.white, marginBottom: 8 }}>
                ยืนยันอีเมลของคุณ
              </h2>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, marginBottom: 6 }}>
                ส่งรหัส 6 หลักไปที่
              </p>
              <p style={{
                fontSize: 13, fontWeight: 700, color: T.blue,
                background: "rgba(56,189,248,0.08)", border: `1px solid ${T.border}`,
                borderRadius: 8, padding: "8px 14px", marginBottom: 24,
              }}>{pending}</p>
              <div style={{ textAlign: "left", marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  รหัส OTP (6 หลัก)
                </label>
                <OtpInput value={otp} onChange={setOtp} />
                {errors.otp && <span style={{ fontSize: 11, color: T.error, marginTop: 6, display: "block" }}>{errors.otp}</span>}
              </div>
              <div style={{ marginTop: 20 }}>
                <Btn gradient loading={loading}>✓ ยืนยันและเข้าสู่ระบบ</Btn>
              </div>
              <button type="button" onClick={resendOtp} style={{ marginTop: 12, background: "none", border: "none", color: T.muted, fontSize: 12, cursor: "pointer" }}>
                ไม่ได้รับรหัส? ส่งอีกครั้ง
              </button>
            </form>
          )}

          {/* ── DONE ── */}
          {mode === "done" && (
            <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                background: "rgba(34,211,160,0.12)", border: `1px solid ${T.green}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, color: T.green, boxShadow: `0 0 20px ${T.green}40`,
              }}>✓</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: T.white, marginBottom: 8 }}>
                ยืนยันสำเร็จแล้ว!
              </h2>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
                กำลังพาไปหน้า Dashboard…
              </p>
            </div>
          )}

          {/* ── SIGN IN / SIGN UP ── */}
          {(mode === "signin" || mode === "signup") && (
            <>
              {/* Tabs */}
              <div style={{ display: "flex", gap: 2, marginBottom: 24, background: T.surface2, borderRadius: 12, padding: 4 }}>
                {(["signin", "signup"] as const).map((m) => (
                  <button key={m} onClick={() => { setMode(m); reset(); }} style={{
                    flex: 1, padding: "9px 0", borderRadius: 9,
                    fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", transition: "all 0.18s",
                    background: mode === m ? T.blue : "transparent",
                    color: mode === m ? "#050e1e" : T.muted,
                    boxShadow: mode === m ? `0 0 14px ${T.blue}50` : "none",
                  }}>
                    {m === "signin" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
                  </button>
                ))}
              </div>

              {/* Sign in */}
              {mode === "signin" && (
                <>
                  {/* Social buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {errors.oauth && (
                      <p style={{ fontSize: 12, color: T.error, textAlign: "center", marginBottom: 4 }}>{errors.oauth}</p>
                    )}
                    {socials.map((s) => (
                      <button key={s.id} onClick={() => handleOAuth(s.id)} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "11px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                        border: `1px solid ${s.border}`, background: s.bg,
                        color: s.color, cursor: "pointer", width: "100%",
                        transition: "opacity 0.15s, transform 0.12s",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
                      >
                        <span style={{ flexShrink: 0 }}>{s.icon}</span>
                        <span>เข้าสู่ระบบด้วย <span style={{ fontWeight: 800 }}>{s.label}</span></span>
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ flex: 1, height: 1, background: T.border }} />
                    <span style={{ fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: "0.05em" }}>หรือใช้อีเมล</span>
                    <div style={{ flex: 1, height: 1, background: T.border }} />
                  </div>

                  <form onSubmit={handleSignin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <Field label="อีเมล" type="email" placeholder="you@example.com" autoComplete="email"
                      value={siEmail} onChange={setSiEmail} error={errors.siEmail} />
                    <Field label="รหัสผ่าน" type="password" placeholder="••••••••" autoComplete="current-password"
                      value={siPass} onChange={setSiPass} error={errors.siPass} />
                    <div style={{ textAlign: "right", marginTop: -6 }}>
                      <Link href="/forgot-password" style={{ fontSize: 12, color: T.muted, transition: "color 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = T.blue)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
                      >ลืมรหัสผ่าน?</Link>
                    </div>
                    <Btn loading={loading}>เข้าสู่ระบบ →</Btn>
                    <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 2 }}>
                      ยังไม่มีบัญชี?{" "}
                      <button type="button" onClick={() => { setMode("signup"); reset(); }} style={{ background: "none", border: "none", color: T.blue, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                        สมัครฟรีเลย
                      </button>
                    </p>
                  </form>
                </>
              )}

              {/* Sign up */}
              {mode === "signup" && (
                <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <Field label="ชื่อหรือชื่อเล่น" placeholder="ภูมิ / Phoom" autoComplete="name"
                    value={suName} onChange={setSuName} error={errors.suName} />
                  <Field label="อีเมล" type="email" placeholder="you@example.com" autoComplete="email"
                    value={suEmail} onChange={setSuEmail} error={errors.suEmail} />
                  <Field label="รหัสผ่าน" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" autoComplete="new-password"
                    value={suPass} onChange={setSuPass} error={errors.suPass} />
                  <Field label="ยืนยันรหัสผ่าน" type="password" placeholder="••••••••" autoComplete="new-password"
                    value={suConfirm} onChange={setSuConfirm} error={errors.suConfirm} />
                  <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.7, marginTop: -4 }}>
                    การสมัครถือว่าคุณยอมรับ{" "}
                    <a href="#" style={{ color: T.blue }}>นโยบายความเป็นส่วนตัว</a>{" "}
                    และ <a href="#" style={{ color: T.blue }}>เงื่อนไขการใช้งาน</a>
                  </p>
                  <Btn gradient loading={loading}>สร้างบัญชี →</Btn>
                  <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 2 }}>
                    มีบัญชีอยู่แล้ว?{" "}
                    <button type="button" onClick={() => { setMode("signin"); reset(); }} style={{ background: "none", border: "none", color: T.blue, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                      เข้าสู่ระบบ
                    </button>
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#060f20" }} />}>
      <LoginContent />
    </Suspense>
  );
}
