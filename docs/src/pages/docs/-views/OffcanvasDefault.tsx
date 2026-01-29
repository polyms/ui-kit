import { Offcanvas, useBoolean } from '@polyms/core'

export default function OffcanvasDefault() {
  const { value: open, toggle } = useBoolean()

  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Offcanvas onOpenChange={toggle} open={open}>
        <Offcanvas.Trigger className='btn btn-xl btn-primary mx-auto'>Open Offcanvas</Offcanvas.Trigger>
        <Offcanvas.Content backdrop={false} closeButton title='Offcanvas Title'>
          <Offcanvas.Header>Offcanvas Header</Offcanvas.Header>
          <Offcanvas.Description>Offcanvas body text goes here.</Offcanvas.Description>
        </Offcanvas.Content>
      </Offcanvas>
    </div>
  )
}
