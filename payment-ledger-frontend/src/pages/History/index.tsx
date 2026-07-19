import Card from "../../components/common/Card";
import Spinner from "../../components/common/Spinner";
import ErrorState from "../../components/common/ErrorState";

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
        <h1 className="text-3xl font-bold">
          Transaction History
        </h1>

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
            <Card key={payment.transactionId}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {payment.senderName} → {payment.receiverName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Transaction ID
                  </p>

                  <p className="break-all font-mono text-sm">
                    {payment.transactionId}
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(payment.createdAt))}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Amount
                  </p>

                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: payment.currency,
                    }).format(Number(payment.amount))}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {payment.currency}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}