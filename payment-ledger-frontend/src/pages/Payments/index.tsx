import Card from "../../components/common/Card";
import PaymentForm from "../../components/payments/PaymentForm";

export default function Payments() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Make a Payment
          </h1>

          <p className="mt-2 text-gray-500">
            Transfer money securely between accounts.
          </p>
        </div>

        <PaymentForm />
      </Card>
    </div>
  );
}