import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_pOfficerLayout/pOfficer")({
    component: () => <div>Hello, officer!</div>,
});
