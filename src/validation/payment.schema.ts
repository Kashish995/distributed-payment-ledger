import { z } from "zod";

export const paymentSchema = z.object({
  senderAccountId: z.uuid("Invalid sender account ID"),

  receiverAccountId: z.uuid("Invalid receiver account ID"),

  amount: z
    .number({
      error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  currency: z
    .string()
    .trim()
    .length(3, "Currency must be a 3-letter ISO code")
    .transform((value) => value.toUpperCase()),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;