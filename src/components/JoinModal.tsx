/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { CLUB_CONFIG } from '../data/clubData';
import { CornerFlourish } from './Ornaments';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    department: 'B.Tech - Computer Science & Engineering',
    semester: '1st Year / 1st Semester',
    wing: 'Technical & Software Systems',
    statement: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#07182F] text-[#F8F3E8] border-2 border-[#C5A052] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
        <CornerFlourish position="top-left" className="absolute top-2 left-2" />
        <CornerFlourish position="top-right" className="absolute top-2 right-2" />
        <CornerFlourish position="bottom-left" className="absolute bottom-2 left-2" />
        <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0A1E3B] text-[#E6C77A] hover:bg-[#C5A052] hover:text-[#07182F] transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#C5A052]/20 border border-[#C5A052] flex items-center justify-center mx-auto mb-4 text-[#E6C77A]">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-[#FFFDF7] mb-2">
              Application Logged
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
              Welcome to the threshold of innovation, {formData.fullName}. Your induction application for the{' '}
              <span className="text-[#E6C77A] font-semibold">{formData.wing}</span> wing has been transmitted to
              the Voyagers Executive Council at SMS Lucknow. You will receive interview scheduling details via {formData.email}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all"
            >
              Close Confirmation
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-12 mx-auto mb-2">
                <img
                  src="/voyagers-logo.png"
                  alt="Voyagers Logo"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <span className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#C5A052] font-semibold block">
                {CLUB_CONFIG.institution}
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-[#FFFDF7]">
                Induction Application · {new Date().getFullYear()}
              </h2>
              <p className="font-serif-royal italic text-sm text-[#E6C77A] mt-1">
                &ldquo;Explore new horizons. Unite talent. Achieve excellence.&rdquo;
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aman Soni"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    SMS Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@smslucknow.ac.in"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 95060..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    Student Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="SMS/2025/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    Department / Course *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none"
                  >
                    <option value="B.Tech - Computer Science & Engineering">B.Tech - Computer Science & Engineering</option>
                    <option value="B.Tech - Artificial Intelligence & ML">B.Tech - Artificial Intelligence & ML</option>
                    <option value="B.Tech - Electronics & Communication">B.Tech - Electronics & Communication</option>
                    <option value="BCA - Computer Applications">BCA - Computer Applications</option>
                    <option value="BBA - Business Administration">BBA - Business Administration</option>
                    <option value="B.Com (Hons)">B.Com (Hons)</option>
                    <option value="MBA / MCA Postgraduate">MBA / MCA Postgraduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                    Primary Domain / Wing *
                  </label>
                  <select
                    value={formData.wing}
                    onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none"
                  >
                    <option value="Technical & Software Systems">Technical & Software Systems (Web/AI)</option>
                    <option value="Robotics, IoT & Embedded Systems">Robotics, IoT & Embedded Systems</option>
                    <option value="Creative Media, 3D Web & Design">Creative Media, 3D Web & Design</option>
                    <option value="Event Planning, Stage & Operations">Event Planning, Stage & Operations</option>
                    <option value="Public Relations & Corporate Outreach">Public Relations & Corporate Outreach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C5A052] font-semibold mb-1">
                  Why do you wish to join Voyagers? (Your skills & interests) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Share your technical interests, past projects, or what you hope to achieve with Voyagers..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A1E3B] border border-[#C5A052]/30 text-white focus:border-[#E6C77A] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(197,160,82,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>Submit Membership Application</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
