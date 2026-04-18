import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterERef = useRef<HTMLSpanElement>(null);
  const letterFRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({
            onComplete,
          });

          exitTl
            .to([letterERef.current, letterFRef.current], {
              yPercent: -120,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.in",
            })
            .to(
              containerRef.current,
              {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
              },
              "-=0.2"
            );
        },
      });

      // Initial state
      gsap.set([letterERef.current, letterFRef.current], {
        yPercent: 120,
        opacity: 0,
      });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

      // Letters slide up with stagger
      tl.to(letterERef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      })
        .to(
          letterFRef.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.5"
        )
        // Subtle pulse
        .to([letterERef.current, letterFRef.current], {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
        })
        .to([letterERef.current, letterFRef.current], {
          scale: 1,
          duration: 0.4,
          ease: "power2.in",
        })
        // Progress bar
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: function () {
              const progress = Math.round(this.progress() * 100);
              if (percentRef.current) {
                percentRef.current.textContent = `${progress}`;
              }
              setTick((t) => t + 1);
            },
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      {/* EF Letters */}
      <div className="flex items-center gap-1 overflow-hidden">
        <span
          ref={letterERef}
          style={{
            fontSize: "clamp(80px, 15vw, 160px)",
            fontWeight: 800,
            color: "#A70947",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            display: "inline-block",
          }}
        >
          E
        </span>
        <span
          ref={letterFRef}
          style={{
            fontSize: "clamp(80px, 15vw, 160px)",
            fontWeight: 800,
            color: "#A70947",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            display: "inline-block",
          }}
        >
          F
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-[200px] relative">
        <div className="w-full h-px" style={{ background: "#1a1a1a" }}>
          <div
            ref={progressRef}
            className="h-px"
            style={{ background: "#A70947", width: "100%" }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span
            className="text-[#A1A1A6]"
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Loading
          </span>
          <span
            ref={percentRef}
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: "#A1A1A6",
            }}
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
