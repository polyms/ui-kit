import { FloatingPortal, useMergeRefs } from '@floating-ui/react'
import type React from 'react'
import { cloneElement, Fragment, forwardRef, type HTMLProps, isValidElement } from 'react'

import { useValidation } from './useValidation'

export const ValidationTooltip = forwardRef<HTMLElement, HTMLProps<HTMLElement> & FloatingToolTipProps>(
  ({ children, invalidFeedback, floatingRoot: floatingRootId, defaultShowOnError, ...props }, ref) => {
    const { refs, floatingStyles, isOpen, getFloatingProps, getReferenceProps } = useValidation()

    const mergeRef = useMergeRefs([refs.setReference, ref])
    const getProps = getReferenceProps()

    const triggerProps = Object.fromEntries(
      Object.keys(getProps).map(event => [
        event,
        (e: Event) => {
          //@ts-expect-error
          props[event]?.(e)
          //@ts-expect-error
          getProps[event](e)
        },
      ])
    )

    let trigger = null
    if (isValidElement(children)) {
      trigger = cloneElement(children as never, {
        ...props,
        ...triggerProps,
        ref: mergeRef,
      })
    }

    return (
      <Fragment>
        {trigger}

        <FloatingPortal id={floatingRootId}>
          {(isOpen || defaultShowOnError) && invalidFeedback && (
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 99999 }}
              {...getFloatingProps()}
              className='invalid-feedback'
            >
              {invalidFeedback}
            </div>
          )}
        </FloatingPortal>
      </Fragment>
    )
  }
)

// ======================================================================================

type FloatingToolTipProps = {
  children: React.ReactNode
  invalidFeedback?: React.ReactNode
  floatingRoot?: string
  defaultShowOnError?: boolean
}
