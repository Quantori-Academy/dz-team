import ky, { Input, Options } from "ky";
import * as rt from "runtypes";

import { config } from "config";
import { wait } from "utils";

import { handleError } from "./errorHandler";
import { decrementLoading, incrementLoading } from "./loadingState";

const { useMockData } = config;

export const base = config.isProd ? "http://vm4.quantori.academy:1337" : "http://localhost:1337";

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
                if (useMockData) {
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

/**
 *
 * Performs an asynchronous HTTP request and processes the response using a runtype contract, and uses a mapper to transform the result.
 *
 * @template T - The expected type of the response from the API.
 * @template K - The type returned after applying the mapper function (if provided).
 * @param {Input} url - The URL or object to be used for the request.
 * @param {rt.Runtype} contract - The runtype contract used to validate the response.
 * @param {Options & {
 *    mapper?: (val: T) => K;
 *    showErrorNotification?: boolean;
 *    throwOnError?: boolean;
 *    shouldAffectIsLoading?: boolean;
 *}} [options] - Additional options for configuring the request.
 * @param {Function} [options.mapper] - A function to transform the response if needed.
 * @param {boolean} [options.showErrorNotification=false] -  Whether to show an error notification.
 * @param {boolean} [options.throwOnError=false] - Whether to throw an error if one occurs.
 * @param {boolean} [options.shouldAffectIsLoading=false] - Whether the request should affect loading state.
 * @returns {Promise<T | K | undefined>} - Returns the result of the request or a transformed value (if mapper is provided).
 * @throws {Error} - Throws an error if `throwOnError` is set to true.
 */
export async function request<T, K>(
    url: Input,
    contract: rt.Runtype,
    options?: Options & {
        mapper?: (val: T) => K;
        showErrorNotification?: boolean;
        throwOnError?: boolean;
        shouldAffectIsLoading?: boolean;
    },
) {
    try {
        if (options?.shouldAffectIsLoading) {
            incrementLoading();
        }

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
        if (options?.shouldAffectIsLoading) {
            decrementLoading();
        }
    }
}