import { Tabs } from '@polyms/core'
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
    <Tabs className='mt-4 w-full overflow-clip rounded-2xl border border-neutral-400' defaultValue='preview'>
      <Tabs.List className='bg-slate-50 px-8'>
        <Tabs.Tab value='preview'>Preview</Tabs.Tab>
        <Tabs.Tab value='code'>Code</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className='flex h-96 items-center justify-center' value='preview'>
        {children}
      </Tabs.Panel>
      <Tabs.Panel className='h-96 overflow-auto p-0' style={{ background: '#2e3440' }} value='code'>
        <div className='rounded-b-2xl' dangerouslySetInnerHTML={{ __html: html }} />
      </Tabs.Panel>
    </Tabs>
  )
}
