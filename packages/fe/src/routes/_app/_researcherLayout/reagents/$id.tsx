import { createFileRoute } from "@tanstack/react-router";

import { getReagentsDetailsApi } from "api/reagentDetails/getReagentDetails";
import { ReagentDetailsPage } from "components/pages/ReagentsPage/details";

export const Route = createFileRoute("/_app/_researcherLayout/reagents/$id")({
    loader: async ({ params }) => await getReagentsDetailsApi({ id: params.id }),
    component: () => <ReagentDetailsPage />,
});
