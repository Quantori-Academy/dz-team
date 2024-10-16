import TanStackRouterVite from "@tanstack/router-plugin/vite";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        TanStackRouterVite(),
        svgr({ include: "**/*.svg?react" }),
    ],
    // build: { chunkSizeWarningLimit: 1000 },
    server: { port: 3000, open: true },
});
