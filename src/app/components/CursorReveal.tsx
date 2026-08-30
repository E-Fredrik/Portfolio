import { useRef, useCallback } from "react";

interface CursorRevealProps {
  baseImage: string;
  revealImage: string;
}

export function CursorReveal({ baseImage, revealImage }: CursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const clip = clipRef.current;
      if (!container || !clip) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = Math.min(rect.width, rect.height) * 0.28;

      clip.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
      clip.style.opacity = "1";
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const clip = clipRef.current;
    if (!clip) return;
    clip.style.opacity = "0";
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
    >
      {/* Base image (always visible) */}
      <img
        src={baseImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(100%) contrast(1.1)" }}
      />

      {/* Dark overlay on base */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />

      {/* Reveal image (follows cursor via clip-path) */}
      <div
        ref={clipRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{ clipPath: "circle(0px at 50% 50%)", opacity: 0 }}
      >
        <img
          src={revealImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.2) brightness(0.9)" }}
        />
        {/* Subtle border ring around reveal */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, transparent 85%, rgba(167,9,71,0.15) 100%)",
          }}
        />
      </div>

      {/* Corner labels */}
      <span
        className="absolute top-4 left-4 text-[#A1A1A6] z-10"
        style={{
          fontSize: "8px",
          fontFamily: "monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Hover to Reveal
      </span>
      <span
        className="absolute bottom-4 right-4 text-[#333333] z-10"
        style={{ fontSize: "8px", fontFamily: "monospace" }}
      >
        cursor: clip-path
      </span>
    </div>
  );
}
