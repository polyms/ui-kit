import { PropsWithChildren } from 'react'
import slugify from 'slugify'

import AnchorIcon from '../assets/anchor.svg'

export const Section = ({ title, children }: SectionProps) => {
  const id = slugify(title, { lower: true })
  return (
    <>
      <h2 id={id} className='d-flex gap-2'>
        {title}
        <a href={`#${id}`}>
          <AnchorIcon width={16} height={16} />
        </a>
      </h2>
      <p>{children}</p>
    </>
  )
}

// ======================================================================================

type SectionProps = PropsWithChildren<{
  title: string
}>
