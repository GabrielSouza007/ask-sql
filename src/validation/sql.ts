import { z } from "zod";

export const sqlFormSchema = z
  .object({
    schema: z.string({
      required_error: "ERROR :(",
    }),
    prompt: z
      .string({
        required_error: "ERROR :(",
      })
      .min(1, "ERROR :("),
  })

export type SqlFormData = z.infer<typeof sqlFormSchema>;