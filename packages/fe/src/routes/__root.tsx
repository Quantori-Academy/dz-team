import { createRootRouteWithContext } from "@tanstack/react-router";
import { App } from "App";

import { Auth } from "stores/auth";

type MyRouterContext = {
    auth: Auth | null;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => <App />,
});
