'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';

gsap.registerPlugin(ScrollToPlugin);

interface HUDNavigationProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
  currentProject?: Project;
}

export default function HUDNavigation({ activeIndex, onNavigate, currentProject }: HUDNavigationProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the nav to keep active chip visible
  useEffect(() => {
    if (!scrollRef.current) return;
    const chip = scrollRef.current.children[activeIndex] as HTMLElement;
    if (chip) {
      chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIndex]);

  const handleNavigate = useCallback(
    (index: number) => {
      // Calculate target scroll position based on project index
      // Each project occupies an equal share of the total scroll height (500vh)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (index / (projects.length - 1)) * scrollHeight;

      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 1.2,
        ease: 'power3.inOut',
      });

      onNavigate(index);
    },
    [onNavigate]
  );

  const accentColor = currentProject?.accentColor ?? '#00FFFF';

  return (
    <div
      ref={dockRef}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
      role="navigation"
      aria-label="Project timeline navigation"
    >
      <div
        className="mx-auto max-w-5xl rounded-2xl px-4 py-3"
        style={{
          background: 'rgba(11,11,15,0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 -4px 40px rgba(0,0,0,0.6), 0 0 30px ${accentColor}10`,
        }}
      >
        <div className="flex items-center gap-4">
          {/* Left: identity */}
          <div className="flex-shrink-0 hidden sm:block">
            <div className="font-mono text-[10px] text-white/30 tracking-widest">@ShreyasVavley</div>
            <div
              className="font-mono text-xs font-bold tracking-wide"
              style={{ color: accentColor }}
            >
              {currentProject
                ? `NODE_${String(activeIndex + 1).padStart(2, '0')}`
                : 'TIMELINE'}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-white/10" />

          {/* Center: scrollable chips */}
          <div className="flex-1 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-[rgba(11,11,15,0.85)] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-[rgba(11,11,15,0.85)] to-transparent" />

            <div
              ref={scrollRef}
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={project.id}
                    id={`hud-node-${project.id}`}
                    onClick={() => handleNavigate(index)}
                    className="flex-shrink-0 relative flex items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-all duration-300 hover:scale-110"
                    style={{
                      width: isActive ? '40px' : '28px',
                      height: '28px',
                      background: isActive
                        ? `linear-gradient(135deg, ${project.accentColor}40, ${project.accentColor}20)`
                        : 'rgba(255,255,255,0.04)',
                      border: isActive
                        ? `1px solid ${project.accentColor}80`
                        : '1px solid rgba(255,255,255,0.08)',
                      color: isActive ? project.accentColor : 'rgba(255,255,255,0.35)',
                      boxShadow: isActive ? `0 0 12px ${project.accentColor}30` : 'none',
                    }}
                    title={project.title}
                    aria-label={`Navigate to ${project.title}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {String(index + 1).padStart(2, '0')}
                    {isActive && (
                      <span
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-pulse"
                        style={{ background: project.accentColor }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-white/10" />

          {/* Right: progress indicator */}
          <div className="flex-shrink-0 hidden sm:flex flex-col items-end gap-1 min-w-[60px]">
            <span className="font-mono text-[10px] text-white/30">{activeIndex + 1} / {projects.length}</span>
            <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={indicatorRef}
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  background: `linear-gradient(to right, ${accentColor}, ${accentColor}80)`,
                  boxShadow: `0 0 6px ${accentColor}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
