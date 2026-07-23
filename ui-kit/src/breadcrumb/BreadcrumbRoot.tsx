import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbRootProps extends useRender.ComponentProps<'ol'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const BreadcrumbRoot: FC<BreadcrumbRootProps> = ({ className, render, ...props }) => {
  const defaultProps = {
    className: clsx('breadcrumb', className),
  }
  return useRender({
    defaultTagName: 'ol',
    props: { ...defaultProps, ...props },
    render,
  })
}
