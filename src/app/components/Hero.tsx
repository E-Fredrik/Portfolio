import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Particle definition for fluid wave simulation
type WaveParticle = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  age: number;
  maxAge: number;
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -9999, y: -9999, active: false });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const lastEmitRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<WaveParticle[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hud, setHud] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const img = new window.Image();
    img.src = '/assets/images/hero.jpg';
    img.onload = () => { imgRef.current = img; };
  }, []);

  const tick = useCallback(() => {
    const ease = 0.16;
    currentRef.current.x +=
      (targetRef.current.x - currentRef.current.x) * ease;
    currentRef.current.y +=
      (targetRef.current.y - currentRef.current.y) * ease;

    const x = currentRef.current.x;
    const y = currentRef.current.y;
    const hudEl = hudRef.current;
    const cursorEl = cursorRef.current;

    // --- Velocity & Particle Emission ---
    if (targetRef.current.active) {
      const dx = x - lastEmitRef.current.x;
      const dy = y - lastEmitRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Emit new particle if moved enough
      if (dist > 5) {
        // Velocity influences the radius heavily
        const vel = Math.min(dist, 100);
        const baseRadius = 150;
        const velocityRadius = vel * 2.5;

        particlesRef.current.push({
          x,
          y,
          radius: baseRadius * 0.2, // start small
          maxRadius: baseRadius + velocityRadius,
          age: 0,
          // If we're moving fast, the wave lasts a bit longer but spreads wider
          maxAge: 40 + Math.floor(vel * 0.2),
        });
        
        lastEmitRef.current.x = x;
        lastEmitRef.current.y = y;
      }
    }

    // --- Canvas Drawing ---
    if (canvasRef.current && imgRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Handle resize if needed
        const section = sectionRef.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          if (canvas.width !== rect.width || canvas.height !== rect.height) {
            canvas.width = rect.width;
            canvas.height = rect.height;
          }
        }

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Update and draw mask particles
        particlesRef.current.forEach((p) => {
          p.age += 1;
          // Ease-out expand radius
          const progress = p.age / p.maxAge;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          p.radius = p.radius + (p.maxRadius - p.radius) * 0.15;
          
          // Opacity fades out
          const opacity = Math.max(0, 1 - progress);

          // Draw a soft radial gradient for the blob
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          grad.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.8})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Filter dead particles
        particlesRef.current = particlesRef.current.filter((p) => p.age < p.maxAge);

        // Parallax offset for the image
        const cx = width / 2;
        const cy = height / 2;
        const px = ((x - cx) / cx) * -24;
        const py = ((y - cy) / cy) * -24;

        // Calculate object-cover dimensions
        const imgRatio = imgRef.current.width / imgRef.current.height;
        const canvasRatio = width / height;
        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawWidth = width;
          drawHeight = width / imgRatio;
        } else {
          drawHeight = height;
          drawWidth = height * imgRatio;
        }
        // Add padding for parallax
        drawWidth *= 1.1; 
        drawHeight *= 1.1;

        drawX = (width - drawWidth) / 2 + px;
        drawY = (height - drawHeight) / 2 + py;

        // Apply masking using composite operation
        ctx.globalCompositeOperation = "source-in";
        ctx.globalAlpha = 0.8; // Match original opacity:80 equivalent
        ctx.drawImage(imgRef.current, drawX, drawY, drawWidth, drawHeight);
        
        ctx.globalCompositeOperation = "source-over"; // reset
        ctx.globalAlpha = 1.0;
      }
    }

    if (hudEl) {
      hudEl.style.transform = `translate3d(${x + 24}px, ${y - 80}px, 0)`;
    }
    if (cursorEl) {
      cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!targetRef.current.active) {
      currentRef.current.x = x;
      currentRef.current.y = y;
      lastEmitRef.current.x = x;
      lastEmitRef.current.y = y;
    }
    targetRef.current = { x, y, active: true };
    setHud({ x: Math.round(x), y: Math.round(y), active: true });
  }, []);

  const onLeave = useCallback(() => {
    targetRef.current.active = false;
    setHud((h) => ({ ...h, active: false }));
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-frame", {
        opacity: 0,
        duration: 1.2,
        delay: 0.1,
      });
    }, sectionRef);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, [tick]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="h-screen w-full relative overflow-hidden cursor-none"
      style={{ background: "#000000" }}
    >
      {/* ========== COVER LAYER ========== */}
      {/* Etched geometric pattern (SVG, zero gradients) */}
      <svg
        className="absolute inset-0 w-full h-full hero-frame"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#111111"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="grid-fine"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-fine)" />
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Asymmetric diagonal accents */}
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="22%"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="78%"
          x2="100%"
          y2="80%"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
        <line
          x1="33%"
          y1="0"
          x2="33%"
          y2="100%"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
        <line
          x1="67%"
          y1="0"
          x2="67%"
          y2="100%"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
      </svg>


      {/* <div
        className="hero-frame absolute top-8 left-8 lg:top-10 lg:left-12 z-30 flex items-center gap-3"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div
          className="w-[6px] h-[6px]"
          style={{ background: "#A70947" }}
        />
        <span
          className="text-white"
          style={{
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Elifele F I J
        </span>
      </div>


      <a
        href="#contact"
        className="hero-frame absolute top-8 right-8 lg:top-10 lg:right-12 z-30 text-white"
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "Inter, sans-serif",
          border: "1px solid #FFFFFF",
          padding: "10px 18px",
        }}
      >
        Contact
      </a> */}

      {/* Top-right meta strip */}
      {/* <div
        className="hero-frame absolute top-10 right-44 z-30 hidden lg:flex items-center gap-3"
        style={{
          fontSize: "9px",
          fontFamily: "monospace",
          color: "#A1A1A6",
          letterSpacing: "0.15em",
        }}
      >
        <span style={{ color: "#333333" }}>STATUS</span>
        <span>AVAILABLE — Q3 2026</span>
      </div> */}

      {/* Bottom-right scroll cue */}
      <div
        className="hero-frame absolute bottom-10 right-12 z-30 hidden lg:flex flex-col items-end gap-2"
        style={{ fontFamily: "monospace" }}
      >
        <span
          style={{
            fontSize: "9px",
            color: "#A1A1A6",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div className="w-px h-12" style={{ background: "#333333" }} />
      </div>

      {/* Massive typographic lockup — middle-left, asymmetric */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-20">
        <div className="px-8 lg:px-12 w-full">
          <div className="overflow-hidden">
            <p
              className="hero-line"
              style={{
                fontSize: "11px",
                color: "#A1A1A6",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: "32px",
              }}
            >
              Full Stack Developer | Part-Time Coding Mentor ——— Portfolio / 2026
            </p>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line text-white"
              style={{
                fontSize: "clamp(56px, 11vw, 180px)",
                fontWeight: 700,
                lineHeight: 0.88,
                letterSpacing: "-0.055em",
                fontFamily: "Inter, sans-serif",
              }}
            >
              ELIFELE
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line text-white"
              style={{
                fontSize: "clamp(56px, 11vw, 180px)",
                fontWeight: 700,
                lineHeight: 0.88,
                letterSpacing: "-0.055em",
                fontFamily: "Inter, sans-serif",
                marginLeft: "8vw",
              }}
            >
              FREDRIK I.J
            </h1>
          </div>
          <div className="overflow-hidden mt-6">
            <h2
              className="hero-line"
              style={{
                fontSize: "clamp(20px, 2.6vw, 38px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#A1A1A6",
                fontFamily: "Inter, sans-serif",
              }}
            >
              ——— Universitas Ciputra '24 Informatics | Fullstack Developer ——— 
            </h2>
          </div>
        </div>
      </div>

      {/* ========== CORE LAYER (revealed through CANVAS mask) ========== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-40 pointer-events-none"
      />

      {/* ========== CURSOR + HUD ANNOTATIONS ========== */}
      {/* Cursor crosshair */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 z-50 pointer-events-none"
        style={{
          opacity: hud.active ? 1 : 0,
          transition: "opacity 200ms linear",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "1px",
            height: "28px",
            background: "#A70947",
            transform: "translate(-0.5px, -14px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "28px",
            height: "1px",
            background: "#A70947",
            transform: "translate(-14px, -0.5px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "6px",
            height: "6px",
            border: "1px solid #A70947",
            transform: "translate(-3px, -3px)",
          }}
        />
      </div>

      {/* HUD annotation following cursor */}
      <div
        ref={hudRef}
        className="absolute top-0 left-0 z-50 pointer-events-none"
        style={{
          opacity: hud.active ? 1 : 0,
          transition: "opacity 200ms linear",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.1em",
          minWidth: "240px",
        }}
      >
        <div
          style={{
            border: "1px solid #333333",
            background: "rgba(0,0,0,0.65)",
            padding: "8px 10px",
            color: "#A1A1A6",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <span style={{ color: "#333333" }}>MASK_REVEAL</span>
            <span style={{ color: "#A70947" }}>● ACTIVE</span>
          </div>
          <div
            className="mt-2 pt-2 flex items-center justify-between gap-4"
            style={{ borderTop: "1px solid #1a1a1a" }}
          >
            <span style={{ color: "#333333" }}>cursor.xy</span>
            <span style={{ color: "#FFFFFF" }}>
              {String(hud.x).padStart(4, "0")},{" "}
              {String(hud.y).padStart(4, "0")}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <span style={{ color: "#333333" }}>mask.translate</span>
            <span style={{ color: "#A1A1A6" }}>
              tx({String(hud.x).padStart(4, "0")}) ty(
              {String(hud.y).padStart(4, "0")})
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <span style={{ color: "#333333" }}>core.parallax</span>
            <span style={{ color: "#A1A1A6" }}>
              -0.05 · inverse(cursor.xy)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CoreCollage — vibrant hidden layer revealed under the mask.
   Built from raw code, schemas, wiring — all #A70947 accents.
   ============================================================ */
export function CoreCollage() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "#000000", color: "#A1A1A6" }}
    >
      {/* Scanline overlay (1px lines, not a gradient) */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern
            id="core-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#1f0510"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#core-grid)" />
      </svg>

      {/* Swift code snippet — top-left of core */}
      <pre
        className="absolute"
        style={{
          top: "8%",
          left: "6%",
          fontFamily: "monospace",
          fontSize: "12px",
          lineHeight: 1.6,
          color: "#A1A1A6",
          border: "1px solid #A70947",
          padding: "14px 18px",
          background: "#000000",
        }}
      >
{`struct VaultView: View {
  @State private var unlocked = false
  let code: AccessCode

  var body: some View {
    ZStack {
      Color.black.ignoresSafeArea()
      if unlocked {
        TimelineView(.animation) { ctx in
          Canvas { gc, size in
            gc.stroke(path, with: .color(`}
        <span style={{ color: "#A70947" }}>{`.accent`}</span>
{`))
          }
        }
      }
    }
    .task { unlocked = await code.verify() }
  }
}`}
      </pre>

      {/* Next.js server-component diagram — top-right */}
      <div
        className="absolute"
        style={{
          top: "10%",
          right: "5%",
          width: "320px",
          border: "1px solid #A70947",
          padding: "16px",
          fontFamily: "monospace",
          fontSize: "10px",
          color: "#A1A1A6",
          background: "#000000",
        }}
      >
        <div
          style={{
            color: "#A70947",
            letterSpacing: "0.2em",
            fontSize: "9px",
            marginBottom: "10px",
          }}
        >
          NEXT.JS 14 · APP ROUTER
        </div>
        <svg width="100%" height="120" viewBox="0 0 280 120">
          <rect
            x="2"
            y="2"
            width="80"
            height="28"
            fill="none"
            stroke="#A1A1A6"
            strokeWidth="1"
          />
          <text x="42" y="20" fill="#FFFFFF" fontSize="9" textAnchor="middle">
            edge
          </text>
          <rect
            x="100"
            y="2"
            width="80"
            height="28"
            fill="none"
            stroke="#A70947"
            strokeWidth="1"
          />
          <text x="140" y="20" fill="#A70947" fontSize="9" textAnchor="middle">
            RSC
          </text>
          <rect
            x="198"
            y="2"
            width="80"
            height="28"
            fill="none"
            stroke="#A1A1A6"
            strokeWidth="1"
          />
          <text x="238" y="20" fill="#FFFFFF" fontSize="9" textAnchor="middle">
            client
          </text>
          <line
            x1="82"
            y1="16"
            x2="100"
            y2="16"
            stroke="#A70947"
            strokeWidth="1"
          />
          <line
            x1="180"
            y1="16"
            x2="198"
            y2="16"
            stroke="#A70947"
            strokeWidth="1"
          />
          <line
            x1="140"
            y1="30"
            x2="140"
            y2="60"
            stroke="#A1A1A6"
            strokeWidth="1"
          />
          <rect
            x="60"
            y="60"
            width="160"
            height="28"
            fill="none"
            stroke="#A1A1A6"
            strokeWidth="1"
          />
          <text x="140" y="78" fill="#A1A1A6" fontSize="9" textAnchor="middle">
            prisma · postgres
          </text>
        </svg>
      </div>

      {/* Prisma schema — bottom-left */}
      <pre
        className="absolute"
        style={{
          bottom: "10%",
          left: "8%",
          fontFamily: "monospace",
          fontSize: "11px",
          lineHeight: 1.7,
          color: "#A1A1A6",
          border: "1px solid #A70947",
          padding: "14px 18px",
          background: "#000000",
        }}
      >
{`model User {
  id          String   @id @default(cuid())
  firstName   String
  lastName    String
  `}
        <span style={{ color: "#A70947" }}>{`accessCode  String   @unique`}</span>
{`
  role        Role     @default(MEMBER)
  createdAt   DateTime @default(now())
  events      Event[]
}`}
      </pre>

      {/* Architecture wiring diagram — bottom-right */}
      <div
        className="absolute"
        style={{
          bottom: "8%",
          right: "6%",
          width: "300px",
          border: "1px solid #A70947",
          padding: "14px",
          background: "#000000",
        }}
      >
        <div
          style={{
            color: "#A70947",
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            marginBottom: "10px",
          }}
        >
          SYSTEM TOPOLOGY
        </div>
        <svg width="100%" height="140" viewBox="0 0 280 140">
          <circle cx="40" cy="40" r="14" fill="none" stroke="#A70947" />
          <text x="40" y="44" fill="#A70947" fontSize="9" textAnchor="middle">
            CDN
          </text>
          <circle cx="140" cy="40" r="14" fill="none" stroke="#A1A1A6" />
          <text x="140" y="44" fill="#FFFFFF" fontSize="9" textAnchor="middle">
            API
          </text>
          <circle cx="240" cy="40" r="14" fill="none" stroke="#A1A1A6" />
          <text x="240" y="44" fill="#FFFFFF" fontSize="9" textAnchor="middle">
            DB
          </text>
          <circle cx="90" cy="110" r="14" fill="none" stroke="#A1A1A6" />
          <text x="90" y="114" fill="#FFFFFF" fontSize="9" textAnchor="middle">
            Q
          </text>
          <circle cx="190" cy="110" r="14" fill="none" stroke="#A70947" />
          <text x="190" y="114" fill="#A70947" fontSize="9" textAnchor="middle">
            WS
          </text>
          <line x1="54" y1="40" x2="126" y2="40" stroke="#A1A1A6" />
          <line x1="154" y1="40" x2="226" y2="40" stroke="#A70947" />
          <line x1="140" y1="54" x2="90" y2="96" stroke="#A1A1A6" />
          <line x1="140" y1="54" x2="190" y2="96" stroke="#A70947" />
          <line x1="240" y1="54" x2="190" y2="96" stroke="#A1A1A6" />
        </svg>
      </div>

      {/* Center accent typography */}
      <div
        className="absolute"
        style={{
          top: "44%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "0.3em",
          color: "#A70947",
          border: "1px solid #A70947",
          padding: "8px 14px",
        }}
      >
        ENGINE · CORE / 0x01
      </div>

      {/* Live status ticker — center-bottom */}
      <div
        className="absolute"
        style={{
          top: "58%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "monospace",
          fontSize: "10px",
          color: "#A1A1A6",
        }}
      >
        <span style={{ color: "#A70947" }}>▸</span> deploy.us-east-1 ::{" "}
        <span style={{ color: "#FFFFFF" }}>200 OK</span> ·{" "}
        <span style={{ color: "#A70947" }}>42ms</span>
      </div>
    </div>
  );
}
