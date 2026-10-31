/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Target, Compass, Award, Cpu, Users, BookOpen } from 'lucide-react';
import { ABOUT_PILLARS, CLUB_CONFIG } from '../data/clubData';
import { CornerFlourish, GoldDivider } from './Ornaments';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'distinct' | 'activities'>('vision');

  const activities = [
    {
      icon: <Cpu size={20} className="text-[#C5A052]" />,
      title: 'Voyagers Tech Guild',
      desc: 'Hackathons, full-stack systems, machine learning sprints, and cloud architecture.',
    },
    {
      icon: <Award size={20} className="text-[#C5A052]" />,
      title: 'Robotics & Hardware Lab',
      desc: 'Microcontroller prototyping, drone aerial telemetry, IoT solutions, and robotics competitions.',
    },
    {
      icon: <Users size={20} className="text-[#C5A052]" />,
      title: 'Leadership & Conclaves',
      desc: 'Organizing national collegiate symposiums, speaker masterclasses, and corporate mentorship.',
    },
    {
      icon: <BookOpen size={20} className="text-[#C5A052]" />,
      title: 'Creative Media & Research',
      desc: '3D digital design, editorial publishing, cinematography, and student research papers.',
    },
  ];

  return (
    <section id="about" className="scroll-3d-section relative py-24 bg-[#051124] overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A052_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Compass size={14} className="text-[#C5A052]" />
            <span>Institutional Heritage & Philosophy</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            Beyond Boundaries. <span className="gold-gradient-text">Beyond Expectations.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Founded within the esteemed academic grounds of the School of Management Sciences, Lucknow,
            VOYAGERS is an elite student collective committed to pioneering technological advancement,
            fostering leadership, and elevating collegiate ambition onto global stages.
          </p>

          <GoldDivider />
        </div>

        {/* Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Pillars & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tab Selector Controls */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0A1E3B]/80 rounded-xl border border-[#C5A052]/30 mb-8 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all ${
                  activeTab === 'vision'
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] shadow-md font-bold'
                    : 'text-slate-300 hover:text-[#FFFDF7]'
                }`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all ${
                  activeTab === 'mission'
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] shadow-md font-bold'
                    : 'text-slate-300 hover:text-[#FFFDF7]'
                }`}
              >
                Mission
              </button>
              <button
                onClick={() => setActiveTab('distinct')}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all ${
                  activeTab === 'distinct'
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] shadow-md font-bold'
                    : 'text-slate-300 hover:text-[#FFFDF7]'
                }`}
              >
                What Sets Us Apart
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all ${
                  activeTab === 'activities'
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] shadow-md font-bold'
                    : 'text-slate-300 hover:text-[#FFFDF7]'
                }`}
              >
                Wings & Activities
              </button>
            </div>

            {/* Dynamic Content Panel */}
            {activeTab !== 'activities' ? (
              <div className="relative rounded-2xl bg-[#0A1E3B]/60 border border-[#C5A052]/30 p-8 shadow-xl">
                <CornerFlourish position="top-left" className="absolute top-2 left-2 opacity-60" />
                <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2 opacity-60" />

                {ABOUT_PILLARS.filter((p) => p.id === activeTab).map((pillar) => (
                  <div key={pillar.id} className="animate-in fade-in duration-300">
                    <h3 className="font-cinzel text-2xl font-bold text-[#E6C77A] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-200 text-base font-serif-royal italic text-lg mb-6 leading-relaxed">
                      &ldquo;{pillar.summary}&rdquo;
                    </p>
                    <ul className="space-y-3.5">
                      {pillar.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                          <Target size={16} className="text-[#C5A052] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
                {activities.map((act, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-[#0A1E3B]/70 border border-[#C5A052]/25 hover:border-[#E6C77A]/60 transition-all hover:-translate-y-1 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#07182F] border border-[#C5A052]/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {act.icon}
                    </div>
                    <h4 className="font-cinzel text-sm font-bold text-[#FFFDF7] mb-1.5">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{act.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Institutional Seal Footnote */}
            <div className="mt-8 pt-6 border-t border-[#C5A052]/20 flex items-center gap-4 text-xs text-slate-400">
              <span className="font-cinzel tracking-wider text-[#C5A052] uppercase font-semibold">
                Official Campus:
              </span>
              <span>School of Management Sciences, Kasimpur Biruha, Sultanpur Road, Lucknow</span>
            </div>
          </div>

          {/* Right Column: Actual SMS Lucknow Campus Photograph in Royal Ornate Frame */}
          <div className="lg:col-span-5 relative scroll-flip-image">
            <div className="relative rounded-2xl p-2.5 bg-gradient-to-b from-[#C5A052]/60 via-[#0A1E3B] to-[#C5A052]/40 shadow-2xl">
              <CornerFlourish position="top-left" className="absolute top-0 left-0 z-20" />
              <CornerFlourish position="top-right" className="absolute top-0 right-0 z-20" />
              <CornerFlourish position="bottom-left" className="absolute bottom-0 left-0 z-20" />
              <CornerFlourish position="bottom-right" className="absolute bottom-0 right-0 z-20" />

              <div className="overflow-hidden rounded-xl relative aspect-[4/3] group">
                {/* Official Real SMS Lucknow Campus Photograph */}
                <img
                  src="/sms-lucknow-campus.jpg"
                  alt="Official Campus of School of Management Sciences (SMS), Lucknow"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#E6C77A] font-semibold block mb-1">
                    Official College Campus
                  </span>
                  <p className="font-serif-royal text-lg text-[#FFFDF7] font-semibold leading-snug">
                    School of Management Sciences
                  </p>
                  <span className="text-xs text-[#E6C77A] block mt-0.5">
                    Lucknow, Uttar Pradesh · Home of VOYAGERS
                  </span>
                </div>
              </div>
            </div>

            {/* Accreditation Badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#07182F] border border-[#C5A052] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3">
              <Award className="text-[#E6C77A]" size={20} />
              <div>
                <span className="font-cinzel text-xs font-bold text-[#E6C77A] block leading-none">
                  SMS Lucknow
                </span>
                <span className="text-[10px] text-slate-300 tracking-wider uppercase">
                  Institutional Grandeur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
