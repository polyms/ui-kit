import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('provenance + LICENSE', () => {
  it('vendors the full BoldDuotone Solar catalog under svg/solar/ (not a curated subset)', async () => {
    const files = await readdir(path.join(root, 'svg/solar'))
    const svgFiles = files.filter(name => name.endsWith('.svg'))
    // Upstream Solar BoldDuotone ships ~1200+ glyphs — assert the full catalog, not a hand-picked few.
    expect(svgFiles.length).toBeGreaterThan(1000)
  })

  it('keeps svg/polyms/ separate from svg/solar/ provenance', async () => {
    const solar = new Set(await readdir(path.join(root, 'svg/solar')))
    const polyms = (await readdir(path.join(root, 'svg/polyms'))).filter(name => name.endsWith('.svg'))

    for (const file of polyms) {
      expect(solar.has(file)).toBe(false)
    }
  })

  it('LICENSE has CC BY 4.0 attribution for Solar / 480 Design', async () => {
    const license = await readFile(path.join(root, 'LICENSE'), 'utf8')
    expect(license).toMatch(/CC BY 4\.0|Creative Commons Attribution 4\.0/i)
    expect(license).toMatch(/480 Design/i)
    expect(license).toMatch(/Solar Icons/i)
  })

  it('LICENSE does not attribute or link to cdn.hugeicons.com', async () => {
    const license = await readFile(path.join(root, 'LICENSE'), 'utf8')
    expect(license).not.toMatch(/cdn\.hugeicons\.com/i)
  })
})
