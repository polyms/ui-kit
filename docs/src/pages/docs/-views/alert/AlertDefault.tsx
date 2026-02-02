import { Alert } from '@polyms/core'

export default function AlertDefault() {
  return (
    <div className='grid grid-cols-2 gap-2'>
      <Alert dismissible onDismiss={() => alert('Dismissed!')} variant='primary'>
        <Alert.Heading>New feature available</Alert.Heading>
        You can now export your data in multiple formats. Visit settings to configure your preferences.
      </Alert>

      <Alert dismissible onDismiss={() => alert('Dismissed!')} variant='danger'>
        <Alert.Heading>Payment failed</Alert.Heading>
        Your payment method was declined. Please update your billing information to continue using our
        services.
      </Alert>
    </div>
  )
}
