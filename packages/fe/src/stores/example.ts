import { filter, find, forEach, includes, isEmpty, map, set } from "lodash";
import { attach, sample } from "effector";
import { createGate } from "effector-react";
import { produce } from "immer";
import { debounce } from "patronum";

import { api } from "api";
import { materialsDomain as domain } from "logger";
import { ApiResponse } from "utils";

import { $tags, Alert, AppGate, createAlertFx, Tag } from "./common";

export const EditMaterialsGate = createGate({ domain });

// * * * $dirty -----------------------------------------------------------------------------------]

const resetDirty = domain.createEvent("resetDirty");
const setDirty = domain.createEvent<boolean>("setDirty");

export const $dirty = domain.createStore<boolean>(false, { name: "$dirty" });
$dirty.on(setDirty, () => true).on(resetDirty, () => false);

// * * * $materials -------------------------------------------------------------------------------]

export type Material = {
    id: string;
    name: string;
    description?: string;
    labels?: Tag[];
    created?: Date;
    updated?: Date;
};

type MaterialStore = Array<Material> | null;

const resetMaterials = domain.createEvent("resetMaterials");
export const reloadMaterials = domain.createEvent("reloadMaterials");

export const $materials = domain.createStore<MaterialStore>(null, { name: "$materials" });
$materials.reset(resetMaterials);

// load `materials` from server
export const getMaterialsFx = attach({
    source: $tags,
    effect: async (tags) => {
        const response = await api.Materials.all();
        // map server response data
        return responseMapping(response, tags);
    },
    domain,
    name: "getMaterialsFx",
});

// update loaded `materials` in the store
sample({
    clock: getMaterialsFx.doneData,
    target: $materials,
});

// when `AppGate` is open or `reloadMaterials` is triggered, we start loading `materials`
sample({
    clock: [debounce({ source: AppGate.open, timeout: 300 }), reloadMaterials],
    target: getMaterialsFx,
});

// * * * $selected --------------------------------------------------------------------------------]

type UpdateMaterial = Partial<Material>;
export const updatedMaterial = domain.createEvent<UpdateMaterial>("updatedMaterial");

const resetSelected = domain.createEvent("resetSelected");
export const selectMaterial = domain.createEvent<Material["id"]>("selectMaterial");

export const $selected = domain.createStore<Material>({} as Material, { name: "$selected" });
$selected.reset(resetSelected);

// set value at `path` of `$selected`
// if a portion of `path` doesn't exist, it's created
$selected.on(updatedMaterial, (store, update) => {
    return produce(store, (draft) => {
        forEach(update, (value, path) => {
            set(draft, path, value);
        });
    });
});

// load `Material` by `id` from server
export const getMaterialFx = attach({
    source: $tags,
    effect: async (tags, id: string) => {
        const response = await api.Materials.get(id);
        // map server response data
        const items = responseMapping([response], tags);
        return items[0];
    },
    domain,
    name: "getMaterialFx",
});

// update/remove `material` on the server ---------------------------------------------------------]

// save `$selected` material on the server
export const saveMaterialFx = attach({
    source: $selected,
    effect: async (item) => {
        await api.Materials.update(item.id, requestMapping(item));
    },
    domain,
    name: "saveMaterialFx",
});

// remove `$selected` material on the server
export const removeMaterialFx = attach({
    source: $selected,
    effect: async ({ id }) => {
        await api.Materials.remove(id);
    },
    domain,
    name: "removeMaterialFx",
});

// dispay alert for `error` when updating
sample({
    clock: saveMaterialFx.failData,
    source: $selected,
    fn: ({ name }) =>
        ({
            severity: "error",
            message: "Failed!",
            description:
                `An error ocurred while saving ${name}.\n` +
                "Please review server errors for more information.",
        }) as Alert,
    target: createAlertFx,
});

sample({
    clock: removeMaterialFx.doneData,
    source: $selected,
    fn: ({ name }) =>
        ({
            severity: "success",
            message: "Success",
            description: `Material "${name}" removed successfully`,
        }) as Alert,
    target: createAlertFx,
});

// * * * connections and consequences -------------------------------------------------------------]

// when `selectMaterial` called and `$materials` is empty - we have arrived at the page
// bypassing the common `materials` URL - then try to load `materials` by `id`
sample({
    clock: selectMaterial,
    source: $materials,
    filter: (materials) => isEmpty(materials),
    fn: (_, id) => id,
    target: getMaterialFx,
});

// update loaded `Material` in the `$selected` store
sample({
    clock: getMaterialFx.doneData,
    target: [$selected, resetDirty],
});

// reset `$selected` when `EditMaterialsGate` closes
sample({
    clock: EditMaterialsGate.close,
    target: [resetSelected],
});

// select material and update `$selected` form `$materials` store
// happens when the user clicks on a row in the list of materials
sample({
    clock: selectMaterial,
    source: $materials,
    filter: (materials, id) => !!find(materials, { id }),
    fn: (materials, id) => find(materials, { id }),
    target: [$selected, resetDirty],
});

// set `dirty` flag on `updatedMaterial` event
sample({
    clock: updatedMaterial,
    fn: () => true,
    target: setDirty,
});

// helpers ----------------------------------------------------------------------------------------]

function responseMapping(items: ApiResponse<typeof api.Materials.all>, tags?: Tag[]) {
    return map(
        items,
        (item) =>
            ({
                id: item.id,
                name: item.name,
                description: item.desc,
                labels: tags ? filter(tags, ({ value }) => includes(item.tags, value)) : undefined,
                created: item.createdAt ? new Date(item.createdAt) : null,
                updated: item.updatedAt ? new Date(item.updatedAt) : null,
            }) as Material,
    );
}

function requestMapping(item: Material) {
    return {
        id: item.id,
        name: item.name,
        desc: item.description,
        tags: item.labels ? map(item.labels, ({ value }) => value) : undefined,
        updatedAt: item.updated ? item.updated.toISOString() : undefined,
        createdAt: item.created ? item.created.toISOString() : undefined,
    } as ApiResponse<typeof api.Materials.all>[number];
}
