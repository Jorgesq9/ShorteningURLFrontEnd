import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/shortUrls": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/shortUrls/, ""),
      },
    },
    // Asegúrate de que el servidor de Vite sirve index.html para rutas no reconocidas para permitir el enrutamiento del lado del cliente
    historyApiFallback: true,
  },
});
