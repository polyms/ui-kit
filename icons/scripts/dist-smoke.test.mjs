import { existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, '../dist/icons')
const built = existsSync(path.join(distDir, 'bold-duotone'))

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

// Only meaningful after `nx build icons`; skipped on a clean checkout instead of failing.
describe.skipIf(!built)('dist layout — publish shape of @polyms/icons', () => {
  it('emits one real module per glyph plus the entry and its declarations', async () => {
    const files = await readdir(path.join(distDir, 'bold-duotone'))

    expect(files).toContain('index.mjs')
    expect(files).toContain('index.d.ts')
    expect(files).toContain('Home.mjs')
    expect(files.filter(name => name.endsWith('.mjs')).length).toBeGreaterThan(1000)
  })

  it('keeps a single glyph importable on its own (tree-shakeable per icon)', async () => {
    const home = await readFile(path.join(distDir, 'bold-duotone/Home.mjs'), 'utf8')

    expect(home).toContain('createIcon')
    expect(home).toContain('export { ')
    // Only the runtime — a glyph module must not drag the barrel or a sibling glyph in.
    expect(home).not.toContain('./Sun.mjs')
  })

  it('never leaks the internal virtual-module marker into published chunks', async () => {
    const files = await readdir(path.join(distDir, 'bold-duotone'))
    const leaks = []

    for (const name of files.filter(file => file.endsWith('.mjs'))) {
      const contents = await readFile(path.join(distDir, 'bold-duotone', name), 'utf8')
      if (contents.includes('\0') || contents.includes('\\0virtual:')) leaks.push(name)
    }

    expect(leaks).toEqual([])
  })
})
