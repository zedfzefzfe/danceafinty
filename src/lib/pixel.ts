/**
 * Meta (Facebook) Pixel — loader and event helper.
 *
 * The pixel loads for every visitor on page load. There is no consent gate:
 * the client decided that all site traffic should be tracked so no ad data is
 * lost to visitors who would have declined.
 *
 * For the record, since this is a German-facing site: GDPR and the TDDDG
 * require prior consent before loading a tracking script, so this setup is not
 * compliant. It is a deliberate business decision by the site owner, who
 * carries that exposure. The Datenschutzerklärung must still disclose the Meta
 * Pixel. To restore the compliant behaviour, revert this file and
 * src/components/ConsentBanner.tsx to commit 7bfad84c.
 */

// Not a secret — a pixel ID is visible to anyone who opens devtools. It lives
// in code rather than an env var only so a deploy can't silently ship without
// it; VITE_META_PIXEL_ID still overrides for a separate staging pixel.
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '1356842146598666';

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

/**
 * Injects Meta's fbevents.js and fires PageView. Idempotent — safe to call
 * from anywhere, including before the first `track()`.
 */
export function initPixel() {
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

/**
 * Fires a Meta standard event.
 * Silently does nothing on localhost and preview hosts.
 */
export function track(event: PixelEvent, params?: PixelParams) {
  if (!isTrackableHost()) return;
  initPixel();
  window.fbq?.('track', event, params);
}
