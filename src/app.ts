import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import paymentRoutes from "./routes/payment.routes";
import accountRoutes from "./routes/account.routes";
import healthRoutes from "./routes/health.routes";

import swaggerSpec from "./config/swagger";
import logger from "./config/logger";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());


app.use(
  pinoHttp({
    logger,
  }),
);

app.use("/payments", paymentRoutes);
app.use("/accounts", accountRoutes);
app.use("/health", healthRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

app.use(errorMiddleware);

export default app;