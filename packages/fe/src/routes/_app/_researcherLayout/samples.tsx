import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_researcherLayout/samples")({
    component: RouteComponent,
});

function RouteComponent() {
    return "Hello /_app/_researcherLayout/samples!";
}
