import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  server: {
    proxy: {
      "/api/location": {
        target:
          "https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/location/, ""),
        secure: false,
      },
    },
  },
});
