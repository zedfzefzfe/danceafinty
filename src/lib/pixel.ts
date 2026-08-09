/**
 * Meta (Facebook) Pixel — consent-gated loader and event helper.
 *
 * The pixel is deliberately NOT in index.html. This site targets Germany, so
 * GDPR + TDDDG apply: the tracking script may not load until the visitor has
 * actively accepted. Meta's own "paste it in <head>" instruction would fire on
 * first byte, before anyone has agreed to anything.
 *
 * So the script is injected on demand, from ConsentBanner, and every helper
 * here is a no-op until that happens.
 */

// Not a secret — a pixel ID is visible to anyone who opens devtools. It lives
// in code rather than an env var only so a deploy can't silently ship without
// it; VITE_META_PIXEL_ID still overrides for a separate staging pixel.
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '1356842146598666';

const CONSENT_KEY = 'da-consent';

export type ConsentChoice = 'granted' | 'denied';

/** Standard Meta event names. Custom strings are allowed but won't feed optimization. */
export type PixelEvent =
  | 'PageView'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Contact'
  | 'Subscribe'
  | 'Purchase';

type PixelParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void };
    _fbq?: unknown;
  }
}

let loaded = false;

// Events fired before the visitor answered the banner. Holding them in memory
// (rather than dropping them) means someone who scrolls past the passes and
// only then hits Accept still counts — nothing leaves the browser until they do.
const pending: { event: PixelEvent; params?: PixelParams }[] = [];

/**
 * Never track from a dev machine or a Vercel preview build — those hits would
 * land in the client's live ad data and skew the audiences they pay to build.
 */
function isTrackableHost(): boolean {
  if (typeof window === 'undefined') return false;
  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') return false;
  if (hostname.endsWith('.local')) return false;
  return true;
}

export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved === 'granted' || saved === 'denied' ? saved : null;
  } catch {
    return null;
  }
}

function persistConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* private mode — the choice just won't survive a reload */
  }
}

/** Injects Meta's fbevents.js. Idempotent. */
function loadPixel() {
  if (loaded || typeof window === 'undefined') return;
  if (!PIXEL_ID || !isTrackableHost()) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Meta's official snippet, transcribed. The stub queues calls made before
  // fbevents.js finishes downloading, then replays them once it does.
  const n: any = (window.fbq = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  loaded = true;

  window.fbq?.('init', PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

/** Call when the visitor accepts. Loads the pixel and flushes anything queued. */
export function grantConsent() {
  persistConsent('granted');
  loadPixel();
  while (pending.length) {
    const queued = pending.shift();
    if (queued) window.fbq?.('track', queued.event, queued.params);
  }
}

/** Call when the visitor declines. Nothing is ever sent. */
export function denyConsent() {
  persistConsent('denied');
  pending.length = 0;
}

/** Loads the pixel on later visits if consent was already given. */
export function initPixelIfConsented() {
  if (getConsent() === 'granted') loadPixel();
}

/**
 * Fires a Meta standard event — or buffers it until consent arrives.
 * Silently does nothing if the visitor declined, or on localhost/previews.
 */
export function track(event: PixelEvent, params?: PixelParams) {
  const consent = getConsent();
  if (consent === 'denied' || !isTrackableHost()) return;

  if (consent !== 'granted') {
    pending.push({ event, params });
    return;
  }

  loadPixel();
  window.fbq?.('track', event, params);
}
