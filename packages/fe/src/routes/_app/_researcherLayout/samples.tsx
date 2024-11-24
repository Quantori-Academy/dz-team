import { createFileRoute } from "@tanstack/react-router";

import { SamplesList } from "components/pages/samples/SamplesList";

export const Route = createFileRoute("/_app/_researcherLayout/samples")({
    component: () => (
        <div>
            <SamplesList />
        </div>
    ),
});
