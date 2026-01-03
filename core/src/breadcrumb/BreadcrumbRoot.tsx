import { forwardRef, type HTMLAttributes } from 'react'

export const BreadcrumbRoot = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>((props, ref) => {
  return <ol className='breadcrumb' {...props} ref={ref} />
})

BreadcrumbRoot.displayName = 'BreadcrumbRoot'
