// EnergyPulse.jsx (Optimized for Mobile + Low GPU Usage)
// - Adaptive pulse strength
// - Memoized geometry/material for performance
// - Reduced useFrame complexity

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function EnergyPulse({ mobile = false }) {
  const pulseRef = useRef();

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00f6ff",
        transparent: true,
        opacity: mobile ? 0.25 : 0.4,
      }),
    [mobile]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Soft pulsing scale effect
    const pulse = 1 + Math.sin(t * (mobile ? 2 : 3)) * (mobile ? 0.05 : 0.15);
    pulseRef.current.scale.set(pulse, pulse, pulse);
  });

  return <mesh ref={pulseRef} geometry={geometry} material={material} />;
}