import { z } from "zod";

// TODO: add correct contract when it's ready

export const ReagentRequestDetailsContract = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    reagentName: z.string().nullable(),
    structure: z.string().nullable(),
    casNumber: z.string().nullable(),
    desiredQuantity: z.string().nullable(),
    userComments: z.string().nullable(),
    procurementComments: z.string().nullable(),
    status: z.string().nullable(),
    creationDate: z.string().nullable(),
    dateModified: z.string().nullable(),
});

export const ReagentRequestDetailsEditContract = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    reagentName: z.string().nullable(),
    structure: z.string().nullable(),
    casNumber: z.string().nullable(),
    desiredQuantity: z.string().nullable(),
    userComments: z.string().nullable(),
    procurementComments: z.string().nullable(),
    status: z.string().nullable(),
    creationDate: z.string().nullable(),
    dateModified: z.string().nullable(),
});

export type ReagentRequestDetails = z.infer<typeof ReagentRequestDetailsContract>;
export type ReagentRequestDetailsEdit = z.infer<typeof ReagentRequestDetailsEditContract>;
