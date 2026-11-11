/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, X, Sparkles, Award } from 'lucide-react';
import { EVENTS, ClubEvent } from '../data/events';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { TiltCard3D } from './TiltCard3D';

export const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ceremony' | 'technical' | 'workshop' | 'cultural'>('all');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  const filteredEvents = EVENTS.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'ceremony') return e.category === 'Ceremony';
    if (filter === 'technical') return e.category === 'Hackathon' || e.category === 'Competition';
    if (filter === 'workshop') return e.category === 'Workshop' || e.category === 'Symposium';
    if (filter === 'cultural') return e.category === 'Cultural';
    return true;
  });

  return (
    <section id="events" className="scroll-3d-section relative py-24 bg-[#040D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Calendar size={14} className="text-[#C5A052]" />
            <span>Collegiate Summits, Hackathons & Conclaves</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            Where Ideas Become <span className="gold-gradient-text">Experiences.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Explore the landmark technical hackathons, academic conclaves, and collegiate milestones organized
            by Voyagers at SMS Lucknow.
          </p>

          <GoldDivider />

          {/* Filter Segmented Control */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#0A1E3B] rounded-2xl border border-[#C5A052]/30 mt-6 max-w-2xl mx-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('ceremony')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'ceremony'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              Ceremony & Induction
            </button>
            <button
              onClick={() => setFilter('technical')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'technical'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              Technical & Hackathons
            </button>
            <button
              onClick={() => setFilter('workshop')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'workshop'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              Conclaves & Talks
            </button>
            <button
              onClick={() => setFilter('cultural')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'cultural'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              Cultural & Galas
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-stagger-flip">
          {filteredEvents.map((evt) => (
            <TiltCard3D key={evt.id} className="h-full">
              <div className="group relative rounded-2xl bg-[#0A1E3B]/80 border border-[#C5A052]/30 hover:border-[#E6C77A] flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgba(197,160,82,0.2)]">
                {/* Event Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/sms-lucknow-campus.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3B] via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#07182F]/90 text-[#E6C77A] border border-[#C5A052]/40 backdrop-blur-sm shadow-md">
                      <Award size={11} className="text-[#C5A052]" />
                      <span>Conducted</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-cinzel font-semibold uppercase tracking-widest text-[#E6C77A] px-2.5 py-0.5 rounded bg-[#07182F]/85 border border-[#C5A052]/40">
                      {evt.category}
                    </span>
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#C5A052] mb-2 font-medium">
                    <Calendar size={13} />
                    <span>{evt.date}</span>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-[#FFFDF7] group-hover:text-[#E6C77A] transition-colors leading-snug mb-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2 mb-4">
                    {evt.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#C5A052]/20 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <MapPin size={12} className="text-[#C5A052]" />
                      <span className="truncate max-w-[150px]">SMS Lucknow</span>
                    </div>

                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E6C77A] hover:text-[#FFFDF7] transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#07182F] text-[#F8F3E8] border border-[#C5A052] p-6 sm:p-8 shadow-2xl">
            <CornerFlourish position="top-left" className="absolute top-2 left-2" />
            <CornerFlourish position="top-right" className="absolute top-2 right-2" />

            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0A1E3B] text-[#E6C77A] hover:bg-[#C5A052] hover:text-[#07182F] transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="mb-6">
              <span className="text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#C5A052] font-semibold block mb-1">
                {selectedEvent.category} · Voyagers Milestone Archive
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFFDF7] mb-2">
                {selectedEvent.title}
              </h2>
              <p className="font-serif-royal italic text-lg text-[#E6C77A] mb-4">
                {selectedEvent.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-[#0A1E3B]/80 border border-[#C5A052]/30 text-xs text-slate-300 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#C5A052]" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C5A052]" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin size={14} className="text-[#C5A052]" />
                  <span>{selectedEvent.venue}</span>
                </div>
              </div>

              <h4 className="text-sm font-cinzel font-bold text-[#FFFDF7] mb-2 uppercase tracking-wider">
                Event Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedEvent.description}
              </p>

              <h4 className="text-sm font-cinzel font-bold text-[#FFFDF7] mb-2 uppercase tracking-wider">
                Highlights & Outcomes
              </h4>
              <ul className="space-y-2 mb-6 text-xs text-slate-300">
                {selectedEvent.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles size={13} className="text-[#C5A052] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                <div>
                  <h4 className="text-sm font-cinzel font-bold text-[#FFFDF7] mb-2 uppercase tracking-wider">
                    Key Dignitaries & Mentors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.speakers.map((spk, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs bg-[#0A1E3B] text-[#E6C77A] border border-[#C5A052]/30"
                      >
                        {spk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#C5A052]/30 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                School of Management Sciences, Lucknow
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(197,160,82,0.4)] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
