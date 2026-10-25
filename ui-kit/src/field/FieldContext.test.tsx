import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FieldContext, FieldProvider, useFieldContext } from './FieldContext'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

let contextValue: any
const collectedIds: any[] = []
let renderCount = 0

function ContextProbe() {
	contextValue = useFieldContext()
	return <div>Test</div>
}

function ThrowingProbe() {
	useFieldContext()
	return <div>Test</div>
}

function IdProbe() {
	collectedIds.push(useFieldContext().id)
	return <div>Test</div>
}

function CountProbe() {
	renderCount++
	useFieldContext()
	return <div>Test</div>
}

describe('FieldContext', () => {
	it('creates context', () => {
		expect(FieldContext).toBeDefined()
	})

	it('provides default context values', () => {
		render(
			<FieldProvider>
				<ContextProbe />
			</FieldProvider>
		)
		expect(contextValue.id).toBeTruthy()
		expect(contextValue.required).toBeUndefined()
		expect(contextValue.invalid).toBeUndefined()
	})

	it('provides custom id', () => {
		render(
			<FieldProvider id='custom-id'>
				<ContextProbe />
			</FieldProvider>
		)
		expect(contextValue.id).toBe('custom-id')
	})

	it('provides name prop', () => {
		render(
			<FieldProvider id='field-id' name='field-name'>
				<ContextProbe />
			</FieldProvider>
		)
		expect(contextValue.name).toBe('field-name')
	})

	it('defaults name to id when not provided', () => {
		render(
			<FieldProvider id='field-id'>
				<ContextProbe />
			</FieldProvider>
		)
		expect(contextValue.name).toBe('field-id')
	})

	it('provides required prop', () => {
		render(
			<FieldProvider required>
				<ContextProbe />
			</FieldProvider>
		)
		expect(contextValue.required).toBe(true)
	})

	it('provides invalid prop', () => {
		render(
			<FieldProvider invalid>
				<ContextProbe />
			</FieldProvider>
		)
		expect(contextValue.invalid).toBe(true)
	})

	it('throws error when useFieldContext used without provider', () => {
		expect(() => render(<ThrowingProbe />)).toThrow(
			'useFieldContext must be used within FieldContext.Provider'
		)
	})

	it('generates unique id for each provider instance', () => {
		collectedIds.length = 0

		const { unmount: unmount1 } = render(
			<FieldProvider>
				<IdProbe />
			</FieldProvider>
		)

		const { unmount: unmount2 } = render(
			<FieldProvider>
				<IdProbe />
			</FieldProvider>
		)

		expect(collectedIds).toHaveLength(2)
		expect(collectedIds[0]).not.toBe(collectedIds[1])

		unmount1()
		unmount2()
	})

	it('memoizes context value to prevent unnecessary re-renders', () => {
		renderCount = 0

		const { rerender } = render(
			<FieldProvider id='test-id' name='test-name'>
				<CountProbe />
			</FieldProvider>
		)

		expect(renderCount).toBe(1)
		rerender(
			<FieldProvider id='test-id' name='test-name'>
				<CountProbe />
			</FieldProvider>
		)
		expect(renderCount).toBe(2)
	})
})
