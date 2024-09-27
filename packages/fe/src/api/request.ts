import ky, { Input, Options } from "ky";
import * as rt from "runtypes";

export async function request(url: Input, options?: Options & { contract?: rt.Runtype }) {
    const response = await ky(url, options).json();

    if (options.contract) {
        options.contract.check(response);
    }

    return response;
}
