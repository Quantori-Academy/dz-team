import ky, { Input, Options } from "ky";
import * as rt from "runtypes";

export async function request<T, K>(
    url: Input,
    options?: Options & { contract?: rt.Runtype; mapper?: (val: T) => K }
) {
    const response = await ky<T>(url, options).json();

    if (options.contract) {
        options.contract.check(response);
    }

    if (options.mapper) {
        return options.mapper(response);
    }

    return response;
}
