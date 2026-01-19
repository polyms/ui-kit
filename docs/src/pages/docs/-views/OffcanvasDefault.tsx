import { Offcanvas } from '@polyms/core'
import { useBoolean } from 'usehooks-ts'

export default function OffcanvasDefault() {
  const { value: open, toggle } = useBoolean()

  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Offcanvas onOpenChange={toggle} open={open}>
        <Offcanvas.Trigger className='btn btn-primary btn-xl mx-auto'>Open Offcanvas</Offcanvas.Trigger>
        <Offcanvas.Content backdrop={false} title='Offcanvas Title'>
          <Offcanvas.Header closeButton>Offcanvas Header</Offcanvas.Header>
          <Offcanvas.Description>Offcanvas body text goes here.</Offcanvas.Description>
        </Offcanvas.Content>
      </Offcanvas>
    </div>
  )
}
