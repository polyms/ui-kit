/**
 * Pure SVG -> icon module logic, shared by the Vite plugin (dev, test, build) and the type
 * generator. Nothing here writes glyph modules to disk: `svg/solar/` + `svg/polyms/` stay the
 * only source of truth and module text is produced on demand.
 *
 * Emitted glyph modules are plain JS (no JSX): the SVG tree is serialised to `IconNode` data and
 * rendered by `createIcon`, so a virtual module needs no JSX transform in any pipeline.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import { JSDOM } from 'jsdom'

// ── Constants ───────────────────────────────────────────────────────────────────────────────────────────────

/** Public entry consumers import (also the id the Vite plugin intercepts). */
export const ENTRY_SPECIFIER = '@polyms/icons/bold-duotone'
/** Virtual barrel: store re-exports + one re-export per glyph. */
export const VIRTUAL_ENTRY = 'virtual:polyms-icons/bold-duotone'
/** Virtual per-glyph module prefix — one module per icon keeps consumer builds tree-shakeable. */
export const VIRTUAL_GLYPH_PREFIX = 'virtual:polyms-icons/glyph/'

const VALID_NAME = /^[A-Za-z][A-Za-z0-9]*$/
const SECONDARY_COLOR = 'var(--icon-secondary-color, currentColor)'

/** @typedef {'solar' | 'polyms'} IconProvenance */
/** @typedef {{ name: string, provenance: IconProvenance, filePath: string }} IconEntry */
/** @typedef {[tag: string, props: Record<string, unknown>, children?: IconNode[]]} IconNode */

// ── Sources ─────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Scans `svg/solar/` then `svg/polyms/` — on a name clash `polyms/` wins, so a brand-owned glyph
 * can override a vendored Solar one without editing vendored files.
 *
 * @param {{ solarDir: string, polymsDir: string }} dirs
 * @returns {Promise<{ entries: IconEntry[], errors: string[] }>}
 */
export async function listIconEntries({ solarDir, polymsDir }) {
  const solar = await collectSvgSources(solarDir, 'solar')
  const polyms = await collectSvgSources(polymsDir, 'polyms')

  /** @type {Map<string, IconEntry>} */
  const byName = new Map()
  for (const entry of [...solar, ...polyms]) byName.set(entry.name, entry)

  /** @type {IconEntry[]} */
  const entries = []
  const errors = []

  for (const name of [...byName.keys()].sort()) {
    const entry = /** @type {IconEntry} */ (byName.get(name))
    if (!VALID_NAME.test(name)) {
      errors.push(`invalid export name "${name}" (${entry.provenance}: ${entry.filePath})`)
      continue
    }
    entries.push(entry)
  }

  return { entries, errors }
}

/**
 * @param {IconEntry} entry
 * @returns {Promise<IconNode[]>}
 */
export async function readIconNodes(entry) {
  const source = await readFile(entry.filePath, 'utf8')
  try {
    return svgToIconNodes(source)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    throw new Error(`failed to parse ${entry.provenance}/${path.basename(entry.filePath)}: ${reason}`)
  }
}

/**
 * @param {string} dir
 * @param {IconProvenance} provenance
 * @returns {Promise<IconEntry[]>}
 */
async function collectSvgSources(dir, provenance) {
  let dirEntries
  try {
    dirEntries = await readdir(dir, { withFileTypes: true })
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code === 'ENOENT') return []
    throw error
  }

  return dirEntries
    .filter(entry => entry.isFile() && entry.name.endsWith('.svg'))
    .map(entry => ({
      filePath: path.join(dir, entry.name),
      name: entry.name.slice(0, -'.svg'.length),
      provenance,
    }))
}

// ── Transform ───────────────────────────────────────────────────────────────────────────────────────────────

/** @type {DOMParser | undefined} */
let domParser

/** One JSDOM window for the whole process — `new JSDOM()` per glyph dominates dev/build time. */
function getDomParser() {
  if (!domParser) {
    const dom = new JSDOM('', { contentType: 'text/html' })
    domParser = new dom.window.DOMParser()
  }
  return domParser
}

/**
 * Serialises the children of an `<svg>` root to `IconNode` data. Throws on invalid markup so
 * callers can fail loudly instead of emitting a half-broken module.
 *
 * @param {string} source
 * @returns {IconNode[]}
 */
