import { createFileRoute } from "@tanstack/react-router";
import * as rt from "runtypes";

import { ReagentDetailsPage } from "components/pages/app/detailsPage";

import { request } from "../../../api/request";

export const ReagentContract = rt.Record({
    id: rt.Number,
    name: rt.String,
    category: rt.String,
    description: rt.String,
    casNumber: rt.String,
    producer: rt.String,
    catalogId: rt.String,
    catalogLink: rt.String,
    pricePerUnit: rt.Number,
    quantity: rt.Number,
    units: rt.String,
});

export const Route = createFileRoute("/_app/reagents/$id")({
    loader: async ({ params }) => {
        const reagentId = Number(params.id);
        const reagent = await request(`${reagentId}`, ReagentContract);
        // const reagent = await request(reagentId);
        return { reagent };
    },
    component: () => <ReagentDetailsPage />,
});
