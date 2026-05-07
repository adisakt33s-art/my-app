"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/dashboard"); }, [router]);
  return (
    <div style={{
      minHeight: "100vh", background: "#060f20",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ color: "#4a6a8a", fontSize: 14 }}>กำลังเข้าสู่ระบบ...</div>
    </div>
  );
}
