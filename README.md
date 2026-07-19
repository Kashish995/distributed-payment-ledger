# Distributed Payment Ledger

A production-oriented payment ledger backend built with **Node.js, TypeScript, PostgreSQL, and Redis**, demonstrating concepts used in modern payment systems such as **idempotency, ACID transactions, row-level locking, and double-entry accounting**.

> Designed as a backend engineering project to showcase scalable architecture, transaction consistency, concurrency handling, and production-ready development practices.

---

## Features

- Double-entry accounting ledger
- Exactly-once payment processing using Redis idempotency
- PostgreSQL ACID transactions
- Row-level locking (`FOR UPDATE`) to prevent race conditions
- Immutable append-only ledger
- RESTful APIs
- Request validation with Zod
- Structured logging with Pino
- Swagger/OpenAPI documentation
- Health check endpoint
- Unit tests
- Integration tests
- Concurrency testing
- GitHub Actions CI
- Layered architecture (Controller → Service → Repository)

---

# Tech Stack

### Backend

- Node.js
- TypeScript
- Express.js

### Database

- PostgreSQL

### Caching

- Redis

### Validation

- Zod

### Logging

- Pino

### API Documentation

- Swagger (OpenAPI)

### Testing

- Jest
- Supertest

### CI/CD

- GitHub Actions

---

# Project Architecture

```
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
```

---

# Payment Processing Flow

```
Client
   │
POST /payments
   │
   ▼
Validation Middleware
   │
   ▼
Idempotency Middleware (Redis)
   │
   ▼
Payment Controller
   │
   ▼
Payment Service
   │
   ├── BEGIN TRANSACTION
   ├── Lock Sender Account
   ├── Validate Balance
   ├── Create Ledger Entries
   └── COMMIT
   │
   ▼
Response
```

---

# Database Design

## Accounts

Stores account information.

```
accounts
--------
id
owner_name
currency
created_at
```

## Ledger Entries

Immutable append-only ledger.

```
ledger_entries
--------------
id
transaction_id
account_id
amount
entry_type
currency
created_at
```

Each payment creates:

- one DEBIT entry
- one CREDIT entry

ensuring accounting integrity.

---

# API Endpoints

## Payments

### Process Payment

```
POST /payments
```

Transfers funds between two accounts using double-entry accounting.

---

### Payment History

```
GET /payments
```

Returns processed payments reconstructed from the immutable ledger.

---

## Accounts

```
GET /accounts
```

Returns all accounts along with balances calculated from ledger entries.

---

## Health

```
GET /health
```

Returns application health status.

---

## API Documentation

```
GET /api-docs
```

Interactive Swagger UI.

---

# Idempotency

The API supports exactly-once payment processing.

Clients send:

```
Idempotency-Key: unique-key
```

Duplicate requests with the same key are rejected while preserving transaction consistency.

---

# Concurrency Control

To prevent race conditions:

- PostgreSQL transactions
- Row-level locking (`SELECT ... FOR UPDATE`)
- Atomic ledger updates
- Redis idempotency locks

These mechanisms ensure multiple concurrent payment requests cannot corrupt balances.

---

# Project Structure

```
src
├── config
├── controllers
├── middleware
├── repositories
├── routes
├── services
├── validation
├── errors
├── types
├── app.ts
└── server.ts

database
├── schema.sql
└── seed.sql
```

---

# Getting Started

## Clone

```bash
git clone https://github.com/<your-username>/distributed-payment-ledger.git

cd distributed-payment-ledger
```

---

## Install

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```
PORT=3000

DB_HOST=localhost
DB_PORT=5433
DB_NAME=payment_ledger
DB_USER=postgres
DB_PASSWORD=your_password

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Start PostgreSQL & Redis

```bash
docker compose up -d
```

---

## Run Development Server

```bash
npm run dev
```

---

# Testing

Unit Tests

```bash
npm test
```

Integration Tests

```bash
npm run test:integration
```

---

# CI

GitHub Actions automatically:

- Install dependencies
- Build project
- Execute unit tests
- Execute integration tests

on every push and pull request.

---

# Future Improvements

- React frontend
- Authentication & authorization
- Docker deployment
- Metrics & monitoring
- Rate limiting
- Pagination for payment history
- Webhooks
- Multi-currency exchange support

---

# Learning Outcomes

This project demonstrates practical implementation of:

- Distributed systems concepts
- Financial ledger design
- Exactly-once processing
- Transaction management
- PostgreSQL locking
- Redis idempotency
- Clean Architecture
- Repository Pattern
- REST API design
- Backend testing strategies

---

# Screenshots

Coming soon.

- Dashboard
- Swagger UI
- Payment API
- Transaction History

---

# License

MIT License