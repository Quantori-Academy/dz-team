import { RegisterUser, registerUserSchema } from "shared/zodSchemas";

import { base, request } from "../request";

//TODO fix types

export const PostUsers = async (userData: RegisterUser) => {
    await request(`${base}/api/v1/users`, registerUserSchema, {
        method: "POST",

        json: userData,
    });
};
