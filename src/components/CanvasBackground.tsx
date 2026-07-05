"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import PetalStorm from "./PetalStorm";
import BlossomTree from "./BlossomTree";

export default function CanvasBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-40 opacity-90">
      {/* Moved camera back slightly to see more of the storm, no shadows needed to save performance */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <PetalStorm count={15} />
          {/* Positioned on the right side of the screen, shifted down slightly */}
          <BlossomTree position={[6, -4, -5]} scale={0.5} />
          
          {/* Subtle lighting for the petals so they maintain original texture color but still catch light */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        </Suspense>
      </Canvas>
    </div>
  );
}
