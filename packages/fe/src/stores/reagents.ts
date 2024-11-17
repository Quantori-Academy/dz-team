import { sample } from "effector";

import { base } from "api/request";
import { CreateReagentType } from "components/pages/ReagentsPage/ReagentFormModal";
import { genericDomain as domain } from "logger";

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

export const submitReagent = domain.createEvent<CreateReagentType>("submitReagent");

// TODO: move to `/api` and use `request`
export const addReagentFx = domain.createEffect(async (data: CreateReagentType) => {
    const response = await fetch(`${base}/api/v1/reagents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await response.json();
});

// post added reagent on submit
sample({
    clock: submitReagent,
    target: addReagentFx,
});
