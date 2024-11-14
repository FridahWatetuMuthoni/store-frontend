import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://store-backend-7tlk.onrender.com",
  //       changeOrigin: true, // changes the origin of the host header to the target URL
  //       secure: false, // if you encounter issues with self-signed certificates
  //       rewrite: (path) => path.replace(/^\/api/, ""), // rewrites /api to the backend path if needed
  //     },
  //   },
  // },
});
