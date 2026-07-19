import { NextFunction, Request, Response } from "express";

import { AccountService } from "../services/AccountService";

export class AccountController {
  constructor(
    private readonly accountService = new AccountService(),
  ) {}

  async getAccounts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accounts = await this.accountService.getAccounts();

      res.status(200).json({
        success: true,
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  }
}