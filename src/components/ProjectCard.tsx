'use client';

import React, { useRef, useCallback } from 'react';
import { Project } from '@/types/project';
import { ExternalLink, GitBranch, Zap } from 'lucide-react';
import { gsap } from 'gsap';

interface ProjectCardProps {
  project: Project;
  onLaunch: (project: Project, cardRect: DOMRect) => void;
  isActive?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  'AI / ML': 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
  'Web3': 'text-neon-violet border-neon-violet/30 bg-neon-violet/10',
  'DevOps': 'text-neon-green border-neon-green/30 bg-neon-green/10',
  'Security': 'text-red-400 border-red-400/30 bg-red-400/10',
  'Frontend': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  'Infrastructure': 'text-sky-400 border-sky-400/30 bg-sky-400/10',
  'Creative Tech': 'text-pink-400 border-pink-400/30 bg-pink-400/10',
  'Gaming': 'text-neon-violet border-neon-violet/30 bg-neon-violet/10',
  'Real-time': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  'WebXR': 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
  'MLOps': 'text-neon-green border-neon-green/30 bg-neon-green/10',
  'CMS': 'text-sky-400 border-sky-400/30 bg-sky-400/10',
  'Analytics': 'text-neon-violet border-neon-violet/30 bg-neon-violet/10',
  'Database': 'text-red-400 border-red-400/30 bg-red-400/10',
  'UI Library': 'text-pink-400 border-pink-400/30 bg-pink-400/10',
  'Developer Tools': 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
  'IoT': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  'Simulation': 'text-neon-green border-neon-green/30 bg-neon-green/10',
};

export default function ProjectCard({ project, onLaunch, isActive }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.03,
      duration: 0.4,
      ease: 'elastic.out(1, 0.6)',
    });
    gsap.to(cardRef.current, {
      boxShadow: `0 0 40px ${project.accentColor}30, 0 0 80px ${project.accentColor}15, inset 0 0 30px ${project.accentColor}08`,
      duration: 0.3,
    });
  }, [project.accentColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(cardRef.current, {
      boxShadow: '0 0 0px transparent',
      duration: 0.4,
    });
  }, []);

  const handleLaunch = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Brief flash pulse before expanding
    gsap.timeline()
      .to(cardRef.current, { scale: 0.97, duration: 0.1, ease: 'power2.in' })
      .to(cardRef.current, { scale: 1.05, duration: 0.2, ease: 'power2.out' })
      .call(() => onLaunch(project, rect));
  }, [project, onLaunch]);

  const tagClass = CATEGORY_COLORS[project.category] || 'text-white/50 border-white/20 bg-white/5';

  return (
    <div
      ref={cardRef}
      id={`project-card-${project.id}`}
      className="relative w-full max-w-lg mx-auto cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* HUD Corner decorations */}
      <div
        className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 rounded-tl-lg z-10"
        style={{ borderColor: project.accentColor }}
      />
      <div
        className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 rounded-tr-lg z-10"
        style={{ borderColor: project.accentColor }}
      />
      <div
        className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 rounded-bl-lg z-10"
        style={{ borderColor: project.accentColor }}
      />
      <div
        className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 rounded-br-lg z-10"
        style={{ borderColor: project.accentColor }}
      />

      {/* Project ID tag */}
      <div
        className="absolute -top-3 left-6 px-3 py-0.5 rounded font-mono text-xs font-bold z-10"
        style={{
          backgroundColor: project.accentColor,
          color: '#0B0B0F',
        }}
      >
        NODE_{String(project.id).padStart(2, '0')}
      </div>

      {/* Main card body */}
      <div
        ref={innerRef}
        className="glass-card rounded-2xl p-6 border"
        style={{ borderColor: `${project.accentColor}25` }}
      >
        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green animate-ping opacity-75" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-neon-green uppercase">
              [ LIVE DEPLOYMENT ACTIVE ]
            </span>
          </div>
          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded border ${tagClass}`}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-display text-2xl font-bold mb-2 leading-tight"
          style={{ color: project.accentColor }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-5 opacity-30"
          style={{
            background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)`,
          }}
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Launch Portal — primary CTA */}
          <button
            onClick={handleLaunch}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-sm font-bold tracking-wider transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}40)`,
              border: `1px solid ${project.accentColor}60`,
              color: project.accentColor,
              boxShadow: `0 0 20px ${project.accentColor}20`,
            }}
          >
            <Zap size={14} />
            LAUNCH PORTAL
          </button>

          {/* GitHub */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white/90 hover:bg-white/10 transition-all duration-200"
            title="View on GitHub"
          >
            <GitBranch size={16} />
          </a>

          {/* Live link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-neon-green hover:bg-neon-green/10 transition-all duration-200"
            title="Open Live Deployment"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
