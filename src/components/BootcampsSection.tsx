import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import './BootcampsSection.css';

// EDIT MEDIA HERE ─────────────────────────────────────────────────────────────
// Set `src` to a public path (e.g. '/images/reel_01.jpg') when real media is ready.
// Videos: add src="/videos/reel_02.mp4" — autoplay/muted/loop is handled automatically.

const reelItems = [
  { id: 1,  type: 'image', aspect: 'landscape', alt: 'Dancers in close embrace during bootcamp',    src: 'images/1.png' },
  { id: 2,  type: 'video', aspect: 'portrait',  alt: 'Instructor demonstrating technique',           src: 'videos/hero_background.mp4' },
  { id: 3,  type: 'image', aspect: 'landscape', alt: 'Group practice session',                       src: 'images/2.png' },
  { id: 4,  type: 'image', aspect: 'portrait',  alt: 'Close-up of footwork',                         src: 'images/3.png' },
  { id: 5,  type: 'video', aspect: 'landscape', alt: 'Full class moving in sync',                     src: 'videos/hero_background.mp4' },
  { id: 6,  type: 'image', aspect: 'landscape', alt: 'Artist explaining connection',                  src: 'images/4.png' },
  { id: 7,  type: 'image', aspect: 'portrait',  alt: 'Social dancing after bootcamp',                 src: 'images/5.png' },
  { id: 8,  type: 'video', aspect: 'landscape', alt: 'Behind the scenes setup',                       src: 'videos/hero_background.mp4' },
  { id: 9,  type: 'image', aspect: 'landscape', alt: 'Students celebrating progress',                 src: 'images/6.png' },
  { id: 10, type: 'image', aspect: 'portrait',  alt: 'DJ playing during practice',                    src: 'images/7.png' },
];

const REEL_GRADIENTS = [
  'linear-gradient(145deg, #1a0d2e 0%, #0d1a2e 100%)',
  'linear-gradient(155deg, #0d2e1a 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #2e1a0d 0%, #0d1a2e 100%)',
  'linear-gradient(165deg, #1a1a2e 0%, #2e0d1a 100%)',
  'linear-gradient(150deg, #0d1a2e 0%, #0d2e1a 100%)',
  'linear-gradient(140deg, #2e0d1a 0%, #1a0d2e 100%)',
  'linear-gradient(160deg, #1a0d2e 0%, #1a1a2e 100%)',
  'linear-gradient(145deg, #0d2e1a 0%, #2e1a0d 100%)',
  'linear-gradient(155deg, #1a1a2e 0%, #0d1a2e 100%)',
  'linear-gradient(135deg, #2e1a0d 0%, #0d2e1a 100%)',
];

const kizombaShowcase = {
  label: '— KIZOMBA BOOTCAMP',
  titleSerif: 'Urban Kiz',
  titleBold: 'INTENSIVE',
  artist: 'with Carlos Espinosa',
  description: "Two sessions. Ninety minutes each. Carlos strips Kiz back to its raw essentials — connection, weight transfer, the conversation between two bodies. You'll leave dancing differently.",
  details: 'INTERMEDIATE · 2 × 90 MIN · OCTOBER 31',
  mainGradient: 'linear-gradient(145deg, #1a0d2e 0%, #0d1a2e 80%, #0d2e1a 100%)',
  secondaryGradient: 'linear-gradient(155deg, #0d2e1a 0%, #1a1a2e 100%)',
  mainSrc: 'images/71.png',
  secondarySrc: 'images/72.png',
};

const bachataShowcase = {
  label: '— BACHATA BOOTCAMP',
  titleSerif: 'Sensual Technique',
  titleBold: 'LAB',
  artist: 'with Andrea Vital',
  description: "Forget the steps you memorized from YouTube. Andrea rebuilds your Bachata from the ground up — starting with how you breathe, how you listen, how you let the music move through you before you move your feet.",
  details: 'ALL LEVELS · 2 × 90 MIN · OCTOBER 30',
  mainGradient: 'linear-gradient(155deg, #2e1a0d 0%, #0d1a2e 100%)',
  secondaryGradient: 'linear-gradient(135deg, #1a1a2e 0%, #2e0d1a 100%)',
  mainSrc: 'images/73.png',
  secondarySrc: 'images/71.png',
};

// ─────────────────────────────────────────────────────────────────────────────

const HEADLINE_2 = 'BECOME UNSTOPPABLE';

// ── Animated letter (Zone 1 — unchanged) ─────────────────────────────────────

