import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { rolesRoutes } from "utils/rolesRoutes";

export const Route = createFileRoute("/_app/_adminLayout")({
    beforeLoad: ({ context }) => {
        if (context.auth !== false && context.auth && context.auth.self.role !== UserRole.admin) {
            throw redirect({
                to: rolesRoutes[context.auth.self.role],
            });
        }
    },
});
