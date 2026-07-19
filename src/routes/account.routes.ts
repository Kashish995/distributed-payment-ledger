import { Router } from "express";

import { AccountController } from "../controllers/AccountController";

const router = Router();
const accountController = new AccountController();

/**
 * @openapi
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     description: Returns all accounts along with their current balance calculated from the immutable ledger.
 *     tags:
 *       - Accounts
 *     responses:
 *       200:
 *         description: Successfully retrieved all accounts.
 */
router.get(
  "/",
  accountController.getAccounts.bind(accountController),
);

export default router;