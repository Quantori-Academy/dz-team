import { lazy, Suspense } from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { App } from "App";

import { config } from "config";
import { AuthStoreValue } from "stores/auth";

const TanStackRouterDevtools = config.isProd
    ? () => null
    : lazy(() =>
          import("@tanstack/router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          })),
      );

type MyRouterContext = {
    auth: AuthStoreValue;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <App />
            <Suspense fallback={null}>
                <TanStackRouterDevtools />
            </Suspense>
        </>
    ),
});
