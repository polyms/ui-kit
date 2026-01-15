import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalFooterProps extends useRender.ComponentProps<'div'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ModalFooter: FC<ModalFooterProps> = ({ className, render, ...props }) => {
  const defaultProps = {
    className: clsx('modal-footer', className),
  }

  return useRender({
    defaultTagName: 'div',
    props: { ...defaultProps, ...props },
    render,
  })
}
