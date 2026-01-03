import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import * as mdastUtilToString from 'mdast-util-to-string'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import type { Plugin } from 'vite'

export interface TocItem {
  level: number
  text: string
}

export interface NavigationItem {
  label: string
  path: string
}

export interface NavigationSection {
  label: string
  items: NavigationItem[]
}

export interface PageNavigation {
  file: string
  route: string
  title?: string
  toc: TocItem[]
  section: string
}

// ======================================================================================

const VIRTUAL_ID = 'virtual:mdx-navigation'
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`

export function mdxNavigationPlugin(options: { contentDir?: string; routeBase?: string } = {}): Plugin {
  const { contentDir = 'src/content', routeBase = '/' } = options

  let pages: PageNavigation[] = []

  function parseMdxFile(filePath: string): PageNavigation {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    const tree = unified().use(remarkParse).parse(content)

    const toc: TocItem[] = []
    visit(tree, 'heading', node => {
      toc.push({
        level: node.depth,
        text: mdastUtilToString.toString(node),
      })
    })

    const relativePath = path.relative(contentDir, filePath).replace(/\\/g, '/')

    const route = routeBase + relativePath.replace(/\.mdx?$/, '')

    const segments = relativePath.replace(/\.mdx$/, '').split('/')
    const section = segments.length > 1 ? segments[0]! : 'docs'

    return {
      file: filePath,
      route,
      title: data.title || 'Untitled',
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

  function buildNavigation(): NavigationSection[] {
    const nav: Record<string, NavigationItem[]> = {}

    for (const page of pages) {
      const section = page.section
      if (!nav[section]) {
        nav[section] = []
      }

      nav[section].push({
        label: page.title || 'Untitled',
        path: page.route,
      })
    }

    return Object.entries(nav)
      .map(([label, items]) => ({
        label: label === 'docs' ? '⚡ Components' : `📂 ${label}`,
        items: items.sort((a, b) => a.label.localeCompare(b.label)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  return {
    name: 'vite-plugin-mdx-navigation',

    enforce: 'pre',

    buildStart() {
      scanAll()
    },

    configureServer(server) {
      scanAll()

      server.watcher.on('add', file => {
        if (file.endsWith('.mdx')) scanAll()
      })

      server.watcher.on('change', file => {
        if (file.endsWith('.mdx')) scanAll()
      })

      server.watcher.on('unlink', file => {
        if (file.endsWith('.mdx')) scanAll()
      })
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) {
        return RESOLVED_VIRTUAL_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const navSections = buildNavigation()
        return `export const navigation = ${JSON.stringify(navSections, null, 2)}`
      }
    },
  }
}
