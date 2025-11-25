import React, { useEffect, useState } from "react";
import { fetchLiveTips } from "../../../services/api.js";
import "./LivePanel.css";

export default function LivePanel() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchLiveTips();
        setTips(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni a LIVE tippeket");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="holo-panel">
      <h2 className="holo-title">🔥 Élő tippek</h2>

      {loading && <div className="holo-loading">Betöltés...</div>}
      {error && <div className="holo-error">{error}</div>}

      <div className="holo-list">
        {tips.map((t, i) => (
          <div key={i} className="holo-item">
            <div className="holo-match">{t.match}</div>
            <div className="holo-odds">Odds: {t.odds}</div>
            <div className="holo-status">{t.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
