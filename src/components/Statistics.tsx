/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Calendar, Users, Star, Edit3, Check } from 'lucide-react';
import { CLUB_STATISTICS, ClubMetric } from '../data/clubData';
import { CornerFlourish } from './Ornaments';

export const Statistics: React.FC = () => {
  const [metrics, setMetrics] = useState<ClubMetric[]>(CLUB_STATISTICS);
  const [inView, setInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [isEditing, setIsEditing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animated counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Number count-up animation
  useEffect(() => {
    if (!inView) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      const nextValues: { [key: string]: number } = {};
      metrics.forEach((m) => {
        nextValues[m.id] = Math.round(m.value * easeOutQuad);
      });

      setAnimatedValues(nextValues);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, metrics]);

  const handleMetricChange = (id: string, newVal: number) => {
    setMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, value: newVal } : m))
    );
  };

  const getIcon = (type: ClubMetric['icon']) => {
    switch (type) {
      case 'trophy':
        return <Trophy size={28} className="text-[#C5A052]" />;
      case 'calendar':
        return <Calendar size={28} className="text-[#C5A052]" />;
      case 'users':
        return <Users size={28} className="text-[#C5A052]" />;
      case 'star':
        return <Star size={28} className="text-[#C5A052]" />;
      default:
        return <Star size={28} className="text-[#C5A052]" />;
    }
  };

  return (
    <section id="statistics" ref={sectionRef} className="relative py-12 md:py-16 -mt-8 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certificate Ornamental Framed Strip with 3D Scroll Roll */}
        <div className="scroll-3d-section relative rounded-2xl bg-gradient-to-b from-[#0A1E3B]/95 via-[#07182F]/95 to-[#051124]/95 border-2 border-[#C5A052]/40 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(4,13,26,0.8)]">
          {/* Certificate Corner Flourishes */}
          <CornerFlourish position="top-left" className="absolute top-2 left-2" />
          <CornerFlourish position="top-right" className="absolute top-2 right-2" />
          <CornerFlourish position="bottom-left" className="absolute bottom-2 left-2" />
          <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2" />

          {/* Inner hairline border */}
          <div className="absolute inset-3 border border-[#E6C77A]/20 rounded-xl pointer-events-none" />

          {/* Admin / Editor Controls for Club Records */}
          <div className="flex items-center justify-between pb-4 border-b border-[#C5A052]/20 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#E6C77A] font-semibold">
                Official Club Milestones & Metrics
              </span>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-sans text-[#C5A052] hover:text-[#FFFDF7] bg-[#0A1E3B] border border-[#C5A052]/40 transition-colors"
              title="Edit stats placeholders directly"
            >
              {isEditing ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Edit3 size={12} />
                  <span>Edit Records</span>
                </>
              )}
            </button>
          </div>

          {/* Horizontal Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#C5A052]/20">
            {metrics.map((metric, idx) => (
              <div
                key={metric.id}
                className={`flex flex-col items-center text-center p-3 sm:p-4 ${
                  idx > 0 ? 'pt-6 md:pt-4' : ''
                }`}
              >
                {/* Antique Gold Icon with Subtle Halo */}
                <div className="w-14 h-14 rounded-full border border-[#C5A052]/50 bg-radial from-[#C5A052]/15 to-transparent flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(197,160,82,0.15)]">
                  {getIcon(metric.icon)}
                </div>

                {/* Counter Metric */}
                {isEditing ? (
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="number"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(metric.id, parseInt(e.target.value) || 0)}
                      className="w-16 px-1.5 py-0.5 bg-[#040D1A] border border-[#C5A052] rounded text-center text-lg font-cinzel text-[#E6C77A]"
                    />
                    <span className="font-cinzel text-lg text-[#E6C77A]">{metric.suffix}</span>
                  </div>
                ) : (
                  <div className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFDF7] my-1 tabular-nums">
                    <span className="gold-gradient-text">
                      {animatedValues[metric.id] ?? metric.value}
                    </span>
                    <span className="text-[#E6C77A] text-2xl sm:text-3xl font-light">
                      {metric.suffix}
                    </span>
                  </div>
                )}

                {/* Metric Label */}
                <span className="font-serif-royal text-lg sm:text-xl font-medium text-[#F8F3E8] leading-tight">
                  {metric.label}
                </span>

                {/* Subtitle / Context */}
                <span className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                  {metric.sublabel}
                </span>

                {metric.isEditablePlaceholder && (
                  <span className="text-[9px] uppercase tracking-wider text-[#C5A052]/60 mt-1.5">
                    Editable Record
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
