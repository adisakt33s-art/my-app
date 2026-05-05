import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnglishHub — เรียนอังกฤษครบทุกทักษะ",
  description: "แพลตฟอร์มเรียนภาษาอังกฤษออนไลน์ Grammar · Speaking · Listening · Vocabulary พร้อม AI Tutor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.linecdn.com/line-seed-sans/web/v2/css/LINESeedSansTHW_All.css"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--ink)" }}>
        {children}
      </body>
    </html>
  );
}
