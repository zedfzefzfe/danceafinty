import { useEffect, useRef, useState } from 'react';
import { heroConfig, festivalDate } from '../config';
import { useIsMobile } from '../hooks/use-mobile';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Synchronous mobile detection for the video src — set on first render so
  // the desktop video never even starts loading on mobile devices.
  // The ?v= query string busts any stale cached copy of the old (non-faststart) files.
  const VIDEO_VERSION = 'v2';
  const MOBILE_SRC  = `/videos/mobileversion.mp4?${VIDEO_VERSION}`;
  const DESKTOP_SRC = `/videos/hero_background.mp4?${VIDEO_VERSION}`;

  const [videoSrc, setVideoSrc] = useState<string>(() => {
    if (typeof window === 'undefined') return DESKTOP_SRC;
    return window.matchMedia('(max-width: 767px)').matches ? MOBILE_SRC : DESKTOP_SRC;
  });

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => setVideoSrc(mql.matches ? MOBILE_SRC : DESKTOP_SRC);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = festivalDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);



  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states immediately so nothing flashes before the timeline runs
      gsap.set(taglineRef.current, { opacity: 0, y: 20, letterSpacing: '0.4em' });
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) gsap.set(words, { opacity: 0, y: 80, rotateX: 60 });
      gsap.set(locationRef.current, { opacity: 0, y: 20 });
      const nums = countdownRef.current?.querySelectorAll('[data-cd-num]');
      const labels = countdownRef.current?.querySelectorAll('[data-cd-label]');
      if (nums)   gsap.set(nums,   { opacity: 0, y: 30, scale: 0.6 });
      if (labels) gsap.set(labels, { opacity: 0, y: 10 });
      gsap.set(ctaRef.current?.children || [], { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Tagline — letter-spacing tightens as it fades in
      tl.to(taglineRef.current, {
        opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.8,
      });

      // Headline — word-by-word reveal with rotateX flip
      if (words) {
        tl.to(words, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.9, stagger: 0.12, ease: 'expo.out',
        }, '-=0.4');
      }

      // Location — soft slide up
      tl.to(locationRef.current, {
        opacity: 1, y: 0, duration: 0.6,
      }, '-=0.5');

      // Countdown numbers — pop in with a tiny back overshoot, staggered
      if (nums) {
        tl.to(nums, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55, stagger: 0.08, ease: 'back.out(1.6)',
        }, '-=0.35');
      }
      if (labels) {
        tl.to(labels, {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.06,
        }, '-=0.5');
      }

      // CTAs — settled slide up
      tl.to(ctaRef.current?.children || [], {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation (Desktop only)
  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.74
      );



      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.08, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`${isMobile ? 'relative w-screen h-screen' : 'section-pinned'} bg-[#1a0033] z-10 overflow-hidden`}
    >
      {/* Background Video */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full" style={{ opacity: 1 }}>
        <video
          key={videoSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.play().catch(() => {});
          }}
        />
      </div>

      {/* Fallback Image (if video fails to load) */}
      <div
        className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-center"
        style={{
          backgroundImage: 'url(/images/hero_dancers_neon.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'none',
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-[#1a0033]/10 to-[#1a0033]/20" />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay z-[2]" />

      {/* Light leak effect */}
      <div className="light-leak z-[3]" />

      {/* Content */}
      <div className={`relative z-20 ${isMobile ? 'h-screen' : 'h-full'} flex flex-col justify-center px-4 sm:px-6 lg:px-[6vw]`}>
        {/* Main Content Block */}
        <div className={isMobile ? 'w-full text-center' : 'max-w-[62vw]'}>
          {/* Tagline */}
          <p
            ref={taglineRef}
            className={`font-mono tracking-[0.25em] text-[#00e5cc] ${isMobile ? 'text-[11px] mb-4' : 'text-xs mb-2 sm:mb-4'}`}
          >
            {heroConfig.tagline}
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className={`font-display text-white ${isMobile ? 'leading-[0.9] mb-5' : 'leading-[0.85] mb-3 sm:mb-6'}`}
            style={{ fontSize: isMobile ? 'clamp(3.5rem, 18vw, 5.5rem)' : 'clamp(2.5rem, 8vw, 8rem)' }}
          >
            <span className="word inline-block">DANCE</span>{' '}
            <span className="word inline-block">AFFINITY</span>{' '}
            <span className="word inline-block text-[#00e5cc]">FESTIVAL</span>
          </h1>

          {/* Subheadline */}
          <div ref={subheadlineRef} className="mb-6 sm:mb-8">
            <p
              ref={locationRef}
              className={`${isMobile ? 'text-sm font-mono tracking-widest text-[#00e5cc]/80' : 'text-lg lg:text-xl text-white/80'} mb-2`}
            >
              {heroConfig.dateLocation}
            </p>

            {/* Countdown Timer */}
            <div
              ref={countdownRef}
              className={`flex items-center flex-wrap ${isMobile ? 'justify-center gap-5 mt-5' : 'gap-2 sm:gap-4 mt-6'}`}
            >
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HRS' },
                { value: timeLeft.minutes, label: 'MIN' },
                { value: timeLeft.seconds, label: 'SEC' },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-2 sm:gap-4">
                  <div className="text-center">
                    <div
                      data-cd-num
                      className={`font-display ${isMobile ? 'text-3xl' : 'text-3xl lg:text-5xl'} text-[#00e5cc] neon-text-teal`}
                    >
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div
                      data-cd-label
                      className={`font-mono ${isMobile ? 'text-[10px]' : 'text-[10px]'} tracking-[0.15em] text-white/50 mt-1`}
                    >
                      {item.label}
                    </div>
                  </div>
                  {index < 3 && (
                    <span className={`font-display ${isMobile ? 'text-2xl' : 'text-2xl lg:text-4xl'} text-white/30`}>:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className={`flex items-center gap-4 ${isMobile ? 'flex-col mt-8 w-full max-w-[280px] mx-auto' : 'flex-wrap mt-6 sm:mt-8'}`}>
            <button
              onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
              className={`btn-primary flex items-center justify-center gap-2 ${isMobile ? 'w-full' : ''}`}
            >
              {heroConfig.ctaPrimaryText}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
              className={`btn-outline ${isMobile ? 'w-full' : ''}`}
            >
              {heroConfig.ctaSecondaryText}
            </button>
          </div>
        </div>


      </div>

    </section>
  );
}
