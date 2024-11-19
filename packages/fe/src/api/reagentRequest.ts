import { z } from "zod";

export const ReagentRequest = z.object({
    id: z.string(),
    userId: z.string(),
    reagentName: z.string(),
    structure: z.string(),
    casNumber: z.string(),
    desiredQuantity: z.string(),
    userComments: z.string(),
    procurementComments: z.string(),
    status: z.string(),
    creationDate: z.string(),
    dateModified: z.string(),
});

export type ReagentRequestType = z.infer<typeof ReagentRequest>;
