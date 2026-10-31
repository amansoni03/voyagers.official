/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/gallery';
import { CornerFlourish, GoldDivider } from './Ornaments';
import { TiltCard3D } from './TiltCard3D';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Hackathons', 'Workshops', 'Celebrations', 'Campus'];

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  };

  return (
    <section id="gallery" className="scroll-3d-section relative py-24 bg-[#051124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-roll-heading text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C77A] font-semibold mb-3">
            <Camera size={14} className="text-[#C5A052]" />
            <span>Collegiate Archive & Life at Voyagers</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4">
            Moments That <span className="gold-gradient-text">Define Us.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            A visual retrospective of midnight innovation sprints, robotics calibrations, keynote
            addresses, and collegiate camaraderie at SMS Lucknow.
          </p>

          <GoldDivider />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold shadow-md scale-105'
                    : 'bg-[#0A1E3B]/80 text-slate-300 hover:text-white border border-[#C5A052]/20 hover:border-[#C5A052]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-stagger-flip">
          {filteredItems.map((item, idx) => (
            <TiltCard3D key={item.id} className="h-full">
              <div
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden border border-[#C5A052]/30 hover:border-[#E6C77A] bg-[#0A1E3B] cursor-pointer shadow-xl transition-all duration-300 hover:shadow-[0_15px_30px_rgba(197,160,82,0.25)] h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/30 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                  {/* Top Corner Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-cinzel font-semibold uppercase tracking-widest text-[#E6C77A] bg-[#07182F]/80 px-2.5 py-1 rounded-md border border-[#C5A052]/40 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-[#07182F]/80 text-[#E6C77A] border border-[#C5A052]/40">
                    <Maximize2 size={14} />
                  </div>

                  {/* Caption at bottom */}
                  <div className="absolute bottom-3 left-4 right-4 text-left">
                    <span className="text-[10px] text-[#C5A052] font-semibold tracking-wider uppercase block mb-1">
                      {item.date}
                    </span>
                    <h4 className="font-cinzel text-base font-bold text-[#FFFDF7] group-hover:text-[#E6C77A] transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-light line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-[#0A1E3B] text-[#E6C77A] hover:bg-[#C5A052] hover:text-[#07182F] transition-colors"
            aria-label="Close Lightbox"
          >
            <X size={22} />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0A1E3B]/80 text-[#E6C77A] hover:bg-[#C5A052] hover:text-[#07182F] transition-colors border border-[#C5A052]/40"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0A1E3B]/80 text-[#E6C77A] hover:bg-[#C5A052] hover:text-[#07182F] transition-colors border border-[#C5A052]/40"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Current Lightbox Item */}
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A052] shadow-2xl">
              <CornerFlourish position="top-left" className="absolute top-2 left-2 z-20" />
              <CornerFlourish position="top-right" className="absolute top-2 right-2 z-20" />

              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 text-center max-w-xl">
              <span className="text-[11px] font-cinzel tracking-widest uppercase text-[#C5A052]">
                {filteredItems[lightboxIndex].category} · {filteredItems[lightboxIndex].date}
              </span>
              <h3 className="font-cinzel text-xl font-bold text-[#FFFDF7] mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
