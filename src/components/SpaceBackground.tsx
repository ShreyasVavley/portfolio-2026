'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouseParallax } from '@/hooks/useMouseParallax';

// ─── Starfield Particles ────────────────────────────────────────────────────
function StarField({ count = 8000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const mousePos = useMouseParallax(0.04);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 400;
      positions[i3 + 1] = (Math.random() - 0.5) * 400;
      positions[i3 + 2] = (Math.random() - 0.5) * 400;

      // Color: mostly white-blue, some cyan, some violet
      const rand = Math.random();
      if (rand < 0.65) {
        colors[i3] = 0.8 + Math.random() * 0.2;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 1.0;
      } else if (rand < 0.82) {
        colors[i3] = 0.0;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 0.6 + Math.random() * 0.2;
        colors[i3 + 1] = 0.0;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      }
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.01;
    points.current.rotation.x += delta * 0.004;

    // Smooth mouse parallax
    const targetRx = mousePos.current.y * 0.25;
    const targetRy = mousePos.current.x * 0.25;
    points.current.rotation.x += (targetRx - points.current.rotation.x) * 0.03;
    points.current.rotation.y += (targetRy - points.current.rotation.y) * 0.03;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial
        size={0.35}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Nebula Glow Orbs ────────────────────────────────────────────────────────
function NebulaOrb({
  position,
  color,
  radius,
}: {
  position: [number, number, number];
  color: string;
  radius: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const baseY = position[1];

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.25) * 2.5;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.022} depthWrite={false} />
    </mesh>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <StarField count={8000} />
      <NebulaOrb position={[-60, 20, -80]}  color="#00FFFF" radius={30} />
      <NebulaOrb position={[80, -30, -120]} color="#A855F7" radius={45} />
      <NebulaOrb position={[10, 60, -150]}  color="#10B981" radius={35} />
      <NebulaOrb position={[-40,-60, -60]}  color="#00FFFF" radius={20} />
    </>
  );
}

// ─── SpaceBackground (exported) ──────────────────────────────────────────────
export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#0B0B0F' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
