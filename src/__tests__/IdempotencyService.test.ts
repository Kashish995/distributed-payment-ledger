jest.mock("../config/redis", () => ({
  __esModule: true,
  default: {},
}));

import { IdempotencyService } from "../services/IdempotencyService";
import { IdempotencyConflictError } from "../errors/IdempotencyConflictError";

const mockRedis = {
  set: jest.fn(),
  get: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("IdempotencyService", () => {
  describe("acquireLock", () => {
    it("should acquire a lock successfully", async () => {
      const idempotencyService = new IdempotencyService(mockRedis as any);

      mockRedis.set.mockResolvedValue("OK");

      await idempotencyService.acquireLock("payment-001");

      expect(mockRedis.set).toHaveBeenCalledTimes(1);

      expect(mockRedis.set).toHaveBeenCalledWith(
        "idempotency:payment-001",
        "IN_PROGRESS",
        "EX",
        24 * 60 * 60,
        "NX",
      );
    });
    it("should throw IdempotencyConflictError when the idempotency key already exists", async () => {
      const idempotencyService = new IdempotencyService(mockRedis as any);

      mockRedis.set.mockResolvedValue(null);

      await expect(
        idempotencyService.acquireLock("payment-001"),
      ).rejects.toBeInstanceOf(IdempotencyConflictError);

      expect(mockRedis.set).toHaveBeenCalledTimes(1);

      expect(mockRedis.set).toHaveBeenCalledWith(
        "idempotency:payment-001",
        "IN_PROGRESS",
        "EX",
        24 * 60 * 60,
        "NX",
      );
    });
  });

  describe("markResolved", () => {
    it("should mark the request as resolved", async () => {
      const idempotencyService = new IdempotencyService(mockRedis as any);

      mockRedis.set.mockResolvedValue("OK");

      await idempotencyService.markResolved("payment-001");

      expect(mockRedis.set).toHaveBeenCalledTimes(1);

      expect(mockRedis.set).toHaveBeenCalledWith(
        "idempotency:payment-001",
        "RESOLVED",
        "EX",
        24 * 60 * 60,
      );
    });
  });

  describe("getStatus", () => {
    it("should return the stored status", async () => {
      const idempotencyService = new IdempotencyService(mockRedis as any);

      mockRedis.get.mockResolvedValue("RESOLVED");

      const status = await idempotencyService.getStatus("payment-001");

      expect(status).toBe("RESOLVED");

      expect(mockRedis.get).toHaveBeenCalledWith("idempotency:payment-001");
    });

    it("should return null when the idempotency key does not exist", async () => {
      const idempotencyService = new IdempotencyService(mockRedis as any);

      mockRedis.get.mockResolvedValue(null);

      const status = await idempotencyService.getStatus("payment-001");

      expect(status).toBeNull();

      expect(mockRedis.get).toHaveBeenCalledWith("idempotency:payment-001");
    });
  });
});
