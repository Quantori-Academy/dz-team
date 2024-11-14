import { createFileRoute } from "@tanstack/react-router";

import { getReagentRequestDetailsApi } from "api/reagentRequestDetails/getReagentRequestDetails";
import { ReagentRequestDetailsPage } from "components/pages/reagentRequestPage/ReagentRequestDetailsPage";

export const Route = createFileRoute("/_app/_researcherLayout/reagentRequests/$id")({
    loader: async ({ params }) => await getReagentRequestDetailsApi({ id: params.id }),
    component: () => <ReagentRequestDetailsPage url={Route.id} />,
});
