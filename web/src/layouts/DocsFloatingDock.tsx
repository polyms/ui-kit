import { ListViewIcon, Menu02Icon, MoveTopIcon } from '@hugeicons/core-free-icons'
import { scrollToHeading, scrollToTop, useVisibleHeadings } from '@polyms/ui-kit'
import { Moon, Palette, Sun } from '@solar-icons/react-perf/BoldDuotone'
import clsx from 'clsx'
import { type RefObject, useMemo } from 'react'
import { Icon } from '../components/Icons'
import { useDocsToc } from '../hooks/useDocsToc'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useAppStore } from '../stores/app.store'
import { useThemeStore } from '../stores/theme.store'
import type { AppSidebar } from './AppSidebar'
import { type DockAction, FloatingDock } from './FloatingDock'
import { ThemeConfigOffcanvas } from './ThemeConfigOffcanvas'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type DocsFloatingDockProps = {
	variant: 'docs' | 'landing'
	sidebarRef?: RefObject<AppSidebar.Ref | null>
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function DocsTocPopover({ onClose }: { onClose: () => void }) {
	const { toc } = useDocsToc()
	const itemIds = useMemo(() => toc.map(item => item.url.replace('#', '')), [toc])
	const { visibleIds, primaryActiveId } = useVisibleHeadings(itemIds)

	return (
		<div data-testid='docs-toc-popover'>
			<p className='floating-dock-popover-title'>On this page</p>
			<ul className='floating-dock-nav-list'>
				<li>
					<button
						className='floating-dock-toc-item'
						data-testid='docs-toc-popover-top'
						onClick={() => {
							scrollToTop()
							onClose()
						}}
						type='button'
					>
						(Top)
					</button>
				</li>
				{toc.map(item => {
					const headingId = item.url.replace('#', '')
					return (
						<li key={item.url}>
							<button
								className={clsx(
									'floating-dock-toc-item',
									item.depth === 3 && 'depth-3',
									item.depth === 4 && 'depth-4',
									visibleIds.has(headingId) && 'is-visible',
									headingId === primaryActiveId && 'is-primary'
								)}
								data-testid={`docs-toc-popover-${headingId}`}
								onClick={() => {
									scrollToHeading(headingId)
									onClose()
								}}
								type='button'
							>
								{item.title}
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export function DocsFloatingDock({ variant, sidebarRef }: DocsFloatingDockProps) {
	const theme = useAppStore(state => state.theme)
	const toggleTheme = useAppStore(state => state.toggleTheme)
	const isDark = theme === 'dark'
	const themeOpen = useThemeStore(state => state.open)
	const setThemeOpen = useThemeStore(state => state.setOpen)
	const { toc } = useDocsToc()
	// The TOC aside is visible from xl up, so the dock's TOC popover is redundant there.
	const isTocAsideVisible = useMediaQuery('(min-width: 1280px)')

	const actions: DockAction[] = useMemo(() => {
		const themeAction: DockAction = {
			type: 'button',
			id: 'theme',
			icon: <Palette className='size-5' />,
			label: 'Theme',
			active: themeOpen,
			onClick: () => setThemeOpen(true),
		}

		const appearanceAction: DockAction = {
			type: 'button',
			id: 'appearance',
			icon: isDark ? <Sun className='size-5' /> : <Moon className='size-5' />,
			label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
			onClick: toggleTheme,
		}

		const topAction: DockAction = {
			type: 'button',
			id: 'top',
			icon: <Icon icon={MoveTopIcon} size={20} strokeWidth={2} />,
			label: 'Back to top',
			onClick: scrollToTop,
		}

		const menuAction: DockAction = {
			type: 'button',
			id: 'menu',
			icon: <Icon icon={Menu02Icon} size={20} strokeWidth={2} />,
			label: 'Open navigation',
			onClick: () => sidebarRef?.current?.toggleSidebar(),
		}

		if (variant === 'landing') {
			return [topAction, themeAction, appearanceAction]
		}

		const docsActions: DockAction[] = [
			topAction,
			themeAction,
			appearanceAction,
			{ type: 'divider', id: 'divider' },
			menuAction,
		]

		if (toc.length > 0 && !isTocAsideVisible) {
			docsActions.push({
				type: 'popover',
				id: 'toc',
				icon: <Icon icon={ListViewIcon} size={20} strokeWidth={2} />,
				label: 'Table of contents',
				render: close => <DocsTocPopover onClose={close} />,
			})
		}

		return docsActions
	}, [variant, isDark, themeOpen, setThemeOpen, toggleTheme, sidebarRef, toc.length, isTocAsideVisible])

	return (
		<>
			<FloatingDock actions={actions} />
			<ThemeConfigOffcanvas />
		</>
	)
}
