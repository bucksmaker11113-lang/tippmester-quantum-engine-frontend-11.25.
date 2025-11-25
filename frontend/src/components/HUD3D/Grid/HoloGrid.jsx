import React from "react";

export default function HoloGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} frustumCulled={true}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial
        wireframe
        color="#0088aa"
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}
