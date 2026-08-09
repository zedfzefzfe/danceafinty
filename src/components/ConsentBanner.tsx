import { useEffect, useState } from 'react';
import { useCopy, type Lang } from '../i18n/LanguageContext';
import { getConsent, grantConsent, denyConsent, initPixelIfConsented } from '../lib/pixel';

/**
 * GDPR / TDDDG consent gate for the Meta Pixel.
 *
 * German-facing site, so the rules are strict: no pre-ticked boxes, no
 * "by continuing you agree", and declining must be exactly as easy as
 * accepting — hence two equally reachable buttons rather than a buried link.
 *
 * NOTE: `privacyHref` still points at a placeholder. The Datenschutzerklärung
 * has to name the Meta Pixel explicitly before this goes live.
 */

interface ConsentCopy {
  title: string;
  body: string;
  accept: string;
  decline: string;
  privacy: string;
}

const COPY_I18N: Record<Lang, ConsentCopy> = {
  en: {
    title: 'We use cookies',
    body: 'We use the Meta Pixel to measure our advertising and show relevant ads. It only loads if you accept.',
    accept: 'Accept',
    decline: 'Decline',
    privacy: 'Privacy Policy',
  },
  de: {
    title: 'Wir verwenden Cookies',
    body: 'Wir nutzen das Meta-Pixel, um unsere Werbung zu messen und relevante Anzeigen auszuspielen. Es wird nur geladen, wenn du zustimmst.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    privacy: 'Datenschutzerklärung',
  },
  fr: {
    title: 'Nous utilisons des cookies',
    body: 'Nous utilisons le Pixel Meta pour mesurer nos publicités et afficher des annonces pertinentes. Il ne se charge que si vous acceptez.',
    accept: 'Accepter',
    decline: 'Refuser',
    privacy: 'Politique de confidentialité',
  },
};

const PRIVACY_HREF = '#';
const BODY_FONT = "'DM Sans', sans-serif";

export default function ConsentBanner() {
  const COPY = useCopy(COPY_I18N);
  // Read up front rather than in an effect, matching how LanguageProvider
  // seeds itself from localStorage — this is a client-only Vite app, so there
  // is no server render to mismatch against.
  const [visible, setVisible] = useState(() => getConsent() === null);

  useEffect(() => {
    // Returning visitor who already accepted — load without asking again.
    initPixelIfConsented();
  }, []);

  if (!visible) return null;

  const accept = () => {
    grantConsent();
    setVisible(false);
  };

  const decline = () => {
    denyConsent();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={COPY.title}
      className="fixed bottom-0 left-0 right-0 z-[300] p-4 sm:p-5"
    >
      <div
        className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-white/15 p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6"
        style={{ background: 'rgba(10,16,32,0.97)', backdropFilter: 'blur(10px)' }}
      >
        <div className="flex-1">
          <p className="font-display uppercase text-[13px] tracking-[0.08em] text-white">
            {COPY.title}
          </p>
          <p
            className="mt-1.5"
            style={{ fontFamily: BODY_FONT, fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}
          >
            {COPY.body}{' '}
            <a
              href={PRIVACY_HREF}
              className="text-[#00e5cc] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              {COPY.privacy}
            </a>
          </p>
        </div>

        {/* Decline is a real, equally prominent button — required, not optional */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={decline}
            className="flex-1 rounded-lg border border-white/25 px-5 py-2.5 font-display text-[12px] uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 hover:border-white/50 hover:text-white sm:flex-none"
          >
            {COPY.decline}
          </button>
          <button
            type="button"
            onClick={accept}
            className="flex-1 rounded-lg px-5 py-2.5 font-display text-[12px] uppercase tracking-[0.08em] text-[#04121a] transition-opacity duration-300 hover:opacity-90 sm:flex-none"
            style={{ background: 'linear-gradient(90deg, #00e5cc 0%, #22a9f0 100%)' }}
          >
            {COPY.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
