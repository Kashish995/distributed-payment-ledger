import { randomUUID } from "crypto";
import { PoolClient } from "pg";

import { pool } from "../config/db";
import { ProcessPaymentRequest } from "../types/payment";

import { AccountRepository } from "../repositories/AccountRepository";
import { PaymentRepository } from "../repositories/PaymentRepository";

import { InsufficientFundsError } from "../errors/InsufficientFundsError";

import logger from "../config/logger";

export class PaymentService {
  constructor(
    private readonly accountRepository = new AccountRepository(),
    private readonly paymentRepository = new PaymentRepository(),
    private readonly databasePool = pool,
  ) {}

  public async processPayment({
    senderAccountId,
    receiverAccountId,
    amount,
    currency,
  }: ProcessPaymentRequest): Promise<void> {
    const client: PoolClient = await this.databasePool.connect();

    try {
      await client.query("BEGIN");

      await this.accountRepository.lockAccount(client, senderAccountId);

      await this.validateSufficientBalance(client, senderAccountId, amount);

      const transactionId = randomUUID();

      await this.paymentRepository.createLedgerEntries(
        client,
        transactionId,
        senderAccountId,
        receiverAccountId,
        amount,
        currency,
      );

      await client.query("COMMIT");

      logger.info(
        {
          transactionId,
          senderAccountId,
          receiverAccountId,
          amount,
          currency,
        },
        "Payment processed successfully",
      );
    } catch (error) {
      await client.query("ROLLBACK");

      logger.error(
        {
          error,
          senderAccountId,
          receiverAccountId,
          amount,
          currency,
        },
        "Payment processing failed",
      );

      throw error;
    } finally {
      client.release();
    }
  }

  // NEW METHOD
  public async getPayments() {
    const client: PoolClient = await this.databasePool.connect();

    try {
      return await this.paymentRepository.getPayments(client);
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