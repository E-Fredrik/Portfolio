"use client";

import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      // Prevent scroll during loading
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    // Refresh all scroll triggers after loading screen exits
    ScrollTrigger.refresh();

    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaded]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Fixed minimal nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-6"
        style={{ background: "#000000" }}
      >
        <span
          className="text-white"
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontFamily: "Inter, sans-serif",
          }}
        >
          FS<span style={{ color: "#333333" }}>/</span>DEV
        </span>

        <div className="hidden md:flex gap-10">
          {[
            { label: "Stack", href: "#stack" },
            { label: "Work", href: "#work" },
            { label: "Experience", href: "#experience" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#A1A1A6] hover:text-white transition-colors"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <Hero />
      <div id="stack">
        <TechStack />
      </div>
      <div id="work">
        <Projects />
      </div>
      <div id="experience">
        <Timeline />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
