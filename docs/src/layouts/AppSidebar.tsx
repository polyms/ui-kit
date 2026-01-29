import { navigation } from 'virtual:mdx-navigation'
import {
  CircleArrowLeftDoubleIcon,
  GoogleDocIcon,
  SearchList02Icon,
  SearchRemoveIcon,
  Tag01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Field, useBoolean, useEventCallback, useToggle } from '@polyms/core'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useImperativeHandle, useMemo, useState } from 'react'

export function AppSidebar({ ref }: AppSidebarProps) {
  const [search, setSearch] = useState('')
  const activePath = useRouterState({ select: s => s.location.pathname })
  const [isShowSidebar, toggleSidebar] = useToggle(true)
  const {
    value: isShowToggleSidebar,
    setTrue: showToggleSidebar,
    setFalse: hideToggleSidebar,
  } = useBoolean(false)

  useImperativeHandle<AppSidebarRef, AppSidebarRef>(
    ref,
    () => ({
      toggleSidebar,
    }),
    []
  )

  const navigate = useNavigate()
  const onSelect = useEventCallback((path: string) => {
    navigate({ to: '/$', params: { _splat: path.substring(1) } })
  })

  const filteredNav = useMemo(() => {
    if (!search) return navigation
    const lower = search.toLowerCase()
    return navigation
      .map(section => ({
        ...section,
        items: section.items.filter(i => i.label.toLowerCase().includes(lower)),
      }))
      .filter(section => section.items.length > 0)
  }, [search, navigation])

  useEffect(() => {
    document.body.classList.toggle('sidebar-closed', !isShowSidebar)
  }, [isShowSidebar])

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: off */}
      <div
        className='sidebar-container'
        onClick={() => {
          // Close when clicking the mobile backdrop (outside the sidebar panel)
          if (window.matchMedia('(max-width: 767px)').matches && !isShowSidebar) {
            toggleSidebar()
          }
        }}
        onKeyDown={event => {
          if (!window.matchMedia('(max-width: 767px)').matches || isShowSidebar) return
          if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
            event.preventDefault()
            toggleSidebar()
          }
        }}
        onMouseEnter={showToggleSidebar}
        onMouseLeave={hideToggleSidebar}
        tabIndex={-1}
      >
        <aside
          className='sidebar-content'
          onClick={event => {
            // Keep sidebar open when clicking inside the panel
            event.stopPropagation()
          }}
          onKeyDown={event => event.stopPropagation()}
        >
          {isShowToggleSidebar && (
            <HugeiconsIcon
              className={clsx(
                'link-light absolute -end-3.5 top-16 z-50 hidden shrink-0 cursor-pointer fill-white transition-transform md:block',
                !isShowSidebar && 'rotate-180'
              )}
              icon={CircleArrowLeftDoubleIcon}
              onClick={toggleSidebar}
              size={28}
            />
          )}

          <div className='relative mb-4 px-4'>
            <Field>
              <HugeiconsIcon
                className='icon-start'
                icon={search ? SearchRemoveIcon : SearchList02Icon}
                onClick={() => setSearch('')}
                strokeWidth={2}
              />
              <Field.Control
                onChange={e => setSearch(e.target.value)}
                placeholder='Find components...'
                rounded
                value={search}
              />
            </Field>
          </div>

          <nav className='space-y-2 overflow-y-auto px-4 pb-4'>
            <ul className=''>
              <li>
                <Link className={'nav-item'} to='/page'>
                  <HugeiconsIcon className='size-4 text-amber-600' icon={GoogleDocIcon} />
                  Page Demo
                </Link>
              </li>
            </ul>
            {filteredNav.map(section => (
              <div key={section.label}>
                <h4 className='mt-md mb-1 ps-2 font-bold text-xs uppercase'>{section.label}</h4>
                <ul className='space-y-1'>
                  {section.items.map(item => (
                    <li key={item.path}>
                      <button
                        className={clsx('nav-item', activePath === item.path && 'active')}
                        onClick={() => onSelect(item.path)}
                        type='button'
                      >
                        <HugeiconsIcon className='size-4' icon={Tag01Icon} />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type AppSidebarRef = {
  toggleSidebar: () => void
}

type AppSidebarProps = {
  ref: React.Ref<AppSidebarRef>
}

export declare namespace AppSidebar {
  type Ref = AppSidebarRef
  type Props = AppSidebarProps
}
