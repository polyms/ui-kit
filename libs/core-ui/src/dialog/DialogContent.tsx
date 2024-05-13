import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react'
import { HTMLProps, forwardRef } from 'react'

import { useDialogContext } from './DialogContext'

export const DialogContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function DialogContent(props, propRef) {
    const { context: floatingContext, ...context } = useDialogContext()
    const ref = useMergeRefs([context.refs.setFloating, propRef])

    if (!floatingContext.open) return null

    return (
      <FloatingPortal>
        <FloatingOverlay className='Dialog-overlay' lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <div
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
            >
              {props.children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    )
  }
)
