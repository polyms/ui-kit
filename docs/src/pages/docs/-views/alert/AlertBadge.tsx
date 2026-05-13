import { Alert, Toast } from '@polyms/core'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function AlertBadge() {
  const toastManager = Toast.useToastManager()

  return (
    <div className='m-auto grid grid-cols-1 gap-2'>
      <Alert badge='::: NEW :::' variant='info'>
        <Alert.Heading>Terms of service</Alert.Heading>
        We updated our policies. Review the legal page to see what changed before you continue.
      </Alert>

      <Alert
        badge='• Live •'
        onDismiss={() => toastManager.add({ title: 'Alert dismissed', type: 'success' })}
        variant='success'
      >
        <Alert.Heading>Deployment</Alert.Heading>
        Your latest build is running in production. Dismiss this reminder when you are done.
      </Alert>

      <Alert badge={<span className='tabular-nums'>• 3 •</span>} variant='warning'>
        <Alert.Heading>Pending invitations</Alert.Heading>
        Teammates are waiting for access. Resend or revoke invites from the team settings page.
      </Alert>
    </div>
  )
}
