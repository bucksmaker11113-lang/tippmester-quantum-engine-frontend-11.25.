import React, { useEffect, useState } from "react";
import { fetchTips } from "../../../services/api.js";
import "./TipPanel.css";

export default function TipPanel() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchTips();
        setTips(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni a tippeket");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="holo-panel">
      <h2 className="holo-title">🎯 Napi Tippek</h2>

      {loading && <div className="holo-loading">Betöltés...</div>}
      {error && <div className="holo-error">{error}</div>}

      <div className="holo-list">
        {tips.length === 0 && !loading && <p>Nincs elérhető tipp.</p>}

        {tips.map((t, i) => (
          <div key={i} className="holo-item">
            <div className="holo-match">{t.match}</div>
            <div className="holo-odds">Odds: {t.odds}</div>
            <div className="holo-pred">Tipp: {t.prediction}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
