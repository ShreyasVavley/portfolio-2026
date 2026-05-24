'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import ProjectCard from '@/components/ProjectCard';
import HUDNavigation from '@/components/HUDNavigation';
import PortalOverlay from '@/components/PortalOverlay';
import AboutModal from '@/components/AboutModal';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [launchedProject, setLaunchedProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // ── GSAP Setup ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        // Initial state: invisible and pushed back in Z
        gsap.set(card, { opacity: 0, scale: 0.5, z: -200, rotateY: 15 });

        // Each card gets its own ScrollTrigger tied to scroll position
        const startPct = i / projects.length;
        const peakPct  = (i + 0.5) / projects.length;
        const endPct   = (i + 1) / projects.length;

        const scrollHeight = () =>
          document.documentElement.scrollHeight - window.innerHeight;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `top+=${startPct * scrollHeight()} top`,
          end:   () => `top+=${endPct   * scrollHeight()} top`,
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress; // 0 → 1 within this card's band

            let scale: number;
            let opacity: number;
            let z: number;
            let ry: number;

            if (p < 0.3) {
              // Fly in from behind
              const t = p / 0.3;
              scale   = gsap.utils.interpolate(0.4,  1.0, gsap.parseEase('power2.out')(t));
              opacity = gsap.utils.interpolate(0,    1,   t);
              z       = gsap.utils.interpolate(-200, 0,   gsap.parseEase('power2.out')(t));
              ry      = gsap.utils.interpolate(20,   0,   t);
            } else if (p < 0.7) {
              // Dwell in sweet-spot
              scale   = 1.0;
              opacity = 1;
              z       = 0;
              ry      = 0;
            } else {
              // Fly past camera into foreground
              const t = (p - 0.7) / 0.3;
              scale   = gsap.utils.interpolate(1.0, 1.5, gsap.parseEase('power2.in')(t));
              opacity = gsap.utils.interpolate(1,   0,   gsap.parseEase('power2.in')(t));
              z       = gsap.utils.interpolate(0,   150, gsap.parseEase('power2.in')(t));
              ry      = gsap.utils.interpolate(0,  -15,  t);
            }

            gsap.set(card, { opacity, scale, z, rotateY: ry });

            // Update active index at peak
            if (p >= 0.3 && p <= 0.7) {
              setActiveIndex(i);
            }
          },
        });
      });
    }, containerRef);

    gsapCtxRef.current = ctx;

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // ── Portal handlers ──────────────────────────────────────────────────────────
  const handleLaunch = useCallback((project: Project, rect: DOMRect) => {
    setOriginRect(rect);
    setLaunchedProject(project);
    // Prevent body scroll while portal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const handlePortalClose = useCallback(() => {
    setLaunchedProject(null);
    setOriginRect(null);
    document.body.style.overflow = '';
  }, []);

  const handleOpenAbout = useCallback(() => {
    setIsAboutOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseAbout = useCallback(() => {
    setIsAboutOpen(false);
    document.body.style.overflow = '';
  }, []);

  // ── HUD navigate ────────────────────────────────────────────────────────────
  const handleNavigate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <>
      {/* Scroll container — 500vh gives 27 project "stops" */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: '500vh' }}
        aria-label="Portfolio scroll timeline"
      >
        {/* Sticky viewport for 3D cards */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          {/* HUD header overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-6 pb-4 pointer-events-none">
            <div>
              <div className="font-mono text-[10px] tracking-[0.4em] text-white/30 mb-1">
                DEEP SPACE ODYSSEY
              </div>
              <div className="font-display text-xl font-bold text-white">
                Shreyas Vavley
              </div>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              {/* About Button */}
              <button
                onClick={handleOpenAbout}
                className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
              >
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase group-hover:text-neon-cyan hidden sm:inline-block">
                  [ IDENTITY ]
                </span>
                <span className="font-mono text-xs font-bold text-white/90 group-hover:text-white">
                  ABOUT ME
                </span>
              </button>

              <div className="hidden sm:block w-px h-6 bg-white/10" />

              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green animate-ping opacity-75" />
                </div>
                <span className="font-mono text-xs text-neon-green tracking-widest hidden sm:inline-block">
                  {projects.length} SYSTEMS ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Ambient tunnel glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(ellipse 60% 60% at 50% 50%,
                  rgba(0,255,255,0.03) 0%,
                  rgba(168,85,247,0.02) 50%,
                  transparent 100%)`,
              }}
            />
          </div>

          {/* Perspective track — all 27 cards positioned with CSS perspective */}
          <div
            ref={trackRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => setCardRef(el, index)}
                className="absolute w-full px-4 sm:px-8"
                style={{
                  maxWidth: '560px',
                  transformStyle: 'preserve-3d',
                  // Slight X/Y stagger for a floating, non-uniform cluster look
                  marginLeft: `${((index % 3) - 1) * 40}px`,
                  marginTop: `${((index % 4) - 1.5) * 20}px`,
                }}
              >
                <ProjectCard
                  project={project}
                  onLaunch={handleLaunch}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>

          {/* Scroll hint (shown only at very top) */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-bounce-slow">
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">
              Scroll to navigate
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* HUD Navigation Dock */}
      <HUDNavigation
        activeIndex={activeIndex}
        onNavigate={handleNavigate}
        currentProject={projects[activeIndex]}
      />

      {/* Portal Overlay */}
      <PortalOverlay
        project={launchedProject}
        originRect={originRect}
        onClose={handlePortalClose}
      />

      {/* About Modal */}
      <AboutModal 
        isOpen={isAboutOpen}
        onClose={handleCloseAbout}
      />
    </>
  );
}
