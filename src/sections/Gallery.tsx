import { useEffect, useRef, useState } from 'react';
import { galleryConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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
        galleryRef.current?.children || [],
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.02, ease: 'none' },
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
        galleryRef.current,
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

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryConfig.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryConfig.images.length) % galleryConfig.images.length);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-pinned bg-[#1a0033] z-[70]"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${galleryConfig.backgroundImage})`,
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
            {galleryConfig.tag}
          </p>
          <h2 className="font-display text-white leading-[0.9] mb-6">
            {galleryConfig.heading}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-[34vw]">
            {galleryConfig.subheadline}
          </p>
          <button
            onClick={() => openLightbox(0)}
            className="btn-outline flex items-center gap-2"
          >
            {galleryConfig.ctaText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div
          ref={galleryRef}
          className="absolute left-6 lg:left-[6vw] bottom-[12vh] grid grid-cols-3 gap-2 max-w-[45vw]"
        >
          {galleryConfig.images.slice(0, 6).map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden cursor-pointer group image-scale-hover ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{ height: index === 0 ? '280px' : '136px' }}
              />
              <div className="absolute inset-0 bg-[#1a0033]/0 group-hover:bg-[#1a0033]/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-10 h-10 bg-[#00e5cc] flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-[#1a0033]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card (Bottom Right) */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] bottom-[10vh] w-[88vw] lg:w-[34vw] min-h-[22vh] bg-white text-[#1a0033] p-6 lg:p-8 shadow-2xl"
        >
          <h3 className="font-display text-2xl lg:text-3xl mb-3">{galleryConfig.cardTitle}</h3>
          <p className="text-sm text-gray-600 mb-4">{galleryConfig.cardBody}</p>
          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e5cc] hover:text-[#1a0033] transition-colors"
          >
            {galleryConfig.cardLink}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-[#1a0033]/95 backdrop-blur-xl flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-[#00e5cc] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:text-[#00e5cc] transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:text-[#00e5cc] transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <div className="max-w-[80vw] max-h-[80vh]">
            <img
              src={galleryConfig.images[currentImage].src}
              alt={galleryConfig.images[currentImage].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-white/60">
            {currentImage + 1} / {galleryConfig.images.length}
          </div>
        </div>
      )}
    </section>
  );
}
