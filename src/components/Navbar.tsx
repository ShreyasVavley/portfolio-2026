'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-6 bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]' : 'py-10 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <span className={`text-4xl md:text-5xl font-black tracking-tighter ${isScrolled ? 'text-black' : 'text-white'} transition-colors`}>
            Shreyas
          </span>
          <span className="text-[#ef4444] text-5xl leading-[0] group-hover:animate-bounce">.</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-zinc-600 hover:text-black' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <a 
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-[#111827] text-white text-sm font-bold hover:bg-[#1f2937] transition-all shadow-md active:scale-95"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-zinc-100 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold text-zinc-800 hover:text-[#ef4444]"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-6 py-3 rounded-full bg-[#111827] text-white text-center font-bold"
          >
            Hire Me
          </a>
        </div>
      )}
    </motion.nav>
  );
}
