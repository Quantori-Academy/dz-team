import { createFileRoute } from "@tanstack/react-router";

import { ReagentRequestPage } from "../../../components/pages/reagentRequestPage/ReagentRequestPage";

export const Route = createFileRoute("/_app/_researcherLayout/myReagentRequests")({
    component: () => <ReagentRequestPage />,
});
