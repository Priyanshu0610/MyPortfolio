"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef } from "react";
import * as THREE from "three";

function ParticleSwarm(props: any) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate a random sphere of particles (Array length MUST be divisible by 3 for x,y,z)
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 1.5 }) as Float32Array);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3fa0ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
