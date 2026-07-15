import { NextFunction, Request, Response } from "express";

import { PaymentService } from "../services/PaymentService";

import { IdempotencyService } from "../services/IdempotencyService";

const paymentService = new PaymentService();
const idempotencyService = new IdempotencyService();

export class PaymentController {
  async processPayment(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { senderAccountId, receiverAccountId, amount, currency } = req.body;

      await paymentService.processPayment({
        senderAccountId,
        receiverAccountId,
        amount,
        currency,
      });

      if (req.idempotencyKey) {
        await idempotencyService.markResolved(req.idempotencyKey);
      }

      res.status(201).json({
        message: "Payment processed successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
