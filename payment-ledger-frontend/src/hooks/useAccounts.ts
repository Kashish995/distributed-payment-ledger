import { useEffect, useState } from "react";

import { getAccounts } from "../api/accountApi";

import type { Account } from "../types/account";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccounts() {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        console.error(err);

        setError("Failed to load accounts.");
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
  };
}
