import ky, { Input, Options } from "ky";

export function request(url: Input, options?: Options) {
    return ky(url, options);
}
