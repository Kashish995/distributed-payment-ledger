export interface Payment {
  transactionId: string;
  senderAccountId: string;
  senderName: string;
  receiverAccountId: string;
  receiverName: string;
  amount: string;
  currency: string;
  createdAt: string;
}