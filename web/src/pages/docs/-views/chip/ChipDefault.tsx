import { useState } from 'react'
import { Chip, ChipInput } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ChipDefault() {
	const [selected, setSelected] = useState(['primary'])
	const [skills, setSkills] = useState(['React', 'TypeScript'])

	const toggleSelected = (value: string) => {
		setSelected(current =>
			current.includes(value) ? current.filter(item => item !== value) : [...current, value]
		)
	}

	return (
		<div className='m-auto flex flex-col gap-6'>
			<section className='flex flex-col gap-3'>
				<h3 className='text-sm font-semibold'>Standalone chips</h3>
				<div className='flex flex-wrap items-center gap-2'>
					{(['primary', 'success', 'info', 'warning', 'danger'] as const).map(variant => (
						<Chip
							active={selected.includes(variant)}
							key={variant}
							onClick={() => toggleSelected(variant)}
							variant={variant}
						>
							{variant[0].toUpperCase() + variant.slice(1)}
						</Chip>
					))}
					<Chip disabled>Disabled</Chip>
				</div>
				<div className='flex flex-wrap items-center gap-2'>
					<Chip avatar={<span aria-hidden='true'>AL</span>} variant='primary'>
						Aliah Lane
					</Chip>
					<Chip leading={<span aria-hidden='true'>✓</span>} variant='success'>
						Verified
					</Chip>
				</div>
			</section>

			<section className='flex flex-col gap-3'>
				<div>
					<label className='mb-2 block text-sm font-medium' htmlFor='chip-skills'>
						Skills
					</label>
					<ChipInput
						id='chip-skills'
						label='Add a skill'
						onValueChange={setSkills}
						placeholder='Add more…'
						value={skills}
						variant='primary'
					/>
					<p className='mt-2 text-sm text-muted'>
						Press Enter or comma to add a value. Press Backspace in the empty input to select and remove the
						last chip.
					</p>
				</div>
				<div>
					<label className='mb-2 block text-sm font-medium' htmlFor='chip-readonly'>
						Read only
					</label>
					<ChipInput
						id='chip-readonly'
						label='Read only values'
						defaultValue={['Approved', 'Verified']}
						disabled
						placeholder='Disabled'
					/>
				</div>
			</section>
		</div>
	)
}
