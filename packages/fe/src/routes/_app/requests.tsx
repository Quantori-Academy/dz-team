import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/requests")({
    component: () => <div>Hello /requests!</div>,
});
