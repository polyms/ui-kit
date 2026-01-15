import clsx from 'clsx'
import { forwardRef, type HTMLAttributes } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type BreadcrumbItemProps = HTMLAttributes<HTMLLIElement> & {
  active?: boolean
  href?: string
  title?: string
}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ active, href, title, children, ...rest }, ref) => {
    return (
      <li aria-current='page' className={clsx('breadcrumb-item', active && 'active')} {...rest} ref={ref}>
        {href ? (
          <a className='link-dark' href={href} title={title}>
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
