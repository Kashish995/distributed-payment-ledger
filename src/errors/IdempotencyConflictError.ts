import { AppError } from "./AppError";

export class IdempotencyConflictError extends AppError {
  constructor() {
    super(
      "A request with the same Idempotency-Key is already being processed.",
      409
    );
  }
}