import {
    RequestCreationBody,
    RequestCreationBodySchema,
} from "shared/zodSchemas/request/requestSchemas";

import { base, request } from "./request";

export const createReagentRequest = async (formData: RequestCreationBody) => {
    const response = await request(`${base}/api/v1/requests`, RequestCreationBodySchema, {
        method: "POST",
        json: formData,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
