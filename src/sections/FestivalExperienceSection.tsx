import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users, Globe, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  kicker: 'ABOUT THE',
  headingLine1: 'FESTIVAL',
  headingLine2: 'THE EXPERIENCE',
  subheading: '4 DAYS OF DANCE, CONNECTION & GROWTH',
  dates: '30 OCTOBER – 02 NOVEMBER',
  year: '2026',
  cityLine1: 'FREIBURG IM BREISGAU',
  cityLine2: 'GERMANY',
  expectLabel: 'WHAT TO EXPECT',
};

// ─── Swap these to use real photo assets ─────────────────────────────────────
const HERO_IMAGE = '/images/festival-hero.jpg';
// Reuses the same logo asset as the navbar
const LOGO = '/images/Copie de Asset 1-8.png';

const EXPECT = [
  {
    title: '3 EPIC PARTIES',
    text: 'Three unforgettable nights of music, energy and non-stop dancing until the early morning.',
    image: '/images/expect-1.jpg',
  },
  {
    title: '2 SOCIALS',
    text: 'Two afternoon socials to practice, connect and enjoy good vibes in a relaxed atmosphere.',
    image: '/images/expect-2.jpg',
  },
  {
    title: '7 BOOTCAMPS',
    text: 'Level up in intensive training by international teachers and take your dance to the next level.',
    image: '/images/expect-3.jpg',
  },
  {
    title: 'WORKSHOPS',
    text: 'Pre-party workshops to get inspired, refine your skills and prepare for an amazing night.',
    image: '/images/expect-4.jpg',
  },
  {
    title: 'A UNIQUE COMMUNITY',
    text: "More than a festival, it's a family. Share, grow and create memories that will last a lifetime.",
    image: '/images/expect-5.jpg',
  },
];

const STATS = [
  { icon: Users, primary: '400+ DANCERS', secondary: 'from around the world' },
  { icon: Globe, primary: '20+ COUNTRIES', secondary: 'one global vibe' },
  { icon: Sparkles, primary: 'ONE AFFINITY', secondary: 'endless connections' },
  { icon: Star, primary: 'BE PART OF', secondary: 'something extraordinary' },
];

const BODY_FONT = "'DM Sans', sans-serif";

