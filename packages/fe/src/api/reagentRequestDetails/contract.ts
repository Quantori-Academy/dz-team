import { z } from "zod";

import { RequestStatusSchema, UnitSchema } from "shared/generated/zod";

// TODO: add correct contract when it's ready

export const ReagentRequestDetailsContract = z.object({
    unit: UnitSchema,
    status: RequestStatusSchema,
    id: z.string().uuid(),
    name: z.string(),
    structure: z.string(),
    cas: z.string(),
    quantity: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    userId: z.string().uuid(),
    orderId: z.string(),
});

export const ReagentRequestDetailsEditContract = z.object({
    unit: UnitSchema,
    status: RequestStatusSchema,
    id: z.string().uuid(),
    name: z.string(),
    structure: z.string(),
    cas: z.string(),
    quantity: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    userId: z.string().uuid(),
    orderId: z.string(),
});

export type ReagentRequestDetails = z.infer<typeof ReagentRequestDetailsContract>;
export type ReagentRequestDetailsEdit = z.infer<typeof ReagentRequestDetailsEditContract>;
