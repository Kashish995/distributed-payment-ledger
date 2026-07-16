import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Distributed Payment Ledger API",
      version: "1.0.0",
      description:
        "Production-grade payment ledger API with Redis idempotency, PostgreSQL transactions, row-level locking, and double-entry accounting.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;