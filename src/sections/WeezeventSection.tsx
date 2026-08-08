import { useEffect, useRef } from 'react';
import { revealOnView } from '../lib/reveal';

const BODY_FONT = "'DM Sans', sans-serif";

export default function WeezeventSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: headerRef.current,
        from: { opacity: 0, y: 30 },
        to:   { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: sectionRef.current,
        targets: cardRef.current,
        from: { opacity: 0, y: 40 },
        to:   { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.18 },
      }),
    ];
    return () => cleanups.forEach((c) => c());
  }, []);

  useEffect(() => {
    if (document.getElementById('weez-script')) return;
    const s = document.createElement('script');
    s.id  = 'weez-script';
    s.src = 'https://widget.weezevent.com/weez.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section
      id="passes"
      ref={sectionRef}
      aria-label="Get your pass"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #07060f 0%, #0d0d2b 40%, #0a1929 100%)' }}
    >
      {/* Top ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, rgba(0,229,204,0.12) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 90% 90%, rgba(180,0,255,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Top edge rule */}
      <div
        aria-hidden="true"
        className="relative z-10 h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(0,229,204,0.35) 50%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-28">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          {/* Kicker */}
          <div className="flex items-center justify-center gap-5 mb-5">
            <span aria-hidden="true" className="h-px w-12 md:w-20" style={{ background: 'rgba(0,229,204,0.4)' }} />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#00e5cc]">
              GET YOUR PASS
            </span>
            <span aria-hidden="true" className="h-px w-12 md:w-20" style={{ background: 'rgba(0,229,204,0.4)' }} />
          </div>

          {/* Headline */}
          <h2
            className="font-display uppercase text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', letterSpacing: '0.04em' }}
          >
            SECURE YOUR <span style={{ color: '#00e5cc' }}>SPOT</span>
          </h2>

          {/* Sub */}
          <p
            className="mt-5 mx-auto max-w-[500px]"
            style={{
              fontFamily: BODY_FONT,
              fontSize: '15px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
            }}
          >
            Limited passes available. Join 400+ dancers from 20+ countries at Dance Affinity Festival 2026.
          </p>
        </div>

        {/* ── Widget card ── */}
        <div ref={cardRef} className="flex justify-center">
          {/* Outer glow ring */}
          <div
            className="relative w-full max-w-[680px]"
            style={{
              boxShadow: '0 0 0 1px rgba(0,229,204,0.18), 0 32px 80px rgba(0,0,0,0.55)',
            }}
          >
            {/* Teal top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] z-10"
              aria-hidden="true"
              style={{ background: 'linear-gradient(to right, transparent, #00e5cc 30%, #22a9f0 70%, transparent)' }}
            />

            {/* Corner brackets */}
            {[
              'top-0 left-0 border-t border-l',
              'top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l',
              'bottom-0 right-0 border-b border-r',
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute w-5 h-5 border-[#00e5cc]/50 ${pos}`}
                style={{ margin: '-8px' }}
              />
            ))}

            {/* The actual Weezevent widget */}
            <a
              title="Logiciel billetterie en ligne"
              href="https://weezevent.com/?c=sys_widget"
              className="weezevent-widget-integration"
              data-src="https://widget.weezevent.com/ticket/E1921791/?code=33244&locale=fr-FR&width_auto=1&color_primary=00AEEF"
              data-width="650"
              data-height="600"
              data-id="1921791"
              data-resize="1"
              data-width_auto="1"
              data-noscroll="0"
              data-use-container="yes"
              data-type="neo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Billetterie Weezevent
            </a>
          </div>
        </div>

        {/* ── Bottom note ── */}
        <p
          className="mt-8 text-center"
          style={{ fontFamily: BODY_FONT, fontSize: '12px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}
        >
          Secure checkout · Powered by Weezevent
        </p>
      </div>
    </section>
  );
}
