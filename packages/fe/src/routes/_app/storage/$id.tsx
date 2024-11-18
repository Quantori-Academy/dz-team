import { createFileRoute } from "@tanstack/react-router";

import { getStorageDetail } from "api/storage/storageDetail";
import { StorageDetail } from "components/pages/storage/storageDetail/StorageDetail";
import { StorageDetailAdmin } from "components/pages/storage/storageDetail/StorageDetailAdmin";
import { useSession } from "hooks/useSession";

export const Route = createFileRoute("/_app/storage/$id")({
    loader: async ({ params }) => await getStorageDetail(params.id),
    /* eslint-disable react-hooks/rules-of-hooks */
    component: () => {
        const { isAdmin } = useSession();

        if (isAdmin) {
            return <StorageDetailAdmin />;
        } else {
            return <StorageDetail />;
        }
    },
    /* eslint-enable react-hooks/rules-of-hooks */
});
