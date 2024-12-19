import { z, ZodType } from "zod";

export class ItemValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    quantity: z.number().positive().int(),
    minQuantity: z.number().positive().int(),
  });
}
