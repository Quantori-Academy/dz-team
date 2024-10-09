import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { NotFound } from "NotFound";
import { routeTree } from "routeTree.gen.ts";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <NotFound />,
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
