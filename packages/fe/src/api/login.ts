import { z } from "zod";

import { request } from "api/request";

const LoginResponseContract = z.object({
    token: z.string(),
});

export const getLoginApi = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    const response = await request(`/auth/login`, LoginResponseContract, {
        method: "POST",
        json: { username, password },
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
