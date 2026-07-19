import { useEffect, useState } from "react";

import { getHealth } from "../api/healthApi";

import type { HealthResponse } from "../types/health";

export function useHealth() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await getHealth();
        setHealth(data);
      } finally {
        setLoading(false);
      }
    }

    loadHealth();
  }, []);

  return {
    health,
    loading,
  };
}