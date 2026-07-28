import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.join(__dirname, '../..')

const FORBIDDEN = [/@hugeicons\//, /@solar-icons\//, /cdn\.hugeicons\.com/i]

const SCAN_DIRS = ['web/src', 'ui-kit/src', 'ui-kit/skills']
const SCAN_FILES = ['package.json', 'web/package.json', 'ui-kit/package.json', 'icons/package.json']
const IGNORE_DIRNAMES = new Set(['node_modules', 'dist', '.git', '.cache'])

// ── Helpers ─────────────────────────────────────────────────────────────────────────────────────────────────

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (IGNORE_DIRNAMES.has(entry.name)) continue
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (/\.(ts|tsx|js|jsx|mjs|md|json)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function findViolations(filePath, contents) {
  const violations = []
  for (const pattern of FORBIDDEN) {
    if (pattern.test(contents)) {
      violations.push(`${filePath}: matches ${pattern}`)
    }
  }
  return violations
}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('monorepo migrate gate — no hugeicons/solar-icons leftovers', () => {
  it('has zero @hugeicons / @solar-icons imports or cdn.hugeicons.com references in runtime source + skills', async () => {
    const files = []
    for (const dir of SCAN_DIRS) {
      files.push(...(await walk(path.join(workspaceRoot, dir))))
    }

    const violations = []
    for (const filePath of files) {
      const contents = await readFile(filePath, 'utf8')
      violations.push(...findViolations(path.relative(workspaceRoot, filePath), contents))
    }

    expect(violations).toEqual([])
  })

  it('has zero @hugeicons / @solar-icons dependencies in any package.json', async () => {
    const violations = []
    for (const relPath of SCAN_FILES) {
      const filePath = path.join(workspaceRoot, relPath)
      const contents = await readFile(filePath, 'utf8')
      const pkg = JSON.parse(contents)
      const deps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
      }

      for (const name of Object.keys(deps)) {
        if (name.startsWith('@hugeicons/') || name.startsWith('@solar-icons/')) {
          violations.push(`${relPath}: forbidden dependency "${name}"`)
        }
      }
    }

    expect(violations).toEqual([])
  })
})
