import express from "express";
import { pool } from "./config/db";
import { AccountRepository } from "./repositories/AccountRepository";
import { PaymentService } from "./services/PaymentService";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const paymentService = new PaymentService();

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
    const result = await pool.query(`
  SELECT account_id, SUM(amount) AS balance
  FROM ledger_entries
  GROUP BY account_id
`);

    console.log(result.rows);
    console.log("✅ Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL", error);
    process.exit(1);
  }

  await paymentService.processPayment(
    "00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000001",
    100,
    "INR",
  );

  console.log("✅ Payment transaction executed successfully");
}

startServer();
