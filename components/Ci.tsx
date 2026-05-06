export default function Ci({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 152" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ci-rg-head" cx="33%" cy="26%" r="70%">
          <stop offset="0%"   stopColor="#1e4280"/>
          <stop offset="100%" stopColor="#060f20"/>
        </radialGradient>
        <radialGradient id="ci-rg-body" cx="33%" cy="22%" r="70%">
          <stop offset="0%"   stopColor="#162e60"/>
          <stop offset="100%" stopColor="#060d1a"/>
        </radialGradient>
        <radialGradient id="ci-rg-eye-b" cx="28%" cy="24%" r="70%">
          <stop offset="0%"   stopColor="#d4f3ff"/>
          <stop offset="52%"  stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#0369a1"/>
        </radialGradient>
        <radialGradient id="ci-rg-eye-g" cx="28%" cy="24%" r="70%">
          <stop offset="0%"   stopColor="#ccfde8"/>
          <stop offset="52%"  stopColor="#22d3a0"/>
          <stop offset="100%" stopColor="#065f46"/>
        </radialGradient>
        <radialGradient id="ci-rg-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ff8fa3" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#ff8fa3" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="ci-rg-led-g" cx="30%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#86efca"/>
          <stop offset="100%" stopColor="#059669"/>
        </radialGradient>
        <radialGradient id="ci-rg-led-b" cx="30%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#bae8ff"/>
          <stop offset="100%" stopColor="#0284c7"/>
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="60" cy="150" rx="25" ry="3.8" fill="rgba(56,189,248,0.12)"/>

      {/* Antenna */}
      <line x1="60" y1="21" x2="60" y2="9" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M60 1 L61.4 4.3 L65 4.8 L62.5 7.1 L63.2 10.8 L60 9 L56.8 10.8 L57.5 7.1 L55 4.8 L58.6 4.3 Z"
        fill="#22d3a0"/>
      <path d="M60 3 L61 5.5 L63.5 5.8 L61.8 7.4 L62.2 10 L60 8.7 L57.8 10 L58.2 7.4 L56.5 5.8 L59 5.5 Z"
        fill="#a7f3d0"/>
      <circle cx="60" cy="2.5" r="1" fill="white" opacity="0.8"/>

      {/* Head */}
      <circle cx="60" cy="56" r="38" fill="url(#ci-rg-head)" stroke="#38bdf8" strokeWidth="1.5"/>
      <ellipse cx="46" cy="37" rx="17" ry="9" fill="white" opacity="0.05" transform="rotate(-22,46,37)"/>

      {/* Ears */}
      <circle cx="23" cy="56" r="9.5" fill="url(#ci-rg-head)" stroke="#38bdf8" strokeWidth="1.5"/>
      <circle cx="23" cy="56" r="5.5" fill="#060f20"/>
      <circle cx="23" cy="56" r="3.5" fill="rgba(56,189,248,0.35)"/>
      <circle cx="97" cy="56" r="9.5" fill="url(#ci-rg-head)" stroke="#22d3a0" strokeWidth="1.5"/>
      <circle cx="97" cy="56" r="5.5" fill="#060f20"/>
      <circle cx="97" cy="56" r="3.5" fill="rgba(34,211,160,0.35)"/>

      {/* Face screen */}
      <rect x="27" y="31" width="66" height="52" rx="17" fill="#060f20"/>
      <rect x="27" y="31" width="66" height="52" rx="17" stroke="rgba(56,189,248,0.2)" strokeWidth="1"/>

      {/* Cheeks */}
      <ellipse cx="36" cy="69" rx="10" ry="7" fill="url(#ci-rg-cheek)" opacity="0.55"/>
      <ellipse cx="84" cy="69" rx="10" ry="7" fill="url(#ci-rg-cheek)" opacity="0.55"/>

      {/* Eyebrows */}
      <path d="M38 40 Q46 37 54 40" stroke="#38bdf8" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M66 40 Q74 37 82 40" stroke="#22d3a0" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75"/>

      {/* Left eye (blue) */}
      <circle cx="46" cy="53" r="13" fill="rgba(56,189,248,0.07)"/>
      <circle cx="46" cy="53" r="10" fill="url(#ci-rg-eye-b)"/>
      <circle cx="49" cy="49" r="3.3" fill="white" opacity="0.92"/>
      <circle cx="48.5" cy="48.5" r="1.3" fill="white"/>
      <circle cx="43" cy="57" r="1.7" fill="white" opacity="0.45"/>

      {/* Right eye (green) */}
      <circle cx="74" cy="53" r="13" fill="rgba(34,211,160,0.07)"/>
      <circle cx="74" cy="53" r="10" fill="url(#ci-rg-eye-g)"/>
      <circle cx="77" cy="49" r="3.3" fill="white" opacity="0.92"/>
      <circle cx="76.5" cy="48.5" r="1.3" fill="white"/>
      <circle cx="71" cy="57" r="1.7" fill="white" opacity="0.45"/>

      {/* Mouth */}
      <path d="M46 71 Q60 83 74 71" stroke="#38bdf8" strokeWidth="2.6" fill="none" strokeLinecap="round"/>

      {/* Body */}
      <rect x="31" y="91" width="58" height="46" rx="21" fill="url(#ci-rg-body)" stroke="#1a3260" strokeWidth="1.5"/>
      <ellipse cx="47" cy="97" rx="14" ry="6" fill="white" opacity="0.04" transform="rotate(-5,47,97)"/>

      {/* Chest panel */}
      <rect x="39" y="98" width="42" height="30" rx="11" fill="#040b18" stroke="rgba(56,189,248,0.22)" strokeWidth="1"/>

      {/* LEDs */}
      <circle cx="52" cy="113" r="7.5" fill="url(#ci-rg-led-g)"/>
      <circle cx="52" cy="113" r="3.2" fill="#ecfdf5"/>
      <circle cx="52" cy="113" r="1.2" fill="white"/>
      <circle cx="68" cy="113" r="7.5" fill="url(#ci-rg-led-b)"/>
      <circle cx="68" cy="113" r="3.2" fill="#ecf9ff"/>
      <circle cx="68" cy="113" r="1.2" fill="white"/>

      {/* Arms */}
      <circle cx="25" cy="107" r="7.5" fill="url(#ci-rg-body)" stroke="#1a3260" strokeWidth="1.5"/>
      <circle cx="25" cy="110" r="3" fill="#060f20" opacity="0.6"/>
      <circle cx="95" cy="107" r="7.5" fill="url(#ci-rg-body)" stroke="#1a3260" strokeWidth="1.5"/>
      <circle cx="95" cy="110" r="3" fill="#060f20" opacity="0.6"/>
    </svg>
  );
}
