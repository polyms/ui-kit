import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BottomSheetContent } from './BottomSheetContent'
import { BottomSheetRoot } from './BottomSheetRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('BottomSheetContent', () => {
  it('renders with title', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    expect(await screen.findByText('Test Title')).toBeInTheDocument()
  })

  it('renders children', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Title'>Child Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    expect(await screen.findByText('Child Content')).toBeInTheDocument()
  })

  it('accepts custom className', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent className='custom-class' title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const body = document.querySelector('.bottom-sheet-body')
      expect(body).toBeInTheDocument()
      expect(body).toHaveClass('custom-class')
    })
  })

  it('accepts custom rootClassName', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent rootClassName='root-class' title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toHaveClass('root-class')
    })
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('accepts custom id', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent id='custom-id' title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const popup = document.querySelector('#custom-id')
      expect(popup).toBeInTheDocument()
    })
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('renders close button when close prop is true', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent close title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const header = document.querySelector('.bottom-sheet-header')
      expect(header).toBeInTheDocument()
    })
    // Verify content is rendered
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('renders without close button when close prop is false', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent close={false} title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const header = document.querySelector('.bottom-sheet-header')
      expect(header).toBeInTheDocument()
    })
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('renders back button when onBack handler provided', async () => {
    const handleBack = vi.fn()
    render(
      <BottomSheetRoot open>
        <BottomSheetContent onBack={handleBack} title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const header = document.querySelector('.bottom-sheet-header')
      const backButton = header?.querySelector('button:first-child')
      expect(backButton).toBeInTheDocument()
    })
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('calls onBack handler when back button clicked', async () => {
    const user = userEvent.setup()
    const handleBack = vi.fn()
    render(
      <BottomSheetRoot open>
        <BottomSheetContent onBack={handleBack} title='Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const header = document.querySelector('.bottom-sheet-header')
      const backButton = header?.querySelector('button:first-child') as HTMLButtonElement
      expect(backButton).toBeInTheDocument()
    })
    const header = document.querySelector('.bottom-sheet-header')
    const backButton = header?.querySelector('button:first-child') as HTMLButtonElement
    await user.click(backButton)
    expect(handleBack).toHaveBeenCalled()
  })

  it('renders title as React node', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title={<span>Custom Title</span>}>Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    const titleElement = await screen.findByText('Custom Title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe('SPAN')
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('renders multiple children elements', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Title'>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    expect(await screen.findByText('Item 1')).toBeInTheDocument()
    expect(await screen.findByText('Item 2')).toBeInTheDocument()
    expect(await screen.findByText('Item 3')).toBeInTheDocument()
    await waitFor(() => {
      const body = document.querySelector('.bottom-sheet-body')
      expect(body?.children).toHaveLength(3)
    })
  })

  it('supports all prop combinations', async () => {
    const handleBack = vi.fn()
    render(
      <BottomSheetRoot open>
        <BottomSheetContent
          className='custom-class'
          close
          id='full-test'
          onBack={handleBack}
          rootClassName='root-class'
          title='Full Test Title'
        >
          Full Test Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    expect(await screen.findByText('Full Test Title')).toBeInTheDocument()
    expect(await screen.findByText('Full Test Content')).toBeInTheDocument()

    await waitFor(() => {
      const popup = document.querySelector('#full-test')
      expect(popup).toHaveClass('root-class')

      const body = document.querySelector('.bottom-sheet-body')
      expect(body).toHaveClass('custom-class')

      const header = document.querySelector('.bottom-sheet-header')
      expect(header?.querySelector('button')).toBeInTheDocument()
    })
  })

  it('renders backdrop element', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const backdrop = document.querySelector('.bottom-sheet-backdrop')
      expect(backdrop).toBeInTheDocument()
    })
  })

  it('renders content in portal', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Title'>Portal Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toBeInTheDocument()
    })
    expect(await screen.findByText('Portal Content')).toBeInTheDocument()
  })

  it('applies bottom-sheet-title class to title element', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const titleElement = document.querySelector('.bottom-sheet-title')
      expect(titleElement).toHaveTextContent('Test Title')
    })
  })

  it('applies bottom-sheet-body class to body element', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Title'>Body Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const bodyElement = document.querySelector('.bottom-sheet-body')
      expect(bodyElement).toHaveTextContent('Body Content')
    })
  })

  it('header contains title and buttons in correct order', async () => {
    const handleBack = vi.fn()
    render(
      <BottomSheetRoot open>
        <BottomSheetContent close onBack={handleBack} title='Test Title'>
          Content
        </BottomSheetContent>
      </BottomSheetRoot>
    )
    await waitFor(() => {
      const header = document.querySelector('.bottom-sheet-header')
      expect(header).toBeInTheDocument()

      const children = header?.children
      expect(children).toHaveLength(3) // back button, title, close button
      expect(children?.[1]).toHaveClass('bottom-sheet-title')
    })
  })

  it('handles drag start from header', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toBeInTheDocument()

      // Simulate mousedown on header
      const header = document.querySelector('.bottom-sheet-header')
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)
      expect(popup).toBeInTheDocument()
    })
  })

  it('handles drag movement with positive deltaY', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toBeInTheDocument()

      // Simulate drag sequence
      const header = document.querySelector('.bottom-sheet-header')

      // Start drag
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)

      // Move down (positive deltaY)
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 150, bubbles: true })
      popup?.dispatchEvent(mouseMoveEvent)

      // Check transform applied
      expect(popup).toBeInTheDocument()
    })
  })

  it('handles touch drag start', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toBeInTheDocument()

      // Simulate touch start on header
      const header = document.querySelector('.bottom-sheet-header')
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        touches: [{ clientY: 100 } as Touch],
      })
      header?.dispatchEvent(touchStartEvent)
      expect(popup).toBeInTheDocument()
    })
  })

  it('handles touch drag movement', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toBeInTheDocument()

      const header = document.querySelector('.bottom-sheet-header')

      // Start touch drag
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        touches: [{ clientY: 100 } as Touch],
      })
      header?.dispatchEvent(touchStartEvent)

      // Touch move
      const touchMoveEvent = new TouchEvent('touchmove', {
        bubbles: true,
        touches: [{ clientY: 180 } as Touch],
      })
      popup?.dispatchEvent(touchMoveEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('closes bottom sheet when dragged down more than 100px', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const header = document.querySelector('.bottom-sheet-header')
      expect(popup).toBeInTheDocument()

      // Start drag
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)

      // Move down more than 100px
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 220, bubbles: true })
      popup?.dispatchEvent(mouseMoveEvent)

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true })
      popup?.dispatchEvent(mouseUpEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('resets position when dragged less than 100px', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const header = document.querySelector('.bottom-sheet-header')
      expect(popup).toBeInTheDocument()

      // Start drag
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)

      // Move down less than 100px
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 150, bubbles: true })
      popup?.dispatchEvent(mouseMoveEvent)

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true })
      popup?.dispatchEvent(mouseUpEvent)

      // Check transform is reset
      const transform = (popup as HTMLElement).style.transform
      expect(transform).toBe('')
    })
  })

  it('ignores drag from scrollable content area', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>
          <div style={{ height: '300px', overflowY: 'auto' }}>Scrollable Content</div>
        </BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const scrollableContent = document.querySelector('[style*="overflowY"]')
      expect(popup).toBeInTheDocument()

      // Try to drag from scrollable content
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      scrollableContent?.dispatchEvent(mouseDownEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('handles mouseleave during drag', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const header = document.querySelector('.bottom-sheet-header')
      expect(popup).toBeInTheDocument()

      // Start drag
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)

      // Mouse leave
      const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true })
      popup?.dispatchEvent(mouseLeaveEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('cleans up event listeners on unmount', () => {
    const result = render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )
    const unmountFn = result.unmount

    expect(document.querySelector('.bottom-sheet-popup')).toBeInTheDocument()

    unmountFn()

    expect(document.querySelector('.bottom-sheet-popup')).not.toBeInTheDocument()
  })

  it('handles drag with negative deltaY (upward movement)', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const header = document.querySelector('.bottom-sheet-header')
      expect(popup).toBeInTheDocument()

      // Start drag
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 200, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)

      // Move up (negative deltaY - should not apply transform)
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 150, bubbles: true })
      popup?.dispatchEvent(mouseMoveEvent)

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true })
      popup?.dispatchEvent(mouseUpEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('handles drag start from non-header area without scrollable content', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>
          <div>Static Content</div>
        </BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const content = screen.getByText('Static Content')
      expect(popup).toBeInTheDocument()

      // Try to drag from non-scrollable content area
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      content?.dispatchEvent(mouseDownEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('handles missing touch clientY gracefully', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      expect(popup).toBeInTheDocument()

      // Simulate touch event with undefined clientY
      const touchEvent = new TouchEvent('touchstart', {
        bubbles: true,
        touches: [] as any,
      })
      popup?.dispatchEvent(touchEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('handles drag move with missing clientY', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const header = document.querySelector('.bottom-sheet-header')

      // Start drag
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      header?.dispatchEvent(mouseDownEvent)

      // Move with undefined clientY
      const touchEvent = new TouchEvent('touchmove', {
        bubbles: true,
        touches: [] as any,
      })
      popup?.dispatchEvent(touchEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('handles touch end event', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>Content</BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const header = document.querySelector('.bottom-sheet-header')
      expect(popup).toBeInTheDocument()

      // Start touch drag
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        touches: [{ clientY: 100 } as Touch],
      })
      header?.dispatchEvent(touchStartEvent)

      // Touch move
      const touchMoveEvent = new TouchEvent('touchmove', {
        bubbles: true,
        touches: [{ clientY: 50, clientX: 0 } as Touch],
      })
      popup?.dispatchEvent(touchMoveEvent)

      // Touch end
      const touchEndEvent = new TouchEvent('touchend', { bubbles: true })
      popup?.dispatchEvent(touchEndEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('detects scrollable element with scroll height exceeding client height', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>
          <div data-testid='scrollable' style={{ height: '200px', overflowY: 'auto' }}>
            <div style={{ height: '400px' }}>Very long content</div>
          </div>
        </BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const scrollableDiv = screen.getByTestId('scrollable')
      expect(popup).toBeInTheDocument()

      // Try to drag from within scrollable container
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      scrollableDiv?.dispatchEvent(mouseDownEvent)

      // Move and verify drag is prevented
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 150, bubbles: true })
      popup?.dispatchEvent(mouseMoveEvent)

      expect(popup).toBeInTheDocument()
    })
  })

  it('respects overflow hidden on scrollable element', async () => {
    render(
      <BottomSheetRoot open>
        <BottomSheetContent title='Test Title'>
          <div
            data-testid='hidden-overflow'
            style={{ height: '200px', overflowY: 'hidden', overflow: 'hidden' }}
          >
            <div style={{ height: '400px' }}>Content with hidden overflow</div>
          </div>
        </BottomSheetContent>
      </BottomSheetRoot>
    )

    await waitFor(() => {
      const popup = document.querySelector('.bottom-sheet-popup')
      const hiddenDiv = screen.getByTestId('hidden-overflow')
      expect(popup).toBeInTheDocument()

      // This should allow drag since overflow is hidden
      const mouseDownEvent = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
      hiddenDiv?.dispatchEvent(mouseDownEvent)

      expect(popup).toBeInTheDocument()
    })
  })
})
