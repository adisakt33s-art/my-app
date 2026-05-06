"use client";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#060f20",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
