import Redis from "ioredis";
import logger from "./logger";

const redis = new Redis({
  host: "localhost",
  port: 6379,
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