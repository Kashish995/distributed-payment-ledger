import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import BalanceCard from "../../components/dashboard/BalanceCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import Spinner from "../../components/common/Spinner";
import ErrorState from "../../components/common/ErrorState";

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
    return <Spinner />;
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
        <StatsCard title="Accounts" value={accounts.length} />

        <StatsCard title="Transactions" value={payments.length} />

        <StatsCard title="API Status" value={health?.status ?? "Unknown"} />
      </div>

      <BalanceCard accounts={accounts} />

      <RecentTransactions payments={payments} />
    </div>
  );
}
