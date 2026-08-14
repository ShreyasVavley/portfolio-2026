'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, GitBranch, Code, ExternalLink, Star } from 'lucide-react';

const logs = [
  { id: "e8a2b1c", message: "Refactored core authentication microservice for 2x faster token validation.", time: "2 hours ago" },
  { id: "f49c00a", message: "Deployed v2.0.4 to production cluster. Zero downtime.", time: "5 hours ago" },
  { id: "1a7b9ef", message: "Merged PR #142: Fix memory leak in WebSocket connection pool.", time: "1 day ago" },
  { id: "9c3d4f1", message: "Added redis caching layer to the AI inference pipeline.", time: "2 days ago" },
  { id: "2b8a7c6", message: "Initial commit for the new Rust-based analytics engine.", time: "4 days ago" },
];

const repos = [
  { name: "shreyas-ui-kit", desc: "A headless, accessible UI component library built for scale.", stars: 124, language: "TypeScript" },
  { name: "rust-cli-tools", desc: "Blazing fast CLI utilities for managing cloud infrastructure.", stars: 89, language: "Rust" },
  { name: "go-micro-auth", desc: "Lightweight JWT authentication service written in Go.", stars: 210, language: "Go" },
];

export default function SystemLogs() {
  return (
    <section className="py-24 relative z-10 bg-white border-t border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: System Logs */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Terminal size={24} className="text-[#111827]" />
              <h2 className="text-3xl font-black text-[#111827] tracking-tight">System Logs</h2>
            </div>
            
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-6 md:p-8 shadow-sm">
              <div className="flex flex-col gap-6">
                {logs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 rounded-full bg-[#ef4444] border-2 border-white shadow-sm z-10"></div>
                      {idx !== logs.length - 1 && (
                        <div className="w-[1px] h-full bg-zinc-200 my-1 group-hover:bg-[#ef4444]/30 transition-colors"></div>
                      )}
                    </div>
                    
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-zinc-400 bg-white border border-zinc-200 px-2 py-0.5 rounded-md">
                          {log.id}
                        </span>
                        <span className="text-xs font-medium text-zinc-400">{log.time}</span>
                      </div>
                      <p className="text-sm font-medium text-[#111827] leading-relaxed">
                        {log.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Other Repositories */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GitBranch size={24} className="text-[#111827]" />
              <h2 className="text-3xl font-black text-[#111827] tracking-tight">Other Repositories</h2>
            </div>

            <div className="flex flex-col gap-4">
              {repos.map((repo, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-zinc-200 rounded-[1.5rem] p-6 hover:border-zinc-300 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#111827] mb-1 group-hover:text-[#ef4444] transition-colors flex items-center gap-2">
                      <Code size={16} className="text-zinc-400" />
                      {repo.name}
                    </h3>
                    <p className="text-sm text-zinc-500 font-medium">
                      {repo.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200">
                      <Star size={12} className="text-[#ef4444]" fill="currentColor" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                      <span className={`w-2 h-2 rounded-full ${repo.language === 'TypeScript' ? 'bg-blue-500' : repo.language === 'Rust' ? 'bg-orange-500' : 'bg-cyan-500'}`}></span>
                      {repo.language}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <a href="https://github.com/ShreyasVavley" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#ef4444] hover:text-[#dc2626] transition-colors mt-6 ml-2">
              Explore more on GitHub <ExternalLink size={14} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
