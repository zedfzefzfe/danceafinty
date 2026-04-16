import { useEffect, useRef, useState } from 'react';
import { scheduleConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScheduleEvent {
  time: string;
  title: string;
  type: 'workshop' | 'party' | 'showcase';
  location?: string;
}

interface DaySchedule {
  day: string;
  date: string;
  events: ScheduleEvent[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 'Thursday',
    date: 'Oct 30',
    events: [
      { time: '19:00', title: 'Opening Party', type: 'party', location: 'Main Hall' },
      { time: '21:00', title: 'Welcome Dance', type: 'showcase', location: 'Stage' },
      { time: '22:00', title: 'Social Dancing', type: 'party', location: 'All Rooms' },
    ],
  },
  {
    day: 'Friday',
    date: 'Oct 31',
    events: [
      { time: '10:00', title: 'Kizomba Basics', type: 'workshop', location: 'Room A' },
      { time: '11:30', title: 'Bachata Sensual', type: 'workshop', location: 'Room B' },
      { time: '14:00', title: 'Intermediate Kizomba', type: 'workshop', location: 'Room A' },
      { time: '15:30', title: 'Bachata Footwork', type: 'workshop', location: 'Room B' },
      { time: '20:00', title: 'Halloween Party', type: 'party', location: 'Main Hall' },
    ],
  },
  {
    day: 'Saturday',
    date: 'Nov 1',
    events: [
      { time: '10:00', title: 'Advanced Kizomba', type: 'workshop', location: 'Room A' },
      { time: '11:30', title: 'Bachata Styling', type: 'workshop', location: 'Room B' },
      { time: '14:00', title: 'Bootcamp Session', type: 'workshop', location: 'Main Hall' },
      { time: '16:00', title: 'Artist Showcase', type: 'showcase', location: 'Stage' },
      { time: '20:00', title: 'Gala Night', type: 'party', location: 'Main Hall' },
    ],
  },
  {
    day: 'Sunday',
    date: 'Nov 2',
    events: [
      { time: '10:00', title: 'Morning Social', type: 'party', location: 'Main Hall' },
      { time: '11:00', title: 'Final Workshops', type: 'workshop', location: 'All Rooms' },
      { time: '14:00', title: 'Farewell Dance', type: 'party', location: 'Main Hall' },
      { time: '16:00', title: 'Closing Ceremony', type: 'showcase', location: 'Stage' },
    ],
  },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);

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
        tabsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
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
        tabsRef.current,
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

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-[#00e5cc] text-[#1a0033]';
      case 'party':
        return 'bg-[#ff00aa] text-white';
      case 'showcase':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="section-pinned bg-[#1a0033] z-30"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${scheduleConfig.backgroundImage})`,
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
            {scheduleConfig.tag}
          </p>
          <h2 className="font-display text-white leading-[0.9] mb-6">
            {scheduleConfig.heading}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-[34vw]">
            {scheduleConfig.subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-primary flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {scheduleConfig.ctaPrimaryText}
            </button>
            <button className="btn-outline flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {scheduleConfig.ctaSecondaryText}
            </button>
          </div>
        </div>

        {/* Tabs Schedule */}
        <div
          ref={tabsRef}
          className="absolute left-6 lg:left-[6vw] bottom-[15vh] w-[90vw] lg:w-[50vw]"
        >
          {/* Day Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
            {scheduleData.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(index)}
                className={`px-4 py-2 font-mono text-xs tracking-wider uppercase whitespace-nowrap transition-all ${
                  activeDay === index
                    ? 'bg-[#00e5cc] text-[#1a0033]'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {day.day} <span className="opacity-60">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="bg-[#1a0033]/80 backdrop-blur-sm border border-white/10 p-4 lg:p-6">
            <div className="space-y-3">
              {scheduleData[activeDay].events.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="font-mono text-sm text-[#00e5cc] w-14">
                    {event.time}
                  </span>
                  <span className="flex-1 text-sm text-white">{event.title}</span>
                  <span
                    className={`px-2 py-1 text-[10px] font-mono tracking-wider uppercase ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                  {event.location && (
                    <span className="text-xs text-white/50 hidden sm:block">
                      {event.location}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Card (Bottom Right) */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] bottom-[10vh] w-[88vw] lg:w-[34vw] min-h-[22vh] bg-white text-[#1a0033] p-6 lg:p-8 shadow-2xl"
        >
          <h3 className="font-display text-2xl lg:text-3xl mb-4">{scheduleConfig.cardTitle}</h3>
          <div className="space-y-3">
            {scheduleConfig.scheduleDays.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-700">{day.day}</span>
                <span className="font-mono text-sm text-[#00e5cc]">{day.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
