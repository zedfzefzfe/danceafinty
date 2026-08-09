import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'de' | 'fr';
export const LANGS: Lang[] = ['en', 'de', 'fr'];
export const LANG_LABELS: Record<Lang, string> = { en: 'EN', de: 'DE', fr: 'FR' };
export const LANG_NAMES: Record<Lang, string> = { en: 'English', de: 'Deutsch', fr: 'Français' };

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageCtx>({ lang: 'en', setLang: () => {} });

const isLang = (v: string | null): v is Lang => v === 'en' || v === 'de' || v === 'fr';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('da-lang');
    if (isLang(saved)) return saved;
    const nav = navigator.language.slice(0, 2).toLowerCase();
    return isLang(nav) ? nav : 'en';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('da-lang', l); } catch { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LanguageContext);
}

/**
 * Pick the active language's copy from a { en, de, fr } bundle.
 * Falls back to English for any language whose bundle is missing.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCopy<T>(bundle: Record<Lang, T>): T {
  const { lang } = useLang();
  return bundle[lang] ?? bundle.en;
}
