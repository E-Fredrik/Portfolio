import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stack = [
  {
    name: "Next.js 14",
    role: "Application Framework",
    detail: "App Router, RSC, ISR with on-demand revalidation. Edge middleware for geo-routing and A/B experimentation.",
    snippet: "generateStaticParams()",
    size: "large",
  },
  {
    name: "Prisma ORM",
    role: "Data Access Layer",
    detail: "Type-safe database client with declarative schema migrations. Relation queries compiled to optimized SQL joins.",
    snippet: "model Event { }",
    size: "medium",
  },
  {
    name: "PostgreSQL",
    role: "Relational Persistence",
    detail: "ACID-compliant storage with GIN indexes for JSONB queries. Connection pooling via PgBouncer at 200 concurrent.",
    snippet: "CREATE INDEX CONCURRENTLY",
    size: "medium",
  },
  {
    name: "Swift / SwiftUI",
    role: "Native iOS Engineering",
    detail: "Declarative UI with @Observable macro, structured concurrency via async/await, and Core Data + CloudKit sync.",
    snippet: "@Observable final class",
    size: "small",
  },
  {
    name: "Docker",
    role: "Containerization",
    detail: "Multi-stage builds targeting slim Alpine images. Compose orchestration for local dev parity with production.",
    snippet: "FROM node:20-alpine AS base",
    size: "small",
  },
  {
    name: "Redis",
    role: "In-Memory Cache / Queue",
    detail: "Session store with 50μs P99 reads. BullMQ job queues for async email dispatch and webhook retries.",
    snippet: "SUBSCRIBE channel:events",
    size: "small",
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=60%",
        pin: true,
        pinSpacing: true,
      });

      // Staggered reveal — cards start at different opacities
      gsap.from(".stack-card", {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full py-32 px-8 lg:px-16"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header — flush left */}
        <div className="mb-20 max-w-[480px]">
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            002 / The Stack
          </p>
          <h2
            className="text-white mt-4"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Runtime &<br />Infrastructure
          </h2>
          <p
            className="text-[#A1A1A6] mt-6"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            Every tool chosen for a reason. Zero bloat, maximum control across
            the entire request lifecycle.
          </p>
        </div>

        {/* Asymmetrical masonry bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {stack.map((item, i) => {
            const colSpan =
              item.size === "large"
                ? "lg:col-span-2 lg:row-span-2"
                : item.size === "medium"
                  ? "lg:col-span-2"
                  : "lg:col-span-1";

            // Simulate mid-animation staggered opacities
            const staticOpacity = 1 - i * 0.12;

            return (
              <div
                key={item.name}
                className={`stack-card ${colSpan} p-6 lg:p-8 flex flex-col justify-between relative`}
                style={{
                  border: "1px solid #333333",
                  marginTop: "-1px",
                  marginLeft: "-1px",
                  minHeight: item.size === "large" ? "360px" : "200px",
                  opacity: staticOpacity,
                }}
              >
                {/* Top row */}
                <div className="flex justify-between items-start">
                  <span
                    className="text-[#A1A1A6]"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.role}
                  </span>
                  <code
                    style={{
                      fontSize: "9px",
                      fontFamily: "monospace",
                      color: "#333333",
                    }}
                  >
                    {item.snippet}
                  </code>
                </div>

                {/* Bottom content */}
                <div>
                  <h3
                    className="text-white"
                    style={{
                      fontSize: item.size === "large" ? "28px" : "20px",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-[#A1A1A6] mt-3 max-w-[400px]"
                    style={{ fontSize: "12px", lineHeight: 1.7 }}
                  >
                    {item.detail}
                  </p>
                </div>

                {/* Corner index */}
                <span
                  className="absolute bottom-3 right-4 text-[#1a1a1a]"
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
