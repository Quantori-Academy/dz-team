import { request } from "api/request";
import { SampleSchema } from "shared/generated/zod";

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

    await request(`/samples/${id}`, SampleSchema, {
        method: "PUT",
        json: processedData,
    });
};
