import { createDomain } from "effector";

import { ConfigLogger, createDomainWatched, list, listKey, uuid } from "./debug-effector";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

export const debugStores = {
    generic: true,
    materials: true,
};

// * * * generic watched domain -------------------------------------------------------------------]

export const genericDomain = createDomainWatched("mayfly", {}, debugStores.generic);

export const genericMuteDomain = createDomain("mayfly-muted");

// * * * $materials -------------------------------------------------------------------------------]

const materialsConfig: ConfigLogger = {
    colors: {
        $materials: "query",
        $selectedId: "fx",
        $materialOptions: "data",
    },
    filter: {
        gate: true,
        createdMaterial: true,
        selectedMaterial: false,
        addedMaterial: false,
        updatedMaterials: false,
        updatedAttribute: true,
        getMaterialOptionsFx_root: false,
    },
    fn: {
        $materials: (m: AnyType) => listKey(m, "name"),
        $selectedId: (id: AnyType) => uuid(id),
        updatedAttribute: (update: AnyType) => list(update),
    },
};

export const materialsDomain = createDomainWatched(
    "mayfly-materials",
    materialsConfig,
    debugStores.materials,
);
