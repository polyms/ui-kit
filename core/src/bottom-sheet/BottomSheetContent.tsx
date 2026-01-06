import { Dialog } from '@base-ui/react/dialog'
import { ArrowLeft01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { Button } from '../button'

export const BottomSheetContent = ({
  children,
  title,
  rootClassName,
  className,
  onBack,
  close,
  id: propId,
}: BottomSheetContentProps) => {
  const genId = useId()
  const id = propId || genId

  return (
    <Dialog.Portal>
      <Dialog.Backdrop className='bottom-sheet-backdrop' />

      <BottomSheetPopup id={id} className={rootClassName} title={title} onBack={onBack} close={close}>
        <div className={clsx(className, 'bottom-sheet-body')}>{children}</div>
      </BottomSheetPopup>
    </Dialog.Portal>
  )
}

const BottomSheetPopup = ({
  id,
  className,
  children,
  title,
  onBack,
  close,
}: React.PropsWithChildren & {
  id: string
  className?: string
  title: React.ReactNode
  onBack?: React.MouseEventHandler<HTMLButtonElement>
  close?: boolean
}) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Check xem element có scrollable không
  const isScrollableElement = useCallback((element: HTMLElement | null): boolean => {
    if (!element) return false
    const hasScroll = element.scrollHeight > element.clientHeight
    const canScroll = hasScroll && getComputedStyle(element).overflowY !== 'hidden'
    return canScroll
  }, [])

  const handleDragStart = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement

      // Chỉ cho phép drag từ header area
      const isFromHeader = headerRef.current?.contains(target)
      if (!isFromHeader) {
        // Check xem có phải đang trong scrollable content không
        let current: HTMLElement | null = target
        while (current && current !== sheetRef.current) {
          if (isScrollableElement(current)) {
            // Nếu là scrollable content thì không drag
            return
          }
          current = current.parentElement
        }
      }

      const clientY = e instanceof MouseEvent ? e.clientY : (e as TouchEvent).touches?.[0]?.clientY
      if (clientY !== undefined) {
        setStartY(clientY)
        setIsDragging(true)
      }
    },
    [isScrollableElement]
  )

  const handleDragMove = useCallback(
    (e: Event) => {
      if (!startY || !isDragging) return
      const clientY = e instanceof MouseEvent ? e.clientY : (e as TouchEvent).touches?.[0]?.clientY
      if (clientY === undefined) return

      const deltaY = clientY - startY
      if (deltaY > 0 && sheetRef.current) {
        setCurrentY(deltaY)
        sheetRef.current.style.transform = `translateY(${deltaY}px)`
      }
    },
    [startY, isDragging]
  )

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return

    if (currentY > 100) {
      // Đóng nếu kéo xuống quá 100px
      closeRef.current?.click()
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = ''
    }
    setStartY(0)
    setCurrentY(0)
    setIsDragging(false)
  }, [currentY, isDragging])

  useEffect(() => {
    const sheet = sheetRef.current
    if (!sheet) return

    sheet.addEventListener('mousedown', handleDragStart)
    sheet.addEventListener('mousemove', handleDragMove)
    sheet.addEventListener('mouseup', handleDragEnd)
    sheet.addEventListener('mouseleave', handleDragEnd)
    sheet.addEventListener('touchstart', handleDragStart)
    sheet.addEventListener('touchmove', handleDragMove)
    sheet.addEventListener('touchend', handleDragEnd)

    return () => {
      sheet.removeEventListener('mousedown', handleDragStart)
      sheet.removeEventListener('mousemove', handleDragMove)
      sheet.removeEventListener('mouseup', handleDragEnd)
      sheet.removeEventListener('mouseleave', handleDragEnd)
      sheet.removeEventListener('touchstart', handleDragStart)
      sheet.removeEventListener('touchmove', handleDragMove)
      sheet.removeEventListener('touchend', handleDragEnd)
    }
  }, [handleDragStart, handleDragMove, handleDragEnd])

  return (
    <>
      <Dialog.Popup id={id} className={clsx('bottom-sheet-popup', className)} ref={sheetRef}>
        <div className='bottom-sheet-header' ref={headerRef}>
          {onBack && (
            <Button icon onClick={onBack}>
              <HugeiconsIcon icon={ArrowLeft01Icon} width={18} height={18} strokeWidth={1.5} />
            </Button>
          )}
          <span className='bottom-sheet-title'>{title}</span>
          {close && (
            <Dialog.Close
              autoFocus={false}
              render={
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  width={18}
                  height={18}
                  className='link-light cursor-pointer outline-none'
                  strokeWidth={3}
                />
              }
            />
          )}
        </div>
        {children}
      </Dialog.Popup>
      <Dialog.Close ref={closeRef} />
    </>
  )
}

// ======================================================================================

type BottomSheetContentProps = React.PropsWithChildren & {
  id?: string
  title: React.ReactNode
  className?: string
  rootClassName?: string
  onBack?: React.MouseEventHandler<HTMLButtonElement>
  close?: boolean
}