interface LetterProps {
  char: string;
  index: number;
  visible: boolean;
  noAnim: boolean;
}

function AnimatedLetter({ char, index, visible, noAnim }: LetterProps) {
  if (char === ' ') return <span className="bc-letter-space" aria-hidden="true"> </span>;
  return (
    <span
      className={`bc-letter${visible ? ' bc-letter--in' : ''}`}
      style={noAnim ? undefined : { transitionDelay: visible ? `${index * 0.03}s` : '0s' }}
      aria-hidden="true"
    >
      {char}
    </span>
  );
}

// ── Zone 2: Experience Reel ───────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface ReelItemData {
  id: number;
  type: string;
  aspect: string;
  alt: string;
  src: string;
}

function ReelItem({ item, gradient, index, ariaHidden }: {
  item: ReelItemData;
  gradient: string;
  index: number;
  ariaHidden?: boolean;
}) {
  const isShort  = index % 3 === 1;
  const isVideo  = item.type === 'video';
  const width    = isVideo ? 420 : item.aspect === 'landscape' ? 520 : 340;

  return (
    <div
      className={`bc-reel-item${isShort ? ' bc-reel-item--short' : ''}`}
      style={{ width: `${width}px` }}
      aria-hidden={ariaHidden || undefined}
      role={ariaHidden ? undefined : 'img'}
      aria-label={ariaHidden ? undefined : item.alt}
    >
      {item.src ? (
        isVideo ? (
          <video
            src={item.src}
            autoPlay muted loop playsInline
            aria-hidden="true"
            className="bc-reel-media"
          />
        ) : (
          <img src={item.src} alt={item.alt} className="bc-reel-media" />
        )
      ) : (
        <div className="bc-reel-placeholder" style={{ background: gradient }} aria-hidden="true">
          <div className="bc-reel-teal-wash" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

function ExperienceReel({ noAnim }: { noAnim: boolean }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="bc-reel-zone"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible || noAnim ? 'translateY(0)' : 'translateY(40px)',
        transition: noAnim ? 'opacity 0.3s ease' : 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div aria-hidden="true" className="bc-reel-fade-left"  />
      <div aria-hidden="true" className="bc-reel-fade-right" />

      <div className={`bc-reel-marquee${noAnim ? ' bc-reel-marquee--paused' : ''}`}>
        <div className="bc-reel-track">
          {reelItems.map((item, i) => (
            <ReelItem key={item.id} item={item} gradient={REEL_GRADIENTS[i]} index={i} />
          ))}
          {reelItems.map((item, i) => (
            <ReelItem key={`d-${item.id}`} item={item} gradient={REEL_GRADIENTS[i]} index={i} ariaHidden />
          ))}
        </div>
      </div>

    
    </div>
  );
}

// ── Zone 3 & 4: Showcase Spreads ──────────────────────────────────────────────

interface ShowcaseData {
  label: string;
  titleSerif: string;
  titleBold: string;
  artist: string;
  description: string;
  details: string;
  mainGradient: string;
  secondaryGradient: string;
  mainSrc: string;
  secondarySrc: string;
}

function ShowcaseSection({ data, reversed, noAnim }: {
  data: ShowcaseData;
  reversed?: boolean;
  noAnim: boolean;
}) {
  const { ref, visible } = useInView(0.15);

  const fade = (delay: number) => ({
    opacity:   visible ? 1 : 0,
    transform: visible || noAnim ? 'translateY(0)' : 'translateY(20px)',
    transition: noAnim
      ? 'opacity 0.3s ease'
      : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  const mediaBlock = (
    <div className="bc-showcase-media">
      <div
        className="bc-showcase-main"
        style={{
          background: data.mainSrc
            ? `url(${data.mainSrc}) center/cover no-repeat`
            : data.mainGradient,
          opacity:   visible ? 1 : 0,
          transform: visible || noAnim ? 'scale(1)' : 'scale(1.05)',
          transition: noAnim
            ? 'opacity 0.3s ease'
            : 'opacity 0.8s ease, transform 0.8s ease',
        }}
        aria-hidden="true"
      />
      <div
        className={`bc-showcase-secondary${reversed ? ' bc-showcase-secondary--left' : ''}`}
        style={{
          background: data.secondarySrc
            ? `url(${data.secondarySrc}) center/cover no-repeat`
            : data.secondaryGradient,
          opacity:   visible ? 1 : 0,
          transform: visible || noAnim ? 'translateY(0)' : 'translateY(30px)',
          transition: noAnim
            ? 'opacity 0.3s ease'
            : 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}
        aria-hidden="true"
      />
    </div>
  );

  const textBlock = (
    <div className={`bc-showcase-text${reversed ? ' bc-showcase-text--reversed' : ''}`}>
      <p className="bc-showcase-label" style={fade(0)}>{data.label}</p>

      <div className="bc-showcase-title-wrap">
        <span className="bc-showcase-title-serif" style={fade(0.1)}>
          {data.titleSerif}
        </span>
        <span className="bc-showcase-title-bold" style={fade(0.18)}>
          {data.titleBold}
        </span>
      </div>

      <p className="bc-showcase-artist" style={fade(0.3)}>{data.artist}</p>
      <p className="bc-showcase-desc"   style={fade(0.3)}>{data.description}</p>
      <p className="bc-showcase-details" style={fade(0.5)}>{data.details}</p>

      <div
        className="bc-showcase-accent"
        style={{
          width: visible ? '40px' : '0px',
          transition: noAnim ? 'none' : 'width 0.4s ease 0.6s',
        }}
        aria-hidden="true"
      />
    </div>
  );

  return (
    <div
      ref={ref}
      className={`bc-showcase${reversed ? ' bc-showcase--reversed' : ''}`}
    >
      {reversed ? <>{textBlock}{mediaBlock}</> : <>{mediaBlock}{textBlock}</>}
    </div>
  );
}

// ── Zone 5: Video + Description split ────────────────────────────────────────

function TheMosaic({ noAnim }: { noAnim: boolean }) {
  const { ref, visible } = useInView(0.1);

  const fade = (delay: number) => ({
    opacity:   visible ? 1 : 0,
    transform: visible || noAnim ? 'translateY(0)' : 'translateY(20px)',
    transition: noAnim
      ? 'opacity 0.3s ease'
      : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <div className="bc-mosaic-zone">
      <div className="bc-mosaic-inner">
        <div ref={ref} className="bc-mosaic-split">

          {/* Video */}
          <div
            className="bc-mosaic-video-wrap"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible || noAnim ? 'scale(1)' : 'scale(1.03)',
              transition: noAnim ? 'opacity 0.3s ease' : 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            <video
              src="videos/hero_background.mp4"
              autoPlay muted loop playsInline
              aria-label="Dancers in close embrace during bootcamp"
              className="bc-mosaic-vid"
            />
          </div>

          {/* Description */}
          <div className="bc-mosaic-desc">

            <p className="bc-mosaic-desc-label" style={fade(0.1)}>
              — INSIDE THE BOOTCAMP
            </p>

            <div className="bc-mosaic-desc-headline" style={fade(0.2)}>
              <span className="bc-mosaic-desc-serif">You think you're</span>
              <span className="bc-mosaic-desc-bold">READY.</span>
            </div>

            <p className="bc-mosaic-desc-intro" style={fade(0.3)}>
              You're not. Neither was anyone who walked in before you.
              That's the whole point.
            </p>

            <div
              className="bc-mosaic-desc-rule"
              style={{
                width: visible ? '48px' : '0px',
                transition: noAnim ? 'none' : 'width 0.5s ease 0.45s',
              }}
            />

            <p className="bc-mosaic-desc-body" style={fade(0.5)}>
              The first session breaks down what you think you know — quietly,
              deliberately. Carlos or Andrea will ask you to do something simple,
              and somewhere in the doing you'll realise you've been compensating
              for years. Nobody tells you. Your body does.
            </p>

            <p className="bc-mosaic-desc-secondary" style={fade(0.62)}>
              Two sessions per bootcamp. Ninety minutes each. Forty people
              maximum — small enough that the instructor actually sees you.
              No mirrors. Just honest, uncomfortable, necessary work.
            </p>

            <p className="bc-mosaic-desc-details" style={fade(0.74)}>
              OCTOBER 30 – 31&nbsp;&nbsp;·&nbsp;&nbsp;2 × 90 MIN&nbsp;&nbsp;·&nbsp;&nbsp;MAX 40 SPOTS
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Zone 6: Closing CTA ───────────────────────────────────────────────────────

function ClosingCTA({ noAnim }: { noAnim: boolean }) {
  const { ref, visible } = useInView(0.1);

  const scrollToPasses = () => {
    const el = document.querySelector('#passes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className="bc-cta-strip"
      style={{
        opacity:   visible ? 1 : 0,
        transition: noAnim ? 'opacity 0.3s ease' : 'opacity 0.6s ease',
      }}
    >
      <p className="bc-cta-copy">
        Only 40 spots per bootcamp. When they're gone, they're gone.
      </p>
      <button className="bc-cta-btn" onClick={scrollToPasses}>
        SECURE YOUR BOOTCAMP →
      </button>
      <p className="bc-cta-footnote">
        Included with every Full Pass and VIP Experience
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface BootcampsSectionProps {
  videoSrc?: string;
}

export default function BootcampsSection({ videoSrc }: BootcampsSectionProps) {
  const isMobile = useIsMobile();

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  const noAnim = prefersReducedMotion;

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeroVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const letters = HEADLINE_2.split('');

  return (
    <section
      id="bootcamps"
      className="bc-section"
      aria-label="Bootcamp Training Sessions"
    >

      {/* ═══ ZONE 1 — Cinematic Video Header (UNTOUCHED) ════════════════════ */}
      <div ref={heroRef} className="bc-hero">

        {videoSrc ? (
          <video
            className={`bc-video${noAnim ? '' : ' bc-video--ken-burns'}`}
            src={videoSrc}
            autoPlay muted loop playsInline
            aria-hidden="true"
          />
        ) : (
          <div
            className={`bc-gradient-placeholder${noAnim ? '' : ' bc-gradient-placeholder--anim'}`}
            aria-hidden="true"
          />
        )}

        <div className="bc-color-wash"  aria-hidden="true" />
        <div className="bc-grain"       aria-hidden="true" />
        <div className="bc-bottom-fade" aria-hidden="true" />

        <div className="bc-hero-content">

          <div
            className="bc-section-label"
            style={{
              opacity:    heroVisible ? 1 : 0,
              transition: noAnim ? 'none' : 'opacity 0.5s ease',
            }}
          />

          <div className="bc-heading-wrap">

            <span className="bc-line1" aria-hidden={noAnim ? undefined : 'true'}>
              {['Where', ' ', 'you'].map((word, wi) =>
                word === ' ' ? (
                  <span key="sp" style={{ display: 'inline-block', width: '0.3em' }} />
                ) : (
                  <span
                    key={word}
                    className={`bc-word${heroVisible ? ' bc-word--in' : ''}`}
                    style={noAnim ? undefined : {
                      transitionDelay: heroVisible ? `${0.2 + (wi === 2 ? 1 : 0) * 0.15}s` : '0s',
                    }}
                  >
                    {word}
                  </span>
                )
              )}
            </span>
            <span
              className="bc-line1"
              aria-hidden={noAnim ? 'true' : undefined}
              style={{
                display:    noAnim ? 'block' : 'none',
                opacity:    heroVisible ? 1 : 0,
                transition: 'opacity 0.5s ease 0.2s',
              }}
            >
              Where you
            </span>

            <span className="bc-line2" aria-label={HEADLINE_2}>
              {noAnim ? (
                <span style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
                  {HEADLINE_2}
                </span>
              ) : (
                letters.map((char, i) => (
                  <AnimatedLetter key={i} char={char} index={i} visible={heroVisible} noAnim={noAnim} />
                ))
              )}
            </span>
          </div>

          <p
            className="bc-hero-subtitle"
            style={{
              opacity:    heroVisible ? 1 : 0,
              transition: noAnim ? 'none' : 'opacity 0.6s ease 0.8s',
            }}
          >
            4 days. World-class artists. The intensive training that
            {!isMobile && <br />}
            {' '}changes the way you move — forever.
          </p>
        </div>

      </div>
      {/* ═══ END ZONE 1 ══════════════════════════════════════════════════════ */}

      {/* ═══ ZONE 2 — The Experience Reel ═══════════════════════════════════ */}
      <ExperienceReel noAnim={noAnim} />

      {/* ═══ ZONE 3 — Kizomba Showcase ══════════════════════════════════════ */}
      <ShowcaseSection data={kizombaShowcase} noAnim={noAnim} />

      {/* ═══ ZONE 4 — Bachata Showcase (reversed) ═══════════════════════════ */}
      <ShowcaseSection data={bachataShowcase} reversed noAnim={noAnim} />

      {/* ═══ ZONE 5 — The Mosaic ═════════════════════════════════════════════ */}
      <TheMosaic noAnim={noAnim} />

      {/* ═══ ZONE 6 — Closing CTA ════════════════════════════════════════════ */}
      <ClosingCTA noAnim={noAnim} />

    </section>
  );
}
