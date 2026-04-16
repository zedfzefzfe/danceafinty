import { useEffect, useRef } from 'react';
import { footerConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0d0d2b] border-t border-white/10 z-[100]"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="font-display text-xl sm:text-3xl lg:text-4xl text-white mb-4">
              {footerConfig.brandName}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              {footerConfig.tagline}
            </p>
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-16">
            {footerConfig.linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-mono text-xs tracking-[0.15em] text-white/40 uppercase mb-3 sm:mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToSection(link.href);
                          }
                        }}
                        className="text-xs sm:text-sm text-white/70 hover:text-[#00e5cc] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Copyright */}
            <p className="text-[10px] sm:text-xs text-white/40">
              {footerConfig.copyrightText}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-3 sm:gap-6">
              {footerConfig.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[10px] sm:text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social + Back to Top */}
            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {footerConfig.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#00e5cc] hover:text-[#00e5cc] transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon === 'Instagram' && <Instagram className="w-4 h-4" />}
                    {link.icon === 'Facebook' && <Facebook className="w-4 h-4" />}
                  </a>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-8 h-8 border border-[#00e5cc] flex items-center justify-center text-[#00e5cc] hover:bg-[#00e5cc] hover:text-[#1a0033] transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-[#00e5cc] via-[#ff00aa] to-[#00e5cc]" />
    </footer>
  );
}
