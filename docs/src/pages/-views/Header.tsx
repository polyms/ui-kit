import { SearchList02Icon, SearchRemoveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, FormControl } from '@polyms/core'
import React from 'react'

export const Header = () => {
  const [user, setUser] = React.useState<{ name: string }>()
  const onLogin = () => setUser({ name: 'Tifa Lockhart' })
  const onLogout = () => setUser(undefined)
  const [search, setSearch] = React.useState('')

  return (
    <header className='flex h-14 shrink-0 items-center gap-2 border-slate-300 border-b px-4'>
      <img src='favicon.svg' alt='logo' />
      <FormControl
        rounded
        placeholder='Search...'
        iconStart={<HugeiconsIcon icon={search ? SearchRemoveIcon : SearchList02Icon} strokeWidth={2} />}
        onClickIconStart={() => setSearch('')}
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <div className='ms-auto flex shrink-0 items-center gap-2'>
        {user ? (
          <>
            <span className='welcome'>
              Welcome, <b>{user.name}</b>!
            </span>
            <Button variant='light' outlined rounded onClick={onLogout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button rounded>Pricing</Button>
            <Button variant='primary' rounded onClick={onLogin}>
              Log in
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

// Header.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//   }),
//   onLogin: PropTypes.func.isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onCreateAccount: PropTypes.func.isRequired,
// };
