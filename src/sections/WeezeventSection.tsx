import { useEffect, useRef } from 'react';
import { revealOnView } from '../lib/reveal';
import { Check, ShieldCheck, Zap, Ticket } from 'lucide-react';
import { useCopy, type Lang } from '../i18n/LanguageContext';

const BODY_FONT = "'DM Sans', sans-serif";

const COPY_I18N: Record<Lang, {
  kicker: string; headPre: string; headAccent: string; subtitle: string;
  included: string[]; trustSecure: string; trustTicket: string;
  ticketHeader: string; footnote: string; imageAlt: string;
}> = {
  en: {
    kicker: 'GET YOUR PASS',
    headPre: 'SECURE YOUR ', headAccent: 'SPOT',
    subtitle: 'Limited passes available. Join 400+ dancers from 20+ countries for four unforgettable days in Freiburg.',
    included: ['Full 4-day festival access', '3 epic night parties', '2 afternoon socials', '7 intensive bootcamps', 'Pre-party workshops', 'Social dancing day & night'],
    trustSecure: 'Secure checkout', trustTicket: 'Instant e-ticket',
    ticketHeader: 'Official Tickets',
    footnote: 'Secure payment · Instant confirmation by email',
    imageAlt: 'The Dance Affinity Festival community together at MAK Studios',
  },
  de: {
    kicker: 'DEINE TICKETS',
    headPre: 'SICHERE DIR DEINEN ', headAccent: 'PLATZ',
    subtitle: 'Begrenzte Tickets verfügbar. Sei dabei mit 400+ Tänzern aus 20+ Ländern — vier unvergessliche Tage in Freiburg.',
    included: ['Voller Festivalzugang (4 Tage)', '3 epische Nacht-Partys', '2 Nachmittags-Socials', '7 intensive Bootcamps', 'Pre-Party-Workshops', 'Social Dancing Tag & Nacht'],
    trustSecure: 'Sicherer Checkout', trustTicket: 'Sofort-Ticket',
    ticketHeader: 'Offizielle Tickets',
    footnote: 'Sichere Zahlung · Sofortige Bestätigung per E-Mail',
    imageAlt: 'Die Dance Affinity Festival Community gemeinsam im MAK Studios',
  },
  fr: {
    kicker: 'TES BILLETS',
    headPre: 'RÉSERVE TA ', headAccent: 'PLACE',
    subtitle: 'Places limitées. Rejoins plus de 400 danseurs venus de 20+ pays pour quatre jours inoubliables à Fribourg.',
    included: ['Accès complet (4 jours)', '3 soirées épiques', '2 socials en après-midi', '7 bootcamps intensifs', 'Workshops avant-soirée', 'Social dancing jour & nuit'],
    trustSecure: 'Paiement sécurisé', trustTicket: 'E-billet immédiat',
    ticketHeader: 'Billets officiels',
    footnote: 'Paiement sécurisé · Confirmation immédiate par e-mail',
    imageAlt: 'La communauté du Dance Affinity Festival réunie au MAK Studios',
  },
};

export default function WeezeventSection() {
  const COPY = useCopy(COPY_I18N);
  const INCLUDED = COPY.included;
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: leftRef.current,
        from: { opacity: 0, x: -40 },
        to:   { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: sectionRef.current,
        targets: cardRef.current,
        from: { opacity: 0, x: 40 },
        to:   { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 },
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
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% -5%, rgba(0,229,204,0.14) 0%, transparent 50%),' +
            'radial-gradient(ellipse at 95% 100%, rgba(180,0,255,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Top edge rule */}
      <div
        aria-hidden="true"
        className="relative z-10 h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(0,229,204,0.35) 50%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-28">
        {/* items-start (not center) so the left column never re-centers when the
            widget iframe grows/shrinks as the buyer moves through the steps */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: pitch ── */}
          <div ref={leftRef} className="text-center lg:text-left">
            {/* Kicker */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-5">
              <span aria-hidden="true" className="h-px w-10 md:w-16" style={{ background: 'rgba(0,229,204,0.45)' }} />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#00e5cc]">
                {COPY.kicker}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display uppercase text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '0.03em' }}
            >
              {COPY.headPre}<span style={{ color: '#00e5cc' }}>{COPY.headAccent}</span>
            </h2>

            {/* Sub */}
            <p
              className="mt-5 mx-auto lg:mx-0 max-w-[440px]"
              style={{ fontFamily: BODY_FONT, fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}
            >
              {COPY.subtitle}
            </p>

            {/* What's included */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[440px] mx-auto lg:mx-0">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-left">
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(0,229,204,0.14)', border: '1px solid rgba(0,229,204,0.35)' }}
                  >
                    <Check className="h-3 w-3 text-[#00e5cc]" strokeWidth={2.5} />
                  </span>
                  <span style={{ fontFamily: BODY_FONT, fontSize: '13px', color: 'rgba(255,255,255,0.72)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust row */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#00e5cc]" strokeWidth={1.8} aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/45">{COPY.trustSecure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#00e5cc]" strokeWidth={1.8} aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/45">{COPY.trustTicket}</span>
              </div>
            </div>

            {/* Real festival moment — shown full, never cropped */}
            <div className="mt-9 overflow-hidden rounded-xl border border-white/10">
              <img
                src="/images/why dance affinity.png"
                alt={COPY.imageAlt}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── RIGHT: ticket panel ── */}
          <div ref={cardRef}>
            {/* Gradient border wrapper */}
            <div
              className="rounded-2xl p-px"
              style={{
                background: 'linear-gradient(140deg, rgba(0,229,204,0.6) 0%, rgba(34,169,240,0.35) 45%, rgba(0,229,204,0.15) 100%)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(0,229,204,0.08)',
              }}
            >
              <div className="rounded-[15px] overflow-hidden bg-[#0a1020]">
                {/* Themed header strip */}
                <div
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{ background: 'linear-gradient(90deg, rgba(0,229,204,0.12) 0%, rgba(10,16,32,0) 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <Ticket className="h-4 w-4 text-[#00e5cc]" strokeWidth={1.8} aria-hidden="true" />
                    <span className="font-display uppercase text-white text-[13px] tracking-[0.1em]">
                      {COPY.ticketHeader}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/35">
                    Weezevent
                  </span>
                </div>

                {/* White widget body */}
                <div className="bg-white p-2 sm:p-3">
                  <a
                    title="Logiciel billetterie en ligne"
                    href="https://weezevent.com/?c=sys_widget"
                    className="weezevent-widget-integration"
                    data-src="https://widget.weezevent.com/ticket/E1921791/?code=33244&locale=fr-FR&width_auto=1&color_primary=00E5CC"
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
            </div>

            {/* Footnote */}
            <p
              className="mt-4 text-center"
              style={{ fontFamily: BODY_FONT, fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}
            >
              {COPY.footnote}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
