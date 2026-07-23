import { describe, expect, it, vi } from 'vitest'
import { scrollToHeading, scrollToTop } from './scroll'

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

describe('scroll helpers', () => {
  it('scrollToTop calls window.scrollTo smoothly', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    scrollToTop()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    scrollTo.mockRestore()
  })

  it('scrollToHeading scrolls the target into view', () => {
    const el = document.createElement('h2')
    el.id = 'section'
    const scrollIntoView = vi.fn()
    el.scrollIntoView = scrollIntoView
    document.body.append(el)

    scrollToHeading('section')
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })

    el.remove()
  })
})
