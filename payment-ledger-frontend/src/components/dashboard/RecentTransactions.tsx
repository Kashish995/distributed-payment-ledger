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
                  {payment.senderName} → {payment.receiverName}
                </p>

                <p className="text-sm text-gray-500">
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(payment.createdAt))}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: payment.currency,
                  }).format(Number(payment.amount))}
                </p>
              </div>
            </div>
          ))}
        </div>

        {recentPayments.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            No transactions yet.
          </p>
        )}
      </div>
    </Card>
  );
}