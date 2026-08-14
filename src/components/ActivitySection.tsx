'use client';

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Activity } from 'lucide-react';

export default function ActivitySection() {
  const explicitTheme = {
    light: ['#f4f4f5', '#fca5a5', '#f87171', '#ef4444', '#b91c1c'],
    dark: ['#18181b', '#fca5a5', '#f87171', '#ef4444', '#b91c1c'],
  };

  return (
    <section className="py-24 bg-white border-t border-zinc-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white mb-6 shadow-sm">
            <Activity size={16} className="text-[#ef4444]" />
            <span className="text-sm font-medium text-zinc-600">Live Activity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            GitHub Contributions
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto font-medium">
            A real-time look at my open-source coding consistency over the past year.
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-3xl shadow-sm w-full overflow-hidden flex justify-center overflow-x-auto custom-scrollbar">
          <div className="min-w-max">
            <GitHubCalendar 
              username="ShreyasVavley" 
              blockSize={14}
              blockMargin={6}
              fontSize={14}
              theme={explicitTheme}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
