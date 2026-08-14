'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Code, ExternalLink } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide glass-card rounded-3xl bg-[#09090b]/80 border border-white/10 shadow-2xl z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-8"
            style={{ color: project.accentColor || '#00FFFF' }}
          >
            <span className="text-2xl font-bold font-mono">{project.title.charAt(0)}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {project.title}
          </h2>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm font-medium mb-8">
            {project.category}
          </div>
          
          <p className="text-lg text-zinc-300 leading-relaxed mb-10 font-light">
            {project.longDesc}
          </p>

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-4 py-2 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-xl">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
            {project.links.github && project.links.github !== "#" && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
              >
                <Code size={18} /> View Source
              </a>
            )}
            {project.links.live && project.links.live !== "#" && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium border border-white/10 hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
