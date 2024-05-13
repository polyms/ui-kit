import {
  FloatingArrow,
  FloatingPortal,
  useMergeRefs,
  useTransitionStatus,
} from '@floating-ui/react'
import classNames from 'classnames'
import { HTMLProps, forwardRef } from 'react'

import { useTooltipContext } from './TooltipContext'

export const TooltipContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function TooltipContent({ style, className, children, ...props }, propRef) {
    const { arrowRef, ...ctx } = useTooltipContext()
    const ref = useMergeRefs([ctx.refs.setFloating, propRef])
    const { isMounted, status } = useTransitionStatus(ctx.context, {
      duration: { open: 500, close: 100 },
    })

    if (!isMounted) return null

    return (
      <FloatingPortal>
        <div
          ref={ref}
          style={{
            ...ctx.floatingStyles,
            ...style,
          }}
          {...ctx.getFloatingProps(props)}
          className={classNames('tooltip fade', className, {
            show: status === 'open',
          })}
          role='tooltip'
          data-status={status}
        >
          <FloatingArrow
            ref={arrowRef}
            tipRadius={2}
            width={12}
            height={6}
            context={ctx.context}
          />
          <div className='tooltip-inner'>{children}</div>
        </div>
      </FloatingPortal>
    )
  }
)
