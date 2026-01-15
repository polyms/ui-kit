import clsx from 'clsx'
import { forwardRef, type HTMLProps, useId, useLayoutEffect } from 'react'

import { useOffcanvasContext } from './OffcanvasContext'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasDescription = forwardRef<HTMLParagraphElement, HTMLProps<HTMLParagraphElement>>(
  function OffcanvasDescription({ children, className, ...props }, ref) {
    const { setDescriptionId } = useOffcanvasContext()
    const id = useId()

    // Only sets `aria-describedby` on the Offcanvas root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setDescriptionId(id)
      return () => setDescriptionId(undefined)
    }, [id, setDescriptionId])

    return (
      <div {...props} className={clsx('offcanvas-description', className)} id={id} ref={ref}>
        {children}
      </div>
    )
  }
)
