"use client";
import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { I18nProvider, useTranslation } from "./i18n/I18nContext";
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

  // Ensure ScrollTrigger pin spacers are measured correctly before scrolling
  ScrollTrigger.refresh();

  gsap.to(window, {
    duration: 1.2,
    ease: "power3.inOut",
    scrollTo: { y: target as Element, offsetY: NAV_OFFSET, autoKill: false },
    overwrite: true,
  });
}

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const { t, locale } = useTranslation();

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

  // Refresh all ScrollTrigger instances when language changes
  // so pin spacers and measurements stay in sync with new content
  useEffect(() => {
    if (!loaded) return;
    // Wait two frames for React to commit + browser to reflow
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [locale, loaded]);

  const menuItems: StaggeredMenuItem[] = [
    {
      label: t("nav.home"),
      ariaLabel: t("nav.homeAria"),
      link: "#",
      onClick: (e) => {
        e.preventDefault();
        gsap.to(window, { duration: 1.2, ease: "power3.inOut", scrollTo: { y: 0, autoKill: false }, overwrite: true });
      },
    },
    {
      label: t("nav.work"),
      ariaLabel: t("nav.workAria"),
      link: "#work",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#work");
      },
    },
    {
      label: t("nav.experience"),
      ariaLabel: t("nav.experienceAria"),
      link: "#experience",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#experience");
      },
    },
    {
      label: t("nav.stack"),
      ariaLabel: t("nav.stackAria"),
      link: "#stack",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#stack");
      },
    },
    {
      label: t("nav.contact"),
      ariaLabel: t("nav.contactAria"),
      link: "#contact",
      onClick: (e) => {
        e.preventDefault();
        smoothScrollTo("#contact");
      },
    },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/E-Fredrik" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/e-fredrik" },
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
        socialsTitle={t("nav.socials")}
        menuLabel={t("nav.menu")}
        closeLabel={t("nav.close")}
      />

      <Hero />
      <div id="work">
        <Projects />
      </div>
      <div id="experience">
        <Timeline />
      </div>
      <div id="stack">
        <TechStack />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
