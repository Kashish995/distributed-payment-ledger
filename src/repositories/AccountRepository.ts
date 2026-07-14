import { pool } from "../config/db";

export class AccountRepository {
  async getAccountBalance(accountId: string): Promise<number> {
    const query = `
      SELECT
        COALESCE(SUM(amount), 0) AS balance
      FROM ledger_entries
      WHERE account_id = $1;
    `;

    const result = await pool.query(query, [accountId]);

    return Number(result.rows[0].balance);
  }
}