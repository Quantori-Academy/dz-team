import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";

export const Route = createFileRoute("/")({
    component: () => {
        return (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        );
    },
});
