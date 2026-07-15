import { Router } from "express";

import { PaymentController } from "../controllers/PaymentController";

const router = Router();
const paymentController = new PaymentController();

router.post("/", paymentController.processPayment.bind(paymentController));

export default router;