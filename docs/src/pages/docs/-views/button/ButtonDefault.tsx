import { MouseLeftClick06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Spinner } from '@polyms/core'

export default function ButtonDefault() {
  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Button outlined rounded size='xl'>
        <HugeiconsIcon icon={MouseLeftClick06Icon} size={18} strokeWidth={2} />
        Click me
      </Button>

      <Button rounded size='xl'>
        <HugeiconsIcon icon={MouseLeftClick06Icon} size={18} strokeWidth={2} />
        Click me
      </Button>

      <Button rounded size='xl' variant='primary'>
        <Spinner color='var(--color-primary-700)' size={22} subColor='var(--color-primary-100)' />
      </Button>
      <Button rounded size='xl' variant='dark'>
        <Spinner color='#fff' size={22} subColor='var(--color-slate-500)' />
      </Button>
    </div>
  )
}
