import { createFileRoute } from "@tanstack/react-router";

import { NewUser } from "components/pages/newUser/NewUser";

export const Route = createFileRoute("/_app/_adminLayout/newUser")({
    component: () => <NewUser />,
});
