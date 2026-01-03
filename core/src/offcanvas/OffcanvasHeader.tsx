import clsx from 'clsx'
import { forwardRef, type HTMLProps, useId, useLayoutEffect } from 'react'

import { OffcanvasClose } from './OffcanvasClose'
import { useOffcanvasContext } from './OffcanvasContext'

export const OffcanvasHeader = forwardRef<HTMLHeadingElement, OffcanvasHeaderProps>(function OffcanvasHeader(
  { children, className, closeButton, ...props },
  ref
) {
  const { setLabelId } = useOffcanvasContext()
  const id = useId()

  // Only sets `aria-labelledby` on the Offcanvas root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setLabelId(id)
    return () => setLabelId(undefined)
  }, [id, setLabelId])

  return (
    <h2 {...props} className={clsx('offcanvas-heading', className)} ref={ref} id={id}>
      {children}
      {closeButton && <OffcanvasClose className='ms-auto p-0_125' />}
    </h2>
  )
})

// ======================================================================================

export type OffcanvasHeaderProps = HTMLProps<HTMLHeadingElement> & {
  closeButton?: boolean
}
