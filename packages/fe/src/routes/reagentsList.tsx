import { createFileRoute } from "@tanstack/react-router";

import { ReagentsListPage } from "components/ReagentsListPage";
export const Route = createFileRoute("/reagentsList")({
    component: () => <ReagentsListPage />,
});
