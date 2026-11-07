/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, X, CheckCircle2, Sparkles } from 'lucide-react';
import { EVENTS, ClubEvent } from '../data/events';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { TiltCard3D } from './TiltCard3D';

export const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState<string | null>(null);

  // Registration modal form state
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Engineering',
    semester: '4th Semester',
    studentId: '',
  });

  const filteredEvents = EVENTS.filter((e) => {
    if (filter === 'all') return true;
    return e.status === filter;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setRegisteredSuccess(`Thank you, ${regForm.name}! Your delegate registration for "${selectedEvent.title}" has been recorded. An official badge confirmation will be delivered to ${regForm.email}.`);
  };

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
            Discover upcoming national hackathons, technical symposia, and leadership assemblies hosted
            by Voyagers at SMS Lucknow.
          </p>

          <GoldDivider />

          {/* Filter Segmented Control */}
          <div className="inline-flex p-1 bg-[#0A1E3B] rounded-xl border border-[#C5A052]/30 mt-6">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'upcoming'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              ✦ Upcoming Events
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              Past Flagships
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md'
                  : 'text-slate-300 hover:text-[#FFFDF7]'
              }`}
            >
              All Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-stagger-flip">
          {filteredEvents.map((evt) => (
            <TiltCard3D key={evt.id} className="h-full">
              <div
                className="group relative rounded-2xl bg-[#0A1E3B]/80 border border-[#C5A052]/30 hover:border-[#E6C77A] flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgba(197,160,82,0.2)]"
              >
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
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        evt.status === 'upcoming'
                          ? 'bg-[#C5A052] text-[#07182F] shadow-lg'
                          : 'bg-[#07182F]/80 text-slate-300 border border-white/20'
                      }`}
                    >
                      {evt.status === 'upcoming' ? 'Registration Open' : 'Concluded'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-cinzel font-semibold uppercase tracking-widest text-[#E6C77A] px-2 py-0.5 rounded bg-[#07182F]/80 border border-[#C5A052]/40">
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
                      onClick={() => {
                        setSelectedEvent(evt);
                        setRegisteredSuccess(null);
                      }}
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

      {/* EVENT DETAILS & REGISTRATION MODAL */}
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
                {selectedEvent.category} · {selectedEvent.status === 'upcoming' ? 'Official Call for Delegates' : 'Archived Symposium'}
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
                Highlights & Perks
              </h4>
              <ul className="space-y-2 mb-6 text-xs text-slate-300">
                {selectedEvent.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles size={13} className="text-[#C5A052] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Registration Form / Status */}
            {selectedEvent.status === 'upcoming' ? (
              <div className="pt-6 border-t border-[#C5A052]/30">
                {registeredSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs leading-relaxed flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-1">Registration Confirmed</span>
                      {registeredSuccess}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <h4 className="font-cinzel text-base font-bold text-[#E6C77A]">
                      Register as a Delegate / Team
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          placeholder="e.g. Aman Soni"
                          className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/40 text-white text-xs focus:border-[#E6C77A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          placeholder="student@smslucknow.ac.in"
                          className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/40 text-white text-xs focus:border-[#E6C77A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={regForm.department}
                          onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/40 text-white text-xs focus:border-[#E6C77A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                          Student Roll / ID No.
                        </label>
                        <input
                          type="text"
                          value={regForm.studentId}
                          onChange={(e) => setRegForm({ ...regForm, studentId: e.target.value })}
                          placeholder="SMS/2024/..."
                          className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/40 text-white text-xs focus:border-[#E6C77A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(197,160,82,0.4)] transition-all"
                    >
                      Confirm Delegate Registration
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10 text-center text-xs text-slate-400">
                This event concluded on {selectedEvent.date}. Stay tuned for upcoming editions!
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
