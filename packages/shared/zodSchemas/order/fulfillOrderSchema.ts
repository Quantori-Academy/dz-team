import { z } from "zod";

export const fulfillOrderSchema = z.object({
    reagents: z.array(
        z.object({
            id: z.string(),
            storageId: z.string(),
        }),
    ),
});
