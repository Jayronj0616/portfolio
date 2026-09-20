"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// three.js, @react-three/fiber and drei are ~860KB of client JavaScript
// -- more than half the bundle -- for a decorative background. The
// runtime gate below already refuses to render the blob on mobile or
// under reduced motion, but a static import ships the library to those
// visitors anyway. Loading it here means the chunk is fetched only once
// we know it is going to be used.
const Scene3DCanvas = dynamic(() => import("@/components/Scene3DCanvas"), {
  ssr: false,
});

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
      <Scene3DCanvas mouse={mouse} />
    </div>
  );
}
