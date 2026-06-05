import { tocByRoute } from 'virtual:mdx-navigation'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type TocItem = {
  title: string
  url: string
  depth: number
}

interface VisibleHeading {
  id: string
  ratio: number
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

function useVisibleHeadings(itemIds: string[]) {
  const [visibleHeadings, setVisibleHeadings] = useState<VisibleHeading[]>([])

  useEffect(() => {
    if (itemIds.length === 0) return

    const checkVisibility = () => {
      const visibilityMap = new Map<string, VisibleHeading>()
      const viewportHeight = window.innerHeight
      const topThreshold = viewportHeight * 0.05
      const bottomThreshold = viewportHeight * 0.95

      for (const id of itemIds) {
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()

        if (rect.top < bottomThreshold && rect.bottom > topThreshold) {
          visibilityMap.set(id, {
            id,
            ratio: Math.max(0, Math.min(1, (bottomThreshold - rect.top) / rect.height)),
          })
        }
      }

      const sorted = Array.from(visibilityMap.values()).sort((a, b) => {
        const aEl = document.getElementById(a.id)
        const bEl = document.getElementById(b.id)
        if (!aEl || !bEl) return 0
        return aEl.getBoundingClientRect().top - bEl.getBoundingClientRect().top
      })

      setVisibleHeadings(sorted)
    }

    checkVisibility()

    const scrollContainer = document.documentElement
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [itemIds])

  return visibleHeadings
}

export function useDocsToc() {
  const activePath = useRouterState({ select: s => s.location.pathname })

  const [toc, itemIds] = useMemo(() => {
    const items = tocByRoute[activePath] ?? tocByRoute[activePath.replace(/\/$/, '')] ?? []
    return [items as TocItem[], items.map(i => i.url.replace('#', ''))]
  }, [activePath])

  const visibleHeadings = useVisibleHeadings(itemIds)
  const visibleIds = useMemo(() => new Set(visibleHeadings.map(h => h.id)), [visibleHeadings])
  const primaryActiveId = visibleHeadings[0]?.id

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToHeading = (headingId: string) => {
    const el = document.getElementById(headingId)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return {
    toc,
    visibleIds,
    primaryActiveId,
    scrollToTop,
    scrollToHeading,
  }
}
