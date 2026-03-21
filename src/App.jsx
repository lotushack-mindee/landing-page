import { useState, useEffect, useRef } from "react";

// ── Scroll animation hook ──────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Giới thiệu", id: "hero" },
  { label: "Tính năng",  id: "engine" },
  { label: "Kết quả",   id: "results" },
  { label: "Tư vấn",    id: "contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: "16px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.3s, backdrop-filter 0.3s",
      background: scrolled ? "rgba(12,15,19,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(245,240,232,0.07)" : "none",
    }}>
      <span
        className="font-display"
        style={{ color: "var(--cream)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", cursor: "pointer" }}
        onClick={() => scrollTo("hero")}
      >
        Study<span style={{ color: "var(--red)" }}>Mapper</span>
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map(({ label, id }) => (
          <span
            key={id}
            onClick={() => scrollTo(id)}
            style={{ color: "var(--cream-dim)", fontSize: "0.85rem", cursor: "pointer", fontFamily: "'Be Vietnam Pro', sans-serif", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--cream)"}
            onMouseLeave={e => e.target.style.color = "var(--cream-dim)"}
          >{label}</span>
        ))}
      </div>
      <button
        className="btn-primary"
        onClick={() => scrollTo("contact")}
        style={{ padding: "8px 20px", fontSize: "0.82rem" }}
      >Đăng ký miễn phí →</button>
    </nav>
  );
}

// ── Airplane SVG Hero ────────────────────────────────────────────────────────
const WIN_OPS = [0.50,0.42,0.58,0.45,0.52,0.40,0.48,0.55,0.43,0.50,0.47,0.38,0.56,0.50,0.44,0.52,0.49,0.41,0.57,0.50,0.44,0.53,0.48,0.40];

function AirplaneHero({ planeY, planeRotate, mouse, inView }) {
  const mx = mouse.x * 7;
  const my = mouse.y * 7;
  return (
    <div
      className={`reveal-right ${inView ? "visible" : ""} delay-2`}
      style={{
        position: "absolute", inset: 0,
        transform: `translateX(${mx}px) translateY(${my + planeY}px)`,
        transition: "transform 0.14s ease-out, opacity 0.8s ease",
        filter: "drop-shadow(0 40px 90px rgba(200,32,42,0.32)) drop-shadow(0 10px 40px rgba(0,0,0,0.85))",
      }}
    >
      <svg viewBox="430 40 310 310" preserveAspectRatio="xMaxYMin meet" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", transform: `rotate(${planeRotate}deg)`, transition: "transform 0.3s ease-out", transformOrigin: "72% 35%" }}>
        <defs>
          <linearGradient id="p-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eeeae2"/>
            <stop offset="50%" stopColor="#d8dde6"/>
            <stop offset="100%" stopColor="#a8b0be"/>
          </linearGradient>
          <linearGradient id="p-wbot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c0c8d6"/>
            <stop offset="100%" stopColor="#848c9c"/>
          </linearGradient>
          <linearGradient id="p-wtop" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#d8dce6"/>
            <stop offset="100%" stopColor="#eceaf2"/>
          </linearGradient>
          <linearGradient id="p-eng" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#484e5a"/>
            <stop offset="35%" stopColor="#747c8c"/>
            <stop offset="100%" stopColor="#303640"/>
          </linearGradient>
          <linearGradient id="p-tail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8dce4"/>
            <stop offset="100%" stopColor="#c0c6d0"/>
          </linearGradient>
          <linearGradient id="p-tr1" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          <linearGradient id="p-tr2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.13)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          <radialGradient id="p-glow" cx="62%" cy="55%" r="50%">
            <stop offset="0%" stopColor="rgba(232,160,32,0.18)"/>
            <stop offset="50%" stopColor="rgba(200,32,42,0.10)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <filter id="p-shadow">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="rgba(0,0,0,0.5)"/>
          </filter>
        </defs>

        {/* Atmosphere glow behind plane */}
        <ellipse cx="430" cy="250" rx="300" ry="200" fill="url(#p-glow)"/>

        {/* Contrails (fade from plane center left) */}
        <path d="M 20 400 Q 180 350 360 288" stroke="url(#p-tr1)" strokeWidth="22" strokeLinecap="round"/>
        <path d="M 20 418 Q 183 367 362 304" stroke="url(#p-tr2)" strokeWidth="15" strokeLinecap="round"/>
        <path d="M 40 378 Q 190 334 363 276" stroke="url(#p-tr1)" strokeWidth="10" strokeLinecap="round" opacity="0.55"/>

        {/* === Main plane group, rotated nose-up === */}
        <g transform="rotate(-17, 390, 250)" filter="url(#p-shadow)">

          {/* Under-wing (large bottom surface, fully visible) */}
          <path d="M 375 260 L 52 375 L 92 402 L 404 288 Z" fill="url(#p-wbot)"/>
          {/* Wing leading edge glint */}
          <path d="M 375 260 L 52 375 L 58 368 L 375 254 Z" fill="rgba(255,255,255,0.13)"/>
          {/* Wing tip */}
          <path d="M 52 375 Q 38 388 48 402 L 92 402 Z" fill="#8890a2"/>

          {/* Upper-wing (partially visible over fuselage) */}
          <path d="M 375 248 L 92 148 L 132 132 L 404 234 Z" fill="url(#p-wtop)"/>
          {/* Wing tip top */}
          <path d="M 92 148 Q 78 138 84 126 L 132 132 Z" fill="#bcc4d2"/>

          {/* Wing-body fairing */}
          <ellipse cx="392" cy="256" rx="52" ry="20" fill="#d0d6e0" opacity="0.7"/>

          {/* === Engines (4 × turbofan) === */}
          {/* Outer-left engine (below wing, fully visible) */}
          <g transform="translate(174,326) rotate(10)">
            <rect x="-48" y="-15" width="96" height="15" rx="7" fill="url(#p-eng)"/>
            <ellipse cx="-48" cy="-7" rx="18" ry="14" fill="#2c3240"/>
            <ellipse cx="-48" cy="-7" rx="11" ry="9" fill="#12161e"/>
            <ellipse cx="48" cy="-7" rx="14" ry="11" fill="#5c6270"/>
          </g>

          {/* Inner-left engine (below wing, fully visible) */}
          <g transform="translate(268,298) rotate(7)">
            <rect x="-40" y="-13" width="80" height="13" rx="6" fill="url(#p-eng)"/>
            <ellipse cx="-40" cy="-6" rx="15" ry="12" fill="#2c3240"/>
            <ellipse cx="-40" cy="-6" rx="9" ry="8" fill="#12161e"/>
            <ellipse cx="40" cy="-6" rx="12" ry="9" fill="#5c6270"/>
          </g>

          {/* Inner-right engine (above wing, half visible) */}
          <g transform="translate(268,210) rotate(-7)" opacity="0.42">
            <rect x="-40" y="0" width="80" height="12" rx="6" fill="#b0b8c4"/>
            <ellipse cx="-40" cy="6" rx="15" ry="10" fill="#8890a0"/>
          </g>

          {/* Outer-right engine (above wing, mostly hidden) */}
          <g transform="translate(174,184) rotate(-10)" opacity="0.28">
            <rect x="-48" y="0" width="96" height="13" rx="7" fill="#b0b8c4"/>
            <ellipse cx="-48" cy="7" rx="18" ry="11" fill="#8890a0"/>
          </g>

          {/* === Fuselage === */}
          <path
            d="M 104 246 Q 104 228 126 226 L 646 220 Q 694 220 714 232 Q 722 241 714 250 L 646 258 Q 622 262 126 270 Q 104 268 104 250 Z"
            fill="url(#p-body)"
          />
          {/* Belly shade */}
          <path d="M 126 262 Q 400 272 646 260 L 646 270 Q 400 280 126 270 Z" fill="rgba(0,0,0,0.12)"/>
          {/* Top highlight */}
          <path d="M 126 226 Q 400 222 646 220 L 646 224 Q 400 226 126 230 Z" fill="rgba(255,255,255,0.38)"/>
          {/* Red livery stripe */}
          <path d="M 126 264 Q 400 274 646 262 L 646 265 Q 400 277 126 267 Z" fill="rgba(200,32,42,0.55)"/>
          {/* Gold accent above red */}
          <path d="M 126 260 Q 400 270 646 258 L 646 261 Q 400 273 126 263 Z" fill="rgba(232,160,32,0.30)"/>

          {/* Windows */}
          {WIN_OPS.map((op, i) => (
            <rect key={i} x={175 + i * 20} y="237" width="10" height="8" rx="3"
              fill={`rgba(${i % 2 === 0 ? "160,200,255" : "180,215,255"},${op})`}/>
          ))}

          {/* === Nose cone === */}
          <path d="M 646 220 Q 706 224 728 235 Q 706 246 646 258 Z" fill="#e2ddd4"/>
          <path d="M 692 226 Q 720 233 728 235 Q 720 239 692 242 Z" fill="#c4bfb6"/>
          {/* Cockpit windows */}
          <ellipse cx="660" cy="233" rx="9" ry="6" fill="rgba(80,130,200,0.65)"/>
          <ellipse cx="675" cy="230" rx="6" ry="5" fill="rgba(80,130,200,0.60)"/>

          {/* === Tail assembly === */}
          {/* Vertical fin */}
          <path d="M 104 246 L 107 180 Q 122 188 128 246 Z" fill="#ccd2dc"/>
          <path d="M 107 180 Q 115 148 138 158 Q 142 174 128 246 L 118 246 Z" fill="url(#p-tail)"/>
          {/* Red accent on fin */}
          <path d="M 115 148 Q 128 153 138 158 Q 126 164 115 158 Z" fill="rgba(200,32,42,0.85)"/>
          {/* Horizontal stabilizers */}
          <path d="M 104 254 L 38 274 L 50 285 L 114 262 Z" fill="#c0c8d4"/>
          <path d="M 104 242 L 38 222 L 50 216 L 114 236 Z" fill="#ccd4de"/>

        </g>
      </svg>
    </div>
  );
}

