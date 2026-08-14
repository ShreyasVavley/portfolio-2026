'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Type "help" for a list of available commands.']);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Ctrl + \ or Cmd + \
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output, isOpen]);

  const handleCommand = (cmd: string) => {
    const normalizedCmd = cmd.trim().toLowerCase();
    setOutput((prev) => [...prev, `> ${cmd}`]);
    
    if (normalizedCmd === '') return;

    switch (normalizedCmd) {
      case 'help':
        setOutput((prev) => [...prev, 'Available commands:', ' - about', ' - skills', ' - clear', ' - exit']);
        break;
      case 'about':
        setOutput((prev) => [...prev, 'Shreyas is a Software Engineer specializing in scalable web infrastructure and AI integration.']);
        break;
      case 'skills':
        setOutput((prev) => [...prev, 'TypeScript | Next.js | TailwindCSS | Node.js | Three.js | Python']);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        setOutput((prev) => [...prev, `Command not found: ${cmd}. Type "help" for options.`]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-3xl h-[60vh] bg-[#09090b] border border-white/20 rounded-xl shadow-2xl flex flex-col overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111827]">
              <div className="flex items-center gap-2 text-zinc-400">
                <TerminalIcon size={16} />
                <span className="text-xs font-bold tracking-wider">shreyas@dev: ~</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 text-sm text-green-400">
              {output.map((line, i) => (
                <div key={i} className={`mb-1 ${line.startsWith('>') ? 'text-white' : ''}`}>{line}</div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Terminal Input */}
            <form onSubmit={onSubmit} className="flex items-center px-4 py-3 border-t border-white/10 bg-[#111827]">
              <span className="text-green-500 mr-2">$</span>
              <input
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                placeholder="Type a command..."
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
