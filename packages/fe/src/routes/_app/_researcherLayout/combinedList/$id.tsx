import { createFileRoute } from "@tanstack/react-router";

import { getSampleDetail } from "api/combinedList/getSampleDetail";
import { SampleDetailPage } from "components/pages/combinedList/SampleDetailPage";

export const Route = createFileRoute("/_app/_researcherLayout/combinedList/$id")({
    loader: async ({ params }) => await getSampleDetail({ id: params.id }),
    component: () => <SampleDetailPage />,
});
