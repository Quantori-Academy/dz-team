import { z } from "zod";

import { request } from "api/request";
import { SampleData } from "api/types";
import UnitSchema from "shared/generated/zod/inputTypeSchemas/UnitSchema";

const addSampleSchemaContract = z.object({
    name: z.string(),
    structure: z.string().optional().nullable(),
    description: z.string(),
    quantity: z.number(),
    quantityInit: z.number().optional().nullable(),
    unit: z.lazy(() => UnitSchema).optional(),
    storageLocation: z.string().optional().nullable(),
    reagentIds: z.array(z.string()).optional(),
    storageId: z.string().uuid(),
});

export const postSample = async (formdata: SampleData) => {
    await request(`/samples`, addSampleSchemaContract, {
        method: "POST",
        json: formdata,
    });
};
