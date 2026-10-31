/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, Award, Medal, FileText, X, ExternalLink, Calendar, Users } from 'lucide-react';
import { ACHIEVEMENTS, Achievement } from '../data/achievements';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { CLUB_CONFIG } from '../data/clubData';
import { TiltCard3D } from './TiltCard3D';

export const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCertificate, setActiveCertificate] = useState<Achievement | null>(null);

  const categories = ['All', 'Hackathons', 'Robotics', 'Design & Web', 'Institutional'];

  const filteredAchievements =
    selectedCategory === 'All'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((item) => item.category === selectedCategory);

  return (
    <section id="achievements" className="scroll-3d-section relative py-24 bg-gradient-to-b from-[#051124] via-[#07182F] to-[#040D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Trophy size={14} className="text-[#C5A052]" />
            <span>Honors, Accolades & Trophies</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            Our Achievements. <span className="gold-gradient-text">Our Pride.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            From national hackathons and robotics arenas to inter-university championships, our members
            continually uphold the prestige of SMS Lucknow.
          </p>

          <GoldDivider />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] shadow-lg font-bold scale-105'
                    : 'bg-[#0A1E3B]/80 text-slate-300 hover:text-white border border-[#C5A052]/20 hover:border-[#C5A052]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-stagger-flip">
          {filteredAchievements.map((item) => (
            <TiltCard3D key={item.id} className="h-full">
              <div
                className="relative group rounded-2xl bg-[#0A1E3B]/70 border border-[#C5A052]/30 hover:border-[#E6C77A] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(197,160,82,0.2)] flex flex-col h-full overflow-hidden backdrop-blur-sm"
              >
                {/* Corner Ornaments */}
                <CornerFlourish position="top-left" className="absolute top-1 left-1 opacity-40 group-hover:opacity-100 transition-opacity" />
                <CornerFlourish position="top-right" className="absolute top-1 right-1 opacity-40 group-hover:opacity-100 transition-opacity" />

                {/* Card Header & Category Badge */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-cinzel uppercase tracking-[0.18em] text-[#C5A052] font-semibold">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={13} className="text-[#C5A052]" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Competition Position / Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C5A052]/15 border border-[#C5A052]/40 text-[#E6C77A] text-xs font-semibold mb-3">
                    <Medal size={14} className="text-[#E6C77A]" />
                    <span>{item.position}</span>
                  </div>

                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFFDF7] group-hover:text-[#E6C77A] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  <h4 className="font-serif-royal text-base text-[#C5A052] italic mb-3">
                    {item.competition}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Team Credits & Image Thumbnail */}
                <div className="mt-auto px-6 pb-6 pt-2 border-t border-[#C5A052]/20 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Users size={13} className="text-[#C5A052] shrink-0" />
                    <span className="truncate">Delegates: {item.team.join(', ')}</span>
                  </div>

                  {/* Action: View Certificate */}
                  <button
                    onClick={() => setActiveCertificate(item)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#C5A052]/50 hover:border-[#E6C77A] bg-[#07182F] hover:bg-[#C5A052]/20 text-[#E6C77A] hover:text-[#FFFDF7] text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <FileText size={14} />
                    <span>Inspect Certificate</span>
                  </button>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>

      {/* ROYAL CERTIFICATE MODAL */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#FFFDF7] text-[#07182F] p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-8 border-[#07182F] overflow-hidden">
            {/* Certificate Inner Gold Frame */}
            <div className="absolute inset-2 border-2 border-[#C5A052] pointer-events-none" />
            <div className="absolute inset-3.5 border border-[#C5A052]/40 pointer-events-none" />

            {/* Certificate Corner Flourishes */}
            <CornerFlourish position="top-left" className="absolute top-4 left-4 text-[#C5A052]" />
            <CornerFlourish position="top-right" className="absolute top-4 right-4 text-[#C5A052]" />
            <CornerFlourish position="bottom-left" className="absolute bottom-4 left-4 text-[#C5A052]" />
            <CornerFlourish position="bottom-right" className="absolute bottom-4 right-4 text-[#C5A052]" />

            {/* Close Button */}
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#07182F] text-[#E6C77A] hover:bg-[#C5A052] hover:text-[#07182F] transition-colors"
              aria-label="Close Certificate modal"
            >
              <X size={18} />
            </button>

            {/* Certificate Content Header */}
            <div className="text-center relative z-10 pt-2">
              <div className="w-20 h-16 mx-auto mb-3">
                <img
                  src="/voyagers-logo.png"
                  alt="Official Voyagers Crest"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#07182F] font-bold block">
                {CLUB_CONFIG.institution}
              </span>
              <span className="font-cinzel text-sm uppercase tracking-[0.2em] text-[#C5A052] font-semibold block mb-2">
                {CLUB_CONFIG.name} {CLUB_CONFIG.subname}
              </span>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#07182F] tracking-wide uppercase my-2">
                Certificate of Excellence
              </h2>

              <p className="font-serif-royal italic text-base text-stone-600 mb-6">
                This honor is proudly conferred to the delegacy of Voyagers in recognition of
              </p>

              {/* Awarded Subject */}
              <div className="my-4 py-2 border-y border-[#C5A052]/40">
                <span className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#07182F] block">
                  {activeCertificate.title}
                </span>
                <span className="font-cinzel text-sm font-semibold text-[#8F6F2C] tracking-wider block mt-1">
                  {activeCertificate.position} · {activeCertificate.competition}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed my-4">
                {activeCertificate.description}
              </p>

              {/* Recipient Details & Verification */}
              <div className="mt-8 pt-6 border-t border-[#C5A052]/30 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <span className="font-cinzel font-bold text-[#07182F] block">Date Conferred</span>
                  <span className="text-stone-600">{activeCertificate.date}</span>
                </div>
                <div>
                  <span className="font-cinzel font-bold text-[#07182F] block">Certificate Ref</span>
                  <span className="font-mono text-[11px] text-[#8F6F2C]">{activeCertificate.certificateNumber}</span>
                </div>
                <div>
                  <span className="font-cinzel font-bold text-[#07182F] block">Institutional Seal</span>
                  <span className="text-emerald-700 font-semibold">Verified Official</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
