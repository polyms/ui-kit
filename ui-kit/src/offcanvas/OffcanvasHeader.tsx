import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasHeaderProps = useRender.ComponentProps<'div'>

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasHeader = forwardRef<HTMLDivElement, OffcanvasHeaderProps>(
  ({ className, render, ...props }, forwardedRef) => {
    const element = useRender({
      defaultTagName: 'div',
      ref: [forwardedRef],
      render,
      props: {
        ...props,
        className: clsx('offcanvas-heading', className),
      },
    })

    return element
  }
)

OffcanvasHeader.displayName = 'OffcanvasHeader'
