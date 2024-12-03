import { NewUser } from "hooks/useUserForm";
import { publicUserSchema } from "shared/zodSchemas/user/publicUserSchema";

import { request } from "../request";

export const PostUsers = async (userData: NewUser) => {
    await request(`/users`, publicUserSchema, {
        method: "POST",
        json: userData,
    });
};
