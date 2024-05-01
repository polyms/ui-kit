import { Container } from '@polyms/core-ui'
import { PropsWithChildren } from 'react'

export const DocLayout = ({ title, refUrl, children }: DocLayoutProps) => {
  return (
    <Container className='p-4'>
      <div className='col-lg-10 col-xl-9'>
        <h1>{title}</h1>
        {refUrl && (
          <p className='small'>
            <strong>
              Reference:&nbsp;
              <a href={refUrl} target='_blank' rel='noopener noreferrer'>
                Bootstrap
              </a>
            </strong>
          </p>
        )}
        {children}
      </div>
    </Container>
  )
}

DocLayout.SubTitle = ({ children }: PropsWithChildren) => (
  <p className='lead'>{children}</p>
)

// ======================================================================================

type DocLayoutProps = PropsWithChildren<{
  title: string
  refUrl?: string
}>
