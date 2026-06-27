import { MouseLeftClick06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Spinner } from '@polyms/core-ui'
import { useEffect, useRef } from 'react'

export default function ButtonDefault() {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus()
    }, 100)
  }, [ref.current])

  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Button outlined ref={ref} rounded size='xl'>
        <HugeiconsIcon className='btn-icon-content' icon={MouseLeftClick06Icon} strokeWidth={2} />
        Click me
      </Button>

      <Button rounded size='xl'>
        <HugeiconsIcon className='btn-icon-content' icon={MouseLeftClick06Icon} strokeWidth={2} />
        Click me
      </Button>

      <Button rounded size='xl' variant='primary'>
        <Spinner
          className='btn-icon-content'
          color='var(--color-primary-700)'
          size={22}
          subColor='var(--color-primary-100)'
        />
      </Button>
      <Button rounded size='xl' variant='dark'>
        <Spinner className='btn-icon-content' color='#fff' size={22} subColor='var(--color-slate-500)' />
      </Button>
    </div>
  )
}
