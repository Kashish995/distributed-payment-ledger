-- Accounts

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
    '550e8400-e29b-41d4-a716-446655440010'::UUID,
    -1000,
    'DEBIT',
    'INR'
),
(
    gen_random_uuid(),
    '11111111-1111-1111-1111-111111111111'::UUID,
    '550e8400-e29b-41d4-a716-446655440011'::UUID,
    1000,
    'CREDIT',
    'INR'
);