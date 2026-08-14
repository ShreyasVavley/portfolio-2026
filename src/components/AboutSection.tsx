'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative z-10 bg-white overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white shadow-sm mb-8"
            >
              <span className="text-sm font-bold text-zinc-600 tracking-wide uppercase">About Me</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-black text-[#111827] mb-8 leading-[1.1] tracking-tight"
            >
              I am <span className="text-[#ef4444]">Shreyas</span>, <br/>
              a developer obsessed with performance.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium mb-10 max-w-2xl"
            >
              I am passionate about transforming complex problems into elegant, scalable digital solutions. 
              My journey spans from crafting beautiful front-end interfaces to building robust back-end systems. 
              I believe great software is built at the intersection of stunning design and bulletproof engineering, and I'm constantly learning and pushing the boundaries of what I can build.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            >
              <div className="flex gap-8">
                <div>
                  <h4 className="text-4xl font-black text-[#111827] mb-1">100%</h4>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Dedication</p>
                </div>
                <div className="w-[1px] bg-zinc-200"></div>
                <div>
                  <h4 className="text-4xl font-black text-[#111827] mb-1">15+</h4>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Projects</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image/Visual */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="relative w-full max-w-[450px] aspect-square rounded-[3rem] bg-[#111827] overflow-hidden shadow-2xl flex items-center justify-center p-8 group"
            >
              {/* Animated abstract shapes behind */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#ef4444_360deg)] opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-2 bg-[#09090b] rounded-[2.5rem] z-10 flex flex-col items-center justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-32 h-32 rounded-full border-4 border-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.4)] bg-[url('/logo.jpg')] bg-cover bg-center mb-6"
                />
                <h3 className="text-white font-black tracking-widest text-2xl uppercase">Creative</h3>
                <h3 className="text-white/50 font-black tracking-widest text-2xl uppercase">Developer</h3>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
