import { createFileRoute, redirect } from "@tanstack/react-router";

import { Layout } from "components/pages/app/layout";

export const Route = createFileRoute("/_app")({
    beforeLoad: ({ context }) => {
        if (context.auth !== false && !context.auth?.token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: () => <Layout />,
});
