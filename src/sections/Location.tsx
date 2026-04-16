import { useEffect, useRef } from 'react';
import { locationConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Train, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const venueIcons = [MapPin, Train, Plane];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        venueRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        venueRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.06, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="section-pinned bg-[#1a0033] z-[60]"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${locationConfig.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#1a0033]/40 to-[#1a0033]/80" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay z-[1]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Left Content */}
        <div ref={headlineRef} className="max-w-[55vw]">
          <p className="font-mono text-xs tracking-[0.2em] text-[#00e5cc] mb-4">
            {locationConfig.tag}
          </p>
          <h2 className="font-display text-white leading-[0.9] mb-6">
            {locationConfig.heading}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-[36vw]">
            {locationConfig.subheadline}
          </p>
          <button className="btn-primary flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {locationConfig.ctaText}
          </button>
        </div>

        {/* Venue Info Cards */}
        <div
          ref={venueRef}
          className="absolute left-6 lg:left-[6vw] bottom-[15vh] flex flex-col sm:flex-row gap-4 max-w-[50vw]"
        >
          {locationConfig.venueInfo.map((info, index) => {
            const Icon = venueIcons[index] || MapPin;
            return (
              <div
                key={index}
                className="bg-[#1a0033]/80 backdrop-blur-sm border border-white/10 p-5 card-glow-hover flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-[#00e5cc]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#00e5cc]" />
                </div>
                <p className="text-sm text-white/80">{info}</p>
              </div>
            );
          })}
        </div>

        {/* Info Card (Bottom Right) */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] bottom-[10vh] w-[88vw] lg:w-[34vw] min-h-[22vh] bg-white text-[#1a0033] p-6 lg:p-8 shadow-2xl"
        >
          <h3 className="font-display text-2xl lg:text-3xl mb-4">{locationConfig.cardTitle}</h3>
          <ul className="space-y-4">
            {locationConfig.venueInfo.map((info, index) => {
              const Icon = venueIcons[index] || MapPin;
              return (
                <li key={index} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-[#00e5cc] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{info}</span>
                </li>
              );
            })}
          </ul>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e5cc] hover:text-[#1a0033] transition-colors mt-4"
          >
            {locationConfig.cardLink}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
