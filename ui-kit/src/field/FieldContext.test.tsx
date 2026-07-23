import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FieldContext, FieldProvider, useFieldContext } from './FieldContext'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('FieldContext', () => {
  it('creates context', () => {
    expect(FieldContext).toBeDefined()
  })

  it('provides default context values', () => {
    let contextValue: any
    const TestComponent = () => {
      contextValue = useFieldContext()
      return <div>Test</div>
    }

    render(
      <FieldProvider>
        <TestComponent />
      </FieldProvider>
    )
    expect(contextValue.id).toBeTruthy()
    expect(contextValue.required).toBeUndefined()
    expect(contextValue.invalid).toBeUndefined()
  })

  it('provides custom id', () => {
    let contextValue: any
    const TestComponent = () => {
      contextValue = useFieldContext()
      return <div>Test</div>
    }

    render(
      <FieldProvider id='custom-id'>
        <TestComponent />
      </FieldProvider>
    )
    expect(contextValue.id).toBe('custom-id')
  })

  it('provides name prop', () => {
    let contextValue: any
    const TestComponent = () => {
      contextValue = useFieldContext()
      return <div>Test</div>
    }

    render(
      <FieldProvider id='field-id' name='field-name'>
        <TestComponent />
      </FieldProvider>
    )
    expect(contextValue.name).toBe('field-name')
  })

  it('defaults name to id when not provided', () => {
    let contextValue: any
    const TestComponent = () => {
      contextValue = useFieldContext()
      return <div>Test</div>
    }

    render(
      <FieldProvider id='field-id'>
        <TestComponent />
      </FieldProvider>
    )
    expect(contextValue.name).toBe('field-id')
  })

  it('provides required prop', () => {
    let contextValue: any
    const TestComponent = () => {
      contextValue = useFieldContext()
      return <div>Test</div>
    }

    render(
      <FieldProvider required>
        <TestComponent />
      </FieldProvider>
    )
    expect(contextValue.required).toBe(true)
  })

  it('provides invalid prop', () => {
    let contextValue: any
    const TestComponent = () => {
      contextValue = useFieldContext()
      return <div>Test</div>
    }

    render(
      <FieldProvider invalid>
        <TestComponent />
      </FieldProvider>
    )
    expect(contextValue.invalid).toBe(true)
  })

  it('throws error when useFieldContext used without provider', () => {
    const TestComponent = () => {
      useFieldContext()
      return <div>Test</div>
    }

    expect(() => render(<TestComponent />)).toThrow(
      'useFieldContext must be used within FieldContext.Provider'
    )
  })

  it('generates unique id for each provider instance', () => {
    const ids: any[] = []
    const TestComponent = () => {
      ids.push(useFieldContext().id)
      return <div>Test</div>
    }

    const { unmount: unmount1 } = render(
      <FieldProvider>
        <TestComponent />
      </FieldProvider>
    )

    const { unmount: unmount2 } = render(
      <FieldProvider>
        <TestComponent />
      </FieldProvider>
    )

    expect(ids).toHaveLength(2)
    expect(ids[0]).not.toBe(ids[1])

    unmount1()
    unmount2()
  })

  it('memoizes context value to prevent unnecessary re-renders', () => {
    let renderCount = 0
    const TestComponent = () => {
      renderCount++
      useFieldContext()
      return <div>Test</div>
    }

    const { rerender } = render(
      <FieldProvider id='test-id' name='test-name'>
        <TestComponent />
      </FieldProvider>
    )

    expect(renderCount).toBe(1)
    rerender(
      <FieldProvider id='test-id' name='test-name'>
        <TestComponent />
      </FieldProvider>
    )
    expect(renderCount).toBe(2)
  })
})
