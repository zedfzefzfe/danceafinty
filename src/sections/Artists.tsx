import { useEffect, useRef } from 'react';
import { artistsConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const artistsGridRef = useRef<HTMLDivElement>(null);
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
        artistsGridRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%) - Hold position

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
        artistsGridRef.current,
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
      id="artists"
      ref={sectionRef}
      className="section-pinned bg-[#1a0033] z-20"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${artistsConfig.backgroundImage})`,
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
            {artistsConfig.tag}
          </p>
          <h2 className="font-display text-white leading-[0.9] mb-6">
            {artistsConfig.heading}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-[34vw]">
            {artistsConfig.subheadline}
          </p>
          <button
            onClick={() => scrollToSection(artistsConfig.ctaTarget)}
            className="btn-outline"
          >
            {artistsConfig.ctaText}
          </button>
        </div>

        {/* Artists Grid */}
        <div
          ref={artistsGridRef}
          className="absolute left-6 lg:left-[6vw] bottom-[15vh] flex gap-4 overflow-x-auto scrollbar-hide pb-4 max-w-[50vw]"
        >
          {artistsConfig.artists.map((artist) => (
            <div
              key={artist.id}
              className="flex-shrink-0 w-32 lg:w-40 group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-3 border border-white/10 card-glow-hover">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="inline-block px-2 py-1 text-[10px] font-mono tracking-wider uppercase bg-[#00e5cc] text-[#1a0033]">
                    {artist.style}
                  </span>
                </div>
              </div>
              <h4 className="font-display text-sm lg:text-base text-white group-hover:text-[#00e5cc] transition-colors">
                {artist.name}
              </h4>
              <p className="text-xs text-white/50">{artist.role}</p>
            </div>
          ))}
        </div>

        {/* Info Card (Bottom Right) */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] bottom-[10vh] w-[88vw] lg:w-[34vw] min-h-[22vh] bg-white text-[#1a0033] p-6 lg:p-8 shadow-2xl"
        >
          <h3 className="font-display text-2xl lg:text-3xl mb-3">{artistsConfig.cardTitle}</h3>
          <p className="text-sm lg:text-base text-gray-600 mb-4 leading-relaxed">
            {artistsConfig.cardBody}
          </p>
          <a
            href="#artists"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#artists');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e5cc] hover:text-[#1a0033] transition-colors"
          >
            {artistsConfig.cardLink}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
