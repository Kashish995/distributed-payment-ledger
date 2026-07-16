import { pool } from "./config/db";
import app from "./app";
import logger from "./config/logger";

const PORT = Number(process.env.PORT) || 3000;

app.get("/health", async (_, res) => {
  const result = await pool.query("SELECT NOW()");

  res.json({
    status: "OK",
    database: "Connected",
    timestamp: result.rows[0].now,
  });
});

async function startServer(): Promise<void> {
  try {
    await pool.query("SELECT 1");

    logger.info("Connected to PostgreSQL");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

startServer();