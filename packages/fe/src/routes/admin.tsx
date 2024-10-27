import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { AdminPage } from "components/pages/AdminPage";

export const Route = createFileRoute("/admin")({
    component: () => <AdminPage />,
    beforeLoad: ({ context }) => {
        if (!context.auth?.token || context.self?.role !== UserRole.admin) {
            throw redirect({
                to: "/login",
            });
        }
    },
});
