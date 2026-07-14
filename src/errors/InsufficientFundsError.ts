import { AppError } from "./AppError";

export class InsufficientFundsError extends AppError {
  constructor() {
    super("Insufficient funds", 400);
  }
}