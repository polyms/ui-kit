import type { TocItem } from 'virtual:mdx-navigation'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!activeId && itemIds.length) {
      setActiveId(itemIds[0] ?? null)
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    for (const id of itemIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => {
      for (const id of itemIds) {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      }
    }
  }, [itemIds, activeId])

  return activeId
}

export function DocsToc({ toc, className }: { toc: TocItem[]; className?: string }) {
  const itemIds = useMemo(() => toc.map(i => i.url.replace('#', '')), [toc])
  const activeHeading = useActiveHeading(itemIds)

  if (!toc?.length) return null

  return (
    <aside
      className={clsx(
        'hidden xl:flex xl:w-72 xl:shrink-0 xl:flex-col xl:border-neutral-200 xl:border-l',
        className
      )}
    >
      <div className='sticky top-0 max-h-dvh overflow-auto px-6 py-4'>
        <p className='flex h-7 items-center font-medium text-neutral-600 text-xs tracking-wide'>
          On This Page
        </p>
        <div className='relative mt-2 flex flex-col gap-0.5'>
          {toc.map(item => (
            <a
              className={clsx(
                'rounded-md px-2 py-1 text-[13px] text-neutral-600 leading-5 no-underline transition-colors hover:bg-neutral-100 hover:text-neutral-900',
                item.depth === 3 && 'pl-5',
                item.depth === 4 && 'pl-7',
                item.url === `#${activeHeading}` && 'bg-neutral-100 text-neutral-900'
              )}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
              href={item.url}
              key={item.url}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
