import { createFileRoute, redirect } from "@tanstack/react-router";

import { getReagentRequestDetailsApi } from "api/reagentRequestDetails/getReagentRequestDetails";
import { UserRole } from "api/self";
import { ReagentRequestDetailsPage } from "components/pages/reagentRequestPage/ReagentRequestDetailsPage";
import { rolesRoutes } from "utils/roles";

export const Route = createFileRoute("/_app/reagentRequests/$id")({
    loader: async ({ params }) => await getReagentRequestDetailsApi({ id: params.id }),
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
    component: () => <ReagentRequestDetailsPage url={Route.id} />,
});
