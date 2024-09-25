import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import NotFound from "not-found";
import { routeTree } from "routeTree.gen.ts";

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
