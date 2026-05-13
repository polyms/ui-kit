import { SearchList02Icon, SearchRemoveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Field } from '@polyms/core'
import React from 'react'

export const Header = () => {
  const [user, setUser] = React.useState<{ name: string }>()
  const onLogin = () => setUser({ name: 'Tifa Lockhart' })
  const onLogout = () => setUser(undefined)
  const [search, setSearch] = React.useState('')

  return (
    <header
      className='flex w-full min-w-0 max-w-full flex-nowrap items-center gap-3 border-slate-200/90 border-b border-dashed bg-white/85 px-5 py-2 backdrop-blur-md md:gap-4 md:px-8'
      id='app-navigation'
    >
      <img
        alt='Polyms'
        className='size-9 shrink-0 rounded-lg shadow-sm ring-1 ring-slate-200/80'
        src='/favicon.png'
      />
      <Field className='min-w-0 max-w-full'>
        <HugeiconsIcon
          className='icon-start'
          icon={search ? SearchRemoveIcon : SearchList02Icon}
          onClick={() => setSearch('')}
          strokeWidth={2}
        />
        <Field.Control
          className='w-full min-w-0 max-w-full sm:max-w-xs md:max-w-sm'
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          rounded
          value={search}
        />
      </Field>
      <div className='flex min-w-0 shrink-0 items-center gap-2'>
        {user ? (
          <>
            <span className='welcome min-w-0 truncate text-sm'>
              Welcome, <b>{user.name}</b>!
            </span>
            <Button onClick={onLogout} outlined rounded variant='light'>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button rounded>Pricing</Button>
            <Button onClick={onLogin} rounded variant='primary'>
              Log in
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
