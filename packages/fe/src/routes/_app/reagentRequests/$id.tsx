import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { getReagentRequestDetailsApi } from "api/reagentRequestDetails/getReagentRequestDetails";
import { ReagentRequestDetailsPage } from "components/pages/reagentRequestPage/ReagentRequestDetailsPage";
import { useSession } from "hooks/useSession";
import { rolesRoutes } from "utils/roles";

export const Route = createFileRoute("/_app/reagentRequests/$id")({
    loader: async ({ params }) => await getReagentRequestDetailsApi({ id: params.id }),
    /* eslint-disable react-hooks/rules-of-hooks */
    component: () => {
        const navigate = useNavigate();
        const { session, isProcurementOfficer, isResearcher } = useSession();
        if (isProcurementOfficer || isResearcher) {
            return <ReagentRequestDetailsPage url={Route.id} />;
        } else {
            navigate({
                to: session ? rolesRoutes[session] : "/",
            });
            return null;
        }
    },
});
