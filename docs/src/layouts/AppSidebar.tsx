import {
  ArrowRight01Icon,
  CircleArrowLeftDoubleIcon,
  GoogleDocIcon,
  SearchList02Icon,
  SearchRemoveIcon,
} from '@hugeicons/core-free-icons'
import { Collapsible, Field, NavigationMenu } from '@polyms/core'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useImperativeHandle, useState } from 'react'
import { useBoolean, useEventCallback } from 'usehooks-ts'
import { Icon } from '../components/Icons'
import { type DocsNavSection, useDocsNav } from '../hooks/useDocsNav'
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
  const { sections, showExamplesNav, examplesIcon } = useDocsNav(search)

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
  const onSelect = useEventCallback((path: string) => {
    navigate({ to: '/$', params: { _splat: path.substring(1) } })
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
        <Icon
          className={clsx('sidebar-toggle-icon link link-light')}
          icon={CircleArrowLeftDoubleIcon}
          onClick={event => {
            event.stopPropagation()
            toggleSidebar()
          }}
          size={28}
          strokeWidth={1.5}
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
          <RailNav
            activePath={activePath}
            examplesIcon={examplesIcon}
            onSelect={onSelect}
            sections={sections}
            showExamplesNav={showExamplesNav}
          />
        ) : (
          <FullNav
            activePath={activePath}
            examplesIcon={examplesIcon}
            onSelect={onSelect}
            search={search}
            sections={sections}
            setSearch={setSearch}
            showExamplesNav={showExamplesNav}
          />
        )}
      </aside>
    </div>
  )
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function FullNav({
  activePath,
  examplesIcon,
  onSelect,
  search,
  sections,
  setSearch,
  showExamplesNav,
}: FullNavProps) {
  return (
    <>
      <div className='relative mb-4 px-4'>
        <Field>
          <Icon
            className='icon-start'
            icon={search ? SearchRemoveIcon : SearchList02Icon}
            onClick={() => setSearch('')}
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
        {sections.map(section => (
          <Collapsible defaultOpen key={section.key}>
            <Collapsible.Trigger className='nav-item'>
              <Icon className={clsx('size-4', section.colorClass)} icon={section.icon} />
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
          </Collapsible>
        ))}

        {showExamplesNav && (
          <Collapsible defaultOpen>
            <Collapsible.Trigger className='nav-item'>
              <Icon className='size-4 text-slate-400' icon={examplesIcon} />
              Examples
              <Icon className='chevron-icon ms-auto size-4' icon={ArrowRight01Icon} strokeWidth={3} />
            </Collapsible.Trigger>
            <Collapsible.Panel className='nav-panel'>
              <div className='nav-panel-content'>
                <Link className='nav-item' to='/demo'>
                  <Icon className='size-4 text-slate-400' icon={GoogleDocIcon} />
                  Page Demo
                </Link>
                <Link className='nav-item' to='/forms'>
                  <Icon className='size-4 text-slate-400' icon={GoogleDocIcon} />
                  Forms preview
                </Link>
              </div>
            </Collapsible.Panel>
          </Collapsible>
        )}
      </nav>
    </>
  )
}

function RailNav({ activePath, examplesIcon, onSelect, sections, showExamplesNav }: RailNavProps) {
  return (
    <NavigationMenu closeDelay={200} delay={120} orientation='vertical'>
      <NavigationMenu.List aria-label='Documentation sections' className='rail-nav' variant='bare'>
        {sections.map(section => (
          <RailSection activePath={activePath} key={section.key} onSelect={onSelect} section={section} />
        ))}
        {showExamplesNav && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger aria-label='Examples' className='rail-item' type='button'>
              <Icon className='size-5 text-slate-400' icon={examplesIcon} />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <p className='floating-dock-popover-title'>Examples</p>
              <ul className='floating-dock-nav-list'>
                <li>
                  <NavigationMenu.Link className='floating-dock-nav-item' render={<Link to='/demo' />}>
                    <Icon className='size-4 shrink-0 text-slate-400' icon={GoogleDocIcon} />
                    Page Demo
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link className='floating-dock-nav-item' render={<Link to='/forms' />}>
                    <Icon className='size-4 shrink-0 text-slate-400' icon={GoogleDocIcon} />
                    Forms preview
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
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
      <NavigationMenu.Trigger
        aria-label={section.label}
        className={clsx('rail-item', isActive && 'active')}
        type='button'
      >
        <Icon className={clsx('size-5', section.colorClass)} icon={section.icon} />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <p className='floating-dock-popover-title'>{section.label}</p>
        <ul className='floating-dock-nav-list'>
          {section.items.map(item => (
            <li key={item.path}>
              <NavigationMenu.Link
                className={clsx('floating-dock-nav-item', activePath === item.path && 'is-active')}
                onClick={() => onSelect(item.path)}
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
  examplesIcon: DocsNavSection['icon']
  onSelect: (path: string) => void
  search: string
  sections: DocsNavSection[]
  setSearch: (search: string) => void
  showExamplesNav: boolean
}

type RailNavProps = {
  activePath: string
  examplesIcon: DocsNavSection['icon']
  onSelect: (path: string) => void
  sections: DocsNavSection[]
  showExamplesNav: boolean
}

type RailSectionProps = {
  activePath: string
  onSelect: (path: string) => void
  section: DocsNavSection
}

export declare namespace AppSidebar {
  type Ref = AppSidebarRef
  type Props = AppSidebarProps
}
