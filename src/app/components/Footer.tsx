import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow parallax reveal
      gsap.from(".footer-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="w-full px-8 lg:px-16 pt-48 pb-16"
      style={{
        background: "#000000",
        fontFamily: "Inter, sans-serif",
        borderTop: "1px solid #333333",
        minHeight: "80vh",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col justify-end h-full">
        <div className="footer-text">
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            005 / Contact
          </p>

          <h2
            className="text-white mt-8"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            Initiate.
          </h2>

          <a
            href="mailto:dev@fullstack.engineer"
            className="inline-block text-[#A1A1A6] mt-4 hover:text-white transition-colors"
            style={{
              fontSize: "clamp(16px, 2vw, 24px)",
              letterSpacing: "-0.02em",
              fontFamily: "monospace",
            }}
          >
            dev@fullstack.engineer
          </a>
        </div>

        <div className="flex gap-4 mt-16">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-[#A1A1A6] hover:text-white transition-colors"
            style={{
              border: "1px solid #333333",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-[#A1A1A6] hover:text-white transition-colors"
            style={{
              border: "1px solid #333333",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-32 flex justify-between items-end">
          <p
            className="text-[#1a1a1a]"
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              fontFamily: "monospace",
            }}
          >
            &copy; 2026 — Engineered with zero dependencies on luck.
          </p>
          <p
            className="text-[#1a1a1a]"
            style={{ fontSize: "9px", fontFamily: "monospace" }}
          >
            v2.0.0-rc.1
          </p>
        </div>
      </div>
    </footer>
  );
}
