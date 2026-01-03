import clsx from 'clsx'
import React from 'react'

export const OffcanvasItem = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function OffcanvasItem({ children, className, ...props }, ref) {
    return (
      <div {...props} className={clsx('offcanvas-item', className)} ref={ref}>
        {children}
      </div>
    )
  }
)
