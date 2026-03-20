import z from "zod";

export const investmentSchema = z.object({
  id: z.uuidv4("The id format is invalid."),
  name: z.string().min(1, "The name is required."),
  description: z.string().min(1, "The description is required."),
  amount: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "Must be a valid number.",
    })
    .positive("Must be a positive number."),

  date: z.date(),
});
