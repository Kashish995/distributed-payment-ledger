import Redis from "ioredis";

import redis from "../config/redis";
import {
  IDEMPOTENCY_STATUS,
  IdempotencyStatus,
} from "../constants/idempotency";

export class IdempotencyService {
  private readonly redis: Redis;

  private static readonly KEY_PREFIX = "idempotency";
  private static readonly TTL_SECONDS = 24 * 60 * 60;

  constructor(redisClient: Redis = redis) {
    this.redis = redisClient;
  }

  private buildKey(idempotencyKey: string): string {
    return `${IdempotencyService.KEY_PREFIX}:${idempotencyKey}`;
  }

  async acquireLock(idempotencyKey: string): Promise<boolean> {
    const key = this.buildKey(idempotencyKey);

    const result = await this.redis.set(
      key,
      IDEMPOTENCY_STATUS.IN_PROGRESS,
      "EX",
      IdempotencyService.TTL_SECONDS,
      "NX"
    );

    return result === "OK";
  }

  async markResolved(idempotencyKey: string): Promise<void> {
    const key = this.buildKey(idempotencyKey);

    await this.redis.set(
      key,
      IDEMPOTENCY_STATUS.RESOLVED,
      "EX",
      IdempotencyService.TTL_SECONDS
    );
  }

  async getStatus(
    idempotencyKey: string
  ): Promise<IdempotencyStatus | null> {
    const key = this.buildKey(idempotencyKey);

    const status = await this.redis.get(key);

    if (status === null) {
      return null;
    }

    return status as IdempotencyStatus;
  }
}