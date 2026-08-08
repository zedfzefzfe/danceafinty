import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { revealOnView } from '../lib/reveal';
import {
  GraduationCap,
  Users,
  Heart,
  Music,
  Globe,
  Scale,
  Disc3,
  HeartHandshake,
  Camera,
  PartyPopper,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';


// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  badgeLabel: 'THE EXPERIENCE',
  headingPlain: 'LIVE THE DANCE AFFINITY ',
  headingAccent: 'EXPERIENCE',
  subtitle1: 'Four days of connection, learning, partying and unforgettable moments.',
  expectLabel: 'WHAT TO EXPECT',
};

// ─── Swap these to use real photo assets ─────────────────────────────────────
// Each category keeps the original photo (first) plus the real festival photos.
// They're round-robin interleaved into GALLERY below so the carousel alternates
// categories instead of showing a run of the same one.
const GALLERY_CATEGORIES = [
  {
    icon: Users,
    line1: 'SOCIAL',
    line2: 'DANCING',
    images: [
      '/images/19 (1).png',
      '/images/exp-social-1.jpg',
      '/images/exp-social-2.jpg',
      '/images/exp-social-3.jpg',
      '/images/exp-social-4.jpg',
      '/images/exp-social-5.jpg',
      '/images/exp-social-6.jpg',
      '/images/exp-social-7.jpg',
    ],
  },
  {
    icon: Heart,
    line1: 'REAL',
    line2: 'CONNECTIONS',
    images: [
      '/images/18 (1).png',
      '/images/exp-connection-1.jpg',
      '/images/exp-connection-2.jpg',
      '/images/exp-connection-3.jpg',
      '/images/exp-connection-4.jpg',
    ],
  },
  {
    icon: Music,
    line1: 'EPIC',
    line2: 'PARTIES',
    images: [
      '/images/16 (1).png',
      '/images/exp-parties-1.jpg',
      '/images/exp-parties-2.jpg',
      '/images/exp-parties-3.jpg',
      '/images/exp-parties-4.jpg',
      '/images/exp-parties-5.jpg',
    ],
  },
  {
    icon: GraduationCap,
    line1: 'INSPIRING',
    line2: 'WORKSHOPS',
    images: [
      '/images/20 (1).png',
      '/images/exp-workshop-1.jpg',
      '/images/exp-workshop-2.jpg',
      '/images/exp-workshop-3.jpg',
      '/images/exp-workshop-4.jpg',
      '/images/exp-workshop-5.jpg',
    ],
  },
  {
    icon: Users,
    line1: 'LIFELONG',
    line2: 'FRIENDSHIPS',
    images: [
      '/images/8 (1).png',
      '/images/exp-friendship-1.jpg',
      '/images/exp-friendship-2.jpg',
      '/images/exp-friendship-3.jpg',
    ],
  },
];

// Round-robin flatten: one image from each category per pass, mixing old & new.
const GALLERY = (() => {
  const out: { icon: typeof GALLERY_CATEGORIES[number]['icon']; line1: string; line2: string; src: string }[] = [];
  const maxLen = Math.max(...GALLERY_CATEGORIES.map((c) => c.images.length));
  for (let i = 0; i < maxLen; i++) {
    for (const cat of GALLERY_CATEGORIES) {
      if (i < cat.images.length) {
        out.push({ icon: cat.icon, line1: cat.line1, line2: cat.line2, src: cat.images[i] });
      }
    }
  }
  return out;
})();

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
  { icon: Scale, value: '100%', label: 'BALANCED RATIO MEN / WOMEN' },
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

type GalleryItem = (typeof GALLERY)[number];

