import { Button, Toast } from '@polyms/core'

const ToastDefault = () => {
  const toastManager = Toast.useToastManager()

  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Button
        content='center'
        onClick={() =>
          toastManager.add({
            title: 'Changes saved',
            description: 'Your preferences have been updated successfully.',
            type: 'success',
            timeout: 0,
          })
        }
        outlined
        rounded
        size='xl'
        variant='success'
      >
        Success Toast
      </Button>
      <Button
        content='center'
        onClick={() =>
          toastManager.add({
            title: 'Connection failed',
            description: 'Unable to connect to the server. Please check your internet connection.',
            type: 'danger',
            timeout: 0,
          })
        }
        outlined
        rounded
        size='xl'
        variant='danger'
      >
        Error Toast
      </Button>
      <Button
        content='center'
        onClick={() =>
          toastManager.add({
            title: 'New update available',
            description: 'Version 2.0 is now available. Update to get the latest features.',
            type: 'info',
            timeout: 0,
          })
        }
        outlined
        rounded
        size='xl'
        variant='primary'
      >
        Info Toast
      </Button>
      <Button
        content='center'
        onClick={() =>
          toastManager.add({
            title: 'Storage almost full',
            description: 'You have used 90% of your storage. Consider upgrading your plan.',
            type: 'warning',
            timeout: 0,
          })
        }
        outlined
        rounded
        size='xl'
        variant='warning'
      >
        Warning Toast
      </Button>
      <Button
        content='center'
        onClick={() => {
          toastManager.promise(
            new Promise(resolve => {
              setTimeout(() => resolve('done'), 2000)
            }),
            {
              loading: {
                title: 'Uploading file...',
                description: 'Please wait while we upload your file.',
              },
              success: {
                timeout: 0,
                title: 'Upload complete',
                description: 'Your file has been uploaded successfully.',
              },
              error: {
                timeout: 0,
                title: 'Upload failed',
                description: 'The upload was interrupted. Please try again.',
                actionProps: {
                  children: 'Retry',
                  onClick() {
                    // Retry upload logic
                  },
                },
              },
            }
          )
        }}
        outlined
        rounded
        size='xl'
        variant='primary'
      >
        Promise Toast
      </Button>
      <Button
        content='center'
        onClick={() => {
          const id = toastManager.add({
            timeout: 0,
            title: 'Message deleted',
            description: 'Your message has been permanently removed.',
            type: 'actions',
            actionProps: {
              children: 'Undo',
              onClick: () => {
                toastManager.close(id)
                toastManager.add({
                  title: 'Message restored',
                  description: 'Your message has been recovered.',
                  type: 'success',
                })
              },
            },
          })
        }}
        outlined
        rounded
        size='xl'
        variant='dark'
      >
        Action Toast
      </Button>
    </div>
  )
}

export default ToastDefault
