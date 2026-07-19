import { PoolClient } from "pg";
import { randomUUID } from "crypto";

export class PaymentRepository {
  async createLedgerEntries(
    client: PoolClient,
    transactionId: string,
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    currency: string,
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

  async getPayments(client: PoolClient) {
    const query = `
SELECT
  debit.transaction_id AS "transactionId",

  debit.account_id AS "senderAccountId",
  sender.owner_name AS "senderName",

  credit.account_id AS "receiverAccountId",
  receiver.owner_name AS "receiverName",

  ABS(debit.amount) AS amount,

  debit.currency AS currency,

  debit.created_at AS "createdAt"

FROM ledger_entries debit

INNER JOIN ledger_entries credit
  ON debit.transaction_id = credit.transaction_id

INNER JOIN accounts sender
  ON sender.id = debit.account_id

INNER JOIN accounts receiver
  ON receiver.id = credit.account_id

WHERE
  debit.entry_type = 'DEBIT'
  AND credit.entry_type = 'CREDIT'

ORDER BY debit.created_at DESC;
`;

    const result = await client.query(query);

    return result.rows;
  }
}
