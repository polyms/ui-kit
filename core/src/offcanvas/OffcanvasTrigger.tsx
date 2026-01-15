/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import { useMergeRefs } from '@floating-ui/react'
import { cloneElement, forwardRef, type HTMLProps, isValidElement, type ReactNode } from 'react'

import { Button, type ButtonProps } from '../button'
import { useOffcanvasContext } from './OffcanvasContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface OffcanvasTriggerProps {
  children: ReactNode
  asChild?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasTrigger = forwardRef<HTMLElement, ButtonProps & OffcanvasTriggerProps>(
  function OffcanvasTrigger({ children, asChild = false, ...props }, propRef) {
    const context = useOffcanvasContext()
    const childrenRef = (children as any).ref
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && isValidElement(children)) {
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...(children.props as any),
          'data-state': context.open ? 'open' : 'closed',
        })
      )
    }

    return (
      <Button
        data-state={context.open ? 'open' : 'closed'}
        // The user can style the trigger based on the state
        ref={ref}
        {...context.getReferenceProps(props as HTMLProps<HTMLButtonElement>)}
      >
        {children}
      </Button>
    )
  }
)
