import { createFileRoute } from "@tanstack/react-router";

import { DevPage } from "components/DevPage";

export const Route = createFileRoute("/_app/dev")({
    component: () => <DevPage />,
});
