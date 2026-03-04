import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["jana5000.merinasib.shop"], // Only allow this host
    host: "0.0.0.0", // Listen on all interfaces, making it accessible externally
    port: 5173, // Set your desired port
    strictPort: true, // Ensure the port is strictly bound
    cors: true, // Enable CORS if necessary for external access
  },
});
