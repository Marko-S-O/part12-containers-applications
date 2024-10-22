import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Enable polling to ensure Vite detects file changes inside Docker
      usePolling: true,
    },
    // Ensure Vite listens on all network interfaces inside the container
    host: '0.0.0.0',
    port: 5173,  // Use the correct port for Vite development
    strictPort: true,  // Ensure Vite exits if the port is already in use
  },  
})
