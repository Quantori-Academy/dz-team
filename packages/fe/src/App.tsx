import "./App.css";
import "./logger/debug-load";

import { Outlet } from "@tanstack/react-router";

import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";

export function App() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
