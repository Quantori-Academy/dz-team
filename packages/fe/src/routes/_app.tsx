import { createFileRoute, redirect } from "@tanstack/react-router";

import { UserRole } from "api/self";
import { Layout } from "components/pages/app/layout";

export const Route = createFileRoute("/_app")({
    beforeLoad: ({ context }) => {
        if (
            context.auth !== false &&
            (!context.auth?.token || context.auth?.self.role !== UserRole.researcher)
        ) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: () => <Layout />,
});
