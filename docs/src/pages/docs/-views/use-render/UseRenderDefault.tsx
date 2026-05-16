import { Breadcrumb, Button } from '@polyms/core'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function UseRenderDefault() {
  return (
    <div className='m-auto flex max-w-lg flex-col gap-6'>
      <Button
        className='w-fit'
        render={
          <a href='#render-demo' title='Link-styled button'>
            Link-styled button
          </a>
        }
        rounded
        variant='primary'
      />
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active render={<span className='breadcrumb-item' />}>
          Current (custom li via render)
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
