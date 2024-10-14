import { createFileRoute } from "@tanstack/react-router";

import { DevPage } from "components/pages/app/dev";

export const Route = createFileRoute("/_app/dev")({
    component: () => <DevPage />,
});
