import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ isSsrBuild }) => ({
  base: '/lp-guia-primeiro-imovel/',
  plugins: [react()],
  build: isSsrBuild
    ? { copyPublicDir: false }
    : {
        outDir: 'docs',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: resolve(root, 'index.html'),
            obrigado: resolve(root, 'obrigado/index.html'),
          },
        },
      },
  test: {
    environment: 'node',
  },
}))
