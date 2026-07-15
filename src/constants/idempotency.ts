export const IDEMPOTENCY_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
} as const;

export type IdempotencyStatus =
  (typeof IDEMPOTENCY_STATUS)[keyof typeof IDEMPOTENCY_STATUS];