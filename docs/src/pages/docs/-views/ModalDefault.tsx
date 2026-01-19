import { Button, Modal, type ModalSize } from '@polyms/core'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'

const sizes = ['sm', undefined, 'lg', 'xl', 'full'] as ModalSize[]

export default function ModalDefault() {
  const { value: open, toggle, setFalse } = useBoolean(false)
  const [size, setSize] = useState<ModalSize>('full')

  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Modal onOpenChange={toggle} open={open}>
        {sizes.map(size => (
          <Modal.Trigger
            className='btn btn-primary btn-xl mx-auto'
            key={size || 'default'}
            onClick={() => setSize(size)}
          >
            Open Modal {size}
          </Modal.Trigger>
        ))}
        <Modal.Content centered={size !== 'full'} scrollable={!1} size={size} title='Modal Title'>
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
                  <Button content='center' onClick={setFalse} rounded size='xl'>
                    Close
                  </Button>
                  <Button
                    className='px-lg'
                    content='center'
                    onClick={setFalse}
                    rounded
                    size='xl'
                    // autoFocus
                    variant='danger'
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
            <Button content='center' onClick={setFalse} rounded size='xl'>
              Close
            </Button>
            <Button
              className='px-lg'
              content='center'
              onClick={setFalse}
              rounded
              size='xl'
              // autoFocus
              variant='danger'
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  )
}
