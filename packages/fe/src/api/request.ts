import ky, { Input, Options } from "ky";
import * as rt from "runtypes";

import { config } from "config";
import { wait } from "utils";

import { handleError } from "./errorHandler";
import { decrementLoading, incrementLoading } from "./loadingState";

const isDev = config.isDev;

export const base = config.isProd ? "http://vm4.quantori.academy:1337" : "http://localhost:1337";

const api = ky.create({
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
});

export async function request<T, K>(
    url: Input,
    contract: rt.Runtype,
    options?: Options & {
        mapper?: (val: T) => K;
        showErrorNotification?: boolean;
        throwOnError?: boolean;
    },
) {
    try {
        incrementLoading();

        const response = await api<T>(url, options).json();

        const value = contract.check(response) as T;

        return options?.mapper ? options.mapper(value) : value;
    } catch (err) {
        const showErrorNotification =
            options?.showErrorNotification !== undefined ? options?.showErrorNotification : false;

        if (showErrorNotification) {
            handleError(err as Error, url, options);
        }

        if (options?.throwOnError) {
            throw err;
        }
    } finally {
        decrementLoading();
    }
}
