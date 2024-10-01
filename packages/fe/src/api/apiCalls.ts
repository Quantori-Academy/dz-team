import { base, request } from "./request";

export const fetchServerConnection = async () => {
    const result = await request(base + "/");

    if (result) {
        return "ok!";
    }
};

export const fetchMolCount = async () => {
    return request(base + "/molecule/count");
};

export const fetchMolPost = async () => {
    return request(base + "/molecule", { method: "post", json: { smiles: "CCO" } });
};
