import { Button, Modal, useModalStore } from '@polyms/core-ui'

const MODAL_ID = 'programmatic-demo'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ModalProgrammatic() {
  const showConfirm = () => {
    useModalStore.getState().showModal(
      MODAL_ID,
      <Modal.Content size='sm'>
        <Modal.Header>Delete project?</Modal.Header>
        <Modal.Body>This action cannot be undone. All data will be permanently removed.</Modal.Body>
        <Modal.Footer>
          <Modal.Close render={<Button rounded />}>Cancel</Modal.Close>
          <Button
            autoFocus
            onClick={() => useModalStore.getState().closeModal(MODAL_ID)}
            rounded
            variant='danger'
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>,
      {
        onClose: reason => {
          console.log('Modal closed:', reason)
        },
      }
    )
  }

  return (
    <>
      <Modal.Container />
      <Button className='m-auto' onClick={showConfirm} rounded size='xl' variant='primary'>
        Open programmatic modal
      </Button>
    </>
  )
}
