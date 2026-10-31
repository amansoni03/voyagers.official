/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flag, Compass, CheckCircle } from 'lucide-react';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { TiltCard3D } from './TiltCard3D';

interface Milestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
}

export const Timeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const milestones: Milestone[] = [
    {
      year: '2021',
      badge: 'Inception & Charter',
      title: 'Foundation of Voyagers at SMS Lucknow',
      description:
        'Established by an ambitious cohort of engineering and management students under faculty patronage at School of Management Sciences, Lucknow.',
      highlights: [
        'Charter formally approved by Director & Academic Council at SMS Lucknow',
        'First cohort of 40 founding members inducted',
        'Established the Voyagers Code & Robotics Guild on campus',
      ],
      image: '/sms-lucknow-campus.jpg',
    },
    {
      year: '2022',
      badge: 'First Inter-College Tech Fest',
      title: 'Horizon Tech & Innovation Conclave',
      description:
        'Hosted over 300 delegates from 18 universities across Uttar Pradesh, launching the signature Hack-the-Horizon programming sprint.',
      highlights: [
        'Inaugurated by senior state technology delegates',
        'Featured 24-hour non-stop algorithmic marathon',
        'Recognized as SMS Lucknow’s fastest-growing student body',
      ],
      image: '/src/assets/images/voyagers_hackathon_summit_1793430500132.jpg',
    },
    {
      year: '2023',
      badge: 'Hardware & Robotics Wing',
      title: 'Launch of Embedded Systems Lab',
      description:
        'Expanded beyond software to construct autonomous robotics prototypes, IoT agricultural telemetry systems, and aerial drone controllers.',
      highlights: [
        'Procured advanced microcontroller & sensor workstations',
        'Secured 1st Runner Up in North India Robocon challenge',
        'Student prototype patented for municipal smart metering',
      ],
      image: '/src/assets/images/voyagers_robotics_workshop_1793430500043.jpg',
    },
    {
      year: '2024',
      badge: 'State & National Glory',
      title: 'Smart India Hackathon & Regional Podiums',
      description:
        'Voyagers student delegates achieved podium finishes across 6 prestigious inter-college hackathons and took home the Director’s Rolling Trophy.',
      highlights: [
        'Conferred Best Student Chapter in Academic & Club Honors',
        '15+ trophies secured across tech and management domains',
        'Active club student membership crossed 400 individuals',
      ],
      image: '/src/assets/images/voyagers_annual_gala_1793430497265.jpg',
    },
    {
      year: '2025',
      badge: 'Innovation Incubator',
      title: 'Voyagers Venture & Prototype Fellowship',
      description:
        'Partnered with regional industry mentors to fund and incubate student-led deep tech software and hardware products.',
      highlights: [
        'Funded 4 student prototypes into working commercial MVPs',
        'Held inaugural 3D Creative Web & AI Jam with 80+ builders',
        'Active membership expanded to 500+ across all college streams',
      ],
      image: '/src/assets/images/voyagers_hackathon_summit_1793430500132.jpg',
    },
    {
      year: '2026',
      badge: 'Current Frontier',
      title: 'VoyageHacks 2026 & National Chapter Expansion',
      description:
        'Launching our grandest national hackathon with ₹1.5L+ prizes, expanding alumni mentorship pathways, and pioneering spatial 3D computing.',
      highlights: [
        'National participation across 100+ multidisciplinary teams',
        'Official digital platform launch with 3D web experience',
        'Global industry mentorship and placement fast-tracks',
      ],
      image: '/src/assets/images/voyagers_annual_gala_1793430497265.jpg',
    },
  ];

  return (
    <section id="journey" className="scroll-3d-section relative py-24 bg-gradient-to-b from-[#040D1A] via-[#07182F] to-[#051124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Compass size={14} className="text-[#C5A052]" />
            <span>Evolution & History</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            Our Journey. <span className="gold-gradient-text">Our Milestones.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Follow the chronological voyage of dedication, innovation, and leadership that built
            VOYAGERS into SMS Lucknow’s premier student organization.
          </p>

          <GoldDivider />

          {/* Interactive Year Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8">
            {milestones.map((m) => (
              <button
                key={m.year}
                onClick={() => setSelectedYear(m.year)}
                className={`px-5 py-2 rounded-full font-cinzel text-xs font-bold tracking-widest transition-all duration-300 ${
                  selectedYear === m.year
                    ? 'gold-gradient-bg text-[#07182F] shadow-[0_0_15px_rgba(197,160,82,0.5)] scale-110'
                    : 'bg-[#0A1E3B] text-slate-300 hover:text-white border border-[#C5A052]/30 hover:border-[#C5A052]'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Year Spotlight Feature with 3D Tilt */}
        {milestones
          .filter((m) => m.year === selectedYear)
          .map((m) => (
            <TiltCard3D key={m.year} maxTilt={6} glareOpacity={0.18} className="mb-16">
              <div className="relative rounded-2xl bg-[#0A1E3B]/80 border-2 border-[#C5A052]/50 p-6 sm:p-10 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
                <CornerFlourish position="top-left" className="absolute top-2 left-2" />
                <CornerFlourish position="top-right" className="absolute top-2 right-2" />
                <CornerFlourish position="bottom-left" className="absolute bottom-2 left-2" />
                <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C5A052]/20 border border-[#C5A052]/40 text-[#E6C77A] text-xs font-cinzel font-bold mb-4 uppercase tracking-wider">
                      <Flag size={13} />
                      <span>Year {m.year} · {m.badge}</span>
                    </div>

                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFFDF7] mb-3">
                      {m.title}
                    </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
                    {m.description}
                  </p>

                  <h4 className="text-xs font-cinzel uppercase tracking-[0.18em] text-[#E6C77A] font-semibold mb-3">
                    Key Accomplishments
                  </h4>
                  <ul className="space-y-2.5">
                    {m.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle size={15} className="text-[#C5A052] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-[16/10] border border-[#C5A052]/40 shadow-xl">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="font-serif-royal italic text-sm text-[#E6C77A]">
                      SMS Lucknow Campus · {m.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        ))}

        {/* Golden Progressive Timeline Stream */}
        <div className="relative border-l-2 border-[#C5A052]/40 ml-4 sm:ml-32 md:ml-44 pl-6 sm:pl-10 space-y-12">
          {milestones.map((item) => (
            <div
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className={`relative cursor-pointer group transition-all ${
                selectedYear === item.year ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {/* Year marker on left */}
              <div className="absolute -left-[45px] sm:-left-[160px] md:-left-[215px] top-0 flex items-center gap-3">
                <span className="font-cinzel text-sm sm:text-lg font-bold text-[#E6C77A] tracking-wider w-12 sm:w-16 text-right">
                  {item.year}
                </span>
                {/* Node circle on golden line */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedYear === item.year
                      ? 'border-[#FFFDF7] bg-[#C5A052] shadow-[0_0_12px_#C5A052]'
                      : 'border-[#C5A052] bg-[#07182F] group-hover:border-[#E6C77A]'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-[#07182F]" />
                </div>
              </div>

              {/* Timeline Card */}
              <div className="p-5 rounded-xl bg-[#0A1E3B]/60 border border-[#C5A052]/20 group-hover:border-[#C5A052]/60 transition-colors">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#C5A052] font-semibold block mb-1">
                  {item.badge}
                </span>
                <h4 className="font-cinzel text-lg font-bold text-[#FFFDF7] group-hover:text-[#E6C77A] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
