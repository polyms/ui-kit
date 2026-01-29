import { metadataByRoute, type PageMetadata, tocByRoute } from 'virtual:mdx-navigation'
import { MDXProvider } from '@mdx-js/react'
import { createFileRoute, useLocation, useMatch, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import React, { useEffect, useMemo, useRef } from 'react'
import { CodePreview } from '../layouts/CodePreview'
import { DocsToc } from '../layouts/DocsToc'

const mdxFiles = import.meta.glob('./**/*.mdx', { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>

export const Route = createFileRoute('/$')({
  component: MdxPage,
  staticData: { className: 'p-4' },
})

export function MdxLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const path = location.pathname

  // routeBase is '/' and contentDir is 'src/pages'
  // MDX files under 'src/pages/docs/**/*.mdx' map to '/docs/...'
  const routeKey = path

  const metadata: PageMetadata | undefined = metadataByRoute[routeKey]
  const toc = tocByRoute[routeKey] ?? tocByRoute[routeKey.replace(/\/$/, '')] ?? []

  return (
    <div className={clsx('flex min-w-0')}>
      <div className='min-w-0 flex-1'>
        <div>
          {metadata?.type && (
            <span className='mb-4 inline-block font-semibold text-neutral-500 text-xs uppercase tracking-wide'>
              {metadata.type}
            </span>
          )}
          <h1 className='h1 mb-xs'>{metadata?.title}</h1>
          {children}
        </div>
      </div>
      <DocsToc toc={toc} />
    </div>
  )
}

function MdxPage() {
  const match = useMatch({ from: '/$' })
  const filePath = match.pathname
  const slugCountsRef = useRef<Record<string, number>>({})
  const pathname = useRouterState({ select: s => s.location.pathname })

  useEffect(() => {
    slugCountsRef.current = {}
  }, [pathname])

  const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? '')
      const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
      return (
        <h1 className='h1 mb-xs' {...props} id={id}>
          {props.children}
        </h1>
      )
    },
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? '')
      const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
      return <h2 className={clsx('h2 mt-4', props.className)} {...props} id={id} />
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? '')
      const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
      return (
        <h3 className='mb-3xs font-mono font-semibold text-neutral-500 text-xs uppercase' {...props} id={id}>
          {props.children}
        </h3>
      )
    },
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? '')
      const id = props.id ?? slugWithCounts(text, slugCountsRef.current)
      return <h4 {...props} id={id} />
    },
    // biome-ignore lint/style/useNamingConvention: off
    CodePreview,
  }

  const LazyMdx = useMemo(() => {
    const importer = mdxFiles[`.${filePath}.mdx`]

    if (!importer) {
      throw new Error(`MDX file not found for: ${filePath}`)
    }
    return importer.default
  }, [filePath])

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <MDXProvider components={mdxComponents}>
        <MdxLayout>
          <LazyMdx />
        </MdxLayout>
      </MDXProvider>
    </React.Suspense>
  )
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
  return count === 0 ? base : `${base}-${count}`
}
