import { Button, Toast } from '@polyms/core'

const PushSuccessToast = () => {
  const toastManager = Toast.useToastManager()

  return (
    <div className='flex flex-col gap-2'>
      <Button
        content='center'
        onClick={() => toastManager.add({ title: 'Download successfully', type: 'success', timeout: 0 })}
        rounded
        size='xl'
        variant='success'
      >
        Success Toast
      </Button>
      <Button
        content='center'
        onClick={() => toastManager.add({ description: 'Warning', type: 'warning' })}
        rounded
        size='xl'
        variant='warning'
      >
        Warning Toast
      </Button>
      <Button
        content='center'
        onClick={() => toastManager.add({ description: 'Error', type: 'danger' })}
        rounded
        size='xl'
        variant='danger'
      >
        Error Toast
      </Button>
      <Button
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
        rounded
        size='xl'
        variant='dark'
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
