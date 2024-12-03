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
