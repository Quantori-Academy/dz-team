import { createFileRoute } from "@tanstack/react-router";

import { getStorageDetail } from "api/storage/storageDetail";
import { StorageDetail } from "components/pages/storage/storageDetail/StorageDetail";

export const Route = createFileRoute("/_app/_researcherLayout/storage/$id")({
    loader: async ({ params }) => await getStorageDetail(params.id),
    component: () => <StorageDetail />,
});
