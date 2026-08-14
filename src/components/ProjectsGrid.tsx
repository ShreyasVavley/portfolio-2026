'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import ProjectModal from './ProjectModal';

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))].slice(0, 5); // Keep it to top 5 categories for UI

  const filteredProjects = filter === 'All' 
    ? projects.slice(0, 6) // Highlight top 6 by default
    : projects.filter(p => p.category === filter).slice(0, 6);

  return (
    <>
      <section id="projects" className="py-32 relative z-10 bg-white overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white mb-6">
                <span className="text-sm font-medium text-zinc-600">Featured Work</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-[#111827] mb-4 tracking-tight">
                Projects That Define <br/> My Journey
              </h2>
              {/* Hand-drawn underline SVG */}
              <svg className="w-64 h-3 text-[#ef4444] mb-6" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6.5C50 2.5 120 1 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>

              <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed font-medium">
                A curated portfolio of production-grade platforms, full-stack microservices, and AI models built for scale and speed.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    filter === cat 
                      ? 'bg-[#111827] text-white border-[#111827]' 
                      : 'bg-white text-zinc-500 hover:bg-zinc-50 border-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layoutId={`project-card-${project.id}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                  onClick={() => setSelectedProject(project)}
                  className="relative bg-zinc-50 rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all flex flex-col h-full"
                >
                  {/* Tablet Top Header (Camera Cutout) */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-zinc-50 border-b border-zinc-200 flex items-center justify-center z-10 rounded-t-[2rem]">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 border border-zinc-400/50"></div>
                  </div>

                  <div className="pt-20 px-8 pb-8 flex flex-col h-full relative z-0">
                    <motion.div layoutId={`project-icon-${project.id}`} className="text-xs font-black text-[#ef4444] tracking-widest uppercase mb-4">
                      {project.category.replace(' ', ' • ')}
                    </motion.div>
                    
                    <motion.h3 layoutId={`project-title-${project.id}`} className="text-2xl font-black text-[#111827] mb-4">
                      {project.title}
                    </motion.h3>
                    
                    <motion.p layoutId={`project-desc-${project.id}`} className="text-zinc-500 font-medium text-sm leading-relaxed mb-10 flex-grow line-clamp-4">
                      {project.description}
                    </motion.p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto mb-6">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="text-xs font-bold text-zinc-700 bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-xs font-bold text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-sm font-black text-[#111827]">
                      Source Code <ExternalLink size={14} className="ml-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <div className="mt-20 text-center border-t border-zinc-200 pt-10">
             <a href="https://github.com/ShreyasVavley" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#111827] font-bold transition-colors text-lg">
                View full archive on GitHub <ExternalLink size={18} />
             </a>
          </div>
        </div>
      </section>

      {/* Project Modal Rendering */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
