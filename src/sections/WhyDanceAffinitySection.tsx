import { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { revealOnView } from '../lib/reveal';
import { Users, GraduationCap, Globe, Camera } from 'lucide-react';

// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  badgeLabel: 'WHY DANCE AFFINITY?',
  headingLine1a: 'MORE THAN',
  headingLine1b: 'A FESTIVAL.',
  headingLine2: 'A COMMUNITY.',
  intro:
    "Dance Affinity is more than dance. It's a place where people from all over the world come together to learn, share, grow and celebrate. A warm atmosphere, high quality bootcamps, amazing parties and a family you'll never forget.",
};

const FEATURES = [
  {
    icon: Users,
    title: 'WARM COMMUNITY',
    text: 'A welcoming and inclusive atmosphere where everyone feels at home.',
  },
  {
    icon: GraduationCap,
    title: 'QUALITY BOOTCAMPS',
    text: "Premium bootcamps with the world's best teachers to take your skills to the next level.",
  },
  {
    icon: Globe,
    title: 'WORLDWIDE CONNECTIONS',
    text: 'Dancers from 25+ countries united by the same passion for dance.',
  },
  {
    icon: Camera,
    title: 'UNFORGETTABLE MEMORIES',
    text: 'Unique moments, lifelong friendships and memories that last forever.',
  },
];

// ─── Swap these to use real photo assets ─────────────────────────────────────
const PHOTOS = {
  hug: { src: '/images/why dance affinity.png', alt: 'Dancers embracing at the festival' },
  crowd: { src: '/images/60.png', alt: 'A circle of dancers celebrating under stage lights' },
};

const BODY_FONT = "'DM Sans', sans-serif";

export default function WhyDanceAffinitySection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hugRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: textRef.current,
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: sectionRef.current,
        targets: hugRef.current,
        from: { opacity: 0, y: 40 },
        to: {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: isMobile ? 0 : 0.18,
        },
      }),
      revealOnView({
        trigger: cardsRef.current,
        targets: cardsRef.current?.children,
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
      }),
      revealOnView({
        targets: bandRef.current,
        from: { opacity: 0 },
        to: { opacity: 1, duration: 1.1, ease: 'power2.out' },
      }),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [isMobile]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="Why Dance Affinity"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1929 0%, #0d0d2b 50%, #1a1a3e 100%)',
      }}
    >
      {/* Ambient glow accents */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% 60%, rgba(0,229,204,0.06) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 85% 15%, rgba(200,0,255,0.05) 0%, transparent 50%)',
        }}
      />

      {/* ── TOP-RIGHT PHOTO (desktop only) — edges fade into the background ── */}
      <div
        ref={hugRef}
        aria-hidden="true"
        className="hidden md:block absolute top-0 right-0 w-[48%] max-w-[680px] h-[420px] lg:h-[540px] z-[1]"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 55%), linear-gradient(to top, transparent 0%, #000 45%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 55%), linear-gradient(to top, transparent 0%, #000 45%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(145deg, #1a0d2e 0%, #0d1a2e 100%)' }}
        />
        <img
          src={PHOTOS.hug.src}
          alt=""
          className="relative w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* ── Content container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 md:pt-32 pb-14 md:pb-24">
        <div ref={textRef} className="md:max-w-[56%] lg:max-w-[620px]">

          {/* 1) Section badge */}
          <div className="mb-7 md:mb-9 text-center md:text-left">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#00e5cc]">
              {COPY.badgeLabel}
            </span>
          </div>

          {/* 2) Heading */}
          <h2
            className="font-display uppercase leading-[0.95] text-center md:text-left mb-6 md:mb-7"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', letterSpacing: '0.02em' }}
          >
            <span className="block text-white">
              {COPY.headingLine1a}
              <br className="md:hidden" />{' '}
              {COPY.headingLine1b}
            </span>
            <span
              className="block bg-gradient-to-r from-[#00e5cc] via-[#00d3e0] to-[#22a9f0] bg-clip-text text-transparent"
            >
              {COPY.headingLine2}
            </span>
          </h2>

          {/* 3) Intro paragraph */}
          <p
            className="text-center md:text-left mx-auto md:mx-0"
            style={{
              fontFamily: BODY_FONT,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              maxWidth: '480px',
            }}
          >
            {COPY.intro}
          </p>
        </div>

        {/* 5) Feature cards — 4-up on desktop, divided list on mobile */}
        <div
          ref={cardsRef}
          className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-4 md:gap-5 lg:gap-6"
        >
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-4 py-5 border-b border-white/10 last:border-b-0
                         md:flex-col md:items-center md:gap-0 md:py-9 md:px-6 md:rounded-lg
                         md:bg-white/5 md:border md:border-white/10 md:last:border md:transition-colors md:duration-300 md:hover:border-[#00e5cc]/30"
            >
              <Icon
                className="w-6 h-6 md:w-9 md:h-9 shrink-0 text-[#00e5cc] md:mb-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div className="md:flex md:flex-col md:items-center md:w-full">
                <h3
                  className="font-display text-white uppercase text-[15px] md:text-base tracking-[0.06em] leading-tight md:text-center"
                >
                  {title}
                </h3>

                {/* Teal divider (desktop card style) */}
                <span
                  aria-hidden="true"
                  className="hidden md:block w-8 h-px bg-[#00e5cc] my-5"
                />

                <p
                  className="mt-1.5 md:mt-0 md:text-center"
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6) Bottom photo band — full-bleed, top edge blends into the section ── */}
      <div className="relative z-[1] w-full">
        <div
          ref={bandRef}
          className="relative w-full h-[240px] sm:h-[320px] lg:h-[440px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 42%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 42%)',
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(155deg, #1a1a3e 0%, #0d1a2e 100%)' }}
          />
          <img
            src={PHOTOS.crowd.src}
            alt={PHOTOS.crowd.alt}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Dark scrim on the top edge so the photo blends up into the section */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(13,13,43,0.85) 0%, rgba(13,13,43,0.25) 35%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
