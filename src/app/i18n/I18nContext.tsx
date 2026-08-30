"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { i18nConfig, type Locale } from "./i18n-config";

/* ---------- eagerly import all dictionaries ---------- */
import en from "./locales/en.json";
import id from "./locales/id.json";

const dictionaries: Record<Locale, Record<string, unknown>> = { 
  en: en as unknown as Record<string, unknown>, 
  id: id as unknown as Record<string, unknown> 
};

/* ---------- helpers ---------- */

/**
 * Resolve a dot-path key (e.g. "nav.home") on a nested object.
 * Returns the value or the key itself as a fallback.
 */
function resolve(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return path;
    current = (current as Record<string, unknown>)[part];
  }
  return current === undefined ? path : current;
}

/* ---------- context ---------- */

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Look up a translated string by dot-path key, e.g. `t("nav.home")` */
  t: (key: string) => string;
  /** Look up a translated array by dot-path key, e.g. `tArray("projects.items")` */
  tArray: <T = unknown>(key: string) => T[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // SSR-safe: default to config default; hydrate from localStorage in effect
    return i18nConfig.defaultLocale;
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (
        stored &&
        (i18nConfig.locales as readonly string[]).includes(stored)
      ) {
        setLocaleState(stored as Locale);
      }
    } catch {
      // localStorage unavailable — ignore
    }
  }, []);

  // Persist + update <html lang>
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    document.documentElement.lang = l;
  }, []);

  // Keep <html lang> in sync on mount / hydrate
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const dict = useMemo(
    () => dictionaries[locale] ?? dictionaries[i18nConfig.defaultLocale],
    [locale],
  );

  const t = useCallback(
    (key: string): string => {
      const val = resolve(dict, key);
      return typeof val === "string" ? val : key;
    },
    [dict],
  );

  const tArray = useCallback(
    <T = unknown,>(key: string): T[] => {
      const val = resolve(dict, key);
      return Array.isArray(val) ? (val as T[]) : [];
    },
    [dict],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tArray }),
    [locale, setLocale, t, tArray],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return ctx;
}
