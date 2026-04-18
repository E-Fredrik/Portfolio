import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CursorReveal } from "./CursorReveal";

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGE =
  "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBkYXJrJTIwd29ya3NwYWNlJTIwc2V0dXB8ZW58MXx8fHwxNzc2NDc4MDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const REVEAL_IMAGE =
  "https://images.unsplash.com/photo-1637775297509-19767f6fc225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGRhcmslMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc3NjQ4MjQ1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasBoxRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%",
        pin: true,
        pinSpacing: true,
      });

      // Text lines stagger in
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });

      // Canvas box draws in
      gsap.from(canvasBoxRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1,
        ease: "power3.inOut",
        delay: 0.8,
      });

      // Meta info fades
      gsap.from(metaRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 1.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Available indicator — sole use of accent */}
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div
          className="w-[6px] h-[6px] rounded-full"
          style={{ background: "#A70947" }}
        />
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#A1A1A6",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Available for work
        </span>
      </div>

      <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-stretch">
        {/* LEFT — flush-left typography lockup */}
        <div
          ref={textRef}
          className="flex flex-col justify-end px-8 lg:px-16 pb-16 lg:pb-24"
        >
          <div className="overflow-hidden">
            <p
              className="hero-line text-[#A1A1A6]"
              style={{
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "Inter, sans-serif",
                marginBottom: "24px",
              }}
            >
              Senior Full Stack Developer — 2026
            </p>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line text-white"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Engineering
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line text-white"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontFamily: "Inter, sans-serif",
              }}
            >
              at Scale.
            </h1>
          </div>
          <div className="overflow-hidden mt-2">
            <h1
              className="hero-line"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontFamily: "Inter, sans-serif",
                color: "#A1A1A6",
              }}
            >
              Precision
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontFamily: "Inter, sans-serif",
                color: "#A1A1A6",
              }}
            >
              in Motion.
            </h1>
          </div>

          <div ref={metaRef} className="mt-12 flex gap-12">
            <div>
              <p
                className="text-[#A1A1A6]"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Primary Stack
              </p>
              <p
                className="text-white mt-2"
                style={{
                  fontSize: "12px",
                  fontFamily: "monospace",
                  lineHeight: 1.8,
                }}
              >
                TypeScript / Next.js
                <br />
                Prisma / PostgreSQL
                <br />
                Swift / SwiftUI
              </p>
            </div>
            <div>
              <p
                className="text-[#A1A1A6]"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Scroll to Explore
              </p>
              <div className="mt-3">
                <div
                  className="w-px h-10"
                  style={{ background: "#333333" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Canvas bounding box */}
        <div className="hidden lg:flex items-center justify-center p-16">
          <div
            ref={canvasBoxRef}
            className="w-full h-[70vh] relative overflow-hidden"
          >
            <CursorReveal baseImage={BASE_IMAGE} revealImage={REVEAL_IMAGE} />
          </div>
        </div>
      </div>
    </section>
  );
}