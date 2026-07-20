import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import BalanceCard from "../../components/dashboard/BalanceCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

import ErrorState from "../../components/ui/ErrorState";
import { Wallet, ArrowRightLeft, Activity } from "lucide-react";

import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

import { useAccounts } from "../../hooks/useAccounts";
import { usePayments } from "../../hooks/usePayments";
import { useHealth } from "../../hooks/useHealth";

export default function Dashboard() {
  const {
    accounts,
    loading: accountsLoading,
    error: accountsError,
  } = useAccounts();

  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
  } = usePayments();

  const { health, loading: healthLoading } = useHealth();
  if (accountsLoading || paymentsLoading || healthLoading) {
    return <DashboardSkeleton />;
  }

  if (accountsError || paymentsError) {
    return (
      <ErrorState
        message={accountsError ?? paymentsError ?? "Something went wrong."}
      />
    );
  }
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard
          title="Accounts"
          value={accounts.length}
          subtitle="Active wallets"
          icon={<Wallet size={24} />}
        />

        <StatsCard
          title="Transactions"
          value={payments.length}
          subtitle="Processed payments"
          icon={<ArrowRightLeft size={24} />}
        />

        <StatsCard
          title="API Status"
          value={health?.status ?? "Unknown"}
          subtitle="Backend health"
          icon={<Activity size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BalanceCard accounts={accounts} />
        </div>

        <div>
          <RecentTransactions payments={payments} />
        </div>
      </div>
    </div>
  );
}
