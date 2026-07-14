-- ============================
-- Custom Types
-- ============================

CREATE TYPE ledger_entry_type AS ENUM ('DEBIT', 'CREDIT');

-- ============================
-- Accounts
-- ============================

CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    currency CHAR(3) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================
-- Ledger Entries
-- ============================

CREATE TABLE ledger_entries (
    id UUID PRIMARY KEY,

    transaction_id UUID NOT NULL,

    account_id UUID NOT NULL,

    amount NUMERIC(18,2) NOT NULL,

    entry_type ledger_entry_type NOT NULL,

    currency CHAR(3) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_account
        FOREIGN KEY(account_id)
        REFERENCES accounts(id),

    CONSTRAINT chk_entry_amount_sign
        CHECK (
            (entry_type = 'DEBIT' AND amount < 0)
            OR
            (entry_type = 'CREDIT' AND amount > 0)
        )
);

-- ============================
-- Indexes
-- ============================

CREATE INDEX idx_ledger_transaction
ON ledger_entries(transaction_id);

CREATE INDEX idx_ledger_account
ON ledger_entries(account_id);