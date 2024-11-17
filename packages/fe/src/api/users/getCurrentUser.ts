import { base, request } from "api/request";
import { MeStoreValue } from "stores/auth";

import { publicUserSchema } from "./../../../../shared/zodSchemas";

export const getCurrentUser = async (): Promise<MeStoreValue> => {
    const response = await request(`${base}/api/v1/users/me`, publicUserSchema, {
        method: "GET",
    });
    return response || null;
};
