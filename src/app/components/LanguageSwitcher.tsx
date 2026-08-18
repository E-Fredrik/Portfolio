"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { useTranslation } from "../i18n/I18nContext";
import { i18nConfig, type Locale } from "../i18n/i18n-config";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwitch = useCallback(
    (target: Locale) => {
      if (target === locale) return;
      setLocale(target);

      // Micro-animation: subtle pulse
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.92 },
          { scale: 1, duration: 0.35, ease: "power3.out" },
        );
      }
    },
    [locale, setLocale],
  );

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-0"
      style={{
        fontFamily: "monospace",
        fontSize: "10px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        userSelect: "none",
      }}
    >
      {i18nConfig.locales.map((loc, i) => (
        <React.Fragment key={loc}>
          {i > 0 && (
            <span
              style={{ color: "#333333", padding: "0 4px" }}
              aria-hidden="true"
            >
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSwitch(loc)}
            aria-label={`Switch language to ${i18nConfig.localeNames[loc]}`}
            aria-current={locale === loc ? "true" : undefined}
            style={{
              background: "none",
              border: "none",
              padding: "4px 2px",
              cursor: "pointer",
              color: locale === loc ? "#FFFFFF" : "#A1A1A6",
              fontFamily: "inherit",
              fontSize: "inherit",
              letterSpacing: "inherit",
              textTransform: "inherit",
              transition: "color 200ms ease",
            }}
          >
            {i18nConfig.localeNames[loc]}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
