import { pages } from 'virtual:mdx-navigation'
import {
  Dialog,
  Document,
  DocumentsMinimalistic,
  type IconProps,
  MagicStick3,
  SettingsMinimalistic,
  Sidebar,
  TextFieldFocus,
  Widget5,
} from '@polyms/icons/bold-duotone'
import type { ComponentType } from 'react'
import { useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type DocsNavRouteKind = 'file' | 'splat'

export type DocsNavItem = {
  label: string
  path: string
  routeKind: DocsNavRouteKind
}

export type DocsNavSection = {
  key: string
  label: string
  icon: ComponentType<IconProps>
  colorClass: string
  items: DocsNavItem[]
}

type CustomPage = DocsNavItem & {
  section: string
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────

/** React file routes that are not scanned by `virtual:mdx-navigation`. */
const CUSTOM_PAGES: CustomPage[] = [
  { section: 'Guide', label: 'Icons', path: '/docs/icons', routeKind: 'file' },
  { section: 'Examples', label: 'Page Demo', path: '/demo', routeKind: 'file' },
  { section: 'Examples', label: 'Forms preview', path: '/forms', routeKind: 'file' },
]

/** Preferred order inside Guide — onboarding first, composition helpers last. */
const GUIDE_ITEM_ORDER = [
  'Installation',
  'Design System',
  'Typography',
  'Icons',
  'AI Agent Skill',
  'useRender',
  'mergeProps',
] as const

// biome-ignore-start lint/style/useNamingConvention: section labels from frontmatter
const iconMaps = {
  Guide: DocumentsMinimalistic,
  Actions: MagicStick3,
  'Data input': TextFieldFocus,
  Feedback: Dialog,
  Navigation: SettingsMinimalistic,
  Examples: Widget5,
  Layout: Sidebar,
} as const

const colors = {
  Guide: 'text-warning-400',
  Actions: 'text-success-400',
  'Data input': 'text-info-400',
  Feedback: 'text-danger-400',
  Navigation: 'text-primary-400',
  Examples: 'text-slate-400',
  Others: 'text-danger-400',
} as const
// biome-ignore-end lint/style/useNamingConvention: section labels from frontmatter

function matchesSearch(label: string, path: string, q: string) {
  if (!q) return true
  return `${label} ${path}`.toLowerCase().includes(q)
}

function pushItem(nav: Record<string, DocsNavItem[]>, section: string, item: DocsNavItem) {
  if (!nav[section]) nav[section] = []
  nav[section].push(item)
}

function sortGuideItems(items: DocsNavItem[]) {
  const rank = new Map(GUIDE_ITEM_ORDER.map((label, index) => [label, index]))
  return [...items].sort((a, b) => {
    const rankA = rank.get(a.label as (typeof GUIDE_ITEM_ORDER)[number])
    const rankB = rank.get(b.label as (typeof GUIDE_ITEM_ORDER)[number])
    if (rankA !== undefined && rankB !== undefined) return rankA - rankB
    if (rankA !== undefined) return -1
    if (rankB !== undefined) return 1
    return a.label.localeCompare(b.label)
  })
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

export function useDocsNav(search = '') {
  const sections = useMemo(() => {
    const nav: Record<string, DocsNavItem[]> = {}
    const q = search.trim().toLowerCase()

    for (const page of pages) {
      const label = page.title || 'Untitled'
      const path = page.route
      if (!matchesSearch(label, path, q)) continue
      pushItem(nav, page.metadata.type || 'Others', { label, path, routeKind: 'splat' })
    }

    for (const page of CUSTOM_PAGES) {
      if (!matchesSearch(page.label, page.path, q)) continue
      pushItem(nav, page.section, {
        label: page.label,
        path: page.path,
        routeKind: page.routeKind,
      })
    }

    return Object.entries(nav)
      .filter(([, sectionItems]) => sectionItems.length > 0)
      .sort(([labelA], [labelB]) => {
        if (labelA === 'Guide') return -1
        if (labelB === 'Guide') return 1
        if (labelA === 'Examples') return 1
        if (labelB === 'Examples') return -1
        if (labelA === 'Others') return 1
        if (labelB === 'Others') return -1
        return labelA.localeCompare(labelB)
      })
      .map(([label, items]) => ({
        key: label,
        label,
        icon: iconMaps[label as keyof typeof iconMaps] || Document,
        colorClass: colors[label as keyof typeof colors] || 'text-slate-400',
        items:
          label === 'Guide' ? sortGuideItems(items) : items.sort((a, b) => a.label.localeCompare(b.label)),
      }))
  }, [search])

  return { sections }
}
