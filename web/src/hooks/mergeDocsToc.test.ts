import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'
import { mergeDocsToc, readPageHeadings, type TocItem } from './mergeDocsToc'

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

const mdxToc: TocItem[] = [
  { depth: 2, title: '1. Primitive', url: '#1-primitive' },
  { depth: 2, title: '2. Semantic', url: '#2-semantic' },
  { depth: 2, title: '3. Component', url: '#3-component' },
]

const pageMarkup = `
  <h2 id="1-primitive">1. Primitive</h2>
  <h3 id="headings">Headings</h3>
  <h4>xs</h4>
  <h4>primary</h4>
  <h2 id="2-semantic">2. Semantic</h2>
  <h2 id="3-component">3. Component</h2>
  <h3 id="alert">Alert</h3>
  <h3>Badge</h3>
  <h3 id="button">Button</h3>
`

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

describe('mergeDocsToc', () => {
  it('keeps the mdx toc when the page has no extra h3', () => {
    const page = [
      { depth: 2, id: '1-primitive', title: '1. Primitive' },
      { depth: 2, id: '2-semantic', title: '2. Semantic' },
      { depth: 2, id: '3-component', title: '3. Component' },
    ]

    expect(mergeDocsToc(mdxToc, page)).toBe(mdxToc)
  })

  it('nests page h3s under the preceding h2 in document order', () => {
    const headings = readPageHeadings(new JSDOM(pageMarkup).window.document.body)
    const toc = mergeDocsToc(mdxToc, headings)

    expect(toc).toEqual([
      { depth: 2, title: '1. Primitive', url: '#1-primitive' },
      { depth: 3, title: 'Headings', url: '#headings' },
      { depth: 2, title: '2. Semantic', url: '#2-semantic' },
      { depth: 2, title: '3. Component', url: '#3-component' },
      { depth: 3, title: 'Alert', url: '#alert' },
      { depth: 3, title: 'Button', url: '#button' },
    ])
    expect(toc.map(item => item.title)).not.toContain('xs')
    expect(toc.map(item => item.title)).not.toContain('primary')
    expect(toc.map(item => item.title)).not.toContain('Badge')
  })

  it('places an extra h3 before a markdown h3 that follows it on the page', () => {
    const mdx = [
      { depth: 2, title: 'Usage', url: '#usage' },
      { depth: 3, title: 'Install', url: '#install' },
      { depth: 4, title: 'Note', url: '#note' },
    ]
    const page = [
      { depth: 2, id: 'usage', title: 'Usage' },
      { depth: 3, id: 'extra', title: 'Extra' },
      { depth: 3, id: 'install', title: 'Install' },
    ]

    expect(mergeDocsToc(mdx, page)).toEqual([
      { depth: 2, title: 'Usage', url: '#usage' },
      { depth: 3, title: 'Extra', url: '#extra' },
      { depth: 3, title: 'Install', url: '#install' },
      { depth: 4, title: 'Note', url: '#note' },
    ])
  })
})
