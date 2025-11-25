import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

// 3D SCENE COMPONENTS
import Cameras from "./Cameras.jsx";
import Lights from "./Lights.jsx";
import BloomEffect from "../Effects/BloomEffect.jsx";

import CoreSphere from "../Core/CoreSphere.jsx";
import HoloRings from "../Core/HoloRings.jsx";
import HoloGrid from "../Grid/HoloGrid.jsx";
import ScanWave from "../Grid/ScanWave.jsx";
import FloorGlow from "../Grid/FloorGlow.jsx";

// 3D TABBAR
import TabBar3D from "../Tabs/TabBar3D.jsx";

// 2D PANELS
import TipPanel from "../../panels/TipPanel.jsx";
import LivePanel from "../../panels/LivePanel.jsx";
import KombiPanel from "../../panels/KombiPanel.jsx";
import ChatPanelV2 from "../../chat/ChatPanelV2.jsx";

// HOLOGRAM ANIMÁCIÓK
import "../../../styles/global_holo_animations.css";

export default function MainHUD() {
  const [activePanel, setActivePanel] = useState(null);
  const [panelKey, setPanelKey] = useState(0); // animáció újraindul

  const openPanel = (panelName) => {
    setActivePanel(panelName);
    setPanelKey(prev => prev + 1); // kényszerű újramount → új animáció
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#020B18" }}>

      {/* 3D TABBAR */}
      <TabBar3D onSelect={openPanel} />

      {/* PANEL OVERLAY (animált konténer) */}
      <div className="holo-overlay-container" key={panelKey}>
        {activePanel === "single" && <TipPanel />}
        {activePanel === "live" && <LivePanel />}
        {activePanel === "kombi" && <KombiPanel />}
        {activePanel === "chat" && <ChatPanelV2 />}
      </div>

      {/* 3D WORLD */}
      <Canvas
        camera={{ position: [0, 2.8, 6], fov: 52 }}
        gl={{ antialias: false }}      // teljesítmény optimalizálás
        dpr={[1, 1.5]}                 // mobil optimalizálás
      >
        <Suspense fallback={null}>
          <Cameras />
          <Lights />
          <BloomEffect />

          {/* HOLOGRAFIKUS 3D KÖZPONT */}
          <CoreSphere />
          <HoloRings />

          {/* GRIDEK + EFFEKT */}
          <HoloGrid />
          <ScanWave />
          <FloorGlow />
        </Suspense>
      </Canvas>
    </div>
  );
}
