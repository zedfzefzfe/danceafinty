import { useEffect, useRef, useState } from 'react';
import { passesConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Passes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const passesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [selectedPass, setSelectedPass] = useState<number | null>(null);

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
        passesRef.current?.children || [],
        { y: 50, opacity: 0 },
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
        passesRef.current,
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
      id="passes"
      ref={sectionRef}
      className="section-pinned bg-[#1a0033] z-50"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${passesConfig.backgroundImage})`,
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
        <div ref={headlineRef} className="max-w-[50vw]">
          <p className="font-mono text-xs tracking-[0.2em] text-[#00e5cc] mb-4">
            {passesConfig.tag}
          </p>
          <h2 className="font-display text-white leading-[0.9] mb-6">
            {passesConfig.heading}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-[34vw]">
            {passesConfig.subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-primary flex items-center gap-2">
              <Star className="w-4 h-4" />
              {passesConfig.ctaPrimaryText}
            </button>
            <button className="btn-outline flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              {passesConfig.ctaSecondaryText}
            </button>
          </div>
        </div>

        {/* Passes Cards */}
        <div
          ref={passesRef}
          className="absolute left-6 lg:left-[6vw] bottom-[12vh] flex gap-4 overflow-x-auto scrollbar-hide pb-4 max-w-[55vw]"
        >
          {passesConfig.passes.map((pass) => (
            <div
              key={pass.id}
              onClick={() => setSelectedPass(pass.id)}
              className={`flex-shrink-0 w-64 lg:w-72 cursor-pointer transition-all duration-300 ${
                pass.highlighted
                  ? 'border-2 border-[#00e5cc] neon-glow-teal'
                  : 'border border-white/20 hover:border-[#00e5cc]/50'
              } ${selectedPass === pass.id ? 'scale-105' : ''}`}
            >
              {/* Card Header */}
              <div className={`p-5 ${pass.highlighted ? 'bg-[#00e5cc]' : 'bg-white/10'}`}>
                {pass.badge && (
                  <span className={`inline-block px-2 py-1 text-[10px] font-mono tracking-wider uppercase mb-3 ${
                    pass.highlighted ? 'bg-[#1a0033] text-white' : 'bg-[#00e5cc] text-[#1a0033]'
                  }`}>
                    {pass.badge}
                  </span>
                )}
                <h4 className={`font-display text-xl mb-1 ${pass.highlighted ? 'text-[#1a0033]' : 'text-white'}`}>
                  {pass.name}
                </h4>
                <p className={`text-sm ${pass.highlighted ? 'text-[#1a0033]/70' : 'text-white/50'}`}>
                  {pass.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 bg-[#1a0033]/90 backdrop-blur-sm">
                <div className="font-display text-3xl text-[#00e5cc] mb-4">
                  {pass.price}
                </div>
                <ul className="space-y-2 mb-5">
                  {pass.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#00e5cc]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 text-sm font-semibold tracking-wider uppercase transition-all ${
                    pass.highlighted
                      ? 'bg-[#00e5cc] text-[#1a0033] hover:bg-white'
                      : 'border border-white/30 text-white hover:border-[#00e5cc] hover:text-[#00e5cc]'
                  }`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card (Bottom Right) */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] bottom-[10vh] w-[88vw] lg:w-[34vw] min-h-[22vh] bg-white text-[#1a0033] p-6 lg:p-8 shadow-2xl"
        >
          <h3 className="font-display text-2xl lg:text-3xl mb-4">{passesConfig.cardTitle}</h3>
          <div className="space-y-3">
            {passesConfig.passes.map((pass) => (
              <div key={pass.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-700">{pass.name}</span>
                <span className="font-mono text-sm text-[#00e5cc]">{pass.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Student discounts available.</p>
        </div>
      </div>
    </section>
  );
}
