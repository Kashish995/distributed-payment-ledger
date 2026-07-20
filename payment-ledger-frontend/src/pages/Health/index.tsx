import { Card } from "../../components/ui/Card";
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
        <h1 className="text-3xl font-bold">
          API Health
        </h1>

        <p className="mt-2 text-gray-500">
          Current backend service status.
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              Status
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                health.status === "OK"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {health.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">
              Timestamp
            </span>

            <span>
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(health.timestamp))}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}