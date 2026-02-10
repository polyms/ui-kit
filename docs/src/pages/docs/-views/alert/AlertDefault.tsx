import { Alert, Toast } from '@polyms/core'

export default function AlertDefault() {
  const toastManager = Toast.useToastManager()

  return (
    <div className='m-auto grid grid-cols-1 gap-2'>
      <Alert onDismiss={() => toastManager.add({ title: 'Dismissed!', type: 'success' })} variant='primary'>
        <Alert.Heading>New feature available</Alert.Heading>
        You can now export your data in multiple formats. Visit settings to configure your preferences.
      </Alert>

      <Alert onDismiss={() => toastManager.add({ title: 'Dismissed!', type: 'danger' })} variant='danger'>
        <Alert.Heading>Payment failed</Alert.Heading>
        Your payment method was declined. Please update your billing information to continue using our
        services.
      </Alert>
    </div>
  )
}
