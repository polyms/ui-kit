import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@polyms/core'

export default function ButtonTooltip() {
  return (
    <div className='card flex flex-wrap items-center gap-4 p-4'>
      <Button tooltip='Save changes to the server' variant='primary'>
        Save
      </Button>
      <Button icon rounded tooltip='Dismiss'>
        <HugeiconsIcon className='btn-icon-content' icon={Cancel01Icon} strokeWidth={2} />
      </Button>
    </div>
  )
}
