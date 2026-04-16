import { useEffect, useRef, useState } from 'react';
import { faqConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-[#0d0d2b] py-12 lg:py-24 xl:py-32 z-[80]"
    >
      {/* Light leak effect */}
      <div className="light-leak" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.2em] text-[#00e5cc] mb-4">
            {faqConfig.tag}
          </p>
          <h2 className="font-display text-white text-5xl lg:text-7xl mb-6">
            {faqConfig.heading}
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqConfig.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 lg:p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-display text-lg lg:text-xl text-white pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 bg-[#00e5cc]/20 flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-[#00e5cc]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#00e5cc]" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 lg:p-6 pt-0 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection(faqConfig.ctaTarget)}
            className="inline-flex items-center gap-2 text-[#00e5cc] hover:text-white transition-colors font-medium"
          >
            {faqConfig.ctaText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
