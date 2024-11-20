import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ReagentRequestPage } from "components/pages/reagentRequestPage/ReagentRequestPage";
import { useSession } from "hooks/useSession";
import { rolesRoutes } from "utils/roles";

export const Route = createFileRoute("/_app/reagentRequests")({
    /* eslint-disable react-hooks/rules-of-hooks */
    component: () => {
        const navigate = useNavigate();
        const { session, isProcurementOfficer, isResearcher } = useSession();
        if (isProcurementOfficer || isResearcher) {
            return <ReagentRequestPage />;
        } else {
            navigate({
                to: session ? rolesRoutes[session] : "/",
            });
            return null;
        }
    },
});
