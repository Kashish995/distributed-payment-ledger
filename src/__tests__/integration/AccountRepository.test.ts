import { PoolClient } from "pg";

import { testPool } from "./test-db";
import { AccountRepository } from "../../repositories/AccountRepository";

describe("AccountRepository", () => {
  let client: PoolClient;
  let accountRepository: AccountRepository;

  beforeAll(async () => {
    client = await testPool.connect();
    accountRepository = new AccountRepository();
  });

  afterAll(async () => {
    client.release();
    await testPool.end();
  });

  describe("getAccountBalance", () => {
    it("should return the correct balance for Alice", async () => {
      const balance = await accountRepository.getAccountBalance(
        client,
        "550e8400-e29b-41d4-a716-446655440011",
      );

      expect(balance).toBe(1000);
    });
  });
});
