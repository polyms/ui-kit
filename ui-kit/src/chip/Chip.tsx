import clsx from 'clsx'
import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode, Ref } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ChipVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral'

export interface ChipProps {
	children: ReactNode
	className?: string
	variant?: ChipVariant
	active?: boolean
	disabled?: boolean
	leading?: ReactNode
	avatar?: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
	onKeyDown?: KeyboardEventHandler<HTMLButtonElement>
	onFocus?: FocusEventHandler<HTMLButtonElement>
	tabIndex?: number
	onDismiss?: () => void
	dismissLabel?: string
	ref?: Ref<HTMLButtonElement>
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function Chip({
	children,
	className,
	variant = 'neutral',
	active = false,
	disabled = false,
	leading,
	avatar,
	onClick,
	onKeyDown,
	onFocus,
	tabIndex,
	onDismiss,
	dismissLabel = 'Remove',
	ref,
}: ChipProps) {
	const content = (
		<>
			{avatar ? <span className='chip-avatar'>{avatar}</span> : null}
			{leading ? <span className='chip-leading'>{leading}</span> : null}
			<span className='chip-label'>{children}</span>
		</>
	)

	return (
		<span
			className={clsx(
				'chip',
				`chip-${variant}`,
				{ 'chip-active': active, 'chip-disabled': disabled },
				className
			)}
		>
			{onClick ? (
				<button
					aria-pressed={active}
					className='chip-content'
					disabled={disabled}
					onClick={onClick}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					ref={ref}
					tabIndex={tabIndex}
					type='button'
				>
					{content}
				</button>
			) : (
				<span className='chip-content'>{content}</span>
			)}
			{onDismiss ? (
				<button
					aria-label={dismissLabel}
					className='chip-dismiss'
					disabled={disabled}
					onClick={onDismiss}
					type='button'
				>
					<span aria-hidden='true'>×</span>
				</button>
			) : null}
		</span>
	)
}
