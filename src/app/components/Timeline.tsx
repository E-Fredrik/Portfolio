import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "../i18n/I18nContext";

gsap.registerPlugin(ScrollTrigger);

/** Static data that doesn't need translation */
const ROLE_PERIODS = [
  "June 2024 — Present",
  "May 2025 — May 2026",
  "October 2025 — April 2026",
  "May 2024 — May 2024",
];

/** Translation shape for a single timeline item from the JSON dictionary */
interface TimelineTranslation {
  title: string;
  org: string;
  detail: string;
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, tArray } = useTranslation();

  const translatedItems = tArray<TimelineTranslation>("timeline.items");
  const roles = ROLE_PERIODS.map((period, i) => ({
    period,
    title: translatedItems[i]?.title ?? "",
    org: translatedItems[i]?.org ?? "",
    detail: translatedItems[i]?.detail ?? "",
  }));

  // Parse heading with \n support
  const headingLines = t("timeline.heading").split("\n");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-node", {
        opacity: 0,
        x: -40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 px-8 lg:px-16"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header — flush left */}
        <div className="mb-24 max-w-[480px]">
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {t("timeline.sectionLabel")}
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
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative ml-4 lg:ml-8 pl-12 lg:pl-20">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "#333333" }}
          />

          {roles.map((role, i) => (
            <div
              key={i}
              className="timeline-node relative mb-20 last:mb-0"
            >
              {/* Horizontal branch */}
              <div
                className="absolute top-[10px] h-px"
                style={{
                  left: "-48px",
                  width: "48px",
                  background: "#333333",
                }}
              />
              {/* Node */}
              <div
                className="absolute top-[7px]"
                style={{
                  left: "-52px",
                  width: "7px",
                  height: "7px",
                  background: "#FFFFFF",
                }}
              />

              <div className="flex flex-col lg:flex-row lg:gap-16">
                {/* Left column: period & org */}
                <div className="lg:w-[200px] shrink-0">
                  <p
                    className="text-[#A1A1A6]"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      fontFamily: "monospace",
                    }}
                  >
                    {role.period}
                  </p>
                  <p
                    className="text-[#333333] mt-1"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {role.org}
                  </p>
                </div>

                {/* Right column: title & detail */}
                <div className="mt-3 lg:mt-0">
                  <h3
                    className="text-white"
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {role.title}
                  </h3>
                  <p
                    className="text-[#A1A1A6] mt-3 max-w-[520px]"
                    style={{ fontSize: "12px", lineHeight: 1.8 }}
                  >
                    {role.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
