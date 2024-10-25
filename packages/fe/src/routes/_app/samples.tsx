import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/samples")({
    component: () => <div>Hello /samples!</div>,
});
