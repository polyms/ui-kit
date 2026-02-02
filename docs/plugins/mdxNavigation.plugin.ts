import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import * as mdastUtilToString from 'mdast-util-to-string'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import type { Plugin } from 'vite'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────
export interface TocItem {
  depth: number
  title: string
  url: string
}

export interface PageMetadata {
  type?: string
  title?: string
  [key: string]: unknown
}

export interface PageNavigation {
  file: string
  route: string
  title?: string
  metadata: PageMetadata
  toc: TocItem[]
  section: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const VIRTUAL_ID = 'virtual:mdx-navigation'
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`

export function mdxNavigationPlugin(options: { contentDir?: string; routeBase?: string } = {}): Plugin {
  const { contentDir = 'src/content', routeBase = '/' } = options

  let pages: PageNavigation[] = []

  function slugify(value: string) {
    const normalized = value
      .trim()
      .toLowerCase()
      // replace non-alphanumeric with dashes
      .replace(/[^a-z0-9]+/g, '-')
      // trim dashes
      .replace(/^-+|-+$/g, '')

    return normalized || 'section'
  }

  function createSlugger() {
    const counts: Record<string, number> = {}
    return (value: string) => {
      const base = slugify(value)
      const count = counts[base] ?? 0
      counts[base] = count + 1
      return count === 0 ? base : `${base}-${count}`
    }
  }

  function parseMdxFile(filePath: string): PageNavigation {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const metadata = data as PageMetadata

    // Parse content to extract headings for TOC
    const tree = unified().use(remarkParse).parse(content)

    const toc: TocItem[] = []
    const slug = createSlugger()
    visit(tree, 'heading', node => {
      const title = mdastUtilToString.toString(node)

      // Skip h1 headings
      if (node.depth <= 1) return

      // Skip headings with placeholders
      if (title.includes('{{') || title.includes('}}')) return

      const id = slug(title)
      toc.push({ depth: node.depth, title, url: `#${id}` })
    })

    const relativePath = path.relative(contentDir, filePath).replace(/\\/g, '/')
    const route = routeBase + relativePath.replace(/\.mdx?$/, '')
    const segments = relativePath.replace(/\.mdx$/, '').split('/')
    const section = segments.length > 1 ? segments[0]! : 'root'

    return {
      file: filePath,
      route,
      title: metadata.title || 'Untitled',
      metadata,
      toc,
      section,
    }
  }

  function scanAll() {
    pages = []

    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry)
        const stat = fs.statSync(full)

        if (stat.isDirectory()) {
          walk(full)
        } else if (full.endsWith('.mdx')) {
          pages.push(parseMdxFile(full))
        }
      }
    }

    if (fs.existsSync(contentDir)) {
      walk(contentDir)
    }
  }

  return {
    name: 'vite-plugin-mdx-navigation',

    enforce: 'pre',

    buildStart() {
      scanAll()
    },

    configureServer(server) {
      scanAll()

      const invalidateModule = () => {
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
        }
      }

      server.watcher.on('add', file => {
        if (file.endsWith('.mdx')) {
          scanAll()
          invalidateModule()
        }
      })

      server.watcher.on('change', file => {
        if (file.endsWith('.mdx')) {
          scanAll()
          invalidateModule()
        }
      })

      server.watcher.on('unlink', file => {
        if (file.endsWith('.mdx')) {
          scanAll()
          invalidateModule()
        }
      })
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) {
        return RESOLVED_VIRTUAL_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const tocByRoute = Object.fromEntries(pages.map(p => [p.route, p.toc]))
        const metadataByRoute = Object.fromEntries(pages.map(p => [p.route, p.metadata]))
        return [
          `export const pages = ${JSON.stringify(pages, null, 2)}`,
          `export const tocByRoute = ${JSON.stringify(tocByRoute, null, 2)}`,
          `export const metadataByRoute = ${JSON.stringify(metadataByRoute, null, 2)}`,
        ].join('\n\n')
      }
    },
  }
}
