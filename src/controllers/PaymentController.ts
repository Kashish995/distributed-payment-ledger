import { NextFunction, Request, Response } from "express";

import { PaymentService } from "../services/PaymentService";

import { IdempotencyService } from "../services/IdempotencyService";

export class PaymentController {
  constructor(
    private readonly paymentService = new PaymentService(),
    private readonly idempotencyService = new IdempotencyService(),
  ) {}

  async processPayment(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { senderAccountId, receiverAccountId, amount, currency } = req.body;

      await this.paymentService.processPayment({
        senderAccountId,
        receiverAccountId,
        amount,
        currency,
      });

      if (req.idempotencyKey) {
        await this.idempotencyService.markResolved(req.idempotencyKey);
      }

      res.status(201).json({
        message: "Payment processed successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}