import { useEffect, useRef, useState } from 'react';
import { revealOnView } from '../lib/reveal';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useCopy, type Lang } from '../i18n/LanguageContext';

// ─── Edit these constants to update copy ─────────────────────────────────────
const CTA_TARGET = '#passes';

const COPY_I18N: Record<Lang, {
  badgeLabel: string; headingLine1: string; headingLine2: string;
  paragraph1: string; paragraph2: string; ctaText: string;
}> = {
  en: {
    badgeLabel: 'IN THE MOMENT',
    headingLine1: "FEEL WHAT IT'S",
    headingLine2: 'LIKE TO BE THERE',
    paragraph1:
      "This isn't just footage — it's four days of connection, sweat and joy compressed into a couple of minutes. The energy of the dancefloor, the community between sessions, the moment you stop thinking and just move.",
    paragraph2:
      "Watch it once and you'll understand why people fly across the world to be here every year.",
    ctaText: 'GET YOUR PASS',
  },
  de: {
    badgeLabel: 'IM MOMENT',
    headingLine1: 'SPÜRE, WIE ES IST,',
    headingLine2: 'DABEI ZU SEIN',
    paragraph1:
      'Das ist nicht nur ein Video — es sind vier Tage voller Verbindung, Schweiß und Freude, komprimiert auf wenige Minuten. Die Energie auf der Tanzfläche, die Gemeinschaft zwischen den Sessions, der Moment, in dem du aufhörst zu denken und dich einfach bewegst.',
    paragraph2:
      'Sieh es dir einmal an und du verstehst, warum Menschen jedes Jahr um die halbe Welt reisen, um dabei zu sein.',
    ctaText: 'TICKETS SICHERN',
  },
  fr: {
    badgeLabel: 'DANS L’INSTANT',
    headingLine1: 'RESSENS CE QUE C’EST',
    headingLine2: 'D’Y ÊTRE',
    paragraph1:
      "Ce ne sont pas de simples images — ce sont quatre jours de connexion, de sueur et de joie condensés en quelques minutes. L'énergie de la piste, la communauté entre les sessions, l'instant où tu arrêtes de penser pour simplement danser.",
    paragraph2:
      "Regarde-la une fois et tu comprendras pourquoi des gens traversent le monde pour être là chaque année.",
    ctaText: 'RÉSERVE TA PLACE',
  },
};

// Re-encoded to H.264/AAC — the original export was HEVC, which Chrome (and
// most non-Safari browsers) can't decode: the audio track played fine but the
// video silently failed to render.
const VIDEO_SRC = encodeURI('/videos/DA_aftermovie_25_fina_h264.mp4');

const BODY_FONT = "'DM Sans', sans-serif";

export default function InTheMomentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const COPY = useCopy(COPY_I18N);

  // Entrance animations
  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: videoColRef.current,
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: sectionRef.current,
        targets: textColRef.current,
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15 },
      }),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  // Start the clip only once it's actually on screen — and try for sound
  // first. Browsers block unmuted autoplay unless it follows a user gesture,
  // so a scroll-triggered unmuted play() is usually rejected; when that
  // happens we fall back to muted (always allowed) and let the toggle button
  // ask for sound instead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = false;
          video.play().catch(() => {
            video.muted = true;
            setMuted(true);
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setMuted(next);
  };

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="moment"
      ref={sectionRef}
      aria-label="In the moment"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(135deg, #0d0d2b 0%, #0a1929 55%, #0a0a20 100%)',
      }}
    >
      {/* Ambient glow accents */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 20%, rgba(0,229,204,0.05) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 15% 85%, rgba(200,0,255,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 items-center gap-10 md:gap-16">
          {/* ── Video ── */}
          <div ref={videoColRef} className="order-1">
            <div className="relative mx-auto max-w-[420px] md:max-w-none">
              {/* Corner brackets — a viewfinder frame sitting just outside the video,
                  instead of a soft glow card. Reads as intentional, not templated. */}
              {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`absolute w-6 h-6 md:w-8 md:h-8 border-[#00e5cc]/70 ${pos}`}
                  style={{ margin: '-10px' }}
                />
              ))}

              <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10">
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  muted={muted}
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(10,10,32,0.12) 0%, transparent 22%, transparent 78%, rgba(10,10,32,0.4) 100%)',
                  }}
                />

                {/* Sound toggle */}
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={muted ? 'Unmute video' : 'Mute video'}
                    aria-pressed={!muted}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 transition-colors duration-300 hover:border-[#00e5cc]/60 hover:text-[#00e5cc]"
                  >
                    {muted ? (
                      <VolumeX className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Text ── */}
          <div ref={textColRef} className="order-2 text-center md:text-left">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#00e5cc]">
              {COPY.badgeLabel}
            </span>

            <h2
              className="mt-5 font-display uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', letterSpacing: '0.02em' }}
            >
              <span className="block text-white">{COPY.headingLine1}</span>
              <span className="block bg-gradient-to-r from-[#00e5cc] via-[#00d3e0] to-[#22a9f0] bg-clip-text text-transparent">
                {COPY.headingLine2}
              </span>
            </h2>

            <div
              className="mt-6 mx-auto md:mx-0 max-w-[480px] space-y-4"
              style={{
                fontFamily: BODY_FONT,
                fontSize: '15.5px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
              }}
            >
              <p>{COPY.paragraph1}</p>
              <p>{COPY.paragraph2}</p>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection(CTA_TARGET)}
              className="btn-primary mt-9 inline-flex items-center justify-center gap-2"
            >
              {COPY.ctaText}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
