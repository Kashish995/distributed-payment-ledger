import { Router } from "express";

import { PaymentController } from "../controllers/PaymentController";
import { validateRequest } from "../middleware/validation.middleware";
import { idempotencyMiddleware } from "../middleware/idempotency.middleware";
import { paymentSchema } from "../validation/payment.schema";

const router = Router();
const paymentController = new PaymentController();

/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Process a payment
 *     description: Transfers funds between two accounts using double-entry accounting.
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: header
 *         name: Idempotency-Key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderAccountId
 *               - receiverAccountId
 *               - amount
 *               - currency
 *             properties:
 *               senderAccountId:
 *                 type: string
 *                 format: uuid
 *               receiverAccountId:
 *                 type: string
 *                 format: uuid
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       201:
 *         description: Payment processed successfully.
 *       400:
 *         description: Validation failed or insufficient funds.
 *       409:
 *         description: Duplicate Idempotency-Key.
 */
router.post(
  "/",
  validateRequest(paymentSchema),
  idempotencyMiddleware,
  paymentController.processPayment.bind(paymentController),
);

/**
 * @openapi
 * /payments:
 *   get:
 *     summary: Get payment history
 *     description: Returns all processed payments reconstructed from the immutable ledger.
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: List of processed payments.
 */
router.get(
  "/",
  paymentController.getPayments.bind(paymentController),
);

export default router;