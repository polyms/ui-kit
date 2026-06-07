import { Button, Offcanvas, useOffcanvasStore } from '@polyms/core'

const OFFCANVAS_ID = 'programmatic-demo'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function OffcanvasProgrammatic() {
  const showPanel = () => {
    useOffcanvasStore.getState().showOffcanvas(
      OFFCANVAS_ID,
      <Offcanvas.Content closeButton>
        <Offcanvas.Header>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Description>You have 3 unread updates from your team.</Offcanvas.Description>
        <Offcanvas.Body>
          <div className='space-y-3'>
            <section className='rounded-lg border border-line p-4'>
              <p className='font-semibold text-fg text-sm'>Deployment finished</p>
              <p className='mt-1 text-muted text-sm'>Production build shipped successfully.</p>
            </section>
            <Button
              content='center'
              onClick={() => useOffcanvasStore.getState().closeOffcanvas(OFFCANVAS_ID)}
              rounded
              variant='primary'
            >
              Mark all as read
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas.Content>,
      {
        onClose: reason => {
          console.log('Offcanvas closed:', reason)
        },
      }
    )
  }

  return (
    <>
      <Offcanvas.Container />
      <Button className='m-auto' content='center' onClick={showPanel} rounded size='xl' variant='primary'>
        Open programmatic offcanvas
      </Button>
    </>
  )
}
