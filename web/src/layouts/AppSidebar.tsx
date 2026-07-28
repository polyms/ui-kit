import { AltArrowRight, CloseCircle, DoubleAltArrowLeft, RoundedMagnifer } from '@polyms/icons/bold-duotone'
import { Collapsible, Field, NavigationMenu } from '@polyms/ui-kit'
import { useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useImperativeHandle, useState } from 'react'
import { useBoolean, useEventCallback } from 'usehooks-ts'
import { type DocsNavItem, type DocsNavSection, useDocsNav } from '../hooks/useDocsNav'
import { useDocsShellMode } from '../hooks/useMediaQuery'

export function AppSidebar({ ref, drawerOnly = false }: AppSidebarProps) {
  const [search, setSearch] = useState('')
  const activePath = useRouterState({ select: s => s.location.pathname })
  const shellMode = useDocsShellMode()
  const mode = drawerOnly ? 'drawer' : shellMode
  const [isFullSidebarOpen, setIsFullSidebarOpen] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const {
    value: isShowToggleSidebar,
    setTrue: showToggleSidebar,
    setFalse: hideToggleSidebar,
  } = useBoolean(false)
  const { sections } = useDocsNav(search)

  const toggleSidebar = useEventCallback(() => {
    if (mode === 'drawer' || mode === 'rail') {
      setIsDrawerOpen(open => !open)
      return
    }

    if (mode === 'full') {
      setIsFullSidebarOpen(open => !open)
    }
  })

  useImperativeHandle<AppSidebarRef, AppSidebarRef>(ref, () => ({ toggleSidebar }), [toggleSidebar])

  const navigate = useNavigate()
  const router = useRouter()
  const onSelect = useEventCallback((item: DocsNavItem) => {
    if (item.routeKind === 'file') {
      // File routes (`/demo`, `/forms`, `/docs/icons`) — history avoids splat typing.
      router.history.push(item.path)
    } else {
      void navigate({ to: '/$', params: { _splat: item.path.substring(1) } })
    }
    setIsDrawerOpen(false)
  })

  useEffect(() => {
    const isDrawerMode = mode === 'drawer' || mode === 'rail'
    document.body.classList.toggle('sidebar-closed', mode === 'full' && !isFullSidebarOpen)
    document.body.classList.toggle('sidebar-drawer-open', isDrawerMode && isDrawerOpen)
  }, [mode, isFullSidebarOpen, isDrawerOpen])

  useEffect(() => {
    if (mode === 'full') setIsDrawerOpen(false)
  }, [mode])

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop closes the mobile drawer.
    <div
      data-drawer-only={drawerOnly ? '' : undefined}
      data-mode={mode}
      id='app-sidebar'
      onClick={() => {
        if ((mode === 'drawer' || mode === 'rail') && isDrawerOpen) {
          setIsDrawerOpen(false)
        }
      }}
      onKeyDown={event => {
        if ((mode !== 'drawer' && mode !== 'rail') || !isDrawerOpen) return
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
          event.preventDefault()
          setIsDrawerOpen(false)
        }
      }}
      onMouseEnter={showToggleSidebar}
      onMouseLeave={hideToggleSidebar}
      tabIndex={-1}
    >
      {mode === 'full' && (isShowToggleSidebar || !isFullSidebarOpen) && (
        <DoubleAltArrowLeft
          className={clsx('sidebar-toggle-icon link link-light')}
          onClick={event => {
            event.stopPropagation()
            toggleSidebar()
          }}
          size={28}
        />
      )}

      <aside
        className='sidebar-content'
        onClick={event => {
          event.stopPropagation()
        }}
        onKeyDown={event => event.stopPropagation()}
      >
        {mode === 'rail' && !isDrawerOpen ? (
          <RailNav activePath={activePath} onSelect={onSelect} sections={sections} />
        ) : (
          <FullNav
            activePath={activePath}
            onSelect={onSelect}
            search={search}
            sections={sections}
            setSearch={setSearch}
          />
        )}
      </aside>
    </div>
  )
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function FullNav({ activePath, onSelect, search, sections, setSearch }: FullNavProps) {
  const SearchIcon = search ? CloseCircle : RoundedMagnifer

  return (
    <>
      <div className='relative mb-4 px-4'>
        <Field>
          <SearchIcon className='icon-start' onClick={() => setSearch('')} />
          <Field.Control
            onChange={e => setSearch(e.target.value)}
            placeholder='Find components...'
            rounded
            value={search}
          />
        </Field>
      </div>

      <nav className='space-y-2 overflow-y-auto px-4 pb-4'>
        {sections.map(section => (
          <Collapsible defaultOpen key={section.key}>
            <Collapsible.Trigger className='nav-item'>
              <section.icon className={clsx('size-5 -rotate-10', section.colorClass)} />
              {section.label}
              <AltArrowRight className='chevron-icon ms-auto size-4' />
            </Collapsible.Trigger>
            <Collapsible.Panel className='nav-panel'>
              <div className='nav-panel-content'>
                {section.items.map(item => (
                  <div key={item.path}>
                    <button
                      className={clsx('nav-item', activePath === item.path && 'active')}
                      onClick={() => onSelect(item)}
                      type='button'
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            </Collapsible.Panel>
          </Collapsible>
        ))}
      </nav>
    </>
  )
}

function RailNav({ activePath, onSelect, sections }: RailNavProps) {
  return (
    <NavigationMenu closeDelay={200} delay={120} orientation='vertical'>
      <NavigationMenu.List aria-label='Documentation sections' className='rail-nav' variant='bare'>
        {sections.map(section => (
          <RailSection activePath={activePath} key={section.key} onSelect={onSelect} section={section} />
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Viewport
        align='start'
        alignOffset={-4}
        arrow={false}
        className='rail-positioner'
        popupClassName='rail-popover-popup'
        side='right'
        sideOffset={8}
      />
    </NavigationMenu>
  )
}

function RailSection({ section, activePath, onSelect }: RailSectionProps) {
  const isActive = section.items.some(item => item.path === activePath)

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger aria-label={section.label} className={clsx('rail-item', isActive && 'active')}>
        <section.icon className={clsx('size-5', section.colorClass)} />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <p className='floating-dock-popover-title'>{section.label}</p>
        <ul className='floating-dock-nav-list'>
          {section.items.map(item => (
            <li key={item.path}>
              <NavigationMenu.Link
                className={clsx('floating-dock-nav-item', activePath === item.path && 'is-active')}
                onClick={() => onSelect(item)}
                render={<button type='button' />}
              >
                {item.label}
              </NavigationMenu.Link>
            </li>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type AppSidebarRef = {
  toggleSidebar: () => void
}

type AppSidebarProps = {
  drawerOnly?: boolean
  ref: React.Ref<AppSidebarRef>
}

type FullNavProps = {
  activePath: string
  onSelect: (item: DocsNavItem) => void
  search: string
  sections: DocsNavSection[]
  setSearch: (search: string) => void
}

type RailNavProps = {
  activePath: string
  onSelect: (item: DocsNavItem) => void
  sections: DocsNavSection[]
}

type RailSectionProps = {
  activePath: string
  onSelect: (item: DocsNavItem) => void
  section: DocsNavSection
}

export declare namespace AppSidebar {
  type Ref = AppSidebarRef
  type Props = AppSidebarProps
}
