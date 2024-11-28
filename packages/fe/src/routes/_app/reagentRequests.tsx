import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { ReagentRequestPage } from "components/pages/reagentRequestPage/ReagentRequestPage";
import { rolesRoutes } from "utils/roles";

export const Route = createFileRoute("/_app/reagentRequests")({
    beforeLoad: ({ context }) => {
        if (
            context.auth &&
            context.auth.self.role !== UserRole.procurementOfficer &&
            context.auth.self.role !== UserRole.researcher
        ) {
            throw redirect({
                to: rolesRoutes[context.auth.self.role],
            });
        }
    },
    component: () => <ReagentRequestPage />,
});
