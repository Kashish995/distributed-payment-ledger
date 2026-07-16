import request from "supertest";
import redis from "../../config/redis";

import app from "../../app";
import { AccountRepository } from "../../repositories/AccountRepository";
import { testPool } from "./test-db";

describe("Concurrency Tests", () => {
  afterAll(async () => {
    await redis.quit();
  });

  describe("Same Idempotency Key", () => {
    it("should allow only one request with the same idempotency key", async () => {
      const paymentRequest = {
        senderAccountId: "00000000-0000-0000-0000-000000000000",
        receiverAccountId: "00000000-0000-0000-0000-000000000001",
        amount: 100,
        currency: "INR",
      };

      const idempotencyKey = "concurrency-test-key";

      const requests = Array.from({ length: 20 }, () =>
        request(app)
          .post("/payments")
          .set("Idempotency-Key", idempotencyKey)
          .send(paymentRequest),
      );

      const responses = await Promise.all(requests);

      const successResponses = responses.filter(
        (response) => response.status === 201,
      );

      const conflictResponses = responses.filter(
        (response) => response.status === 409,
      );

      expect(successResponses).toHaveLength(1);
      expect(conflictResponses).toHaveLength(19);
    });
  });

  describe("Concurrent Payments", () => {
    it("should prevent double spending under concurrent requests", async () => {
      const paymentRequest = {
        senderAccountId: "00000000-0000-0000-0000-000000000000",
        receiverAccountId: "00000000-0000-0000-0000-000000000001",
        amount: 100,
        currency: "INR",
      };

      const requests = Array.from({ length: 20 }, (_, index) =>
        request(app)
          .post("/payments")
          .set("Idempotency-Key", `concurrent-payment-${index}`)
          .send(paymentRequest),
      );

      const responses = await Promise.all(requests);

      const successResponses = responses.filter(
        (response) => response.status === 201,
      );

      const failedResponses = responses.filter(
        (response) => response.status === 400,
      );

      expect(successResponses).toHaveLength(10);
      expect(failedResponses).toHaveLength(10);

      const client = await testPool.connect();

      try {
        const accountRepository = new AccountRepository();

        const aliceBalance = await accountRepository.getAccountBalance(
          client,
          "00000000-0000-0000-0000-000000000000",
        );

        const bobBalance = await accountRepository.getAccountBalance(
          client,
          "00000000-0000-0000-0000-000000000001",
        );

        expect(aliceBalance).toBe(0);
        expect(bobBalance).toBe(1000);
      } finally {
        client.release();
      }
    });
  });
});