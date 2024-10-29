import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { AdminPage } from "components/pages/AdminPage";

export const Route = createFileRoute("/admin")({
    beforeLoad: ({ context }) => {
        if (
            context.auth !== false &&
            (!context.auth?.token || context.auth?.self.role !== UserRole.admin)
        ) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: () => <AdminPage />,
});
