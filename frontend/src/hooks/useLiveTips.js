// Hová kerül: frontend/src/hooks/useLiveTips.js

import { useEffect, useState } from "react";
import { ws } from "../services/ws.js";
import { fetchLiveTips } from "../services/api.js";

/*
  useLiveTips
  - visszaadja az aktuális LIVE tippeket
  - WebSocket frissítéseket is kezel
*/

export default function useLiveTips() {
  const [liveTips, setLiveTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Alap live tippek lekérése
  useEffect(() => {
    async function load() {
      try {
        const res = await fetchLiveTips();
        setLiveTips(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni az élő tippeket");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // WebSocket frissítések kezelése
  useEffect(() => {
    const unsubscribe = ws.subscribe((msg) => {
      if (msg.type === "live_update") {
        setLiveTips((prev) => {
          const updated = [...prev];

          // Meglévő elem frissítése
          const index = updated.findIndex((x) => x.id === msg.data.id);
          if (index !== -1) {
            updated[index] = { ...updated[index], ...msg.data };
          } else {
            // Új elem hozzáadása
            updated.push(msg.data);
          }

          return updated;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return { liveTips, loading, erro