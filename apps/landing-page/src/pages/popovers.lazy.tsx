import { Container, Popover } from '@polyms/core-ui'
import { createLazyFileRoute } from '@tanstack/react-router'

const Page = () => {
  return (
    <Container className='p-4'>
      <div className='col-lg-10 col-xl-9'>
        <h1>Popovers</h1>
        <p className='small'>
          <strong>
            Reference:&nbsp;
            <a
              href='https://getbootstrap.com/docs/5.3/components/popovers/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Bootstrap
            </a>
          </strong>
        </p>
        <p className='lead'>
          Documentation and examples for adding Bootstrap popovers, like those found in
          iOS, to any element on your site.
        </p>

        <Popover>
          <Popover.Trigger
            type='button'
            className='btn btn-lg btn-danger'
            data-bs-toggle='popover'
            data-bs-title='Popover title'
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Click to toggle popover
          </Popover.Trigger>
          <Popover.Content></Popover.Content>
        </Popover>
      </div>
    </Container>
  )
}

export const Route = createLazyFileRoute('/popovers')({
  component: Page,
})
