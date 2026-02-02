import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface AlertHeadingProps extends useRender.ComponentProps<'h4'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AlertHeading: FC<AlertHeadingProps> = ({ className, render, ...props }) => {
  const defaultProps = {
    className: clsx('alert-heading', className),
  }

  return useRender({
    defaultTagName: 'p',
    props: { ...defaultProps, ...props },
    render,
  })
}
