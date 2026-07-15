import express from "express";
import { idempotencyMiddleware } from "./middleware/idempotency.middleware";

const app = express();

app.use(express.json());
app.use(idempotencyMiddleware);

export default app;