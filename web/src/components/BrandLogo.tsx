import clsx from 'clsx'
import { domMax, LazyMotion, MotionConfig, m, type Transition } from 'motion/react'
import type { ReactNode } from 'react'
import { FaviconFit } from '../assets/FaviconFit'
import { useMediaQuery } from '../hooks/useMediaQuery'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type BrandLogoProps = {
	children: ReactNode
	className?: string
	hexCenterColor?: string
	iconClassName?: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

/** Shared by the landing nav and the docs shell so the mark can travel between them. */
const BRAND_LOGO_LAYOUT_ID = 'brand-logo'

const brandLogoTransition: Transition = {
	layout: { bounce: 0.18, duration: 0.55, type: 'spring' },
}

export function BrandLogo({ children, className, hexCenterColor, iconClassName }: BrandLogoProps) {
	// The docs mark is `display: none` below the sidebar breakpoint, so a shared layout
	// would fly into an empty box. Only connect the two marks when both are on screen.
	const shareLayout = useMediaQuery('(min-width: 1024px)')

	return (
		<LazyMotion features={domMax}>
			<MotionConfig reducedMotion='user'>
				<m.span
					className={clsx('relative z-30 inline-flex shrink-0 items-center', className)}
					layoutId={shareLayout ? BRAND_LOGO_LAYOUT_ID : undefined}
					transition={brandLogoTransition}
				>
					<FaviconFit className={iconClassName} hexCenterColor={hexCenterColor} />
					{children}
				</m.span>
			</MotionConfig>
		</LazyMotion>
	)
}
