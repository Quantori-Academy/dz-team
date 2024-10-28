import { createRootRouteWithContext } from "@tanstack/react-router";
import { App } from "App";

import { AuthStoreValue } from "stores/auth";

type MyRouterContext = {
    auth: AuthStoreValue;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => <App />,
});
