import { Toc } from '@polyms/ui-kit'
import { useRef } from 'react'

const items = [
  { title: 'Overview', url: '#toc-demo-overview', depth: 2 },
  { title: 'Usage', url: '#toc-demo-usage', depth: 2 },
  { title: 'Nested note', url: '#toc-demo-nested', depth: 3 },
  { title: 'Scroll spy', url: '#toc-demo-scroll-spy', depth: 2 },
]

const Default = () => {
  // CodePreview panel is a fixed-height flex column — this node is the overflow scroller.
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className='min-h-0 flex-1 overflow-auto p-4' ref={scrollRef}>
      <div className='mx-auto grid max-w-3xl gap-8 md:grid-cols-[1fr_11rem]'>
        <div className='space-y-16 text-sm leading-relaxed'>
          <section className='min-h-40' id='toc-demo-overview'>
            <h3 className='h3 mb-2'>Overview</h3>
            <p className='text-muted'>
              A table of contents highlights the sections on the current page and tracks which headings are in
              view as you scroll.
            </p>
          </section>
          <section className='min-h-40' id='toc-demo-usage'>
            <h3 className='h3 mb-2'>Usage</h3>
            <p className='text-muted'>
              Render <code>Toc.Item</code> links with matching heading ids. Pass <code>scrollRef</code> when
              the page scrolls inside an overflow container instead of the window.
            </p>
          </section>
          <section className='min-h-40' id='toc-demo-nested'>
            <h4 className='h4 mb-2'>Nested note</h4>
            <p className='text-muted'>Depth 3 and 4 items indent automatically for nested headings.</p>
          </section>
          <section className='min-h-48' id='toc-demo-scroll-spy'>
            <h3 className='h3 mb-2'>Scroll spy</h3>
            <p className='text-muted'>
              Scroll this preview to see the primary item and the range indicator update. Heading ids on the
              page must match the fragment in each item <code>href</code>.
            </p>
          </section>
        </div>

        <Toc className='sticky top-4 self-start' scrollRef={scrollRef}>
          <Toc.List>
            {items.map(item => (
              <Toc.Item depth={item.depth} href={item.url} key={item.url}>
                {item.title}
              </Toc.Item>
            ))}
            <Toc.Indicator />
          </Toc.List>
        </Toc>
      </div>
    </div>
  )
}

export default Default
