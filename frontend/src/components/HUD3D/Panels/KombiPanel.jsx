import React, { useEffect, useState } from "react";
import { fetchKombi } from "../../../services/api.js";
import "./KombiPanel.css";

export default function KombiPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchKombi();
        setItems(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni a Kombi adatokat");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="holo-panel">
      <h2 className="holo-title">🔗 Kombi Szelvény</h2>

      {loading && <div className="holo-loading">Betöltés...</div>}
      {error && <div className="holo-error">{error}</div>}

      <div className="holo-list">
        {items.map((t, i) => (
          <div key={i} className="holo-item">
            <div className="holo-match">{t.match}</div>
            <div className="holo-odds">Odds: {t.odds}</div>
            <div className="holo-stake">Tét: {t.stake}</div>
            <div className="holo-return">Várható: {t.expected_return}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
