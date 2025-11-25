// Hová kerül: frontend/src/hooks/useParallax.js

import { useEffect, useState } from "react";

/*
  useParallax
  - egyszerű háttér parallax hook
  - visszaad egy offset értéket, amit a komponens használhat
*/

export default function useParallax(speed = 0.2) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const newOffset = window.scrollY * speed;
      setOffsetY(newOffset);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offsetY;
}