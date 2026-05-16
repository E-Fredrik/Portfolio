"use client";
import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LoadingScreen  from "./components/LoadingScreen";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import StaggeredMenu from "./components/StaggeredMenu";
import type { StaggeredMenuItem } from "./components/StaggeredMenu";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NAV_OFFSET = 72;

function smoothScrollTo(href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  gsap.to(window, {
    duration: 1.2,
    ease: "power3.inOut",
    scrollTo: { y: target as Element, offsetY: NAV_OFFSET, autoKill: true },
  });
}

export default function App() {
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

    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [loaded]);

  const menuItems: StaggeredMenuItem[] = [
    {
      label: "Home",
      ariaLabel: "Go to top",
      link: "#",
      onClick: (e) => {
        e.preventDefault();
        gsap.to(window, { duration: 1.2, ease: "power3.inOut", scrollTo: { y: 0, autoKill: true } });
      },
    },
    {
      label: "Stack",
      ariaLabel: "View tech stack",
      link: "#stack",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#stack");
      },
    },
    {
      label: "Work",
      ariaLabel: "View projects",
      link: "#work",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#work");
      },
    },
    {
      label: "Experience",
      ariaLabel: "View experience",
      link: "#experience",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#experience");
      },
    },
    {
      label: "Contact",
      ariaLabel: "Get in touch",
      link: "#contact",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#contact");
      },
    },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* StaggeredMenu Navigation */}
      <StaggeredMenu
        position="right"
        isFixed={true}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#1a1a1a", "#111111"]}
        accentColor="#A70947"
      />

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
