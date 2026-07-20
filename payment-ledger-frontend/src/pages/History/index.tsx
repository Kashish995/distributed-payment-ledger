import { Card } from "../../components/ui/Card";
import { ArrowRightLeft } from "lucide-react";
import Spinner from "../../components/ui/Spinner";
import ErrorState from "../../components/ui/ErrorState";

import { usePayments } from "../../hooks/usePayments";

export default function History() {
  const { payments, loading, error } = usePayments();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>

        <p className="mt-2 text-gray-500">
          View all completed payment transactions.
        </p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <p className="py-8 text-center text-gray-500">
            No transactions found.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card
              key={payment.transactionId}
              className="p-6 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <ArrowRightLeft size={22} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {payment.senderName} → {payment.receiverName}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(payment.createdAt))}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Amount</p>

                  <p className="text-2xl font-bold text-slate-900">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: payment.currency,
                    }).format(Number(payment.amount))}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Transaction ID
                </p>

                <p className="mt-2 break-all rounded-lg bg-slate-100 p-3 font-mono text-xs text-slate-700">
                  {payment.transactionId}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
