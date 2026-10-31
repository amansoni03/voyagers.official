/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { CLUB_CONFIG } from '../data/clubData';

interface NavbarProps {
  onOpenJoin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy detection
      const sections = ['home', 'about', 'achievements', 'events', 'gallery', 'journey', 'team', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Events', href: '#events', id: 'events' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Team', href: '#team', id: 'team' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#040D1A]/90 backdrop-blur-md border-b border-[#C5A052]/20 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Official Voyagers Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          {/* Authentic Logo with Wide Wings */}
          <div className="relative w-12 h-10 sm:w-14 sm:h-11 flex items-center justify-center shrink-0">
            <img
              src="/voyagers-logo.png"
              alt="Official Voyagers Logo, SMS Lucknow"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(230,199,122,0.45)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Vertical Decorative Gold Separator */}
          <div className="h-7 w-[1px] bg-gradient-to-b from-transparent via-[#C5A052]/60 to-transparent" />

          {/* Typography Lockup */}
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.18em] text-[#F8F3E8] group-hover:text-[#E6C77A] transition-colors leading-tight">
              {CLUB_CONFIG.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.15em] text-[#C5A052] uppercase font-semibold leading-tight">
              Student Club, SMS Lucknow
            </span>
          </div>
        </a>

        {/* Right Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-xs font-medium tracking-[0.12em] uppercase transition-colors py-1 ${
                  isActive ? 'text-[#E6C77A] font-semibold' : 'text-[#F8F3E8]/80 hover:text-[#FFFDF7]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A052] to-transparent rounded-full shadow-[0_0_8px_#C5A052]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenJoin}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C5A052] bg-gradient-to-r from-[#0A1E3B]/80 to-[#07182F]/80 hover:from-[#C5A052]/20 hover:to-[#E6C77A]/20 text-[#E6C77A] hover:text-[#FFFDF7] text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,160,82,0.3)] hover:border-[#E6C77A] active:scale-95"
          >
            <span>✦ Join Us</span>
            <ArrowRight size={13} className="text-[#C5A052]" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#E6C77A] hover:bg-[#0A1E3B] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07182F]/95 backdrop-blur-xl border-b border-[#C5A052]/30 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm tracking-wider uppercase py-2 border-b border-white/5 transition-colors ${
                  activeSection === link.id ? 'text-[#E6C77A] font-semibold pl-2 border-l-2 border-[#C5A052]' : 'text-slate-300'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#C5A052] bg-gradient-to-r from-[#C5A052] to-[#E6C77A] text-[#07182F] font-bold text-xs uppercase tracking-widest shadow-md"
            >
              <span>Apply to Join Voyagers</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
