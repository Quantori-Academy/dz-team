import { createFileRoute } from "@tanstack/react-router";

import { ProcurementOfficersPage } from "components/pages/ProcurementOfficersPage";

export const Route = createFileRoute("/_app/_pOfficerLayout/pOfficer")({
    component: () => <ProcurementOfficersPage />,
});
