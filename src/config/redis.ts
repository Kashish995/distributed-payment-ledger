import Redis from "ioredis";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    });

if (process.env.NODE_ENV !== "test") {
  redis.on("connect", () => {
    logger.info("Connected to Redis");
  });

  redis.on("error", (error) => {
    logger.error({ error }, "Redis connection failed");
  });
}

export default redis;