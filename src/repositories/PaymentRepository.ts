import { PoolClient } from "pg";
import { randomUUID } from "crypto";

export class PaymentRepository {
  async createLedgerEntries(
    client: PoolClient,
    transactionId: string,
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    currency: string
  ): Promise<void> {
    const query = `
      INSERT INTO ledger_entries (
        id,
        transaction_id,
        account_id,
        amount,
        entry_type,
        currency
      )
      VALUES
        ($1, $2, $3, $4, 'DEBIT', $5),
        ($6, $2, $7, $8, 'CREDIT', $5);
    `;

    await client.query(query, [
      randomUUID(),
      transactionId,
      fromAccountId,
      -amount,
      currency,
      randomUUID(),
      toAccountId,
      amount,
    ]);
  }
}