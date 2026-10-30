import { metadataByRoute, type PageMetadata } from 'virtual:mdx-navigation'
import { LinkSquare02Icon, Unlink01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { MDXProvider } from '@mdx-js/react'
import { Link, useMatch, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import React, { useEffect, useMemo, useRef } from 'react'
import { CodeHighlight } from '../components/CodeHighlight'
import APIReference from '../layouts/APIReference'
import { CodePreview } from '../layouts/CodePreview'
import { DocsToc } from '../layouts/DocsToc'

const mdxFiles = import.meta.glob('./**/*.mdx', { eager: true }) as Record<
	string,
	{ default: React.ComponentType }
>

function MdxAnchor({ href, className, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	const classes = clsx(className ?? 'link link-primary inline-flex items-center gap-1')
	const target = typeof href === 'string' ? resolveAppHref(href) : null
	const externalIcon = typeof href === 'string' && href.startsWith('http')

	if (!target) {
		return (
			<a {...props} className={classes} href={href}>
				{children}
				{externalIcon ? <HugeiconsIcon icon={LinkSquare02Icon} size={16} /> : null}
			</a>
		)
	}

	if (target.pathname === '/') {
		return (
			<Link {...props} activeProps={{}} className={classes} hash={target.hash} to='/'>
				{children}
			</Link>
		)
	}

	if (target.pathname === '/demo') {
		return (
			<Link {...props} activeProps={{}} className={classes} hash={target.hash} to='/demo'>
				{children}
			</Link>
		)
	}

	if (target.pathname === '/forms') {
		return (
			<Link {...props} activeProps={{}} className={classes} hash={target.hash} to='/forms'>
				{children}
			</Link>
		)
	}

	return (
		<Link
			{...props}
			activeProps={{}}
			className={classes}
			hash={target.hash}
			params={{ _splat: target.pathname.slice(1) }}
			to='/$'
		>
			{children}
		</Link>
	)
}

function MdxLayout({ children }: { children: React.ReactNode }) {
	// routeBase is '/' and contentDir is 'src/pages'
	// MDX files under 'src/pages/docs/**/*.mdx' map to '/docs/...'
	const activePath = useRouterState({ select: s => s.location.pathname })

	const metadata: PageMetadata | undefined = metadataByRoute[activePath]

	return (
		<div
			className='docs-page flex min-w-0 flex-row px-4 pt-6 pb-8 sm:px-6 sm:pt-8 lg:px-8 lg:pt-0'
			data-testid={`docs-page-${activePath.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}`}
		>
			<div className='docs min-w-0 flex-1 xl:pe-6'>
				{/* {metadata?.type && (
            <span className='mb-4 inline-block font-semibold text-neutral-500 text-xs uppercase tracking-wide'>
              {metadata.type}
            </span>
          )} */}
				<h1 className='h1'>{metadata?.title}</h1>
				{children}
			</div>
			<aside className='hidden xl:flex xl:w-72 xl:shrink-0 xl:flex-col'>
				<DocsToc />
			</aside>
		</div>
	)
}

export function MdxPage() {
	const match = useMatch({ from: '/$' })
	const filePath = match.pathname
	const slugCountsRef = useRef<Record<string, number>>({})
	const pathname = useRouterState({ select: s => s.location.pathname })

	useEffect(() => {
		slugCountsRef.current = {}
	}, [pathname])

	const mdxComponents = useMemo(
		() => ({
			h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
				const text = String(props.children ?? '')
				const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
				return (
					<h1 {...props} className={clsx('h1', props.className)} id={id}>
						{props.children}
					</h1>
				)
			},
			h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
				const text = String(props.children ?? '')
				const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
				return (
					<h2 {...props} className={clsx('h2', props.className)} id={id}>
						<span className='link peer decoration-transparent'>{props.children}</span>
						<HugeiconsIcon
							className='text-primary-700 ms-2 opacity-0 transition-opacity peer-hover:opacity-100'
							icon={Unlink01Icon}
							size={16}
							strokeWidth={2}
						/>
					</h2>
				)
			},
			h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
				const text = String(props.children ?? '')
				const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
				return (
					<h3 {...props} className={clsx('h3', props.className)} id={id}>
						<span className='link peer decoration-transparent'>{props.children}</span>
						<HugeiconsIcon
							className='text-primary-700 ms-2 opacity-0 transition-opacity peer-hover:opacity-100'
							icon={Unlink01Icon}
							size={16}
							strokeWidth={2}
						/>
					</h3>
				)
			},
			h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
				const text = String(props.children ?? '')
				const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
				return <h4 {...props} className={clsx('h4', props.className)} id={id} />
			},
			a: MdxAnchor,
			code: (props: React.HTMLAttributes<HTMLElement>) => {
				const className = props.className || ''
				const language = className.replace('language-', '')
				return language ? (
					<CodeHighlight language={language} {...props} />
				) : (
					<code {...props} className='badge badge-primary rounded-full' />
				)
			},
			// biome-ignore-start lint/style/useNamingConvention: off
			CodePreview,
			APIReference,
			// biome-ignore-end lint/style/useNamingConvention: off
		}),
		[pathname]
	)

	const LazyMdx = useMemo(() => {
		const importer = mdxFiles[`.${filePath}.mdx`]

		if (!importer) {
			throw new Error(`MDX file not found for: ${filePath}`)
		}
		return importer.default
	}, [filePath])

	return (
		<MDXProvider components={mdxComponents}>
			<MdxLayout>
				<React.Suspense fallback={<MdxFallback />}>
					<LazyMdx />
				</React.Suspense>
			</MdxLayout>
		</MDXProvider>
	)
}

function MdxFallback() {
	return (
		<div aria-busy='true' className='space-y-4'>
			<div className='skeleton h-4 w-2/3 rounded' />
			<div className='skeleton h-4 w-full rounded' />
			<div className='skeleton h-4 w-5/6 rounded' />
			<div className='skeleton mt-8 h-40 w-full rounded-lg' />
			<div className='skeleton h-4 w-3/4 rounded' />
			<div className='skeleton h-4 w-1/2 rounded' />
		</div>
	)
}

function resolveAppHref(href: string) {
	const trimmed = href.trim()
	if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return null

	const url = new URL(trimmed, 'http://ui-kit.local')
	const pathname = url.pathname.replace(/\/$/, '') || '/'
	const hash = url.hash ? url.hash.slice(1) : undefined

	return { hash, pathname }
}

function slugify(value: string) {
	const normalized = value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

	return normalized || 'section'
}

function slugWithCounts(value: string, counts: Record<string, number>) {
	const base = slugify(value)
	const count = counts[base] ?? 0
	counts[base] = count + 1
	return count > 1 ? `${base}-${count}` : base
}
