import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import MiniTabSphere from "./MiniTabSphere.jsx";
import ActiveGlow from "./ActiveGlow.jsx";
import "./tabbar3d.css";

export default function TabBar3D({ onSelect }) {
  const [active, setActive] = useState(null);

  const tabs = [
    { key: "single", label: "Tippek", color: "#42c5f5" },
    { key: "live", label: "Élő", color: "#55ff99" },
    { key: "kombi", label: "Kombi", color: "#ff7f50" },
    { key: "chat", label: "Chat", color: "#cc66ff" },
  ];

  const handleClick = (key) => {
    setActive(key);      // glow update
    onSelect(key);       // panelváltás
  };

  return (
    <div className="tabbar-3d-container">

      {/* 3D GÖMBÖK */}
      <Canvas
        className="tabbar-3d-canvas"
        camera={{ position: [0, 0, 4], fov: 55 }}
      >
        {tabs.map((t, i) => (
          <group key={t.key} position={[i * 1.7 - 2.5, 0, 0]}>
            {active === t.key && <ActiveGlow color={t.color} />}

            <MiniTabSphere
              color={t.color}
              active={active === t.key}
              onClick={() => handleClick(t.key)}
            />
          </group>
        ))}
      </Canvas>

      {/* FELIRATOK */}
      <div className="tabbar-3d-labels">
        {tabs.map((t) => (
          <span key={t.key} className="tab-label">
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
