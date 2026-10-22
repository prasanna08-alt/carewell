import { useId } from "react";

const uid = () => useId().replace(/:/g, "");

export function Bottle({ c = "#35f0ff", label = "Rx", className = "" }) {
  const id = uid();
  return (
    <svg viewBox="0 0 120 224" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id + "b"} x1="0" x2="1"><stop offset="0" stopColor={c} stopOpacity=".55" /><stop offset=".35" stopColor={c} /><stop offset="1" stopColor={c} stopOpacity=".6" /></linearGradient>
        <linearGradient id={id + "k"} x1="0" x2="1"><stop offset="0" stopColor="#cfd8dc" /><stop offset=".4" stopColor="#fff" /><stop offset="1" stopColor="#b0bec5" /></linearGradient>
      </defs>
      <ellipse cx="60" cy="216" rx="44" ry="7" fill="rgba(0,0,0,.25)" />
      <rect x="22" y="12" width="76" height="42" rx="8" fill={`url(#${id}k)`} />
      {[30, 40, 50, 60, 70, 80, 90].map((x) => <rect key={x} x={x} y="17" width="2" height="32" fill="rgba(0,0,0,.12)" />)}
      <path d="M30 54h60l8 18v122a16 16 0 0 1-16 16H38a16 16 0 0 1-16-16V72z" fill={`url(#${id}b)`} />
      <rect x="22" y="98" width="76" height="80" fill="#fff" />
      <rect x="54" y="106" width="12" height="32" rx="2" fill="#12b76a" />
      <rect x="44" y="116" width="32" height="12" rx="2" fill="#12b76a" />
      <text x="60" y="158" textAnchor="middle" fontFamily="Figtree,sans-serif" fontWeight="700" fontSize="12" fill="#0b2a2f">{label}</text>
      <rect x="40" y="165" width="40" height="3" rx="1.5" fill="#b0bec5" />
      <rect x="30" y="62" width="8" height="126" rx="4" fill="#fff" opacity=".35" />
    </svg>
  );
}

export function Box({ c = "#ff3d8b", label = "Tablets", className = "" }) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true">
      <ellipse cx="100" cy="143" rx="86" ry="6" fill="rgba(0,0,0,.25)" />
      <path d="M150 22l42-14v108l-42 16z" fill={c} />
      <path d="M150 22l42-14v108l-42 16z" fill="rgba(0,0,0,.4)" />
      <path d="M10 22l42-14h140l-42 14z" fill="#fff" opacity=".9" />
      <rect x="10" y="22" width="140" height="110" rx="5" fill="#fff" />
      <rect x="10" y="22" width="140" height="40" fill={c} />
      <text x="22" y="48" fontFamily="Bricolage Grotesque,sans-serif" fontWeight="800" fontSize="17" fill="#04181d">{label}</text>
      <rect x="112" y="76" width="10" height="28" rx="2" fill="#12b76a" />
      <rect x="103" y="85" width="28" height="10" rx="2" fill="#12b76a" />
      {[78, 90, 102, 114].map((y, i) => <rect key={y} x="22" y={y} width={62 - i * 8} height="5" rx="2.5" fill="#c9d6d3" />)}
      <circle cx="136" cy="118" r="7" fill={c} /><circle cx="134" cy="116" r="2.4" fill="#fff" opacity=".7" />
    </svg>
  );
}

export function Strip({ c = "#8b5cff", className = "" }) {
  const id = uid();
  return (
    <svg viewBox="0 0 270 124" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id + "f"} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4f8f9" /><stop offset=".5" stopColor="#aab6bb" /><stop offset="1" stopColor="#eef3f4" /></linearGradient>
      </defs>
      <rect x="6" y="8" width="258" height="108" rx="10" fill={`url(#${id}f)`} stroke="rgba(0,0,0,.15)" />
      {[0, 1, 2, 3].map((k) => <line key={k} x1={59 + k * 50} y1="12" x2={59 + k * 50} y2="112" stroke="rgba(0,0,0,.18)" strokeDasharray="3 4" />)}
      {[38, 86].map((cy) => [0, 1, 2, 3, 4].map((i) => (
        <g key={cy + "-" + i}>
          <circle cx={34 + i * 50} cy={cy + 6} r="19" fill="rgba(255,255,255,.4)" stroke="rgba(0,0,0,.2)" />
          <circle cx={34 + i * 50} cy={cy + 6} r="12" fill={c} />
          <circle cx={30 + i * 50} cy={cy + 2} r="4" fill="#fff" opacity=".65" />
        </g>
      )))}
    </svg>
  );
}

