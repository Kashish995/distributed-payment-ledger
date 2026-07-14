-- Accounts

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



-- Initial Funding Transaction

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
    '11111111-1111-1111-1111-111111111111'::UUID,
    '00000000-0000-0000-0000-000000000999'::UUID,
    -1000,
    'DEBIT',
    'INR'
),
(
    gen_random_uuid(),
    '11111111-1111-1111-1111-111111111111'::UUID,
    '00000000-0000-0000-0000-000000000000'::UUID,
    1000,
    'CREDIT',
    'INR'
);