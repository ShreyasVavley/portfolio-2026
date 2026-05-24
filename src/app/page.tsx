'use client';

import dynamic from 'next/dynamic';
import React, { useState, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

// Dynamically import heavy components — avoids SSR issues with WebGL
const SpaceBackground = dynamic(() => import('@/components/SpaceBackground'), {
  ssr: false,
  loading: () => null,
});

const ScrollTimeline = dynamic(() => import('@/components/ScrollTimeline'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-obsidian">
      {/* Loading screen — always rendered, self-removes via GSAP */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* 3D space background — fixed, behind everything */}
      <SpaceBackground />

      {/* Main content — only shown after load */}
      {loaded && (
        <div className="relative z-10">
          <ScrollTimeline />
        </div>
      )}
    </main>
  );
}
