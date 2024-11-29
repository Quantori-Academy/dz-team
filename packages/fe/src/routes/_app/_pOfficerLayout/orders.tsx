import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_pOfficerLayout/orders")({
    component: () => <div>Hello /orders!</div>,
});
