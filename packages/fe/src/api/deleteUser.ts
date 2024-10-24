import { Record, String } from "runtypes";

import { base, request } from "./request";

const UserId = Record({
    id: String,
});

export const deleteUser = async (id: string) => {
    const DeleteUser = await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
    });
    return DeleteUser;
};
