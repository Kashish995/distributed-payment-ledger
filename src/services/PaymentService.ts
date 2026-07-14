import { AccountRepository } from "../repositories/AccountRepository";

export class PaymentService {
  private accountRepository = new AccountRepository();

  async validateSufficientBalance(accountId: string, amount: number) {
    const balance = await this.accountRepository.getAccountBalance(accountId);

    if (balance < amount) {
      throw new Error("Insufficient funds");
    }

    return balance;
  }
}