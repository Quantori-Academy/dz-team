import { sample } from "effector";
import { z } from "zod";

import { genericDomain as domain } from "logger";
import { ReagentCreateInputSchema } from "shared/generated/zod";

type CreateReagentType = z.infer<typeof ReagentCreateInputSchema>;

export const initialFormData: CreateReagentType = {
    name: "",
    description: "",
    structure: "",
    cas: "",
    producer: "",
    catalogId: "",
    catalogLink: "",
    pricePerUnit: 0,
    unit: "ml",
    quantity: 0,
    expirationDate: new Date().toISOString().split("T")[0],
    storageLocation: "",
    currency: "usd",
    category: "reagent",
};

export const $formData = domain.createStore<CreateReagentType>(initialFormData);
export const setFormData = domain.createEvent<CreateReagentType>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

export const submitReagent = domain.createEvent<void>("submitReagent");

// TODO: move to `/api` and use `request`
export const addReagentFx = domain.createEffect(async () => {
    const data = $formData.getState();
    const response = await fetch(`/reagents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    setFormData(initialFormData);
    return await response.json();
});

// post added reagent on submit
sample({
    clock: submitReagent,
    target: addReagentFx,
});
