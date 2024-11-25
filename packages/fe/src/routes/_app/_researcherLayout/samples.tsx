import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_researcherLayout/samples")({
    component: () => <div>hello samples</div>,
});
