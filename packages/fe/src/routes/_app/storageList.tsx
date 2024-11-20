import { createFileRoute } from "@tanstack/react-router";

import { StorageList } from "components/pages/storageList/StorageList";

export const Route = createFileRoute("/_app/storageList")({
    component: () => <StorageList />,
});
