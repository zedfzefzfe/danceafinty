import { useEffect, useRef } from 'react';
import { revealOnView } from '../lib/reveal';
import {
  MapPin,
  Navigation,
  TrainFront,
  Plane,
  TramFront,
  Car,
  BedDouble,
  UtensilsCrossed,
  Heart,
  ChevronRight,
  Footprints,
  Calendar,
  Users,
  Music,
  GraduationCap,
  PersonStanding,
} from 'lucide-react';


// ─── Edit these constants to update copy ─────────────────────────────────────
const COPY = {
  heading: 'EASY TO REACH',
  subtitle: 'EVERYTHING YOU NEED, RIGHT IN THE HEART OF FREIBURG',
  intro:
    'Dance Affinity Festival takes place in the vibrant heart of Freiburg im Breisgau. Centrally located. Perfectly connected. Easy to reach from anywhere.',
  venueLabel: 'OUR VENUE',
  venueName: 'MAK STUDIOS',
  venueAddress: 'Schnewlinstraße 1, 79098 Freiburg im Breisgau, Germany',
  venueBlurb:
    'Modern studio in the city center with the perfect atmosphere to dance, connect and enjoy.',
  walkingBanner:
    'You are already in the heart of the festival. Everything is within walking distance!',
  closing: 'All you need is here. Just arrive and let the magic happen.',
};

// ─── Swap these to use real photo assets ─────────────────────────────────────
const PHOTOS = {
  city: '/images/666.png',
  venue: '/images/5555.png',
  map: '/images/freiburg-map.jpg',
};
// Reuses the same logo asset as the navbar
const LOGO = '/images/Copie de Asset 1-8.png';

// Map pins — positions are % of the map card, tweak alongside the real map image
const MAP_PINS = [
  { label: 'Freiburg\nCentral Station', top: '16%', left: '30%', highlight: false, icon: TrainFront },
  { label: 'City Center\n(Altstadt)', top: '38%', left: '70%', highlight: false },
  { label: 'MAK STUDIOS', top: '52%', left: '34%', highlight: true },
  { label: 'Bertoldsbrunnen', top: '47%', left: '62%', highlight: false },
  { label: 'Martinstor', top: '72%', left: '56%', highlight: false },
];

const TRAVEL = [
  {
    icon: Footprints,
    label: 'FROM CENTRAL STATION',
    times: [
      { value: '10 MIN', mode: 'by tram' },
      { value: '15 MIN', mode: 'on foot' },
    ],
  },
  {
    icon: MapPin,
    label: 'FROM CITY CENTER',
    times: [{ value: '5 MIN', mode: 'on foot' }],
  },
];

const ROUTES = [
  {
    icon: TrainFront,
    title: 'BY TRAIN',
    text: 'Freiburg (Breisgau) Hbf.\nWell connected to major cities:',
    list: ['Basel ≈ 45 min', 'Stuttgart ≈ 2 h', 'Frankfurt ≈ 3 h', 'Zürich ≈ 1 h 40'],
    footnote: '',
  },
  {
    icon: Plane,
    title: 'BY PLANE',
    text: 'EuroAirport Basel-Mulhouse-Freiburg ≈ 50 min by car / train.\nZurich Airport ≈ 1 h 40 by train.\nStrasbourg Airport ≈ 1 h by train.',
    list: [],
    footnote: '',
  },
  {
    icon: TramFront,
    title: 'BY TRAM',
    text: 'Direct connection from the central station to the city center.\nTram lines: 1, 2, 3, 4, 5.',
    list: [],
    footnote: '',
  },
  {
    icon: Car,
    title: 'BY CAR & PARKING',
    text: 'Easy access via A5 motorway.\nSeveral parking garages nearby:',
    list: [
      'Parkhaus Bertoldsbrunnen (3 min walk)',
      'Parkhaus Karlsbau (5 min walk)',
      'Parkhaus City (7 min walk)',
    ],
    footnote: 'Park & Ride available on the outskirts.',
  },
];

