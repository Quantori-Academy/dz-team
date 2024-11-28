import { NewUser } from "api/types";
import { publicUserSchema } from "shared/zodSchemas/user/publicUserSchema";

import { base, request } from "../request";

export const PostUsers = async (userData: NewUser) => {
    await request(`${base}/api/v1/users`, publicUserSchema, {
        method: "POST",
        json: userData,
    });
};
