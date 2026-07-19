export default function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div>
      <p className="text-gray-500 text-sm">
        {greeting} 👋
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        Distributed Payment Ledger
      </h1>

      <p className="mt-2 text-gray-500">
        Production-grade payment infrastructure dashboard
      </p>
    </div>
  );
}