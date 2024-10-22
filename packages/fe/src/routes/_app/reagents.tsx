import { createFileRoute } from "@tanstack/react-router";

import { ReagentsListPage } from "components/pages/ReagentsPage/ReagentsListPage";
export const Route = createFileRoute("/_app/reagents")({
    component: () => <ReagentsListPage />,
});
