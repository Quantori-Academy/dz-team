import { z } from "zod";

import { base, request } from "./request";

export const fetchServerConnection = async () => {
    const result = await request(base + "/", z.string(), { shouldAffectIsLoading: true });

    if (result) {
        return "ok!";
    }
};
