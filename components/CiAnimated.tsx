"use client";
import { useEffect, useRef, useState } from "react";

export default function CiAnimated({ size = 220 }: { size?: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const [rot,   setRot]   = useState({ x: 0, y: 0 });
  const [eye,   setEye]   = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width  / 2)) / (window.innerWidth  / 2);
      const ny = (e.clientY - (r.top  + r.height / 2)) / (window.innerHeight / 2);
      setRot({ x: -ny * 14, y: nx * 14 });
      setEye({ x: nx * 4.5, y: ny * 3 });
    };

    const blinkTimer = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 130);
    }, 3200);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(blinkTimer);
    };
  }, []);

  const ex = eye.x, ey = eye.y;

  return (
    <>
      <style>{`
        @keyframes ci-float {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-14px); }
        }
        @keyframes ci-led-pulse {
          0%,100% { opacity:.85; }
          50%      { opacity:1;  filter:brightness(1.4); }
        }
        @keyframes ci-antenna-glow {
          0%,100% { filter: drop-shadow(0 0 4px #22d3a0) drop-shadow(0 0 2px #22d3a0); }
          50%      { filter: drop-shadow(0 0 10px #22d3a0) drop-shadow(0 0 6px #86efca); }
        }
      `}</style>

      <div ref={ref} style={{ width: size, height: size, perspective: 900, cursor: "default" }}>
        <div style={{
          width: "100%", height: "100%",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.07s ease-out",
          animation: "ci-float 3.6s ease-in-out infinite",
        }}>
          <svg viewBox="0 0 120 136" width={size} height={size} fill="none">
            <defs>
              {/* 3-D radial gradients give sphere depth */}
              <radialGradient id="g-head" cx="32%" cy="28%" r="72%">
                <stop offset="0%"   stopColor="#1a3f72"/>
                <stop offset="100%" stopColor="#060f20"/>
              </radialGradient>
              <radialGradient id="g-body" cx="32%" cy="22%" r="72%">
                <stop offset="0%"   stopColor="#142e5c"/>
                <stop offset="100%" stopColor="#060d1a"/>
              </radialGradient>
              <radialGradient id="g-eye-b" cx="30%" cy="28%" r="72%">
                <stop offset="0%"   stopColor="#bae8ff"/>
                <stop offset="60%"  stopColor="#38bdf8"/>
                <stop offset="100%" stopColor="#0369a1"/>
              </radialGradient>
              <radialGradient id="g-eye-g" cx="30%" cy="28%" r="72%">
                <stop offset="0%"   stopColor="#a7f3d0"/>
                <stop offset="60%"  stopColor="#22d3a0"/>
                <stop offset="100%" stopColor="#065f46"/>
              </radialGradient>
              <radialGradient id="g-led-g" cx="30%" cy="28%" r="70%">
                <stop offset="0%"   stopColor="#86efca"/>
                <stop offset="100%" stopColor="#059669"/>
              </radialGradient>
              <radialGradient id="g-led-b" cx="30%" cy="28%" r="70%">
                <stop offset="0%"   stopColor="#bae8ff"/>
                <stop offset="100%" stopColor="#0284c7"/>
              </radialGradient>

              {/* Glow filter for eyes */}
              <filter id="f-glow-b" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="f-glow-g" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="60" cy="134" rx="28" ry="4"
              fill="rgba(56,189,248,0.18)"/>

            {/* ── Antenna ─────────────────── */}
            <g style={{ animation: "ci-antenna-glow 2.4s ease-in-out infinite" }}>
              <line x1="60" y1="20" x2="60" y2="6"
                stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="60" cy="4" r="6" fill="#22d3a0"/>
              <circle cx="60" cy="4" r="3" fill="#a7f3d0"/>
              <circle cx="58" cy="2.5" r="1.2" fill="white" opacity="0.9"/>
            </g>

            {/* ── Head ────────────────────── */}
            <rect x="16" y="20" width="88" height="66" rx="26"
              fill="url(#g-head)" stroke="#38bdf8" strokeWidth="1.5"/>
            {/* Specular highlight (top-left streak) */}
            <rect x="20" y="24" width="44" height="18" rx="12"
              fill="white" opacity="0.055"/>

            {/* ── Face screen ─────────────── */}
            <rect x="26" y="30" width="68" height="48" rx="14"
              fill="#060f20"/>
            <rect x="26" y="30" width="68" height="48" rx="14"
              stroke="rgba(56,189,248,0.25)" strokeWidth="1"/>

            {/* ── Left eye (blue) ─────────── */}
            <g filter="url(#f-glow-b)">
              <circle cx={47 + ex} cy={54 + ey} r="11"
                fill="rgba(56,189,248,0.08)"/>
              <circle cx={47 + ex} cy={54 + ey} r="8"
                fill="url(#g-eye-b)"
                style={{
                  transform: `scaleY(${blink ? 0.05 : 1})`,
                  transformOrigin: `${47 + ex}px ${54 + ey}px`,
                  transition: "transform 0.09s ease",
                }}/>
            </g>
            <circle cx={49 + ex} cy={51 + ey} r="2.8" fill="white" opacity="0.88"/>
            <circle cx={48.5 + ex} cy={50.5 + ey} r="1" fill="white"/>

            {/* ── Right eye (green) ───────── */}
            <g filter="url(#f-glow-g)">
              <circle cx={73 + ex} cy={54 + ey} r="11"
                fill="rgba(34,211,160,0.08)"/>
              <circle cx={73 + ex} cy={54 + ey} r="8"
                fill="url(#g-eye-g)"
                style={{
                  transform: `scaleY(${blink ? 0.05 : 1})`,
                  transformOrigin: `${73 + ex}px ${54 + ey}px`,
                  transition: "transform 0.09s ease",
                }}/>
            </g>
            <circle cx={75 + ex} cy={51 + ey} r="2.8" fill="white" opacity="0.88"/>
            <circle cx={74.5 + ex} cy={50.5 + ey} r="1" fill="white"/>

            {/* ── Smile ───────────────────── */}
            <path d={`M43 70 Q60 80 77 70`}
              stroke="#38bdf8" strokeWidth="2.8" fill="none" strokeLinecap="round"/>

            {/* ── Ears ────────────────────── */}
            <rect x="5" y="42" width="13" height="22" rx="6.5"
              fill="url(#g-head)" stroke="#38bdf8" strokeWidth="1.5"/>
            <rect x="102" y="42" width="13" height="22" rx="6.5"
              fill="url(#g-head)" stroke="#38bdf8" strokeWidth="1.5"/>

            {/* ── Body ────────────────────── */}
            <rect x="28" y="84" width="64" height="46" rx="18"
              fill="url(#g-body)" stroke="#1a3260" strokeWidth="1.5"/>
            {/* Body specular */}
            <rect x="32" y="88" width="30" height="14" rx="7"
              fill="white" opacity="0.04"/>

            {/* ── Chest panel ─────────────── */}
            <rect x="36" y="92" width="48" height="30" rx="10"
              fill="#040b18" stroke="rgba(56,189,248,0.28)" strokeWidth="1"/>

            {/* ── Chest LEDs ─────────────── */}
            <circle cx="50" cy="107" r="6"
              fill="url(#g-led-g)"
              style={{ animation: "ci-led-pulse 2s ease-in-out infinite" }}/>
            <circle cx="50" cy="107" r="2.5" fill="#ecfdf5"/>

            <circle cx="70" cy="107" r="6"
              fill="url(#g-led-b)"
              style={{ animation: "ci-led-pulse 2s ease-in-out infinite 0.5s" }}/>
            <circle cx="70" cy="107" r="2.5" fill="#ecf9ff"/>
          </svg>
        </div>
      </div>
    </>
  );
}
