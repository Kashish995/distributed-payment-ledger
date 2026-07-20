import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Server } from "lucide-react";
import Spinner from "../../components/ui/Spinner";

import { useHealth } from "../../hooks/useHealth";

export default function Health() {
  const { health, loading } = useHealth();

  if (loading) {
    return <Spinner />;
  }

  if (!health) {
    return (
      <Card>
        <p className="text-center text-red-500">
          Unable to load health status.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">API Health</h1>

        <p className="mt-2 text-gray-500">Current backend service status.</p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Server size={26} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Backend Service
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current operational status of the Payment Ledger API.
                </p>
              </div>

              <Badge color={health.status === "OK" ? "green" : "red"}>
                {health.status}
              </Badge>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Last Health Check
              </p>

              <p className="mt-2 text-base text-slate-700">
                {new Intl.DateTimeFormat("en-IN", {
                  dateStyle: "full",
                  timeStyle: "medium",
                }).format(new Date(health.timestamp))}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
