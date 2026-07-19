import { PoolClient } from "pg";

import { pool } from "../config/db";
import { AccountRepository } from "../repositories/AccountRepository";

export class AccountService {
  constructor(
    private readonly accountRepository = new AccountRepository(),
    private readonly databasePool = pool,
  ) {}

  public async getAccounts() {
    const client: PoolClient = await this.databasePool.connect();

    try {
      return await this.accountRepository.getAccounts(client);
    } finally {
      client.release();
    }
  }
}