import { request } from "api/request";

import { CurrentUserContract } from "./contract";

export const getUser = async () => {
    const CurrentUser = await request(`/users/me`, CurrentUserContract, {
        method: "GET",
    });
    return CurrentUser;
};
