// vite.config.ts
import TanStackRouterVite from "file:///C:/Users/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C/Desktop/programming/quantory_luna/dz-team/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import react from "file:///C:/Users/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C/Desktop/programming/quantory_luna/dz-team/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C/Desktop/programming/quantory_luna/dz-team/node_modules/vite/dist/node/index.js";
import svgr from "file:///C:/Users/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C/Desktop/programming/quantory_luna/dz-team/node_modules/vite-plugin-svgr/dist/index.js";
import viteTsconfigPaths from "file:///C:/Users/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C/Desktop/programming/quantory_luna/dz-team/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    TanStackRouterVite(),
    svgr({ include: "**/*.svg?react" })
  ],
  // build: { chunkSizeWarningLimit: 1000 },
  server: { port: 3e3, open: true }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcXFxcRGVza3RvcFxcXFxwcm9ncmFtbWluZ1xcXFxxdWFudG9yeV9sdW5hXFxcXGR6LXRlYW1cXFxccGFja2FnZXNcXFxcZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1MDQxRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1xcXFxEZXNrdG9wXFxcXHByb2dyYW1taW5nXFxcXHF1YW50b3J5X2x1bmFcXFxcZHotdGVhbVxcXFxwYWNrYWdlc1xcXFxmZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUQwJTlGJUQwJUJFJUQwJUJCJUQxJThDJUQwJUI3JUQwJUJFJUQwJUIyJUQwJUIwJUQxJTgyJUQwJUI1JUQwJUJCJUQxJThDL0Rlc2t0b3AvcHJvZ3JhbW1pbmcvcXVhbnRvcnlfbHVuYS9kei10ZWFtL3BhY2thZ2VzL2ZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IFRhblN0YWNrUm91dGVyVml0ZSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZVwiO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcbmltcG9ydCB2aXRlVHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlYWN0KCksXG4gICAgICAgIHZpdGVUc2NvbmZpZ1BhdGhzKCksXG4gICAgICAgIFRhblN0YWNrUm91dGVyVml0ZSgpLFxuICAgICAgICBzdmdyKHsgaW5jbHVkZTogXCIqKi8qLnN2Zz9yZWFjdFwiIH0pLFxuICAgIF0sXG4gICAgLy8gYnVpbGQ6IHsgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwIH0sXG4gICAgc2VydmVyOiB7IHBvcnQ6IDMwMDAsIG9wZW46IHRydWUgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpZSxPQUFPLHdCQUF3QjtBQUVoZ0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sVUFBVTtBQUNqQixPQUFPLHVCQUF1QjtBQUc5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixrQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQixLQUFLLEVBQUUsU0FBUyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3RDO0FBQUE7QUFBQSxFQUVBLFFBQVEsRUFBRSxNQUFNLEtBQU0sTUFBTSxLQUFLO0FBQ3JDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
