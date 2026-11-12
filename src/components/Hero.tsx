/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { Globe3D } from './Globe3D';
import { CornerFlourish } from './Ornaments';
import { CLUB_CONFIG } from '../data/clubData';

interface HeroProps {
  scrollY?: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollY = 0 }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-radial from-[#07182F] via-[#040D1A] to-[#02070F]"
    >
      {/* Royal Corner Flourishes from Certificate Motif */}
      <CornerFlourish position="top-left" className="absolute top-16 left-4 md:left-8 z-20 pointer-events-none" />
      <CornerFlourish position="top-right" className="absolute top-16 right-4 md:right-8 z-20 pointer-events-none" />

      {/* Atmospheric Real SMS Lucknow Campus Background Silhouette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(7, 24, 47, 0.4) 20%, #040D1A 85%), url('/sms-lucknow-campus.jpg')`,
        }}
      />

      {/* Soft Ambient Gold Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C5A052]/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] rounded-full bg-[#0A1E3B]/50 blur-3xl pointer-events-none -z-10" />

      {/* Full-Page 3D Celestial Globe (Spans the entire hero section, smoothly gliding under the typography) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
        <Globe3D scrollY={scrollY} className="w-full h-full" />
      </div>

      {/* Hero Foreground Content Layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column: Typography & CTAs floating gracefully in front of the 3D globe */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left pt-6 lg:pt-0">
            {/* Main Grand Display Heading */}
            <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.06em] text-[#FFFDF7] leading-none mb-3 drop-shadow-[0_4px_24px_rgba(4,13,26,0.95)]">
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(197,160,82,0.45)]">
                {CLUB_CONFIG.name}
              </span>
            </h1>

            {/* Tagline */}
            <h2 className="font-serif-royal italic text-2xl sm:text-3xl lg:text-4xl text-[#E6C77A] font-normal tracking-wide mb-6 drop-shadow-[0_2px_14px_rgba(4,13,26,0.85)]">
              {CLUB_CONFIG.tagline}
            </h2>

            {/* Narrative Description */}
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-10 text-pretty drop-shadow-[0_2px_10px_rgba(4,13,26,0.95)] bg-[#040D1A]/40 backdrop-blur-[2px] p-3 -ml-3 rounded-2xl border border-[#C5A052]/10">
              &ldquo;A community of dreamers, innovators and achievers, uniting talent to explore new horizons.&rdquo;
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pointer-events-auto">
              <button
                onClick={() => handleScrollTo('journey')}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full gold-gradient-bg text-[#07182F] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(197,160,82,0.4)] hover:shadow-[0_4px_28px_rgba(230,199,122,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore Our Journey</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleScrollTo('events')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#C5A052]/60 hover:border-[#E6C77A] bg-[#0A1E3B]/80 hover:bg-[#0A1E3B] text-[#F8F3E8] hover:text-[#FFFDF7] text-xs font-semibold uppercase tracking-wider transition-all duration-300 backdrop-blur-md active:scale-95 cursor-pointer shadow-lg"
              >
                <Calendar size={15} className="text-[#C5A052]" />
                <span>Discover Events</span>
              </button>
            </div>
          </div>

          {/* Right Column: Open spatial expanse so the 3D globe shines through cleanly without any bounding box */}
          <div className="lg:col-span-5 pointer-events-none" />
        </div>
      </div>

      {/* Center Bottom: Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-auto">
        <button
          onClick={() => handleScrollTo('statistics')}
          className="group flex flex-col items-center text-center focus:outline-none"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#E6C77A]/80 group-hover:text-[#FFFDF7] transition-colors">
            Scroll Down
          </span>
          <ChevronDown
            size={18}
            className="text-[#C5A052] animate-bounce transition-colors group-hover:text-[#FFFDF7]"
          />
        </button>
      </div>
    </section>
  );
};
