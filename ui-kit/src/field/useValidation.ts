import { autoUpdate, flip, offset, type UseFloatingReturn, useFloating } from '@floating-ui/react-dom'
import { type CSSProperties, type HTMLProps, useCallback, useEffect, useId, useRef, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OpenReasons = {
  focus: boolean
  hover: boolean
  click: boolean
}

export type ValidationContextType = {
  isOpen: boolean
  floatingId: string
  refs: UseFloatingReturn['refs']
  floatingStyles: CSSProperties
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

export const useValidation = ({
  controlId,
  described = false,
}: {
  controlId?: string
  /** Keep aria-describedby when feedback is visible without interaction (e.g. defaultShowOnError). */
  described?: boolean
} = {}): ValidationContextType => {
  const floatingId = useId()
  const reasonsRef = useRef<OpenReasons>({ focus: false, hover: false, click: false })
  const blockFocusRef = useRef(false)
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const syncOpen = useCallback(() => {
    const { focus, hover, click } = reasonsRef.current
    setIsOpen(focus || hover || click)
  }, [])

  const setReason = useCallback(
    (reason: keyof OpenReasons, value: boolean) => {
      if (reasonsRef.current[reason] === value) return
      reasonsRef.current[reason] = value
      syncOpen()
    },
    [syncOpen]
  )

  const clearHoverCloseTimeout = useCallback(() => {
    if (hoverCloseTimeoutRef.current != null) {
      clearTimeout(hoverCloseTimeoutRef.current)
      hoverCloseTimeoutRef.current = null
    }
  }, [])

  const scheduleHoverClose = useCallback(() => {
    clearHoverCloseTimeout()
    // Defer so pointer can enter the floating node before hover clears (Floating UI bridge)
    hoverCloseTimeoutRef.current = setTimeout(() => {
      hoverCloseTimeoutRef.current = null
      setReason('hover', false)
    }, 0)
  }, [clearHoverCloseTimeout, setReason])

  const clearReasons = useCallback(() => {
    clearHoverCloseTimeout()
    reasonsRef.current = { focus: false, hover: false, click: false }
    setIsOpen(false)
  }, [clearHoverCloseTimeout])

  useEffect(() => () => clearHoverCloseTimeout(), [clearHoverCloseTimeout])

  const { refs, floatingStyles, elements } = useFloating({
    open: isOpen,
    placement: 'top-end',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 5 }),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
    ],
  })

  // Auto-attach to control element via id
  useEffect(() => {
    if (!controlId) return
    const element = document.getElementById(controlId)
    if (element) refs.setReference(element)
  }, [controlId, refs.setReference])

  // Focus / hover / click on the reference (parity with Floating UI interaction hooks)
  useEffect(() => {
    const reference = elements.reference
    if (!(reference instanceof HTMLElement)) return
    const floating = elements.floating

    const leavesSafeZone = (related: EventTarget | null) => {
      if (!(related instanceof Node)) return true
      if (reference.contains(related)) return false
      if (floating?.contains(related)) return false
      return true
    }

    const onFocus = (event: FocusEvent) => {
      if (blockFocusRef.current) return
      const target = event.target
      if (!(target instanceof Element)) return
      // Match Floating UI useFocus visibleOnly default
      if (!target.matches(':focus-visible')) return
      setReason('focus', true)
    }

    const onBlur = (event: FocusEvent) => {
      blockFocusRef.current = false
      if (!leavesSafeZone(event.relatedTarget)) return
      setReason('focus', false)
    }

    const onPointerEnter = () => {
      clearHoverCloseTimeout()
      setReason('hover', true)
    }
    const onPointerLeave = (event: PointerEvent) => {
      blockFocusRef.current = false
      if (!leavesSafeZone(event.relatedTarget)) return
      scheduleHoverClose()
    }

    const onClick = () => {
      // Toggle close only when already click-sticky; otherwise stick open (Floating UI stickIfOpen)
      if (reasonsRef.current.click) {
        blockFocusRef.current = true
        clearReasons()
        return
      }
      setReason('click', true)
    }

    reference.addEventListener('focus', onFocus)
    reference.addEventListener('blur', onBlur)
    reference.addEventListener('pointerenter', onPointerEnter)
    reference.addEventListener('pointerleave', onPointerLeave)
    reference.addEventListener('click', onClick)

    return () => {
      reference.removeEventListener('focus', onFocus)
      reference.removeEventListener('blur', onBlur)
      reference.removeEventListener('pointerenter', onPointerEnter)
      reference.removeEventListener('pointerleave', onPointerLeave)
      reference.removeEventListener('click', onClick)
    }
  }, [
    elements.reference,
    elements.floating,
    setReason,
    clearReasons,
    clearHoverCloseTimeout,
    scheduleHoverClose,
  ])

  // Keep hover open while pointer is over the floating node (Floating UI useHover move)
  useEffect(() => {
    const floating = elements.floating
    const reference = elements.reference
    if (!floating) return

    const leavesSafeZone = (related: EventTarget | null) => {
      if (!(related instanceof Node)) return true
      if (reference instanceof Node && reference.contains(related)) return false
      if (floating.contains(related)) return false
      return true
    }

    const onPointerEnter = () => {
      clearHoverCloseTimeout()
      setReason('hover', true)
    }
    const onPointerLeave = (event: PointerEvent) => {
      if (!leavesSafeZone(event.relatedTarget)) return
      scheduleHoverClose()
    }

    floating.addEventListener('pointerenter', onPointerEnter)
    floating.addEventListener('pointerleave', onPointerLeave)
    return () => {
      floating.removeEventListener('pointerenter', onPointerEnter)
      floating.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [elements.floating, elements.reference, setReason, clearHoverCloseTimeout, scheduleHoverClose])

  // Dismiss: Escape + outside press (Floating UI useDismiss defaults)
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      blockFocusRef.current = true
      clearReasons()
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (elements.reference instanceof Node && elements.reference.contains(target)) return
      if (elements.floating?.contains(target)) return
      blockFocusRef.current = true
      clearReasons()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isOpen, elements.reference, elements.floating, clearReasons])

  // Tooltip aria: aria-describedby while open or force-described (defaultShowOnError)
  useEffect(() => {
    const reference = elements.reference
    if (!(reference instanceof HTMLElement)) return

    const active = isOpen || described
    if (active) {
      reference.setAttribute('aria-describedby', floatingId)
    } else if (reference.getAttribute('aria-describedby') === floatingId) {
      reference.removeAttribute('aria-describedby')
    }

    return () => {
      if (reference.getAttribute('aria-describedby') === floatingId) {
        reference.removeAttribute('aria-describedby')
      }
    }
  }, [isOpen, described, elements.reference, floatingId])

  const getFloatingProps = useCallback(
    (userProps: HTMLProps<HTMLElement> = {}) => ({
      ...userProps,
      id: userProps.id ?? floatingId,
      role: userProps.role ?? 'tooltip',
    }),
    [floatingId]
  )

  return {
    refs,
    floatingStyles,
    isOpen,
    floatingId,
    getFloatingProps,
  }
}
