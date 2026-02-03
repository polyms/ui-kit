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
    <header className='border-slate-300 border-b border-dashed px-6' id='app-navigation'>
      <img alt='logo' src='favicon.png' width={40} />
      <Field>
        <HugeiconsIcon
          className='icon-start'
          icon={search ? SearchRemoveIcon : SearchList02Icon}
          onClick={() => setSearch('')}
          strokeWidth={2}
        />
        <Field.Control
          className='w-72'
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          rounded
          value={search}
        />
      </Field>
      <div className='ms-auto flex shrink-0 items-center gap-2'>
        {user ? (
          <>
            <span className='welcome'>
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
