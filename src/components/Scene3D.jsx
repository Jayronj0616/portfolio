"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
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
        color="#3b82f6"
        attach="material"
        distort={0.45}
        speed={1.5}
        roughness={0.15}
        metalness={0.4}
        opacity={0.35}
        transparent
      />
    </Sphere>
  );
};

// No external event changes whether the blob is enabled after mount,
// so the store never notifies -- it just exposes a stable client-only
// snapshot via useSyncExternalStore (SSR-safe: server snapshot is
// always `false`, avoiding a hydration mismatch).
function subscribe() {
  return () => {};
}
function getSnapshot() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return !prefersReducedMotion && window.innerWidth >= 768;
}
function getServerSnapshot() {
  return false;
}

export default function Scene3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#60a5fa" />
        <DistortedBlob mouse={mouse} />
      </Canvas>
    </div>
  );
}
