// FloorGlow.jsx (Optimized for Mobile + Cost-Efficient Glow)
// - Very light shader
// - Adaptive intensity based on mobile flag
// - No expensive per-frame computations

import { useMemo } from "react";
import * as THREE from "three";

export default function FloorGlow({ mobile = false }) {
  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 10), []);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00eaff",
        transparent: true,
        opacity: mobile ? 0.08 : 0.15,
        side: THREE.DoubleSide,
      }),
    [mobile]
  );

  return (
    <mesh rotation-x={-Math.PI / 2} geometry={geometry} material={material} />
  );
}