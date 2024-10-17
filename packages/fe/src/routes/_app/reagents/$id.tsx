import { createFileRoute } from "@tanstack/react-router";

import { ReagentDetailsPage } from "components/pages/app/detailsPage";
import { request } from "components/pages/app/detailsPage/mockData";

export const Route = createFileRoute("/_app/reagents/$id")({
    loader: async ({ params }) => {
        const reagentId = Number(params.id);
        const reagent = await request(reagentId);
        return { reagent };
    },
    component: () => <ReagentDetailsPage />,
});
