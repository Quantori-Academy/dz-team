import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/storage")({
    component: () => <div>Hello /storage!</div>,
});
