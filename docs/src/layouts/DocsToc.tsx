import { Menu02Icon, MoveTopIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useDocsToc } from '../hooks/useDocsToc'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function DocsToc() {
  const { toc, visibleIds, primaryActiveId, scrollToTop, scrollToHeading } = useDocsToc()

  useEffect(() => {
    if (!primaryActiveId) return

    const primaryTocItem = document.getElementById(`toc-${primaryActiveId}`)
    const indicator = document.querySelector('.toc-indicator') as HTMLElement | null
    const listRect = primaryTocItem?.closest('.toc-list')?.getBoundingClientRect()

    if (!primaryTocItem || !indicator || !listRect) {
      if (indicator) indicator.style.opacity = '0'
      return
    }

    const itemRect = primaryTocItem.getBoundingClientRect()
    indicator.style.top = `${itemRect.top - listRect.top}px`
    indicator.style.height = `${itemRect.height}px`
    indicator.style.opacity = '1'
  }, [primaryActiveId])

  if (!toc?.length) return null

  return (
    <div className='sticky top-6 hidden max-h-dvh overflow-auto py-4 ps-4 xl:block'>
      <p className='mb-2 flex h-7 items-center font-semibold text-muted text-xs tracking-wide'>
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
                    scrollToHeading(headingId)
                  }}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
          {primaryActiveId && <div className='toc-indicator' />}
        </ul>
      </nav>
    </div>
  )
}
