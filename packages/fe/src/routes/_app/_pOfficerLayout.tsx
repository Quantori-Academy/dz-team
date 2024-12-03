import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { rolesRoutes } from "utils/roles";

export const Route = createFileRoute("/_app/_pOfficerLayout")({
    beforeLoad: ({ context }) => {
        if (
            context.auth !== false &&
            context.auth &&
            context.auth.self.role !== UserRole.procurementOfficer
        ) {
            throw redirect({
                to: rolesRoutes[context.auth.self.role],
            });
        }
    },
});
