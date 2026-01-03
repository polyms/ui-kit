import { Button, Modal, type ModalSize } from '@polyms/core'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'

const sizes = ['sm', undefined, 'lg', 'xl', 'full'] as ModalSize[]

export default function ModalDefault() {
  const { value: open, toggle, setFalse } = useBoolean(false)
  const [size, setSize] = useState<ModalSize>('full')

  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Modal open={open} onOpenChange={toggle}>
        {sizes.map(size => (
          <Modal.Trigger
            key={size || 'default'}
            className='btn btn-primary btn-xl mx-auto'
            onClick={() => setSize(size)}
          >
            Open Modal {size}
          </Modal.Trigger>
        ))}
        <Modal.Content scrollable={!1} size={size} centered={size !== 'full'} title='Modal Title'>
          <Modal.Header>Modal Header</Modal.Header>
          <Modal.Body>
            <div className='text-2xl'>Title</div>
            Modal body text goes here.
            <br />
            <Modal>
              <Modal.Trigger className='btn btn-primary btn-xl mx-auto'>Nested modal</Modal.Trigger>
              <Modal.Content title='Nested Modal Title'>
                <Modal.Header>Modal Header</Modal.Header>
                <Modal.Body>
                  <div className='text-2xl'>Title</div>
                  Modal body text goes here.
                  <div className='h-200' />
                  Modal end body text goes here.
                </Modal.Body>
                <Modal.Footer>
                  <Button size='xl' rounded content='center' onClick={setFalse}>
                    Close
                  </Button>
                  <Button
                    size='xl'
                    rounded
                    variant='danger'
                    className='px-lg'
                    content='center'
                    // autoFocus
                    onClick={setFalse}
                  >
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <div className='h-200' />
            Modal end body text goes here.
          </Modal.Body>
          <Modal.Footer>
            <Button size='xl' rounded content='center' onClick={setFalse}>
              Close
            </Button>
            <Button
              size='xl'
              rounded
              variant='danger'
              className='px-lg'
              content='center'
              // autoFocus
              onClick={setFalse}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  )
}
