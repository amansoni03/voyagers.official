/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_VIDEO_ID = 'I5Ti56zjYsg';

interface BackgroundAudioProps {
  className?: string;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ className = '' }) => {
  // Start unmuted by default as requested ("whenever users open this website")
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('voyagers_bgm_muted') === 'true';
    } catch {
      return false;
    }
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef<boolean>(false);

  // Totally destroy the player and disconnect from stream
  const destroyPlayer = useCallback(() => {
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.stopVideo === 'function') {
          playerRef.current.stopVideo();
        }
        if (typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
        }
      } catch (err) {
        console.warn('Error destroying YouTube player:', err);
      }
      playerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Initialize player only when NOT muted
  const initPlayer = useCallback(() => {
    if (isMuted) return;

    const setupPlayer = () => {
      // Ensure container exists
      const targetElementId = 'voyagers-yt-bgm-embed';
      let el = document.getElementById(targetElementId);
      if (!el && containerRef.current) {
        el = document.createElement('div');
        el.id = targetElementId;
        containerRef.current.appendChild(el);
      }

      if (!el || !window.YT || !window.YT.Player) return;

      destroyPlayer();

      playerRef.current = new window.YT.Player(targetElementId, {
        height: '1',
        width: '1',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            try {
              event.target.setVolume(45); // Warm, elegant background volume
              const playPromise = event.target.playVideo();
              if (playPromise !== undefined && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                  // Browser blocked autoplay without user gesture
                });
              }
            } catch (e) {
              console.warn('Autoplay prevented by browser:', e);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
              hasStartedRef.current = true;
            } else if (event.data === 0) {
              // Loop
              event.target.playVideo();
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    // Load YouTube IFrame API if not already present
    if (!window.YT) {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        setupPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      setupPlayer();
    }
  }, [isMuted, destroyPlayer]);

  // Handle initialization and muting/unmuting lifecycle
  useEffect(() => {
    if (!isMuted) {
      initPlayer();
    } else {
      // Totally remove the background music from memory & network
      destroyPlayer();
    }

    return () => {
      destroyPlayer();
    };
  }, [isMuted, initPlayer, destroyPlayer]);

  // Fallback: Browsers block sound autoplay until the first click/touch on the page
  useEffect(() => {
    if (isMuted || userInteracted) return;

    const handleFirstInteraction = () => {
      setUserInteracted(true);
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch (e) {
          // ignore
        }
      } else if (!isMuted) {
        initPlayer();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMuted, userInteracted, initPlayer]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      localStorage.setItem('voyagers_bgm_muted', String(nextMuted));
    } catch {}

    if (nextMuted) {
      // User requested MUTE: completely unload the stream from network/backend
      destroyPlayer();
    }
  };

  return (
    <>
      {/* Hidden YouTube Player Host - completely emptied when muted */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-999]"
      />

      {/* Matching Theme Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        title={isMuted ? 'Background Music: Muted (Offline - Click to Play)' : 'Background Music: Playing (Click to Mute)'}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-300 backdrop-blur-md active:scale-95 cursor-pointer shadow-lg ${
          isMuted
            ? 'bg-[#07182F]/90 border-[#C5A052]/30 text-slate-400 hover:text-[#FFFDF7] hover:border-[#C5A052]'
            : 'bg-[#0A1E3B]/95 border-[#C5A052] text-[#E6C77A] hover:border-[#F2D794] shadow-[0_0_15px_rgba(197,160,82,0.35)]'
        } ${className}`}
      >
        {isMuted ? (
          <>
            <VolumeX size={15} className="text-slate-400 group-hover:text-[#E6C77A] transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider uppercase hidden md:inline">
              Muted
            </span>
          </>
        ) : (
          <>
            <Volume2 size={15} className="text-[#E6C77A] group-hover:scale-110 transition-transform" />
            {/* Ambient Sound Equalizer Bars */}
            <span className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
              <span className={`w-0.5 rounded-full bg-[#E6C77A] ${isPlaying ? 'animate-[pulse_0.8s_ease-in-out_infinite] h-3' : 'h-1.5'}`} />
              <span className={`w-0.5 rounded-full bg-[#C5A052] ${isPlaying ? 'animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-3.5' : 'h-2'}`} />
              <span className={`w-0.5 rounded-full bg-[#E6C77A] ${isPlaying ? 'animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5' : 'h-1'}`} />
            </span>
            <span className="text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider uppercase hidden md:inline text-[#E6C77A]">
              Audio
            </span>
          </>
        )}
      </button>
    </>
  );
};
