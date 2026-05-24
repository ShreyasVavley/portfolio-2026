'use client';

import { useEffect, useRef } from 'react';

export interface MousePosition {
  x: number; // -1 to 1 normalized
  y: number; // -1 to 1 normalized
}

/**
 * Tracks mouse position with smooth inertia easing.
 * Returns a ref that always contains the latest smoothed position.
 */
export function useMouseParallax(lerpFactor: number = 0.05) {
  const position = useRef<MousePosition>({ x: 0, y: 0 });
  const target = useRef<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };

    const tick = () => {
      position.current.x += (target.current.x - position.current.x) * lerpFactor;
      position.current.y += (target.current.y - position.current.y) * lerpFactor;
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [lerpFactor]);

  return position;
}
