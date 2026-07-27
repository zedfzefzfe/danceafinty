import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GraduationCap,
  Users,
  Heart,
  Music,
  Globe,
  Star,
  Disc3,
  HeartHandshake,
  Camera,
  PartyPopper,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  badgeNumber: '03',
  badgeLabel: 'THE EXPERIENCE',
  headingPlain: 'LIVE THE DANCE AFFINITY ',
  headingAccent: 'EXPERIENCE',
  subtitle1: 'Four days of connection, learning, partying and unforgettable moments.',
  expectLabel: 'WHAT TO EXPECT',
};

// ─── Swap these to use real photo assets ─────────────────────────────────────
const GALLERY = [
  { icon: GraduationCap, line1: 'INSPIRING', line2: 'WORKSHOPS', src: '/images/exp-1.jpg' },
  { icon: Users, line1: 'SOCIAL', line2: 'DANCING', src: '/images/exp-2.jpg' },
  { icon: Heart, line1: 'REAL', line2: 'CONNECTIONS', src: '/images/exp-3.jpg' },
  { icon: Music, line1: 'EPIC', line2: 'PARTIES', src: '/images/exp-4.jpg' },
  { icon: Users, line1: 'LIFELONG', line2: 'FRIENDSHIPS', src: '/images/exp-5.jpg' },
];

const TESTIMONIALS = [
  {
    quote:
      "Dance Affinity is more than a festival, it's a family. I came as a stranger, I left with a heart full of love.",
    name: 'SARAH',
    country: 'FRANCE',
    avatar: '/images/avatar-1.jpg',
  },
  {
    quote:
      "The energy, the people, the vibes... Everything is just perfect. Can't wait for the next edition!",
    name: 'MARCO',
    country: 'ITALY',
    avatar: '/images/avatar-2.jpg',
  },
  {
    quote:
      "Best festival I've ever been to! The bootcamps are next level, and the parties are insane.",
    name: 'JESSICA',
    country: 'NETHERLANDS',
    avatar: '/images/avatar-3.jpg',
  },
];

const STATS = [
  { icon: Heart, value: '400+', label: 'DANCERS' },
  { icon: Globe, value: '20+', label: 'COUNTRIES' },
  { icon: Users, value: '50+', label: 'GUESTS DANCERS' },
  { icon: Star, value: '100%', label: 'GOOD VIBES' },
];

const EXPECT = [
  { icon: GraduationCap, line1: 'TOP QUALITY', line2: 'BOOTCAMPS' },
  { icon: Music, line1: 'SOCIAL DANCING', line2: 'ALL DAY & NIGHT' },
  { icon: Disc3, line1: 'WORLD CLASS', line2: 'DJS' },
  { icon: HeartHandshake, line1: 'A SAFE & INCLUSIVE', line2: 'ENVIRONMENT' },
  { icon: Camera, line1: 'PROFESSIONAL', line2: 'PHOTOS & VIDEOS' },
  { icon: PartyPopper, line1: 'SURPRISES', line2: '& MORE' },
];

const BODY_FONT = "'DM Sans', sans-serif";

