import { testPool } from "./test-db";

export async function resetTestDatabase(): Promise<void> {
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
      '00000000-0000-0000-0000-000000000999',
      'SYSTEM',
      'INR'
    ),
    (
      '00000000-0000-0000-0000-000000000000',
      'Alice',
      'INR'
    ),
    (
      '00000000-0000-0000-0000-000000000001',
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
      '00000000-0000-0000-0000-000000000999',
      -1000,
      'DEBIT',
      'INR'
    ),
    (
      gen_random_uuid(),
      '11111111-1111-1111-1111-111111111111',
      '00000000-0000-0000-0000-000000000000',
      1000,
      'CREDIT',
      'INR'
    );
  `);
}