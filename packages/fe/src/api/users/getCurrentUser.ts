import { base, request } from "api/request";
import { MeStoreValue } from "stores/auth";

import {
    publicUserSchema,
    PublicUserType,
} from "./../../../../shared/zodSchemas/user/publicUserSchema";

export const getCurrentUser = async (): Promise<MeStoreValue> => {
    const response = await request(`${base}/api/v1/users/me`, publicUserSchema, {
        method: "GET",
    });
    return (response as PublicUserType) || null;
};
