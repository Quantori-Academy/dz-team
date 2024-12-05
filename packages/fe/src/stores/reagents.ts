import { toast } from "react-toastify";
import { darken, lighten } from "@mui/material";
import { sample } from "effector";
import { theme } from "theme";
import { z } from "zod";

import { createReagent } from "api/createReagent";
import { genericDomain as domain } from "logger";
import { ReagentCreateInputSchema } from "shared/generated/zod";

const getColor = theme.palette.mode === "light" ? darken : lighten;
const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;

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
export const $formDataErrors = domain.createStore<Record<string, string>>({});
export const setFormData = domain.createEvent<CreateReagentType>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

export const submitReagent = domain.createEvent<void>("submitReagent");

export const addReagentFx = domain.createEffect(async () => {
    const data = $formData.getState();

    try {
        ReagentCreateInputSchema.parse(data);
        const response = await createReagent(data);
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
        const result = ReagentCreateInputSchema.safeParse(formData);

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
