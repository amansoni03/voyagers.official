/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const CornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const transform = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#C5A052] opacity-80 ${transform} ${className}`}
      aria-hidden="true"
    >
      {/* Outer corner frame */}
      <path d="M2 42V12C2 6.47715 6.47715 2 12 2H42" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 42V15C7 10.5817 10.5817 7 15 7H42" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
      {/* Delicate floral scrollwork */}
      <path
        d="M2 20C4 20 8 18 10 15C12 12 14 6 14 2"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
      <path
        d="M20 2C20 4 18 8 15 10C12 12 6 14 2 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
      <circle cx="15" cy="15" r="2" fill="currentColor" fillOpacity="0.9" />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
    </svg>
  );
};

export const GoldDivider: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label,
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#C5A052]/60 to-[#E6C77A]" />
      <div className="flex items-center gap-2 text-[#E6C77A]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A052]">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        {label && (
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#E6C77A] font-medium px-2">
            {label}
          </span>
        )}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A052]">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </div>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent via-[#C5A052]/60 to-[#E6C77A]" />
    </div>
  );
};
