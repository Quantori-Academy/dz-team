import { createFileRoute } from "@tanstack/react-router";

import { CombinedListPage } from "components/pages/combinedList/CombinedListPage";

export const Route = createFileRoute("/_app/_researcherLayout/reagents")({
    component: () => <CombinedListPage />,
});
