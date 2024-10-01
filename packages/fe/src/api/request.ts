import ky, { Input, Options } from "ky";
import * as rt from "runtypes";

import { config } from "config";
import { wait } from "utils";

const isDev = config.isDev;

export const base = config.isProd ? "http://vm4.quantori.academy:1337" : "http://localhost:1337";

export async function request<T, K>(
    url: Input,
    options?: Options & { contract?: rt.Runtype; mapper?: (val: T) => K }
) {
    const response = await ky<T>(url, {
        ...options,
        hooks: {
            beforeRequest: [
                async (request) => {
                    if (isDev) {
                        const mockData = (await import("./data.json")).default;
                        const url = request.url.toString().replace(base, "");
                        const mock = mockData[url];
                        await wait(Math.random() * 1000);
                        return new Response(JSON.stringify(mock), { status: 200 });
                    }
                },
            ],
        },
    }).json();

    if (options?.contract) {
        options.contract.check(response);
    }

    if (options?.mapper) {
        return options.mapper(response);
    }

    return response;
}
