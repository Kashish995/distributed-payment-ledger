import { PoolClient } from "pg";

export class AccountRepository {
  async lockAccount(client: PoolClient, accountId: string): Promise<void> {
    const query = `
    SELECT id
    FROM accounts
    WHERE id = $1
    FOR UPDATE;
  `;

    await client.query(query, [accountId]);
  }

  async getAccountBalance(
    client: PoolClient,
    accountId: string,
  ): Promise<number> {
    const query = `
    SELECT
      COALESCE(SUM(amount), 0) AS balance
    FROM ledger_entries
    WHERE account_id = $1;
  `;

    const result = await client.query(query, [accountId]);

    return Number(result.rows[0].balance);
  }
}
