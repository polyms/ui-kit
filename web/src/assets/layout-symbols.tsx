import type { SVGProps } from 'react'
import type { DocsIconName } from './docs-symbols'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type LayoutIconName =
	| 'arrow-down-01'
	| 'arrow-right-01'
	| 'checkmark-circle-02'
	| 'circle-arrow-left-double'
	| 'code'
	| 'github'
	| 'list-view'
	| 'menu-02'
	| 'move-top'
	| 'search-list-02'
	| 'search-remove'

export type IconName = DocsIconName | LayoutIconName

type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
	name: IconName
	size?: number
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function LayoutSymbols() {
	return (
		<svg aria-hidden='true' className='absolute h-0 w-0 overflow-hidden' xmlns='http://www.w3.org/2000/svg'>
			<symbol fill='none' id='arrow-down-01' viewBox='0 0 24 24'>
				<path
					d='M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='arrow-right-01' viewBox='0 0 24 24'>
				<path
					d='M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='checkmark-circle-02' viewBox='0 0 24 24'>
				<path
					d='M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z'
					stroke='currentColor'
					strokeWidth='1.5'
				/>
				<path
					d='M8 12.5L10.5 15L16 9'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='code' viewBox='0 0 24 24'>
				<path
					d='M16 6.99998L19.0664 9.64296C20.3554 10.7541 21 11.3096 21 12C21 12.6903 20.3555 13.2459 19.0664 14.357L16 17'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M8 6.99998L4.93365 9.64296C3.64455 10.7541 3 11.3096 3 12C3 12.6903 3.64455 13.2459 4.93365 14.357L8 17'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='github' viewBox='0 0 24 24'>
				<path
					d='M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='circle-arrow-left-double' viewBox='0 0 24 24'>
				<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
				<path
					d='M11.0846 15C11.0846 15 8.50001 12.7905 8.5 12C8.49999 11.2094 11.0846 9 11.0846 9M15.5 15C15.5 15 12.9154 12.7905 12.9154 12C12.9154 11.2094 15.5 9 15.5 9'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='list-view' viewBox='0 0 24 24'>
				<path
					d='M2 11.4C2 10.2417 2.24173 10 3.4 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z'
					stroke='currentColor'
					strokeLinecap='round'
					strokeWidth='1.5'
				/>
				<path
					d='M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z'
					stroke='currentColor'
					strokeLinecap='round'
					strokeWidth='1.5'
				/>
				<path
					d='M2 19.4C2 18.2417 2.24173 18 3.4 18H20.6C21.7583 18 22 18.2417 22 19.4V20.6C22 21.7583 21.7583 22 20.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z'
					stroke='currentColor'
					strokeLinecap='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='menu-02' viewBox='0 0 24 24'>
				<path
					d='M4 5L16 5'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M4 12L20 12'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M4 19L12 19'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='move-top' viewBox='0 0 24 24'>
				<circle
					cx='3'
					cy='3'
					r='3'
					stroke='currentColor'
					strokeWidth='1.5'
					transform='matrix(4.37114e-08 -1 -1 -4.37114e-08 15.0002 21.9999)'
				/>
				<path
					d='M12.0006 1.99988L12.0006 11.9999M12.0006 1.99988C11.4386 1.99988 11.0113 2.43798 10.1569 3.31418L8.50049 4.97045M12.0006 1.99988C12.5627 1.99988 12.9899 2.43798 13.8444 3.31418L15.5005 4.97032'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='search-list-02' viewBox='0 0 24 24'>
				<path
					d='M2.5 9.5H6.5'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M2.5 14.5H6.5'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M2.5 19.5H18.5'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M18.5355 13.0355L21.5 16M20 9.5C20 6.73858 17.7614 4.5 15 4.5C12.2386 4.5 10 6.73858 10 9.5C10 12.2614 12.2386 14.5 15 14.5C17.7614 14.5 20 12.2614 20 9.5Z'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
			<symbol fill='none' id='search-remove' viewBox='0 0 24 24'>
				<path
					d='M17 17L21 21'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
				<path
					d='M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>
			</symbol>
		</svg>
	)
}

export function Icon({ name, size = 24, ...props }: IconProps) {
	return (
		<svg {...props} aria-hidden='true' fill='none' height={size} width={size}>
			<use href={`#${name}`} />
		</svg>
	)
}
