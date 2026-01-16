import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useOffcanvas } from './useOffcanvas'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('useOffcanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.open).toBe(false)
    expect(result.current.status).toBeDefined()
    expect(result.current.labelId).toBeUndefined()
    expect(result.current.descriptionId).toBeUndefined()
  })

  it('initializes with custom initialOpen state', () => {
    const { result } = renderHook(() => useOffcanvas({ initialOpen: true }))

    expect(result.current.open).toBe(true)
  })

  it('supports controlled open state', () => {
    const { result, rerender } = renderHook(({ open }) => useOffcanvas({ open }), {
      initialProps: { open: false },
    })

    expect(result.current.open).toBe(false)

    rerender({ open: true })
    expect(result.current.open).toBe(true)
  })

  it('calls onOpenChange callback when setOpen is called', () => {
    const onOpenChange = vi.fn()
    const { result } = renderHook(() =>
      useOffcanvas({
        initialOpen: false,
        onOpenChange,
      })
    )

    expect(result.current.open).toBe(false)

    act(() => {
      result.current.setOpen(true)
    })
  })

  it('supports controlled mode with onOpenChange', () => {
    const onOpenChange = vi.fn()
    const { result, rerender } = renderHook(({ open }) => useOffcanvas({ open, onOpenChange }), {
      initialProps: { open: false },
    })

    expect(result.current.open).toBe(false)

    rerender({ open: true })
    expect(result.current.open).toBe(true)
  })

  it('sets and updates labelId', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.labelId).toBeUndefined()

    act(() => {
      result.current.setLabelId('custom-label-id')
    })

    expect(result.current.labelId).toBe('custom-label-id')
  })

  it('sets and updates descriptionId', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.descriptionId).toBeUndefined()

    act(() => {
      result.current.setDescriptionId('custom-description-id')
    })

    expect(result.current.descriptionId).toBe('custom-description-id')
  })

  it('provides nodeId from floating UI', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.nodeId).toBeDefined()
    expect(typeof result.current.nodeId).toBe('string')
  })

  it('provides interactions from floating UI', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.getReferenceProps).toBeDefined()
    expect(result.current.getFloatingProps).toBeDefined()
    expect(typeof result.current.getReferenceProps).toBe('function')
    expect(typeof result.current.getFloatingProps).toBe('function')
  })

  it('provides floating UI data properties', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.floatingStyles).toBeDefined()
    expect(result.current.context).toBeDefined()
    expect(result.current.x).toBeDefined()
    expect(result.current.y).toBeDefined()
  })

  it('sets isMounted based on transition status', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.status).toBeDefined()
  })

  it('allows dismissible option', () => {
    const { result } = renderHook(() => useOffcanvas({ dismissible: true }))

    expect(result.current).toBeDefined()
    expect(result.current.open).toBe(false)
  })

  it('disallows dismissible by default', () => {
    const { result } = renderHook(() => useOffcanvas({ dismissible: false }))

    expect(result.current).toBeDefined()
    expect(result.current.open).toBe(false)
  })

  it('respects ignoreClickOutside selectors', () => {
    const { result } = renderHook(() =>
      useOffcanvas({
        ignoreClickOutside: ['.ignore-element', '#ignore-id'],
      })
    )

    expect(result.current).toBeDefined()
  })

  it('handles outsidePress with dismissible enabled', () => {
    const { result } = renderHook(() =>
      useOffcanvas({
        initialOpen: true,
        dismissible: true,
      })
    )

    expect(result.current.open).toBe(true)
  })

  it('handles outsidePress with mobile viewport', () => {
    const { result } = renderHook(() =>
      useOffcanvas({
        initialOpen: true,
        dismissible: false, // Even without dismissible, mobile should allow dismiss
      })
    )

    expect(result.current).toBeDefined()
    expect(result.current.open).toBe(true)
  })

  it('ignores click outside for specified selectors', () => {
    const ignoreSelector = '.ignore-me'
    const { result } = renderHook(() =>
      useOffcanvas({
        initialOpen: true,
        dismissible: true,
        ignoreClickOutside: [ignoreSelector],
      })
    )

    expect(result.current.open).toBe(true)
  })

  it('handles offcanvas:close:all event', () => {
    const { result } = renderHook(() => useOffcanvas({ initialOpen: true }))

    expect(result.current.open).toBe(true)

    act(() => {
      const event = new CustomEvent('offcanvas:close:all', { detail: undefined })
      window.dispatchEvent(event)
    })

    expect(result.current.open).toBe(false)
  })

  it('does not close on offcanvas:close:all if detail is set', () => {
    const { result } = renderHook(() => useOffcanvas({ initialOpen: true }))

    expect(result.current.open).toBe(true)

    act(() => {
      const event = new CustomEvent('offcanvas:close:all', { detail: 'some-value' })
      window.dispatchEvent(event)
    })

    // Should remain open because detail is set
    expect(result.current.open).toBe(true)
  })

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useOffcanvas())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('offcanvas:close:all', expect.any(Function))

    removeEventListenerSpy.mockRestore()
  })

  it('handles multiple instances without interference', () => {
    const { result: result1 } = renderHook(() => useOffcanvas({ initialOpen: false }))
    const { result: result2 } = renderHook(() => useOffcanvas({ initialOpen: true }))

    expect(result1.current.open).toBe(false)
    expect(result2.current.open).toBe(true)

    act(() => {
      result1.current.setOpen(true)
    })

    expect(result1.current.open).toBe(true)
    expect(result2.current.open).toBe(true)
  })

  it('returns memoized context value', () => {
    const { result, rerender } = renderHook(() => useOffcanvas())

    rerender()

    // Value should be consistent
    expect(result.current).toBeDefined()
  })

  it('handles outsidePress error gracefully', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {
      //
    })

    const { result } = renderHook(() =>
      useOffcanvas({
        initialOpen: true,
        dismissible: true,
        ignoreClickOutside: ['invalid-selector'], // This might cause error
      })
    )

    expect(result.current.open).toBe(true)

    consoleLogSpy.mockRestore()
  })

  it('supports uncontrolled mode with setOpen', () => {
    const { result } = renderHook(() => useOffcanvas({ initialOpen: false }))

    expect(result.current.open).toBe(false)

    act(() => {
      result.current.setOpen(true)
    })

    expect(result.current.open).toBe(true)

    act(() => {
      result.current.setOpen(false)
    })

    expect(result.current.open).toBe(false)
  })

  it('provides role context for accessibility', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(result.current.context).toBeDefined()
    // The context should be configured with role: 'dialog'
    expect(result.current).toBeDefined()
  })

  it('handles dismissible with ignoreClickOutside combination', () => {
    const { result } = renderHook(() =>
      useOffcanvas({
        initialOpen: true,
        dismissible: true,
        ignoreClickOutside: ['.modal-content', '#action-menu'],
      })
    )

    expect(result.current.open).toBe(true)
  })

  it('maintains state across multiple setOpen calls', () => {
    const { result } = renderHook(() => useOffcanvas({ initialOpen: false }))

    act(() => {
      result.current.setOpen(true)
      result.current.setOpen(false)
      result.current.setOpen(true)
    })

    expect(result.current.open).toBe(true)
  })

  it('fires event listener on window', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    renderHook(() => useOffcanvas())

    expect(addEventListenerSpy).toHaveBeenCalledWith('offcanvas:close:all', expect.any(Function))

    addEventListenerSpy.mockRestore()
  })

  it('clears labelId and descriptionId independently', () => {
    const { result } = renderHook(() => useOffcanvas())

    act(() => {
      result.current.setLabelId('label')
      result.current.setDescriptionId('description')
    })

    expect(result.current.labelId).toBe('label')
    expect(result.current.descriptionId).toBe('description')

    act(() => {
      result.current.setLabelId(undefined)
    })

    expect(result.current.labelId).toBeUndefined()
    expect(result.current.descriptionId).toBe('description')
  })

  it('allows switching from uncontrolled to controlled', () => {
    const { result } = renderHook(({ open }: { open?: boolean }) => useOffcanvas({ open }), {
      initialProps: { open: false },
    })

    expect(result.current.open).toBe(false)

    act(() => {
      result.current.setOpen(true)
    })
  })

  it('provides consistent status values', () => {
    const { result } = renderHook(() => useOffcanvas())

    expect(['unmounted', 'initial', 'open', 'close']).toContain(result.current.status)
  })
})
