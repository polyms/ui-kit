import { Button, Menu, Toolbar } from '@polyms/core-ui'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToolbarResponsive() {
  return (
    <div className='mx-auto w-full max-w-sm p-6'>
      <p className='mb-3 text-muted text-sm'>
        Narrow viewport: scroll the toolbar; overflow actions stay inside the same chrome via a menu trigger.
      </p>
      <div className='overflow-x-auto'>
        <Toolbar aria-label='Table actions' className='w-max min-w-full'>
          <Toolbar.Group aria-label='Selection'>
            <Toolbar.Button render={<Button size='sm' variant='light' />}>Export</Toolbar.Button>
            <Toolbar.Button render={<Button size='sm' variant='light' />}>Archive</Toolbar.Button>
          </Toolbar.Group>
          <Toolbar.Separator className='ms-auto' orientation='vertical' />
          <Toolbar.Group aria-label='View' className='hidden sm:inline-flex'>
            <Toolbar.Button render={<Button size='sm' variant='light' />}>Columns</Toolbar.Button>
            <Toolbar.Button render={<Button size='sm' variant='light' />}>Density</Toolbar.Button>
          </Toolbar.Group>
          <Menu>
            <Toolbar.Button className='sm:hidden' render={<Menu.Trigger />}>
              More
            </Toolbar.Button>
            <Menu.Content>
              <Menu.Item>Columns</Menu.Item>
              <Menu.Item>Density</Menu.Item>
            </Menu.Content>
          </Menu>
        </Toolbar>
      </div>
    </div>
  )
}
