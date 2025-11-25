import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoloRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // RING 1 – fő pulzáló gyűrű
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.4;
      ring1.current.material.opacity =
        0.45 + Math.sin(t * 3) * 0.25;
    }

    // RING 2 – kicsit gyorsabb, magasabb
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.6;
      const s = 1.2 + Math.sin(t * 2.2) * 0.05;
      ring2.current.scale.set(s, s, s);
      ring2.current.material.opacity =
        0.3 + Math.sin(t * 4) * 0.22;
    }

    // RING 3 – alacsony, lassú glow
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.2;
      ring3.current.material.opacity =
        0.2 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group position={[0, 1.2, 0]}>
      {/* RING 1 */}
      <mesh ref={ring1}>
        <ringGeometry args={[1.4, 1.55, 128]} />
        <meshBasicMaterial
          color={"#00eaff"}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* RING 2 */}
      <mesh ref={ring2}>
        <ringGeometry args={[1.65, 1.8, 128]} />
        <meshBasicMaterial
          color={"#66ffdd"}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* RING 3 */}
      <mesh ref={ring3}>
        <ringGeometry args={[1.95, 2.1, 128]} />
        <meshBasicMaterial
          color={"#00b5ff"}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
