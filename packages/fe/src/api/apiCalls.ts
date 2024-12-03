import { z } from "zod";

import { request } from "./request";

export const fetchServerConnection = async () => {
    const result = await request("/", z.string(), { shouldAffectIsLoading: true });

    if (result) {
        return "ok!";
    }
};
