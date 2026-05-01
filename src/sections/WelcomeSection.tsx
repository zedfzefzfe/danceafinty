import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  headingLine1: 'Welcome to',
  headingLine2: 'DANCE AFFINITY',
  tagline:
    'The ultimate festival experience where passion, rhythm, and community come together.',
  body1:
    "Whether you're a Kizomba lover or a Bachata enthusiast, our event in the heart of Freiburg offers something for everyone.",
  body2:
    'The main focus of Dance Affinity is on our bootcamps, designed to elevate your skills through intensive training sessions with top international artists. Bootcamps are a great way to quickly improve your skills, enhance technique, boost confidence, and connect with dancers.',
  closing:
    'Join Dance Affinity for unforgettable dance sessions, party nights and memories that will leave you inspired!',
  ctaText: 'GET YOUR TICKET →',
  ctaTarget: '#passes',
};

// ─── Swap these to use real video / poster assets ─────────────────────────────
const VIDEO = {
  src: '/videos/mobileversion.mp4', // e.g. '/videos/about_promo.mp4'
  posterText1: 'WHAT IS',
  posterText2: 'AFFINITY',
};

export default function WelcomeSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoHovered, setVideoHovered] = useState(false);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerConfig = {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none none',
      };

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: triggerConfig }
      );

      gsap.fromTo(
        videoCardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: isMobile ? 0 : 0.18,
          scrollTrigger: triggerConfig,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlayClick = () => {
    if (!videoRef.current || !VIDEO.src) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    videoRef.current.muted = false;
    videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      })
      .catch(() => {
        if (!videoRef.current) return;
        // Autoplay policy blocked audio — fall back to muted
        videoRef.current.muted = true;
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMuted(true);
        });
      });
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden"
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

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── LEFT: Copy ── */}
          <div ref={textRef} className="w-full lg:w-[55%] flex-shrink-0">

            {/* Heading */}
            <div style={{ marginBottom: '28px' }}>
              <span style={{
                display: 'block',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(36px, 5vw, 60px)',
                color: 'rgb(255, 255, 255)',
                letterSpacing: '0.02em',
                marginBottom: '4px',
                lineHeight: 1.2,
              }}>
                {COPY.headingLine1}
              </span>
              <span style={{
                display: 'block',
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(48px, 7vw, 80px)',
                color: '#00e5cc',
                letterSpacing: '0.02em',
                lineHeight: 0.95,
                textTransform: 'uppercase',
              }}>
                {COPY.headingLine2}
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: '32px',
            }}>
              {COPY.tagline}
            </p>

            {/* Body paragraphs */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              maxWidth: '540px',
              marginBottom: '24px',
            }}>
              {COPY.body1}
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              maxWidth: '540px',
              marginBottom: '24px',
            }}>
              {COPY.body2}
            </p>

            {/* Closing line */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              maxWidth: '540px',
              marginBottom: '40px',
            }}>
              {COPY.closing}
            </p>

            {/* CTA */}
            <button
              onClick={() => scrollToSection(COPY.ctaTarget)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '16px 36px',
                background: '#00e5cc',
                color: '#060a10',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              {COPY.ctaText}
            </button>
          </div>

          {/* ── RIGHT: Video card ── */}
          <div
            ref={videoCardRef}
            className="w-full max-w-[340px] mx-auto lg:mx-0 lg:flex-1"
          >
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
              style={{
                aspectRatio: '9 / 16',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: videoHovered ? '0 8px 40px rgba(45,212,191,0.08)' : 'none',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              {/* Poster gradient (visible while paused) */}
              <div
                className={`absolute inset-0 z-[1] flex flex-col items-center justify-center transition-opacity duration-500 ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                style={{
                  background:
                    'linear-gradient(160deg, #00c9a7 0%, #00e5cc 25%, #00897b 55%, #0a1929 100%)',
                }}
              >
                {/* Grain on poster */}
                <div className="absolute inset-0 grain-overlay pointer-events-none" />
                <p
                  className="relative z-[2] font-display text-center leading-[0.88] uppercase px-8"
                  style={{ fontSize: 'clamp(2rem, 8vw, 3.2rem)' }}
                >
                  <span className="text-white">{VIDEO.posterText1}</span>
                  <br />
                  <span className="text-[#1a0033]">{VIDEO.posterText2}</span>
                </p>
              </div>

              {/* Video element */}
              <video
                ref={videoRef}
                src={VIDEO.src || undefined}
                className="absolute inset-0 z-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onEnded={() => setIsPlaying(false)}
              />

              {/* Play button overlay (visible while paused) */}
              <button
                onClick={handlePlayClick}
                aria-label="Play video"
                className={`absolute inset-0 z-[2] flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{
                    background: '#00e5cc',
                    boxShadow:
                      '0 0 0 4px rgba(0,229,204,0.25), 0 0 30px rgba(0,229,204,0.5)',
                  }}
                >
                  <Play className="w-6 h-6 text-[#1a0033] ml-0.5" fill="currentColor" />
                </div>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
