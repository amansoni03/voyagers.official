/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef({ x: -200, y: -200 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch-only
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    const trailEl = trailRef.current;
    if (!cursorEl || !trailEl) return;

    const updateCursorTransform = () => {
      const scale = isClicking.current ? 0.85 : isHovering.current ? 1.25 : 1;
      const rot = isHovering.current ? '-6deg' : '0deg';
      cursorEl.style.transform = `translate3d(${mousePos.current.x - 16}px, ${mousePos.current.y - 14}px, 0) scale(${scale}) rotate(${rot})`;
    };

    const updateTrailTransform = () => {
      const scale = isHovering.current ? 1.5 : isClicking.current ? 0.8 : 1;
      trailEl.style.transform = `translate3d(${trailPos.current.x - 22}px, ${trailPos.current.y - 22}px, 0) scale(${scale})`;
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        cursorEl.style.opacity = '1';
        trailEl.style.opacity = '1';
        trailPos.current.x = e.clientX;
        trailPos.current.y = e.clientY;
      }

      // 0ms Latency: Direct GPU DOM update for primary cursor
      updateCursorTransform();

      // Lightweight check for clickable targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = Boolean(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('button, a, [role="button"]')
        );
        if (isHovering.current !== clickable) {
          isHovering.current = clickable;
          updateCursorTransform();
          trailEl.style.borderColor = clickable ? 'rgba(230, 199, 122, 0.7)' : 'rgba(197, 160, 82, 0.3)';
          trailEl.style.background = clickable
            ? 'radial-gradient(circle, rgba(230, 199, 122, 0.35) 0%, rgba(197, 160, 82, 0.1) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(197, 160, 82, 0.2) 0%, transparent 70%)';
        }
      }
    };

    const onMouseDown = () => {
      isClicking.current = true;
      updateCursorTransform();
      updateTrailTransform();
    };

    const onMouseUp = () => {
      isClicking.current = false;
      updateCursorTransform();
      updateTrailTransform();
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      cursorEl.style.opacity = '0';
      trailEl.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      cursorEl.style.opacity = '1';
      trailEl.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.documentElement.addEventListener('mouseenter', onMouseEnter, { passive: true });

    // Smooth physics lerp loop ONLY for the trailing stardust ring
    const renderLoop = () => {
      if (isVisible.current) {
        const dx = mousePos.current.x - trailPos.current.x;
        const dy = mousePos.current.y - trailPos.current.y;
        trailPos.current.x += dx * 0.28;
        trailPos.current.y += dy * 0.28;
        updateTrailTransform();
      }
      animFrameId.current = requestAnimationFrame(renderLoop);
    };
    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Trailing Golden Aura Halo (Smooth Spring) */}
      <div
        ref={trailRef}
        className="absolute top-0 left-0 w-[44px] h-[44px] rounded-full opacity-0 pointer-events-none will-change-transform border border-[#C5A052]/30 bg-radial from-[#C5A052]/20 to-transparent transition-opacity duration-200"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />

      {/* Main Cursor: Official Voyagers Logo Pointer (0ms Instant Response) */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 opacity-0 pointer-events-none will-change-transform transition-opacity duration-150"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(230,199,122,0.6)]">
          <img
            src="/voyagers-logo.png"
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
          {/* Subtle Golden Pointer Arrow Tip */}
          <div className="absolute -top-1 -left-1 w-2 h-2 rotate-45 bg-[#E6C77A] border border-[#07182F] shadow-[0_0_6px_#C5A052]" />
        </div>
      </div>
    </div>
  );
};
