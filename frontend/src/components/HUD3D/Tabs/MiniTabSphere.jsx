import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

export default function MiniTabSphere({
  color = "#00eaff",
  active = false,
  onClick,
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();

    // rotation
    ref.current.rotation.y += 0.03;

    // levitating motion
    ref.current.position.y = Math.sin(t * 3) * 0.08;

    // hover pulse
    const hoverScale = hovered ? 1.16 : 1.0;

    // active pulse
    const activePulse = active ? 1 + Math.sin(t * 5) * 0.13 : 1;

    ref.current.scale.set(
      hoverScale * activePulse,
      hoverScale * activePulse,
      hoverScale * activePulse
    );
  });

  return (
    <mesh
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <sphereGeometry args={[0.33, 48, 48]} />

      <MeshWobbleMaterial
        color={color}
        factor={0.45}
        speed={2.5}
        emissive={color}
        emissiveIntensity={active ? 2.2 : hovered ? 1.6 : 1.1}
        roughness={0.1}
        metalness={0.95}
      />
    </mesh>
  );
}
