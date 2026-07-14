import { pool } from "../config/db";
import { PoolClient } from "pg";
import { randomUUID } from "crypto";

import { AccountRepository } from "../repositories/AccountRepository";
import { PaymentRepository } from "../repositories/PaymentRepository";

import { InsufficientFundsError } from "../errors/InsufficientFundsError";

export class PaymentService {
  constructor(
    private readonly accountRepository = new AccountRepository(),
    private readonly paymentRepository = new PaymentRepository(),
  ) {}

  public async processPayment(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    currency: string,
  ): Promise<void> {
    const client: PoolClient = await pool.connect();

    try {
      await client.query("BEGIN");

      await this.accountRepository.lockAccount(client, fromAccountId);

      const balance = await this.accountRepository.getAccountBalance(
        client,
        fromAccountId,
      );

      console.log("From Account:", fromAccountId);
      console.log("Requested Amount:", amount);
      console.log("Current Balance:", balance);

      if (balance < amount) {
        throw new InsufficientFundsError();
      }

      const transactionId = randomUUID();

      await this.paymentRepository.createLedgerEntries(
        client,
        transactionId,
        fromAccountId,
        toAccountId,
        amount,
        currency,
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  private async validateSufficientBalance(
    client: PoolClient,
    accountId: string,
    amount: number,
  ): Promise<void> {
    const balance = await this.accountRepository.getAccountBalance(
      client,
      accountId,
    );

    if (balance < amount) {
      throw new InsufficientFundsError();
    }
  }
}
