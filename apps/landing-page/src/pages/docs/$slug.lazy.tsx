import { Container } from '@polyms/core-ui'
import { createFileRoute } from '@tanstack/react-router'
import classNames from 'classnames'
import { Highlight, themes } from 'prism-react-renderer'
import { HTMLProps } from 'react'
import styled from 'styled-components'

const CodeBlock = ({ children, className }: HTMLProps<HTMLElement>) => {
  const language = (className || '').replace(/language-/, '')
  return (
    <Highlight
      theme={themes.vsLight}
      code={(children as string).trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeStyled style={style} className={classNames(className, 'border rounded p-2')}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </CodeStyled>
      )}
    </Highlight>
  )
}

const CodeStyled = styled.div`
  color: var(--po-body-color) !important;
  padding: 0.5rem;

  .punctuation {
    color: var(--po-blue) !important;
  }
  .class-name {
    color: var(--po-cyan) !important;
  }
  .attr-name {
    color: var(--po-red) !important;
  }
  .attr-value {
    color: var(--po-indigo) !important;
  }
  .token-line > :first-child {
    width: 30px;
    display: inline-flex;
    justify-content: flex-end;
    padding-right: 0.25rem;
    margin-right: 0.5rem;
    border-right: 1px dashed var(--po-border-color);
    color: var(--po-tertiary-color);
  }
`

const components = {
  code: CodeBlock,
  blockquote: ({ children }: HTMLProps<HTMLElement>) => {
    return <blockquote className='border-start border-5 ps-3'>{children}</blockquote>
  },
}

const Page = () => {
  const { default: Docs, frontmatter } = Route.useLoaderData()

  return (
    <Container className='p-4'>
      <div className='col-lg-10 col-xl-9'>
        <h1>{frontmatter.title}</h1>
        <p className='small'>
          <strong>
            Reference:&nbsp;
            <a href={frontmatter.refUrl} target='_blank' rel='noopener noreferrer'>
              Bootstrap
            </a>
          </strong>
        </p>
        <p className='lead'>{frontmatter.description}</p>
        <Docs components={components} />
      </div>
    </Container>
  )
}

export const Route = createFileRoute('/docs/$slug')({
  component: Page,
  loader: async ({ params }) => {
    return import(`./docs-${params.slug}.mdx`)
  },
})
