import { z } from "zod";

import { ReagentDetailsOrderContract } from "api/reagentDetails/contract";

export const OrderDetailsContract = z.object({
    id: z.string(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    status: z.string().nullable(),
    seller: z.string().nullable(),
    deletedAt: z.string().nullable(),
    createdAt: z.string().nullable(),
    userId: z.string().nullable(),
    reagents: z.array(ReagentDetailsOrderContract),
});

export type OrderDetails = z.infer<typeof OrderDetailsContract>;
