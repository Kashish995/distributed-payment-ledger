import request from "supertest";
import redis from "../../config/redis";
import { AccountRepository } from "../../repositories/AccountRepository";
import { testPool } from "./test-db";

import app from "../../app";

describe("Payment API", () => {
  afterAll(async () => {
    await redis.quit();
  });

  describe("POST /payments", () => {
    it("should process a payment successfully", async () => {
      const response = await request(app)
        .post("/payments")
        .set("Idempotency-Key", "payment-api-test-001")
        .send({
          senderAccountId: "00000000-0000-0000-0000-000000000000",
          receiverAccountId: "00000000-0000-0000-0000-000000000001",
          amount: 100,
          currency: "INR",
        });

      expect(response.status).toBe(201);

      expect(response.body).toEqual({
        message: "Payment processed successfully.",
      });
    });

    it("should reject duplicate idempotency key", async () => {
      const paymentRequest = {
        senderAccountId: "00000000-0000-0000-0000-000000000000",
        receiverAccountId: "00000000-0000-0000-0000-000000000001",
        amount: 100,
        currency: "INR",
      };

      const idempotencyKey = "payment-api-duplicate-test";

      const firstResponse = await request(app)
        .post("/payments")
        .set("Idempotency-Key", idempotencyKey)
        .send(paymentRequest);

      expect(firstResponse.status).toBe(201);

      const secondResponse = await request(app)
        .post("/payments")
        .set("Idempotency-Key", idempotencyKey)
        .send(paymentRequest);

      expect(secondResponse.status).toBe(409);

      expect(secondResponse.body).toEqual({
        success: false,
        message:
          "A request with the same Idempotency-Key is already being processed.",
      });
    });

    it("should reject payment with insufficient funds", async () => {
      const paymentRequest = {
        senderAccountId: "00000000-0000-0000-0000-000000000000",
        receiverAccountId: "00000000-0000-0000-0000-000000000001",
        amount: 5000,
        currency: "INR",
      };

      const response = await request(app)
        .post("/payments")
        .set("Idempotency-Key", "payment-api-insufficient-funds")
        .send(paymentRequest);

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        success: false,
        message: "Insufficient funds",
      });

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

        expect(aliceBalance).toBe(1000);
        expect(bobBalance).toBe(0);
      } finally {
        client.release();
      }
    });

    it("should reject invalid payment requests", async () => {
      const response = await request(app)
        .post("/payments")
        .set("Idempotency-Key", "invalid-payment-test")
        .send({
          senderAccountId: "abc",
          receiverAccountId: "xyz",
          amount: -10,
          currency: "RUPEES",
        });

      expect(response.status).toBe(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");

      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "senderAccountId",
          }),
          expect.objectContaining({
            field: "receiverAccountId",
          }),
          expect.objectContaining({
            field: "amount",
          }),
          expect.objectContaining({
            field: "currency",
          }),
        ]),
      );
    });
  });
});
