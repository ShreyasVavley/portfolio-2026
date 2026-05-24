'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Project } from '@/types/project';
import { gsap } from 'gsap';
import {
  X,
  ExternalLink,
  GitBranch,
  Zap,
  Shield,
  Star,
  Globe,
  Code2,
  ChevronRight,
} from 'lucide-react';

// ─── Domains known to block iframe embedding ─────────────────────────────────
const IFRAME_BLOCKED_DOMAINS = [
  'github.com',
  'google.com',
  'facebook.com',
  'instagram.com',
  'twitter.com',
  'x.com',
  'linkedin.com',
  'youtube.com',
];

function isIframeBlocked(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return IFRAME_BLOCKED_DOMAINS.some(
      (d) => hostname === d || hostname.endsWith('.' + d)
    );
  } catch {
    return false;
  }
}

// ─── Category colour map ──────────────────────────────────────────────────────
const CATEGORY_ACCENT: Record<string, string> = {
  'AI / ML':        '#00FFFF',
  'Full-Stack':     '#A855F7',
  'Data Science':   '#10B981',
  'EdTech':         '#F59E0B',
  'Analytics':      '#00FFFF',
  'Productivity':   '#10B981',
  'Civic Tech':     '#A855F7',
  'Creative Tech':  '#EF4444',
  'Desktop App':    '#F59E0B',
  'Developer Tools':'#00FFFF',
  'Portfolio':      '#A855F7',
  'Security':       '#EF4444',
};

