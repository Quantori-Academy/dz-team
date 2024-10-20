import { createFileRoute } from "@tanstack/react-router";

import { ReagentContract } from "api/contracts";
import { ReagentDetailsPage } from "components/pages/app/detailsPage";

import { base, request } from "../../../api/request";

export const Route = createFileRoute("/_app/reagents/$id")({
    loader: async ({ params }) => {
        const reagentId = Number(params.id);
        const reagent = await request(`${base}/reagents/${reagentId}`, ReagentContract);
        return { reagent };
    },
    component: () => <ReagentDetailsPage />,
});
