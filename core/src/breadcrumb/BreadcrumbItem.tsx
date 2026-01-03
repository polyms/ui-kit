import clsx from 'clsx'
import { forwardRef, type HTMLAttributes } from 'react'

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ active, href, title, children, ...rest }, ref) => {
    return (
      <li className={clsx('breadcrumb-item', active && 'active')} aria-current='page' {...rest} ref={ref}>
        {href ? (
          <a href={href} title={title} className='link-dark'>
            {children}
          </a>
        ) : (
          children
        )}
      </li>
    )
  }
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

type BreadcrumbItemProps = HTMLAttributes<HTMLLIElement> & {
  active?: boolean
  href?: string
  title?: string
}
