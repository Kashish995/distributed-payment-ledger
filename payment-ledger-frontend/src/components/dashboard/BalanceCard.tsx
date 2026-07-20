import { Wallet } from "lucide-react";

import { Card } from "../ui/Card";

import type { Account } from "../../types/account";

interface BalanceCardProps {
  accounts: Account[];
}

export default function BalanceCard({
  accounts,
}: BalanceCardProps) {
  const visibleAccounts = accounts.filter(
    (account) => account.ownerName !== "SYSTEM"
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Account Balances
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {visibleAccounts.length} Active Account
            {visibleAccounts.length !== 1 && "s"}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Wallet size={28} />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {visibleAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {account.ownerName}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {account.currency} Wallet
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-slate-900">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: account.currency,
                }).format(Number(account.balance))}
              </p>
            </div>
          </div>
        ))}

        {visibleAccounts.length === 0 && (
          <p className="py-10 text-center text-slate-500">
            No accounts available.
          </p>
        )}
      </div>
    </Card>
  );
}