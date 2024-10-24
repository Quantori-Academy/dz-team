import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { NotFound } from "NotFound";
import { routeTree } from "routeTree.gen.ts";

import { $auth } from "stores/auth";

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
    },
});

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error("No root element found with id 'root'");
}

export function Root() {
    const auth = useUnit($auth);
    return (
        <StrictMode>
            <RouterProvider router={router} context={{ auth }} />
        </StrictMode>
    );
}

createRoot(rootEl).render(<Root />);
