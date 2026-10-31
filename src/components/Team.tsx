/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, Linkedin, Github, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../data/team';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { TiltCard3D } from './TiltCard3D';

export const Team: React.FC = () => {
  const [filterTier, setFilterTier] = useState<'all' | 'faculty' | 'executive' | 'core'>('all');

  const filteredMembers =
    filterTier === 'all'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.tier === filterTier);

  return (
    <section id="team" className="scroll-3d-section relative py-24 bg-[#051124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Users size={14} className="text-[#C5A052]" />
            <span>Council & Leadership</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            The Minds Behind <span className="gold-gradient-text">Voyagers.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Distinguished faculty advisors and dedicated student leaders who steer the vision,
            mentorship, and technical achievements of Voyagers at SMS Lucknow.
          </p>

          <GoldDivider />

          {/* Tier Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Leadership' },
              { id: 'faculty', label: 'Faculty Advisors' },
              { id: 'executive', label: 'Executive Council' },
              { id: 'core', label: 'Core Technical Leads' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTier(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  filterTier === tab.id
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md scale-105'
                    : 'bg-[#0A1E3B]/80 text-slate-300 hover:text-white border border-[#C5A052]/20 hover:border-[#C5A052]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid with 3D Flip Stagger */}
        <div className="scroll-stagger-flip grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredMembers.map((member) => (
            <TiltCard3D key={member.id} maxTilt={9} glareOpacity={0.22} className="h-full">
              <div className="group relative h-full rounded-2xl bg-[#0A1E3B]/70 border border-[#C5A052]/30 hover:border-[#E6C77A] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(197,160,82,0.25)] backdrop-blur-sm">
                {/* Corner Accent on hover */}
                <CornerFlourish position="top-left" className="absolute top-1 left-1 opacity-20 group-hover:opacity-80 transition-opacity" />
                <CornerFlourish position="top-right" className="absolute top-1 right-1 opacity-20 group-hover:opacity-80 transition-opacity" />

                {/* Portrait / Avatar with Royal Gold Ring */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-[#C5A052] bg-gradient-to-tr from-[#C5A052] via-[#0A1E3B] to-[#E6C77A] mb-4 group-hover:shadow-[0_0_25px_rgba(230,199,122,0.45)] group-hover:scale-105 transition-all duration-300">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center overflow-hidden text-center shadow-inner`}
                  >
                    {/* Monogram / Initials */}
                    <span className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#FFFDF7] tracking-wider drop-shadow-md">
                      {member.name
                        .split(' ')
                        .filter((n) => !n.includes('(') && !n.includes('Dr.') && !n.includes('Prof.'))
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>

                  {member.tier === 'faculty' && (
                    <div
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#07182F] border border-[#C5A052] text-[#E6C77A]"
                      title="Faculty Patron"
                    >
                      <ShieldCheck size={14} />
                    </div>
                  )}
                </div>

                {/* Tier Kicker */}
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#C5A052] font-semibold mb-1">
                  {member.department}
                </span>

                {/* Member Name */}
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFFDF7] group-hover:text-[#E6C77A] transition-colors leading-snug">
                  {member.name}
                </h3>

                {/* Role Title */}
                <h4 className="font-serif-royal italic text-sm text-[#E6C77A] mb-3">
                  {member.role}
                </h4>

                {/* Bio */}
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6 line-clamp-3">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="mt-auto pt-4 border-t border-[#C5A052]/20 flex items-center justify-center gap-3 w-full">
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {member.links.email && (
                    <a
                      href={`mailto:${member.links.email}`}
                      className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
