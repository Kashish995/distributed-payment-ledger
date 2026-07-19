import { useEffect, useState } from "react";

import { getPayments } from "../api/paymentApi";

import type { Payment } from "../types/payment";

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (err) {
        console.error(err);

        setError("Failed to load payments.");
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  return {
    payments,
    loading,
    error,
  };
}