// ── Floating glass card ─────────────────────────────────────────────────────
function FloatCard({ style, children, depth = 1, mouse, title }) {
  const x = mouse.x * depth * 14;
  const y = mouse.y * depth * 14;
  return (
    <div style={{
      position: "absolute",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      background: "rgba(10, 12, 18, 0.82)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderTop: "1px solid rgba(255,255,255,0.16)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
      transform: `translate(${x}px, ${y}px)`,
      transition: "transform 0.12s ease-out",
      zIndex: 10, ...style,
    }}>
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", opacity: 0.8 }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", opacity: 0.8 }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(74,222,128,0.8)" }} />
          <span style={{ marginLeft: 4, fontSize: "0.58rem", color: "rgba(200,190,170,0.5)", fontWeight: 500 }}>{title}</span>
        </div>
      )}
      <div style={{ padding: "12px 16px" }}>{children}</div>
    </div>
  );
}

// ── Laptop Mockup ───────────────────────────────────────────────────────────
function LaptopMockup({ scrollY, mouse, inView }) {
  const tiltX = mouse.y * -6;
  const tiltY = mouse.x * 8;
  const lift  = scrollY * -0.45;

  return (
    <div className={`reveal-right ${inView ? "visible" : ""} delay-2`} style={{
      perspective: 1400,
      transform: `translateY(${lift}px)`,
      transition: "transform 0.12s ease-out, opacity 0.9s ease",
      willChange: "transform",
      flexShrink: 0,
    }}>
      <div style={{
        transform: `rotateX(${tiltX - 4}deg) rotateY(${tiltY}deg)`,
        transition: "transform 0.18s ease-out",
        transformStyle: "preserve-3d",
      }}>
        {/* ── Screen lid ── */}
        <div style={{
          width: 620, height: 390,
          background: "#0a0d12",
          borderRadius: "14px 14px 0 0",
          border: "2.5px solid #2a2d35",
          borderBottom: "none",
          overflow: "hidden",
          boxShadow: "0 0 0 1px #1a1d24, 0 -4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(200,32,42,0.25), 0 0 160px rgba(20,80,200,0.15)",
          position: "relative",
        }}>
          {/* Screen bezel top (camera dot) */}
          <div style={{ height: 20, background: "#0a0d12", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1e2228", boxShadow: "0 0 0 1px #2a2d35" }}/>
          </div>
          {/* ── Mini StudyMapper UI inside screen ── */}
          <div style={{ background: "#ffffff", height: "calc(100% - 20px)", overflow: "hidden", borderRadius: "0 0 2px 2px" }}>
            {/* Mini nav */}
            <div style={{ background: "#0c0f13", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#f5f0e8", fontSize: "0.7rem", fontWeight: 700, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                Study<span style={{ color: "#c8202a" }}>Mapper</span>
              </span>
              <div style={{ display: "flex", gap: 12 }}>
                {["Tính năng","Kết quả","Tư vấn"].map(t => (
                  <span key={t} style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.52rem", fontFamily: "'Be Vietnam Pro',sans-serif" }}>{t}</span>
                ))}
              </div>
              <div style={{ background: "#c8202a", borderRadius: 4, padding: "3px 8px", fontSize: "0.5rem", color: "#fff", fontWeight: 700 }}>Đăng ký →</div>
            </div>
            {/* Content area */}
            <div style={{ padding: "14px 20px", background: "#f8f6f2" }}>
              {/* Header */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: "0.55rem", color: "#c8202a", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'Be Vietnam Pro',sans-serif" }}>AI MATCH SCORE</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0c0f13", fontFamily: "'Be Vietnam Pro',sans-serif", lineHeight: 1.2, marginTop: 2 }}>
                  Trường <span style={{ color: "#e8a020", fontStyle: "italic" }}>đúng</span> cho con bạn.
                </div>
              </div>
              {/* Profile mini form */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 10 }}>
                {[["GPA","3.8 / 4.0"],["IELTS","7.0"],["Ngân sách","$25,000/năm"],["Quốc gia","Canada, Úc"]].map(([l,v]) => (
                  <div key={l} style={{ background: "#fff", borderRadius: 6, padding: "4px 8px", border: "1px solid #e8e4dc" }}>
                    <div style={{ fontSize: "0.45rem", color: "#888", fontFamily: "'Be Vietnam Pro',sans-serif" }}>{l}</div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#0c0f13", fontFamily: "'Be Vietnam Pro',sans-serif" }}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Match results */}
              <div style={{ fontSize: "0.5rem", fontWeight: 700, color: "#555", letterSpacing: "0.08em", marginBottom: 6, fontFamily: "'Be Vietnam Pro',sans-serif" }}>TOP KẾT QUẢ PHÙ HỢP</div>
              {[
                { name: "Univ. of Toronto", country: "🇨🇦 Canada", score: 94, color: "#22c55e" },
                { name: "Univ. of Melbourne", country: "🇦🇺 Úc", score: 91, color: "#3b82f6" },
                { name: "NUS Singapore", country: "🇸🇬 Singapore", score: 88, color: "#e8a020" },
              ].map(u => (
                <div key={u.name} style={{ background: "#fff", borderRadius: 8, padding: "7px 10px", marginBottom: 5, border: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div>
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#0c0f13", fontFamily: "'Be Vietnam Pro',sans-serif" }}>{u.name}</div>
                    <div style={{ fontSize: "0.48rem", color: "#888", marginTop: 1 }}>{u.country} · #1 QS Ranking</div>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${u.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, color: u.color }}>{u.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hinge ── */}
        <div style={{ height: 4, background: "linear-gradient(180deg,#1e2228,#141720)", width: "100%" }}/>

        {/* ── Base / keyboard ── */}
        <div style={{
          width: "100%", height: 22,
          background: "linear-gradient(180deg,#1e2228 0%,#141720 100%)",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 16px 60px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 80, height: 8, background: "#0d1018", borderRadius: 3, border: "1px solid #2a2d35" }}/>
        </div>
        {/* Table shadow */}
        <div style={{ height: 10, background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0,0,0,0.55) 0%, transparent 100%)", marginTop: 2 }}/>
      </div>
    </div>
  );
}

// ── Slide 1 — Hero ─────────────────────────────────────────────────────────
function Slide1() {
  const sectionRef = useRef(null);
  const [ref, inView] = useInView(0.1);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({ x: (e.clientX - rect.left - rect.width / 2) / rect.width, y: (e.clientY - rect.top - rect.height / 2) / rect.height });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" ref={(el) => { ref.current = el; sectionRef.current = el; }} style={{
      minHeight: "100vh", position: "relative", display: "flex",
      flexDirection: "column", alignItems: "stretch", overflow: "hidden",
      background: "linear-gradient(135deg, #06080e 0%, #0a0f1e 40%, #0c1228 70%, #080c18 100%)",
    }}>
      {/* ── Parallax color blobs (loang lổ) — brand colors ── */}
      {[
        // [top%, left%, width, height, color, depthX, depthY, borderRadius]
        ["−18%","55%",  680,580, "rgba(200,32,42,0.38)",   0.032, 0.025, "60% 40% 55% 45%"],
        ["30%", "62%",  520,460, "rgba(232,160,32,0.28)",  0.022, 0.030, "45% 55% 40% 60%"],
        ["55%", "10%",  440,400, "rgba(200,32,42,0.22)",   0.018, 0.022, "55% 45% 60% 40%"],
        ["−5%", "20%",  360,320, "rgba(232,160,32,0.20)",  0.028, 0.018, "40% 60% 45% 55%"],
        ["65%", "50%",  300,280, "rgba(245,240,232,0.08)", 0.015, 0.020, "50% 50% 40% 60%"],
        ["15%", "40%",  250,220, "rgba(200,32,42,0.15)",   0.035, 0.028, "65% 35% 50% 50%"],
      ].map(([top, left, w, h, color, dx, dy, br], i) => (
        <div key={i} style={{
          position: "absolute",
          top: top === "−18%" ? "-18%" : top === "−5%" ? "-5%" : top,
          left,
          width: w, height: h,
          borderRadius: br,
          background: color,
          filter: `blur(${80 + i * 15}px)`,
          transform: `translate(${mouse.x * dx * 800}px, ${mouse.y * dy * 800}px)`,
          transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
        }}/>
      ))}
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none", zIndex: 0 }}/>

      {/* ── Hero row ── */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, padding: "100px 60px 60px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>

        {/* LEFT — text */}
        <div style={{ flex: "0 0 auto", maxWidth: 460 }}>
          <div className={`reveal ${inView ? "visible" : ""}`}>
            <span className="eyebrow">StudyMapper × ETEST — AI Du học</span>
          </div>
          <h1 className={`font-display reveal ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", marginTop: 20, color: "var(--cream)" }}>
            Tìm trường{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic", textShadow: "0 0 40px rgba(232,160,32,0.5)" }}>đúng</span>
            <br />cho con bạn.
          </h1>
          <p className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ marginTop: 24, fontSize: "1rem", lineHeight: 1.8, color: "var(--cream-dim)" }}>
            AI matching cá nhân hoá profile học sinh —<br />
            không phải lời khuyên chung chung như GPT.
          </p>
          <div className={`reveal ${inView ? "visible" : ""} delay-3`} style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Bắt đầu ngay →</button>
            <button className="btn-ghost" onClick={() => document.getElementById("engine")?.scrollIntoView({ behavior: "smooth" })}>Xem demo</button>
          </div>
          {/* Trust badges */}
          <div className={`reveal ${inView ? "visible" : ""} delay-4`} style={{ display: "flex", gap: 20, marginTop: 40, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }}/>
              <span style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.6)", fontFamily: "'Be Vietnam Pro',sans-serif" }}>2,400+ học sinh</span>
            </div>
            <div style={{ width: 1, height: 16, background: "rgba(245,240,232,0.15)" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8a020", boxShadow: "0 0 8px rgba(232,160,32,0.8)" }}/>
              <span style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.6)", fontFamily: "'Be Vietnam Pro',sans-serif" }}>94% đậu nguyện vọng 1</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Laptop */}
        <LaptopMockup scrollY={scrollY} mouse={mouse} inView={inView} />
      </div>

      {/* ── Full-bleed cream stats bar ── */}
      <div className={`reveal ${inView ? "visible" : ""} delay-5`} style={{ width: "100%", background: "var(--cream)", position: "relative", zIndex: 6 }}>
        <div style={{ background: "rgba(0,0,0,0.06)", overflow: "hidden", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ticker 28s linear infinite" }}>
            {[1,2].map(k => (
              <span key={k} style={{ display: "inline-block", paddingRight: 80, fontSize: "0.8rem", fontWeight: 600, color: "rgba(12,15,19,0.65)", letterSpacing: "0.03em" }}>
                Tự hào học sinh ETEST vinh danh vào các trường đại học hàng đầu như MIT · Caltech · UC Berkeley · UCLA · Cornell · NYU · Boston University · King's College London · University of Edinburgh · RMIT · Monash ·&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          {[
            { n: "5,000+", label: "TRƯỜNG ĐẠI HỌC", desc: "Dữ liệu tuyển sinh cập nhật từng mùa thi" },
            { n: "30+",    label: "QUỐC GIA",        desc: "Phủ sóng các điểm đến du học hàng đầu thế giới" },
            { n: "98%",    label: "ĐỘ CHÍNH XÁC AI", desc: "Tỉ lệ gợi ý phù hợp với profile học sinh thực tế" },
          ].map(({ n, label, desc }, i) => (
            <div key={label} style={{ padding: "44px 40px", borderLeft: i > 0 ? "1px solid rgba(12,15,19,0.12)" : "none", textAlign: "center" }}>
              <div className="font-mono-dm" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", fontWeight: 800, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em" }}>{n}</div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.14em", marginTop: 12, marginBottom: 10 }}>{label}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(12,15,19,0.55)", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </section>
  );
}

// ── Slide 2 — Problem Statement ────────────────────────────────────────────
function SlideProblem() {
  const [ref, inView] = useInView(0.1);

  const pains = [
    { badge: "Vấn đề 1", title: "Quá tải thông tin", desc: "Hàng nghìn trường, hàng trăm chương trình — gia đình không biết bắt đầu từ đâu và dễ bị agencies không uy tín dẫn dắt sai hướng." },
    { badge: "Vấn đề 2", title: "AI hiện tại quá chung chung", desc: "GPT hay ChatGPT cho lời khuyên generic — không biết con bạn học lớp mấy, GPA bao nhiêu, ngân sách thế nào, cần học bổng hay không." },
    { badge: "Vấn đề 3", title: "Chi phí tư vấn truyền thống cao", desc: "Agencies thu phí tư vấn lên đến $3,000–$5,000 USD, tư vấn theo kiểu 'đại trà', không cá nhân hoá cho từng hồ sơ cụ thể." },
  ];

  const compare = [
    { label: "Cá nhân hoá theo profile" },
    { label: "Hiểu ngân sách gia đình" },
    { label: "Dữ liệu 5,000+ trường" },
    { label: "Tỉ lệ đậu & học bổng thực" },
    { label: "Tư vấn visa & lộ trình" },
    { label: "Phân tích hồ sơ Việt Nam" },
  ];

  const LIME = "#c5f542";
  const LIME_TEXT = "#1a2800";
  const CARD_BG = "#13171f";
  const CARD_BORDER = "rgba(245,240,232,0.09)";

  return (
    <section id="problem" ref={ref} style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, #0c0f13 0%, #0f1318 100%)",
    }}>
      {/* Background glows */}
      <div className="glow-red"  style={{ width: 600, height: 600, top: "5%",  left: "-8%",  opacity: 0.3 }} />
      <div className="glow-gold" style={{ width: 400, height: 400, bottom: "5%", right: "-5%", opacity: 0.2 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1140, width: "100%", margin: "0 auto", padding: "100px 40px 100px" }}>

        {/* ═══ BLOCK 1 — Vấn đề (centered 3-card) ═══ */}
        <div style={{ marginBottom: 96 }}>
          {/* Centered header */}
          <div className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>02 — Bài toán</span>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800,
              color: "var(--cream)", letterSpacing: "-0.02em", lineHeight: 1.1,
              marginBottom: 16,
            }}>
              Tại sao gia đình Việt Nam<br />
              <span style={{ color: "var(--red)" }}>đang gặp khó?</span>
            </h2>
            <p style={{ color: "var(--cream-dim)", fontSize: "0.98rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              Học sinh cấp 3 đứng trước hàng nghìn lựa chọn mà không có<br />công cụ cá nhân hoá nào hỗ trợ đúng nghĩa.
            </p>
          </div>

          {/* 3 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "🌊", badge: "Vấn đề 1", title: "Quá tải thông tin",          items: ["Hàng nghìn trường, hàng trăm chương trình", "Không biết bắt đầu từ đâu", "Dễ bị agencies không uy tín dẫn dắt", "Thiếu công cụ so sánh đáng tin cậy"] },
              { icon: "🤖", badge: "Vấn đề 2", title: "AI hiện tại quá chung chung", items: ["GPT không biết GPA của con bạn", "Không hiểu ngân sách gia đình", "Không có dữ liệu tuyển sinh thực", "Tư vấn theo kiểu 'one-size-fits-all'"] },
              { icon: "💸", badge: "Vấn đề 3", title: "Chi phí tư vấn cao",          items: ["$3,000–$5,000 USD phí tư vấn", "Tư vấn đại trà, không cá nhân hoá", "Không cam kết kết quả cụ thể", "Khó tiếp cận với gia đình tỉnh lẻ"] },
            ].map((p, i) => (
              <div
                key={p.badge}
                className={`reveal ${inView ? "visible" : ""} delay-${i + 1}`}
                style={{
                  background: "linear-gradient(160deg, #13171f 0%, #0f1318 100%)",
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: 22,
                  padding: "36px 28px 32px",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`,
                }}
              >
                {/* Number circle */}
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(180,185,195,0.12)",
                  border: "1px solid rgba(180,185,195,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", fontWeight: 800, color: "rgba(200,205,215,0.9)",
                  marginBottom: 24, fontFamily: "'Be Vietnam Pro', sans-serif",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}>{i + 1}</div>

                {/* Title */}
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--cream)", marginBottom: 20, lineHeight: 1.3 }}>{p.title}</div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                  {p.items.map(item => (
                    <div key={item} style={{ fontSize: "0.83rem", color: "var(--cream-dim)", lineHeight: 1.5 }}>{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ BLOCK 2 — So sánh ═══ */}
        <div className={`reveal ${inView ? "visible" : ""} delay-2`}
          style={{ display: "grid", gridTemplateColumns: "1fr 1.55fr", gap: 56, alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 800,
              color: "var(--cream)", letterSpacing: "-0.02em", lineHeight: 1.15,
              textTransform: "uppercase", marginBottom: 20,
            }}>
              StudyMapper<br />
              <span style={{ color: "var(--gold)" }}>vs GPT</span>
            </h2>
            <p style={{ color: "var(--cream-dim)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 32, maxWidth: 320 }}>
              Không phải mọi AI đều hiểu được profile học sinh Việt Nam — sự khác biệt nằm ở dữ liệu và cá nhân hoá.
            </p>
            <button
              className="btn-primary"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", fontSize: "0.88rem" }}
            >
              Bắt đầu miễn phí <span style={{ fontSize: "1rem" }}>↗</span>
            </button>
          </div>

          {/* RIGHT — Comparison table card */}
          <div className={`reveal ${inView ? "visible" : ""} delay-3`} style={{ position: "relative" }}>
            <div style={{
              background: CARD_BG, borderRadius: 22,
              border: `1px solid ${CARD_BORDER}`,
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
            }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", background: "rgba(255,255,255,0.04)", borderBottom: `1px solid rgba(245,240,232,0.08)` }}>
                <div style={{ padding: "14px 20px", fontSize: "0.7rem", fontWeight: 700, color: "var(--cream-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>TÍNH NĂNG</div>
                <div style={{ padding: "14px 20px", textAlign: "center", fontSize: "0.82rem", fontWeight: 700, color: "rgba(245,240,232,0.35)", borderLeft: `1px solid rgba(245,240,232,0.06)` }}>GPT / ChatGPT</div>
                <div style={{ padding: "14px 20px", textAlign: "center", fontSize: "0.82rem", fontWeight: 700, color: "var(--gold)", borderLeft: `1px solid rgba(245,240,232,0.06)`, background: "rgba(197,245,66,0.05)" }}>StudyMapper</div>
              </div>

              {compare.map((row, i) => (
                <div key={row.label} style={{
                  display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
                  borderBottom: i < compare.length - 1 ? `1px solid rgba(245,240,232,0.05)` : "none",
                }}>
                  <div style={{ padding: "13px 20px", fontSize: "0.85rem", color: "var(--cream-dim)" }}>{row.label}</div>
                  <div style={{ padding: "13px 20px", textAlign: "center", borderLeft: `1px solid rgba(245,240,232,0.05)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <line x1="7" y1="7" x2="21" y2="21" stroke="#c8202a" strokeWidth="3.2" strokeLinecap="round"/>
                      <line x1="21" y1="7" x2="7" y2="21" stroke="#c8202a" strokeWidth="3.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ padding: "13px 20px", textAlign: "center", borderLeft: `1px solid rgba(245,240,232,0.05)`, background: "rgba(197,245,66,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <polyline points="4,15 11,22 24,7" stroke="#22c55e" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}

              {/* Bottom note */}
              <div style={{ padding: "18px 20px", background: "rgba(200,32,42,0.07)", borderTop: `1px solid rgba(200,32,42,0.2)` }}>
                <p style={{ fontSize: "0.83rem", color: "var(--cream-dim)", lineHeight: 1.65, margin: 0 }}>
                  <span style={{ color: "var(--red)", fontWeight: 700 }}>StudyMapper × ETEST</span> kết hợp dữ liệu từ 5,000+ trường với AI matching — đưa ra gợi ý <em>cụ thể</em> theo đúng profile từng học sinh Việt Nam.
                </p>
              </div>
            </div>

            {/* Arrow button */}
            <div style={{
              position: "absolute", bottom: -18, right: 24,
              width: 52, height: 52, borderRadius: "50%",
              background: LIME, color: LIME_TEXT,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.3rem", fontWeight: 700,
              boxShadow: "0 8px 24px rgba(197,245,66,0.35)",
              cursor: "pointer",
            }}>↗</div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Slide 3 — User Profile Input ───────────────────────────────────────────
function Slide2() {
  const [ref, inView] = useInView(0.1);
  const fields = [
    { label: "Họ và tên", placeholder: "Nguyễn Văn An", type: "text", span: 1 },
    { label: "Năm học hiện tại", type: "select", options: ["Lớp 10", "Lớp 11", "Lớp 12", "Đã tốt nghiệp"], span: 1 },
    { label: "GPA / Điểm TB", placeholder: "8.5 / 10", type: "text", span: 1 },
    { label: "Điểm IELTS / TOEFL", placeholder: "VD: IELTS 6.5 hoặc TOEFL 85", type: "text", span: 1 },
    { label: "Ngành học mong muốn", type: "select", options: ["Computer Science", "Business & Finance", "Engineering", "Medicine & Health", "Arts & Design", "Law", "Education", "Social Sciences"], span: 1 },
    { label: "Quốc gia mục tiêu", type: "select", options: ["Mỹ 🇺🇸", "Anh 🇬🇧", "Canada 🇨🇦", "Úc 🇦🇺", "Singapore 🇸🇬", "Nhật 🇯🇵", "Hà Lan 🇳🇱", "Đức 🇩🇪"], span: 1 },
    { label: "Ngân sách / năm (USD)", placeholder: "Nhập số hoặc chọn dưới đây", type: "budget", span: 1 },
    { label: "Nhu cầu học bổng", type: "select", options: ["Không cần học bổng", "Cần học bổng một phần (<50%)", "Cần học bổng lớn (50–80%)", "Cần full scholarship"], span: 1 },
    { label: "Dự định nhập học", type: "select", options: ["2025", "2026", "2027", "Chưa xác định"], span: 1 },
    { label: "Thành tích / Hoạt động ngoại khoá", placeholder: "VD: Giải Toán quốc gia, CLB robotics, tình nguyện...", type: "text", span: 2 },
  ];

  return (
    <section id="profile" ref={ref} style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: "linear-gradient(180deg, var(--ink) 0%, #0f1318 100%)",
    }}>
      <div className="glow-red" style={{ width: 500, height: 500, top: "50%", left: "-5%", transform: "translateY(-50%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, width: "100%", padding: "100px 32px" }}>
        {/* Header */}
        <div className={`reveal ${inView ? "visible" : ""}`} style={{ marginBottom: 56 }}>
          <span className="eyebrow">03 — Profile</span>
          <div className="section-divider" style={{ margin: "12px 0 20px" }} />
          <h2 className="font-display" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 600, color: "var(--cream)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Kể cho AI nghe về con bạn.
          </h2>
          <p style={{ color: "var(--cream-dim)", marginTop: 12, fontSize: "1rem" }}>
            Càng chi tiết — kết quả matching càng chính xác.
          </p>
        </div>

        {/* Form grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {fields.map((f, i) => (
            <div key={f.label} className={`reveal ${inView ? "visible" : ""} delay-${Math.min(i + 1, 5)}`} style={{ gridColumn: f.span === 2 ? "span 2" : "span 1" }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.78rem", letterSpacing: "0.08em", color: "var(--cream-dim)", textTransform: "uppercase" }}>{f.label}</label>
              {f.type === "select" ? (
                <select className="field-input">
                  <option value="">Chọn...</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === "budget" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input className="field-input" placeholder={f.placeholder} />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["< $15k", "$15–25k", "$25–40k", "$40k+"].map(b => (
                      <button key={b} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(245,240,232,0.15)", background: "transparent", color: "var(--cream-dim)", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.target.style.borderColor = "var(--gold)"; e.target.style.color = "var(--gold)"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "rgba(245,240,232,0.15)"; e.target.style.color = "var(--cream-dim)"; }}
                      >{b}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <input className="field-input" type="text" placeholder={f.placeholder} />
              )}
            </div>
          ))}
        </div>

        <div className={`reveal ${inView ? "visible" : ""} delay-5`} style={{ marginTop: 36 }}>
          <button className="btn-primary" style={{ width: "100%", fontSize: "1.05rem", padding: "16px" }}>
            Phân tích với AI →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Slide 4 — AI Matching Engine ───────────────────────────────────────────
function Slide3() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(null);
  const steps = [
    { num: "01.", title: "Thu thập Profile", desc: "AI đọc GPA, IELTS, ngành học, ngân sách và quốc gia mục tiêu để hiểu đúng nhu cầu cụ thể của từng học sinh." },
    { num: "02.", title: "Phân tích & Embedding", desc: "Profile được vector hoá và so khớp với dữ liệu từ 5,000+ trường đại học, cập nhật theo từng mùa tuyển sinh." },
    { num: "03.", title: "Score & Rank", desc: "Mô hình ML chấm điểm tương thích và dự đoán xác suất đậu dựa trên 10,000+ hồ sơ học sinh Việt Nam thực tế." },
    { num: "04.", title: "Gợi ý cá nhân hoá", desc: "Kết quả sắp xếp theo mức độ phù hợp — kèm học bổng khả dụng, tỉ lệ visa, yêu cầu IELTS và lộ trình cụ thể." },
  ];

  return (
    <section id="engine" ref={ref} style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0c0f13 0%, #111620 50%, #0c0f13 100%)",
    }}>
      <div className="glow-gold" style={{ width: 500, height: 500, top: "20%", right: "0%", opacity: 0.6 }} />
      <div className="glow-red" style={{ width: 300, height: 300, bottom: "10%", left: "5%", opacity: 0.4 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, width: "100%", padding: "100px 40px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          {/* LEFT */}
          <div style={{ paddingTop: 8 }}>
            <span className={`eyebrow reveal-left ${inView ? "visible" : ""}`}>04 — Engine</span>
            <div className={`section-divider reveal-left ${inView ? "visible" : ""} delay-1`} style={{ margin: "14px 0 24px" }} />
            <h2 className={`font-display reveal-left ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--cream)" }}>
              Từ profile<br />đến trường phù hợp,{" "}
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>từng bước.</span>
            </h2>
            <p className={`reveal-left ${inView ? "visible" : ""} delay-2`} style={{ color: "var(--cream-dim)", marginTop: 20, fontSize: "0.95rem", lineHeight: 1.75 }}>
              Toàn bộ quá trình chạy tự động —<br />kết quả trong vài giây.
            </p>

            {/* Mini stat */}
            <div className={`reveal-left ${inView ? "visible" : ""} delay-3`} style={{ marginTop: 32, display: "flex", gap: 24 }}>
              {[["10K+","hồ sơ học"],["5K+","trường"],["3s","kết quả"]].map(([n,l]) => (
                <div key={n}>
                  <div className="font-mono-dm" style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--gold)" }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--cream-dim)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — steps with process line */}
          <div style={{ position: "relative" }}>
            {/* Vertical connector line 01→04 */}
            <div style={{
              position: "absolute",
              left: 29, top: 30, bottom: 30,
              width: 1.5,
              background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 100%)",
              zIndex: 0,
            }}/>

            {steps.map((step, i) => {
              const isHovered = hovered === i;
              const isFirst = i === 0;
              return (
                <div key={step.num}
                  className={`reveal ${inView ? "visible" : ""} delay-${i + 1}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "grid", gridTemplateColumns: "60px 1fr", gap: "0 20px",
                    alignItems: "start", padding: "18px 20px 18px 0", marginBottom: 8,
                    borderRadius: 12,
                    border: isHovered ? "1px solid rgba(200,32,42,0.7)" : "1px solid transparent",
                    background: "transparent",
                    boxShadow: isHovered ? "0 0 20px rgba(200,32,42,0.12)" : "none",
                    cursor: "default",
                    position: "relative", zIndex: 1,
                    transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s, border 0.25s ease, box-shadow 0.25s ease`,
                  }}
                >
                  {/* Number column with dot on the line */}
                  <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingRight: 14, paddingTop: 6 }}>
                    {/* Dot on the line */}
                    <div style={{
                      position: "absolute", right: 6, top: 8,
                      width: isFirst ? 16 : 12, height: isFirst ? 16 : 12,
                      borderRadius: "50%",
                      background: isFirst ? "var(--red)" : "rgba(255,255,255,0.85)",
                      boxShadow: isFirst ? "0 0 14px rgba(200,32,42,0.7)" : "0 0 6px rgba(255,255,255,0.3)",
                      zIndex: 2,
                    }}/>
                    <div style={{ fontWeight: 700, fontSize: "1.9rem", color: isFirst ? "var(--red)" : "rgba(245,240,232,0.55)", letterSpacing: "-0.02em", lineHeight: 1 }}>{step.num}</div>
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "var(--cream)", marginBottom: 10, lineHeight: 1.3 }}>{step.title}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--cream-dim)", lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Slide 5 — Output / Results ─────────────────────────────────────────────
function Slide4() {
  const [ref, inView] = useInView(0.1);
  const unis = [
    { name: "University of Toronto", country: "Canada 🇨🇦", score: 94, rank: "#1 Canada", field: "Computer Science", tuition: "$28,000", scholarship: "Merit $12,000/năm", badge: "Best Match" },
    { name: "University of Melbourne", country: "Úc 🇦🇺", score: 88, rank: "#1 Australia", field: "Business", tuition: "$24,500", scholarship: "Merit award $8,000", badge: "Phù hợp ngân sách" },
    { name: "NUS Singapore", country: "Singapore 🇸🇬", score: 82, rank: "#8 Asia", field: "Engineering", tuition: "$19,800", scholarship: "ASEAN Scholarship", badge: "Visa dễ" },
    { name: "TU Delft", country: "Hà Lan 🇳🇱", score: 79, rank: "Top 50 World", field: "Engineering", tuition: "$12,000", scholarship: "Holland Scholarship", badge: "Chi phí thấp" },
  ];


  return (
    <section id="results" ref={ref} style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "var(--ink)" }}>
      <div className="glow-red" style={{ width: 500, height: 500, top: "30%", right: "0%" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, width: "100%", padding: "100px 32px 60px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className={`eyebrow reveal ${inView ? "visible" : ""}`}>05 — Kết quả</span>
            <div className={`section-divider reveal ${inView ? "visible" : ""} delay-1`} style={{ margin: "12px 0 16px" }} />
            <h2 className={`font-display reveal ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 600, color: "var(--cream)", letterSpacing: "-0.02em" }}>
              4 trường phù hợp nhất<br />với profile của bạn.
            </h2>
          </div>
          <div className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ display: "flex", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 8, padding: "8px 16px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--cream-dim)" }}>Lọc theo</span>
            {["Học bổng", "Ngân sách", "Visa"].map(t => (
              <span key={t} style={{ fontSize: "0.72rem", padding: "4px 10px", borderRadius: 20, background: "rgba(245,240,232,0.06)", color: "var(--cream-dim)", cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* University cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {unis.map((u, i) => (
            <div key={u.name}
              className={`glass reveal ${inView ? "visible" : ""} delay-${i + 1}`}
              style={{ borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", gap: 24, transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s, border-color 0.2s`, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(200,32,42,0.35)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(245,240,232,0.1)"}
            >
              <div className="font-mono-dm" style={{ color: "rgba(245,240,232,0.2)", fontSize: "1.5rem", minWidth: 32, fontWeight: 500 }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="score-ring">{u.score}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, color: "var(--cream)", fontSize: "1rem" }}>{u.name}</span>
                  <span style={{ fontSize: "0.65rem", padding: "3px 8px", borderRadius: 20, background: i === 0 ? "var(--red)" : "rgba(232,160,32,0.15)", color: i === 0 ? "white" : "var(--gold)", letterSpacing: "0.05em" }}>{u.badge}</span>
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {[u.country, u.field, u.rank].map(t => <span key={t} style={{ fontSize: "0.78rem", color: "var(--cream-dim)" }}>{t}</span>)}
                </div>
                <div className="match-bar-bg" style={{ marginTop: 12, width: "100%", maxWidth: 280 }}>
                  <div className="match-bar-fill" style={{ width: inView ? `${u.score}%` : "0%" }} />
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="font-mono-dm" style={{ color: "var(--cream)", fontSize: "1rem" }}>{u.tuition}<span style={{ color: "var(--cream-dim)", fontSize: "0.72rem" }}>/năm</span></div>
                <div style={{ fontSize: "0.72rem", color: "var(--gold)", marginTop: 4 }}>{u.scholarship}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Slide 6 — Testimonials ─────────────────────────────────────────────────
function SlideTestimonials() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(null);

  const stories = [
    {
      initials: "MA",
      name: "Nguyễn Minh Anh",
      info: "Lớp 12 · Hà Nội · GPA 8.7",
      specialty: "Computer Science",
      school: "University of Toronto 🇨🇦",
      scholarship: "Merit Scholarship $12,000/năm",
      quote: "Chỉ 3 phút nhập profile, AI cho ngay 5 trường với học bổng cụ thể — điều agencies mất 3 tháng vẫn chưa làm được.",
      photoGrad: "linear-gradient(170deg, #1a0508 0%, #5a1018 45%, #c8202a 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
    {
      initials: "HP",
      name: "Trần Hoàng Phúc",
      info: "Lớp 12 · TP.HCM · GPA 9.1",
      specialty: "Engineering",
      school: "NUS Singapore 🇸🇬",
      scholarship: "ASEAN Scholarship — Full tuition",
      quote: "AI recommend NUS với xác suất đậu 74% dựa trên 10,000 hồ sơ thực — và mình đã đậu thật.",
      photoGrad: "linear-gradient(170deg, #0c0a02 0%, #3d2e04 45%, #e8a020 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
    {
      initials: "TH",
      name: "Lê Thị Thanh Hà",
      info: "Lớp 11 · Đà Nẵng · GPA 8.3",
      specialty: "Business",
      school: "Univ. of Melbourne 🇦🇺",
      scholarship: "International Merit Award $8,000",
      quote: "Gia đình không nhiều ngân sách. StudyMapper tìm Melbourne với học bổng fit đúng budget — điều ba mẹ không nghĩ có thể.",
      photoGrad: "linear-gradient(170deg, #030e06 0%, #0b2e12 45%, #22c55e 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
    {
      initials: "QB",
      name: "Phạm Quốc Bảo",
      info: "Lớp 12 · Cần Thơ · GPA 8.9",
      specialty: "Law",
      school: "King's College London 🇬🇧",
      scholarship: "International Award £6,000",
      quote: "Không ai tư vấn được ngành Law ở Anh phù hợp ngân sách. StudyMapper tìm ra KCL — đúng dream school của mình.",
      photoGrad: "linear-gradient(170deg, #06060f 0%, #141030 45%, #6366f1 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
  ];

  return (
    <section id="testimonials" ref={ref} style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: "linear-gradient(180deg, #0c0f13 0%, #0f1318 100%)",
    }}>
      <div className="glow-gold" style={{ width: 500, height: 500, top: "10%", right: "-5%", opacity: 0.25 }} />
      <div className="glow-red"  style={{ width: 350, height: 350, bottom: "5%", left: "0%",  opacity: 0.2 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", padding: "100px 40px 80px", margin: "0 auto" }}>

        {/* Header */}
        <div className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="eyebrow">06 — Câu chuyện thực</span>
          <div className="section-divider" style={{ margin: "12px auto 20px" }} />
          <h2 className="font-display" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "var(--cream)", letterSpacing: "-0.02em" }}>
            Học sinh Việt Nam<br />
            <span style={{ color: "var(--gold)" }}>đã tìm được trường đúng.</span>
          </h2>
          <p style={{ color: "var(--cream-dim)", marginTop: 16, fontSize: "0.95rem" }}>
            Kết quả thực từ học sinh dùng StudyMapper × ETEST trong mùa tuyển sinh 2024–2025.
          </p>
        </div>

        {/* Doctor-style cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "start" }}>
          {stories.map((s, i) => (
            <div
              key={s.name}
              className={`reveal ${inView ? "visible" : ""} delay-${i + 1}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 22,
                overflow: "hidden",
                background: "#12161d",
                border: "1px solid rgba(245,240,232,0.08)",
                cursor: "pointer",
                transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s, box-shadow 0.3s`,
                boxShadow: hovered === i ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,245,66,0.2)" : "0 8px 32px rgba(0,0,0,0.35)",
              }}
            >
              {/* ── Photo area ── */}
              <div style={{ position: "relative", height: 280, background: s.photoGrad, overflow: "hidden" }}>

                {/* Subtle grid texture */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

                {/* Initials avatar */}
                <div style={{
                  position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "2px solid rgba(255,255,255,0.22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.02em",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}>{s.initials}</div>

                {/* Hover arrow button — top right */}
                <div style={{
                  position: "absolute", top: 14, right: 14,
                  width: 36, height: 36, borderRadius: "50%",
                  background: "#0c0f13",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.85rem", color: "#fff",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "scale(1)" : "scale(0.7)",
                  transition: "opacity 0.25s, transform 0.25s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}>↗</div>

                {/* Quote overlay on hover */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(10,12,16,0.82)",
                  backdropFilter: "blur(4px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "24px 20px",
                  opacity: hovered === i ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}>
                  <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.9)", lineHeight: 1.7, fontStyle: "italic", textAlign: "center", margin: 0 }}>
                    "{s.quote}"
                  </p>
                </div>

              </div>

              {/* Specialty pill — between photo and name, outside overflow:hidden */}
              <div style={{ padding: "0 20px", marginTop: -14, position: "relative", zIndex: 3 }}>
                <div style={{
                  display: "inline-block",
                  background: s.pillColor, color: s.pillText,
                  fontSize: "0.72rem", fontWeight: 700,
                  padding: "5px 14px", borderRadius: 20,
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}>{s.specialty}</div>
              </div>

              {/* ── Name area ── */}
              <div style={{ padding: "14px 20px 24px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.975rem", color: "var(--cream)", lineHeight: 1.3, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 14 }}>{s.info}</div>

                <div style={{ borderTop: "1px solid rgba(245,240,232,0.07)", paddingTop: 14 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", marginBottom: 3 }}>{s.school}</div>
                  <div style={{ fontSize: "0.7rem", color: s.pillColor, fontWeight: 600 }}>{s.scholarship}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Slide 7 — Chat AI ──────────────────────────────────────────────────────
function Slide5() {
  const [ref, inView] = useInView(0.1);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Xin chào! Mình là AI tư vấn du học của StudyMapper 👋\nBạn muốn hỏi gì về việc chọn trường?" },
    { role: "user", text: "Con tôi học lớp 12, GPA 8.7, muốn học Computer Science ở Canada, budget $25k/năm" },
    { role: "ai", text: "Dựa trên profile của bạn, đây là 3 trường phù hợp nhất:\n\n🥇 University of Toronto — Match 94% · Xác suất đậu ~72% · Học bổng Merit $12,000\n🥈 UBC Vancouver — Match 89% · An toàn hơn · Học bổng $8,000\n🥉 McMaster — Match 83% · Dễ đậu nhất · Học bổng $5,000\n\nBạn muốn mình phân tích chi tiết trường nào?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const quickPrompts = [
    "IELTS cần bao nhiêu để vào UofT?",
    "So sánh học phí Canada vs Úc",
    "Học bổng nào phù hợp GPA 8.5?",
    "Tỉ lệ visa Canada cho học sinh VN?",
  ];

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m,
      { role: "user", text: input },
      { role: "ai", text: "Mình đang phân tích dữ liệu từ 5,000+ trường... Kết quả sẽ có ngay sau đây 🔍" }
    ]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section id="chat" ref={ref} style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: "linear-gradient(180deg, #0c0f13 0%, #0a0d10 100%)",
    }}>
      <div className="glow-gold" style={{ width: 400, height: 400, bottom: "10%", right: "10%" }} />
      <div className="glow-red" style={{ width: 300, height: 300, top: "20%", left: "5%" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, width: "100%", padding: "100px 32px", margin: "0 auto" }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <span className={`eyebrow reveal ${inView ? "visible" : ""}`}>07 — AI Chat</span>
          <div className={`section-divider reveal ${inView ? "visible" : ""} delay-1`} style={{ margin: "12px auto 20px" }} />
          <h2 className={`font-display reveal ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 600, color: "var(--cream)", letterSpacing: "-0.02em" }}>
            Hỏi AI bất cứ điều gì.
          </h2>
          <p className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ color: "var(--cream-dim)", marginTop: 12, fontSize: "0.95rem" }}>
            Tư vấn 24/7 — hiểu context, nhớ hồ sơ của bạn, không trả lời chung chung.
          </p>
        </div>

        {/* Chat window */}
        <div className={`glass reveal ${inView ? "visible" : ""} delay-2`} style={{ borderRadius: 20, overflow: "hidden" }}>
          {/* Header bar */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(245,240,232,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--red), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🤖</div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--cream)", fontSize: "0.9rem" }}>StudyMapper AI</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontSize: "0.72rem", color: "var(--cream-dim)" }}>Online — phản hồi ngay · Đang nhớ hồ sơ của bạn</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: 320, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.4s ease" }}>
                <div className={m.role === "ai" ? "bubble-ai" : "bubble-user"}>
                  {m.text.split("\n").map((line, j) => <span key={j}>{line}<br /></span>)}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(245,240,232,0.08)", display: "flex", gap: 12 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Hỏi về trường, học bổng, visa, IELTS..." className="field-input" style={{ flex: 1 }} />
            <button onClick={send} className="btn-primary" style={{ padding: "12px 24px", flexShrink: 0 }}>Gửi →</button>
          </div>
        </div>

        {/* Quick prompts */}
        <div className={`reveal ${inView ? "visible" : ""} delay-3`} style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {quickPrompts.map(q => (
            <button key={q} onClick={() => setInput(q)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: "0.78rem", border: "1px solid rgba(245,240,232,0.12)", background: "transparent", color: "var(--cream-dim)", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor = "var(--gold)"; e.target.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(245,240,232,0.12)"; e.target.style.color = "var(--cream-dim)"; }}
            >{q}</button>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </section>
  );
}

// ── Slide 8 — Đăng ký tư vấn ──────────────────────────────────────────────
function Slide6() {
  const [ref, inView] = useInView(0.1);
  const reasons = [
    "Tỉ lệ Visa thành công đến 99% — cao nhất thị trường",
    "Đối tác của 5,000+ trường tại Mỹ, Úc, Canada, Anh, Singapore",
    "AI matching cá nhân hoá — không phải tư vấn đại trà như GPT",
    "Chiến lược săn học bổng, cam kết 100% trúng tuyển",
    "Hỗ trợ toàn diện hồ sơ apply, visa và định cư sau tốt nghiệp",
    "Xây dựng lộ trình IELTS / TOEFL / SAT cùng chuyên gia",
  ];

  return (
    <>
      <section id="contact" ref={ref} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--ink)" }}>
        <div className="glow-red" style={{ width: 500, height: 500, top: "10%", right: "30%", opacity: 0.25 }} />
        <div className="glow-gold" style={{ width: 300, height: 300, bottom: "5%", left: "5%", opacity: 0.3 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, width: "100%", padding: "100px 40px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            {/* LEFT */}
            <div>
              <span className={`eyebrow reveal-left ${inView ? "visible" : ""}`}>08 — Liên hệ</span>
              <div className={`section-divider reveal-left ${inView ? "visible" : ""} delay-1`} style={{ margin: "14px 0 24px" }} />
              <h2 className={`font-display reveal-left ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--cream)", marginBottom: 32 }}>
                Vì sao nên chọn<br />
                <span style={{ color: "var(--red)" }}>StudyMapper × ETEST?</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {reasons.map((r, i) => (
                  <div key={r} className={`reveal-left ${inView ? "visible" : ""} delay-${Math.min(i + 2, 5)}`} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0", borderBottom: i < reasons.length - 1 ? "1px solid rgba(245,240,232,0.07)" : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: "0.925rem", color: "var(--cream-dim)", lineHeight: 1.6 }}>{r}</span>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className={`reveal-left ${inView ? "visible" : ""} delay-5`} style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Email",   val: "tuvanduhoc@etest.edu.vn" },
                  { label: "Hotline", val: "(+84) 028 7300 8879" },
                  { label: "Website", val: "studymapper.etest.edu.vn" },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600, minWidth: 56, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--cream-dim)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — form */}
            <div className={`glass reveal-right ${inView ? "visible" : ""} delay-2`} style={{ borderRadius: 20, padding: 40 }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>Đăng ký tư vấn miễn phí</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--cream-dim)", marginBottom: 32, lineHeight: 1.6 }}>Chuyên gia sẽ liên hệ trong vòng 24 giờ.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Họ và tên</label>
                    <input className="field-input" placeholder="Lê Văn A" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Số điện thoại</label>
                    <input className="field-input" placeholder="(+84) 0123 456 789" />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Email</label>
                  <input className="field-input" type="email" placeholder="alevan@gmail.com" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Quốc gia</label>
                    <select className="field-input">
                      <option>Du học Mỹ 🇺🇸</option>
                      <option>Du học Anh 🇬🇧</option>
                      <option>Du học Canada 🇨🇦</option>
                      <option>Du học Úc 🇦🇺</option>
                      <option>Du học Singapore 🇸🇬</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Bậc học</label>
                    <select className="field-input">
                      <option>Bậc Đại học</option>
                      <option>Thạc sĩ</option>
                      <option>Trung học</option>
                      <option>Ngắn hạn / Hè</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Ghi chú</label>
                  <textarea className="field-input" placeholder="Chia sẻ thêm về mong muốn của bạn..." rows={3} style={{ resize: "none" }} />
                </div>

                <button className="btn-primary" style={{ width: "100%", marginTop: 8, fontSize: "1rem", padding: "15px" }}>
                  Đặt hẹn tư vấn →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#080a0d",
        borderTop: "1px solid rgba(245,240,232,0.06)",
        padding: "32px 40px",
      }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span className="font-display" style={{ color: "var(--cream)", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em" }}>
            Study<span style={{ color: "var(--red)" }}>Mapper</span>
            <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.75rem", marginLeft: 8, fontWeight: 400 }}>× ETEST</span>
          </span>
          <div style={{ display: "flex", gap: 28 }}>
            {["Giới thiệu", "Tính năng", "Kết quả", "Tư vấn"].map(l => (
              <span key={l} style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.3)", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--cream-dim)"}
                onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.3)"}
              >{l}</span>
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.2)" }}>© 2025 StudyMapper × ETEST. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}

// ── Cursor light ───────────────────────────────────────────────────────────
function CursorLight() {
  const lightRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!lightRef.current) return;
      lightRef.current.style.left = e.clientX + "px";
      lightRef.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={lightRef} style={{
      position: "fixed", width: 320, height: 320, borderRadius: "50%",
      pointerEvents: "none", zIndex: 9999,
      transform: "translate(-50%, -50%)",
      background: "radial-gradient(circle, rgba(200,32,42,0.18) 0%, rgba(220,80,42,0.10) 30%, rgba(232,160,32,0.06) 55%, transparent 75%)",
      filter: "blur(28px)",
      transition: "left 0.08s ease, top 0.08s ease",
      mixBlendMode: "screen",
    }} />
  );
}

// ── App ────────────────────────────────────────────────────────────────────
// ── Global parallax blob background (all slides) ───────────────────────────
function GlobalParallaxBg() {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMove  = (e) => setMouse({
      x: (e.clientX - window.innerWidth  / 2) / window.innerWidth,
      y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
    });
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMove,   { passive: true });
    return () => {
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Each blob: [top-offset-px, left%, w, h, color, scrollFactor, mouseFactor, borderRadius]
  const BLOBS = [
    [  120, "58%", 700, 620, "rgba(200,32,42,0.30)",   0.18, 50, "62% 38% 55% 45%"],
    [  480, "62%", 520, 460, "rgba(232,160,32,0.24)",  0.28, 32, "45% 55% 42% 58%"],
    [  900, "5%",  480, 440, "rgba(200,32,42,0.22)",   0.12, 40, "55% 45% 60% 40%"],
    [ 1300, "68%", 420, 380, "rgba(232,160,32,0.20)",  0.32, 28, "40% 60% 48% 52%"],
    [ 1800, "10%", 560, 500, "rgba(200,32,42,0.24)",   0.22, 36, "58% 42% 52% 48%"],
    [ 2300, "60%", 400, 360, "rgba(232,160,32,0.18)",  0.38, 22, "48% 52% 38% 62%"],
    [ 2800, "25%", 500, 460, "rgba(200,32,42,0.20)",   0.15, 44, "52% 48% 58% 42%"],
    [ 3400, "65%", 460, 420, "rgba(232,160,32,0.22)",  0.26, 26, "42% 58% 52% 48%"],
    [ 4000, "15%", 540, 480, "rgba(200,32,42,0.18)",   0.20, 38, "60% 40% 48% 52%"],
    [ 4600, "55%", 380, 340, "rgba(232,160,32,0.16)",  0.34, 20, "44% 56% 42% 58%"],
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {BLOBS.map(([topPx, left, w, h, color, sf, mf, br], i) => {
        // Blob moves at `sf` of the scroll speed → parallax drift
        const ty = -(scrollY - topPx) * sf + mouse.y * mf;
        const tx = mouse.x * mf;
        // Visible when blob's "page position" is near the viewport
        const dist = Math.abs(scrollY - topPx);
        const opacity = Math.max(0, 1 - dist / 1400);
        return (
          <div key={i} style={{
            position: "absolute",
            top: topPx - scrollY * (1 - sf),
            left,
            width: w, height: h,
            borderRadius: br,
            background: color,
            filter: `blur(${85 + i * 8}px)`,
            transform: `translate(${tx}px, ${ty}px)`,
            transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
            opacity: Math.min(opacity * 1.4, 1),
            willChange: "transform, opacity",
          }}/>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh" }}>
      <GlobalParallaxBg />
      <CursorLight />
      <Nav />
      <Slide1 />
      <SlideProblem />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <SlideTestimonials />
      <Slide5 />
      <Slide6 />
    </div>
  );
}
