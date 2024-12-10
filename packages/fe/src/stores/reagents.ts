import { sample } from "effector";
import { z } from "zod";

import { createReagent, ReagentCreateSchema, ReagentCreateType } from "api/createReagent";
import { genericDomain as domain } from "logger";
import { errorToast } from "utils/errorToast";

export const initialFormData: ReagentCreateType = {
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

export const $formData = domain.createStore<ReagentCreateType>(initialFormData);
export const $formDataErrors = domain.createStore<Record<string, string>>({});
export const $shouldShowErrors = domain.createStore<Record<string, boolean>>({});
export const setFormData = domain.createEvent<ReagentCreateType>();
export const resetFormData = domain.createEvent<void>();
export const touchField = domain.createEvent<string>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

$formData.on(resetFormData, () => initialFormData);
$formDataErrors.on(resetFormData, () => ({}));
$shouldShowErrors.on(resetFormData, () => ({}));

export const submitReagent = domain.createEvent<void>("submitReagent");

export const addReagentFx = domain.createEffect(async () => {
    const data = $formData.getState();

    try {
        ReagentCreateSchema.parse(data);
        const response = await createReagent(data);

        return response;
    } catch (e) {
        if (e instanceof z.ZodError) {
            errorToast(e.issues[0].message);
        }
    }
});

sample({
    clock: touchField,
    source: $formData,
    fn: (formData) => {
        const result = ReagentCreateSchema.safeParse(formData);

        return (
            result.error?.issues.reduce(
                (acc, issue) => {
                    const key = issue.path.join(".");
                    acc[key] = issue.message;
                    return acc;
                },
                {} as Record<string, string>,
            ) ?? {}
        );
    },
    target: $formDataErrors,
});

sample({
    clock: touchField,
    source: $shouldShowErrors,
    fn: (oldValue, field) => {
        return {
            ...oldValue,

            [field]: true,
        } as Record<string, boolean>;
    },
    target: $shouldShowErrors,
});

// Processes form data, validates it with the schema, and stores errors in $formDataErrors
sample({
    clock: addReagentFx,
    source: $formData,
    fn: (formData) => {
        const result = ReagentCreateSchema.safeParse(formData);

        return (
            result.error?.issues.reduce(
                (acc, issue) => {
                    const key = issue.path.join(".");
                    acc[key] = issue.message;
                    return acc;
                },
                {} as Record<string, string>,
            ) ?? {}
        );
    },
    target: $formDataErrors,
});

sample({
    clock: addReagentFx.doneData,
    source: $formData,
    fn: (formData, data) => {
        if (data === undefined) {
            return Object.keys(formData).reduce(
                (acc, key) => ({ ...acc, [key]: true }),
                {} as Record<string, boolean>,
            );
        }
        return {};
    },
    target: $shouldShowErrors,
});

// post added reagent on submit
sample({
    clock: submitReagent,
    target: addReagentFx,
});
