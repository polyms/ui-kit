import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

import {
  ENTRY_SPECIFIER,
  listIconEntries,
  readIconNodes,
  renderEntryModule,
  renderEntryTypes,
  renderGlyphModule,
  VIRTUAL_ENTRY,
  VIRTUAL_GLYPH_PREFIX,
} from './icon-source.mjs'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type IconEntry = {
  name: string
  provenance: 'solar' | 'polyms'
  filePath: string
}

type PolymsIconsOptions = {
  /** Absolute path to the `icons/` project root. Defaults to the project this plugin ships in. */
  root?: string
  /**
   * Publishing build of `@polyms/icons` itself: emit `bold-duotone/index.d.ts` and keep the NUL
   * marker of virtual ids out of the shipped chunks. Consumers (web, vitest) leave this off.
   */
  library?: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

const RESOLVED_ENTRY = `\0${VIRTUAL_ENTRY}`
const RESOLVED_GLYPH_PREFIX = `\0${VIRTUAL_GLYPH_PREFIX}`
const DEFAULT_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Output path of the generated entry declarations, relative to the bundle root. */
export const ENTRY_TYPES_FILE = 'bold-duotone/index.d.ts'

/**
 * Bundle path for a virtual module, so `preserveModules` output never leaks a `\0virtual:` id.
 * Returns `undefined` for real source files, which the build config names on its own.
 */
export function iconOutputFileName(moduleId: string): string | undefined {
  if (moduleId === RESOLVED_ENTRY) return 'bold-duotone/index.mjs'
  if (moduleId.startsWith(RESOLVED_GLYPH_PREFIX)) {
    return `bold-duotone/${moduleId.slice(RESOLVED_GLYPH_PREFIX.length)}.mjs`
  }
  return undefined
}

// ── Plugin ─────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Serves `@polyms/icons/bold-duotone` (and `@polyms/icons/bold-duotone/<Name>`) as virtual modules
 * built from `svg/solar/` + `svg/polyms/`, so no glyph component is ever generated into `src/`.
 * The library build turns the same virtual graph into real per-glyph files under `dist/`.
 */
export function polymsIcons({ root = DEFAULT_ROOT, library = false }: PolymsIconsOptions = {}): Plugin {
  const srcDir = path.join(root, 'src')
  const runtimeSpecifier = path.join(srcDir, 'createIcon.tsx')
  const storeSpecifier = path.join(srcDir, 'icon-store.ts')
  const solarDir = path.join(root, 'svg/solar')
  const polymsDir = path.join(root, 'svg/polyms')

  let cache: Promise<Map<string, IconEntry>> | undefined

  function loadEntries() {
    cache ??= listIconEntries({ polymsDir, solarDir }).then(({ entries, errors }) => {
      if (errors.length > 0) throw new Error(`[polyms-icons] ${errors.join('; ')}`)
      return new Map(entries.map(entry => [entry.name, entry]))
    })
    return cache
  }

  function glyphName(id: string) {
    if (id.startsWith(RESOLVED_GLYPH_PREFIX)) return id.slice(RESOLVED_GLYPH_PREFIX.length)
    if (id.startsWith(VIRTUAL_GLYPH_PREFIX)) return id.slice(VIRTUAL_GLYPH_PREFIX.length)
    if (id.startsWith(`${ENTRY_SPECIFIER}/`)) return id.slice(ENTRY_SPECIFIER.length + 1)
    return undefined
  }

  return {
    name: 'polyms-icons',
    enforce: 'pre',

    resolveId(id) {
      if (id === ENTRY_SPECIFIER || id === VIRTUAL_ENTRY || id === RESOLVED_ENTRY) {
        return { id: RESOLVED_ENTRY, moduleSideEffects: false }
      }

      const name = glyphName(id)
      if (name)
        return {
          id: `${RESOLVED_GLYPH_PREFIX}${name}`,
          moduleSideEffects: false,
        }

      return undefined
    },

    async load(id) {
      if (id === RESOLVED_ENTRY) {
        const entries = await loadEntries()
        return renderEntryModule({
          names: [...entries.keys()],
          storeSpecifier,
        })
      }

      if (!id.startsWith(RESOLVED_GLYPH_PREFIX)) return undefined

      const name = id.slice(RESOLVED_GLYPH_PREFIX.length)
      const entries = await loadEntries()
      const entry = entries.get(name)
      if (!entry) throw new Error(`[polyms-icons] unknown icon "${name}" — no matching SVG under svg/`)

      const nodes = await readIconNodes(entry)
      return renderGlyphModule({ entry, nodes, runtimeSpecifier })
    },

    configureServer(server) {
      server.watcher.add([solarDir, polymsDir])

      const invalidate = (file: string) => {
        if (!file.endsWith('.svg')) return
        cache = undefined
        const entryModule = server.moduleGraph.getModuleById(RESOLVED_ENTRY)
        if (entryModule) server.moduleGraph.invalidateModule(entryModule)
      }

      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },

    /**
     * Rolldown labels each preserved module with `//#region <id>`, which would leak the internal
     * `\0virtual:` marker (raw or escaped) into published `.mjs` files. Sourcemaps are off for the
     * library build, so dropping the map here costs nothing.
     */
    renderChunk(code) {
      if (!library) return null
      const cleaned = code.replaceAll('\0', '').replaceAll('\\0virtual:', 'virtual:')
      return cleaned === code ? null : { code: cleaned, map: null }
    },

    async generateBundle() {
      if (!library) return

      const entries = await loadEntries()
      this.emitFile({
        fileName: ENTRY_TYPES_FILE,
        source: renderEntryTypes({
          createIconSpecifier: '../createIcon',
          names: [...entries.keys()],
          storeSpecifier: '../icon-store',
        }),
        type: 'asset',
      })
    },
  }
}