// ─── Gallery card — design unchanged, now clickable ──────────────────────────
function GalleryCard({
  item,
  index,
  copy,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  copy: number;
  onOpen: (index: number) => void;
}) {
  const { icon: Icon, line1, line2, src } = item;
  const isPrimary = copy === 0;
  // A swipe that starts on a card must scroll the row, not open the lightbox
  const touch = useRef({ x: 0, y: 0, moved: false });

  return (
    <div
      role="button"
      tabIndex={isPrimary ? 0 : -1}
      aria-hidden={isPrimary ? undefined : true}
      aria-label={`Open ${line1} ${line2} photo`}
      data-gal={isPrimary ? index : undefined}
      data-gal-clone={copy === 1 ? index : undefined}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, moved: false };
      }}
      onTouchMove={(e) => {
        const dx = Math.abs(e.touches[0].clientX - touch.current.x);
        const dy = Math.abs(e.touches[0].clientY - touch.current.y);
        if (dx > 8 || dy > 8) touch.current.moved = true;
      }}
      onClick={() => {
        if (!touch.current.moved) onOpen(index);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(index);
        }
      }}
      className="relative flex-none w-[86%] sm:w-[60%] md:w-[calc((100%-3rem)/3.2)] aspect-[3/4] rounded-lg overflow-hidden border border-white/10 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00e5cc]/60"
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
  );
}

