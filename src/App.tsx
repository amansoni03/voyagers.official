/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statistics } from './components/Statistics';
import { About } from './components/About';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Timeline } from './components/Timeline';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { CustomCursor } from './components/CustomCursor';
import { initScrollTransitions } from './animations/scrollAnimationEngine';

export default function App() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // Initialize GSAP 3D Scroll Transitions once on mount
  useEffect(() => {
    const cleanup = initScrollTransitions({ mode: 'cinematic-flip' });
    return () => cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-[#040D1A] text-[#F8F3E8] relative selection:bg-[#C5A052]/30 selection:text-[#FFFDF7]">
      {/* 0ms Latency Custom Voyagers Cursor */}
      <CustomCursor />

      {/* SECTION 1: Top Navigation */}
      <Navbar onOpenJoin={() => setIsJoinOpen(true)} />

      <main>
        {/* SECTION 2: Cinematic 3D Hero */}
        <Hero />

        {/* SECTION 3: Club Statistics */}
        <Statistics />

        {/* SECTION 4: About Voyagers */}
        <About />

        {/* SECTION 5: Events */}
        <Events />

        {/* SECTION 6: Event Gallery */}
        <Gallery />

        {/* SECTION 7: Our Journey */}
        <Timeline />

        {/* SECTION 8: Our Team */}
        <Team />

        {/* SECTION 9: Contact */}
        <Contact onOpenJoin={() => setIsJoinOpen(true)} />
      </main>

      {/* SECTION 10: Institutional Footer */}
      <Footer />

      {/* Interactive Join Voyagers Modal */}
      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
    </div>
  );
}
