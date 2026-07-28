#!/usr/bin/env node
/**
 * Emits `icons/types/bold-duotone.d.ts` — the one generated artifact that lives in the repo,
 * because TypeScript cannot express "every glyph name" without listing them. Glyph *modules*
 * stay virtual (see `plugins/icons-virtual.plugin.ts`); this file only types the public entry
 * for `tsc`, editors, and the `@polyms/icons/bold-duotone` path mapping.
 *
 * Usage: node scripts/generate-types.mjs  (Nx target `icons:types`)
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { listIconEntries, renderEntryTypes } from '../plugins/icon-source.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const { entries, errors } = await listIconEntries({
  polymsDir: path.join(root, 'svg/polyms'),
  solarDir: path.join(root, 'svg/solar'),
})

if (errors.length > 0) {
  console.error(`[icons:types] ${errors.length} error(s):`)
  for (const message of errors) console.error(`  - ${message}`)
  process.exit(1)
}

const outFile = path.join(root, 'types/bold-duotone.d.ts')
await mkdir(path.dirname(outFile), { recursive: true })
await writeFile(
  outFile,
  renderEntryTypes({
    createIconSpecifier: '../src/createIcon',
    names: entries.map(entry => entry.name),
    storeSpecifier: '../src/icon-store',
  }),
  'utf8'
)

console.log(`[icons:types] wrote ${entries.length} declaration(s) -> types/bold-duotone.d.ts`)
