import { Card } from "../../components/ui/Card";
import { ArrowRightLeft } from "lucide-react";

import PaymentForm from "../../components/payments/PaymentForm";

export default function Payments() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Make a Payment
            </h1>

            <p className="mt-2 text-slate-500">
              Transfer funds securely between accounts using the distributed
              payment ledger.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ArrowRightLeft size={30} />
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <PaymentForm />
        </div>
      </Card>
    </div>
  );
}