export default function FestivalExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTrigger = {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none none',
      };

      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: heroTrigger }
      );

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.1, delay: 0.15, ease: 'power3.out', scrollTrigger: heroTrigger }
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out', scrollTrigger: heroTrigger }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="festival"
      ref={sectionRef}
      aria-label="Festival Experience"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #070c18 0%, #0a1020 55%, #080d1a 100%)' }}
    >
      {/* ══ PART A — Hero band ══════════════════════════════════════════════ */}
      <div className="relative">
        {/* Crowd photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, #1a0d2e 0%, #0d1a2e 100%)' }}
        />
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Heavy on the left so the copy stays readable, lighter on the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(7,12,24,0.97) 0%, rgba(7,12,24,0.93) 30%, rgba(7,12,24,0.72) 55%, rgba(7,12,24,0.45) 80%, rgba(7,12,24,0.55) 100%)',
          }}
        />
        {/* Soften the top and bottom edges into the section background */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7,12,24,0.9) 0%, transparent 22%, transparent 72%, rgba(8,13,26,0.95) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr_0.75fr] items-center gap-12 lg:gap-8">

            {/* ── LEFT: copy ── */}
            <div ref={heroTextRef}>
              {/* Kicker + rule */}
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-white/60 whitespace-nowrap">
                  {COPY.kicker}
                </span>
                <span aria-hidden="true" className="h-px w-16 md:w-24 bg-white/25" />
              </div>

              {/* Heading */}
              <h2
                className="font-display uppercase text-white leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '0.06em' }}
              >
                {COPY.headingLine1}
              </h2>
              <p
                className="font-display uppercase text-[#00e5cc] mt-1"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)', letterSpacing: '0.3em' }}
              >
                {COPY.headingLine2}
              </p>

              {/* Subheading */}
              <p
                className="mt-6 uppercase font-semibold tracking-[0.06em]"
                style={{ fontFamily: BODY_FONT, fontSize: '12.5px', color: 'rgba(255,255,255,0.9)' }}
              >
                {COPY.subheading}
              </p>

              {/* Paragraphs */}
              <p
                className="mt-4 max-w-[420px]"
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: '13.5px',
                  color: 'rgba(255,255,255,0.62)',
                  lineHeight: 1.75,
                }}
              >
                Dance Affinity Festival is more than an event,{' '}
                <span className="text-[#00e5cc]">it's a journey.</span> Dive into a world of rhythm,
                connection and unforgettable moments.
              </p>

              <span aria-hidden="true" className="block mt-6 mb-6 h-px w-40 bg-white/15" />

              <p
                className="max-w-[420px]"
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: '13.5px',
                  color: 'rgba(255,255,255,0.62)',
                  lineHeight: 1.75,
                }}
              >
                Whether you come to learn, to dance, or to connect —{' '}
                <span className="text-[#00e5cc]">you'll leave transformed.</span>
              </p>
            </div>

            {/* ── CENTER: logo ── */}
            <div ref={logoRef} className="flex justify-center">
              <img
                src={LOGO}
                alt="Dance Affinity"
                className="w-[220px] sm:w-[280px] lg:w-full max-w-[360px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(0,229,204,0.35))' }}
              />
            </div>

            {/* ── RIGHT: date + location ── */}
            <div ref={infoRef} className="lg:justify-self-end">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 shrink-0 text-[#00e5cc] mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p
                    className="uppercase tracking-[0.1em]"
                    style={{ fontFamily: BODY_FONT, fontSize: '11.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}
                  >
                    {COPY.dates}
                  </p>
                  <p className="font-display text-[#00e5cc] text-[30px] md:text-[34px] leading-none tracking-[0.12em] mt-1">
                    {COPY.year}
                  </p>
                </div>
              </div>

              <span aria-hidden="true" className="block my-6 h-px w-full max-w-[210px] bg-white/15" />

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-[#00e5cc] mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                <div
                  className="uppercase tracking-[0.1em]"
                  style={{ fontFamily: BODY_FONT, fontSize: '11.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}
                >
                  <p>{COPY.cityLine1}</p>
                  <p className="text-white/45">{COPY.cityLine2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Divider — WHAT TO EXPECT ════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-5">
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#00e5cc] whitespace-nowrap">
            {COPY.expectLabel}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>

        {/* ══ PART B — What to expect cards ═════════════════════════════════ */}
        <div
          ref={cardsRef}
          className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {EXPECT.map(({ title, text, image }) => (
            <div
              key={title}
              className="group relative flex min-h-[300px] md:min-h-[330px] overflow-hidden rounded-xl border border-white/10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(150deg, #14243a 0%, #0d1a2e 100%)' }}
              />
              <img
                src={image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Scrim anchored to the bottom only — photo stays bright up top */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(6,10,20,0.92) 0%, rgba(6,10,20,0.6) 30%, transparent 55%)',
                }}
              />

              <div className="relative flex flex-1 flex-col p-5">
                <div className="mt-auto">
                  <h3 className="font-display uppercase text-white text-[15px] tracking-[0.05em] leading-tight">
                    {title}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: BODY_FONT,
                      fontSize: '11.5px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.65,
                    }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Stats bar ═══════════════════════════════════════════════════════ */}
      <div
        ref={statsRef}
        className="relative z-10 mt-14 md:mt-20 border-t border-white/10 bg-black/25"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map(({ icon: Icon, primary, secondary }, i) => (
              <div
                key={primary}
                className={`flex items-center justify-center gap-3 px-4 py-7 md:py-8
                  ${i % 2 === 1 ? 'border-l border-white/10' : ''}
                  ${i > 0 ? 'md:border-l md:border-white/10' : ''}
                  ${i < 2 ? 'border-b border-white/10 md:border-b-0' : ''}`}
              >
                <Icon className="w-7 h-7 shrink-0 text-[#00e5cc]" strokeWidth={1.4} aria-hidden="true" />
                <div>
                  <p
                    className="uppercase font-semibold tracking-[0.06em]"
                    style={{ fontFamily: BODY_FONT, fontSize: '12.5px', color: 'rgba(255,255,255,0.92)' }}
                  >
                    {primary}
                  </p>
                  <p
                    className="mt-0.5"
                    style={{ fontFamily: BODY_FONT, fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {secondary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
