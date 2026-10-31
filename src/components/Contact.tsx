/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CLUB_CONFIG } from '../data/clubData';
import { CornerFlourish, GoldDivider } from './Ornaments';

interface ContactProps {
  onOpenJoin: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenJoin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#040D1A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A052]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A1E3B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Mail size={14} className="text-[#C5A052]" />
            <span>Inquiries, Collaborations & Admissions</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            Your Journey <span className="gold-gradient-text">Starts Here.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Have questions regarding upcoming hackathons, sponsorship partnerships, or student chapter
            induction? Connect with the Voyagers executive council at SMS Lucknow.
          </p>

          <GoldDivider />
        </div>

        {/* 2-Column Contact Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Institutional Contact Card */}
          <div className="lg:col-span-5 relative rounded-2xl bg-[#0A1E3B]/80 border-2 border-[#C5A052]/40 p-8 shadow-2xl backdrop-blur-md">
            <CornerFlourish position="top-left" className="absolute top-2 left-2" />
            <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-12 flex items-center justify-center shrink-0">
                <img
                  src="/voyagers-logo.png"
                  alt="Voyagers Logo"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#FFFDF7]">
                  {CLUB_CONFIG.name}
                </h3>
                <span className="text-xs text-[#C5A052] uppercase tracking-wider block font-medium">
                  {CLUB_CONFIG.institution}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-8">
              We welcome prospective student members, corporate technology sponsors, hackathon mentors,
              and academic research collaborators.
            </p>

            <div className="space-y-5 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C5A052] shrink-0 mt-0.5" />
                <div>
                  <span className="font-cinzel font-bold text-[#E6C77A] block mb-0.5">Campus Secretariat</span>
                  <span className="text-slate-300 leading-relaxed">{CLUB_CONFIG.campusAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#C5A052] shrink-0 mt-0.5" />
                <div>
                  <span className="font-cinzel font-bold text-[#E6C77A] block mb-0.5">Official Email</span>
                  <a
                    href={`mailto:${CLUB_CONFIG.email}`}
                    className="text-slate-300 hover:text-[#E6C77A] transition-colors"
                  >
                    {CLUB_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#C5A052] shrink-0 mt-0.5" />
                <div>
                  <span className="font-cinzel font-bold text-[#E6C77A] block mb-0.5">Office Helplines</span>
                  <span className="text-slate-300">{CLUB_CONFIG.phone}</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-8 pt-6 border-t border-[#C5A052]/20 flex items-center gap-3">
              <span className="text-xs text-[#C5A052] font-semibold uppercase tracking-wider">Follow:</span>
              <a
                href={CLUB_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                title="Voyagers Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={CLUB_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#07182F] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                title="SMS Lucknow LinkedIn"
              >
                <Linkedin size={15} />
              </a>
            </div>

            {/* Recruitment CTA Box */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-[#07182F] to-[#0A1E3B] border border-[#C5A052]/50 text-center">
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#E6C77A] block mb-1">
                ✦ 2026 Cohort Recruitment
              </span>
              <p className="text-[11px] text-slate-300 mb-3">
                Are you an SMS Lucknow student passionate about code, robotics, or design?
              </p>
              <button
                onClick={onOpenJoin}
                className="w-full py-2.5 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(197,160,82,0.4)] transition-all"
              >
                Apply for Club Membership
              </button>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0A1E3B]/60 border border-[#C5A052]/30 p-8 shadow-xl backdrop-blur-md">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFFDF7] mb-2">
              Send an Official Dispatch
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Our executive council responds to official queries within 24 to 48 business hours.
            </p>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-center animate-in fade-in duration-300">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto mb-3" />
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">Message Dispatched</h4>
                <p className="text-xs text-emerald-300 max-w-md mx-auto">
                  Thank you for reaching out to Voyagers Student Club. Your dispatch has been logged in
                  our council portal, and our representatives will reply promptly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-5 py-2 rounded-full border border-emerald-400 text-xs font-semibold uppercase tracking-wider text-white hover:bg-emerald-900/40"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aman Soni"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182F] border border-[#C5A052]/30 text-white text-xs placeholder:text-slate-500 focus:border-[#E6C77A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182F] border border-[#C5A052]/30 text-white text-xs placeholder:text-slate-500 focus:border-[#E6C77A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    Subject / Purpose
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Hackathon Collaboration / Speaker Inquiry / General"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07182F] border border-[#C5A052]/30 text-white text-xs placeholder:text-slate-500 focus:border-[#E6C77A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    Message / Proposal *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please detail your inquiry or proposal..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07182F] border border-[#C5A052]/30 text-white text-xs placeholder:text-slate-500 focus:border-[#E6C77A] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(197,160,82,0.4)] transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{status === 'submitting' ? 'Transmitting...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
