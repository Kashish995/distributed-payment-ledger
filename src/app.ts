import express from "express";

import paymentRoutes from "./routes/payment.routes";
import { idempotencyMiddleware } from "./middleware/idempotency.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(idempotencyMiddleware);

app.use("/payments", paymentRoutes);

app.use(errorMiddleware);

export default app;