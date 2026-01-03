import { Tooltip } from '@base-ui/react/tooltip'
import clsx from 'clsx'
import { forwardRef, type HTMLProps } from 'react'

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { children, className, side, align, ...props },
  propRef
) {
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={8} side={side} align={align} className='tooltip-positioner'>
        <Tooltip.Popup {...props} className={clsx('tooltip-popup', className)} ref={propRef}>
          <Tooltip.Arrow className='tooltip-arrow'>
            <ArrowSvg />
          </Tooltip.Arrow>
          {children}
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  )
})

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='20' height='16' viewBox='0 0 20 10' fill='none' {...props}>
      <path
        d='M7.23597 4.78771L4.80758 6.97327C4.07308 7.63432 3.11989 8.00009 2.13172 8.00009H0V10.0001H20V8.00009H18.5349C17.5468 8.00009 16.5936 7.63432 15.8591 6.97327L13.4307 4.78771C10.6043 2.24395 10.1804 2.1377 7.23597 4.78771Z'
        className='fill-neutral-900'
      />
      <path
        d='M7.90492 5.53099C5.47654 7.71654 5.47654 7.71654 5.47654 7.71654C4.55842 8.54285 3.36693 9.00006 2.13172 9.00006H0V8.00006H2.13172C3.11989 8.00006 4.07308 7.63429 4.80758 6.97324C4.80758 6.97324 4.41356 7.32786 7.23597 4.78768C10.0584 2.24751 10.4867 2.1381 13.4307 4.78768L15.8591 6.97324C16.5936 7.63429 17.5468 8.00006 18.5349 8.00006H20V9.00006H18.5349C17.2998 9.00006 16.1083 8.54284 15.1901 7.71654C15.1901 7.71654 15.1901 7.71654 12.7617 5.53099C10.3333 3.34545 10.3333 3.34545 7.90492 5.53099Z'
        className='fill-neutral-900'
      />
    </svg>
  )
}

// ======================================================================================

type TooltipContentProps = HTMLProps<HTMLDivElement> & Pick<Tooltip.Positioner.Props, 'side' | 'align'>
