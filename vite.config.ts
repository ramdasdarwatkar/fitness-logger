import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/fitness-logger/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Fitness Logger",
        short_name: "Fitness",
        description: "Track workouts and progress",
        theme_color: "#0f172a",
        background_color: "#020617",
        display: "standalone",
        start_url: "/fitness-logger/",
        icons: [
          {
            src: "/fitness-logger/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/fitness-logger/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/fitness-logger/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
