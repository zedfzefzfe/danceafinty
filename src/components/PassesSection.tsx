import { useEffect, useRef, useState } from 'react';
import './PassesSection.css';

// EDIT PASS DATA HERE ─────────────────────────────────────────────────────────
// Swap prices, tier names, included items, and CTA copy freely.
// accentColor drives the name, top line, and button color for each tier.
interface Pass {
  id: number;
  name: string;
  price: number;
  accentColor: string;
  items: string[];
  cta: string;
  buttonStyle: 'outlined' | 'solid';
  tag: string | null;
}

const passes: Pass[] = [
  {
    id: 1,
    name: 'EARLY BIRD',
    price: 79,
    accentColor: '#00e5cc',
    items: [
      'All bootcamp sessions',
      '3 party nights included',
      'Welcome drink on arrival',
      'Access to all dance floors',
    ],
    cta: 'LOCK THIS PRICE',
    buttonStyle: 'outlined',
    tag: null,
  },
  {
    id: 2,
    name: 'FULL PASS',
    price: 119,
    accentColor: '#ffffff',
    items: [
      'Everything in Early Bird',
      'Priority bootcamp registration',
      'Exclusive artist meet & greet',
      'Official festival merchandise',
      'Video recordings of sessions',
    ],
    cta: 'GET YOUR PASS',
    buttonStyle: 'solid',
    tag: 'RECOMMENDED',
  },
  {
    id: 3,
    name: 'VIP EXPERIENCE',
    price: 199,
    accentColor: '#C9A96E',
    items: [
      'Everything in Full Pass',
      'Private 1-on-1 session with artist',
      'VIP lounge access all nights',
      'Airport shuttle service',
      'Surprise gift package',
    ],
    cta: 'APPLY FOR VIP',
    buttonStyle: 'outlined',
    tag: null,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Price counter (RAF-based, ease-out) ───────────────────────────────────────

interface PriceCounterProps {
  target: number;
  start: boolean;
  noAnim: boolean;
}

function PriceCounter({ target, start, noAnim }: PriceCounterProps) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (noAnim) { setCount(target); return; }

    const duration = 1500;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else setCount(target);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, target, noAnim]);

  return <>{count}</>;
}

// ── Individual pass card ──────────────────────────────────────────────────────

interface PassCardProps {
  pass: Pass;
  index: number;
  visible: boolean;
  noAnim: boolean;
}

