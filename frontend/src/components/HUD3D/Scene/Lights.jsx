import React from "react";

export default function Lights() {
  return (
    <>
      {/* Főfény – optimalizált */}
      <ambientLight intensity={0.55} />

      {/* Direkt fény, kevesebb számítással */}
      <directionalLight
        intensity={0.7}
        position={[3, 5, 2]}
        castShadow={false}
      />

      {/* Holo glow */}
      <pointLight
        intensity={1.3}
        distance={6}
        position={[0, 1.5, 2]}
      />
    </>
  );
}
