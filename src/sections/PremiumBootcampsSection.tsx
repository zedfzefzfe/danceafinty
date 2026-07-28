import { useEffect, useRef, useState } from 'react';
import { revealOnView } from '../lib/reveal';
import {
  Users,
  Clock,
  Zap,
  MessageSquare,
  Globe,
  Bell,
  Check,
  Undo2,
  MousePointerClick,
  PersonStanding,
  Heart,
  ArrowRight,
} from 'lucide-react';


// ─── Data model ──────────────────────────────────────────────────────────────
type Bootcamp = {
  id: string;
  name: string;
  category: 'kizomba' | 'bachata';
  intensity: string;
  teacherNames: string[];
  teacherCount: number;
  hours: number;
  image: string;
  comingSoon?: boolean;
  // Back (flip) details
  whatToExpect: string[];
  whoIsItFor: string;
  level: string;
  focus: string[];
  maxParticipants: number;
};

const BOOTCAMPS: Bootcamp[] = [
  {
    id: 'evokeez',
    name: 'EVOKEEZ',
    category: 'kizomba',
    intensity: 'INTENSIVE',
    teacherNames: ['Martina & Lea', 'Daniel & Elina', 'Loyal - Vanildo Eyk & Mara'],
    teacherCount: 6,
    hours: 3,
    image: '/images/bootcamp-evokeez.jpg',
    whatToExpect: [
      'Lightness in your movements',
      'Creative & inspired transitions',
      'Musicality & rhythm connection',
      'Personal styling & expression',
      'Fun, energy and good vibes',
    ],
    whoIsItFor:
      'Dancers who want to refine their style, move with more fluidity and express themselves with confidence.',
    level: 'Intermediate / Advanced',
    focus: ['Musicality', 'Flow', 'Creativity', 'Connection', 'Expression'],
    maxParticipants: 40,
  },
  {
    id: 'urban-groundedness',
    name: 'URBAN GROUNDEDNESS',
    category: 'kizomba',
    intensity: 'INTENSIVE',
    teacherNames: ['Antho & Caro'],
    teacherCount: 3,
    hours: 3,
    image: '/images/bootcamp-urban-groundedness.jpg',
    // TODO — back details to be filled in
    whatToExpect: ['TODO — add what to expect'],
    whoIsItFor: 'TODO — describe who this bootcamp is for.',
    level: 'TODO',
    focus: ['TODO'],
    maxParticipants: 40,
  },
  {
    id: 'genkiz',
    name: 'GENKIZ',
    category: 'kizomba',
    intensity: 'INTENSIVE',
    teacherNames: ['Vanildo Eyk & Mara'],
    teacherCount: 2,
    hours: 3,
    image: '/images/bootcamp-genkiz.jpg',
    // TODO — back details to be filled in
    whatToExpect: ['TODO — add what to expect'],
    whoIsItFor: 'TODO — describe who this bootcamp is for.',
    level: 'TODO',
    focus: ['TODO'],
    maxParticipants: 40,
  },
  {
    id: 'loyal-musicality-secrets',
    name: 'LOYAL MUSICALITY SECRETS',
    category: 'kizomba',
    intensity: 'INTENSIVE',
    teacherNames: ['Loyal & Vanildo Eyk'],
    teacherCount: 5,
    hours: 3,
    image: '/images/bootcamp-loyal-musicality-secrets.jpg',
    // TODO — back details to be filled in
    whatToExpect: ['TODO — add what to expect'],
    whoIsItFor: 'TODO — describe who this bootcamp is for.',
    level: 'TODO',
    focus: ['TODO'],
    maxParticipants: 40,
  },
  {
    id: 'foundation-evolution',
    name: 'FOUNDATION & EVOLUTION',
    category: 'kizomba',
    intensity: 'INTENSIVE',
    teacherNames: ['Selim & Anastasia'],
    teacherCount: 2,
    hours: 3,
    image: '/images/bootcamp-foundation-evolution.jpg',
    // TODO — back details to be filled in
    whatToExpect: ['TODO — add what to expect'],
    whoIsItFor: 'TODO — describe who this bootcamp is for.',
    level: 'TODO',
    focus: ['TODO'],
    maxParticipants: 40,
  },
  {
    id: 'bachata-1',
    name: 'BACHATA BOOTCAMP',
    category: 'bachata',
    intensity: 'INTENSIVE',
    teacherNames: [],
    teacherCount: 0,
    hours: 3,
    image: '',
    comingSoon: true,
    whatToExpect: [],
    whoIsItFor: '',
    level: 'TODO',
    focus: [],
    maxParticipants: 40,
  },
  {
    id: 'bachata-2',
    name: 'BACHATA BOOTCAMP',
    category: 'bachata',
    intensity: 'INTENSIVE',
    teacherNames: [],
    teacherCount: 0,
    hours: 3,
    image: '',
    comingSoon: true,
    whatToExpect: [],
    whoIsItFor: '',
    level: 'TODO',
    focus: [],
    maxParticipants: 40,
  },
];

// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  badgeLabel: 'PREMIUM BOOTCAMPS',
  headingLine1: 'LEVEL UP YOUR DANCE',
  headingLine2: '7 PREMIUM BOOTCAMPS',
  subtitle1: 'Intensive training. World-class teachers. Real transformation.',
  subtitle2: 'Choose your experience and take your dance to the next level.',
  hintFlip: 'CLICK ON A BOOTCAMP TO DISCOVER MORE',
  hintLimited:
    'Each bootcamp is limited to ensure quality, personalized feedback and the best experience.',
  ctaTitle: 'READY TO TRANSFORM YOUR DANCE?',
  ctaSubtitle: 'Spots are limited. Choose your bootcamps and secure your pass today!',
  ctaButton: 'GET YOUR PASS',
  ctaTarget: '#passes',
};

const FEATURES = [
  { icon: Zap, title: 'INTENSIVE TRAINING', text: 'Maximize your potential in a short time' },
  { icon: Users, title: 'WORLD-CLASS TEACHERS', text: 'Learn from passionate and experienced artists' },
  { icon: MessageSquare, title: 'PERSONALIZED FEEDBACK', text: 'Get individual feedback to grow faster' },
  { icon: Globe, title: 'UNFORGETTABLE EXPERIENCE', text: 'Connect, share and grow with dancers worldwide' },
];

const BODY_FONT = "'DM Sans', sans-serif";
const LEVEL_SEGMENTS = 6;

// Rough fill for the segmented level indicator — TODO levels land mid-scale.
function levelFill(level: string): number {
  const l = level.toLowerCase();
  if (l.includes('advanced')) return l.includes('intermediate') ? 5 : 6;
  if (l.includes('intermediate')) return 4;
  if (l.includes('improver')) return 3;
  if (l.includes('beginner')) return 2;
  return 3;
}

