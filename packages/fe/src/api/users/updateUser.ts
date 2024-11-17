import { UpdateUser, updateUserSchema } from "shared/zodSchemas";

import { base, request } from "../request";
export const updateUser = async (id: string, updatedData: UpdateUser) => {
    await request(`${base}/api/v1/users/updateUser/${id}`, updateUserSchema, {
        method: "PUT",
        json: updatedData,
    });
};
