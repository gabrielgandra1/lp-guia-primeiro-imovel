import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'docs')
const ssrDir = join(root, '.ssr-build')
const placeholder = '<div id="root"></div>'

const { pages } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

for (const [file, render] of Object.entries(pages)) {
  const target = join(outDir, file)
  const html = readFileSync(target, 'utf8')
  if (!html.includes(placeholder)) throw new Error(`Marcador do React não encontrado em ${file}`)
  writeFileSync(target, html.replace(placeholder, `<div id="root">${render()}</div>`))
  console.log(`Pré-renderizado: docs/${file}`)
}

rmSync(ssrDir, { recursive: true, force: true })
