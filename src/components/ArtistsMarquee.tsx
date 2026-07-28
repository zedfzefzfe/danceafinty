import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import './ArtistsMarquee.css';

// EDIT ARTIST DATA HERE ─────────────────────────────────────────────────────
// Swap `image` from '' to a public path (e.g. '/images/artist_carlos.jpg')
// when real photos are available. All other fields can be edited freely.
interface Artist {
  id: number;
  name: string;
  label: string;
  style: string;
  country: string;
  image: string;
}

const artists: Artist[] = [
  { id: 1, name: 'Carlos Espinosa', label: 'Kizomba', style: 'URBAN KIZ',   country: 'PORTUGAL', image: 'images/51.png' },
  { id: 2, name: 'Andrea Vital',    label: 'Bachata',  style: 'SENSUAL',     country: 'SPAIN',    image: 'images/50.png' },
  { id: 3, name: 'Marco Ferreira',  label: 'Kizomba',  style: 'FUSION',      country: 'FRANCE',   image: 'images/53.png' },
  { id: 4, name: 'Inès Pereira',    label: 'Bachata',  style: 'MODERNA',     country: 'PORTUGAL', image: 'images/54.png' },
  { id: 5, name: 'Tony & Maya',     label: 'Bachata',  style: 'SENSUAL DUO', country: 'FRANCE',   image: 'images/55.png' },
  { id: 6, name: 'DJ Blackpacha',   label: 'DJ',       style: 'AFRO HOUSE',  country: 'ANGOLA',   image: 'images/56.png' },
  { id: 7, name: 'Sara Panero',     label: 'Bachata',  style: 'URBAN',       country: 'SPAIN',    image: 'images/57.png' },
  { id: 8, name: 'Flow Brothers',   label: 'Kizomba',  style: 'URBAN KIZ',   country: 'GERMANY',  image: 'images/58.png' },
];
// EDIT DJ DATA HERE ─────────────────────────────────────────────────────────
// Second marquee row. Same card shape as `artists` — only the content differs.
const djs: Artist[] = [
  { id: 101, name: 'DJ Blackpacha', label: 'DJ', style: 'AFRO HOUSE', country: 'ANGOLA', image: 'images/dj-blackpacha.jpg' },
  // TODO — replace the 5 entries below with the real DJ line-up
  { id: 102, name: 'TODO — DJ Name', label: 'DJ', style: 'TODO STYLE', country: 'TODO COUNTRY', image: 'images/dj-2.jpg' },
  { id: 103, name: 'TODO — DJ Name', label: 'DJ', style: 'TODO STYLE', country: 'TODO COUNTRY', image: 'images/dj-3.jpg' },
  { id: 104, name: 'TODO — DJ Name', label: 'DJ', style: 'TODO STYLE', country: 'TODO COUNTRY', image: 'images/dj-4.jpg' },
  { id: 105, name: 'TODO — DJ Name', label: 'DJ', style: 'TODO STYLE', country: 'TODO COUNTRY', image: 'images/dj-5.jpg' },
  { id: 106, name: 'TODO — DJ Name', label: 'DJ', style: 'TODO STYLE', country: 'TODO COUNTRY', image: 'images/dj-6.jpg' },
];
// ─────────────────────────────────────────────────────────────────────────────

// Moody film-still gradients — unique per card, cohesive palette
const CARD_GRADIENTS: string[] = [
  'linear-gradient(160deg, #1a1d2e 0%, #2a1a2e 60%, #1a1d2e 100%)',   // Carlos — deep indigo/plum
  'linear-gradient(145deg, #2a1a2e 0%, #1f2e2a 70%, #1a1d2e 100%)',   // Andrea — plum to teal-shadow
  'linear-gradient(155deg, #1a2a2e 0%, #1a1d2e 50%, #2a1a2e 100%)',   // Marco  — slate-teal to indigo
  'linear-gradient(165deg, #2e1a1f 0%, #1a1d2e 60%, #1a2a2e 100%)',   // Inès   — burgundy to navy
  'linear-gradient(150deg, #1f2e2a 0%, #2a1a2e 60%, #1a1d2e 100%)',   // T&M    — forest-dark to plum
  'linear-gradient(140deg, #1a1d2e 0%, #2e1a1f 55%, #1a2a2e 100%)',   // DJ     — navy to deep rose
  'linear-gradient(170deg, #2a1a2e 0%, #1a2a2e 60%, #2e1a1f 100%)',   // Sara   — violet to teal-shadow
  'linear-gradient(155deg, #1a1a2e 0%, #1f2e2a 65%, #2a1a2e 100%)',   // Flow   — navy to forest
];

