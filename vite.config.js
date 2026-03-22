import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let visualizerPlugin = null

if (process.env.ANALYZE === 'true') {
  try {
    const { visualizer } = await import('rollup-plugin-visualizer')
    visualizerPlugin = visualizer({
      filename: 'dist/bundle-analysis.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      open: false
    })
  } catch {
    visualizerPlugin = {
      name: 'bundle-analysis-fallback',
      generateBundle(_options, bundle) {
        const rows = Object.values(bundle)
          .filter((chunk) => chunk.type === 'chunk' || chunk.type === 'asset')
          .map((chunk) => ({
            fileName: chunk.fileName,
            size: chunk.type === 'asset' ? String(chunk.source || '').length : chunk.code.length
          }))
          .sort((a, b) => b.size - a.size)

        const tableRows = rows
          .map(
            (row) =>
              `<tr><td style=\"padding:6px 10px;border-bottom:1px solid #d8dee9;\">${row.fileName}</td><td style=\"padding:6px 10px;border-bottom:1px solid #d8dee9;text-align:right;\">${(
                row.size / 1024
              ).toFixed(2)} KB</td></tr>`
          )
          .join('')

        this.emitFile({
          type: 'asset',
          fileName: 'bundle-analysis.html',
          source: `<!doctype html><html><head><meta charset=\"utf-8\" /><title>Bundle Analysis</title></head><body style=\"font-family:Arial,sans-serif;padding:24px;\"><h1>Bundle Analysis (Fallback)</h1><p>Install rollup-plugin-visualizer for treemap output.</p><table style=\"border-collapse:collapse;min-width:520px;\"><thead><tr><th style=\"text-align:left;padding:6px 10px;border-bottom:2px solid #94a3b8;\">File</th><th style=\"text-align:right;padding:6px 10px;border-bottom:2px solid #94a3b8;\">Size</th></tr></thead><tbody>${tableRows}</tbody></table></body></html>`
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), visualizerPlugin].filter(Boolean),
  base: process.env.VITE_BASE_PATH || '/'
})
