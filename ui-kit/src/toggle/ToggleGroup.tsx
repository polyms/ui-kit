import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import clsx from 'clsx'

import type { ToggleSize, ToggleVariant } from './Toggle'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ToggleGroupProps<Value extends string = string> = BaseToggleGroup.Props<Value> & {
	/** Matches Field and Button at the same size so the group sits on one control row. */
	size?: ToggleSize
	/** Pill shell. Match `rounded` on Field and Button in the same row. Omit to keep the control radius. */
	rounded?: boolean
	/** Ghost toolbar group. Default is the form shell. */
	variant?: ToggleVariant
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function ToggleGroup<Value extends string = string>({
	className,
	size,
	rounded,
	variant,
	...props
}: ToggleGroupProps<Value>) {
	return (
		<BaseToggleGroup
			{...props}
			className={clsx(
				'toggle-group',
				variant === 'toolbar' ? 'toggle-group-toolbar' : variant ? undefined : 'toggle-group-shell',
				className,
				{
					'toggle-group-sm': size === 'sm',
					'toggle-group-lg': size === 'lg',
					'toggle-group-xl': size === 'xl',
					'toggle-group-2xl': size === '2xl',
					'toggle-group-3xl': size === '3xl',
					'rounded-full': rounded && !variant,
				}
			)}
		/>
	)
}
