import clsx from 'clsx'
import type { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { ChipVariant } from './Chip'
import { Chip } from './Chip'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ChipInputProps {
	value?: string[]
	defaultValue?: string[]
	onValueChange?: (value: string[]) => void
	onSelectionChange?: (selectedValues: string[]) => void
	onAdd?: (value: string) => void
	onRemove?: (value: string) => void
	variant?: ChipVariant
	separator?: string | null
	allowDuplicates?: boolean
	maxChips?: number
	dismissible?: boolean
	createOnBlur?: boolean
	placeholder?: string
	label: string
	id?: string
	/** Wrapping shell. Same radius as a textarea (`rounded-xl`), not a single-line pill. */
	rounded?: boolean
	className?: string
	disabled?: boolean
	name?: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function ChipInput({
	value,
	defaultValue = [],
	onValueChange,
	onSelectionChange,
	onAdd,
	onRemove,
	variant = 'neutral',
	separator = ',',
	allowDuplicates = false,
	maxChips,
	dismissible = true,
	createOnBlur = true,
	placeholder = '',
	label,
	id,
	rounded = false,
	className,
	disabled = false,
	name,
}: ChipInputProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const [inputValue, setInputValue] = useState('')
	const [selectedIndices, setSelectedIndices] = useState<number[]>([])
	const [announcement, setAnnouncement] = useState('')
	const values = value ?? internalValue

	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const chipRefs = useRef<Array<HTMLButtonElement | null>>([])
	const selectionRef = useRef<number[]>([])
	const selectionAnchorRef = useRef<number | null>(null)
	const focusedIndexRef = useRef<number | null>(null)
	const pendingFocusRef = useRef<number | null | undefined>(undefined)

	const updateValues = (nextValues: string[]) => {
		if (value === undefined) setInternalValue(nextValues)
		onValueChange?.(nextValues)
	}

	const updateSelection = (indices: number[], sourceValues = values) => {
		const normalized = [...new Set(indices)]
			.filter(index => index >= 0 && index < sourceValues.length)
			.sort((a, b) => a - b)
		selectionRef.current = normalized
		setSelectedIndices(normalized)
		onSelectionChange?.(normalized.map(index => sourceValues[index] ?? ''))
	}

	const focusChip = (index: number) => {
		const target = chipRefs.current[index]
		if (target) {
			focusedIndexRef.current = index
			target.focus()
		} else {
			focusedIndexRef.current = null
			inputRef.current?.focus()
		}
	}

	useEffect(() => {
		if (pendingFocusRef.current === undefined) return
		const index = pendingFocusRef.current
		pendingFocusRef.current = undefined
		if (index === null) inputRef.current?.focus()
		else focusChip(index)
	}, [values])

	useEffect(() => {
		const nextSelection = selectionRef.current.filter(index => index < values.length)
		if (nextSelection.length !== selectionRef.current.length) updateSelection(nextSelection)
		chipRefs.current.length = values.length
	}, [values])

	const addValue = (rawValue: string) => {
		const nextValue = rawValue.trim()
		if (disabled || !nextValue) return false
		const isDuplicate =
			!allowDuplicates && values.some(item => item.toLowerCase() === nextValue.toLowerCase())
		if (isDuplicate || (maxChips !== undefined && values.length >= maxChips)) return false

		const nextValues = [...values, nextValue]
		updateValues(nextValues)
		updateSelection([], nextValues)
		onAdd?.(nextValue)
		setAnnouncement(`${nextValue} added`)
		return true
	}

	const addSeparatedValues = (rawValue: string, activeSeparator: string) => {
		const parts = rawValue.split(activeSeparator)
		let nextValues = values
		const addedValues: string[] = []
		for (const part of parts.slice(0, -1)) {
			const candidate = part.trim()
			const duplicate =
				!allowDuplicates && nextValues.some(item => item.toLowerCase() === candidate.toLowerCase())
			if (!candidate || duplicate || (maxChips !== undefined && nextValues.length >= maxChips)) {
				continue
			}
			nextValues = [...nextValues, candidate]
			addedValues.push(candidate)
		}

		if (addedValues.length > 0) {
			updateValues(nextValues)
			updateSelection([], nextValues)
			addedValues.forEach(item => {
				onAdd?.(item)
			})
			setAnnouncement(`${addedValues.join(', ')} added`)
		}
		setInputValue(parts[parts.length - 1] ?? '')
	}

	const removeIndices = (indices: number[]) => {
		if (disabled) return
		const removedIndices = [...new Set(indices)].filter(index => index >= 0 && index < values.length)
		if (removedIndices.length === 0) return

		const removedSet = new Set(removedIndices)
		const removedValues = removedIndices.map(index => values[index] ?? '')
		const nextValues = values.filter((_, index) => !removedSet.has(index))
		const nextFocusIndex =
			nextValues.length > 0 ? Math.min(Math.min(...removedIndices), nextValues.length - 1) : null
		updateValues(nextValues)
		updateSelection(nextFocusIndex === null ? [] : [nextFocusIndex], nextValues)
		selectionAnchorRef.current = nextFocusIndex
		removedValues.forEach(item => {
			onRemove?.(item)
		})
		setAnnouncement(`${removedValues.join(', ')} removed`)
		pendingFocusRef.current = nextFocusIndex
	}

	const selectRange = (index: number) => {
		const anchor = selectionAnchorRef.current ?? focusedIndexRef.current ?? index
		const start = Math.min(anchor, index)
		const end = Math.max(anchor, index)
		updateSelection(Array.from({ length: end - start + 1 }, (_, offset) => start + offset))
	}

	const handleChipClick = (index: number, event: MouseEvent<HTMLButtonElement>) => {
		focusedIndexRef.current = index
		if (event.shiftKey) {
			selectRange(index)
			return
		}
		if (event.metaKey || event.ctrlKey) {
			selectionAnchorRef.current = index
			const currentSelection = selectionRef.current
			updateSelection(
				currentSelection.includes(index)
					? currentSelection.filter(selectedIndex => selectedIndex !== index)
					: [...currentSelection, index]
			)
			return
		}
		selectionAnchorRef.current = index
		updateSelection([index])
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.currentTarget.value
		if (!separator || !nextValue.includes(separator)) {
			setInputValue(nextValue)
			return
		}
		addSeparatedValues(nextValue, separator)
	}

	const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (addValue(inputValue)) setInputValue('')
			return
		}

		if ((event.key === 'Backspace' || event.key === 'Delete') && inputValue === '' && values.length > 0) {
			event.preventDefault()
			if (selectionRef.current.length > 0) {
				removeIndices(selectionRef.current)
			} else {
				const lastIndex = values.length - 1
				selectionAnchorRef.current = lastIndex
				updateSelection([lastIndex])
				focusChip(lastIndex)
			}
			return
		}

		if (event.key === 'ArrowLeft' && event.currentTarget.selectionStart === 0 && values.length > 0) {
			event.preventDefault()
			const lastIndex = values.length - 1
			if (event.shiftKey) {
				if (selectionAnchorRef.current === null) selectionAnchorRef.current = lastIndex
				selectRange(lastIndex)
			}
			focusChip(lastIndex)
			return
		}

		if (event.key === 'Escape') {
			updateSelection([])
			setInputValue('')
			event.currentTarget.blur()
		}
	}

	const handleChipKeyDown = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
		const isSelectAll = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a'
		if (isSelectAll) {
			event.preventDefault()
			selectionAnchorRef.current = 0
			updateSelection(values.map((_, itemIndex) => itemIndex))
			return
		}

		if (event.key === 'Backspace' || event.key === 'Delete') {
			if (selectionRef.current.length > 0) {
				event.preventDefault()
				removeIndices(selectionRef.current)
			}
			return
		}

		if (event.key === 'Escape') {
			event.preventDefault()
			updateSelection([])
			inputRef.current?.focus()
			return
		}

		if (event.key === 'Home') {
			event.preventDefault()
			focusChip(0)
			return
		}

		if (event.key === 'End') {
			event.preventDefault()
			inputRef.current?.focus()
			return
		}

		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			event.preventDefault()
			const direction = event.key === 'ArrowLeft' ? -1 : 1
			const nextIndex = index + direction
			if (event.shiftKey) selectRange(nextIndex)
			if (nextIndex < 0) return
			if (nextIndex >= values.length) {
				inputRef.current?.focus()
				return
			}
			focusChip(nextIndex)
		}
	}

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		const nextTarget = event.relatedTarget
		if (nextTarget instanceof Node && containerRef.current?.contains(nextTarget)) return
		if (createOnBlur && addValue(inputValue)) setInputValue('')
	}
	const valueOccurrences = new Map<string, number>()

	return (
		<div
			className={clsx(
				'chip-input',
				`chip-input-${variant}`,
				{ 'chip-input-disabled': disabled, 'rounded-xl': rounded },
				className
			)}
			ref={containerRef}
		>
			{values.map((item, index) => {
				const occurrence = valueOccurrences.get(item) ?? 0
				valueOccurrences.set(item, occurrence + 1)

				return (
					<Chip
						active={selectedIndices.includes(index)}
						className='chip-input-item'
						disabled={disabled}
						dismissLabel={`Remove ${item}`}
						key={JSON.stringify([item, occurrence])}
						onClick={event => handleChipClick(index, event)}
						onDismiss={dismissible ? () => removeIndices([index]) : undefined}
						onFocus={() => {
							focusedIndexRef.current = index
						}}
						onKeyDown={event => handleChipKeyDown(index, event)}
						ref={node => {
							chipRefs.current[index] = node
						}}
						variant={variant}
					>
						{item}
					</Chip>
				)
			})}
			<input
				aria-label={id ? undefined : label}
				className='chip-input-control'
				disabled={disabled || (maxChips !== undefined && values.length >= maxChips)}
				id={id}
				onBlur={handleBlur}
				onChange={handleChange}
				onKeyDown={handleInputKeyDown}
				placeholder={placeholder}
				ref={inputRef}
				value={inputValue}
			/>
			{name ? <input name={name} type='hidden' value={values.join(',')} /> : null}
			<span aria-live='polite' className='sr-only' role='status'>
				{announcement}
			</span>
		</div>
	)
}