// Dotted particle field used on the far left / right edges of the section
const MESH_DOTS = 'radial-gradient(rgba(0,229,204,0.55) 1px, transparent 1px)';

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const expectRef = useRef<HTMLDivElement>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Enable / disable the carousel arrows based on how much room is left to scroll
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        trackRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      [testimonialsRef, statsRef, expectRef].forEach((ref) => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="The Experience"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #0a1020 0%, #0d0d2b 50%, #0a1020 100%)',
      }}
    >
      {/* Dotted-mesh particle field — left edge */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-0 top-0 h-full w-[220px] pointer-events-none opacity-40"
        style={{
          backgroundImage: MESH_DOTS,
          backgroundSize: '16px 16px',
          maskImage: 'radial-gradient(ellipse 70% 45% at 0% 50%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 45% at 0% 50%, #000 0%, transparent 78%)',
        }}
      />
      {/* Dotted-mesh particle field — right edge */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-0 top-0 h-full w-[220px] pointer-events-none opacity-40"
        style={{
          backgroundImage: MESH_DOTS,
          backgroundSize: '16px 16px',
          maskImage: 'radial-gradient(ellipse 70% 45% at 100% 50%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 45% at 100% 50%, #000 0%, transparent 78%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── 1–3) Badge, heading, subtitle ── */}
        <div ref={headerRef} className="text-center">

          {/* Badge */}
          <div className="flex items-center justify-center gap-3 mb-7 md:mb-9">
            <span
              className="flex items-center justify-center w-7 h-7 border border-[#00e5cc]/40 rounded-[2px] font-mono text-[12px] text-[#00e5cc]"
              aria-hidden="true"
            >
              {COPY.badgeNumber}
            </span>
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#00e5cc]">
              {COPY.badgeLabel}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-display uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '0.02em' }}
          >
            <span className="text-white">{COPY.headingPlain}</span>
            <span className="bg-gradient-to-r from-[#00e5cc] via-[#00d3e0] to-[#22a9f0] bg-clip-text text-transparent">
              {COPY.headingAccent}
            </span>
          </h2>

          {/* Thin teal underline accent */}
          <span
            aria-hidden="true"
            className="block mx-auto mt-5 h-[2px] w-16 md:w-20 bg-gradient-to-r from-transparent via-[#00e5cc] to-transparent"
          />

          {/* Subtitle */}
          <div
            className="mx-auto mt-6 md:mt-7 max-w-[760px]"
            style={{
              fontFamily: BODY_FONT,
              fontSize: '15px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
            }}
          >
            <p>{COPY.subtitle1}</p>
            <p>
              It's not just about dance. It's about the{' '}
              <span className="font-script italic text-[#00e5cc] text-[20px] leading-none">people</span>, the{' '}
              <span className="font-script italic text-[#00e5cc] text-[20px] leading-none">energy</span> and the{' '}
              <span className="font-script italic text-[#00e5cc] text-[20px] leading-none">memories</span> we create together.
            </p>
          </div>
        </div>

        {/* ── 4) Gallery carousel ── */}
        <div className="relative mt-12 md:mt-16">

          {/* Prev */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous photos"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-14 z-20 w-10 h-10 items-center justify-center rounded-full border border-[#00e5cc]/40 bg-[#0a1020]/80 text-[#00e5cc] transition-all duration-300 hover:bg-[#00e5cc] hover:text-[#0a1020] disabled:opacity-25 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next photos"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-14 z-20 w-10 h-10 items-center justify-center rounded-full border border-[#00e5cc]/40 bg-[#0a1020]/80 text-[#00e5cc] transition-all duration-300 hover:bg-[#00e5cc] hover:text-[#0a1020] disabled:opacity-25 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
          </button>

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {GALLERY.map(({ icon: Icon, line1, line2, src }) => (
              <div
                key={`${line1}-${line2}`}
                className="relative flex-none snap-start w-[72%] sm:w-[46%] md:w-[calc((100%-4rem)/5)] aspect-[3/4] rounded-lg overflow-hidden border border-white/10 group"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(145deg, #1a0d2e 0%, #0d1a2e 100%)' }}
                />
                <img
                  src={src}
                  alt={`${line1} ${line2}`.toLowerCase()}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Bottom gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(5,8,18,0.95) 0%, rgba(5,8,18,0.55) 25%, transparent 60%)',
                  }}
                />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-3 flex items-center gap-2.5">
                  <Icon className="w-5 h-5 shrink-0 text-[#00e5cc]" strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-display uppercase text-[13px] leading-[1.05] tracking-[0.06em]">
                    <span className="block text-white/75">{line1}</span>
                    <span className="block text-white">{line2}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5) Testimonials ── */}
        <div
          ref={testimonialsRef}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10"
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex gap-3 md:px-7 lg:px-9 first:md:pl-0 last:md:pr-0">
              <Quote
                className="w-6 h-6 shrink-0 text-[#00e5cc] rotate-180"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />

              <div>
                <p
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '13.5px',
                    color: 'rgba(255,255,255,0.62)',
                    lineHeight: 1.7,
                  }}
                >
                  {t.quote}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-white/15 bg-white/5"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden';
                    }}
                  />
                  <div>
                    <p className="font-display text-[13px] tracking-[0.1em] uppercase text-[#00e5cc] leading-tight">
                      {t.name}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 mt-0.5">
                      {t.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 6) Stats bar ── */}
        <div
          ref={statsRef}
          className="mt-14 md:mt-20 rounded-2xl p-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,229,204,0.55) 0%, rgba(34,169,240,0.45) 50%, rgba(0,229,204,0.55) 100%)',
          }}
        >
          <div className="rounded-[15px] bg-[#0a1020] grid grid-cols-2 md:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex items-center justify-center gap-3 px-4 py-7 md:py-8
                  ${i % 2 === 1 ? 'border-l border-white/10' : ''}
                  ${i > 0 ? 'md:border-l md:border-white/10' : ''}
                  ${i < 2 ? 'border-b border-white/10 md:border-b-0' : ''}`}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 shrink-0 text-[#00e5cc]" strokeWidth={1.4} aria-hidden="true" />
                <div>
                  <p className="font-display text-white text-[26px] md:text-[32px] leading-none tracking-[0.02em]">
                    {value}
                  </p>
                  <p className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-white/45 mt-1.5">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7) What to expect ── */}
        <div ref={expectRef} className="mt-14 md:mt-20">

          {/* Label between two divider lines */}
          <div className="flex items-center gap-5">
            <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#00e5cc] whitespace-nowrap">
              {COPY.expectLabel}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-8 md:mt-10 grid grid-cols-3 md:grid-cols-6">
            {EXPECT.map(({ icon: Icon, line1, line2 }, i) => (
              <div
                key={`${line1}-${line2}`}
                className={`flex flex-col items-center text-center gap-3 px-2 py-6 md:py-2
                  ${i % 3 !== 0 ? 'border-l border-white/10' : ''}
                  ${i > 0 ? 'md:border-l md:border-white/10' : ''}
                  ${i < 3 ? 'border-b border-white/10 md:border-b-0' : ''}`}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#00e5cc]" strokeWidth={1.4} aria-hidden="true" />
                <span className="font-display uppercase text-[11px] md:text-[12px] leading-[1.2] tracking-[0.06em] text-white/85">
                  <span className="block">{line1}</span>
                  <span className="block">{line2}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
