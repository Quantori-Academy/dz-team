import { createFileRoute } from "@tanstack/react-router";

import { StorageDetail } from "components/pages/storage/storageDetail/StorageDetail";

export const Route = createFileRoute("/_app/_researcherLayout/storageDetail")({
    component: () => (
        <div>
            <StorageDetail />
        </div>
    ),
});
