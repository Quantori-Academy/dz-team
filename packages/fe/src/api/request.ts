import ky, { Input, Options } from "ky";
import { z, ZodType } from "zod";

import { config } from "config";
import { $auth } from "stores/auth";
import { wait } from "utils";

import { handleError } from "./errorHandler";
import { decrementLoading, incrementLoading } from "./loadingState";

const { useMockData, isProd } = config;

// TODO: Update the base URL to include /api/v1 for consistency with the API routes.
export const base = isProd ? "http://vm4.quantori.academy:1337" : "http://localhost:1337";

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
                    const url = request.url.toString().replace(base, "").split("?")[0];
                    // eslint-disable-next-line no-console
                    console.warn("will use mock data for:", url);
                    const mockData = (await import("./data.json")).default;
                    if (!mockData) throw new Error("Mock data is not defined");

                    const mock = mockData[url as keyof typeof mockData]; // this assesment might be incorrect and must be checked with (!mock) below

                    if (!mock) throw new Error("Mock data on this url is not found");
                    await wait(Math.random() * 1000);
                    return new Response(JSON.stringify(mock), { status: 200 });
                }
                return request;
            },
        ],
        beforeError: [
            async (error) => {
                const { response } = error;
                const body: { message: string } = await response.json();
                if (body) {
                    error.message = body.message;
                }

                return error;
            },
        ],
    },
});

/**
 *
 * Performs an asynchronous HTTP request and processes the response using a zod contract, and uses a mapper to transform the result.
 *
 * @template TT - The zod schema that defines the expected structure of the response.
 * @template T - The static type inferred from the zod schema (default is `z.infer<TT>`).
 * @template K - The type returned by the mapper function (default is `T`).
 *
 * Overloads:
 * 1. When `throwOnError` is explicitly set to `false`:
 *    - @returns {Promise<T | K | undefined>} The result of the request, transformed by the mapper if provided,
 *      or `undefined` if an error occurs.
 * 2. When `throwOnError` is explicitly set to `true` or not specified:
 *    - @returns {Promise<T | K>} The result of the request, transformed by the mapper if provided.
 *      Throws an error if one occurs.
 *
 * @param {Input} url - The URL or object to be used for the request.
 * @param {TT} contract - The zod contract used to validate the response.
 * @param {Options & {
 *    mapper?: (val: T) => K;
 *    showErrorNotification?: boolean;
 *    throwOnError?: boolean;
 *    shouldAffectIsLoading?: boolean;
 *}} [options] - Additional options for configuring the request.
 * @param {function(T): K} [options.mapper] - A function to transform the response data.
 * @param {boolean} [options.showErrorNotification=false] -  Whether to show an error notification.
 * @param {boolean} [options.throwOnError=true] - If `true`, throws an error on failure. If `false`, returns `undefined` on failure.
 * @param {boolean} [options.shouldAffectIsLoading=false] - Whether the request should affect loading state.
 *
 * @returns {Promise<T | K | undefined>} - Depending on the overload, returns the response data or transformed result,
 * or `undefined` if `throwOnError` is set to `false` and an error occurs.
 *
 * @throws {Error} - Throws an error if `throwOnError` is `true` or not specified and a failure occurs.
 */
export async function request<TT extends ZodType, T = z.infer<TT>, K = T>(
    url: Input,
    contract: TT,
    options: Options & {
        mapper?: (val: T) => K;
        showErrorNotification?: boolean;
        throwOnError: false;
        shouldAffectIsLoading?: boolean;
    },
): Promise<T | K | undefined>;
export async function request<TT extends ZodType, T = z.infer<TT>, K = T>(
    url: Input,
    contract: TT,
    options?: Options & {
        mapper?: (val: T) => K;
        showErrorNotification?: boolean;
        throwOnError?: true;
        shouldAffectIsLoading?: boolean;
    },
): Promise<T | K>;
export async function request<TT extends ZodType, T = z.infer<TT>, K = T>(
    url: Input,
    contract: TT,
    options?: Options & {
        mapper?: (val: T) => K;
        showErrorNotification?: boolean;
        throwOnError?: boolean;
        shouldAffectIsLoading?: boolean;
    },
): Promise<T | K | undefined> {
    const auth = $auth.getState();
    const token = auth ? auth.token : null;
    try {
        if (options?.shouldAffectIsLoading) {
            incrementLoading();
        }
        const headers = {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        };

        const response = await api<{ data: T[] }>(url, { ...options, headers }).json(); // TODO: fix type asserion
        const value = contract.parse(response) as T;

        return options?.mapper ? options.mapper(value) : value;
    } catch (err) {
        if (options?.showErrorNotification ?? !isProd) {
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
