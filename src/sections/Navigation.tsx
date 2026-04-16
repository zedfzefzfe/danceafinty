import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { navigationConfig } from '../config';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1a0033]/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/images/Copie de Asset 1-8.png" 
                alt="Dance Affinity Logo" 
                className="h-10 lg:h-12 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigationConfig.menuLinks.slice(1).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-xs tracking-[0.12em] uppercase text-white/70 hover:text-[#00e5cc] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Buy Pass Button (Desktop) */}
              <a
                href="#passes"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#passes');
                }}
                className="hidden lg:block px-5 py-2 border border-[#00e5cc] text-[#00e5cc] text-xs tracking-[0.12em] uppercase hover:bg-[#00e5cc] hover:text-[#1a0033] transition-all duration-300"
              >
                Buy Pass
              </a>

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden flex items-center gap-2 text-white hover:text-[#00e5cc] transition-colors"
              >
                <span className="hidden sm:block text-xs tracking-[0.12em] uppercase">Menu</span>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#1a0033]/95 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20">
            <span className="font-mono text-xs tracking-[0.2em] text-white">
              {navigationConfig.brandName}
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-[#00e5cc] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {navigationConfig.menuLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-display text-4xl md:text-6xl lg:text-7xl text-white hover:text-[#00e5cc] transition-colors tracking-wide"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 lg:px-12 py-8 flex items-center justify-between">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {navigationConfig.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#00e5cc] transition-colors"
                  aria-label={link.label}
                >
                  {link.icon === 'Instagram' && <Instagram className="w-5 h-5" />}
                  {link.icon === 'Facebook' && <Facebook className="w-5 h-5" />}
                </a>
              ))}
            </div>

            {/* Date */}
            <span className="font-mono text-xs tracking-[0.12em] text-white/40">
              OCT 30 – NOV 2, 2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