// Dotted particle field used on the far left / right edges of the section
const MESH_DOTS = 'radial-gradient(rgba(0,229,204,0.55) 1px, transparent 1px)';

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const expectRef = useRef<HTMLDivElement>(null);

  const hoverRef = useRef(false);
  const lightboxOpenRef = useRef(false);
  const touchStartX = useRef(0);
  // Timestamp until which the auto-scroll stays out of the way after the user
  // touches / wheels the row — momentum scrolling needs to finish undisturbed
  const resumeAtRef = useRef(0);

  // Touch devices fire an emulated mouseenter on tap that never gets a matching
  // mouseleave, which would pause the marquee forever — so only bind hover
  // pausing where a real pointer exists.
  const canHover =
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const pauseForUser = useCallback(() => {
    resumeAtRef.current = performance.now() + 2500;
  }, []);

  // Only a sideways drag should pause the row. Pausing on every touchmove meant
  // scrolling the page with a finger over the gallery kept stalling it.
  const trackTouch = useRef({ x: 0, y: 0 });

  const onTouchStartTrack = useCallback((e: React.TouchEvent) => {
    trackTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchMoveTrack = useCallback(
    (e: React.TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - trackTouch.current.x);
      const dy = Math.abs(e.touches[0].clientY - trackTouch.current.y);
      if (dx > dy) pauseForUser();
    },
    [pauseForUser]
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const reduceMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Distance covered by one full copy of the gallery — the seamless loop length.
  // Measured from the DOM so card widths / gaps stay the single source of truth.
  const loopWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>('[data-gal="0"]');
    const clone = el.querySelector<HTMLElement>('[data-gal-clone="0"]');
    if (!first || !clone) return 0;
    return clone.offsetLeft - first.offsetLeft;
  }, []);

  // Continuous auto-scroll. Driven by scrollLeft rather than a CSS keyframe so
  // dragging, swiping and the wheel all keep working on the same element.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let centred = false;
    // Reduce Motion is on by default for a lot of phone users — bailing out
    // entirely there left the marquee dead on real devices, so it just eases off.
    const SPEED = reduceMotion ? 14 : 38; // px per second

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const el = trackRef.current;
      const loop = loopWidth();

      if (el && loop > 0) {
        // Park on the middle copy so a manual drag has a full copy of runway on
        // either side before it needs to wrap.
        if (!centred) {
          el.scrollLeft = loop;
          centred = true;
        }

        if (!hoverRef.current && !lightboxOpenRef.current && now >= resumeAtRef.current) {
          el.scrollLeft += SPEED * dt;
        }

        // Every position is pixel-identical to the one a `loop` away, so these
        // corrections are invisible — they just keep us on the middle copy.
        if (el.scrollLeft >= loop * 2) el.scrollLeft -= loop;
        else if (el.scrollLeft < loop * 0.5) el.scrollLeft += loop;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, loopWidth]);

  // ── Drag to scroll (mouse / pen) ──────────────────────────────────────────
  // Touch is left to the browser's own momentum scrolling.
  const dragging = useRef(false);
  const lastPointerX = useRef(0);
  // A drag that moved must not also open the lightbox on release.
  const dragMoved = useRef(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return;
      dragging.current = true;
      dragMoved.current = false;
      lastPointerX.current = e.clientX;
      pauseForUser();
    },
    [pauseForUser]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const el = trackRef.current;
      if (!el) return;
      const dx = e.clientX - lastPointerX.current;
      lastPointerX.current = e.clientX;
      if (Math.abs(dx) > 0) dragMoved.current = true;
      // Applied as a delta rather than an absolute offset so the loop
      // corrections above can't fight the drag.
      el.scrollLeft -= dx;
      pauseForUser();
    },
    [pauseForUser]
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  // ── Lightbox ──────────────────────────────────────────────────────────────
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    requestAnimationFrame(() => setLightboxVisible(true));
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxVisible(false);
    window.setTimeout(() => setLightboxIndex(null), 200);
  }, []);

  const goLightbox = useCallback((direction: 1 | -1) => {
    setLightboxIndex((i) =>
      i === null ? i : (i + direction + GALLERY.length) % GALLERY.length
    );
  }, []);

  useEffect(() => {
    lightboxOpenRef.current = lightboxIndex !== null;
  }, [lightboxIndex]);

  // Body scroll lock + keyboard navigation while open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goLightbox(1);
      else if (e.key === 'ArrowLeft') goLightbox(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goLightbox]);

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
        trigger: trackRef.current,
        targets: trackRef.current?.children,
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' },
      }),
      ...[testimonialsRef, statsRef, expectRef].map((ref) =>
        revealOnView({
          targets: ref.current,
          from: { opacity: 0, y: 30 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        })
      ),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
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
        <div
          className="relative mt-12 md:mt-16"
          onMouseEnter={canHover ? () => { hoverRef.current = true; } : undefined}
          onMouseLeave={canHover ? () => { hoverRef.current = false; } : undefined}
          onTouchStart={onTouchStartTrack}
          onTouchMove={onTouchMoveTrack}
          onWheel={pauseForUser}
        >
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            // Capture phase, so a drag that ends on a card never opens the lightbox
            onClickCapture={(e) => {
              if (dragMoved.current) {
                e.preventDefault();
                e.stopPropagation();
                dragMoved.current = false;
              }
            }}
            className="flex gap-4 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing"
          >
            {/* Three copies — the primary set is the accessible one, the rest
                exist purely so the loop never shows a gap or a reset */}
            {[0, 1, 2].map((copy) =>
              GALLERY.map((item, index) => (
                <GalleryCard
                  key={`c${copy}-${item.line1}-${item.line2}`}
                  item={item}
                  index={index}
                  copy={copy}
                  onOpen={openLightbox}
                />
              ))
            )}
          </div>
        </div>

        {/* ── 5) Stats bar ── */}
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

        {/* ── 6) Testimonials ── */}
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
                    onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
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

      {/* ── Lightbox ── */}
      {lightboxIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${GALLERY[lightboxIndex].line1} ${GALLERY[lightboxIndex].line2}`}
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > 50) goLightbox(dx < 0 ? 1 : -1);
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-200"
            style={{
              opacity: lightboxVisible ? 1 : 0,
              background: 'rgba(4,7,14,0.94)',
              backdropFilter: 'blur(6px)',
            }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 flex w-11 h-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-[#00e5cc]/60 hover:text-[#00e5cc]"
            >
              <X className="w-5 h-5" strokeWidth={1.6} />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goLightbox(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 md:left-8 z-10 flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-[#00e5cc]/60 hover:text-[#00e5cc]"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={1.5} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goLightbox(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 md:right-8 z-10 flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-[#00e5cc]/60 hover:text-[#00e5cc]"
            >
              <ChevronRight className="w-7 h-7" strokeWidth={1.5} />
            </button>

            {/* Full image */}
            <img
              src={GALLERY[lightboxIndex].src}
              alt={`${GALLERY[lightboxIndex].line1} ${GALLERY[lightboxIndex].line2}`.toLowerCase()}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[88vw] max-h-[78vh] w-auto h-auto object-contain rounded-lg transition-transform duration-200"
              style={{ transform: lightboxVisible ? 'scale(1)' : 'scale(0.97)' }}
            />

            {/* Caption */}
            <div className="absolute bottom-7 left-0 right-0 px-16 text-center pointer-events-none">
              <p className="font-display uppercase text-white text-[15px] md:text-[17px] tracking-[0.1em]">
                {GALLERY[lightboxIndex].line1} {GALLERY[lightboxIndex].line2}
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-1.5">
                {lightboxIndex + 1} / {GALLERY.length}
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
