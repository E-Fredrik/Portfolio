import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "../i18n/I18nContext";

gsap.registerPlugin(ScrollTrigger);

/** Static data that doesn't need translation (tech names, code snippets, sizing) */
const STACK_STATIC = [
  { name: "NextJS", snippet: "generateStaticParams()", size: "medium" },
  { name: "Laravel", snippet: "php artisan make:model", size: "medium" },
  { name: "Python", snippet: "import pygame", size: "medium" },
  { name: "Swift / SwiftUI", snippet: "@Observable final class", size: "small" },
  { name: "Kotlin / Jetpack Compose", snippet: "@Composable fun", size: "small" },
  { name: "PostgreSQL/MySQL", snippet: "CREATE INDEX CONCURRENTLY", size: "medium" },
  { name: "HTML/CSS/JS", snippet: "document.querySelector()", size: "small" },
  { name: "Git/GitHub", snippet: "git push origin main", size: "small" },
  { name: "Flutter", snippet: "flutter run --release", size: "medium" },
];

/** Translation shape for a single stack item from the JSON dictionary */
interface StackTranslation {
  role: string;
  detail: string;
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, tArray } = useTranslation();

  const translatedItems = tArray<StackTranslation>("stack.items");
  const stack = STACK_STATIC.map((staticData, i) => ({
    ...staticData,
    role: translatedItems[i]?.role ?? "",
    detail: translatedItems[i]?.detail ?? "",
  }));

  // Parse heading with \n support
  const headingLines = t("stack.heading").split("\n");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal — cards fade/slide in as you scroll into the section
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
            {t("stack.sectionLabel")}
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
          <p
            className="text-[#A1A1A6] mt-6"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            {t("stack.subheading")}
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
            const staticOpacity = 1 - i * 0.06;

            return (
              <div
                key={item.name}
                className={`stack-card ${colSpan} p-6 pb-16 lg:p-8 lg:pb-8 flex flex-col justify-between relative`}
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
                </div>

                {/* Bottom content */}
                <div className="relative z-[1]">
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

                {/* Corner index — stays behind text on mobile */}
                <span
                  className="absolute bottom-3 right-4 text-[#1a1a1a] text-[36px] md:text-[48px]"
                  style={{
                    fontWeight: 800,
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1,
                    zIndex: 0,
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
