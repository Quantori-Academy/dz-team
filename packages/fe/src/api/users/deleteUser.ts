import { Record, Static, String } from "runtypes";

import { base, request } from "../request";

const UserId = Record({
    id: String.nullable(),
});
export type UserIdType = Static<typeof UserId>;

export const deleteUser = async (id: string) => {
    await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
    });
};
