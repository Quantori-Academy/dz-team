import { sample } from "effector";
import { createGate } from "effector-react";

import { getCombinedList } from "api/combinedList/getCombinedList";
import { genericDomain as domain } from "logger";
import { CombinedList } from "shared/generated/zod/modelSchema/CombinedListSchema";

export const $combinedList = domain.createStore<CombinedList[]>([], { name: "$combinedList" });

export const fetchCombinedListFx = domain.createEffect(async () => {
    const response = await getCombinedList();

    return response?.data ?? [];
});

export const CombinedListGate = createGate({ domain });

sample({
    clock: CombinedListGate.open,
    target: fetchCombinedListFx,
});

sample({
    clock: fetchCombinedListFx.doneData,
    target: $combinedList,
});
