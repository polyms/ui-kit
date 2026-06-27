import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@polyms/core-ui'

export default function ButtonTooltip() {
  return (
    <div className='card card-body items-center gap-4'>
      <Button rounded tooltip='Save changes to the server' variant='primary'>
        Save
      </Button>
      <Button icon rounded tooltip='Dismiss'>
        <HugeiconsIcon className='btn-icon-content' icon={Cancel01Icon} strokeWidth={2} />
      </Button>
    </div>
  )
}
