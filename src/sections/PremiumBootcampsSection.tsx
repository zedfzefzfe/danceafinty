import { useEffect, useRef, useState } from 'react';
import { revealOnView } from '../lib/reveal';
import { useCopy, type Lang } from '../i18n/LanguageContext';
import {
  Users,
  Zap,
  MessageSquare,
  Globe,
  Bell,
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
  // Set this to show a poster on the flip side instead of the text details.
  backImage?: string;
  // Back (flip) details — ignored when `backImage` is set
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
    image: '/images/bootcamps/Evokeeez_bootcamp_1.png',
    backImage: '/images/bootcamps/evokeez_evokeez_2.png',
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
    image: '/images/bootcamps/bootcamp_Urban groundness_sLide 1.png',
    backImage: '/images/bootcamps/bootcamps_groundedness_slide2.png',
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
    image: '/images/bootcamps/bootcamp_genkiz_slide 1.2.png',
    backImage: '/images/bootcamps/genkiz bootcamp_slide 2.png',
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
    image: '/images/bootcamps/bootcamp_musicality secrets_slide 1.png',
    backImage: '/images/bootcamps/musicality bootcamp_slide2.png',
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
    image: '/images/bootcamps/bootcamp_foundation & evolution4.png',
    backImage: '/images/bootcamps/foundation & evolution bootcamp_2slide.png',
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
const CTA_TARGET = '#passes';

interface BcCopy {
  badgeLabel: string; headingLine1: string; headingLine2: string;
  subtitle1: string; subtitle2: string; hintFlip: string; hintLimited: string;
  ctaTitle: string; ctaSubtitle: string; ctaButton: string;
  tabKizomba: string; tabBachata: string;
  comingSoon: string; stayTuned: string; getNotified: string;
}

const COPY_I18N: Record<Lang, BcCopy> = {
  en: {
    badgeLabel: 'PREMIUM BOOTCAMPS',
    headingLine1: 'LEVEL UP YOUR DANCE',
    headingLine2: '7 PREMIUM BOOTCAMPS',
    subtitle1: 'Intensive training. World-class teachers. Real transformation.',
    subtitle2: 'Choose your experience and take your dance to the next level.',
    hintFlip: 'CLICK ON A BOOTCAMP TO DISCOVER MORE',
    hintLimited: 'Each bootcamp is limited to ensure quality, personalized feedback and the best experience.',
    ctaTitle: 'READY TO TRANSFORM YOUR DANCE?',
    ctaSubtitle: 'Spots are limited. Choose your bootcamps and secure your pass today!',
    ctaButton: 'GET YOUR PASS',
    tabKizomba: 'KIZOMBA BOOTCAMPS', tabBachata: 'BACHATA BOOTCAMPS',
    comingSoon: 'COMING SOON', stayTuned: 'STAY TUNED', getNotified: 'Get notified',
  },
  de: {
    badgeLabel: 'PREMIUM BOOTCAMPS',
    headingLine1: 'BRING DEINEN TANZ AUFS NÄCHSTE LEVEL',
    headingLine2: '7 PREMIUM-BOOTCAMPS',
    subtitle1: 'Intensives Training. Weltklasse-Lehrer. Echte Weiterentwicklung.',
    subtitle2: 'Wähle dein Erlebnis und bring deinen Tanz auf das nächste Level.',
    hintFlip: 'KLICKE AUF EIN BOOTCAMP, UM MEHR ZU ENTDECKEN',
    hintLimited: 'Jedes Bootcamp ist begrenzt, um Qualität, individuelles Feedback und das beste Erlebnis zu gewährleisten.',
    ctaTitle: 'BEREIT, DEINEN TANZ ZU VERWANDELN?',
    ctaSubtitle: 'Die Plätze sind begrenzt. Wähle deine Bootcamps und sichere dir noch heute dein Ticket!',
    ctaButton: 'TICKETS SICHERN',
    tabKizomba: 'KIZOMBA BOOTCAMPS', tabBachata: 'BACHATA BOOTCAMPS',
    comingSoon: 'DEMNÄCHST', stayTuned: 'BLEIB DRAN', getNotified: 'Benachrichtigen',
  },
  fr: {
    badgeLabel: 'BOOTCAMPS PREMIUM',
    headingLine1: 'FAIS PASSER TA DANSE AU NIVEAU SUPÉRIEUR',
    headingLine2: '7 BOOTCAMPS PREMIUM',
    subtitle1: 'Entraînement intensif. Des professeurs de classe mondiale. Une vraie transformation.',
    subtitle2: 'Choisis ton expérience et fais passer ta danse au niveau supérieur.',
    hintFlip: 'CLIQUE SUR UN BOOTCAMP POUR EN DÉCOUVRIR PLUS',
    hintLimited: 'Chaque bootcamp est limité pour garantir la qualité, un feedback personnalisé et la meilleure expérience.',
    ctaTitle: 'PRÊT À TRANSFORMER TA DANSE ?',
    ctaSubtitle: 'Les places sont limitées. Choisis tes bootcamps et réserve ta place dès aujourd’hui !',
    ctaButton: 'RÉSERVE TA PLACE',
    tabKizomba: 'BOOTCAMPS KIZOMBA', tabBachata: 'BOOTCAMPS BACHATA',
    comingSoon: 'BIENTÔT', stayTuned: 'RESTE CONNECTÉ', getNotified: 'Être notifié',
  },
};

const FEATURE_ICONS = [Zap, Users, MessageSquare, Globe];
const FEATURES_I18N: Record<Lang, { title: string; text: string }[]> = {
  en: [
    { title: 'INTENSIVE TRAINING', text: 'Maximize your potential in a short time' },
    { title: 'WORLD-CLASS TEACHERS', text: 'Learn from passionate and experienced artists' },
    { title: 'PERSONALIZED FEEDBACK', text: 'Get individual feedback to grow faster' },
    { title: 'UNFORGETTABLE EXPERIENCE', text: 'Connect, share and grow with dancers worldwide' },
  ],
  de: [
    { title: 'INTENSIVES TRAINING', text: 'Nutze dein Potenzial in kurzer Zeit voll aus' },
    { title: 'WELTKLASSE-LEHRER', text: 'Lerne von leidenschaftlichen, erfahrenen Artists' },
    { title: 'INDIVIDUELLES FEEDBACK', text: 'Erhalte persönliches Feedback, um schneller zu wachsen' },
    { title: 'UNVERGESSLICHES ERLEBNIS', text: 'Verbinde dich, teile und wachse mit Tänzern weltweit' },
  ],
  fr: [
    { title: 'ENTRAÎNEMENT INTENSIF', text: 'Exploite tout ton potentiel en peu de temps' },
    { title: 'PROFESSEURS DE CLASSE MONDIALE', text: 'Apprends auprès d’artistes passionnés et expérimentés' },
    { title: 'FEEDBACK PERSONNALISÉ', text: 'Reçois un retour individuel pour progresser plus vite' },
    { title: 'EXPÉRIENCE INOUBLIABLE', text: 'Connecte-toi, partage et grandis avec des danseurs du monde entier' },
  ],
};

const BODY_FONT = "'DM Sans', sans-serif";

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
          <img
            src={encodeURI(bootcamp.image)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* ── BACK ── */}
        <div
          className={`${faceBase} bg-[#0b1626]`}
          style={faceStyle(true)}
        >
          {bootcamp.backImage && (
            <img
              src={encodeURI(bootcamp.backImage)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Coming soon card (does not flip) ────────────────────────────────────────
// `compact` is the half-height variant used when two of them share one grid cell.
function ComingSoonCard({ bootcamp, compact = false }: { bootcamp: Bootcamp; compact?: boolean }) {
  const COPY = useCopy(COPY_I18N);
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
          {COPY.comingSoon}
        </h3>
        <p
          className={`font-mono tracking-[0.22em] uppercase text-white/45 ${
            compact ? 'text-[8px] mt-1.5' : 'text-[9px] mt-2'
          }`}
        >
          {COPY.stayTuned}
        </p>

        <button
          type="button"
          className={`w-full flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 text-white/85 font-mono tracking-[0.15em] uppercase transition-colors duration-300 hover:border-[#c4b5fd]/60 hover:text-white ${
            compact ? 'mt-3 px-3 py-2 text-[8px]' : 'mt-5 px-4 py-2.5 text-[9px]'
          }`}
        >
          {COPY.getNotified}
          <Bell className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PremiumBootcampsSection() {
  const COPY = useCopy(COPY_I18N);
  const FEATURES = useCopy(FEATURES_I18N).map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));

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
    { key: 'kizomba' as const, icon: PersonStanding, label: `${COPY.tabKizomba} (${kizomba.length})`, soon: false },
    { key: 'bachata' as const, icon: Heart, label: `${COPY.tabBachata} (${bachata.length})`, soon: true },
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
            onClick={() => scrollToSection(CTA_TARGET)}
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
