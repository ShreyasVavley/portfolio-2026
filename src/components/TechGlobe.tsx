'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes',
  'Python', 'TensorFlow', 'Framer Motion', 'TailwindCSS', 'GraphQL',
  'C++', 'Rust', 'Go', 'GCP', 'Linux'
];

function Cloud({ radius = 2.5 }) {
  const group = useRef<THREE.Group>(null);
  
  // Distribute points on a sphere (Fibonacci sphere algorithm)
  const words = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skills[i]]);
    }
    return temp;
  }, [radius]);

  useFrame(() => {
    if (group.current) {
      // Subtle constant rotation
      group.current.rotation.y += 0.001;
      group.current.rotation.x += 0.0005;
      
      // Make text always face the camera
      group.current.children.forEach(child => {
        child.quaternion.copy(group.current!.parent!.quaternion).invert();
      });
    }
  });

  return (
    <group ref={group}>
      {words.map(([pos, word], index) => (
        <Text
          key={index}
          position={pos as THREE.Vector3}
          color={index % 3 === 0 ? "#ef4444" : "#ffffff"}
          fontSize={0.35}
          fontWeight={800}
          anchorX="center"
          anchorY="middle"
        >
          {word as string}
        </Text>
      ))}
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <fog attach="fog" args={['#09090b', 3, 10]} />
        <ambientLight intensity={1} />
        <Cloud />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
