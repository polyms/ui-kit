import { Button, Toast } from '@polyms/core'

const PushSuccessToast = () => {
  const toastManager = Toast.useToastManager()

  return (
    <div className='flex flex-col gap-2'>
      <Button
        variant='success'
        size='xl'
        rounded
        content='center'
        onClick={() => toastManager.add({ title: 'Download successfully', type: 'success', timeout: 0 })}
      >
        Success Toast
      </Button>
      <Button
        variant='secondary'
        size='xl'
        rounded
        content='center'
        onClick={() => toastManager.add({ description: 'Warning', type: 'warning' })}
      >
        Warning Toast
      </Button>
      <Button
        variant='danger'
        size='xl'
        rounded
        content='center'
        onClick={() => toastManager.add({ description: 'Error', type: 'danger' })}
      >
        Error Toast
      </Button>
      <Button
        variant='dark'
        size='xl'
        rounded
        content='center'
        onClick={() => {
          const id = toastManager.add({
            description: 'Actions',
            type: 'actions',
            actionProps: {
              children: 'Undo',
              onClick: () => {
                toastManager.close(id)
                toastManager.add({
                  title: 'Action undone',
                })
              },
            },
          })
        }}
      >
        Action Toast
      </Button>
    </div>
  )
}

export default function ToastDefault() {
  return (
    <Toast>
      <PushSuccessToast />
      <Toast.Container />
    </Toast>
  )
}
