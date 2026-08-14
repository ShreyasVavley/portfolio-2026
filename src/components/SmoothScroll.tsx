'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.15, smoothWheel: true, wheelMultiplier: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
