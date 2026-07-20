import { Card } from "../../components/ui/Card";
import { Wallet } from "lucide-react";
import Spinner from "../../components/ui/Spinner";
import ErrorState from "../../components/ui/ErrorState";

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
        <h1 className="text-3xl font-bold">Accounts</h1>

        <p className="mt-2 text-gray-500">
          View all available accounts and their current balances.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleAccounts.map((account) => (
          <Card
            key={account.id}
            className="p-6 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {account.ownerName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {account.currency} Wallet
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Wallet size={22} />
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Current Balance</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: account.currency,
                }).format(Number(account.balance))}
              </p>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Account ID
              </p>

              <p className="mt-2 break-all rounded-lg bg-slate-100 p-3 font-mono text-xs text-slate-700">
                {account.id}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {visibleAccounts.length === 0 && (
        <Card>
          <p className="py-8 text-center text-gray-500">No accounts found.</p>
        </Card>
      )}
    </div>
  );
}
