// ─── Dance Affinity Festival Configuration ───────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Dance Affinity Festival | Kizomba & Bachata in Freiburg",
  description: "Discover the magic of Kizomba and Bachata in a new way! 4 days of workshops, bootcamps and parties with international artists in Freiburg, Germany.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
}

export const navigationConfig: NavigationConfig = {
  brandName: "DANCE AFFINITY",
  menuLinks: [
    { label: "Home", href: "#hero" },
    { label: "Artists", href: "#artists" },
    { label: "Schedule", href: "#schedule" },
    { label: "Bootcamps", href: "#bootcamps" },
    { label: "Passes", href: "#passes" },
    { label: "Location", href: "#location" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
  ],
};

// ─── Hero Section ────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  dateLocation: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
  cardTitle: string;
  cardBody: string;
  cardLink: string;
}

export const heroConfig: HeroConfig = {
  tagline: "OCTOBER 30 – NOVEMBER 2, 2026",
  title: "DANCE AFFINITY FESTIVAL",
  dateLocation: "Freiburg im Breisgau, Germany",
  ctaPrimaryText: "Get your pass – 79€",
  ctaPrimaryTarget: "#passes",
  ctaSecondaryText: "See the lineup",
  ctaSecondaryTarget: "#artists",
  backgroundImage: "/images/hero_dancers_neon.jpg",
  cardTitle: "What is it?",
  cardBody: "4 days of Kizomba & Bachata workshops, bootcamps and parties with international artists.",
  cardLink: "Read more →",
};

// ─── Artists Section ─────────────────────────────────────────────────────────

export interface Artist {
  id: number;
  name: string;
  role: string;
  style: string;
  image: string;
}

export interface ArtistsConfig {
  tag: string;
  heading: string;
  subheadline: string;
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
  cardTitle: string;
  cardBody: string;
  cardLink: string;
  artists: Artist[];
}

export const artistsConfig: ArtistsConfig = {
  tag: "INTERNATIONAL LINEUP",
  heading: "KIZOMBA & BACHATA ARTISTS",
  subheadline: "International teachers, DJs and performers—one long weekend.",
  ctaText: "See the lineup",
  ctaTarget: "#artists",
  backgroundImage: "/images/artists_lineup_blue.jpg",
  cardTitle: "Featured artists",
  cardBody: "Check out the teaching couples, DJ sets and special showcases.",
  cardLink: "Explore →",
  artists: [
    { id: 1, name: "Marcus & Elena", role: "Kizomba Instructors", style: "Kizomba", image: "/images/artist_kizomba_1.jpg" },
    { id: 2, name: "Sofia Ferreira", role: "Kizomba Artist", style: "Kizomba", image: "/images/artist_kizomba_2.jpg" },
    { id: 3, name: "Carlos Mendez", role: "Bachata Instructor", style: "Bachata", image: "/images/artist_bachata_1.jpg" },
    { id: 4, name: "Isabella Cruz", role: "Bachata Artist", style: "Bachata", image: "/images/artist_bachata_2.jpg" },
    { id: 5, name: "DJ Kizomatik", role: "Resident DJ", style: "DJ", image: "/images/dj_1.jpg" },
    { id: 6, name: "DJ Luna", role: "Guest DJ", style: "DJ", image: "/images/dj_2.jpg" },
  ],
};

// ─── Schedule Section ────────────────────────────────────────────────────────

export interface ScheduleDay {
  day: string;
  hours: string;
}

export interface ScheduleConfig {
  tag: string;
  heading: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
  cardTitle: string;
  scheduleDays: ScheduleDay[];
}

export const scheduleConfig: ScheduleConfig = {
  tag: "4 DAYS OF DANCING",
  heading: "SCHEDULE",
  subheadline: "Classes by day, parties by night—plan your weekend.",
  ctaPrimaryText: "Full timetable",
  ctaPrimaryTarget: "#schedule",
  ctaSecondaryText: "Add to calendar",
  ctaSecondaryTarget: "#",
  backgroundImage: "/images/schedule_silhouette_neon.jpg",
  cardTitle: "Daily hours",
  scheduleDays: [
    { day: "Thursday", hours: "19:00 – 02:00" },
    { day: "Friday", hours: "10:00 – 04:00" },
    { day: "Saturday", hours: "10:00 – 05:00" },
    { day: "Sunday", hours: "10:00 – 02:00" },
  ],
};

// ─── Bootcamps Section ───────────────────────────────────────────────────────

export interface BootcampFeature {
  text: string;
}

export interface BootcampsConfig {
  tag: string;
  heading: string;
  subheadline: string;
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
  cardTitle: string;
  features: BootcampFeature[];
  cardLink: string;
}

export const bootcampsConfig: BootcampsConfig = {
  tag: "INTENSIVE TRAINING",
  heading: "BOOTCAMPS",
  subheadline: "Focused training to unlock your next level—fast.",
  ctaText: "Choose your bootcamp",
  ctaTarget: "#passes",
  backgroundImage: "/images/bootcamps_close_embrace.jpg",
  cardTitle: "What to expect",
  features: [
    { text: "Small groups, real feedback" },
    { text: "Technique + musicality drills" },
    { text: "Social application every night" },
  ],
  cardLink: "See topics →",
};

// ─── Passes Section ──────────────────────────────────────────────────────────

