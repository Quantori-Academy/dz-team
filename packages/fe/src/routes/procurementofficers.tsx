import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { ProcurementOfficersPage } from "components/pages/ProcurementOfficersPage";

export const Route = createFileRoute("/procurementofficers")({
    beforeLoad: ({ context }) => {
        if (
            context.auth !== false &&
            (!context.auth?.token || context.auth?.self.role !== UserRole.procurementOfficer)
        ) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: () => <ProcurementOfficersPage />,
});
