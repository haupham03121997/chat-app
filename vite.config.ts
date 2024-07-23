import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@modules', replacement: '/src/modules' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@context', replacement: '/src/context' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@interfaces', replacement: '/src/interfaces' },
      { find: '@services', replacement: '/src/services' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@themes', replacement: '/src/themes' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@libs', replacement: '/src/libs' }
    ]
  }
})