export function svgToIconNodes(source) {
  const document = getDomParser().parseFromString(source, 'image/svg+xml')
  const parserError = document.querySelector('parsererror')
  if (parserError) throw new Error(parserError.textContent?.trim() || 'invalid SVG markup')

  const rootEl = document.documentElement
  if (rootEl?.tagName !== 'svg') throw new Error('root element is not <svg>')

  return serializeChildren(rootEl, false)
}

/**
 * @param {Element} parent
 * @param {boolean} secondaryContext
 * @returns {IconNode[]}
 */
function serializeChildren(parent, secondaryContext) {
  /** @type {IconNode[]} */
  const nodes = []

  for (const node of Array.from(parent.childNodes)) {
    if (node.nodeType !== 1) continue // skip text/comment nodes (whitespace between tags)
    nodes.push(serializeElement(/** @type {Element} */ (node), secondaryContext))
  }

  return nodes
}

/**
 * Duotone secondary layers are marked upstream by a fractional `opacity`. They keep presentation
 * attributes but bind to the CSS variables `createIcon` sets from props/store, so a consumer can
 * retint the second layer — and still override it from a stylesheet, which inline style would block.
 *
 * @param {Element} element
 * @param {boolean} secondaryContext
 * @returns {IconNode}
 */
function serializeElement(element, secondaryContext) {
  const opacity = element.getAttribute('opacity')
  const isSecondary = secondaryContext || (opacity != null && opacity !== '' && opacity !== '1')

  /** @type {Record<string, string>} */
  const props = {}

  for (const attr of Array.from(element.attributes)) {
    if (isSecondary && attr.name === 'opacity') {
      props.opacity = `var(--icon-secondary-opacity, ${attr.value})`
      continue
    }
    if (isSecondary && attr.name === 'fill' && attr.value === 'currentColor') {
      props.fill = SECONDARY_COLOR
      continue
    }
    props[kebabToCamel(attr.name)] = attr.value
  }

  const children = serializeChildren(element, isSecondary)
  return children.length > 0 ? [element.tagName, props, children] : [element.tagName, props]
}

/** @param {string} name */
function kebabToCamel(name) {
  return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

// ── Module text ─────────────────────────────────────────────────────────────────────────────────────────────

/** Single quotes keep the one on-disk artifact (`types/bold-duotone.d.ts`) stable under Biome. */
function quote(value) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/**
 * @param {{ entry: IconEntry, nodes: IconNode[], runtimeSpecifier: string }} options
 * @returns {string}
 */
export function renderGlyphModule({ entry, nodes, runtimeSpecifier }) {
  return [
    `// Generated from svg/${entry.provenance}/${entry.name}.svg — virtual module, never written to src/.`,
    `import { createIcon } from ${quote(runtimeSpecifier)}`,
    '',
    `export const ${entry.name} = createIcon(${quote(entry.name)}, ${JSON.stringify(nodes)})`,
    '',
  ].join('\n')
}

/**
 * @param {{ names: string[], storeSpecifier: string, glyphPrefix?: string }} options
 * @returns {string}
 */
export function renderEntryModule({ names, storeSpecifier, glyphPrefix = VIRTUAL_GLYPH_PREFIX }) {
  return [
    '// Generated barrel — virtual module, never written to src/.',
    `export { resetIconDefaults, setIconDefaults, useIconStore } from ${quote(storeSpecifier)}`,
    '',
    ...names.map(name => `export { ${name} } from ${quote(`${glyphPrefix}${name}`)}`),
    '',
  ].join('\n')
}

/**
 * Declaration file for the entry — the single generated artifact that lands in the repo (and in
 * `dist/`), because TypeScript cannot express "every glyph name" without listing them.
 *
 * @param {{ names: string[], createIconSpecifier: string, storeSpecifier: string }} options
 * @returns {string}
 */
export function renderEntryTypes({ names, createIconSpecifier, storeSpecifier }) {
  return [
    '// AUTO-GENERATED by scripts/generate-types.mjs — run `nx run icons:types` after adding an SVG.',
    `import type { IconComponent } from ${quote(createIconSpecifier)}`,
    '',
    `export type { IconComponent, IconProps } from ${quote(createIconSpecifier)}`,
    `export type { IconDefaults } from ${quote(storeSpecifier)}`,
    `export { resetIconDefaults, setIconDefaults, useIconStore } from ${quote(storeSpecifier)}`,
    '',
    ...names.map(name => `export declare const ${name}: IconComponent`),
    '',
  ].join('\n')
}
