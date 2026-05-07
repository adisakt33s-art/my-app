"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Ci from "@/components/Ci";

const T = {
  bg: "#060f20",
  surface: "#0c1830",
  surface2: "#102040",
  borderHi: "#2a4880",
  blue: "#38bdf8",
  white: "#e8f4ff",
  muted: "#4a6a8a",
  error: "#f87171",
};

type ProviderId = "line" | "google";
type AuthProvider = {
  id: string;
  name: string;
  signinUrl: string;
  callbackUrl: string;
  type: string;
};

function ProviderButton({
  provider,
  loading,
  onClick,
}: {
  provider: ProviderId;
  loading: boolean;
  onClick: () => void;
}) {
  const isLine = provider === "line";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        minHeight: 48,
        padding: "12px 16px",
        borderRadius: 11,
        border: isLine ? "1px solid rgba(6,199,85,0.35)" : "1px solid rgba(255,255,255,0.10)",
        background: isLine ? "rgba(6,199,85,0.12)" : T.surface2,
        color: isLine ? "#7CFFA8" : T.white,
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: 14,
        fontWeight: 800,
        opacity: loading ? 0.65 : 1,
      }}
    >
      {isLine ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#06C755" style={{ flexShrink: 0 }}>
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      )}
      {loading
        ? `กำลังไปที่ ${isLine ? "LINE" : "Google"}...`
        : `เข้าสู่ระบบด้วย ${isLine ? "LINE" : "Google"}`}
    </button>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [providers, setProviders] = useState<Record<string, AuthProvider>>({});

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const urlError = searchParams.get("error");

  useEffect(() => {
    if (status === "authenticated") router.push(callbackUrl);
  }, [callbackUrl, router, status]);

  useEffect(() => {
    fetch("/api/auth/providers")
      .then((res) => res.json())
      .then((data: Record<string, AuthProvider>) => setProviders(data))
      .catch(() => setProviders({}));
  }, []);

  async function handleProvider(provider: ProviderId) {
    setLoadingProvider(provider);
    await signIn(provider, { callbackUrl });
    setLoadingProvider(null);
  }

  const availableProviders = (["line", "google"] as ProviderId[]).filter((provider) => providers[provider]);

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `
          radial-gradient(ellipse 55% 50% at 75% 20%, rgba(56,189,248,0.07) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(34,211,160,0.05) 0%, transparent 60%)
        `,
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: T.muted,
          marginBottom: 24,
          textDecoration: "none",
        }}>
          ← กลับหน้าแรก
        </Link>

        <div style={{
          background: T.surface,
          border: `1px solid ${T.borderHi}`,
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 0 40px rgba(56,189,248,0.06), 0 24px 60px rgba(0,0,0,0.45)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
            <Ci size={34} />
            <span style={{ fontSize: 16, fontWeight: 800, color: T.blue }}>English</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.white }}>Hub</span>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 900, color: T.white, marginBottom: 8 }}>
            เข้าสู่ระบบ
          </h1>
          <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, marginBottom: 22 }}>
            ใช้ NextAuth.js จัดการการเข้าสู่ระบบ และบันทึกบัญชีผู้ใช้ลง Supabase โดยอัตโนมัติ
          </p>

          {urlError && (
            <div style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(248,113,113,0.1)",
              border: `1px solid ${T.error}`,
              color: T.error,
              fontSize: 12,
              marginBottom: 16,
            }}>
              เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {availableProviders.map((provider) => (
              <ProviderButton
                key={provider}
                provider={provider}
                loading={loadingProvider === provider}
                onClick={() => handleProvider(provider)}
              />
            ))}
          </div>

          <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.7, marginTop: 18 }}>
            ปุ่มเข้าสู่ระบบถูกโหลดจาก /api/auth/providers โดยตรง และ NextAuth จะบันทึกบัญชี provider ลง Supabase ผ่าน SupabaseAdapter
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: T.bg }} />}>
      <LoginContent />
    </Suspense>
  );
}
