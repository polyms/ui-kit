import { Menu02Icon, MoveTopIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { scrollToTop, Toc } from '@polyms/ui-kit'
import { useDocsToc } from '../hooks/useDocsToc'
import { useMediaQuery } from '../hooks/useMediaQuery'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function DocsToc() {
  const { toc } = useDocsToc()
  // Mount only when the aside is visible — avoids a second scroll spy under xl (dock popover).
  const isAsideVisible = useMediaQuery('(min-width: 1280px)')

  if (!isAsideVisible || !toc?.length) return null

  return (
    <div className='sticky top-6 max-h-dvh overflow-auto py-4 ps-4'>
      <p className='mb-2 flex h-7 items-center font-semibold text-muted text-xs tracking-wide'>
        <HugeiconsIcon className='me-1' icon={Menu02Icon} size={16} strokeWidth={2} />
        On This Page
      </p>

      <Toc className='relative ms-1'>
        <Toc.List>
          <Toc.Item onClick={scrollToTop} title='Back to top'>
            <HugeiconsIcon icon={MoveTopIcon} size={14} strokeWidth={2} />
            (Top)
          </Toc.Item>
          {toc.map(item => (
            <Toc.Item depth={item.depth} href={item.url} key={item.url}>
              {item.title}
            </Toc.Item>
          ))}
          <Toc.Indicator />
        </Toc.List>
      </Toc>
    </div>
  )
}
