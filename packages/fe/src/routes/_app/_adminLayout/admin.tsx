import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_adminLayout/admin")({
    component: () => <div>Hello, Admin!</div>,
});
