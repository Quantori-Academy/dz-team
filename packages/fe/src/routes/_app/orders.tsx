import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/orders")({
    component: () => <div>Hello /orders!</div>,
});
