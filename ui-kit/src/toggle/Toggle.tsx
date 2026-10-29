import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ToggleSize = 'sm' | 'lg' | 'xl' | '2xl' | '3xl'

/** `toolbar` is the ghost toolbar control. Omit it for the form shell. */
export type ToggleVariant = 'toolbar'

export type ToggleProps<Value extends string = string> = BaseToggle.Props<Value> & {
	size?: ToggleSize
	/** Pill shape. Match `rounded` on Field and Button in the same row. */
	rounded?: boolean
	variant?: ToggleVariant
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function Toggle<Value extends string = string>({
	className,
	size,
	rounded,
	variant,
	...props
}: ToggleProps<Value>) {
	return (
		<BaseToggle
			{...props}
			className={clsx(
				'toggle',
				variant === 'toolbar' ? 'toggle-toolbar' : variant ? undefined : 'toggle-shell',
				className,
				{
					'toggle-sm': size === 'sm',
					'toggle-lg': size === 'lg',
					'toggle-xl': size === 'xl',
					'toggle-2xl': size === '2xl',
					'toggle-3xl': size === '3xl',
					'rounded-full': rounded,
				}
			)}
		/>
	)
}
