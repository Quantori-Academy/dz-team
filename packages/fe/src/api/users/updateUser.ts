import { publicUserSchema, PublicUserType } from "shared/zodSchemas/user/publicUserSchema";
import { UpdateUser } from "shared/zodSchemas/user/updateUserSchema";

import { base, request } from "../request";

export const updateUser = async (id: string, updatedData: UpdateUser) => {
    const res = await request(`${base}/api/v1/users/${id}`, publicUserSchema, {
        method: "PUT",
        json: updatedData,
    });
    return res as PublicUserType;
};
