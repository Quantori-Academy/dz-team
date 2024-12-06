import { sample } from "effector";
import { z } from "zod";

import { createReagent, ReagentCreateSchema } from "api/createReagent";
import { genericDomain as domain } from "logger";
import { errorToast } from "utils/errorToast";

type CreateReagentType = z.infer<typeof ReagentCreateSchema>;

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
export const $formDataErrors = domain.createStore<Record<string, string>>({});
export const setFormData = domain.createEvent<CreateReagentType>();
export const resetFormData = domain.createEvent<void>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

$formData.on(resetFormData, () => initialFormData);

export const submitReagent = domain.createEvent<void>("submitReagent");

export const addReagentFx = domain.createEffect(async () => {
    const data = $formData.getState();

    try {
        ReagentCreateSchema.parse(data);
        const response = await createReagent(data);
        setFormData(initialFormData);
        return response;
    } catch (e) {
        if (e instanceof z.ZodError) {
            errorToast(e.issues[0].message);
        }
    }
});

// Processes form data, validates it with the schema, and stores errors in $formDataErrors
sample({
    clock: $formData,
    fn: (formData) => {
        if (formData === $formData.defaultState) {
            return {};
        }

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

// post added reagent on submit
sample({
    clock: submitReagent,
    target: addReagentFx,
});
