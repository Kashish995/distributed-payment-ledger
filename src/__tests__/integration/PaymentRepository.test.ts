import { PoolClient } from "pg";
import { randomUUID } from "crypto";

import { PaymentRepository } from "../../repositories/PaymentRepository";
import { testPool } from "./test-db";

describe("PaymentRepository", () => {
  let client: PoolClient;
  let paymentRepository: PaymentRepository;

  beforeAll(async () => {
    client = await testPool.connect();
    paymentRepository = new PaymentRepository();
  });

  beforeEach(async () => {
    await client.query("BEGIN");
  });

  afterEach(async () => {
    await client.query("ROLLBACK");
  });

  afterAll(async () => {
    client.release();
    await testPool.end();
  });

  describe("createLedgerEntries", () => {
    it("should create debit and credit ledger entries", async () => {
      const transactionId = randomUUID();

      await paymentRepository.createLedgerEntries(
        client,
        transactionId,
        "550e8400-e29b-41d4-a716-446655440011", // Alice
        "550e8400-e29b-41d4-a716-446655440012", // Bob
        100,
        "INR",
      );

      const result = await client.query(
        `
    SELECT
      transaction_id,
      account_id,
      amount,
      entry_type,
      currency
    FROM ledger_entries
    WHERE transaction_id = $1
    ORDER BY entry_type;
  `,
        [transactionId],
      );
      expect(result.rows).toHaveLength(2);
      const debitEntry = result.rows.find(
        (entry) => entry.entry_type === "DEBIT",
      );

      const creditEntry = result.rows.find(
        (entry) => entry.entry_type === "CREDIT",
      );

      expect(debitEntry).toBeDefined();
      expect(creditEntry).toBeDefined();

      expect(debitEntry).toMatchObject({
        transaction_id: transactionId,
        account_id: "550e8400-e29b-41d4-a716-446655440011",
        amount: "-100.00",
        entry_type: "DEBIT",
        currency: "INR",
      });

      expect(creditEntry).toMatchObject({
        transaction_id: transactionId,
        account_id: "550e8400-e29b-41d4-a716-446655440012",
        amount: "100.00",
        entry_type: "CREDIT",
        currency: "INR",
      });
    });
  });
});
