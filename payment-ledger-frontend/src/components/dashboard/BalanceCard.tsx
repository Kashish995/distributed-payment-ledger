import Card from "../common/Card";

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
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold">
            Account Balances
          </h2>

          <p className="text-sm text-gray-500">
            Current balances of all accounts
          </p>
        </div>

        <div className="space-y-4">
          {visibleAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {account.ownerName}
                </h3>

                <p className="text-sm text-gray-500">
                  {account.currency}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: account.currency,
                  }).format(Number(account.balance))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}