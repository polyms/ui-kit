import hljs from 'highlight.js/lib/core'
import parse, { HTMLReactParserOptions } from 'html-react-parser'
import styled from 'styled-components'

export const Example = ({ content, options }: ExampleProps) => {
  return (
    <ExampleCard className='card overflow-hidden border-2 border-secondary'>
      <div className='card-body d-flex flex-column gap-2'>{parse(content, options)}</div>
      <pre
        className='bg-light mb-0 pb-3 pe-3 border-top'
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(content, { language: 'xml' }).value,
        }}
      />
    </ExampleCard>
  )
}

const ExampleCard = styled.div`
  pre {
    --po-border-style: dashed;
  }
`

// ======================================================================================

export type ExampleProps = {
  content: string
  options: HTMLReactParserOptions
}
