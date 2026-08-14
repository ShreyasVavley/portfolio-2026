'use client';

import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Frontend Development",
    description: "Crafting responsive and interactive user interfaces using React, JavaScript, Tailwind CSS, and modern frontend technologies to deliver seamless user experiences.",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    category: "Backend Development",
    description: "Building secure REST APIs, authentication systems, server-side applications, and database integrations with scalable architectures.",
    items: ["Node.js", "FastAPI", "Django", "Flask", "PostgreSQL", "MongoDB"]
  },
  {
    category: "AI & Machine Learning",
    description: "Developing intelligent applications using NLP, Generative AI, Computer Vision, LLMs, and data-driven machine learning solutions.",
    items: ["TensorFlow", "OpenCV", "Pandas", "NLP", "Deep Learning"]
  },
  {
    category: "Cloud & Deployment",
    description: "Deploying and managing applications using Docker, GitHub Actions, CI/CD pipelines, cloud platforms, and performance optimization practices.",
    items: ["Git", "Docker", "GitHub Actions", "AWS", "Vercel"]
  }
];

export default function SkillsSection() {
  return (
    <section id="expertise" className="py-32 relative z-10 overflow-hidden bg-white">
      {/* Background Grid - Light Mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          
          {/* Left Column: Heading */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white shadow-sm mb-6"
            >
              <span className="text-sm font-medium text-zinc-600">My Expertise</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black tracking-tighter text-[#111827] mb-6 leading-[1.1]"
            >
              Building <br className="hidden lg:block"/>
              Modern Digital <br className="hidden lg:block"/>
              Solutions with <br className="hidden lg:block"/>
              Code & AI
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-500 max-w-md leading-relaxed"
            >
              Combining full-stack development, artificial intelligence, and cloud technologies to create scalable and impactful digital experiences.
            </motion.p>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="lg:w-2/3 relative pt-12 lg:pt-0">
            
            {/* Animated Connecting Laser Line Background */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-full max-w-[800px] h-full pointer-events-none hidden md:block z-0 opacity-60">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 1300">
                <path 
                  d="M 100,100 C 100,400 400,200 400,500 C 400,800 100,600 100,900 C 100,1200 400,1000 400,1250" 
                  fill="none" 
                  stroke="#f1f5f9" 
                  strokeWidth="6" 
                />
                <motion.path 
                  initial={{ pathLength: 0, strokeDashoffset: 0 }}
                  whileInView={{ pathLength: 1 }}
                  animate={{ strokeDashoffset: [0, -24] }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    pathLength: { duration: 2.5, ease: "easeInOut" },
                    strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" }
                  }}
                  d="M 100,100 C 100,400 400,200 400,500 C 400,800 100,600 100,900 C 100,1200 400,1000 400,1250" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="6" 
                  strokeDasharray="12 12" 
                />
              </svg>
            </div>

            <div className="flex flex-col gap-24 relative z-10">
              {skills.map((skillGroup, idx) => {
                const isEven = idx % 2 === 0;
                
                return (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 50, rotateZ: isEven ? -10 : 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateZ: isEven ? -3 : 3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.05, rotateZ: 0, zIndex: 30 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className={`relative w-full md:w-[85%] lg:w-[400px] ${isEven ? 'md:self-start' : 'md:self-end'}`}
                  >
                    {/* Tablet Frame Aesthetic (Red Light Mode) */}
                    <div className="relative bg-[#ef4444] rounded-[2rem] p-8 border-t border-white/20 shadow-[0_20px_50px_rgba(239,68,68,0.4)] overflow-hidden group">
                      
                      {/* Top Camera cutout */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                      </div>
                      
                      <div className="relative z-10 pt-4">
                        <span className="text-4xl font-serif italic font-bold text-white/30 block mb-4">
                          0{idx + 1}
                        </span>
                        
                        <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                          {skillGroup.category}
                        </h3>
                        
                        <motion.p 
                          className="text-sm text-white/90 leading-relaxed mb-6 font-medium"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          variants={{
                            hidden: { opacity: 1 },
                            visible: {
                              opacity: 1,
                              transition: {
                                delay: 0.3,
                                staggerChildren: 0.015,
                              },
                            },
                          }}
                        >
                          {skillGroup.description.split("").map((char, charIdx) => (
                            <motion.span 
                              key={charIdx} 
                              variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                              }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Fun decorative text */}
            <motion.div 
              initial={{ opacity: 0, rotateZ: -10 }}
              whileInView={{ opacity: 1, rotateZ: -5 }}
              viewport={{ once: true }}
              className="absolute right-0 bottom-10 hidden lg:block"
            >
              <span className="text-3xl font-serif text-zinc-400 italic font-medium -rotate-12 block shadow-sm">
                Turning ideas into reality!
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
