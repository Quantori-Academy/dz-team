import { z } from "zod";

import { request } from "api/request";

const SampleDetailSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    category: z.string(),
    container: z.string().nullable(),
    deletedAt: z.date().nullable(),
    description: z.string(),
    quantity: z.number().optional(),
    quantityInit: z.number().nullable(),
    storageId: z.string().uuid(),
    storageLocation: z.string().nullable(),
    structure: z.string(),
    unit: z.string(),
});

export const editSample = async (data: {
    id: string;
    storageLocation: string;
    storageId: string;
    quantity: number;
}) => {
    const { id, ...updateData } = data;

    const processedData = {
        ...updateData,
        quantity:
            typeof updateData.quantity === "string"
                ? parseFloat(updateData.quantity)
                : updateData.quantity,
    };

    await request(`/samples/${id}`, SampleDetailSchema, {
        method: "PUT",
        json: processedData,
    });
};
