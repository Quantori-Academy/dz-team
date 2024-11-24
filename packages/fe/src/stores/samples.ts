import { sample } from "effector";
import { createGate } from "effector-react";

import { getSamples } from "api/getSamples/getSamples";
import { genericDomain as domain } from "logger";
import { Sample } from "shared/generated/zod/modelSchema/SampleSchema";

export const $samplesList = domain.createStore<Sample>([], { name: "$samplesList" });

export const fetchSamplesFx = domain.createEffect(async () => {
    const response = await getSamples();
    return response ?? [];
});

export const SamplesGate = createGate({ domain });

sample({
    clock: SamplesGate.open,
    target: fetchSamplesFx,
});

sample({
    clock: fetchSamplesFx.doneData,
    target: $samplesList,
});
