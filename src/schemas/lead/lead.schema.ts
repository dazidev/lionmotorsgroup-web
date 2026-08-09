import z from "zod";
import { regex } from "@/src/utils/regex";

const leadBaseSchema = z.object({
  name: z.string().trim().min(1).max(50),
  lastname: z.string().trim().min(1).max(50),
  email: z.email(),
  zipcode: z
    .string()
    .trim()
    .regex(regex.zipcode)
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  phoneNumber: z.string().trim().regex(regex.phoneNumber),
  comments: z
    .string()
    .trim()
    .max(200)
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});

export const leadSchema = z.discriminatedUnion("type", [
  leadBaseSchema.extend({
    type: z.literal("general"),
  }),

  leadBaseSchema.extend({
    type: z.literal("vehicle"),
    vehicleId: z.uuidv4(),
  }),
]);
