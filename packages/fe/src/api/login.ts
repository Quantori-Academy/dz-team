import { Record, String } from "runtypes";

import { base, request } from "api/request";

const LoginResponseContract = Record({
    token: String,
});

export const getLoginApi = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    const response = await request(`${base}/api/v1/login`, LoginResponseContract, {
        method: "POST",
        json: { username, password },
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
