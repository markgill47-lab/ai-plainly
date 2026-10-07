import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the built deck can be hosted from any
// subpath without reconfiguring.
export default defineConfig({
  plugins: [react()],
  base: './',
})
