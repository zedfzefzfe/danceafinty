import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import './FinalCTASection.css';

const HEADLINE_2 = 'WAITING IN FREIBURG';

// ── Animated letter ───────────────────────────────────────────────────────────

interface LetterProps {
  char: string;
  index: number;
  visible: boolean;
  noAnim: boolean;
}

function AnimatedLetter({ char, index, visible, noAnim }: LetterProps) {
  if (char === ' ') return <span className="fc-letter-space" aria-hidden="true"> </span>;
  return (
    <span
      className={`fc-letter${visible ? ' fc-letter--in' : ''}`}
      style={noAnim ? undefined : { transitionDelay: visible ? `${0.3 + index * 0.025}s` : '0s' }}
      aria-hidden="true"
    >
      {char}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface FinalCTASectionProps {
  videoSrc?: string;
  imageSrc?: string;
}

export default function FinalCTASection({ videoSrc, imageSrc }: FinalCTASectionProps) {
  const isMobile = useIsMobile();

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  const noAnim = prefersReducedMotion;

  const heroRef = useRef<HTMLDivElement>(null);

  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const heroObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.15 }
    );

    if (heroRef.current) heroObs.observe(heroRef.current);

    return () => { heroObs.disconnect(); };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const letters = HEADLINE_2.split('');

  return (
    <section
      id="contact"
      className="fc-section"
      aria-label="Get Your Festival Pass"
    >

      {/* ═══ ZONE A — Cinematic CTA ═══════════════════════════════════════════ */}
      <div ref={heroRef} className="fc-hero">

        {/* Background: video, image, or animated gradient */}
        {videoSrc ? (
          <video
            className="fc-hero-video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : imageSrc ? (
          <img
            className="fc-hero-image"
            src={imageSrc}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <div className="fc-hero-bg" aria-hidden="true" />
        )}

        {/* Spotlight + fade overlays */}
        <div className="fc-spotlight"  aria-hidden="true" />
        <div className="fc-hero-fade"  aria-hidden="true" />

        {/* Content */}
        <div className="fc-hero-content">

          {/* Small label */}
          <p
            className="fc-hero-label"
            style={{
              opacity:    heroVisible ? 1 : 0,
              transition: noAnim ? 'none' : 'opacity 0.5s ease',
            }}
          >
            — ONE LAST THING —
          </p>

          {/* Two-line heading */}
          <div className="fc-heading-wrap">

            {/* Line 1: serif italic */}
            <span className="fc-line1" aria-hidden={noAnim ? undefined : 'true'}>
              {['Your', 'moment', 'is'].map((word, wi) => (
                <span
                  key={word}
                  className={`fc-word${heroVisible ? ' fc-word--in' : ''}`}
                  style={noAnim ? undefined : {
                    transitionDelay: heroVisible ? `${0.15 + wi * 0.12}s` : '0s',
                  }}
                >
                  {word}{wi < 2 ? ' ' : ''}
                </span>
              ))}
            </span>
            {/* Screen-reader-only accessible text for line 1 */}
            {!noAnim && (
              <span className="fc-line1" aria-hidden="true" style={{ display: 'none' }}>
                Your moment is
              </span>
            )}

            {/* Line 2: Bebas Neue, letter-by-letter */}
            <span className="fc-line2" aria-label={HEADLINE_2}>
              {noAnim ? (
                <span
                  style={{
                    opacity:    heroVisible ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.3s',
                  }}
                >
                  {HEADLINE_2}
                </span>
              ) : (
                letters.map((char, i) => (
                  <AnimatedLetter
                    key={i}
                    char={char}
                    index={i}
                    visible={heroVisible}
                    noAnim={noAnim}
                  />
                ))
              )}
            </span>
          </div>

          {/* Date + location */}
          <p
            className="fc-date"
            style={{
              opacity:    heroVisible ? 1 : 0,
              transition: noAnim ? 'none' : 'opacity 0.5s ease 0.7s',
            }}
          >
            OCTOBER 30 — NOVEMBER 2, 2026
          </p>

          {/* CTA button */}
          <div
            className="fc-btn-wrap"
            style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.95)',
              transition: noAnim ? 'none' : 'opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s',
            }}
          >
            <button
              className="fc-cta-btn"
              onClick={() => scrollToSection('#passes')}
              aria-label="Get your festival pass starting from 79 euros"
            >
              GET YOUR PASS — 79€ →
            </button>
            <p className="fc-btn-note">100% refundable · Secure checkout</p>
          </div>
        </div>
      </div>


    </section>
  );
}
