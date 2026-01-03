// src/components/CodePreview.tsx
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

export function CodePreview({ code, children }: { code: string; children: React.ReactNode }) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    async function highlight() {
      const codeHtml = await codeToHtml(code, { lang: 'tsx', theme: 'nord' })
      setHtml(codeHtml)
    }

    highlight()
  }, [code])

  return (
    <div className='mt-4 flex w-full flex-col justify-between rounded-2xl border border-neutral-400'>
      <div className='flex w-full justify-center px-20 py-16 align-middle'>{children}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
