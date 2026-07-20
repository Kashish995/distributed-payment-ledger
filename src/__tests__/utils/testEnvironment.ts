import { testPool } from "../integration/test-db";
import redis from "../../config/redis";

export async function resetDatabase(): Promise<void> {
  await testPool.query(`
    TRUNCATE TABLE ledger_entries RESTART IDENTITY CASCADE;
  `);

  await testPool.query(`
    TRUNCATE TABLE accounts RESTART IDENTITY CASCADE;
  `);

  await testPool.query(`
    INSERT INTO accounts (
      id,
      owner_name,
      currency
    )
    VALUES
      (
        '550e8400-e29b-41d4-a716-446655440010',
        'SYSTEM',
        'INR'
      ),
      (
        '550e8400-e29b-41d4-a716-446655440011',
        'Alice',
        'INR'
      ),
      (
        '550e8400-e29b-41d4-a716-446655440012',
        'Bob',
        'INR'
      );
  `);

  await testPool.query(`
    INSERT INTO ledger_entries (
      id,
      transaction_id,
      account_id,
      amount,
      entry_type,
      currency
    )
    VALUES
      (
        gen_random_uuid(),
        '11111111-1111-1111-1111-111111111111',
        '550e8400-e29b-41d4-a716-446655440010',
        -1000,
        'DEBIT',
        'INR'
      ),
      (
        gen_random_uuid(),
        '11111111-1111-1111-1111-111111111111',
        '550e8400-e29b-41d4-a716-446655440012',
        1000,
        'CREDIT',
        'INR'
      );
  `);
}

export async function clearRedis(): Promise<void> {
  const keys = await redis.keys("idempotency:*");

  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
