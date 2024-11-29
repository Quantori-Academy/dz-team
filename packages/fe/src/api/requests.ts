import { times, uniqueId } from "lodash";

import { wait } from "utils";

import { ResponseMaterial, ResponseUser } from "./types";

// ++++++++++++++++++++++++++ M O C K S ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// * * * /materials -------------------------------------------------------------------------------]

export async function apiGetMaterials() {
    await wait(1000);
    return times(
        12,
        (index) =>
            ({
                id: uniqueId("mat"),
                name: `Material ${index + 1}`,
                createdAt: new Date().toISOString(),
            }) as ResponseMaterial,
    );
}

export async function apiGetMaterial(id: string) {
    await wait(1000);
    return {
        id,
        name: `Material ONE XX`,
        desc: "some description",
        tags: ["tag1", "tag3"],
        createdAt: new Date().toISOString(),
    } as ResponseMaterial;
}

export async function apiUpdateMaterial(id: string, update: Omit<ResponseMaterial, "id">) {
    await wait(1000);
    return {
        id,
        ...update,
    } as ResponseMaterial;
}

export async function apiRemoveMaterial(id: string) {
    await wait(1000);
    return id;
}

// * * * /users -----------------------------------------------------------------------------------]

export async function apiGetUsers() {
    await wait(1000);
    return times(
        3,
        (index) =>
            ({
                id: uniqueId("user"),
                firstName: `John  ${index + 1}`,
                lastName: `Smith ${index + 3 + 1}`,
                role: index % 2 === 0 ? "Admin" : "Researcher",
            }) as ResponseUser,
    );
}

// * * * combined API calls -----------------------------------------------------------------------]

export const api = {
    Users: { all: apiGetUsers },
    Materials: {
        all: apiGetMaterials,
        get: apiGetMaterial,
        update: apiUpdateMaterial,
        remove: apiRemoveMaterial,
    },
};