function PassCard({ pass, index, visible, noAnim }: PassCardProps) {
  const isFeatured = pass.tag === 'RECOMMENDED';

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`ps-card-wrapper${isFeatured ? ' ps-card-wrapper--featured' : ''}`}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible || noAnim ? 'translateY(0)' : 'translateY(50px)',
        transition: noAnim
          ? 'opacity 0.3s ease'
          : `opacity 0.7s ease, transform 0.7s ease`,
        transitionDelay: noAnim ? '0s' : `${0.2 + index * 0.15}s`,
      }}
    >
      <article
        className="ps-card"
        role="article"
        aria-label={`${pass.name} pass, ${pass.price} euros`}
      >
        {/* Top accent line — grows full-width on hover */}
        <div
          className="ps-accent-line"
          style={{ '--accent': pass.accentColor, background: pass.accentColor } as React.CSSProperties}
          aria-hidden="true"
        />

        {/* "RECOMMENDED" badge — top right, only for Featured */}
        {pass.tag && (
          <div className="ps-tag">{pass.tag}</div>
        )}

        {/* Pass tier name */}
        <p className="ps-name" style={{ color: pass.accentColor }}>{pass.name}</p>

        {/* Price */}
        <div className="ps-price">
          <span className="ps-currency">€</span>
          <span className="ps-amount">
            <PriceCounter target={pass.price} start={visible} noAnim={noAnim} />
          </span>
          <span className="ps-period">/person</span>
        </div>

        {/* Thin editorial divider */}
        <div className="ps-divider" aria-hidden="true" />

        {/* Included items — dashes, not checkmarks */}
        <ul className="ps-items" aria-label="What's included">
          {pass.items.map((item) => (
            <li key={item} className="ps-item">
              <span className="ps-item-dash" aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA — pushed to bottom via flex margin-top: auto */}
        <button
          className={`ps-btn ps-btn--${pass.buttonStyle}`}
          style={{ '--accent': pass.accentColor } as React.CSSProperties}
          onClick={() => scrollToSection('#passes')}
          aria-label={`${pass.cta} — ${pass.name} pass at €${pass.price}`}
        >
          {pass.cta}
        </button>
      </article>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PassesSection() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const urgencyRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  const noAnim = prefersReducedMotion;

  const [headerVisible,  setHeaderVisible]  = useState(false);
  const [cardsVisible,   setCardsVisible]   = useState(false);
  const [urgencyVisible, setUrgencyVisible] = useState(false);

  useEffect(() => {
    const make = (setter: () => void, threshold = 0.1) =>
      new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(); },
        { threshold }
      );

    const headerObs  = make(() => setHeaderVisible(true));
    const cardsObs   = make(() => setCardsVisible(true));
    const urgencyObs = make(() => setUrgencyVisible(true));

    if (headerRef.current)  headerObs.observe(headerRef.current);
    if (cardsRef.current)   cardsObs.observe(cardsRef.current);
    if (urgencyRef.current) urgencyObs.observe(urgencyRef.current);

    return () => {
      headerObs.disconnect();
      cardsObs.disconnect();
      urgencyObs.disconnect();
    };
  }, []);

  return (
    <section
      id="passes"
      className="ps-section"
      aria-label="Festival Passes and Pricing"
    >
      {/* Ghost watermark — barely perceptible depth */}
      <div className="ps-watermark" aria-hidden="true">79</div>

      <div className="ps-container">

        {/* ── Header: left-aligned, two-voice typography ── */}
        <div ref={headerRef} className="ps-header">
          <div className="ps-header-main">
            <p
              className="ps-label"
              style={{
                opacity:    headerVisible ? 1 : 0,
                transform:  headerVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: noAnim ? 'none' : 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              04 — PASSES
            </p>
            <h2
              className="ps-heading"
              style={{
                opacity:    headerVisible ? 1 : 0,
                transform:  headerVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: noAnim ? 'none' : 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              <span className="ps-heading-serif">Choose your</span>
              <br />
              <span className="ps-heading-bold">WAY IN</span>
            </h2>
          </div>

          <div className="ps-header-sub">
            <span className="ps-refund-note">100% refundable* · Secure checkout</span>
          </div>
        </div>

        {/* Rule */}
        <div
          className="ps-rule"
          aria-hidden="true"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transition: noAnim ? 'none' : 'opacity 0.5s ease 0.3s',
          }}
        />

        {/* ── Pass cards — asymmetric editorial grid ── */}
        <div ref={cardsRef} className="ps-grid">
          {passes.map((pass, index) => (
            <PassCard
              key={pass.id}
              pass={pass}
              index={index}
              visible={cardsVisible}
              noAnim={noAnim}
            />
          ))}
        </div>

        {/* ── Urgency strip ── */}
        <div
          ref={urgencyRef}
          className="ps-urgency"
          style={{
            opacity:    urgencyVisible ? 1 : 0,
            transition: noAnim ? 'none' : 'opacity 0.6s ease',
          }}
        >
          <span className="ps-dot" aria-hidden="true" />
          <p className="ps-urgency-text">
            Early Bird closes in <strong>23 days</strong>{' '}
            —{' '}<strong>20 passes</strong> remaining
          </p>
        </div>

        {/* ── Fine print ── */}
        <p className="ps-fine-print">
          *Full refund available up to 30 days before the event.
          Payment processed securely via Stripe.
        </p>

      </div>
    </section>
  );
}
