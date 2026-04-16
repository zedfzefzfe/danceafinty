import { useState, useEffect } from 'react';
import { Ticket, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (about 100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.5 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToPasses = () => {
    const element = document.querySelector('#passes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
      {/* Dismiss button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      {/* CTA Button */}
      <button
        onClick={scrollToPasses}
        className="flex items-center gap-3 px-6 py-4 bg-[#00e5cc] text-[#1a0033] font-semibold shadow-lg neon-glow-teal hover:bg-white transition-all duration-300 animate-float"
      >
        <Ticket className="w-5 h-5" />
        <span className="text-sm tracking-wider uppercase">Buy Ticket</span>
      </button>
    </div>
  );
}
