import type { Lang } from './LanguageContext';

type Tri = Record<Lang, string>;

// ── Navigation ──────────────────────────────────────────────────────────────
export const navLabels: Record<string, Tri> = {
  Home:      { en: 'Home',      de: 'Start',      fr: 'Accueil' },
  Artists:   { en: 'Artists',   de: 'Künstler',   fr: 'Artistes' },
  Schedule:  { en: 'Schedule',  de: 'Programm',   fr: 'Programme' },
  Bootcamps: { en: 'Bootcamps', de: 'Bootcamps',  fr: 'Bootcamps' },
  Passes:    { en: 'Passes',    de: 'Tickets',    fr: 'Billets' },
  Location:  { en: 'Location',  de: 'Anfahrt',    fr: 'Lieu' },
  Gallery:   { en: 'Gallery',   de: 'Galerie',    fr: 'Galerie' },
  Contact:   { en: 'Contact',   de: 'Kontakt',    fr: 'Contact' },
  Lineup:    { en: 'Lineup',    de: 'Lineup',     fr: 'Programmation' },
  FAQ:       { en: 'FAQ',       de: 'FAQ',        fr: 'FAQ' },
};

export const navUI = {
  buyPass: { en: 'Buy Pass', de: 'Tickets kaufen', fr: 'Billets' } as Tri,
  menu:    { en: 'Menu',     de: 'Menü',           fr: 'Menu' } as Tri,
};

// ── Hero ────────────────────────────────────────────────────────────────────
export const heroCopy: Record<Lang, {
  tagline: string;
  dateLocation: string;
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  en: {
    tagline: 'KIZOMBA & BACHATA FESTIVAL',
    dateLocation: 'FREIBURG IM BREISGAU, GERMANY',
    ctaPrimary: 'Get your pass',
    ctaSecondary: 'See the lineup',
  },
  de: {
    tagline: 'KIZOMBA & BACHATA FESTIVAL',
    dateLocation: 'FREIBURG IM BREISGAU, DEUTSCHLAND',
    ctaPrimary: 'Tickets sichern',
    ctaSecondary: 'Zum Lineup',
  },
  fr: {
    tagline: 'FESTIVAL KIZOMBA & BACHATA',
    dateLocation: 'FRIBOURG-EN-BRISGAU, ALLEMAGNE',
    ctaPrimary: 'Réserve ta place',
    ctaSecondary: 'Voir la programmation',
  },
};

// Countdown labels
export const countdownCopy: Record<Lang, { days: string; hrs: string; min: string; sec: string }> = {
  en: { days: 'DAYS', hrs: 'HRS', min: 'MIN', sec: 'SEC' },
  de: { days: 'TAGE', hrs: 'STD', min: 'MIN', sec: 'SEK' },
  fr: { days: 'JOURS', hrs: 'H', min: 'MIN', sec: 'SEC' },
};

// ── Newsletter ──────────────────────────────────────────────────────────────
export const newsletterCopy: Record<Lang, {
  title: string; body: string; button: string; placeholder: string;
  success: string; emailLabel: string; socialLabel: string;
}> = {
  en: {
    title: 'Stay in the loop',
    body: 'Get lineup drops, playlist updates and early-bird access.',
    button: 'Subscribe', placeholder: 'Enter your email',
    success: "Thanks for subscribing! We'll keep you updated.",
    emailLabel: 'Email', socialLabel: 'Social',
  },
  de: {
    title: 'Bleib auf dem Laufenden',
    body: 'Erhalte Lineup-News, Playlist-Updates und Early-Bird-Zugang.',
    button: 'Abonnieren', placeholder: 'E-Mail eingeben',
    success: 'Danke fürs Abonnieren! Wir halten dich auf dem Laufenden.',
    emailLabel: 'E-Mail', socialLabel: 'Social',
  },
  fr: {
    title: 'Reste connecté',
    body: 'Reçois les annonces du lineup, les mises à jour playlist et l’accès early-bird.',
    button: 'S’abonner', placeholder: 'Entre ton e-mail',
    success: 'Merci pour ton inscription ! On te tient au courant.',
    emailLabel: 'E-mail', socialLabel: 'Réseaux',
  },
};

// ── Final CTA ───────────────────────────────────────────────────────────────
export const finalCtaCopy: Record<Lang, {
  kicker: string; script: string; heading: string; dateLine: string;
  button: string; note: string;
}> = {
  en: {
    kicker: 'ONE LAST THING',
    script: 'Your moment is',
    heading: 'WAITING IN FREIBURG',
    dateLine: 'OCTOBER 30 – NOVEMBER 2, 2026',
    button: 'GET YOUR PASS',
    note: '100% refundable · Secure checkout',
  },
  de: {
    kicker: 'EINE LETZTE SACHE',
    script: 'Dein Moment',
    heading: 'WARTET IN FREIBURG',
    dateLine: '30. OKTOBER – 2. NOVEMBER 2026',
    button: 'TICKETS SICHERN',
    note: '100% erstattbar · Sicherer Checkout',
  },
  fr: {
    kicker: 'UNE DERNIÈRE CHOSE',
    script: 'Ton moment',
    heading: 'T’ATTEND À FRIBOURG',
    dateLine: '30 OCTOBRE – 2 NOVEMBRE 2026',
    button: 'RÉSERVE TA PLACE',
    note: '100% remboursable · Paiement sécurisé',
  },
};
