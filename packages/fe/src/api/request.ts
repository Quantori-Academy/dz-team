import ky, { Input, Options } from "ky";
import { Runtype, Static } from "runtypes";

import { config } from "config";
import { wait } from "utils";

import { Reagent } from "../api/reagentType";
import { handleError } from "./errorHandler";
import { decrementLoading, incrementLoading } from "./loadingState";

const { useMockData, isProd } = config;

// TODO: Update the base URL to include /api/v1 for consistency with the API routes.
export const base = isProd ? "http://vm4.quantori.academy:1337" : "http://localhost:1337";

type MockData = {
    [key: string]: Reagent;
};

const api = ky.create({
    retry: {
        limit: 2,
        methods: ["get"],
        statusCodes: [408, 429, 500, 502, 503, 504],
        backoffLimit: 1000,
    },
    hooks: {
        beforeRequest: [
            async (request) => {
                if (isProd) return request;
                if (useMockData) {
                    const url = request.url.toString().replace(base, "");
                    // eslint-disable-next-line no-console
                    console.warn("will use mock data for:", url);
                    const mockData: MockData = (await import("./data.json")).default;
                    if (!mockData) throw new Error("Mock data is not defined");

                    const mock = mockData[url as keyof typeof mockData]; // this assesment might be incorrect and must be checked with (!mock) below

                    if (!mock) throw new Error("Mock data on this url is not found");
                    await wait(Math.random() * 1000);
                    return new Response(JSON.stringify(mock), { status: 200 });
                }
                return request;
            },
        ],
    },
});

/**
 *
 * Performs an asynchronous HTTP request and processes the response using a runtype contract, and uses a mapper to transform the result.
 *
 * @template TT - The Runtype that defines the expected structure of the response.
 * @template T - The static type inferred from the Runtype (default is `rt.Static<TT>`).
 * @template K - The type returned by the mapper function (default is `T`).
 *
 * @param {Input} url - The URL or object to be used for the request.
 * @param {TT} contract - The Runtype contract used to validate the response.
 * @param {Options & {
 *    mapper?: (val: T) => K;
 *    showErrorNotification?: boolean;
 *    throwOnError?: boolean;
 *    shouldAffectIsLoading?: boolean;
 *}} [options] - Additional options for configuring the request.
 * @param {function(T): K} [options.mapper] - A function to transform the response data.
 * @param {boolean} [options.showErrorNotification=false] -  Whether to show an error notification.
 * @param {boolean} [options.throwOnError=true] - Whether to throw an error if one occurs.
 * @param {boolean} [options.shouldAffectIsLoading=false] - Whether the request should affect loading state.
 *
 * @returns {Promise<T | K | undefined>} - Returns the result of the request or a transformed value (if mapper is provided).
 *
 * @throws {Error} - Throws an error if `throwOnError` is set to true.
 */
export async function request<TT extends Runtype, T = Static<TT>, K = T>(
    url: Input,
    contract: TT,
    options?: Options & {
        mapper?: (val: T) => K;
        showErrorNotification?: boolean;
        throwOnError?: boolean;
        shouldAffectIsLoading?: boolean;
    },
): Promise<T | K | undefined> {
    try {
        if (options?.shouldAffectIsLoading) {
            incrementLoading();
        }

        const response = await api<T>(url, options).json();

        const value = contract.check(response) as T;

        return options?.mapper ? options.mapper(value) : value;
    } catch (err) {
        if (options?.showErrorNotification) {
            // TODO: notification is not implemented yet
            handleError(err as Error, url, options);
        }

        if (options?.throwOnError ?? true) {
            throw err;
        }
    } finally {
        if (options?.shouldAffectIsLoading) {
            decrementLoading();
        }
    }
}
