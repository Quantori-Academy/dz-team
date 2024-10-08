import rt from "runtypes";

import { base, request } from "./request";

export const fetchServerConnection = async () => {
    const result = await request(base + "/", rt.String, { shouldAffectIsLoading: true });

    if (result) {
        return "ok!";
    }
};

export const fetchMolCount = async () => {
    return request(base + "/molecule/count", rt.Number, { showErrorNotification: true });
};

export const fetchMolPost = async () => {
    return request(
        base + "/molecule",
        rt.Record({
            id: rt.Number,
            createdAt: rt.String,
            smiles: rt.String,
        }),
        {
            method: "post",
            json: { smiles: "CCO" },
            showErrorNotification: true,
        },
    );
};
