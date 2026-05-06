"use client";
import { useEffect, useRef, useState } from "react";

export default function CiAnimated({ size = 220 }: { size?: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const [rot,   setRot]   = useState({ x: 0, y: 0 });
  const [eye,   setEye]   = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width  / 2)) / (window.innerWidth  / 2);
      const ny = (e.clientY - (r.top  + r.height / 2)) / (window.innerHeight / 2);
      setRot({ x: -ny * 11, y: nx * 11 });
      setEye({ x: nx * 3,   y: ny * 2.2 });
    };
    const blinkTimer = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 110);
    }, 2800 + Math.random() * 1200);
    const happyTimer = setInterval(() => {
      setHappy(true);
      setTimeout(() => setHappy(false), 900);
    }, 5500);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(blinkTimer);
      clearInterval(happyTimer);
    };
  }, []);

  const ex = eye.x, ey = eye.y;

  return (
    <>
      <style>{`
        @keyframes ci-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-13px); }
        }
        @keyframes ci-star-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ci-cheek {
          0%,100% { opacity: 0.45; }
          50%      { opacity: 0.72; }
        }
        @keyframes ci-led {
          0%,100% { opacity: .88; }
          50%      { opacity: 1; filter: brightness(1.45); }
        }
        @keyframes ci-spark {
          0%,100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50%      { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        .ci-cheek  { animation: ci-cheek 2.2s ease-in-out infinite; }
        .ci-spark1 { animation: ci-spark 2.8s ease-in-out infinite; }
        .ci-spark2 { animation: ci-spark 2.8s ease-in-out infinite 0.95s; }
        .ci-spark3 { animation: ci-spark 2.8s ease-in-out infinite 1.9s; }
      `}</style>

      <div ref={ref} style={{ width: size, height: size, perspective: 900, cursor: "default" }}>
        <div style={{
          width: "100%", height: "100%",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.07s ease-out",
          animation: "ci-float 3.8s ease-in-out infinite",
        }}>
          <svg viewBox="0 0 120 152" width={size} height={size} fill="none">
            <defs>
              <radialGradient id="rg-head" cx="33%" cy="26%" r="70%">
                <stop offset="0%"   stopColor="#1e4280"/>
                <stop offset="100%" stopColor="#060f20"/>
              </radialGradient>
              <radialGradient id="rg-body" cx="33%" cy="22%" r="70%">
                <stop offset="0%"   stopColor="#162e60"/>
                <stop offset="100%" stopColor="#060d1a"/>
              </radialGradient>
              <radialGradient id="rg-eye-b" cx="28%" cy="24%" r="70%">
                <stop offset="0%"   stopColor="#d4f3ff"/>
                <stop offset="52%"  stopColor="#38bdf8"/>
                <stop offset="100%" stopColor="#0369a1"/>
              </radialGradient>
              <radialGradient id="rg-eye-g" cx="28%" cy="24%" r="70%">
                <stop offset="0%"   stopColor="#ccfde8"/>
                <stop offset="52%"  stopColor="#22d3a0"/>
                <stop offset="100%" stopColor="#065f46"/>
              </radialGradient>
              <radialGradient id="rg-cheek" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ff8fa3" stopOpacity="0.85"/>
                <stop offset="100%" stopColor="#ff8fa3" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="rg-led-g" cx="30%" cy="28%" r="70%">
                <stop offset="0%"   stopColor="#86efca"/>
                <stop offset="100%" stopColor="#059669"/>
              </radialGradient>
              <radialGradient id="rg-led-b" cx="30%" cy="28%" r="70%">
                <stop offset="0%"   stopColor="#bae8ff"/>
                <stop offset="100%" stopColor="#0284c7"/>
              </radialGradient>
              <filter id="fi-glow-b" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="fi-glow-g" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* ── Ground shadow ──────────────── */}
            <ellipse cx="60" cy="150" rx="25" ry="3.8"
              fill="rgba(56,189,248,0.14)"/>

            {/* ── Sparkles ───────────────────── */}
            <g className="ci-spark1" style={{ transformOrigin: "100px 42px" }}>
              <path d="M100 38 L101.4 41.6 L105.4 43 L101.4 44.4 L100 48 L98.6 44.4 L94.6 43 L98.6 41.6 Z"
                fill="#38bdf8"/>
            </g>
            <g className="ci-spark2" style={{ transformOrigin: "16px 56px" }}>
              <path d="M16 52 L17.1 55 L20.2 56 L17.1 57 L16 60 L14.9 57 L11.8 56 L14.9 55 Z"
                fill="#22d3a0"/>
            </g>
            <g className="ci-spark3" style={{ transformOrigin: "104px 75px" }}>
              <path d="M104 72 L104.9 74.5 L107.5 75.4 L104.9 76.3 L104 78.8 L103.1 76.3 L100.5 75.4 L103.1 74.5 Z"
                fill="#38bdf8" opacity="0.7"/>
            </g>

            {/* ── Antenna ────────────────────── */}
            <line x1="60" y1="21" x2="60" y2="9"
              stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Spinning star tip */}
            <g style={{ animation: "ci-star-spin 4s linear infinite", transformOrigin: "60px 5px" }}>
              <path d="M60 1 L61.4 4.3 L65 4.8 L62.5 7.1 L63.2 10.8 L60 9 L56.8 10.8 L57.5 7.1 L55 4.8 L58.6 4.3 Z"
                fill="#22d3a0"/>
              <path d="M60 3 L61 5.5 L63.5 5.8 L61.8 7.4 L62.2 10 L60 8.7 L57.8 10 L58.2 7.4 L56.5 5.8 L59 5.5 Z"
                fill="#a7f3d0"/>
              <circle cx="60" cy="2.5" r="1" fill="white" opacity="0.8"/>
            </g>

            {/* ── Head — big circle (chibi) ──── */}
            <circle cx="60" cy="56" r="38"
              fill="url(#rg-head)" stroke="#38bdf8" strokeWidth="1.5"/>
            {/* Specular top-left */}
            <ellipse cx="46" cy="37" rx="17" ry="9"
              fill="white" opacity="0.055" transform="rotate(-22,46,37)"/>

            {/* ── Ears ───────────────────────── */}
            <circle cx="23" cy="56" r="9.5"
              fill="url(#rg-head)" stroke="#38bdf8" strokeWidth="1.5"/>
            <circle cx="23" cy="56" r="5.5" fill="#060f20"/>
            <circle cx="23" cy="56" r="3.5" fill="rgba(56,189,248,0.38)"/>
            <circle cx="97" cy="56" r="9.5"
              fill="url(#rg-head)" stroke="#22d3a0" strokeWidth="1.5"/>
            <circle cx="97" cy="56" r="5.5" fill="#060f20"/>
            <circle cx="97" cy="56" r="3.5" fill="rgba(34,211,160,0.38)"/>

            {/* ── Face screen ─────────────────── */}
            <rect x="27" y="31" width="66" height="52" rx="17" fill="#060f20"/>
            <rect x="27" y="31" width="66" height="52" rx="17"
              stroke="rgba(56,189,248,0.22)" strokeWidth="1"/>

            {/* ── Cheeks (blush) ──────────────── */}
            <ellipse cx="36" cy="69" rx="10" ry="7" fill="url(#rg-cheek)" className="ci-cheek"/>
            <ellipse cx="84" cy="69" rx="10" ry="7" fill="url(#rg-cheek)" className="ci-cheek"/>
            {/* Cheek sparkle dots */}
            <circle cx="33" cy="70" r="1.4" fill="#ffb3c1" opacity="0.7"/>
            <circle cx="87" cy="70" r="1.4" fill="#ffb3c1" opacity="0.7"/>

            {/* ── Eyebrows ─────────────────────── */}
            <path d={`M${38 + ex*0.5} ${40 + ey*0.4} Q${46 + ex*0.5} ${37 + ey*0.4} ${54 + ex*0.5} ${40 + ey*0.4}`}
              stroke="#38bdf8" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75"/>
            <path d={`M${66 + ex*0.5} ${40 + ey*0.4} Q${74 + ex*0.5} ${37 + ey*0.4} ${82 + ex*0.5} ${40 + ey*0.4}`}
              stroke="#22d3a0" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75"/>

            {/* ── Left eye (blue) ──────────────── */}
            <g filter="url(#fi-glow-b)">
              <circle cx={46 + ex} cy={53 + ey} r="13" fill="rgba(56,189,248,0.07)"/>
              <circle cx={46 + ex} cy={53 + ey} r="10"
                fill="url(#rg-eye-b)"
                style={{
                  transform: `scaleY(${blink ? 0.04 : 1})`,
                  transformOrigin: `${46 + ex}px ${53 + ey}px`,
                  transition: "transform 0.08s ease",
                }}/>
            </g>
            <circle cx={49 + ex} cy={49 + ey} r="3.3" fill="white" opacity="0.92"/>
            <circle cx={48.5 + ex} cy={48.5 + ey} r="1.3" fill="white"/>
            <circle cx={43 + ex} cy={57 + ey} r="1.7" fill="white" opacity="0.45"/>

            {/* ── Right eye (green) ────────────── */}
            <g filter="url(#fi-glow-g)">
              <circle cx={74 + ex} cy={53 + ey} r="13" fill="rgba(34,211,160,0.07)"/>
              <circle cx={74 + ex} cy={53 + ey} r="10"
                fill="url(#rg-eye-g)"
                style={{
                  transform: `scaleY(${blink ? 0.04 : 1})`,
                  transformOrigin: `${74 + ex}px ${53 + ey}px`,
                  transition: "transform 0.08s ease",
                }}/>
            </g>
            <circle cx={77 + ex} cy={49 + ey} r="3.3" fill="white" opacity="0.92"/>
            <circle cx={76.5 + ex} cy={48.5 + ey} r="1.3" fill="white"/>
            <circle cx={71 + ex} cy={57 + ey} r="1.7" fill="white" opacity="0.45"/>

            {/* ── Mouth ─────────────────────────── */}
            {happy ? (
              /* Happy open: filled arc */
              <path d="M46 71 Q60 84 74 71 Q60 80 46 71 Z"
                fill="#38bdf8" opacity="0.85"/>
            ) : (
              <path d="M46 71 Q60 83 74 71"
                stroke="#38bdf8" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            )}

            {/* ── Body ──────────────────────────── */}
            <rect x="31" y="91" width="58" height="46" rx="21"
              fill="url(#rg-body)" stroke="#1a3260" strokeWidth="1.5"/>
            <ellipse cx="47" cy="97" rx="14" ry="6"
              fill="white" opacity="0.04" transform="rotate(-5,47,97)"/>

            {/* ── Chest panel ───────────────────── */}
            <rect x="39" y="98" width="42" height="30" rx="11"
              fill="#040b18" stroke="rgba(56,189,248,0.25)" strokeWidth="1"/>

            {/* ── LEDs ──────────────────────────── */}
            <circle cx="52" cy="113" r="7.5"
              fill="url(#rg-led-g)"
              style={{ animation: "ci-led 2.1s ease-in-out infinite" }}/>
            <circle cx="52" cy="113" r="3.2" fill="#ecfdf5"/>
            <circle cx="52" cy="113" r="1.2" fill="white"/>

            <circle cx="68" cy="113" r="7.5"
              fill="url(#rg-led-b)"
              style={{ animation: "ci-led 2.1s ease-in-out infinite 0.5s" }}/>
            <circle cx="68" cy="113" r="3.2" fill="#ecf9ff"/>
            <circle cx="68" cy="113" r="1.2" fill="white"/>

            {/* ── Little arms ───────────────────── */}
            <circle cx="25" cy="107" r="7.5"
              fill="url(#rg-body)" stroke="#1a3260" strokeWidth="1.5"/>
            <circle cx="25" cy="110" r="3" fill="#060f20" opacity="0.6"/>
            <circle cx="95" cy="107" r="7.5"
              fill="url(#rg-body)" stroke="#1a3260" strokeWidth="1.5"/>
            <circle cx="95" cy="110" r="3" fill="#060f20" opacity="0.6"/>
          </svg>
        </div>
      </div>
    </>
  );
}
