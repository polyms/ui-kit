import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { listIconEntries } from '../plugins/icon-source.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('icons layout gate — glyph modules stay virtual', () => {
  it('keeps src/ hand-written: no bold-duotone/ folder, no generated glyph modules', async () => {
    const entries = await readdir(path.join(root, 'src'), {
      recursive: true,
      withFileTypes: true,
    })
    const names = entries.map(entry => entry.name)

    expect(names).not.toContain('bold-duotone')

    const generated = []
    for (const entry of entries) {
      if (!entry.isFile() || !/\.tsx?$/.test(entry.name)) continue
      const filePath = path.join(entry.parentPath ?? entry.path, entry.name)
      const contents = await readFile(filePath, 'utf8')
      if (contents.includes('AUTO-GENERATED') || contents.includes('never written to src/')) {
        generated.push(path.relative(root, filePath))
      }
    }

    expect(generated).toEqual([])
  })

  it('ships entry declarations that match the SVG sources (run `nx run icons:types` after adding one)', async () => {
    const { entries, errors } = await listIconEntries({
      polymsDir: path.join(root, 'svg/polyms'),
      solarDir: path.join(root, 'svg/solar'),
    })

    expect(errors).toEqual([])

    // Compare declared names, not bytes: the committed file passes through the repo formatter.
    const declarations = await readFile(path.join(root, 'types/bold-duotone.d.ts'), 'utf8')
    const declared = [...declarations.matchAll(/export declare const (\w+):/g)].map(match => match[1])

    expect(declared).toEqual(entries.map(entry => entry.name))
    expect(declarations).toMatch(/export type \{[^}]*IconProps[^}]*\} from '\.\.\/src\/createIcon'/)
    expect(declarations).toMatch(/export \{[^}]*setIconDefaults[^}]*\} from '\.\.\/src\/icon-store'/)
  })
})
