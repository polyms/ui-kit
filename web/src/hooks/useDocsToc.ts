import { tocByRoute } from 'virtual:mdx-navigation'
import { useRouterState } from '@tanstack/react-router'
import { useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type TocItem = {
  title: string
  url: string
  depth: number
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

/** MDX route TOC data only — scroll spy lives in `Toc` or the floating-dock popover. */
export function useDocsToc() {
  const activePath = useRouterState({ select: s => s.location.pathname })

  const toc = useMemo(() => {
    const items = tocByRoute[activePath] ?? tocByRoute[activePath.replace(/\/$/, '')] ?? []
    return items as TocItem[]
  }, [activePath])

  return { toc }
}
