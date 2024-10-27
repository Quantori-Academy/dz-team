import { createFileRoute } from "@tanstack/react-router";

import { getReagentsDetailsApi } from "api/reagentDetails/getReagentDetails";
import { ReagentDetailsPage } from "components/pages/app/detailsPage";

export const Route = createFileRoute("/_app/reagents/$id")({
    loader: async ({ params }) => await getReagentsDetailsApi({ id: params.id }),
    component: () => <ReagentDetailsPage />,
});
