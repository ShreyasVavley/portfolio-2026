'use client';

import React, { useState } from 'react';
import { Send, Users, Code, Phone, Mail } from 'lucide-react';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "4adf89fa-46d1-4be1-834b-3f2232775e3a",
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 bg-[#09090b] overflow-hidden">
      
      {/* Massive Background Text */}
      <div className="absolute top-0 bottom-0 left-0 flex items-center pointer-events-none opacity-[0.03]">
        <h2 className="text-[30vw] font-black leading-[0.8] tracking-tighter text-white select-none whitespace-nowrap">
          CONTACT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Side Info */}
          <div className="flex-1 w-full text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              Let's create <br/> something <br/> amazing.
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed mb-12">
              Available for freelance opportunities, full-time roles, and creative collaborations worldwide.
            </p>

            <div className="flex justify-center lg:justify-start gap-6">
              {[
                { icon: <Mail size={24} />, href: "mailto:shreyasvavley@gmail.com", label: "Email" },
                { icon: <Phone size={24} />, href: "https://wa.me/919886620362", label: "WhatsApp" },
                { icon: <Code size={24} />, href: "https://github.com/ShreyasVavley", label: "GitHub" },
                { icon: <Users size={24} />, href: "#", label: "LinkedIn" }
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Form - Red Industrial Box */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-[#ef4444] rounded-[2rem] p-10 md:p-12 shadow-[0_30px_60px_rgba(239,68,68,0.3)] relative">
              
              {/* Top accent screw/pin */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-white uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    suppressHydrationWarning
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-white/30 px-0 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white text-lg transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-white uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    suppressHydrationWarning
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-white/30 px-0 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white text-lg transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-white uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message"
                    required
                    suppressHydrationWarning
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-white/30 px-0 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white text-lg transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white text-sm font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : submitStatus === 'success' ? (
                    <span className="text-green-600 flex items-center gap-2">Sent Successfully!</span>
                  ) : submitStatus === 'error' ? (
                    <span className="text-red-500 flex items-center gap-2">Error. Try Again.</span>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
