import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ArtistsSection.css';

// ─── EDIT GALLERY PHOTOS HERE ─────────────────────────────────────────────────
interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  gridClass: string;
}

const PHOTOS: GalleryPhoto[] = [
  { id: 1,  src: 'images/1.png',  alt: 'Dancers in close embrace on the main floor',  gridClass: 'af-item-a' },
  { id: 2,  src: 'images/2.png',  alt: 'Workshop session underway',                    gridClass: '' },
  { id: 3,  src: 'images/3.png',  alt: 'Evening showcase crowd',                       gridClass: '' },
  { id: 4,  src: 'images/51.png', alt: 'Carlos Espinosa mid-session',                  gridClass: '' },
  { id: 5,  src: 'images/50.png', alt: 'Pair work during the kizomba bootcamp',        gridClass: '' },
  { id: 6,  src: 'images/53.png', alt: 'Late-night social floor',                      gridClass: '' },
  { id: 7,  src: 'images/4.png',  alt: 'Festival energy at its peak',                  gridClass: 'af-item-g' },
  { id: 8,  src: 'images/5.png',  alt: 'Footwork detail during practice',              gridClass: '' },
  { id: 9,  src: 'images/54.png', alt: 'Artists connecting with the crowd',            gridClass: '' },
  { id: 10, src: 'images/6.png',  alt: 'Shared moment between dancers',                gridClass: '' },
  { id: 11, src: 'images/55.png', alt: 'Instructor during the bachata session',        gridClass: '' },
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = PHOTOS[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div
      className="af-lb-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
    >
      {/* Image — stop propagation so clicking it doesn't close */}
      <div className="af-lb-frame" onClick={(e) => e.stopPropagation()}>
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="af-lb-img"
        />
        <p className="af-lb-counter">{index + 1} / {PHOTOS.length}</p>
      </div>

      {/* Arrows */}
      <button
        className="af-lb-arrow af-lb-arrow--left"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
      >
        ‹
      </button>
      <button
        className="af-lb-arrow af-lb-arrow--right"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
      >
        ›
      </button>

      {/* Close */}
      <button className="af-lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>,
    document.body
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function ArtistsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleItems,  setVisibleItems]  = useState<Set<number>>(new Set());
  const [staggerMult,   setStaggerMult]   = useState(0.08);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    setStaggerMult(window.innerWidth < 640 ? 0.05 : 0.08);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeaderVisible(true);
      setVisibleItems(new Set(PHOTOS.map((_, i) => i)));
      return;
    }

    const headerObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); headerObs.disconnect(); } },
      { threshold: 0.2 }
    );

    const cardObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisibleItems((prev) => { const next = new Set(prev); next.add(idx); return next; });
          }
        });
      },
      { threshold: 0.06 }
    );

    if (headerRef.current) headerObs.observe(headerRef.current);
    itemRefs.current.forEach((el) => { if (el) cardObs.observe(el); });

    return () => { headerObs.disconnect(); cardObs.disconnect(); };
  }, [prefersReducedMotion]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
  []);
  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
  []);

  const noAnim = prefersReducedMotion;

  return (
    <section
      id="gallery"
      aria-label="Festival Photo Gallery"
      className="af-section"
    >
      <div className="af-container">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="af-header"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: noAnim ? 'opacity 0.5s ease' : 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="af-label">— FESTIVAL 2026</p>

          <div className="af-heading-wrap">
            <span className="af-heading-serif">Inside the</span>
            <span className="af-heading-bold">MOMENTS.</span>
          </div>

          <p className="af-subline">Four days. Real people. No staging.</p>

          <div className="af-rule" />
        </div>

        {/* ── Gallery grid ── */}
        <div className="af-grid">
          {PHOTOS.map((photo, index) => {
            const isVisible = visibleItems.has(index);
            const delay     = isVisible ? `${index * staggerMult}s` : '0s';

            return (
              <div
                key={photo.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-idx={index}
                className={photo.gridClass}
                style={{
                  opacity:         isVisible ? 1 : 0,
                  transform:       isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition:      noAnim ? 'opacity 0.5s ease' : 'opacity 0.6s ease, transform 0.6s ease',
                  transitionDelay: delay,
                }}
              >
                <button
                  type="button"
                  className="af-card"
                  aria-label={`Open photo: ${photo.alt}`}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div
                    className="af-photo"
                    style={{
                      background: photo.src
                        ? `url(${photo.src}) center / cover no-repeat`
                        : 'linear-gradient(145deg, #1a0d2e 0%, #0d1a2e 100%)',
                    }}
                  />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
