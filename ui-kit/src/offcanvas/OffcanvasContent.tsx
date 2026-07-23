import { Drawer } from '@base-ui/react/drawer'
import { ScrollArea } from '@base-ui/react/scroll-area'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { OffcanvasClose } from './OffcanvasClose'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

const sizeMap = {
  sm: 'offcanvas-sm',
  md: 'offcanvas-md',
  lg: 'offcanvas-lg',
  xl: 'offcanvas-xl',
  '2xl': 'offcanvas-2xl',
  '3xl': 'offcanvas-3xl',
  full: 'offcanvas-full',
}

export type OffcanvasSize = keyof typeof sizeMap

type OffcanvasContentProps = Drawer.Popup.Props & {
  closeButton?: boolean
  backdrop?: boolean
  size?: OffcanvasSize
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasContent = forwardRef<HTMLDivElement, OffcanvasContentProps>(function OffcanvasContent(
  { children, closeButton = true, backdrop = true, size, className, ...props },
  ref
) {
  return (
    <Drawer.Portal>
      {backdrop && <Drawer.Backdrop className='offcanvas-backdrop' />}
      <Drawer.Viewport className='offcanvas-viewport'>
        <ScrollArea.Root className='offcanvas-scroll-area' style={{ position: undefined }}>
          <ScrollArea.Viewport className='offcanvas-scroll-viewport'>
            <ScrollArea.Content className='offcanvas-scroll-content'>
              <Drawer.Popup
                className={clsx('offcanvas-content', size && sizeMap[size], className)}
                ref={ref}
                {...props}
              >
                <div className='offcanvas-mobile-header'>
                  <div aria-hidden className='offcanvas-mobile-header-spacer' />
                  <div aria-hidden className='offcanvas-mobile-handle' />
                  {closeButton && <OffcanvasClose aria-label='Close' className='offcanvas-close' />}
                </div>
                <Drawer.Content className='offcanvas-content-inner'>
                  {closeButton && <OffcanvasClose aria-label='Close' className='offcanvas-close' />}
                  {children}
                </Drawer.Content>
              </Drawer.Popup>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className='offcanvas-scrollbar'>
            <ScrollArea.Thumb className='offcanvas-scrollbar-thumb' />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Drawer.Viewport>
    </Drawer.Portal>
  )
})

OffcanvasContent.displayName = 'OffcanvasContent'
