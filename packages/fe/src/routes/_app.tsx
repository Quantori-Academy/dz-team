import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "components/pages/app/layout";

export const Route = createFileRoute("/_app")({
    component: () => <Layout />,
});
