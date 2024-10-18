import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reagents")({
    component: () => <div>Hello /reagents!</div>,
});
