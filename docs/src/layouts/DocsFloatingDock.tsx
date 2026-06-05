import { ListViewIcon, Menu02Icon, MoveTopIcon } from '@hugeicons/core-free-icons'
import { Moon, Sun } from '@solar-icons/react-perf/BoldDuotone'
import clsx from 'clsx'
import { useMemo, type RefObject } from 'react'
import { Icon } from '../components/Icons'
import { useDocsToc } from '../hooks/useDocsToc'
import { useAppStore } from '../stores/app.store'
import type { AppSidebar } from './AppSidebar'
import { FloatingDock, type DockAction } from './FloatingDock'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type DocsFloatingDockProps = {
  variant: 'docs' | 'landing'
  sidebarRef?: RefObject<AppSidebar.Ref | null>
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function DocsTocPopover({ onClose }: { onClose: () => void }) {
  const { toc, visibleIds, primaryActiveId, scrollToTop, scrollToHeading } = useDocsToc()

  return (
    <div>
      <p className='floating-dock-popover-title'>On this page</p>
      <ul className='floating-dock-nav-list'>
        <li>
          <button
            className='floating-dock-toc-item'
            onClick={() => {
              scrollToTop()
              onClose()
            }}
            type='button'
          >
            (Top)
          </button>
        </li>
        {toc.map(item => {
          const headingId = item.url.replace('#', '')
          return (
            <li key={item.url}>
              <button
                className={clsx(
                  'floating-dock-toc-item',
                  item.depth === 3 && 'depth-3',
                  item.depth === 4 && 'depth-4',
                  visibleIds.has(headingId) && 'is-visible',
                  headingId === primaryActiveId && 'is-primary'
                )}
                onClick={() => {
                  scrollToHeading(headingId)
                  onClose()
                }}
                type='button'
              >
                {item.title}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function DocsFloatingDock({ variant, sidebarRef }: DocsFloatingDockProps) {
  const theme = useAppStore(state => state.theme)
  const toggleTheme = useAppStore(state => state.toggleTheme)
  const isDark = theme === 'dark'
  const { toc } = useDocsToc()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const actions: DockAction[] = useMemo(() => {
    const themeAction: DockAction = {
      type: 'button',
      id: 'theme',
      icon: isDark ? <Sun className='size-5' /> : <Moon className='size-5' />,
      label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      onClick: toggleTheme,
    }

    const topAction: DockAction = {
      type: 'button',
      id: 'top',
      icon: <Icon icon={MoveTopIcon} size={20} strokeWidth={2} />,
      label: 'Back to top',
      onClick: scrollToTop,
    }

    const menuAction: DockAction = {
      type: 'button',
      id: 'menu',
      icon: <Icon icon={Menu02Icon} size={20} strokeWidth={2} />,
      label: 'Open navigation',
      onClick: () => sidebarRef?.current?.toggleSidebar(),
    }

    if (variant === 'landing') {
      return sidebarRef ? [topAction, themeAction, menuAction] : [topAction, themeAction]
    }

    const docsActions: DockAction[] = [topAction, themeAction, { type: 'divider', id: 'divider' }, menuAction]

    if (toc.length > 0) {
      docsActions.push({
        type: 'popover',
        id: 'toc',
        icon: <Icon icon={ListViewIcon} size={20} strokeWidth={2} />,
        label: 'Table of contents',
        render: close => <DocsTocPopover onClose={close} />,
      })
    }

    return docsActions
  }, [variant, isDark, toggleTheme, sidebarRef, toc.length])

  return <FloatingDock actions={actions} />
}
