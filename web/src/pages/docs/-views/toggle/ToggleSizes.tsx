import { Toggle, ToggleGroup } from '@polyms/ui-kit'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const sizes = ['sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const

export default function ToggleSizes() {
	const refs = useRef<Record<string, HTMLButtonElement | null>>({})
	const [key, setKey] = useState(nanoid())

	const styles = useMemo<Record<string, Partial<CSSStyleDeclaration>>>(
		() =>
			Object.fromEntries(
				sizes.map(size => {
					const el = refs.current[size]
					if (!el) return [size, {}]

					const { fontSize, lineHeight, height } = window.getComputedStyle(el)
					return [size, { fontSize, lineHeight, height }]
				})
			),
		[key]
	)

	const refresh = useCallback(() => setKey(nanoid()), [])

	useEffect(() => {
		setTimeout(() => {
			refresh()
		}, 100)
	}, [])

	return (
		<div className='card'>
			<table className='table-striped table-borderless table-lg table text-center align-middle'>
				<thead className='thead-light'>
					<tr>
						<th className='text-center'>size</th>
						<th className='text-center'>group</th>
						<th className='text-center'>font-size</th>
						<th className='text-center'>line-height</th>
						<th className='text-center'>height</th>
					</tr>
				</thead>
				<tbody>
					{sizes.map(size => (
						<tr key={size}>
							<td className='text-center'>
								<Toggle
									aria-label={size === 'default' ? 'Default size' : `${size} size`}
									ref={ref => {
										refs.current[size] = ref
									}}
									size={size === 'default' ? undefined : size}
								>
									{size === 'default' ? 'default' : size}
								</Toggle>
							</td>
							<td className='text-center'>
								<ToggleGroup
									aria-label={size === 'default' ? 'Default size group' : `${size} size group`}
									defaultValue={['left']}
									size={size === 'default' ? undefined : size}
								>
									<Toggle value='left'>L</Toggle>
									<Toggle value='right'>R</Toggle>
								</ToggleGroup>
							</td>
							<td className='text-center'>{styles[size]?.fontSize}</td>
							<td className='text-center'>{styles[size]?.lineHeight}</td>
							<td className='text-center'>{styles[size]?.height}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
