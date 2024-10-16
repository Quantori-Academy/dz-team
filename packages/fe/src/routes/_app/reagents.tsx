import { createFileRoute } from "@tanstack/react-router";

import { ReagentDetailsPage } from "components/pages/app/detailsPage";

export const Route = createFileRoute("/_app/reagents")({
    component: () => <ReagentDetailsPage />,
});