// ─── Flip card ───────────────────────────────────────────────────────────────
function BootcampCard({
  bootcamp,
  flipped,
  onToggle,
  reduceMotion,
}: {
  bootcamp: Bootcamp;
  flipped: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const faceBase = 'absolute inset-0 rounded-xl overflow-hidden border border-white/10';

  // With reduced motion the faces cross-fade in place instead of rotating in 3D.
  const faceStyle = (isBack: boolean) =>
    reduceMotion
      ? {
          opacity: flipped === isBack ? 1 : 0,
          pointerEvents: (flipped === isBack ? 'auto' : 'none') as 'auto' | 'none',
          transition: 'opacity 0.3s ease',
        }
      : {
          backfaceVisibility: 'hidden' as const,
          WebkitBackfaceVisibility: 'hidden' as const,
          transform: isBack ? 'rotateY(180deg)' : undefined,
        };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${bootcamp.name} bootcamp — show ${flipped ? 'photo' : 'details'}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      className="relative aspect-[3/4] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00e5cc]/60 rounded-xl"
      style={reduceMotion ? undefined : { perspective: '1400px' }}
    >
      <div
        className="relative w-full h-full"
        style={
          reduceMotion
            ? undefined
            : {
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }
        }
      >
        {/* ── FRONT ── */}
        <div className={faceBase} style={faceStyle(false)}>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(145deg, #14384a 0%, #0d1a2e 100%)' }}
          />
          <img
            src={bootcamp.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Teal / cyan gradient wash rising from the bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,110,110,0.92) 0%, rgba(0,90,110,0.6) 32%, rgba(10,16,32,0.15) 62%, transparent 100%)',
            }}
          />

          {/* Intensity badge */}
          <span className="absolute top-3 left-3 px-2 py-1 rounded-[3px] bg-[#0a1020]/75 border border-[#00e5cc]/30 font-mono text-[8px] tracking-[0.18em] uppercase text-[#00e5cc]">
            {bootcamp.intensity}
          </span>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-center">
            <h3
              className="font-display text-white uppercase leading-[0.95] tracking-[0.02em]"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
            >
              {bootcamp.name}
            </h3>
            <p className="font-display uppercase text-[#00e5cc] tracking-[0.22em] text-[13px] md:text-[14px] leading-none mt-1">
              BOOTCAMP
            </p>

            <div className="mt-3 space-y-0.5">
              {bootcamp.teacherNames.map((t) => (
                <p
                  key={t}
                  className="uppercase tracking-[0.06em]"
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.72)',
                    lineHeight: 1.5,
                  }}
                >
                  {t}
                </p>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-center gap-4 text-white/75">
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] uppercase">
                <Users className="w-3.5 h-3.5 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                {bootcamp.teacherCount} teachers
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] uppercase">
                <Clock className="w-3.5 h-3.5 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                {bootcamp.hours} hours
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className={`${faceBase} bg-[#0b1626]`}
          style={faceStyle(true)}
        >
          <div className="h-full overflow-y-auto scrollbar-hide p-4 md:p-5">
            <h3 className="font-display uppercase leading-none tracking-[0.02em] text-[17px] md:text-[19px]">
              <span className="text-[#00e5cc]">{bootcamp.name}</span>{' '}
              <span className="text-white">BOOTCAMP</span>
            </h3>

            {/* What to expect */}
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#00e5cc] mt-4 mb-2">
              What to expect
            </p>
            <ul className="space-y-1">
              {bootcamp.whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 mt-[3px] shrink-0 text-[#00e5cc]" strokeWidth={2.5} aria-hidden="true" />
                  <span
                    style={{
                      fontFamily: BODY_FONT,
                      fontSize: '10.5px',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Who is it for */}
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#00e5cc] mt-4 mb-2">
              Who is it for?
            </p>
            <p
              style={{
                fontFamily: BODY_FONT,
                fontSize: '10.5px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.55,
              }}
            >
              {bootcamp.whoIsItFor}
            </p>

            {/* Details block */}
            <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
              {/* Level */}
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40">Level</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex gap-1">
                  {Array.from({ length: LEVEL_SEGMENTS }).map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className={`block w-3.5 h-1 rounded-full ${
                        i < levelFill(bootcamp.level) ? 'bg-[#00e5cc]' : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
                <span
                  className="uppercase tracking-[0.06em]"
                  style={{ fontFamily: BODY_FONT, fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}
                >
                  {bootcamp.level}
                </span>
              </div>

              {/* Focus */}
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 mt-3">Focus</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {bootcamp.focus.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 rounded-full border border-[#00e5cc]/35 text-[#00e5cc] uppercase tracking-[0.08em]"
                    style={{ fontFamily: BODY_FONT, fontSize: '8.5px' }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Details */}
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 mt-3">Details</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-white/70">
                <span className="flex items-center gap-1 font-mono text-[8.5px] tracking-[0.08em] uppercase">
                  <Users className="w-3 h-3 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                  {bootcamp.teacherCount} teachers
                </span>
                <span className="flex items-center gap-1 font-mono text-[8.5px] tracking-[0.08em] uppercase">
                  <Clock className="w-3 h-3 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                  {bootcamp.hours} hours
                </span>
                <span className="flex items-center gap-1 font-mono text-[8.5px] tracking-[0.08em] uppercase">
                  <Users className="w-3 h-3 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                  max {bootcamp.maxParticipants} participants
                </span>
              </div>
            </div>

            {/* Flip back affordance */}
            <p className="flex items-center justify-center gap-1.5 mt-4 font-mono text-[8px] tracking-[0.18em] uppercase text-white/40">
              <Undo2 className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
              back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Coming soon card (does not flip) ────────────────────────────────────────
// `compact` is the half-height variant used when two of them share one grid cell.
function ComingSoonCard({ bootcamp, compact = false }: { bootcamp: Bootcamp; compact?: boolean }) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-[#8b5cf6]/25 ${
        compact ? 'h-full min-h-0' : 'aspect-[3/4]'
      }`}
      style={{ background: 'linear-gradient(160deg, #2a1155 0%, #1b0f3d 55%, #140b2e 100%)' }}
    >
      {/* Silhouette placeholder */}
      <Users
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 ${
          compact ? 'top-[42%] w-14 h-14' : 'top-[30%] w-20 h-20'
        }`}
        strokeWidth={1}
        aria-hidden="true"
      />

      <div
        className={`absolute inset-x-0 text-center ${
          compact ? 'inset-y-0 flex flex-col justify-center p-4' : 'bottom-0 p-5'
        }`}
      >
        <p
          className={`font-mono tracking-[0.2em] uppercase text-[#c4b5fd]/70 ${
            compact ? 'text-[7.5px]' : 'text-[8px]'
          }`}
        >
          {bootcamp.name}
        </p>
        <h3
          className={`font-display text-white uppercase leading-none tracking-[0.03em] ${
            compact ? 'text-[21px] mt-1.5' : 'text-[26px] md:text-[30px] mt-2'
          }`}
        >
          COMING SOON
        </h3>
        <p
          className={`font-mono tracking-[0.22em] uppercase text-white/45 ${
            compact ? 'text-[8px] mt-1.5' : 'text-[9px] mt-2'
          }`}
        >
          STAY TUNED
        </p>

        <button
          type="button"
          className={`w-full flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 text-white/85 font-mono tracking-[0.15em] uppercase transition-colors duration-300 hover:border-[#c4b5fd]/60 hover:text-white ${
            compact ? 'mt-3 px-3 py-2 text-[8px]' : 'mt-5 px-4 py-2.5 text-[9px]'
          }`}
        >
          Get notified
          <Bell className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PremiumBootcampsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<'kizomba' | 'bachata'>('kizomba');
  const [flippedIds, setFlippedIds] = useState<string[]>([]);

  const reduceMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const kizomba = BOOTCAMPS.filter((b) => b.category === 'kizomba');
  const bachata = BOOTCAMPS.filter((b) => b.category === 'bachata');
  const visible = activeCategory === 'kizomba' ? kizomba : bachata;

  const toggleFlip = (id: string) =>
    setFlippedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Entrance animations
  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: headerRef.current,
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: gridRef.current,
        targets: gridRef.current?.children,
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
      }),
      ...[featuresRef, ctaRef].map((ref) =>
        revealOnView({
          targets: ref.current,
          from: { opacity: 0, y: 30 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        })
      ),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  const tabs = [
    { key: 'kizomba' as const, icon: PersonStanding, label: `KIZOMBA BOOTCAMPS (${kizomba.length})`, soon: false },
    { key: 'bachata' as const, icon: Heart, label: `BACHATA BOOTCAMPS (${bachata.length})`, soon: true },
  ];

  return (
    <section
      id="bootcamps"
      ref={sectionRef}
      aria-label="Premium Bootcamps"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #070c18 0%, #0b1224 45%, #0a1020 100%)',
      }}
    >
      {/* Ambient glow accents */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 25%, rgba(0,229,204,0.06) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 80% 70%, rgba(139,92,246,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── 1–4) Badge, heading, subtitle, tabs ── */}
        <div ref={headerRef} className="text-center">

          {/* Badge */}
          <div className="mb-7 md:mb-9">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#00e5cc]">
              {COPY.badgeLabel}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-display uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '0.02em' }}
          >
            <span className="block text-white">{COPY.headingLine1}</span>
            <span className="block bg-gradient-to-r from-[#00e5cc] via-[#00d3e0] to-[#22a9f0] bg-clip-text text-transparent">
              {COPY.headingLine2}
            </span>
          </h2>

          {/* Subtitle */}
          <div
            className="mx-auto mt-6 md:mt-7 max-w-[620px]"
            style={{
              fontFamily: BODY_FONT,
              fontSize: '15px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
            }}
          >
            <p>{COPY.subtitle1}</p>
            <p>{COPY.subtitle2}</p>
          </div>

          {/* Category tabs */}
          <div className="mt-9 md:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3">
            {tabs.map(({ key, icon: Icon, label, soon }) => {
              const active = activeCategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  aria-pressed={active}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 md:px-7 py-3 rounded-md border transition-all duration-300 ${
                    active
                      ? 'border-[#00e5cc]/60 bg-[#00e5cc]/10 text-white'
                      : 'border-white/12 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white/85'
                  }`}
                  style={active ? { boxShadow: '0 0 24px rgba(0,229,204,0.18)' } : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${active ? 'text-[#00e5cc]' : 'text-white/45'}`}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase whitespace-nowrap">
                    {label}
                  </span>
                  {soon && (
                    <span className="px-1.5 py-0.5 rounded-[3px] bg-[#8b5cf6]/20 border border-[#8b5cf6]/35 font-mono text-[7.5px] tracking-[0.12em] uppercase text-[#c4b5fd]">
                      Coming soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 5) Helper lines + grid ── */}
        <div className="mt-12 md:mt-14 flex flex-col items-center gap-2.5 text-center">
          <p className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-[#00e5cc]">
            <MousePointerClick className="w-4 h-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
            {COPY.hintFlip}
          </p>
          <p
            className="flex items-start sm:items-center gap-2 max-w-[520px]"
            style={{
              fontFamily: BODY_FONT,
              fontSize: '11.5px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}
          >
            <Users className="w-4 h-4 shrink-0 text-[#00e5cc]/70 mt-0.5 sm:mt-0" strokeWidth={1.6} aria-hidden="true" />
            {COPY.hintLimited}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {visible.map((bootcamp) =>
            bootcamp.comingSoon ? (
              <ComingSoonCard key={bootcamp.id} bootcamp={bootcamp} />
            ) : (
              <BootcampCard
                key={bootcamp.id}
                bootcamp={bootcamp}
                flipped={flippedIds.includes(bootcamp.id)}
                onToggle={() => toggleFlip(bootcamp.id)}
                reduceMotion={reduceMotion}
              />
            )
          )}

          {/* The two Bachata teasers share the last cell, stacked — as in the reference */}
          {activeCategory === 'kizomba' && (
            <div className="grid grid-rows-2 gap-5 md:gap-6 aspect-[3/4]">
              {bachata.map((b) => (
                <ComingSoonCard key={b.id} bootcamp={b} compact />
              ))}
            </div>
          )}
        </div>

        {/* ── 6) Feature strip ── */}
        <div
          ref={featuresRef}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="w-6 h-6 md:w-7 md:h-7 shrink-0 text-[#00e5cc]" strokeWidth={1.4} aria-hidden="true" />
              <div>
                <h3 className="font-display text-white uppercase text-[13px] md:text-[14px] tracking-[0.06em] leading-tight">
                  {title}
                </h3>
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '11.5px',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 7) Bottom CTA bar ── */}
        <div
          ref={ctaRef}
          className="mt-12 md:mt-16 rounded-xl border border-white/10 bg-white/[0.03] px-6 md:px-9 py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        >
          <div className="text-center md:text-left">
            <p className="font-display text-white uppercase text-[19px] md:text-[22px] tracking-[0.04em] leading-tight">
              {COPY.ctaTitle}
            </p>
            <p
              className="mt-1.5"
              style={{
                fontFamily: BODY_FONT,
                fontSize: '12.5px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
              }}
            >
              {COPY.ctaSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection(COPY.ctaTarget)}
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 shrink-0"
          >
            {COPY.ctaButton}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
