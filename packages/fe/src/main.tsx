import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { NotFound } from "NotFound";
import { routeTree } from "routeTree.gen.ts";

import { $auth } from "stores/auth";
import { $selfState } from "stores/self";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <NotFound />,
    context: {
        auth: undefined!,
        self: undefined!,
    },
});

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error("No root element found with id 'root'");
}

export function Root() {
    const auth = useUnit($auth);
    const self = useUnit($selfState);
    return (
        <StrictMode>
            <RouterProvider router={router} context={{ auth, self }} />
        </StrictMode>
    );
}

createRoot(rootEl).render(<Root />);
