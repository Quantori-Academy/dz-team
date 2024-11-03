import { createFileRoute } from "@tanstack/react-router";

// import { AdminPage } from "components/pages/AdminPage";
import { StorageList } from "components/pages/storage/StorageList";

export const Route = createFileRoute("/_app/_adminLayout/admin")({
    component: () => <StorageList />,
});
