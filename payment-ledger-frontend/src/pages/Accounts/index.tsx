import Card from "../../components/common/Card";
import Spinner from "../../components/common/Spinner";
import ErrorState from "../../components/common/ErrorState";

import { useAccounts } from "../../hooks/useAccounts";

export default function Accounts() {
  const { accounts, loading, error } = useAccounts();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const visibleAccounts = accounts.filter(
    (account) => account.ownerName !== "SYSTEM",
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Accounts
        </h1>

        <p className="mt-2 text-gray-500">
          View all available accounts and their current balances.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleAccounts.map((account) => (
          <Card key={account.id}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">
                  {account.ownerName}
                </h2>

                <p className="text-sm text-gray-500">
                  Account ID
                </p>

                <p className="break-all font-mono text-sm">
                  {account.id}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Currency
                </span>

                <span>{account.currency}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Balance
                </span>

                <span className="text-lg font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: account.currency,
                  }).format(Number(account.balance))}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {visibleAccounts.length === 0 && (
        <Card>
          <p className="py-8 text-center text-gray-500">
            No accounts found.
          </p>
        </Card>
      )}
    </div>
  );
}