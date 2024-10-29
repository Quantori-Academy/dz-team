import { Record, Static, String } from "runtypes";

import { $auth } from "stores/auth";

import { base, request } from "../request";

const UserId = Record({
    id: String,
});
export type UserIdType = Static<typeof UserId>;

const token = $auth.getState()?.token;
export const deleteUser = async (id: string) => {
    await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
