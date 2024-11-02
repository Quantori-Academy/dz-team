import TanStackRouterVite from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/

// DEFAULT CONFIG
// export default defineConfig({
//     plugins: [
//         react(),
//         viteTsconfigPaths(),
//         TanStackRouterVite(),
//         svgr({ include: "**/*.svg?react" }),
//     ],
//     // build: { chunkSizeWarningLimit: 1000 },
//     server: { port: 3000, open: true },
// });

// FOR DEMO ONLY (adds a proxy)
export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        TanStackRouterVite(),
        svgr({ include: "**/*.svg?react" }),
    ],
    build: { chunkSizeWarningLimit: 1000 },
    server: {
        port: 3000,
        open: true,
        proxy: {
            "/api/v1": {
                target: "http://127.0.0.1:1337",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
