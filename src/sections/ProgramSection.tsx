import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { revealOnView } from '../lib/reveal';
import { useCopy, type Lang } from '../i18n/LanguageContext';

// ─── Edit these constants to update copy ─────────────────────────────────────
interface ProgramCopy {
  kicker: string; heading: string; subheading: string;
}

const COPY_I18N: Record<Lang, ProgramCopy> = {
  en: {
    kicker: 'THE PROGRAM', heading: 'THE EVENT PROGRAM',
    subheading: 'Every workshop, party and social — laid out so you never miss a beat.',
  },
  de: {
    kicker: 'DAS PROGRAMM', heading: 'DAS EVENT-PROGRAMM',
    subheading: 'Jeder Workshop, jede Party, jeder Social — übersichtlich, damit du nichts verpasst.',
  },
  fr: {
    kicker: 'LE PROGRAMME', heading: 'PROGRAMME DE L’ÉVÉNEMENT',
    subheading: 'Chaque atelier, soirée et social — organisé pour ne rien manquer.',
  },
};

const PROGRAM_IMAGES = [
  '/images/Friday_bachata.png',
  '/images/Saturday_bachata.png',
  '/images/Sunday_bachata.png',
];

// ─── Edit titles to match what each day's program image actually covers ──────
const PROGRAM_I18N: Record<Lang, { title: string }[]> = {
  en: [
    { title: 'FRIDAY' },
    { title: 'SATURDAY' },
    { title: 'SUNDAY' },
  ],
  de: [
    { title: 'FREITAG' },
    { title: 'SAMSTAG' },
    { title: 'SONNTAG' },
  ],
  fr: [
    { title: 'VENDREDI' },
    { title: 'SAMEDI' },
    { title: 'DIMANCHE' },
  ],
};

const BODY_FONT = "'DM Sans', sans-serif";

export default function ProgramSection() {
  const COPY = useCopy(COPY_I18N);
  const PROGRAM = useCopy(PROGRAM_I18N).map((p, i) => ({ ...p, image: PROGRAM_IMAGES[i] }));

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = PROGRAM.length;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastWheelRef = useRef(0);

  const goPrev = () => setActive((a) => (a - 1 + total) % total);
  const goNext = () => setActive((a) => (a + 1) % total);

  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: headerRef.current,
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: sectionRef.current,
        targets: stageRef.current,
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' },
      }),
    ];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  // Escape closes the lightbox, arrow keys browse the other days
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  return (
    <section
      ref={sectionRef}
      aria-label="Program"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080d1a 0%, #0a1020 55%, #07060f 100%)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">

        {/* ── Divider — matches the "WHAT TO EXPECT" kicker treatment ── */}
        <div className="flex items-center gap-5">
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#00e5cc] whitespace-nowrap">
            {COPY.kicker}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>

        {/* ── Heading ── */}
        <div ref={headerRef} className="text-center mt-8 md:mt-10 mb-12 md:mb-16 max-w-2xl mx-auto">
          <h2
            className="font-display uppercase text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '0.04em' }}
          >
            {COPY.heading}
          </h2>
          <p
            className="mt-4"
            style={{ fontFamily: BODY_FONT, fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}
          >
            {COPY.subheading}
          </p>
        </div>

        {/* ── Stage: one featured image + a thumbnail rail to switch it ──
             Images are 4:5 portrait flyers with real schedule text baked in,
             so every box below is sized to that exact ratio — object-cover
             then crops nothing and the full flyer always stays legible. ── */}
        <div ref={stageRef} className="flex flex-col lg:flex-row gap-5 md:gap-6 items-center lg:items-start justify-center">

          {/* Featured image — the whole card opens the full-size view */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="View full-size program image"
            className="group relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 text-left cursor-zoom-in"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'linear-gradient(150deg, #14243a 0%, #0d1a2e 100%)' }}
            />
            {PROGRAM.map((item, i) => (
              <img
                key={item.image}
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                style={{ opacity: i === active ? 1 : 0 }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </button>

          {/* Thumbnail rail */}
          <div className="flex flex-row lg:flex-col gap-4 md:gap-5 w-full max-w-[420px] lg:w-[180px] lg:max-w-none">
            {PROGRAM.map((item, i) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={item.title}
                className="group relative flex-1 aspect-[4/5] rounded-xl overflow-hidden border transition-colors"
                style={{ borderColor: i === active ? 'rgba(0,229,204,0.7)' : 'rgba(255,255,255,0.1)' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(150deg, #14243a 0%, #0d1a2e 100%)' }}
                />
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ opacity: i === active ? 1 : 0.55 }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(6,10,20,0.85) 0%, rgba(6,10,20,0.35) 40%, transparent 65%)',
                  }}
                />
                <span
                  className="absolute bottom-2.5 left-3 right-3 truncate text-left"
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '11px',
                    letterSpacing: '0.04em',
                    color: i === active ? '#00e5cc' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  {item.title}
                </span>
                {/* Active indicator */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] bg-[#00e5cc] transition-all duration-300"
                  style={{ width: i === active ? '100%' : '0%' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox — swipe, scroll, arrow-click or arrow keys move between days ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          onClick={() => setLightboxOpen(false)}
          onWheel={(e) => {
            const now = performance.now();
            if (now - lastWheelRef.current < 400) return;
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 24) return;
            lastWheelRef.current = now;
            if (e.deltaX > 0) goNext();
            else goPrev();
          }}
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchStartRef.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStartRef.current;
            touchStartRef.current = null;
            if (!start) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
            if (dx < 0) goNext();
            else goPrev();
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-5 right-5 md:top-8 md:right-8 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.6} />
          </button>

          {/* Prev / next — always visible on touch, hover-revealed on desktop cursors */}
          <button
            type="button"
            aria-label="Previous day"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white/70 hover:text-white hover:border-[#00e5cc]/60 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label="Next day"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white/70 hover:text-white hover:border-[#00e5cc]/60 transition-colors"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.6} />
          </button>

          <img
            src={PROGRAM[active].image}
            alt={PROGRAM[active].title}
            className="max-h-[92vh] max-w-full object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Current day + position, so the swipe/arrow hint reads as intentional */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white/70"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[#00e5cc]">{PROGRAM[active].title}</span>
            <span className="text-white/30">·</span>
            <span>{active + 1} / {total}</span>
          </div>
        </div>
      )}
    </section>
  );
}
