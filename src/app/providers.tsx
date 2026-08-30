"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { I18nProvider, useTranslation } from "./i18n/I18nContext";
import LoadingScreen from "./components/LoadingScreen";
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

function GlobalUI({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

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
  useEffect(() => {
    if (!loaded) return;
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
  }, [locale, loaded, pathname]);

  const isHome = pathname === "/";

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (isHome) {
      if (targetId === "top") {
        gsap.to(window, { duration: 1.2, ease: "power3.inOut", scrollTo: { y: 0, autoKill: false }, overwrite: true });
      } else {
        smoothScrollTo(`#${targetId}`);
      }
    } else {
      router.push(`/${targetId === "top" ? "" : `#${targetId}`}`);
    }
  };

  const menuItems: StaggeredMenuItem[] = [
    {
      label: t("nav.home"),
      ariaLabel: t("nav.homeAria"),
      link: "/",
      onClick: (e) => handleNavClick(e, "top"),
    },
    {
      label: t("nav.work"),
      ariaLabel: t("nav.workAria"),
      link: "/#work",
      onClick: (e) => handleNavClick(e, "work"),
    },
    {
      label: t("nav.projects") || "Projects",
      ariaLabel: t("nav.projectsAria") || "View all projects",
      link: "/projects",
      onClick: (e) => {
        e.preventDefault();
        router.push("/projects");
      },
    },
    {
      label: t("nav.experience"),
      ariaLabel: t("nav.experienceAria"),
      link: "/#experience",
      onClick: (e) => handleNavClick(e, "experience"),
    },
    {
      label: t("nav.stack"),
      ariaLabel: t("nav.stackAria"),
      link: "/#stack",
      onClick: (e) => handleNavClick(e, "stack"),
    },
    {
      label: t("nav.contact"),
      ariaLabel: t("nav.contactAria"),
      link: "/#contact",
      onClick: (e) => handleNavClick(e, "contact"),
    },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/E-Fredrik" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/e-fredrik" },
  ];

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
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
      {/* We unhide children once loaded to prevent flash of content, or we can just render them always.
          The loading screen itself covers the screen, so it's fine to render children. */}
      {children}
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <GlobalUI>{children}</GlobalUI>
    </I18nProvider>
  );
}
