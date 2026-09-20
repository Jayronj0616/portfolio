"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

const DistortedBlob = ({ mouse }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;

    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.4;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.03;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.03;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]} position={[0.6, 0, 0]}>
      <MeshDistortMaterial
        color="#6d5ef0"
        attach="material"
        distort={0.45}
        speed={1.5}
        roughness={0.1}
        metalness={0.3}
        opacity={0.28}
        transparent
      />
    </Sphere>
  );
};

// Everything that pulls in three.js lives in this file so the parent can
// load it on demand. Nothing here decides *whether* the blob runs --
// Scene3D owns that, and only mounts this once the answer is yes.
export default function Scene3DCanvas({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#a78bfa" />
      <DistortedBlob mouse={mouse} />
    </Canvas>
  );
}
