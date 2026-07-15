import { NextFunction, Request, Response } from "express";

import { IdempotencyService } from "../services/IdempotencyService";

const idempotencyService = new IdempotencyService();

export async function idempotencyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const idempotencyKey = req.header("Idempotency-Key");

  req.idempotencyKey = idempotencyKey ?? undefined;

  if (!idempotencyKey) {
    return next();
  }

  try {
    await idempotencyService.acquireLock(idempotencyKey);

    next();
  } catch (error) {
    next(error);
  }
}
