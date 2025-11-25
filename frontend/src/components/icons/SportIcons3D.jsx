// SportIcons3D.jsx (Premium Multi-Sport Holographic Icon Set)
// - Replaces old/gagyi icons with clean neon-glow holographic symbols
// - Ultra lightweight meshes for mobile
// - Unified style across all sports
// - Cost-efficient rendering

import { useMemo } from "react";
import * as THREE from "three";

export default function SportIcons3D({ type = "football", mobile = false }) {
  // ICON STYLE SETTINGS
  const color = "#00eaff";
  const emissive = "#005577";

  // Minimalistic glowing shape per sport
  const geometry = useMemo(() => {
    switch (type) {
      case "football":
        return new THREE.IcosahedronGeometry(1, mobile ? 0 : 1);

      case "tennis":
        return new THREE.CircleGeometry(1, mobile ? 16 : 32);

      case "basketball":
        return new THREE.SphereGeometry(1, mobile ? 8 : 16);

      case "hockey":
        return new THREE.CylinderGeometry(0.7, 0.7, 0.3, mobile ? 8 : 16);

      case "esport":
        return new THREE.OctahedronGeometry(1, mobile ? 0 : 1);

      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [type, mobile]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: mobile ? 0.3 : 0.7,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
    });
  }, [mobile]);

  return <mesh geometry={geometry} material={material} />;
}