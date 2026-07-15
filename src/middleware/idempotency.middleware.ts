import { NextFunction, Request, Response } from "express";

export function idempotencyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const idempotencyKey = req.header("Idempotency-Key");

  req.idempotencyKey = idempotencyKey ?? undefined;

  next();
}