import { CloseCircle } from '@polyms/icons/bold-duotone'
import { Button } from '@polyms/ui-kit'

export default function ButtonTooltip() {
  return (
    <div className='card card-body items-center gap-4'>
      <Button rounded tooltip='Save changes to the server' variant='primary'>
        Save
      </Button>
      <Button icon rounded tooltip='Dismiss'>
        <CloseCircle className='btn-icon-content' />
      </Button>
    </div>
  )
}
