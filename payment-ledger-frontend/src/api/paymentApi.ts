import api from "./api";

import type { Payment } from "../types/payment";
import type { ApiResponse } from "../types/api";

export async function getPayments(): Promise<Payment[]> {
  const response = await api.get<ApiResponse<Payment[]>>("/payments");

  return response.data.data;
}

export interface CreatePaymentRequest {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  currency: string;
}

export async function createPayment(
  payment: CreatePaymentRequest,
  idempotencyKey: string
) {
  return api.post("/payments", payment, {
    headers: {
      "Idempotency-Key": idempotencyKey,
    },
  });
}