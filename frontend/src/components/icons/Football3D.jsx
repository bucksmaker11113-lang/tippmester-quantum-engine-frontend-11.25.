// Football3D.jsx (Premium Hologram Version)
// Modern, non-gagyi, neon-glow holographic football icon
// Lightweight, mobile-friendly, cost-efficient

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Football3D({ mobile = false }) {
  const meshRef = useRef();

  // Geometry: elegant truncated icosahedron (football-like), not a 90's mesh
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, mobile ? 0 : 1), [mobile]);

  // Premium holographic shader
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#00eaff",
      emissive: "#006688",
      emissiveIntensity: mobile ? 0.3 : 0.7,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    }),
    [mobile]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * (mobile ? 0.2 : 0.35);
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
