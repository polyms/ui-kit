import { navigation } from 'virtual:mdx-navigation'
import {
  CircleArrowLeftDoubleIcon,
  GoogleDocIcon,
  SearchList02Icon,
  SearchRemoveIcon,
  Tag01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Field } from '@polyms/core'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { useBoolean, useEventCallback, useToggle } from 'usehooks-ts'

export function AppSidebar() {
  const [search, setSearch] = useState('')
  const activePath = useRouterState({ select: s => s.location.pathname })
  const [isShowSidebar, toggleSidebar] = useToggle(true)
  const {
    value: isShowToggleSidebar,
    setTrue: showToggleSidebar,
    setFalse: hideToggleSidebar,
  } = useBoolean(false)

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
    // biome-ignore lint/a11y/noStaticElementInteractions: off
    <div className='sidebar-container' onMouseEnter={showToggleSidebar} onMouseLeave={hideToggleSidebar}>
      <aside className='navigation'>
        {isShowToggleSidebar && (
          <HugeiconsIcon
            className={clsx(
              'link-light absolute -end-3.5 top-16 z-50 shrink-0 cursor-pointer fill-white transition-transform',
              !isShowSidebar && 'rotate-180'
            )}
            icon={CircleArrowLeftDoubleIcon}
            onClick={toggleSidebar}
            size={28}
          />
        )}

        <h2 className='mt-1 flex h-14 shrink-0 items-center px-4'>
          <img alt='logo' className='h-6' src='/favicon.png' />
        </h2>

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
  )
}
