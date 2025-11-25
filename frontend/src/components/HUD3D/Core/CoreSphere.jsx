import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CoreSphere() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      // lassú pulzálás
      const scale = 1 + Math.sin(t * 2.5) * 0.08;
      ref.current.scale.set(scale, scale, scale);

      // hologram vibráció
      ref.current.material.emissiveIntensity =
        1.6 + Math.sin(t * 5) * 0.6;

      // kis elfordulás
      ref.current.rotation.y += 0.006;
    }
  });

  return (
    <mesh ref={ref} position={[0, 1.2, 0]}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <meshStandardMaterial
        color={"#00ccff"}
        emissive={"#00eaff"}
        emissiveIntensity={1.8}
        metalness={0.85}
        roughness={0.25}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