export function Product({ kind = "bottle", className = "", ...p }) {
  const K = { bottle: Bottle, box: Box, strip: Strip }[kind];
  return <K className={`art ${kind} ${className}`} {...p} />;
}

/* ---------- shop illustrations: logo, awning, sprites, shelves ---------- */
const NEON = ["#35f0ff", "#ff3d8b", "#ffb02e", "#8b5cff", "#9dff4a"];

export function Logo({ size = 40 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#35f0ff" /><stop offset="1" stopColor="#12b76a" /></linearGradient></defs>
      <rect width="48" height="48" rx="13" fill="url(#lg)" />
      <rect x="19" y="8" width="10" height="32" rx="3" fill="#fff" />
      <rect x="8" y="19" width="32" height="10" rx="3" fill="#fff" />
      <g transform="rotate(-35 33 33)"><rect x="24" y="29" width="18" height="8" rx="4" fill="#ff3d8b" /><rect x="33" y="29" width="9" height="8" rx="4" fill="#04181d" /></g>
    </svg>
  );
}

export function Awning() {
  return (
    <svg className="awning" viewBox="0 0 340 40" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => {
        const f = i % 2 ? "#f4f8f9" : "#12b76a";
        return <g key={i}><rect x={i * 42.5} y="0" width="42.5" height="28" fill={f} /><path d={`M${i * 42.5} 28h42.5a21.25 12 0 0 1-42.5 0z`} fill={f} /></g>;
      })}
    </svg>
  );
}

export function Sprites() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="sp-bottle" viewBox="0 0 60 110">
          <rect x="10" y="2" width="40" height="20" rx="4" fill="#f4f8f9" />
          <path d="M14 22h32l6 10v66a10 10 0 0 1-10 10H18a10 10 0 0 1-10-10V32z" fill="currentColor" />
          <rect x="8" y="50" width="44" height="40" fill="#fff" />
          <rect x="26" y="56" width="8" height="20" rx="1.5" fill="#12b76a" /><rect x="20" y="62" width="20" height="8" rx="1.5" fill="#12b76a" />
          <rect x="16" y="80" width="28" height="3" rx="1.5" fill="#b0bec5" />
          <rect x="13" y="30" width="5" height="72" rx="2.5" fill="#fff" opacity=".35" />
        </symbol>
        <symbol id="sp-box" viewBox="0 0 80 70">
          <rect x="2" y="6" width="68" height="62" rx="3" fill="#fff" />
          <rect x="2" y="6" width="68" height="20" fill="currentColor" />
          <path d="M70 6l9-5v60l-9 7z" fill="currentColor" /><path d="M70 6l9-5v60l-9 7z" fill="rgba(0,0,0,.4)" />
          <rect x="12" y="36" width="30" height="4" rx="2" fill="#c9d6d3" /><rect x="12" y="46" width="22" height="4" rx="2" fill="#c9d6d3" />
          <circle cx="56" cy="50" r="6" fill="currentColor" />
        </symbol>
        <symbol id="sp-jar" viewBox="0 0 56 64">
          <rect x="6" y="2" width="44" height="12" rx="4" fill="#f4f8f9" />
          <rect x="3" y="14" width="50" height="48" rx="9" fill="currentColor" />
          <rect x="3" y="28" width="50" height="22" fill="#fff" />
          <circle cx="28" cy="39" r="6" fill="#12b76a" />
          <rect x="8" y="18" width="5" height="40" rx="2.5" fill="#fff" opacity=".35" />
        </symbol>
      </defs>
    </svg>
  );
}

const SP = { bottle: [60, 110], box: [80, 70], jar: [56, 64] };

export function ShelfArt({ idx = 0, w = 900, h = 520, rows = 3 }) {
  const out = [];
  const rh = h / rows;
  for (let r = 0; r < rows; r++) {
    const base = rh * (r + 1) - 14;
    let x = 28, i = 0;
    for (;;) {
      const kind = ["bottle", "box", "jar", "bottle"][(i + r + idx) % 4];
      const [bw, bh] = SP[kind];
      const k = 0.9 + ((i * 5 + r * 3 + idx) % 4) * 0.12;
      if (x + bw * k > w - 28) break;
      out.push(<use key={r + "-" + i} href={`#sp-${kind}`} x={x} y={base - bh * k} width={bw * k} height={bh * k} style={{ color: NEON[(i * 2 + r + idx) % 5] }} />);
      x += bw * k + 16; i++;
    }
    out.push(<rect key={"b" + r} className="board" x="14" y={base} width={w - 28} height="8" rx="4" fill={NEON[(r + idx) % 5]} style={{ color: NEON[(r + idx) % 5] }} />);
  }
  return <svg className="shelfart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">{out}</svg>;
}
