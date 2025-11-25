import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ActiveGlow({ color = "#00eaff" }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    const pulse = 1 + Math.sin(t * 4) * 0.15;

    ref.current.scale.set(pulse, pulse, pulse);
    ref.current.material.opacity = 0.35 + Math.sin(t * 4) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.45, 0.53, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.35}
        side={2}
      />
    </mesh>
  );
}
