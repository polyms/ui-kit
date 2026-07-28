import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import {
  listIconEntries,
  readIconNodes,
  renderEntryModule,
  renderEntryTypes,
  renderGlyphModule,
  svgToIconNodes,
} from './icon-source.mjs'

// ── Helpers ─────────────────────────────────────────────────────────────────────────────────────────────────

const svg = children => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${children}</svg>`

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('icon-source', () => {
  let sandbox

  afterEach(async () => {
    if (sandbox) await rm(sandbox, { recursive: true, force: true })
    sandbox = undefined
  })

  async function makeSandbox() {
    sandbox = await mkdtemp(path.join(tmpdir(), 'polyms-icons-source-'))
    const solarDir = path.join(sandbox, 'solar')
    const polymsDir = path.join(sandbox, 'polyms')
    await mkdir(solarDir, { recursive: true })
    await mkdir(polymsDir, { recursive: true })
    return { polymsDir, solarDir }
  }

  it('scans svg/solar/ then svg/polyms/, polyms wins on a name clash', async () => {
    const { polymsDir, solarDir } = await makeSandbox()
    await writeFile(path.join(solarDir, 'Home.svg'), svg('<path d="M1 1" fill="currentColor"/>'))
    await writeFile(path.join(polymsDir, 'Home.svg'), svg('<path d="M9 9" fill="currentColor"/>'))

    const { entries, errors } = await listIconEntries({ polymsDir, solarDir })

    expect(errors).toEqual([])
    expect(entries).toHaveLength(1)
    expect(entries[0].name).toBe('Home')
    expect(entries[0].provenance).toBe('polyms')

    const nodes = await readIconNodes(entries[0])
    expect(JSON.stringify(nodes)).toContain('M9 9')
  })

  it('lists entries sorted by export name across both provenances', async () => {
    const { polymsDir, solarDir } = await makeSandbox()
    await writeFile(path.join(solarDir, 'Sun.svg'), svg('<path d="M2 2" fill="currentColor"/>'))
    await writeFile(path.join(solarDir, 'Moon.svg'), svg('<path d="M3 3" fill="currentColor"/>'))
    await writeFile(path.join(polymsDir, 'Bolt.svg'), svg('<path d="M4 4" fill="currentColor"/>'))

    const { entries } = await listIconEntries({ polymsDir, solarDir })

    expect(entries.map(entry => entry.name)).toEqual(['Bolt', 'Moon', 'Sun'])
  })

  it('reports a non-identifier filename instead of silently skipping it', async () => {
    const { polymsDir, solarDir } = await makeSandbox()
    await writeFile(path.join(solarDir, 'not-pascal-case.svg'), svg('<path d="M1 1" fill="currentColor"/>'))

    const { entries, errors } = await listIconEntries({ polymsDir, solarDir })

    expect(entries).toEqual([])
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('invalid export name')
  })

  it('fails loudly with provenance context when an SVG cannot be parsed', async () => {
    const { polymsDir, solarDir } = await makeSandbox()
    await writeFile(path.join(solarDir, 'Broken.svg'), '<svg><path d="M1 1"><<<not-xml</svg>')

    const { entries } = await listIconEntries({ polymsDir, solarDir })

    await expect(readIconNodes(entries[0])).rejects.toThrow(/solar\/Broken\.svg/)
  })

  it('serialises primary layers as plain node data with camelCase props', () => {
    const nodes = svgToIconNodes(svg('<path fill-rule="evenodd" d="M2 2" fill="currentColor"/>'))

    expect(nodes).toEqual([['path', { d: 'M2 2', fill: 'currentColor', fillRule: 'evenodd' }]])
  })

  it('binds duotone secondary layers to the icon CSS variables', () => {
    const nodes = svgToIconNodes(svg('<g opacity="0.5"><path d="M3 3" fill="currentColor"/></g>'))

    expect(nodes).toEqual([
      [
        'g',
        { opacity: 'var(--icon-secondary-opacity, 0.5)' },
        [['path', { d: 'M3 3', fill: 'var(--icon-secondary-color, currentColor)' }]],
      ],
    ])
  })

  it('treats a fractional opacity on the layer itself as secondary', () => {
    const nodes = svgToIconNodes(svg('<path opacity="0.4" d="M4 4" fill="currentColor"/>'))

    expect(nodes[0][1]).toEqual({
      d: 'M4 4',
      fill: 'var(--icon-secondary-color, currentColor)',
      opacity: 'var(--icon-secondary-opacity, 0.4)',
    })
  })

  it('renders a JSX-free glyph module that calls the createIcon runtime', () => {
    const source = renderGlyphModule({
      entry: { filePath: '/tmp/Home.svg', name: 'Home', provenance: 'solar' },
      nodes: [['path', { d: 'M1 1', fill: 'currentColor' }]],
      runtimeSpecifier: '/abs/icons/src/createIcon',
    })

    expect(source).toContain("import { createIcon } from '/abs/icons/src/createIcon'")
    expect(source).toContain(
      'export const Home = createIcon(\'Home\', [["path",{"d":"M1 1","fill":"currentColor"}]])'
    )
    expect(source).toContain('svg/solar/Home.svg')
    expect(source).not.toContain('<path')
  })

  it('renders the entry barrel with the store plus one module per glyph', () => {
    const source = renderEntryModule({
      names: ['Home', 'Sun'],
      storeSpecifier: '/abs/icons/src/icon-store',
    })

    expect(source).toContain(
      "export { resetIconDefaults, setIconDefaults, useIconStore } from '/abs/icons/src/icon-store'"
    )
    expect(source).toContain("export { Home } from 'virtual:polyms-icons/glyph/Home'")
    expect(source).toContain("export { Sun } from 'virtual:polyms-icons/glyph/Sun'")
  })

  it('renders entry declarations for every glyph name', () => {
    const types = renderEntryTypes({
      createIconSpecifier: '../src/createIcon',
      names: ['Home', 'Sun'],
      storeSpecifier: '../src/icon-store',
    })

    expect(types).toContain('export declare const Home: IconComponent')
    expect(types).toContain('export declare const Sun: IconComponent')
    expect(types).toContain("export type { IconComponent, IconProps } from '../src/createIcon'")
  })
})
