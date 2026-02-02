import { tocByRoute } from 'virtual:mdx-navigation'
import { Menu02Icon, MoveTopIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

interface VisibleHeading {
  id: string
  ratio: number
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function useVisibleHeadings(itemIds: string[]) {
  const [visibleHeadings, setVisibleHeadings] = useState<VisibleHeading[]>([])

  useEffect(() => {
    if (itemIds.length === 0) return

    const checkVisibility = () => {
      const visibilityMap = new Map<string, VisibleHeading>()
      const viewportHeight = window.innerHeight
      const topThreshold = viewportHeight * 0.05
      const bottomThreshold = viewportHeight * 0.95

      // Get all currently visible headings
      for (const id of itemIds) {
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()

        // Check if element is in viewport (between 10% and 90%)
        if (rect.top < bottomThreshold && rect.bottom > topThreshold) {
          visibilityMap.set(id, {
            id,
            ratio: Math.max(0, Math.min(1, (bottomThreshold - rect.top) / rect.height)),
          })
        }
      }

      // Sort by position (top to bottom)
      const sorted = Array.from(visibilityMap.values()).sort((a, b) => {
        const aEl = document.getElementById(a.id)
        const bEl = document.getElementById(b.id)
        if (!aEl || !bEl) return 0
        return aEl.getBoundingClientRect().top - bEl.getBoundingClientRect().top
      })

      setVisibleHeadings(sorted)
    }

    // Initial check
    checkVisibility()

    // Find the actual scroll container
    const scrollContainer = document.documentElement

    // Listen to scroll with throttle
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

    // Listen to both window and container scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [itemIds])

  // Update indicator position
  useEffect(() => {
    if (visibleHeadings.length === 0) return

    const updateIndicator = () => {
      if (visibleHeadings.length === 0) return

      const firstHeading = visibleHeadings[0]
      const lastHeading = visibleHeadings[visibleHeadings.length - 1]
      if (!firstHeading || !lastHeading) return

      const firstId = firstHeading.id
      const lastId = lastHeading.id

      const firstTocItem = document.getElementById(`toc-${firstId}`)
      const lastTocItem = document.getElementById(`toc-${lastId}`)
      const indicator = document.querySelector('.toc-indicator') as HTMLElement

      if (firstTocItem && lastTocItem && indicator) {
        const firstRect = firstTocItem.getBoundingClientRect()
        const lastRect = lastTocItem.getBoundingClientRect()
        const listRect = firstTocItem.closest('.toc-list')?.getBoundingClientRect()

        if (listRect) {
          const top = firstRect.top - listRect.top
          const bottom = lastRect.bottom - listRect.top

          indicator.style.top = `${top}px`
          indicator.style.height = `${bottom - top}px`
          indicator.style.opacity = '1'
        }
      } else if (indicator) {
        indicator.style.opacity = '0'
      }
    }

    updateIndicator()
    // Update on next frame to ensure layout is complete
    requestAnimationFrame(updateIndicator)
  }, [visibleHeadings])

  return visibleHeadings
}

export function DocsToc() {
  const activePath = useRouterState({ select: s => s.location.pathname })
  const [toc, itemIds] = useMemo(() => {
    const toc = tocByRoute[activePath] ?? tocByRoute[activePath.replace(/\/$/, '')] ?? []
    return [toc, toc.map(i => i.url.replace('#', ''))]
  }, [activePath])
  const visibleHeadings = useVisibleHeadings(itemIds)
  const visibleIds = useMemo(() => new Set(visibleHeadings.map(h => h.id)), [visibleHeadings])

  if (!toc?.length) return null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='sticky top-6 max-h-dvh overflow-auto py-4 ps-4'>
      <p className='mb-2 flex h-7 items-center font-semibold text-neutral-600 text-xs tracking-wide'>
        <HugeiconsIcon className='me-1' icon={Menu02Icon} size={16} strokeWidth={2} />
        On This Page
      </p>

      <nav aria-label='Table of contents' className='toc relative ms-1'>
        <ul className='toc-list'>
          <li>
            <button className='toc-item w-full' onClick={scrollToTop} title='Back to top' type='button'>
              <HugeiconsIcon icon={MoveTopIcon} size={14} strokeWidth={2} />
              (Top)
            </button>
          </li>
          {toc.map(item => {
            const headingId = item.url.replace('#', '')
            const isVisible = visibleIds.has(headingId)
            const primaryActiveId = visibleHeadings[0]?.id
            const isPrimary = headingId === primaryActiveId

            return (
              <li key={item.url}>
                <a
                  className={clsx(
                    'toc-item',
                    item.depth === 3 && 'toc-item-depth-3',
                    item.depth === 4 && 'toc-item-depth-4',
                    isVisible && 'is-visible',
                    isPrimary && 'is-primary'
                  )}
                  href={item.url}
                  id={`toc-${headingId}`}
                  onClick={e => {
                    e.preventDefault()
                    const el = document.getElementById(headingId)
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
          {visibleHeadings.length > 0 && <div className='toc-indicator' />}
        </ul>
      </nav>
    </div>
  )
}