export interface Pass {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface PassesConfig {
  tag: string;
  heading: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
  cardTitle: string;
  passes: Pass[];
}

export const passesConfig: PassesConfig = {
  tag: "SECURE YOUR SPOT",
  heading: "PASSES",
  subheadline: "Pick the pass that fits your weekend.",
  ctaPrimaryText: "Buy your pass",
  ctaSecondaryText: "Ask a question",
  backgroundImage: "/images/passes_motion_diagonal.jpg",
  cardTitle: "Pricing",
  passes: [
    {
      id: 1,
      name: "Full Pass",
      price: "from 79€",
      description: "Complete festival access",
      features: ["All workshops", "All parties", "Showcase entry"],
      highlighted: true,
      badge: "BEST VALUE",
    },
    {
      id: 2,
      name: "Party Pass",
      price: "from 45€",
      description: "Party all night long",
      features: ["All parties", "Showcase entry", "Social dancing"],
    },
    {
      id: 3,
      name: "Bootcamp Add-on",
      price: "25€",
      description: "Level up your skills",
      features: ["Intensive session", "Small group", "Personal feedback"],
    },
  ],
};

// ─── Location Section ────────────────────────────────────────────────────────

export interface LocationConfig {
  tag: string;
  heading: string;
  subheadline: string;
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
  cardTitle: string;
  venueInfo: string[];
  cardLink: string;
}

export const locationConfig: LocationConfig = {
  tag: "FREIBURG IM BREISGAU",
  heading: "LOCATION",
  subheadline: "Freiburg im Breisgau—easy to reach, hard to leave.",
  ctaText: "Get directions",
  ctaTarget: "#",
  backgroundImage: "/images/location_warm_stage.jpg",
  cardTitle: "Venue & travel",
  venueInfo: [
    "City center venue with multiple rooms",
    "Train: Freiburg (Breisgau) Hbf",
    "Airport: Basel (BSL) / Stuttgart (STR)",
  ],
  cardLink: "Plan your trip →",
};

// ─── Gallery Section ─────────────────────────────────────────────────────────

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryConfig {
  tag: string;
  heading: string;
  subheadline: string;
  ctaText: string;
  backgroundImage: string;
  cardTitle: string;
  cardBody: string;
  cardLink: string;
  images: GalleryImage[];
}

export const galleryConfig: GalleryConfig = {
  tag: "MEMORIES IN MOTION",
  heading: "GALLERY",
  subheadline: "A weekend of connection, music and movement.",
  ctaText: "Open gallery",
  backgroundImage: "/images/gallery_blue_haze.jpg",
  cardTitle: "Highlights",
  cardBody: "Parties, workshops, late-night moments.",
  cardLink: "View photos →",
  images: [
    { id: 1, src: "/images/gallery_1.jpg", alt: "Kizomba dance performance" },
    { id: 2, src: "/images/gallery_2.jpg", alt: "Bachata dance showcase" },
    { id: 3, src: "/images/gallery_3.jpg", alt: "Festival party atmosphere" },
    { id: 4, src: "/images/gallery_4.jpg", alt: "Dance workshop session" },
    { id: 5, src: "/images/hero_dancers_neon.jpg", alt: "Neon dance floor" },
    { id: 6, src: "/images/bootcamps_close_embrace.jpg", alt: "Intimate dance moment" },
  ],
};

// ─── FAQ Section ─────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "GOT QUESTIONS?",
  heading: "FAQ",
  ctaText: "Still have questions? Contact us →",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "What is included in the Full Pass?",
      answer: "The Full Pass gives you access to all workshops, all parties, and the showcase event. It's the complete festival experience!",
    },
    {
      id: 2,
      question: "Can I buy tickets at the door?",
      answer: "Yes, but we highly recommend buying in advance as passes are limited and prices increase at the door. Early bird passes sell out quickly!",
    },
    {
      id: 3,
      question: "Do I need a dance partner?",
      answer: "Not at all! We rotate partners during workshops, and there are plenty of people to dance with at the parties. It's a great way to meet new dancers!",
    },
    {
      id: 4,
      question: "What level should I be?",
      answer: "We offer workshops for all levels—from absolute beginners to advanced dancers. Each workshop is labeled with its recommended level.",
    },
    {
      id: 5,
      question: "Is there a refund policy?",
      answer: "Yes, passes are 100% refundable up to 30 days before the event. After that, you can transfer your pass to another dancer.",
    },
    {
      id: 6,
      question: "Where can I stay in Freiburg?",
      answer: "We have partnered with several hotels near the venue offering special rates for festival attendees. Check our location section for details!",
    },
  ],
};

// ─── Newsletter Section ──────────────────────────────────────────────────────

export interface NewsletterConfig {
  title: string;
  body: string;
  buttonText: string;
  placeholder: string;
  backgroundImage: string;
}

export const newsletterConfig: NewsletterConfig = {
  title: "Stay in the loop",
  body: "Get lineup drops, playlist updates and early-bird access.",
  buttonText: "Subscribe",
  placeholder: "Enter your email",
  backgroundImage: "/images/newsletter_dancers_tall.jpg",
};

// ─── Footer Section ──────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: SocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "DANCE AFFINITY",
  tagline: "Discover the magic of Kizomba and Bachata in a new way!",
  linkGroups: [
    {
      title: "Festival",
      links: [
        { label: "Lineup", href: "#artists" },
        { label: "Schedule", href: "#schedule" },
        { label: "Passes", href: "#passes" },
        { label: "Location", href: "#location" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
        { label: "Accessibility", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Imprint", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ],
  legalLinks: [
    { label: "Imprint", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  copyrightText: "© 2026 Dance Affinity Festival. All rights reserved.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
  ],
};

// ─── Countdown Target Date ───────────────────────────────────────────────────

export const festivalDate = new Date("2026-10-30T19:00:00").getTime();
