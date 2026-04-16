import { useEffect, useRef, useState } from 'react';
import { newsletterConfig, footerConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: '8vw', opacity: 0, scale: 1.03 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contactRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0d0d2b] z-[90]"
    >
      <div className="flex flex-col lg:flex-row lg:min-h-[60vh]">
        {/* Left Content */}
        <div
          ref={leftRef}
          className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-[6vw] py-8 sm:py-12 lg:py-24"
        >
          <h2 className="font-display text-white text-2xl sm:text-4xl lg:text-6xl mb-4">
            {newsletterConfig.title}
          </h2>
          <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-md">
            {newsletterConfig.body}
          </p>

          {/* Newsletter Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterConfig.placeholder}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00e5cc] transition-colors text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 sm:px-6 py-3 bg-[#00e5cc] text-[#1a0033] font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{newsletterConfig.buttonText}</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 text-[#00e5cc] text-sm sm:text-base">
              <div className="w-8 h-8 bg-[#00e5cc]/20 flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <span>Thanks for subscribing! We'll keep you updated.</span>
            </div>
          )}

          {/* Contact Info */}
          <div
            ref={contactRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#00e5cc]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#00e5cc]" />
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">Email</p>
                <a
                  href="mailto:hello@danceaffinity.de"
                  className="text-xs sm:text-sm text-white hover:text-[#00e5cc] transition-colors"
                >
                  hello@danceaffinity.de
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#00e5cc]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#00e5cc]" />
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">Phone</p>
                <a
                  href="tel:+49123456789"
                  className="text-xs sm:text-sm text-white hover:text-[#00e5cc] transition-colors"
                >
                  +49 123 456789
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#00e5cc]/20 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-[#00e5cc]" />
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">Social</p>
                <div className="flex items-center gap-3">
                  {footerConfig.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-white hover:text-[#00e5cc] transition-colors"
                    >
                      {link.icon === 'Instagram' && <Instagram className="w-4 h-4" />}
                      {link.icon === 'Facebook' && <Facebook className="w-4 h-4" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div
          ref={rightRef}
          className="hidden lg:block w-[40%] relative"
        >
          <img
            src={newsletterConfig.backgroundImage}
            alt="Dance festival"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d2b] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
