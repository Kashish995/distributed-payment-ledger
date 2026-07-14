import express from "express";
import { pool } from "./config/db";
import { AccountRepository } from "./repositories/AccountRepository";

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.get("/health", async (_, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({
    status: "OK",
    database: "Connected",
    timestamp: result.rows[0].now,
  });
});

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to PostgreSQL");

   

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL", error);
    process.exit(1);
  }
}

startServer();