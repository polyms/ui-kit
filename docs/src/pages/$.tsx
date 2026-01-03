import { createFileRoute, useMatch } from '@tanstack/react-router'
import React, { useMemo } from 'react'

const mdxFiles = import.meta.glob('./**/*.mdx', { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>

export const Route = createFileRoute('/$')({
  component: MdxPage,
  staticData: { className: 'p-4' },
})

function MdxPage() {
  const match = useMatch({ from: '/$' })
  const filePath = match.pathname

  const LazyMdx = useMemo(() => {
    const importer = mdxFiles[`.${filePath}.mdx`]

    if (!importer) {
      throw new Error(`MDX file not found for: ${filePath}`)
    }
    return importer.default
  }, [filePath])

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <LazyMdx />
    </React.Suspense>
  )
}
