/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Users,
  Linkedin,
  Github,
  Mail,
  ShieldCheck,
  Sparkles,
  Phone,
  Instagram,
  Search,
  Award,
  Star,
  GraduationCap,
} from 'lucide-react';
import { TEAM_MEMBERS, TeamMember, TeamTier, TeamCategory } from '../data/team';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { TiltCard3D } from './TiltCard3D';

export const Team: React.FC = () => {
  const [filterTier, setFilterTier] = useState<'all' | TeamTier>('all');
  const [filterCategory, setFilterCategory] = useState<'All' | TeamCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts for tabs
  const facultyCount = useMemo(() => TEAM_MEMBERS.filter((m) => m.tier === 'faculty').length, []);
  const coreCount = useMemo(() => TEAM_MEMBERS.filter((m) => m.tier === 'core').length, []);
  const coordCount = useMemo(() => TEAM_MEMBERS.filter((m) => m.tier === 'coordinator').length, []);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((member) => {
      // Tier match
      if (filterTier !== 'all' && member.tier !== filterTier) return false;
      // Category match
      if (filterCategory !== 'All' && member.category !== filterCategory) return false;
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = member.name.toLowerCase().includes(query);
        const matchRole = member.role.toLowerCase().includes(query);
        const matchCategory = member.category.toLowerCase().includes(query);
        const matchDept = member.department.toLowerCase().includes(query);
        if (!matchName && !matchRole && !matchCategory && !matchDept) return false;
      }
      return true;
    });
  }, [filterTier, filterCategory, searchQuery]);

  return (
    <section id="team" className="scroll-3d-section relative py-24 bg-[#051124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Users size={14} className="text-[#C5A052]" />
            <span>Committee Directory (2026–27)</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            The Minds Behind <span className="gold-gradient-text">Voyagers.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Department of Computer Science Engineering and Allied Branches | School of Management Sciences, Lucknow.
            Distinguished faculty coordinators, core office bearers, and student coordinators leading Voyagers.
          </p>

          <GoldDivider />

          {/* Primary Tier Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {[
              { id: 'all', label: `All Leadership (${TEAM_MEMBERS.length})` },
              { id: 'faculty', label: `Faculty Coordinators (${facultyCount})` },
              { id: 'core', label: `Core Council / Office Bearers (${coreCount})` },
              { id: 'coordinator', label: `Student Coordinators (${coordCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTier(tab.id as any)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filterTier === tab.id
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-lg scale-105'
                    : 'bg-[#0A1E3B]/80 text-slate-300 hover:text-white border border-[#C5A052]/20 hover:border-[#C5A052]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Domain Filter Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C5A052]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, or wing..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-[#07182F] border border-[#C5A052]/30 text-white placeholder-slate-400 focus:outline-none focus:border-[#E6C77A] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category / Wing Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {(['All', 'Technical', 'Cultural', 'Editorial', 'R&D', 'Sports', 'Advisory', 'Executive'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      filterCategory === cat
                        ? 'bg-[#C5A052] text-[#07182F] font-bold shadow-sm'
                        : 'bg-[#07182F]/70 text-slate-400 hover:text-white border border-[#C5A052]/20'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Results Counter if Filtered */}
        {(filterTier !== 'all' || filterCategory !== 'All' || searchQuery) && (
          <div className="text-center text-xs text-slate-400 mb-8">
            Showing <span className="text-[#E6C77A] font-semibold">{filteredMembers.length}</span> members
            {filterTier !== 'all' && <span> in {filterTier === 'faculty' ? 'Faculty Coordinators' : filterTier === 'core' ? 'Core Council' : 'Student Coordinators'}</span>}
            {filterCategory !== 'All' && <span> · Wing: {filterCategory}</span>}
            {searchQuery && <span> · Matching "{searchQuery}"</span>}
          </div>
        )}

        {/* Team Grid with 3D Flip Stagger */}
        {filteredMembers.length > 0 ? (
          <div className="scroll-stagger-flip grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredMembers.map((member) => (
              <TiltCard3D key={member.id} maxTilt={8} glareOpacity={0.2} className="h-full">
                <div className="group relative h-full rounded-2xl bg-[#0A1E3B]/70 border border-[#C5A052]/30 hover:border-[#E6C77A] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(197,160,82,0.25)] backdrop-blur-sm">
                  {/* Corner Flourish Accent on hover */}
                  <CornerFlourish position="top-left" className="absolute top-1 left-1 opacity-20 group-hover:opacity-80 transition-opacity" />
                  <CornerFlourish position="top-right" className="absolute top-1 right-1 opacity-20 group-hover:opacity-80 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="w-full flex items-center justify-between mb-4">
                    <span className="text-[10px] font-cinzel font-semibold uppercase tracking-wider text-[#E6C77A] px-2.5 py-0.5 rounded-full bg-[#07182F] border border-[#C5A052]/30">
                      {member.category} Wing
                    </span>

                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                      {member.year ? member.year : 'Faculty'}
                    </span>
                  </div>

                  {/* Portrait / Avatar with Royal Gold Ring */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-[#C5A052] bg-gradient-to-tr from-[#C5A052] via-[#0A1E3B] to-[#E6C77A] mb-4 group-hover:shadow-[0_0_25px_rgba(230,199,122,0.45)] group-hover:scale-105 transition-all duration-300">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center overflow-hidden text-center shadow-inner relative`}
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/team/blank-profile.png';
                          }}
                        />
                      ) : (
                        /* Monogram / Initials */
                        <span className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#FFFDF7] tracking-wider drop-shadow-md">
                          {member.name
                            .split(' ')
                            .filter((n) => !n.includes('(') && !n.includes('Dr.') && !n.includes('Prof.') && !n.includes('Mr.') && !n.includes('Mrs.') && !n.includes('Ms.'))
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      )}
                    </div>

                    {/* Tier Badge Icon */}
                    {member.tier === 'faculty' && (
                      <div
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#07182F] border border-[#C5A052] text-[#E6C77A] shadow-md"
                        title="Faculty Coordinator"
                      >
                        <ShieldCheck size={14} />
                      </div>
                    )}
                    {member.tier === 'core' && (
                      <div
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#07182F] border border-[#C5A052] text-[#E6C77A] shadow-md"
                        title="Core Office Bearer"
                      >
                        <Star size={14} className="fill-[#C5A052]" />
                      </div>
                    )}
                    {member.tier === 'coordinator' && (
                      <div
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#07182F] border border-[#C5A052] text-[#E6C77A] shadow-md"
                        title="Student Coordinator"
                      >
                        <Sparkles size={14} />
                      </div>
                    )}
                  </div>

                  {/* Department / Tier Kicker */}
                  <span className="text-[10px] font-cinzel uppercase tracking-[0.16em] text-[#C5A052] font-semibold mb-1 line-clamp-1">
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

                  {/* Social Links & Contact */}
                  <div className="mt-auto pt-4 border-t border-[#C5A052]/20 flex items-center justify-center gap-2.5 w-full">
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                        title="LinkedIn Profile"
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
                        title="GitHub Profile"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {member.links.instagram && (
                      <a
                        href={member.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                        aria-label={`${member.name} Instagram`}
                        title="Instagram Profile"
                      >
                        <Instagram size={14} />
                      </a>
                    )}
                    {member.links.phone && (
                      <a
                        href={member.links.phone}
                        className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                        aria-label={`Call ${member.name} at ${member.phone}`}
                        title={`Phone: ${member.phone}`}
                      >
                        <Phone size={14} />
                      </a>
                    )}
                    {member.links.email && (
                      <a
                        href={`mailto:${member.links.email}`}
                        className="p-2 rounded-full bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                        aria-label={`Email ${member.name}`}
                        title="Send Email"
                      >
                        <Mail size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#0A1E3B]/40 rounded-2xl border border-[#C5A052]/20">
            <p className="text-slate-300 text-sm">No coordinators or office bearers found matching your criteria.</p>
            <button
              onClick={() => {
                setFilterTier('all');
                setFilterCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#E6C77A] underline hover:text-white"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
