import { sample } from "effector";
import { z } from "zod";

import { createReagentRequest } from "api/reagentRequest";
import { genericDomain } from "logger";
import {
    RequestCreationBody,
    RequestCreationBodySchema,
} from "shared/zodSchemas/request/requestSchemas";
import { errorToast } from "utils/errorToast";

export const initialFormData: RequestCreationBody = {
    name: "",
    structure: "",
    cas: "",
    quantity: 1,
    unit: "ml",
    status: "pending",
};

export const $formData = genericDomain.createStore<RequestCreationBody>(initialFormData);
export const $formDataErrors = genericDomain.createStore<Record<string, string>>({});
export const setFormData = genericDomain.createEvent<RequestCreationBody>();
export const resetFormData = genericDomain.createEvent<void>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

$formData.on(resetFormData, () => initialFormData);

export const addReagentRequestFx = genericDomain.createEffect(async () => {
    const data = $formData.getState();

    try {
        RequestCreationBodySchema.parse(data);
        const response = await createReagentRequest(data);
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

        const result = RequestCreationBodySchema.safeParse(formData);

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
