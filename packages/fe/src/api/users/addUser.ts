import { NewUser } from "hooks/useUserForm";

import { base, request } from "../request";
import { User } from "./getUsers";

export const PostUsers = async (userData: NewUser) => {
    await request(`${base}/api/v1/users`, User, {
        method: "POST",
        json: userData,
    });
};
