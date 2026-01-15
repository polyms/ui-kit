import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalBodyProps extends useRender.ComponentProps<'div'> {}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

export const ModalBody: FC<ModalBodyProps> = ({ className, render, ...props }) => {
  const defaultProps = {
    className: clsx('modal-body', className),
  }

  return useRender({
    defaultTagName: 'div',
    props: { ...defaultProps, ...props },
    render,
  })
}
