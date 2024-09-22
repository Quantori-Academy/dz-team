import { sample } from "effector";
import { createGate } from "effector-react";

import { genericDomain as domain, genericDomain } from "logger";

export const AppGate = createGate({ domain });

// MOCK for alerts
export type Alert = {
    severity: "warning" | "error" | "info" | "success";
    message: string;
    description?: string;
};

export const createAlertFx = genericDomain.createEffect<Alert, void>((alert) => {
    dev.data(alert, "alert");
});

// MOCK for tags

export type Tag = {
    label: string;
    value: string;
};

export const $tags = domain.createStore<Tag[]>([], { name: "$tags" });
sample({
    clock: AppGate.open,
    fn: () => [
        {
            label: "demo",
            value: "tag1",
        },
        {
            label: "x-materials",
            value: "tag2",
        },
        {
            label: "test",
            value: "tag3",
        },
    ],
    target: $tags,
});
