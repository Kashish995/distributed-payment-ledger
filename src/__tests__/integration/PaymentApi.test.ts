import request from "supertest";
import { randomUUID } from "crypto";
import redis from "../../config/redis";
import { resetDatabase, clearRedis } from "../utils/testEnvironment";

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
  });
});
