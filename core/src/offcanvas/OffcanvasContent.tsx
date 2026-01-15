import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react'
import clsx from 'clsx'
import { forwardRef, type HTMLProps } from 'react'

import { Spinner } from '../loading/Spinner'
import { useOffcanvasContext } from './OffcanvasContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasContentProps = HTMLProps<HTMLDivElement> & {
  loading?: boolean
  backdrop?: boolean
  floatingRoot?: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasContent = forwardRef<HTMLDivElement, OffcanvasContentProps>(function OffcanvasContent(
  { loading, backdrop: backdropProp, floatingRoot, ...props },
  propRef
) {
  const backdrop = backdropProp === undefined ? window.innerWidth < 768 : backdropProp
  const { context: floatingContext, status, nodeId, isMounted, ...context } = useOffcanvasContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  if (!isMounted) return null

  return (
    <FloatingNode id={nodeId}>
      <FloatingPortal id={floatingRoot}>
        <FloatingFocusManager context={floatingContext} initialFocus={-1}>
          <FloatingOverlay
            className={clsx('offcanvas offcanvas-overlay', props.className, status, { backdrop })}
            data-status={status}
            lockScroll={backdrop}
          >
            <div
              aria-describedby={context.descriptionId}
              // aria-labelledby={context.labelId}
              ref={ref}
              {...context.getFloatingProps(props)}
              className={clsx('offcanvas-content overflow-auto', props.className, status, {
                loading,
              })}
            >
              {props.children}
            </div>
            {loading && (
              <div className='loading-overlay'>
                <Spinner size={36} />
              </div>
            )}
          </FloatingOverlay>
        </FloatingFocusManager>
      </FloatingPortal>
    </FloatingNode>
  )
})
