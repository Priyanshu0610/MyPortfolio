"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

export default function BlossomTree(props: any) {
  // Load the massive 54MB model
  const { scene } = useGLTF("/models/emissive_energy_cherry_blossom_tree.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Optional: Very subtle rotation to make it feel alive
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} {...props}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

// Preload is intentionally omitted to prevent Next.js from trying to 
// fetch 54MB during initial page load blocking. It will load when rendered inside Suspense.
