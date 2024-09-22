import { createDomain } from "effector";

import { ConfigLogger, createDomainWatched, list, listKey, size, uuid } from "./debug-effector";

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
        $materials: "green",
        $selected: "fx",
        $tags: "data",
        $dirty: "orange",
        updatedMaterial: "query",
    },
    filter: {
        gate: true,
        setDirty: false,
        resetDirty: false,
        getMaterialsFx_root: false,
        getMaterialFx_root: false,
    },
    fn: {
        $materials: (m: AnyType) => listKey(m, "name"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        $selected: (s: AnyType) => (size(s) ? uuid(s.id) : "empty"),
        updatedMaterial: (update: AnyType) => list(update),
        $dirty: (d: AnyType) => (d ? "on" : "off"),
    },
};

export const materialsDomain = createDomainWatched(
    "mayfly-materials",
    materialsConfig,
    debugStores.materials,
);
