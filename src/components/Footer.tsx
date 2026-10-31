/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Instagram, Linkedin, Github, Youtube, Mail, MapPin } from 'lucide-react';
import { CLUB_CONFIG } from '../data/clubData';
import { CornerFlourish } from './Ornaments';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02070F] text-[#F8F3E8] pt-16 pb-12 border-t border-[#C5A052]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C5A052]/20">
          {/* Col 1: Brand & Official Seal */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-12 flex items-center justify-center shrink-0">
                <img
                  src="/voyagers-logo.png"
                  alt="Official Voyagers Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(230,199,122,0.4)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-xl font-bold tracking-[0.18em] text-[#FFFDF7]">
                  {CLUB_CONFIG.name}
                </span>
                <span className="text-[10px] font-sans tracking-[0.15em] text-[#C5A052] uppercase font-semibold">
                  Student Club · SMS Lucknow
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              The premier student innovation and technical society of the School of Management Sciences,
              Lucknow. Empowering future leaders through code, robotics, and creative excellence.
            </p>

            <span className="font-serif-royal italic text-sm text-[#E6C77A]">
              &ldquo;{CLUB_CONFIG.tagline}&rdquo;
            </span>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#E6C77A] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Home', 'About', 'Achievements', 'Events', 'Gallery', 'Journey', 'Team', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-[#E6C77A] transition-colors uppercase tracking-wider text-[11px]"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#E6C77A] mb-4">
              Domains
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Artificial Intelligence</li>
              <li>Competitive Code</li>
              <li>Robotics & IoT</li>
              <li>3D & Spatial Web</li>
              <li>Leadership Conclaves</li>
              <li>Product Incubation</li>
            </ul>
          </div>

          {/* Col 4: Institutional Coordinates */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#E6C77A] mb-4">
              Institution
            </h4>
            <p className="text-xs text-slate-300 font-medium mb-1">
              {CLUB_CONFIG.institution}
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              {CLUB_CONFIG.campusAddress}
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href={CLUB_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0A1E3B] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={CLUB_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0A1E3B] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={CLUB_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0A1E3B] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href={CLUB_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0A1E3B] border border-[#C5A052]/30 text-slate-300 hover:text-[#E6C77A] hover:border-[#E6C77A] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {CLUB_CONFIG.name} Student Club · {CLUB_CONFIG.institution}, Lucknow. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-cinzel font-semibold uppercase tracking-wider text-[#C5A052] hover:text-[#FFFDF7] transition-colors"
          >
            <span>Back to Summit</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
