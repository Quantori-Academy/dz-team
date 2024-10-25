import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import TanStackRouterVite from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
    // these variables are added to window by Vite, we don't want to expose them
    const define = process.env.VITE_USE_MOCK_DATA
        ? { VITE_USE_MOCK_DATA: process.env.VITE_USE_MOCK_DATA }
        : {};
    return {
        define,
        plugins: [
            react(),
            viteTsconfigPaths(),
            TanStackRouterVite(),
            svgr({ include: "**/*.svg?react" }),
        ],
        // build: { chunkSizeWarningLimit: 1000 },
        server: { port: 3000, open: true },
    };
});
