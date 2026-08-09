import { useEffect, useRef } from 'react';
import { track, type PixelEvent } from '../lib/pixel';

/**
 * Fires a Meta Pixel event the first time an element scrolls into view.
 *
 * This site is a single-page scroller, so PageView on its own says almost
 * nothing — everyone who lands gets one. Depth of scroll is the real intent
 * signal, which is what these events capture.
 *
 * Uses IntersectionObserver for the same reason `revealOnView` does: it
 * re-measures against live layout, so late-loading images and webfonts can't
 * strand the trigger at a stale offset.
 */
export function useTrackInView<T extends HTMLElement>(
  event: PixelEvent,
  params?: Record<string, unknown>,
  /** Fraction of the element that must show before it counts. */
  threshold = 0.4
) {
  const ref = useRef<T>(null);
  // Params are read inside the observer callback; a ref keeps a new object
  // literal on each render from re-creating the observer.
  const paramsRef = useRef(params);
  useEffect(() => {
    paramsRef.current = params;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track(event, paramsRef.current);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [event, threshold]);

  return ref;
}
