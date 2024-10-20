import { createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { getReagentsApi } from "api/reagents";
import { genericDomain as domain } from "logger";

import { ReagentType } from "../api/reagents";

// Event definitions
export const setPage = domain.createEvent<number>("setPage");
export const setLimit = domain.createEvent<number>("setLimit");

// Store definitions
export const $page = domain
    .createStore<number>(1, { name: "$page" })
    .on(setPage, (_, newPage) => newPage);
export const $limit = domain.createStore<number>(15, { name: "$limit" });

// Store to hold the list of materials fetched
export const $ReagentsList = domain.createStore<ReagentType[]>([], { name: "$ReagentsList" });

// Update stores with events
$page.on(setPage, (_, newPage) => newPage);
$limit.on(setLimit, (_, newLimit) => newLimit);

export const fetchReagentsFx = createEffect(async () => {
    const response = await getReagentsApi();
    return response ?? [];
});

export const ReagentsGate = createGate({ domain });

// request for all  materials from server when gate is open
sample({
    clock: ReagentsGate.open,
    source: { page: $page, limit: $limit },
    fn: ({ page, limit }) => ({
        page,
        limit,
    }),
    target: fetchReagentsFx,
});

// save data from server
sample({
    clock: fetchReagentsFx.doneData,
    target: $ReagentsList,
});

sample({
    clock: [$page, $limit],
    source: { page: $page, limit: $limit },
    fn: ({ page, limit }) => ({
        page,
        limit,
    }),
    target: fetchReagentsFx,
});
