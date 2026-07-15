export interface ProcessPaymentRequest {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  currency: string;
}