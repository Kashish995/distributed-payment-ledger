import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

if (process.env.NODE_ENV !== "test") {
  redis.on("connect", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (error) => {
    console.error("Redis Connection Error:", error);
  });
}

export default redis;