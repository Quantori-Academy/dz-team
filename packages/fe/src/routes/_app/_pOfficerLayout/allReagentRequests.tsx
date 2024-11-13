import { createFileRoute } from "@tanstack/react-router";

import { ReagentRequestPage } from "components/pages/reagentRequestPage/ReagentRequestPage";

export const Route = createFileRoute("/_app/_pOfficerLayout/allReagentRequests")({
    component: () => <ReagentRequestPage />,
});