// Same palette, offset so the two rows don't line up gradient-for-gradient
const DJ_GRADIENTS: string[] = [
  'linear-gradient(140deg, #1a1d2e 0%, #2e1a1f 55%, #1a2a2e 100%)',
  'linear-gradient(170deg, #2a1a2e 0%, #1a2a2e 60%, #2e1a1f 100%)',
  'linear-gradient(155deg, #1a1a2e 0%, #1f2e2a 65%, #2a1a2e 100%)',
  'linear-gradient(160deg, #1a1d2e 0%, #2a1a2e 60%, #1a1d2e 100%)',
  'linear-gradient(145deg, #2a1a2e 0%, #1f2e2a 70%, #1a1d2e 100%)',
  'linear-gradient(155deg, #1a2a2e 0%, #1a1d2e 50%, #2a1a2e 100%)',
];

interface VisState {
  label:   boolean;
  heading: boolean;
  tagline: boolean;
  marquee: boolean;
}

export default function ArtistsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile   = useIsMobile();

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const [vis, setVis] = useState<VisState>({
    label:   false,
    heading: false,
    tagline: false,
    marquee: false,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      setVis({ label: true, heading: true, tagline: true, marquee: true });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const reveal = (delay: number, key: keyof VisState) =>
          setTimeout(() => setVis(v => ({ ...v, [key]: true })), delay);
        reveal(0,   'label');
        reveal(150, 'heading');
        reveal(350, 'tagline');
        reveal(500, 'marquee');
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const noAnim = prefersReducedMotion;

  return (
    <section
      id="artists-marquee"
      ref={sectionRef}
      className="am-section"
      aria-label="Festival Artists Lineup"
    >
      {/* ── Section header ── */}
      <div className="am-header">

        

        <h2
          className="am-heading"
          style={{
            opacity:    vis.heading ? 1 : 0,
            transform:  vis.heading ? 'translateY(0)' : 'translateY(40px)',
            transition: noAnim ? 'none' : 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span className="am-heading-serif">The Artists</span>
          <br />
          <span className="am-heading-bold">BEHIND THE MAGIC</span>
        </h2>

        <p
          className="am-tagline"
          style={{
            opacity:    vis.tagline ? 1 : 0,
            transition: noAnim ? 'none' : 'opacity 0.6s ease',
          }}
        >
          Internationally acclaimed Kizomba and Bachata artists, curated to
          elevate every moment of your festival journey.
        </p>

      </div>

      {/* ── Row label — teachers ── */}
      <div
        className="am-row-heading"
        style={{
          opacity:    vis.marquee ? 1 : 0,
          transition: noAnim ? 'none' : 'opacity 0.7s ease',
        }}
      >
        <div className="am-row-heading-top">
          <p className="am-row-label">The Teachers</p>
          <span aria-hidden="true" className="am-row-rule" />
        </div>
        <p className="am-row-sub">World-class artists leading every workshop.</p>
      </div>

      {/* ── Marquee strip ── */}
      <MarqueeRow
        items={artists}
        gradients={CARD_GRADIENTS}
        noAnim={noAnim}
        style={{
          opacity:    vis.marquee ? 1 : 0,
          transform:  vis.marquee ? 'translateY(0)' : 'translateY(60px)',
          transition: noAnim ? 'none' : 'opacity 0.9s ease, transform 0.9s ease',
        }}
      />

      {/* ── Row label — DJs ── */}
      <div
        className="am-row-heading am-row-heading--second"
        style={{
          opacity:    vis.marquee ? 1 : 0,
          transition: noAnim ? 'none' : 'opacity 0.7s ease 0.15s',
        }}
      >
        <div className="am-row-heading-top">
          <p className="am-row-label">The DJs</p>
          <span aria-hidden="true" className="am-row-rule" />
        </div>
        <p className="am-row-sub">The beats that keep the floor alive all night.</p>
      </div>

      {/* ── Second marquee strip — DJs, scrolling the opposite way ── */}
      <MarqueeRow
        items={djs}
        gradients={DJ_GRADIENTS}
        noAnim={noAnim}
        reverse
        style={{
          opacity:    vis.marquee ? 1 : 0,
          transform:  vis.marquee ? 'translateY(0)' : 'translateY(60px)',
          transition: noAnim ? 'none' : 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
        }}
      />

      {/* ── Footer hint — the kind of detail that proves a human designed this ── */}
      <p
        className="am-hint"
        style={{
          opacity:    vis.marquee ? 1 : 0,
          transition: noAnim ? 'none' : 'opacity 0.6s ease 0.8s',
        }}
      >
        {isMobile
          ? '— TOUCH TO PAUSE · KEEP SCROLLING TO EXPLORE —'
          : '— HOVER TO PAUSE · KEEP SCROLLING TO EXPLORE —'}
      </p>
    </section>
  );
}

// ── Sub-component: one auto-scrolling, manually scrollable row ────────────────
//
// Auto-scroll and manual scroll both drive `scrollLeft` on the same element, so
// they can never fight each other. Three copies of the list give the wrap-around
// enough headroom to stay seamless in both directions.

interface MarqueeRowProps {
  items: Artist[];
  gradients: string[];
  noAnim: boolean;
  reverse?: boolean;
  style?: React.CSSProperties;
}

function MarqueeRow({ items, gradients, noAnim, reverse, style }: MarqueeRowProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const resumeAtRef = useRef(0);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const [dragging, setDragging] = useState(false);

  const loopWidth = () => {
    const el = marqueeRef.current;
    return el ? el.scrollWidth / 3 : 0;
  };

  // Start one copy in so there is content to reveal when scrolling backwards
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const id = window.setTimeout(() => {
      el.scrollLeft = el.scrollWidth / 3;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    // Reduce Motion eases the pace instead of freezing the row — a stopped
    // marquee reads as broken on the phones that default that setting on.
    const speed = noAnim ? 12 : 34; // px per second

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const el = marqueeRef.current;
      if (el && !draggingRef.current) {
        if (now >= resumeAtRef.current) {
          el.scrollLeft += (reverse ? -1 : 1) * speed * dt;
        }
        const loop = loopWidth();
        if (loop > 0) {
          if (el.scrollLeft >= loop * 2) el.scrollLeft -= loop;
          else if (el.scrollLeft <= 0) el.scrollLeft += loop;
        }
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [noAnim, reverse]);

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    // Let any touch momentum play out before the marquee takes over again
    resumeAtRef.current = performance.now() + 1500;
  };

  return (
    <div className="am-marquee-wrapper" style={style}>
      {/* Edge fade — hides card overflow at viewport boundaries */}
      <div aria-hidden="true" className="am-fade-left"  />
      <div aria-hidden="true" className="am-fade-right" />

      <div
        ref={marqueeRef}
        className={`am-marquee${dragging ? ' am-marquee--dragging' : ''}`}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          const el = marqueeRef.current;
          if (!el) return;
          draggingRef.current = true;
          setDragging(true);
          dragStart.current = { x: e.clientX, scroll: el.scrollLeft };
          // Touch keeps the browser's native panning; only the mouse needs capture
          if (e.pointerType === 'mouse') el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current || e.pointerType !== 'mouse') return;
          const el = marqueeRef.current;
          if (!el) return;
          el.scrollLeft = dragStart.current.scroll - (e.clientX - dragStart.current.x);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="am-track">
          {[0, 1, 2].map((copy) =>
            items.map((item, i) => (
              <ArtistCard
                key={`c${copy}-${item.id}`}
                artist={item}
                gradient={gradients[i]}
                noAnim={noAnim}
                ariaHidden={copy !== 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-component: single artist card ─────────────────────────────────────────

interface CardProps {
  artist:     Artist;
  gradient:   string;
  noAnim:     boolean;
  ariaHidden?: boolean;
}

function ArtistCard({ artist, gradient, noAnim: _noAnim, ariaHidden }: CardProps) {
  return (
    <article
      className="am-card"
      role="article"
      aria-label={
        ariaHidden ? undefined : `${artist.name}, ${artist.style}, from ${artist.country}`
      }
      aria-hidden={ariaHidden || undefined}
    >
      {/* Photo / gradient placeholder */}
      <div
        className="am-card-bg"
        style={{
          background: artist.image
            ? `url(${artist.image}) center top / cover no-repeat`
            : gradient,
        }}
      />

      {/* Gradient overlay — ensures text is always legible */}
      <div className="am-card-overlay" aria-hidden="true" />

      {/* Teal accent line — the 32px horizontal reveal on hover */}
      <div className="am-accent-line" aria-hidden="true" />

      {/* Card text — always visible, not hidden until hover */}
      <div className="am-card-text">
        <p className="am-card-label">— {artist.label}</p>
        <h3 className="am-card-name">{artist.name}</h3>
        <p className="am-card-tag">{artist.style} · {artist.country}</p>
      </div>
    </article>
  );
}
