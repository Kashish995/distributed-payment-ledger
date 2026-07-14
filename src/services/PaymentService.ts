import { AccountRepository } from "../repositories/AccountRepository";
import { InsufficientFundsError } from "../errors/InsufficientFundsError";

export class PaymentService {
  constructor(
  private readonly accountRepository = new AccountRepository()
) {}

  async validateSufficientBalance(
    accountId: string,
    amount: number,
  ): Promise<void> {
    const balance = await this.accountRepository.getAccountBalance(accountId);

    if (balance < amount) {
      throw new InsufficientFundsError();
    }
  }
}