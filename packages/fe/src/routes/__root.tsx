import { createRootRouteWithContext } from "@tanstack/react-router";
import { App } from "App";

import { UserType } from "api/self";
import { Auth } from "stores/auth";

type MyRouterContext = {
    auth: Auth | null;
    self: UserType | null;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => <App />,
});
