import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weekind - Make your habits, make your world',
        short_name: 'Weekind',
        description: 'Make your habits, make your world - Aplicativo de bem-estar para rastreamento de hábitos semanais',
        theme_color: '#0ea5e9',
        background_color: '#f0f9ff',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: '/weekind/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})