const EXTRAS = [
  {
    icon: BedDouble,
    title: 'STAY',
    text: 'Many hotels within walking distance. Options for every budget:',
    list: ['Budget', 'Comfort', 'Premium'],
  },
  {
    icon: UtensilsCrossed,
    title: 'EAT & ENJOY',
    text: 'Bars, cafés and restaurants all around. Perfect for your weekend vibes!',
    list: [],
  },
];

const STATS = [
  { icon: Calendar, primary: '3 NIGHTS', secondary: 'Friday - Saturday - Sunday' },
  { icon: Users, primary: '2 SOCIALS', secondary: 'Saturday & Sunday' },
  { icon: Music, primary: '3 NIGHT PARTIES', secondary: 'Unforgettable vibes every night' },
  { icon: GraduationCap, primary: 'BOOTCAMPS', secondary: 'Intensive training 10:00 – 16:00' },
  { icon: PersonStanding, primary: 'WORKSHOPS', secondary: 'Pre-party workshops 21:00 – 23:00' },
];

const BODY_FONT = "'DM Sans', sans-serif";
const CARD = 'rounded-xl border border-white/10 bg-white/[0.03]';

export default function PracticalInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const cleanups = [
      revealOnView({
        trigger: sectionRef.current,
        targets: headerRef.current,
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      }),
      revealOnView({
        trigger: bodyRef.current,
        targets: bodyRef.current?.children,
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      }),
      revealOnView({
        targets: statsRef.current,
        from: { opacity: 0, y: 25 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      }),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      aria-label="Practical Information"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{ background: 'linear-gradient(180deg, #080d1a 0%, #0a1020 50%, #070c18 100%)' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% 20%, rgba(0,229,204,0.05) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 85% 75%, rgba(34,169,240,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ Header ═════════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="flex items-start justify-between gap-8">
          <div>
            <h2
              className="font-display uppercase leading-[0.95] bg-gradient-to-r from-[#00e5cc] via-[#7feee2] to-white bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', letterSpacing: '0.13em' }}
            >
              {COPY.heading}
            </h2>
            <p className="font-mono text-[9.5px] md:text-[11px] tracking-[0.22em] uppercase text-white/45 mt-3">
              {COPY.subtitle}
            </p>
          </div>

          <img
            src={LOGO}
            alt="Dance Affinity"
            className="hidden sm:block w-[120px] lg:w-[160px] h-auto shrink-0"
          />
        </div>

        {/* ══ Body — 3 columns ═══════════════════════════════════════════════ */}
        <div
          ref={bodyRef}
          className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.12fr_0.95fr] gap-5 md:gap-6"
        >

          {/* ── LEFT: venue ── */}
          <div>
            <p
              style={{
                fontFamily: BODY_FONT,
                fontSize: '12.5px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
              }}
            >
              {COPY.intro}
            </p>

            {/* Cityscape + venue details — one continuous card */}
            <div className={`${CARD} mt-5 overflow-hidden`}>

              {/* Venue hero — the real MAK Studios dance hall */}
              <div className="relative h-[260px] md:h-[320px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(150deg, #14243a 0%, #0d1a2e 100%)' }}
                />
                <img
                  src={PHOTOS.city}
                  alt="MAK Studios main dance hall in Freiburg"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fades into the venue block below so the two read as one panel */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(9,14,26,1) 0%, rgba(9,14,26,0.65) 22%, rgba(6,10,20,0.1) 55%, transparent 100%)',
                  }}
                />
              </div>

              {/* Venue details — pulled up over the faded base of the photo */}
              <div className="relative -mt-14 p-5">
              <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#00e5cc]">
                {COPY.venueLabel}
              </p>
              <h3 className="font-display uppercase text-white text-[24px] leading-none tracking-[0.04em] mt-2">
                {COPY.venueName}
              </h3>

              <div className="flex items-start gap-2 mt-3">
                <MapPin className="w-4 h-4 shrink-0 text-[#00e5cc] mt-0.5" strokeWidth={1.6} aria-hidden="true" />
                <p
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '11.5px',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  {COPY.venueAddress}
                </p>
              </div>

              <p
                className="mt-4"
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: '11.5px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65,
                }}
              >
                {COPY.venueBlurb}
              </p>

                {/* Venue photo — the MAK Studios lounge */}
                <div className="relative mt-4 h-[150px] rounded-lg overflow-hidden border border-white/10">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(150deg, #14243a 0%, #0d1a2e 100%)' }}
                  />
                  <img
                    src={PHOTOS.venue}
                    alt="MAK Studios lounge and event space"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTER: map ── */}
          <div>
            <div className={`${CARD} overflow-hidden`}>
            <div className="relative h-[380px] md:h-[440px]">
              <iframe
                title="MAK Studios location"
                src="https://www.google.com/maps?q=MAK+Studios+Schnewlinstraße+1+79098+Freiburg+im+Breisgau&output=embed&z=16"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Travel-time chips — same card as the map, divided */}
            <div className="grid grid-cols-2 border-t border-white/10 divide-x divide-white/10">
              {TRAVEL.map(({ icon: Icon, label, times }) => (
                <div key={label} className="p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                    <p className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-white/50">
                      {label}
                    </p>
                  </div>

                  <div className="flex items-end gap-5 mt-3">
                    {times.map(({ value, mode }) => (
                      <div key={mode}>
                        <p className="font-display text-white text-[22px] leading-none tracking-[0.03em]">
                          {value}
                        </p>
                        <p
                          className="mt-1"
                          style={{ fontFamily: BODY_FONT, fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}
                        >
                          {mode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>

            {/* Walking-distance banner */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#00e5cc]/35 bg-[#00e5cc]/[0.07] px-5 py-4">
              <Heart className="w-5 h-5 shrink-0 text-[#00e5cc]" strokeWidth={1.6} fill="currentColor" aria-hidden="true" />
              <p
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: '11.5px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                }}
              >
                {COPY.walkingBanner}
              </p>
            </div>
          </div>

          {/* ── RIGHT: getting there ── */}
          <div className="flex flex-col gap-4">
            {ROUTES.map(({ icon: Icon, title, text, list, footnote }) => (
              <div key={title} className={`${CARD} relative p-4 pr-9`}>
                <ChevronRight
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00e5cc]/15 border border-[#00e5cc]/35">
                    <Icon className="h-4 w-4 text-[#00e5cc]" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <div>
                    <h3 className="font-display uppercase text-[#00e5cc] text-[14px] tracking-[0.08em] leading-none">
                      {title}
                    </h3>
                    <p
                      className="mt-2 whitespace-pre-line"
                      style={{
                        fontFamily: BODY_FONT,
                        fontSize: '10.5px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.6,
                      }}
                    >
                      {text}
                    </p>

                    {list.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-1.5"
                            style={{
                              fontFamily: BODY_FONT,
                              fontSize: '10.5px',
                              color: 'rgba(255,255,255,0.45)',
                              lineHeight: 1.6,
                            }}
                          >
                            <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#00e5cc]/70" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {footnote && (
                      <p
                        className="mt-2"
                        style={{
                          fontFamily: BODY_FONT,
                          fontSize: '10.5px',
                          color: 'rgba(255,255,255,0.45)',
                          lineHeight: 1.6,
                        }}
                      >
                        {footnote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ══ Stats strip ════════════════════════════════════════════════════ */}
        <div ref={statsRef} className="mt-12 md:mt-16 border-t border-white/10 pt-8">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            {STATS.map(({ icon: Icon, primary, secondary }, i) => (
              <div
                key={primary}
                className={`flex items-center gap-3 px-4 lg:px-5 py-5
                  ${i % 2 === 1 ? 'border-l border-white/10' : ''}
                  ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}
                  ${i < STATS.length - 1 ? 'border-b border-white/10 lg:border-b-0' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#00e5cc]/30"
                >
                  <Icon className="w-5 h-5 text-[#00e5cc]" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="font-display uppercase text-white text-[17px] leading-none tracking-[0.04em]">
                    {primary}
                  </p>
                  <p
                    className="mt-1.5"
                    style={{ fontFamily: BODY_FONT, fontSize: '10px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}
                  >
                    {secondary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ Closing line ═══════════════════════════════════════════════════ */}
        <div className="mt-10 md:mt-12 flex items-center gap-5">
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          <p className="font-script italic text-[#00e5cc] text-[20px] md:text-[26px] leading-none text-center">
            {COPY.closing}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
