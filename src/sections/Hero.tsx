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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade in
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline animation (word by word)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: 45 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08 },
          '-=0.6'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );


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
      className={`${isMobile ? '' : 'section-pinned'} bg-[#1a0033] z-10 overflow-hidden`}
    >
      {/* Background Video */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full">
        {/* Mobile video */}
        <video
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/mobileversion.mp4" type="video/mp4" />
        </video>
        {/* Desktop video */}
        <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero_background.mp4" type="video/mp4" />
        </video>
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
          <p className={`font-mono tracking-[0.25em] text-[#00e5cc] ${isMobile ? 'text-[11px] mb-4' : 'text-xs mb-2 sm:mb-4'}`}>
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
            <p className={`${isMobile ? 'text-sm font-mono tracking-widest text-[#00e5cc]/80' : 'text-lg lg:text-xl text-white/80'} mb-2`}>
              {heroConfig.dateLocation}
            </p>
            
            {/* Countdown Timer */}
            <div className={`flex items-center flex-wrap ${isMobile ? 'justify-center gap-5 mt-5' : 'gap-2 sm:gap-4 mt-6'}`}>
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HRS' },
                { value: timeLeft.minutes, label: 'MIN' },
                { value: timeLeft.seconds, label: 'SEC' },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-2 sm:gap-4">
                  <div className="text-center">
                    <div className={`font-display ${isMobile ? 'text-3xl' : 'text-3xl lg:text-5xl'} text-[#00e5cc] neon-text-teal`}>
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className={`font-mono ${isMobile ? 'text-[10px]' : 'text-[10px]'} tracking-[0.15em] text-white/50 mt-1`}>
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
