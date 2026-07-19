import Card from "../common/Card";

import type { Payment } from "../../types/payment";

interface RecentTransactionsProps {
  payments: Payment[];
}

export default function RecentTransactions({
  payments,
}: RecentTransactionsProps) {
  const recentPayments = payments.slice(0, 5);

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold">
            Recent Transactions
          </h2>

          <p className="text-sm text-gray-500">
            Latest payment activity
          </p>
        </div>

        <div className="space-y-3">
          {recentPayments.map((payment) => (
            <div
              key={payment.transactionId}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div>
                <p className="font-semibold">
                  {payment.senderAccountId.slice(-4)} →{" "}
                  {payment.receiverAccountId.slice(-4)}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(payment.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ₹{payment.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}