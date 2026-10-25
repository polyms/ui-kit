import type { FC } from 'react'
import { createPortal } from 'react-dom'
import { useFieldContext } from './FieldContext'
import { useValidation } from './useValidation'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldFeedbackProps {
	children?: React.ReactNode
	floatingRoot?: string
	defaultShowOnError?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function resolvePortalContainer(id?: string): HTMLElement {
	if (!id) return document.body
	return document.getElementById(id) ?? document.body
}

export const FieldFeedback: FC<FieldFeedbackProps> = ({
	children,
	floatingRoot: floatingRootId,
	defaultShowOnError,
}) => {
	const { id, invalid } = useFieldContext()
	const forceDescribed = Boolean(invalid && defaultShowOnError)
	const { refs, floatingStyles, isOpen, getFloatingProps } = useValidation({
		controlId: id,
		described: forceDescribed,
	})

	if (!((isOpen || defaultShowOnError) && invalid && children)) return null

	return createPortal(
		<div
			ref={refs.setFloating}
			style={{ ...floatingStyles, zIndex: 99999 }}
			{...getFloatingProps()}
			className='field-feedback'
		>
			{children}
		</div>,
		resolvePortalContainer(floatingRootId)
	)
}
