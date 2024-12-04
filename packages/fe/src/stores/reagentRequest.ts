import { toast } from "react-toastify";
import { darken, lighten } from "@mui/material";
import { sample } from "effector";
import { theme } from "theme";
import { z } from "zod";

import { createReagentRequest } from "api/reagentRequest";
import { genericDomain } from "logger";
import {
    RequestCreationBody,
    RequestCreationBodySchema,
} from "shared/zodSchemas/request/requestSchemas";
const getColor = theme.palette.mode === "light" ? darken : lighten;
const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;

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

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

export const addReagentRequestFx = genericDomain.createEffect(async () => {
    const data = $formData.getState();

    try {
        RequestCreationBodySchema.parse(data);
        const response = await createReagentRequest(data);
        setFormData(initialFormData);
        return response;
    } catch (e) {
        if (e instanceof z.ZodError) {
            toast.error(e.issues[0].message, {
                style: {
                    backgroundColor: getBackgroundColor(theme.palette.error.light, 0.9),
                    color: getColor(theme.palette.error.light, 0.6),
                },
            });
        }
    }
});

// Processes form data, validates it with the schema, and stores errors in $formDataErrors
sample({
    clock: $formData,
    fn: (formData) => {
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
