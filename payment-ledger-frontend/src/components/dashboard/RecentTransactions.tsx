import { ArrowRightLeft } from "lucide-react";

import { Card } from "../ui/Card";

import type { Payment } from "../../types/payment";

interface RecentTransactionsProps {
  payments: Payment[];
}

export default function RecentTransactions({
  payments,
}: RecentTransactionsProps) {
  const recentPayments = payments.slice(0, 5);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest payment activity
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <ArrowRightLeft size={28} />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {recentPayments.map((payment) => (
          <div
            key={payment.transactionId}
            className="rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {payment.senderName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  → {payment.receiverName}
                </p>
              </div>

              <p className="text-lg font-bold text-slate-900">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: payment.currency,
                }).format(Number(payment.amount))}
              </p>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">
                {new Intl.DateTimeFormat("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(payment.createdAt))}
              </p>
            </div>
          </div>
        ))}

        {recentPayments.length === 0 && (
          <p className="py-10 text-center text-slate-500">
            No transactions yet.
          </p>
        )}
      </div>
    </Card>
  );
}