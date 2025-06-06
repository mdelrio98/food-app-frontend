import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  // Vamos a comentar la configuración global de esbuild por ahora
  /*
  esbuild: {
    loader: 'jsx',
    include: [
      /src\/.*\.jsx?$/, 
    ],
  },
  */
  server: {
    port: 3000,
    open: true,
  }
})
