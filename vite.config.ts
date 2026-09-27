import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = process.env.PORT ? Number(process.env.PORT) : undefined

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port,
    strictPort: port !== undefined,
  },
})
