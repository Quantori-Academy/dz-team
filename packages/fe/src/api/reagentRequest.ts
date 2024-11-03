import { z } from "zod";

import { base, request } from "api/request";

export const reagentRequest = z.object({
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

export const reagentRequestContract = z.array(reagentRequest);

export type reagentRequestType = z.infer<typeof reagentRequestContract>;

export const getReagentRequest = async () => {
    const response = await request(`${base}/api/v1/reagent-request`, reagentRequestContract, {
        method: "GET",
    });

    return response;
};
