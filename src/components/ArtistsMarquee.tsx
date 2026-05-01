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

      {/* ── Marquee strip ── */}
      <div
        className="am-marquee-wrapper"
        style={{
          opacity:    vis.marquee ? 1 : 0,
          transform:  vis.marquee ? 'translateY(0)' : 'translateY(60px)',
          transition: noAnim ? 'none' : 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Edge fade — hides card overflow at viewport boundaries */}
        <div aria-hidden="true" className="am-fade-left"  />
        <div aria-hidden="true" className="am-fade-right" />

        <div className={`am-marquee${noAnim ? ' am-marquee--no-anim' : ''}`}>
          <div className="am-track">
            {/* Primary set — read by screen readers */}
            {artists.map((artist, i) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                gradient={CARD_GRADIENTS[i]}
                noAnim={noAnim}
              />
            ))}
            {/* Duplicate set — aria-hidden, enables seamless infinite loop */}
            {artists.map((artist, i) => (
              <ArtistCard
                key={`dup-${artist.id}`}
                artist={artist}
                gradient={CARD_GRADIENTS[i]}
                noAnim={noAnim}
                ariaHidden
              />
            ))}
          </div>
        </div>
      </div>

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
