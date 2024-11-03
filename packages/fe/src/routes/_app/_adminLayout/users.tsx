import { createFileRoute } from "@tanstack/react-router";

import { UserList } from "components/pages/users/UserList";

export const Route = createFileRoute("/_app/_adminLayout/users")({
    component: () => <UserList />,
});
