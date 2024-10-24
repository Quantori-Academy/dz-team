import * as rt from "runtypes";

import { base, request } from "./request";

export const fetchServerConnection = async () => {
    const result = await request(base + "/", rt.String, { shouldAffectIsLoading: true });

    if (result) {
        return "ok!";
    }
};
