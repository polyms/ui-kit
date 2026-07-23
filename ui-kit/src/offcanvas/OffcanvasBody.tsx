import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasBodyProps = useRender.ComponentProps<'div'>

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function OffcanvasBody({ className, render, ...props }: OffcanvasBodyProps) {
  const element = useRender({
    defaultTagName: 'div',
    ref: props.ref,
    render,
    props: {
      ...props,
      className: clsx('offcanvas-body', className),
    },
  })

  return element
}
