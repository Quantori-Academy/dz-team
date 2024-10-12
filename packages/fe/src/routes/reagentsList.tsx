import { createFileRoute } from "@tanstack/react-router";

import { ReagentsListPage } from "components/ReagentsPage/ReagentsListPage";
export const Route = createFileRoute("/reagentsList")({
    component: () => <ReagentsListPage />,
});
