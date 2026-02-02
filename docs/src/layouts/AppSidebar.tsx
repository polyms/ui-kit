import { pages } from 'virtual:mdx-navigation'
import {
  ArrowRight01Icon,
  ChatFeedback01Icon,
  CircleArrowLeftDoubleIcon,
  CursorMagicSelection04Icon,
  GoogleDocIcon,
  InputCursorTextIcon,
  SearchList02Icon,
  SearchRemoveIcon,
  Share08Icon,
  ThreeDScaleIcon,
} from '@hugeicons/core-free-icons'
import { Collapsible, Field, useBoolean, useEventCallback, useToggle } from '@polyms/core'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Icon } from '../components/Icons'

export function AppSidebar({ ref }: AppSidebarProps) {
  const [search, setSearch] = useState('')
  const activePath = useRouterState({ select: s => s.location.pathname })
  const [isShowSidebar, toggleSidebar] = useToggle(true)
  const {
    value: isShowToggleSidebar,
    setTrue: showToggleSidebar,
    setFalse: hideToggleSidebar,
  } = useBoolean(false)

  useImperativeHandle<AppSidebarRef, AppSidebarRef>(ref, () => ({ toggleSidebar }), [])

  const navigate = useNavigate()
  const onSelect = useEventCallback((path: string) => {
    navigate({ to: '/$', params: { _splat: path.substring(1) } })
  })

  useEffect(() => {
    document.body.classList.toggle('sidebar-closed', !isShowSidebar)
  }, [isShowSidebar])

  const items = useMemo(() => {
    const nav: Record<string, NavigationItem[]> = {}

    for (const page of pages) {
      const section = page.metadata.type || 'Others'
      if (!nav[section]) {
        nav[section] = []
      }

      nav[section].push({
        label: page.title || 'Untitled',
        path: page.route,
      })
    }

    // biome-ignore-start lint/style/useNamingConvention: label name
    const iconMaps = {
      Guide: GoogleDocIcon,
      Actions: CursorMagicSelection04Icon,
      'Data input': InputCursorTextIcon,
      Feedback: ChatFeedback01Icon,
      Navigation: Share08Icon,
      Others: ThreeDScaleIcon,
    }
    const colors = {
      Guide: 'text-warning-600',
      Actions: 'text-success',
      'Data input': 'text-info',
      Feedback: 'text-danger',
      Navigation: 'text-primary',
      Others: 'text-danger',
    }
    // biome-ignore-end lint/style/useNamingConvention: label name

    return Object.entries(nav)
      .sort(([labelA], [labelB]) => {
        if (labelA === 'Guide') return -1
        if (labelB === 'Guide') return 1
        if (labelA === 'Others') return 1
        if (labelB === 'Others') return -1
        return labelA.localeCompare(labelB)
      })
      .map(([label, items]) => ({
        key: label,
        label: (
          <>
            <Icon
              className={clsx('size-4', colors[label as keyof typeof colors])}
              icon={iconMaps[label as keyof typeof iconMaps] || GoogleDocIcon}
            />
            {label}
          </>
        ),
        items: items.sort((a, b) => a.label.localeCompare(b.label)),
      }))
  }, [])

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: off */}
      <div
        id='app-sidebar'
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
            <Icon
              className={clsx(
                'link link-light absolute -end-3.5 top-16 z-50 hidden shrink-0 fill-white transition-transform md:block',
                !isShowSidebar && 'rotate-180'
              )}
              icon={CircleArrowLeftDoubleIcon}
              onClick={toggleSidebar}
              size={28}
              strokeWidth={1.5}
            />
          )}

          <div className='relative mb-4 px-4'>
            <Field>
              <Icon
                className='icon-start'
                icon={search ? SearchRemoveIcon : SearchList02Icon}
                onClick={() => setSearch('')}
              />
              <Field.Control
                className='bg-white'
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
                  <Icon className='size-4 text-warning-600' icon={GoogleDocIcon} />
                  Page Demo
                </Link>
              </li>
            </ul>

            {items.map(section => (
              <Collapsible.Root defaultOpen key={section.key}>
                <Collapsible.Trigger className='nav-item'>
                  {section.label}
                  <Icon className='chevron-icon ms-auto size-4' icon={ArrowRight01Icon} strokeWidth={3} />
                </Collapsible.Trigger>
                <Collapsible.Panel className='nav-panel'>
                  <div className='nav-panel-content'>
                    {section.items.map(item => (
                      <div key={item.path}>
                        <button
                          className={clsx('nav-item', activePath === item.path && 'active')}
                          onClick={() => onSelect(item.path)}
                          type='button'
                        >
                          {item.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </Collapsible.Panel>
              </Collapsible.Root>
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

interface NavigationItem {
  label: string
  path: string
}

export declare namespace AppSidebar {
  type Ref = AppSidebarRef
  type Props = AppSidebarProps
}
