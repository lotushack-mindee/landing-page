import { useState, useEffect, useRef, Suspense, lazy } from "react";
const Globe = lazy(() => import("react-globe.gl"));

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
  { label: "About",    id: "hero" },
  { label: "Features", id: "engine" },
  { label: "Results",  id: "results" },
  { label: "Consult",  id: "contact" },
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
      <div className="nav-links" style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map(({ label, id }) => (
          <span
            key={id}
            onClick={() => scrollTo(id)}
            style={{ color: "var(--cream-dim)", fontSize: "0.85rem", cursor: "pointer", fontFamily: "'Be Vietnam Pro', sans-serif", transition: "color 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.target.style.color = "var(--cream)"}
            onMouseLeave={e => e.target.style.color = "var(--cream-dim)"}
          >{label}</span>
        ))}
      </div>
      <button
        className="btn-primary"
        onClick={() => scrollTo("contact")}
        style={{ padding: "8px 20px", fontSize: "0.82rem", whiteSpace: "nowrap" }}
      >Get Started Free →</button>
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

// ── react-globe.gl 3D Earth ───────────────────────────────────────────────────
const GLOBE_MARKERS = [
  { lat: 21.03,  lng: 105.85, label: "Hanoi" },
  { lat: 10.82,  lng: 106.63, label: "Ho Chi Minh" },
  { lat: 37.77,  lng: -122.4, label: "San Francisco" },
  { lat: 51.5,   lng: -0.12,  label: "London" },
  { lat: -33.87, lng: 151.2,  label: "Sydney" },
  { lat: 1.35,   lng: 103.8,  label: "Singapore" },
  { lat: 43.65,  lng: -79.38, label: "Toronto" },
  { lat: 35.68,  lng: 139.69, label: "Tokyo" },
];

function LaptopMockup({ scrollY, mouse, inView }) {
  const globeRef   = useRef(null);
  const wrapperRef = useRef(null);
  const SIZE = 560;
  const parallaxY = scrollY * -0.28;

  // Setup controls once globe is ready — no user interaction, auto-rotate only
  useEffect(() => {
    if (!globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate      = true;
    ctrl.autoRotateSpeed = 0.8;
    ctrl.enableZoom      = false;
    ctrl.enablePan       = false;
    ctrl.enableRotate    = false;
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`reveal-right ${inView ? "visible" : ""} delay-2`}
      style={{
        position: "relative", flexShrink: 0,
        width: SIZE, height: SIZE,
        transform: `translateY(${parallaxY}px)`,
        transition: "opacity 0.9s ease",
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Red outer halo */}
      <div style={{
        position: "absolute", inset: -70, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,32,42,0.5) 0%, rgba(200,32,42,0.18) 50%, transparent 72%)",
        filter: "blur(48px)",
        pointerEvents: "none", zIndex: 0,
      }}/>
      {/* Gold accent */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 180, height: 180,
        background: "radial-gradient(circle, rgba(232,160,32,0.38) 0%, transparent 70%)",
        filter: "blur(32px)",
        pointerEvents: "none", zIndex: 0,
      }}/>
      {/* Atmosphere glow ring */}
      <div style={{
        position: "absolute", inset: -10, borderRadius: "50%",
        boxShadow: "0 0 60px rgba(100,160,255,0.35), 0 0 120px rgba(200,32,42,0.25)",
        pointerEvents: "none", zIndex: 2,
      }}/>

      {/* Globe — clipped to circle, tilted 25° clockwise */}
      <div style={{ position: "relative", zIndex: 1, borderRadius: "50%", overflow: "hidden", width: SIZE, height: SIZE, transform: "rotate(25deg)" }}>
        <Suspense fallback={<div style={{ width: SIZE, height: SIZE, borderRadius: "50%", background: "#0d3d6e" }}/>}>
          <Globe
            ref={globeRef}
            width={SIZE}
            height={SIZE}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="rgba(100,160,255,0.6)"
            atmosphereAltitude={0.18}
            pointsData={GLOBE_MARKERS}
            pointLat="lat"
            pointLng="lng"
            pointLabel="label"
            pointColor={() => "#c8202a"}
            pointAltitude={0.01}
            pointRadius={0.45}
            pointsMerge={false}
          />
        </Suspense>
      </div>

      {/* Orbiting dots */}
      {[
        { angle: 48,  r: SIZE/2+22, size: 5, color: "#e8a020" },
        { angle: 148, r: SIZE/2+18, size: 4, color: "#c8202a" },
        { angle: 248, r: SIZE/2+20, size: 4, color: "#60a5fa" },
        { angle: 338, r: SIZE/2+16, size: 3, color: "#e8a020" },
      ].map((d, i) => {
        const rad = d.angle * Math.PI / 180;
        return (
          <div key={i} style={{
            position: "absolute",
            left: SIZE/2 + Math.cos(rad)*d.r - d.size/2,
            top:  SIZE/2 + Math.sin(rad)*d.r - d.size/2,
            width: d.size, height: d.size, borderRadius: "50%",
            background: d.color, boxShadow: `0 0 ${d.size*4}px ${d.color}`,
            animation: `float ${3.2 + i*0.55}s ease-in-out ${i*0.7}s infinite`,
            pointerEvents: "none", zIndex: 3,
          }}/>
        );
      })}
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

      {/* ── Floating books — parallax scroll decoration ── */}
      {[
        // [left%, top%, size, color, speed, rot, mouseX, mouseY, delay]
        { left: "6%",   top: "18%", size: 52, color: "#e8a020", speed: 0.22, rot: -18, mx: 0.04, my: 0.03, delay: "0s"   },
        { left: "14%",  top: "62%", size: 38, color: "#c8202a", speed: 0.40, rot:  12, mx: 0.06, my: 0.05, delay: "0.3s" },
        { left: "82%",  top: "70%", size: 44, color: "#e8a020", speed: 0.18, rot: -8,  mx: 0.03, my: 0.04, delay: "0.5s" },
        { left: "90%",  top: "25%", size: 34, color: "#c8202a", speed: 0.35, rot:  22, mx: 0.05, my: 0.02, delay: "0.8s" },
        { left: "48%",  top: "82%", size: 42, color: "#f5f0e8", speed: 0.28, rot: -5,  mx: 0.02, my: 0.06, delay: "0.6s" },
        { left: "55%",  top: "8%",  size: 30, color: "#e8a020", speed: 0.50, rot:  15, mx: 0.07, my: 0.03, delay: "1s"   },
      ].map((b, i) => {
        const tx = mouse.x * b.mx * 120;
        const ty = mouse.y * b.my * 120 - scrollY * b.speed;
        return (
          <div key={i} style={{
            position: "absolute", left: b.left, top: b.top,
            transform: `translate(${tx}px, ${ty}px) rotate(${b.rot}deg)`,
            transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            pointerEvents: "none", zIndex: 1,
            animation: `float ${4 + i * 0.6}s ease-in-out ${b.delay} infinite`,
            opacity: 0.75,
            filter: `drop-shadow(0 6px 18px ${b.color}55)`,
          }}>
            <svg width={b.size} height={b.size * 0.85} viewBox="0 0 60 52" fill="none">
              {/* Book spine */}
              <rect x="28" y="4" width="4" height="44" rx="1" fill={b.color} opacity="0.9"/>
              {/* Left cover */}
              <path d="M30 6 L4 10 L4 46 L30 44 Z" fill={b.color} opacity="0.6"/>
              {/* Right cover */}
              <path d="M30 6 L56 10 L56 46 L30 44 Z" fill={b.color} opacity="0.85"/>
              {/* Left pages lines */}
              <line x1="10" y1="18" x2="27" y2="17" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="10" y1="24" x2="27" y2="23" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="10" y1="30" x2="27" y2="29" stroke="rgba(255,255,255,0.2)"  strokeWidth="1"   strokeLinecap="round"/>
              {/* Right pages lines */}
              <line x1="33" y1="17" x2="50" y2="18" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="33" y1="23" x2="50" y2="24" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="33" y1="29" x2="50" y2="30" stroke="rgba(255,255,255,0.2)"  strokeWidth="1"   strokeLinecap="round"/>
              {/* Glow rim */}
              <path d="M30 6 L4 10 L4 46 L30 44 L56 46 L56 10 Z" stroke={b.color} strokeWidth="0.8" fill="none" opacity="0.5"/>
            </svg>
          </div>
        );
      })}

      {/* ── Hero row ── */}
      <div className="hero-row" style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 0, padding: "100px 60px 60px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>

        {/* LEFT — text */}
        <div className="hero-text" style={{ flex: "0 0 auto", maxWidth: 460, position: "relative", zIndex: 5 }}>
          <div className={`reveal ${inView ? "visible" : ""}`}>
            <span className="eyebrow">StudyMapper × ETEST — AI Study Abroad</span>
          </div>
          <h1 className={`font-display reveal ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", marginTop: 20, color: "var(--cream)" }}>
            Find the{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic", textShadow: "0 0 40px rgba(232,160,32,0.5)" }}>right</span>
            <br />school for your child.
          </h1>
          <p className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ marginTop: 24, fontSize: "1rem", lineHeight: 1.8, color: "var(--cream-dim)" }}>
            AI that personalizes your student's profile —<br />
            not generic advice like GPT.
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginTop: 36 }}>
            {/* Buttons — stacked, equal width */}
            <div className={`hero-cta reveal ${inView ? "visible" : ""} delay-3`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <button className="btn-primary" style={{ width: "100%" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Get Started →</button>
              <button className="btn-ghost"   style={{ width: "100%" }} onClick={() => document.getElementById("engine")?.scrollIntoView({ behavior: "smooth" })}>View Demo</button>
            </div>

            {/* QR code — gap same as between buttons (14px) */}
            <div className={`reveal ${inView ? "visible" : ""} delay-4`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700 }}>Scan Me</span>
              <img
                src="/qr.png"
                alt="QR – mindee.rotexai.com"
                style={{ width: 110, height: 110, borderRadius: 10, display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Earth Globe */}
        <div className="globe-wrapper" style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-52%)", zIndex: 3 }}>
          <LaptopMockup scrollY={scrollY} mouse={mouse} inView={inView} />
        </div>
      </div>

      {/* ── Full-bleed cream stats bar ── */}
      <div className={`reveal ${inView ? "visible" : ""} delay-5`} style={{ width: "100%", background: "var(--cream)", position: "relative", zIndex: 6 }}>
        <div style={{ background: "var(--red)", overflow: "hidden", padding: "10px 0" }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ticker 28s linear infinite" }}>
            {[1,2].map(k => (
              <span key={k} style={{ display: "inline-block", paddingRight: 80, fontSize: "0.8rem", fontWeight: 600, color: "#ffffff", letterSpacing: "0.03em" }}>
                ETEST students have been admitted to top universities including MIT · Caltech · UC Berkeley · UCLA · Cornell · NYU · Boston University · King's College London · University of Edinburgh · RMIT · Monash ·&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          {[
            { n: "5,000+", label: "UNIVERSITIES",  desc: "Updated every admission season" },
            { n: "30+",    label: "COUNTRIES",     desc: "Top study destinations worldwide" },
            { n: "98%",    label: "AI ACCURACY",   desc: "Matched to real student profiles" },
          ].map(({ n, label, desc }, i) => (
            <div key={label} style={{ padding: "44px 40px", borderLeft: i > 0 ? "1px solid rgba(200,32,42,0.15)" : "none", textAlign: "center" }}>
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

  const compare = [
    { label: "Profile personalization" },
    { label: "Understands family budget" },
    { label: "Data from 5,000+ universities" },
    { label: "Real acceptance & scholarship rates" },
    { label: "Visa & roadmap advisory" },
    { label: "Vietnamese student profile analysis" },
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
            <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>02 — The Problem</span>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800,
              color: "var(--cream)", letterSpacing: "-0.02em", lineHeight: 1.1,
              marginBottom: 16,
            }}>
              Why are families<br />
              <span style={{ color: "var(--red)" }}>struggling to choose?</span>
            </h2>
            <p style={{ color: "var(--cream-dim)", fontSize: "0.98rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              Thousands of schools. Zero personalized guidance. Until now.
            </p>
          </div>

          {/* 3 cards */}
          <div className="problem-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { title: "Information Overload",  desc: "10,000+ programs, 30+ countries — no tool to compare them objectively." },
              { title: "Generic AI Advice",     desc: "GPT ignores your child's GPA, budget, and visa odds. One size fits none." },
              { title: "Consulting Costs $3–5K",desc: "$3,000–$5,000 per application, no outcome guarantee, unaffordable for most." },
            ].map((p, i) => (
              <div
                key={p.title}
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
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--cream)", marginBottom: 14, lineHeight: 1.3 }}>{p.title}</div>

                {/* Single line desc */}
                <div style={{ fontSize: "0.85rem", color: "var(--cream-dim)", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ BLOCK 2 — So sánh ═══ */}
        <div className={`reveal ${inView ? "visible" : ""} delay-2`}
          className="comparison-block-2col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.55fr", gap: 56, alignItems: "center" }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 800,
              color: "var(--cream)", letterSpacing: "-0.02em", lineHeight: 1.15,
              textTransform: "uppercase", marginBottom: 20,
            }}>
              StudyMapper<br />
              <span style={{ color: "var(--gold)" }}>vs GPT</span>
            </h2>
            <p style={{ color: "var(--cream-dim)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 32, maxWidth: 320 }}>
              GPT gives everyone the same answer. StudyMapper uses your GPA, budget, and goals — 5,000+ university dataset included.
            </p>
            <button
              className="btn-primary"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", fontSize: "0.88rem" }}
            >
              Get Started Free <span style={{ fontSize: "1rem" }}>↗</span>
            </button>
          </div>

          {/* RIGHT — Comparison table card */}
          <div className={`reveal ${inView ? "visible" : ""} delay-3`} style={{ position: "relative", minWidth: 0 }}>
            <div style={{
              background: CARD_BG, borderRadius: 22,
              border: `1px solid ${CARD_BORDER}`,
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
            }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", background: "rgba(255,255,255,0.04)", borderBottom: `1px solid rgba(245,240,232,0.08)` }}>
                <div style={{ padding: "14px 20px", fontSize: "0.7rem", fontWeight: 700, color: "var(--cream-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>FEATURE</div>
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
                  <span style={{ color: "var(--red)", fontWeight: 700 }}>StudyMapper × ETEST</span> — 5,000+ university database, real acceptance rates, personalized in seconds.
                </p>
              </div>
            </div>

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
    { label: "Full Name", placeholder: "John Smith", type: "text", span: 1 },
    { label: "Current Grade", type: "select", options: ["Grade 10", "Grade 11", "Grade 12", "Graduated"], span: 1 },
    { label: "GPA / Average Score", placeholder: "8.5 / 10", type: "text", span: 1 },
    { label: "IELTS / TOEFL Score", placeholder: "e.g. IELTS 6.5 or TOEFL 85", type: "text", span: 1 },
    { label: "Desired Major", type: "select", options: ["Computer Science", "Business & Finance", "Engineering", "Medicine & Health", "Arts & Design", "Law", "Education", "Social Sciences"], span: 1 },
    { label: "Target Country", type: "select", options: ["USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Australia 🇦🇺", "Singapore 🇸🇬", "Japan 🇯🇵", "Netherlands 🇳🇱", "Germany 🇩🇪"], span: 1 },
    { label: "Budget / Year (USD)", type: "select", options: ["< $15,000", "$15,000 – $25,000", "$25,000 – $40,000", "$40,000+"], span: 1 },
    { label: "Scholarship Need", type: "select", options: ["No scholarship needed", "Partial scholarship needed (<50%)", "Large scholarship needed (50–80%)", "Need full scholarship"], span: 1 },
    { label: "Intended Enrollment", type: "select", options: ["2025", "2026", "2027", "Not yet decided"], span: 1 },
    { label: "Achievements / Extracurriculars", placeholder: "e.g. National Math Award, Robotics Club, Volunteer work...", type: "text", span: 1 },
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
            Tell the AI about your child.
          </h2>
          <p style={{ color: "var(--cream-dim)", marginTop: 12, fontSize: "1rem" }}>
            More detail — more accurate matching results.
          </p>
        </div>

        {/* Form grid */}
        <div className="profile-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {fields.map((f, i) => (
            <div key={f.label} className={`reveal ${inView ? "visible" : ""} delay-${Math.min(i + 1, 5)}`} style={{ gridColumn: f.span === 2 ? "span 2" : "span 1" }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.78rem", letterSpacing: "0.08em", color: "var(--cream-dim)", textTransform: "uppercase" }}>{f.label}</label>
              {f.type === "select" ? (
                <select className="field-input">
                  <option value="">Select...</option>
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
            Analyze with AI →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Slide 4 — AI Matching Engine ───────────────────────────────────────────
function Slide3() {
  const [ref, inView] = useInView(0.1);
  const steps = [
    { num: "01.", title: "Collect Profile", desc: "Input GPA, IELTS, major, budget, and target country — takes under 3 minutes." },
    { num: "02.", title: "AI Matching", desc: "Profile matched against 5,000+ universities using real admissions data, updated each season." },
    { num: "03.", title: "Score & Rank", desc: "Acceptance probability predicted from 10,000+ real student outcomes." },
    { num: "04.", title: "Your Roadmap", desc: "Top schools ranked by fit — with scholarships, visa odds, and a clear action plan." },
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

      <div className="section-inner" style={{ position: "relative", zIndex: 1, maxWidth: 1060, width: "100%", padding: "100px 40px", margin: "0 auto" }}>
        <div className="engine-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          {/* LEFT */}
          <div style={{ paddingTop: 8 }}>
            <span className={`eyebrow reveal-left ${inView ? "visible" : ""}`}>04 — Engine</span>
            <div className={`section-divider reveal-left ${inView ? "visible" : ""} delay-1`} style={{ margin: "14px 0 24px" }} />
            <h2 className={`font-display reveal-left ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--cream)" }}>
              From profile<br />to the right school,{" "}
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>step by step.</span>
            </h2>
            <p className={`reveal-left ${inView ? "visible" : ""} delay-2`} style={{ color: "var(--cream-dim)", marginTop: 20, fontSize: "0.95rem", lineHeight: 1.75 }}>
              Fully automated process —<br />results in seconds.
            </p>

            {/* Mini stat */}
            <div className={`reveal-left ${inView ? "visible" : ""} delay-3`} style={{ marginTop: 32, display: "flex", gap: 24 }}>
              {[["10K+","student profiles"],["5K+","universities"],["3s","results"]].map(([n,l]) => (
                <div key={n}>
                  <div className="font-mono-dm" style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--gold)" }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--cream-dim)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — steps with vertical timeline */}
          <div style={{ position: "relative" }}>
            {/* Gradient vertical line */}
            <div style={{
              position: "absolute",
              left: 23, top: 48, bottom: 24,
              width: 2, borderRadius: 2,
              background: "linear-gradient(180deg, rgba(245,240,232,0.12) 0%, rgba(200,32,42,0.5) 55%, var(--red) 100%)",
              zIndex: 0,
            }}/>

            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const progress = i / (steps.length - 1); // 0 → 1
              const circleColor = isLast
                ? "linear-gradient(135deg, #c8202a 0%, #e83040 100%)"
                : "#ffffff";
              const textColor = isLast ? "#fff" : "#0c0f13";
              const glow = isLast
                ? "0 0 0 4px rgba(200,32,42,0.25), 0 0 24px rgba(200,32,42,0.5)"
                : "0 4px 16px rgba(0,0,0,0.35)";

              return (
                <div key={step.num}
                  className={`reveal ${inView ? "visible" : ""} delay-${i + 1}`}
                  style={{
                    position: "relative", zIndex: 1,
                    display: "flex", alignItems: "flex-start", gap: 28,
                    paddingBottom: isLast ? 0 : 60,
                    transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                  }}
                >
                  {/* Circle */}
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                    background: circleColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 800, fontSize: "1rem", color: textColor,
                    boxShadow: glow,
                    position: "relative", zIndex: 2,
                  }}>{i + 1}</div>

                  {/* Content */}
                  <div style={{ paddingTop: 8 }}>
                    <div style={{
                      fontSize: "0.68rem", fontWeight: 700,
                      color: "var(--red)", letterSpacing: "0.2em",
                      textTransform: "uppercase", marginBottom: 10,
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}>STEP {String(i + 1).padStart(2, "0")}</div>
                    <div style={{
                      fontWeight: 700, fontSize: "1.15rem",
                      color: "var(--cream)", marginBottom: 12, lineHeight: 1.3,
                    }}>{step.title}</div>
                    <div style={{
                      fontSize: "0.875rem", color: "var(--cream-dim)", lineHeight: 1.78, maxWidth: 380,
                    }}>{step.desc}</div>
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
    { name: "University of Toronto", country: "Canada 🇨🇦", score: 94, rank: "#1 Canada", field: "Computer Science", tuition: "$28,000", scholarship: "Merit $12,000/yr", badge: "Best Match" },
    { name: "University of Melbourne", country: "Australia 🇦🇺", score: 88, rank: "#1 Australia", field: "Business", tuition: "$24,500", scholarship: "Merit award $8,000", badge: "Budget Fit" },
    { name: "NUS Singapore", country: "Singapore 🇸🇬", score: 82, rank: "#8 Asia", field: "Engineering", tuition: "$19,800", scholarship: "ASEAN Scholarship", badge: "Easy Visa" },
    { name: "TU Delft", country: "Netherlands 🇳🇱", score: 79, rank: "Top 50 World", field: "Engineering", tuition: "$12,000", scholarship: "Holland Scholarship", badge: "Low Cost" },
    { name: "UBC Vancouver", country: "Canada 🇨🇦", score: 76, rank: "#3 Canada", field: "Computer Science", tuition: "$22,000", scholarship: "International $8,000/yr", badge: "Safe Pick" },
  ];


  return (
    <section id="results" ref={ref} style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "var(--ink)" }}>
      <div className="glow-red" style={{ width: 500, height: 500, top: "30%", right: "0%" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, width: "100%", padding: "100px 32px 60px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className={`eyebrow reveal ${inView ? "visible" : ""}`}>05 — Results</span>
            <div className={`section-divider reveal ${inView ? "visible" : ""} delay-1`} style={{ margin: "12px 0 16px" }} />
            <h2 className={`font-display reveal ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 600, color: "var(--cream)", letterSpacing: "-0.02em" }}>
              Top 5 best-match universities<br />for your profile.
            </h2>
          </div>
          <div className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ display: "flex", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 8, padding: "8px 16px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--cream-dim)" }}>Filter by</span>
            {["Scholarships", "Budget", "Visa"].map(t => (
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
                <div className="font-mono-dm" style={{ color: "var(--cream)", fontSize: "1rem" }}>{u.tuition}<span style={{ color: "var(--cream-dim)", fontSize: "0.72rem" }}>/yr</span></div>
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
      name: "Nguyen Minh Anh",
      info: "Grade 12 · Hanoi · GPA 8.7",
      specialty: "Computer Science",
      school: "University of Toronto 🇨🇦",
      scholarship: "Merit Scholarship $12,000/yr",
      quote: "Just 3 minutes filling in my profile, and the AI instantly gave me 5 schools with specific scholarships — something agencies couldn't do in 3 months.",
      photoGrad: "linear-gradient(170deg, #1a0508 0%, #5a1018 45%, #c8202a 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
    {
      initials: "HP",
      name: "Tran Hoang Phuc",
      info: "Grade 12 · Ho Chi Minh City · GPA 9.1",
      specialty: "Engineering",
      school: "NUS Singapore 🇸🇬",
      scholarship: "ASEAN Scholarship — Full tuition",
      quote: "The AI recommended NUS with a 74% acceptance probability based on 10,000 real profiles — and I actually got in.",
      photoGrad: "linear-gradient(170deg, #0c0a02 0%, #3d2e04 45%, #e8a020 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
    {
      initials: "TH",
      name: "Le Thi Thanh Ha",
      info: "Grade 11 · Da Nang · GPA 8.3",
      specialty: "Business",
      school: "Univ. of Melbourne 🇦🇺",
      scholarship: "International Merit Award $8,000",
      quote: "Our family's budget was tight. StudyMapper found Melbourne with a scholarship that fit perfectly — something my parents never thought possible.",
      photoGrad: "linear-gradient(170deg, #030e06 0%, #0b2e12 45%, #22c55e 100%)",
      pillColor: "#c5f542",
      pillText: "#1a2800",
    },
    {
      initials: "QB",
      name: "Pham Quoc Bao",
      info: "Grade 12 · Can Tho · GPA 8.9",
      specialty: "Law",
      school: "King's College London 🇬🇧",
      scholarship: "International Award £6,000",
      quote: "No one could advise me on Law in the UK within budget. StudyMapper found KCL — my exact dream school.",
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
          <span className="eyebrow">06 — Real Stories</span>
          <div className="section-divider" style={{ margin: "12px auto 20px" }} />
          <h2 className="font-display" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "var(--cream)", letterSpacing: "-0.02em" }}>
            Students who found<br />
            <span style={{ color: "var(--gold)" }}>their perfect match.</span>
          </h2>
          <p style={{ color: "var(--cream-dim)", marginTop: 16, fontSize: "0.95rem" }}>
            2024–2025 admits — real profiles, real schools, real scholarships.
          </p>
        </div>

        {/* Doctor-style cards */}
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "start" }}>
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
    { role: "ai", text: "Hello! I'm StudyMapper's AI study abroad advisor 👋\nWhat would you like to know about choosing a school?" },
    { role: "user", text: "My child is in Grade 12, GPA 8.7, wants to study Computer Science in Canada, budget $25k/year" },
    { role: "ai", text: "Based on your profile, here are the 3 best-fit schools:\n\n🥇 University of Toronto — Match 94% · Acceptance ~72% · Merit Scholarship $12,000\n🥈 UBC Vancouver — Match 89% · Safer option · Scholarship $8,000\n🥉 McMaster — Match 83% · Easiest to get in · Scholarship $5,000\n\nWhich school would you like me to analyze in detail?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const isFirstRender = useRef(true);

  const quickPrompts = [
    "What IELTS score does UofT require?",
    "Compare tuition: Canada vs Australia",
    "Which scholarships fit a GPA of 8.5?",
    "Canada visa approval rate for students?",
  ];

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m,
      { role: "user", text: input },
      { role: "ai", text: "Analyzing data from 5,000+ universities... Results coming right up 🔍" }
    ]);
    setInput("");
  };

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
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
            Ask AI anything.
          </h2>
          <p className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ color: "var(--cream-dim)", marginTop: 12, fontSize: "0.95rem" }}>
            24/7 advisory — context-aware, remembers your profile, no generic answers.
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
                <span style={{ fontSize: "0.72rem", color: "var(--cream-dim)" }}>Online — responds instantly · Remembering your profile</span>
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
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about schools, scholarships, visa, IELTS..." className="field-input" style={{ flex: 1 }} />
            <button onClick={send} className="btn-primary" style={{ padding: "12px 24px", flexShrink: 0 }}>Send →</button>
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
    "99% visa success rate — highest in Vietnam",
    "5,000+ partner universities across 6 countries",
    "AI match in seconds — not weeks of generic advice",
    "Scholarship strategy + 100% admission guarantee",
    "End-to-end: application, visa, settlement support",
    "Personalized IELTS / TOEFL / SAT roadmap included",
  ];

  return (
    <>
      <section id="contact" ref={ref} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--ink)" }}>
        <div className="glow-red" style={{ width: 500, height: 500, top: "10%", right: "30%", opacity: 0.25 }} />
        <div className="glow-gold" style={{ width: 300, height: 300, bottom: "5%", left: "5%", opacity: 0.3 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, width: "100%", padding: "100px 40px", margin: "0 auto" }}>
          <div className="contact-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            {/* LEFT */}
            <div>
              <span className={`eyebrow reveal-left ${inView ? "visible" : ""}`}>08 — Contact</span>
              <div className={`section-divider reveal-left ${inView ? "visible" : ""} delay-1`} style={{ margin: "14px 0 24px" }} />
              <h2 className={`font-display reveal-left ${inView ? "visible" : ""} delay-1`} style={{ fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--cream)", marginBottom: 32 }}>
                Why choose<br />
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
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>Register for Free Consultation</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--cream-dim)", marginBottom: 32, lineHeight: 1.6 }}>An expert will contact you within 24 hours.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Full Name</label>
                    <input className="field-input" placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Phone Number</label>
                    <input className="field-input" placeholder="(+84) 0123 456 789" />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Email</label>
                  <input className="field-input" type="email" placeholder="john@email.com" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Country</label>
                    <select className="field-input">
                      <option>USA 🇺🇸</option>
                      <option>UK 🇬🇧</option>
                      <option>Canada 🇨🇦</option>
                      <option>Australia 🇦🇺</option>
                      <option>Singapore 🇸🇬</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Study Level</label>
                    <select className="field-input">
                      <option>Undergraduate</option>
                      <option>Master's</option>
                      <option>High School</option>
                      <option>Short Course</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "var(--cream-dim)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Notes</label>
                  <textarea className="field-input" placeholder="Share more about your goals..." rows={3} style={{ resize: "none" }} />
                </div>

                <button className="btn-primary" style={{ width: "100%", marginTop: 8, fontSize: "1rem", padding: "15px" }}>
                  Book a Consultation →
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
            {["About", "Features", "Results", "Consult"].map(l => (
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
