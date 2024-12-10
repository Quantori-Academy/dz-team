import { z } from "zod";

import {
    RequestCreationBody,
    RequestCreationBodySchema,
} from "shared/zodSchemas/request/requestSchemas";

import { request } from "./request";

export const createReagentRequest = async (formData: RequestCreationBody) => {
    const response = await request(`/requests`, RequestCreationBodySchema, {
        method: "POST",
        json: formData,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};

export async function updateReagentRequestComments(
    id: string,
    commentsKey: string,
    comment: string,
) {
    await request(`/requests/${id}`, z.string(), {
        method: "PATCH",
        json: { [commentsKey]: comment },
    });
}
