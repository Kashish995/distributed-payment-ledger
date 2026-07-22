# 💳 Distributed Payment Ledger

A production-inspired distributed payment ledger that simulates core payment infrastructure using **immutable double-entry accounting**, **idempotent request processing**, **ACID transactions**, and **PostgreSQL row-level locking**.

The project demonstrates how modern payment systems maintain consistency, prevent duplicate transactions, and safely process concurrent requests.

---

## 🚀 Live Demo

### 🌐 Frontend Dashboard

**https://YOUR_VERCEL_LINK.vercel.app**

### ⚙️ Backend API

**https://distributed-payment-ledger.onrender.com**

### 📖 Swagger API Documentation

**https://distributed-payment-ledger.onrender.com/api-docs**

---

# ✨ Features

- 💰 Immutable Double-Entry Accounting Ledger
- 🔒 PostgreSQL ACID Transactions
- ⚡ Row-Level Locking (`SELECT ... FOR UPDATE`)
- 🔁 Idempotent Payment Processing using Redis
- 📊 Real-time Account Balance Calculation
- 🏗 Clean Architecture
- 📦 Repository Pattern
- 🧩 Service Layer Architecture
- 📝 Swagger API Documentation
- 🎨 Modern React Dashboard
- 🌍 Fully Deployed Full Stack Application

---

# 🏗 System Architecture

```
                React Dashboard
                      │
                      ▼
               Express REST API
                      │
       ┌──────────────┴──────────────┐
       ▼                             ▼
 Payment Service              Account Service
       │                             │
       ▼                             ▼
 Repository Layer             Repository Layer
               │
               ▼
      PostgreSQL + Redis
```

---

# ⚙ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Redis
- Swagger UI
- Pino Logger

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- Tailwind CSS

## Deployment

- Render
- Vercel
- Neon PostgreSQL
- Upstash Redis

---

# 📂 Project Structure

```
distributed-payment-ledger/
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── payment-ledger-frontend/
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 💳 Payment Processing Flow

```
Client

   │

POST /payments

   │

Idempotency Middleware

   │

Payment Controller

   │

Payment Service

   │

BEGIN TRANSACTION

   │

Lock Sender Account
(SELECT ... FOR UPDATE)

   │

Validate Balance

   │

Insert Debit Entry

   │

Insert Credit Entry

   │

COMMIT

   │

Return Response
```

---

# 📒 Ledger Design

Instead of updating balances directly, every payment creates immutable ledger entries.

Example:

| Account | Entry Type | Amount |
|----------|-----------|--------:|
| Alice | Debit | -500 |
| Bob | Credit | +500 |

Current balances are calculated by summing all ledger entries.

This approach provides:

- Complete transaction history
- Auditability
- Financial consistency
- Immutable records

---

# 🔄 Idempotency

Every payment request can include an `Idempotency-Key`.

If the same request is submitted multiple times:

- The transaction executes only once.
- Duplicate requests return the cached response.
- Prevents accidental double payments.

---

# 🔐 Concurrency Handling

To prevent race conditions during simultaneous payment requests, the project uses PostgreSQL row-level locking.

```
SELECT ...
FOR UPDATE
```

This guarantees that only one transaction can modify an account balance at a time.

---

# 📖 API Endpoints

## Health

```http
GET /health
```

---

## Accounts

```http
GET /accounts
```

Returns all accounts with calculated balances.

---

## Payments

```http
GET /payments
```

Returns payment history.

```http
POST /payments
```

Creates a new payment transaction.

---

## Swagger Documentation

```http
GET /api-docs
```

Interactive API documentation.

---

# 🗄 Database

## Tables

- accounts
- ledger_entries

## Concepts Used

- UUID Primary Keys
- Foreign Keys
- Transactions
- Constraints
- Indexes
- Row-Level Locks
- Immutable Ledger Entries

---

# 🌍 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| Cache | Upstash Redis |

---

# 🚀 Running Locally

## Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/distributed-payment-ledger.git
```

---

## Backend

```bash
npm install

npm run dev
```

---

## Frontend

```bash
cd payment-ledger-frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend

```env
PORT=3000

DATABASE_URL=

REDIS_URL=
```

---

## Frontend

```env
VITE_API_BASE_URL=https://distributed-payment-ledger.onrender.com
```

---

# 🧪 Testing

The project includes:

- Repository Tests
- Service Tests
- Integration Tests
- API Validation

Run tests:

```bash
npm test
```

---

# 🚧 Future Improvements

- JWT Authentication
- Multi-Currency Support
- WebSocket Notifications
- Docker Production Deployment
- CI/CD Pipeline
- Prometheus Metrics
- Grafana Monitoring
- Rate Limiting
- Kubernetes Deployment

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Distributed Payment Systems
- Financial Ledger Design
- Backend Architecture
- Transaction Management
- Database Concurrency Control
- Redis Caching
- REST API Development
- Full Stack Deployment
- Production-Oriented Software Engineering

---

# 👨‍💻 Author

**Your Name**

GitHub: https://github.com/YOUR_GITHUB_USERNAME

LinkedIn: https://linkedin.com/in/YOUR_LINKEDIN

---

# 📄 License

This project is licensed under the MIT License.
