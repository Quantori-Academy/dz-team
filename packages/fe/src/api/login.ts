import { z } from "zod";

import { base, request } from "api/request";

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
    const response = await request(`${base}/api/v1/auth/login`, LoginResponseContract, {
        method: "POST",
        json: { username, password },
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
