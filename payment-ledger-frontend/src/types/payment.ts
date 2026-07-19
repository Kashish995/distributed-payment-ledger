export interface Payment {
  transactionId: string;
  senderAccountId: string;
  receiverAccountId: string;
  amount: string;
  currency: string;
  createdAt: string;
}