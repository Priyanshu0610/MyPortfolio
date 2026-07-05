"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

export default function PetalStorm({ count = 15 }: { count?: number }) {
  // Load the lightweight petal model
  const { nodes, materials } = useGLTF("/models/SakuraHanaBira/SakuraHanaBira.glb");
  
  // Find the actual mesh inside the GLTF
  const petalMesh = useMemo(() => {
    let mesh = null;
    Object.values(nodes).forEach((node) => {
      if ((node as THREE.Mesh).isMesh) {
        mesh = node as THREE.Mesh;
      }
    });
    return mesh as THREE.Mesh | null;
  }, [nodes]);

  // Generate random initial positions, rotations, and individual speeds for each petal
  const petalsData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 15, // Spread X (Width)
        Math.random() * 15,         // Spread Y (Height) - Start them high up
        (Math.random() - 0.5) * 8  // Spread Z (Depth)
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
      // Individual animation speeds for organic feel
      fallSpeed: 0.5 + Math.random() * 1.5,     // Gentle vertical drift
      spinSpeed: 0.2 + Math.random() * 0.5,     // Gentle spin
      driftSpeed: Math.random() * 0.5           // Gentle horizontal drift
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);
  const instancesRef = useRef<any[]>([]);

  useFrame((state, delta) => {
    // We update each instance's position manually in useFrame for a highly performant simulation
    instancesRef.current.forEach((instance, i) => {
      if (!instance) return;
      const data = petalsData[i];

      // Update position (Falling down, drifting slightly)
      instance.position.y -= data.fallSpeed * delta;
      instance.position.x += Math.sin(state.clock.elapsedTime * data.driftSpeed + i) * delta * 2;
      
      // Update rotation (Tumbling)
      instance.rotation.x += data.spinSpeed * delta;
      instance.rotation.y += data.spinSpeed * delta * 1.5;

      // Loop them back to the top when they fall past the camera
      if (instance.position.y < -10) {
        instance.position.y = 15;
        instance.position.x = (Math.random() - 0.5) * 20;
      }
    });
  });

  const pinkMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffc2e0", // Perfect middle-ground sakura pink
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  if (!petalMesh) return null;

  return (
    <group ref={groupRef}>
      {/* 
        Instanced Rendering: Renders 'count' number of geometries in a single draw call.
        This is why we can render hundreds of 3D objects with 0 lag. 
      */}
      <Instances 
        range={count} 
        material={pinkMaterial} 
        geometry={petalMesh.geometry}
        castShadow
        receiveShadow
      >
        {petalsData.map((data, i) => (
          <Instance
            key={i}
            ref={(ref) => { instancesRef.current[i] = ref; }}
            position={data.position}
            rotation={data.rotation}
            scale={data.scale}
          />
        ))}
      </Instances>
    </group>
  );
}

// Preload the petal to avoid rendering pop-in
useGLTF.preload("/models/SakuraHanaBira/SakuraHanaBira.glb");
