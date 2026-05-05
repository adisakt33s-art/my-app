export default function Ci({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="20" x2="50" y2="7" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="4" r="4.5" fill="#22d3a0"/>
      <circle cx="50" cy="4" r="2" fill="#ecfdf5"/>
      <rect x="16" y="20" width="68" height="52" rx="20" fill="#0c1e3d" stroke="#38bdf8" strokeWidth="1.5"/>
      <rect x="24" y="28" width="52" height="36" rx="10" fill="#060f20"/>
      <circle cx="38" cy="44" r="8" fill="#38bdf8" opacity="0.12"/>
      <circle cx="38" cy="44" r="5" fill="#38bdf8"/>
      <circle cx="40" cy="42" r="1.8" fill="#ecf9ff" opacity="0.9"/>
      <circle cx="62" cy="44" r="8" fill="#22d3a0" opacity="0.12"/>
      <circle cx="62" cy="44" r="5" fill="#22d3a0"/>
      <circle cx="64" cy="42" r="1.8" fill="#ecfdf5" opacity="0.9"/>
      <path d="M36 58 Q50 66 64 58" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="6" y="36" width="12" height="16" rx="6" fill="#0c1e3d" stroke="#38bdf8" strokeWidth="1.5"/>
      <rect x="82" y="36" width="12" height="16" rx="6" fill="#0c1e3d" stroke="#38bdf8" strokeWidth="1.5"/>
      <rect x="26" y="70" width="48" height="34" rx="14" fill="#0c1e3d" stroke="#1a3260" strokeWidth="1.5"/>
      <rect x="34" y="78" width="32" height="18" rx="7" fill="#060f20" stroke="#38bdf8" strokeWidth="1" opacity="0.9"/>
      <circle cx="44" cy="87" r="3.5" fill="#22d3a0" opacity="0.9"/>
      <circle cx="44" cy="87" r="1.5" fill="#ecfdf5"/>
      <circle cx="56" cy="87" r="3.5" fill="#38bdf8" opacity="0.9"/>
      <circle cx="56" cy="87" r="1.5" fill="#ecf9ff"/>
    </svg>
  );
}
