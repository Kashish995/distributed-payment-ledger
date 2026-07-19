import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAccounts } from "../../hooks/useAccounts";
import { createPayment } from "../../api/paymentApi";

import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";

type PaymentFormData = {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  currency: string;
};

export default function PaymentForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      currency: "INR",
    },
  });

  const { accounts, loading, error } = useAccounts();

  const availableAccounts = accounts.filter(
    (account) => account.ownerName !== "SYSTEM",
  );

  async function onSubmit(data: PaymentFormData) {
    if (data.senderAccountId === data.receiverAccountId) {
      toast.error("Sender and receiver must be different.");
      return;
    }

    try {
      setSubmitting(true);

      const idempotencyKey = crypto.randomUUID();

      await createPayment(data, idempotencyKey);

      toast.success("Payment sent successfully!");

      reset({
        senderAccountId: "",
        receiverAccountId: "",
        amount: undefined,
        currency: "INR",
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        "Failed to process payment.";

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Sender */}
      <div>
        <label className="mb-2 block font-medium">
          Sender Account
        </label>

        <select
          {...register("senderAccountId", {
            required: "Please select a sender account",
          })}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select sender</option>

          {availableAccounts.map((account) => (
            <option
              key={account.id}
              value={account.id}
            >
              {account.ownerName}
            </option>
          ))}
        </select>

        {errors.senderAccountId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.senderAccountId.message}
          </p>
        )}
      </div>

      {/* Receiver */}
      <div>
        <label className="mb-2 block font-medium">
          Receiver Account
        </label>

        <select
          {...register("receiverAccountId", {
            required: "Please select a receiver account",
          })}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select receiver</option>

          {availableAccounts.map((account) => (
            <option
              key={account.id}
              value={account.id}
            >
              {account.ownerName}
            </option>
          ))}
        </select>

        {errors.receiverAccountId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.receiverAccountId.message}
          </p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="mb-2 block font-medium">
          Amount
        </label>

        <input
          type="number"
          placeholder="100"
          className="w-full rounded-lg border p-3"
          {...register("amount", {
            valueAsNumber: true,
            required: "Amount is required",
            min: {
              value: 1,
              message: "Amount must be greater than 0",
            },
          })}
        />

        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Currency */}
      <div>
        <label className="mb-2 block font-medium">
          Currency
        </label>

        <select
          {...register("currency")}
          className="w-full rounded-lg border p-3"
        >
          <option value="INR">INR</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Processing..." : "Send Payment"}
      </button>
    </form>
  );
}