// ─── Project Intel Panel (shown when iframe is blocked) ───────────────────────
function ProjectIntelPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const accent = project.accentColor;

  return (
    <div className="w-full h-full flex items-center justify-center p-6 overflow-auto">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${accent}10 0%, transparent 70%)`,
        }}
      />

      {/* Content card */}
      <div className="relative w-full max-w-2xl">
        {/* Corner decorations */}
        <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: accent }} />
        <div className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 rounded-tr-xl" style={{ borderColor: accent }} />
        <div className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 rounded-bl-xl" style={{ borderColor: accent }} />
        <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: accent }} />

        <div
          className="glass-card rounded-2xl p-8"
          style={{ border: `1px solid ${accent}20` }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              {/* Status */}
              <div className="flex items-center gap-2 mb-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green animate-ping opacity-75" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-neon-green uppercase">
                  [ LIVE DEPLOYMENT ACTIVE ]
                </span>
              </div>
              {/* Node ID */}
              <div
                className="inline-block px-2 py-0.5 rounded font-mono text-xs font-bold mb-2"
                style={{ backgroundColor: accent, color: '#0B0B0F' }}
              >
                NODE_{String(project.id).padStart(2, '0')}
              </div>
              {/* Title */}
              <h2
                className="font-display text-3xl font-bold leading-tight"
                style={{ color: accent }}
              >
                {project.title}
              </h2>
            </div>
            {/* Category badge */}
            <span
              className="font-mono text-[10px] px-3 py-1 rounded-full border whitespace-nowrap ml-4 mt-1"
              style={{
                borderColor: `${accent}40`,
                color: accent,
                backgroundColor: `${accent}12`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-6 opacity-30"
            style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
          />

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={12} style={{ color: accent }} />
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                Mission Brief
              </span>
            </div>
            <p className="text-white/70 text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={12} style={{ color: accent }} />
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                Technology Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 hover:brightness-125"
                  style={{
                    backgroundColor: `${accent}10`,
                    borderColor: `${accent}30`,
                    color: accent,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Info notice */}
          <div
            className="flex items-start gap-3 p-3 rounded-lg mb-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Shield size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="font-mono text-xs text-white/40 leading-relaxed">
              Live deployment restricted from iframe embedding. Use the buttons
              below to access the full environment.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary: Open repo */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-bold tracking-wider transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${accent}25, ${accent}45)`,
                border: `1px solid ${accent}60`,
                color: accent,
                boxShadow: `0 0 25px ${accent}20`,
              }}
            >
              <GitBranch size={15} />
              VIEW REPOSITORY
              <ChevronRight size={14} className="opacity-60" />
            </a>

            {/* Secondary: direct link */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-sm border text-white/50 hover:text-white/90 hover:bg-white/5 transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <Globe size={14} />
              OPEN DIRECT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Live iframe container ────────────────────────────────────────────────────
function LiveIframe({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Fallback: if iframe doesn't fire onLoad within 8s, consider it blocked
    timerRef.current = setTimeout(() => setTimedOut(true), 8000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleLoad = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoaded(true);
  };

  if (timedOut && !loaded) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-obsidian">
        <Shield size={36} className="text-amber-400 opacity-60" />
        <div className="text-center max-w-sm">
          <h3 className="font-mono text-base text-white/70 mb-2">CONTENT RESTRICTED</h3>
          <p className="font-mono text-xs text-white/35 mb-6 leading-relaxed">
            This deployment blocks iframe embedding via{' '}
            <code className="text-neon-cyan">X-Frame-Options</code>.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neon-cyan/40 text-neon-cyan font-mono text-sm hover:bg-neon-cyan/10 transition-all"
          >
            <ExternalLink size={13} />
            OPEN IN NEW TAB
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian z-10">
          <span className="font-mono text-white/25 text-sm animate-pulse">
            LOADING DEPLOYMENT...
          </span>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={handleLoad}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s' }}
      />
    </>
  );
}

// ─── Portal Overlay (exported) ────────────────────────────────────────────────
interface PortalOverlayProps {
  project: Project | null;
  originRect: DOMRect | null;
  onClose: () => void;
}

export default function PortalOverlay({ project, originRect, onClose }: PortalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const blocked = project ? isIframeBlocked(project.liveUrl) : false;

  // Entry animation
  useEffect(() => {
    if (!project || !overlayRef.current || !contentRef.current || isAnimating.current) return;
    isAnimating.current = true;

    gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
      .set(overlayRef.current, { display: 'flex' })
      .from(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      .from(contentRef.current, { scale: 0.88, opacity: 0, duration: 0.45, ease: 'power3.out' }, '-=0.15');
  }, [project]);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !contentRef.current || isAnimating.current) return;
    isAnimating.current = true;

    gsap.timeline({
      onComplete: () => { isAnimating.current = false; onClose(); },
    })
      .to(contentRef.current, { scale: 0.92, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
  }, [onClose]);

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  if (!project) return null;

  const accent = project.accentColor;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ background: 'rgba(11,11,15,0.95)', backdropFilter: 'blur(8px)' }}
    >
      <div
        ref={contentRef}
        className="relative w-full h-full max-w-[98vw] max-h-[96vh] rounded-2xl overflow-hidden"
        style={{
          border: `1px solid ${accent}35`,
          boxShadow: `0 0 60px ${accent}18, 0 0 120px ${accent}08`,
        }}
      >
        {/* ── Top HUD bar ─────────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-2.5"
          style={{
            background: 'rgba(11,11,15,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${accent}18`,
          }}
        >
          {/* Left: status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green animate-ping opacity-75" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-neon-green hidden sm:inline">
              {blocked ? '[ PROJECT INTEL ]' : '[ SIMULATION ACTIVE ]'}
            </span>
            <div
              className="h-3 w-px hidden sm:block"
              style={{ backgroundColor: `${accent}30` }}
            />
            <span
              className="font-mono text-xs font-bold tracking-wide"
              style={{ color: accent }}
            >
              {project.title}
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-white/45 border border-white/10 hover:text-white/80 hover:border-white/20 transition-all"
            >
              <GitBranch size={11} />
              REPO
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-white/45 border border-white/10 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
            >
              <ExternalLink size={11} />
              DIRECT
            </a>
            <button
              onClick={handleClose}
              id="exit-portal-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all hover:scale-105 active:scale-95"
              style={{
                color: '#EF4444',
                borderColor: 'rgba(239,68,68,0.35)',
                background: 'rgba(239,68,68,0.07)',
              }}
            >
              <X size={12} />
              EXIT PORTAL [ESC]
            </button>
          </div>
        </div>

        {/* ── Main content area ────────────────────────────────── */}
        <div className="absolute inset-0 pt-10">
          {blocked ? (
            <ProjectIntelPanel project={project} onClose={handleClose} />
          ) : (
            <LiveIframe url={project.liveUrl} title={project.title} />
          )}
        </div>

        {/* Corner glow dots */}
        {['-top-0.5 -left-0.5', '-top-0.5 -right-0.5', '-bottom-0.5 -left-0.5', '-bottom-0.5 -right-0.5'].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
            style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
        ))}
      </div>
    </div>
  );
}
