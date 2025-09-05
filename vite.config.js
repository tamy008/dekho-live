import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      port: 5173,
      host: "0.0.0.0",
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
})
