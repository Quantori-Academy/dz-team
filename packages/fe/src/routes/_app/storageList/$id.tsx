import { createFileRoute } from "@tanstack/react-router";

import { getStorageDetail } from "api/storage/storageDetail";
import { StorageDetailPage } from "components/pages/storage/storageDetail/StorageDetailPage";

export const Route = createFileRoute("/_app/storageList/$id")({
    loader: async ({ params }) => await getStorageDetail(params.id),
    component: () => <StorageDetailPage />,
});
