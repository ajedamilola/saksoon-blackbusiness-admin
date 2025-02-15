import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://skbb.net-trix.ca",
        // target: "http://localhost:3002",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", "/")
      }
    }
  }
})
