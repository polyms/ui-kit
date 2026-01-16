import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbItemProps extends useRender.ComponentProps<'li'> {
  active?: boolean
  href?: string
  title?: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  active,
  className,
  href,
  title,
  children,
  render,
  ...props
}) => {
  const defaultProps = {
    'aria-current': 'page' as const,
    className: clsx('breadcrumb-item', active && 'active', className),
  }

  const content = href ? (
    <a className='link-dark' href={href} title={title}>
      {children}
    </a>
  ) : (
    children
  )

  return useRender({
    defaultTagName: 'li',
    props: { ...defaultProps, ...props, children: content },
    render,
  })
}
