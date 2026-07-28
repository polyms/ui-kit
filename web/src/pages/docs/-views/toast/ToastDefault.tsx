import { Button, Toast } from '@polyms/ui-kit'

const ToastDefault = () => {
  const toastManager = Toast.useToastManager()

  const showToastAt = (side: 'top' | 'right' | 'bottom' | 'left', align: 'start' | 'center' | 'end' = 'center') => {
    toastManager.add({
      title: `Toast at ${side}`,
      description: `Position: side=${side}, align=${align}`,
      type: 'info',
      positionerProps: { side, align },
    })
  }

  return (
    <div className='m-auto grid max-w-2xl gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={() => showToastAt('top', 'start')} outlined rounded size='xl' variant='primary'>
          Top Left
        </Button>
        <Button onClick={() => showToastAt('top', 'end')} outlined rounded size='xl' variant='success'>
          Top Right
        </Button>
        <Button onClick={() => showToastAt('bottom', 'start')} outlined rounded size='xl' variant='warning'>
          Bottom Left
        </Button>
        <Button onClick={() => showToastAt('bottom', 'end')} outlined rounded size='xl' variant='danger'>
          Bottom Right
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={() => showToastAt('top')} outlined rounded size='xl' variant='primary'>
          Top Center
        </Button>
        <Button onClick={() => showToastAt('bottom')} outlined rounded size='xl' variant='dark'>
          Bottom Center
        </Button>
      </div>
    </div>
  )
}

export default ToastDefault
