import { Drawer } from '@base-ui/react/drawer'
import { ScrollArea } from '@base-ui/react/scroll-area'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { OffcanvasClose } from './OffcanvasClose'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasContentProps = Drawer.Popup.Props & {
  closeButton?: boolean
  backdrop?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasContent = forwardRef<HTMLDivElement, OffcanvasContentProps>(function OffcanvasContent(
  { children, closeButton = true, backdrop = true, className, ...props },
  ref
) {
  return (
    <Drawer.Portal>
      {backdrop && <Drawer.Backdrop className='offcanvas-backdrop' />}
      <Drawer.Viewport className='offcanvas-viewport'>
        <ScrollArea.Root className='offcanvas-scroll-area' style={{ position: undefined }}>
          <ScrollArea.Viewport className='offcanvas-scroll-viewport'>
            <ScrollArea.Content className='offcanvas-scroll-content'>
              <Drawer.Popup className={clsx('offcanvas-content', className)} ref={ref} {...props}>
                <div className='offcanvas-mobile-header'>
                  <div aria-hidden className='offcanvas-mobile-header-spacer' />
                  <div aria-hidden className='offcanvas-mobile-handle' />
                  {closeButton && <OffcanvasClose aria-label='Close' />}
                </div>
                <Drawer.Content className='offcanvas-content-inner'>
                  {closeButton && <OffcanvasClose aria-label='Close' />}
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
