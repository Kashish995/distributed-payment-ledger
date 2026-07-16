import express from "express";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import paymentRoutes from "./routes/payment.routes";
import swaggerSpec from "./config/swagger";
import logger from "./config/logger";

import { errorMiddleware } from "./middleware/error.middleware";

import healthRoutes from "./routes/health.routes";

const app = express();

app.use(express.json());

app.use(
  pinoHttp({
    logger,
  }),
);

app.use("/payments", paymentRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

app.use(errorMiddleware);

app.use("/health", healthRoutes);

export default app;