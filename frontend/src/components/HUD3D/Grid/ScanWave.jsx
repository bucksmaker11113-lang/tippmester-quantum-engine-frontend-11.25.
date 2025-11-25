import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ScanWave() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    ref.current.position.y = Math.sin(t * 1.2) * 0.25;
    ref.current.material.opacity = 0.18 + Math.sin(t * 2) * 0.08;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.3, 3.6, 48]} />
      <meshBasicMaterial
        color="#00eaff"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}
