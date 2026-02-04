import clsx from 'clsx'
import type React from 'react'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

export function CodeHighlight({ children, language, className, ...props }: CodeHighlightProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    async function highlight() {
      const codeHtml = await codeToHtml(children?.toString() ?? '', {
        lang: language ?? 'tsx',
        theme: 'nord',
      })
      setHtml(codeHtml)
    }

    highlight()
  }, [children, language])

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
      className={clsx('overflow-hidden rounded-xl border-none', className)}
      data-language={language}
    />
  )
}

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type CodeHighlightProps = React.HTMLAttributes<HTMLElement> & {
  language?: string
}
