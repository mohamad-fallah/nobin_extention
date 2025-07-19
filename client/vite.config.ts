import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep the original path structure for images and fonts
          if (
            assetInfo.name &&
            (assetInfo.name.endsWith(".png") ||
              assetInfo.name.endsWith(".jpg") ||
              assetInfo.name.endsWith(".jpeg") ||
              assetInfo.name.endsWith(".gif") ||
              assetInfo.name.endsWith(".webp") ||
              assetInfo.name.endsWith(".woff2"))
          ) {
            return "[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  publicDir: "public",
  base: "./",
});
