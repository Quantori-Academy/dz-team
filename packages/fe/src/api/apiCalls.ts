import { config } from "config";

const base = config.isProd ? "http://vm4.quantori.academy:1337" : "http://localhost:1337";

export const fetchServerConnection = async () => {
    const response = await fetch(base);
    if (response.ok) {
        return "ok!";
    }
};

export const fetchMolCount = async () => {
    const response = await fetch(base + "/molecule/count");
    if (response.ok) {
        return ((await response.json()) as number).toString(); // TODO: types should be defined with schema
    }
};

export const fetchMolPost = async () =>
    await fetch(base + "/molecule", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ smiles: "CCO" }),
    });
