import { useEffect, useRef } from 'react';
import { bootcampsConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, Target, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [Users, Target, Music];

export default function Bootcamps() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
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
        featuresRef.current?.children || [],
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
        featuresRef.current,
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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="bootcamps"
      ref={sectionRef}
      className="section-pinned bg-[#1a0033] z-40"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bootcampsConfig.backgroundImage})`,
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
            {bootcampsConfig.tag}
          </p>
          <h2 className="font-display text-white leading-[0.9] mb-6">
            {bootcampsConfig.heading}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-[36vw]">
            {bootcampsConfig.subheadline}
          </p>
          <button
            onClick={() => scrollToSection(bootcampsConfig.ctaTarget)}
            className="btn-primary flex items-center gap-2"
          >
            {bootcampsConfig.ctaText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="absolute left-6 lg:left-[6vw] bottom-[15vh] grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[50vw]"
        >
          {bootcampsConfig.features.map((feature, index) => {
            const Icon = featureIcons[index] || Target;
            return (
              <div
                key={index}
                className="bg-[#1a0033]/80 backdrop-blur-sm border border-white/10 p-5 card-glow-hover"
              >
                <div className="w-10 h-10 bg-[#00e5cc]/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#00e5cc]" />
                </div>
                <p className="text-sm text-white/80">{feature.text}</p>
              </div>
            );
          })}
        </div>

        {/* Info Card (Bottom Right) */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] bottom-[10vh] w-[88vw] lg:w-[34vw] min-h-[22vh] bg-white text-[#1a0033] p-6 lg:p-8 shadow-2xl"
        >
          <h3 className="font-display text-2xl lg:text-3xl mb-4">{bootcampsConfig.cardTitle}</h3>
          <ul className="space-y-3">
            {bootcampsConfig.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#00e5cc] rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature.text}</span>
              </li>
            ))}
          </ul>
          <a
            href="#passes"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#passes');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e5cc] hover:text-[#1a0033] transition-colors mt-4"
          >
            {bootcampsConfig.cardLink}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
