import { Container, ListGroup } from '@polyms/core-ui'
import { createFileRoute } from '@tanstack/react-router'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import parse, {
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from 'html-react-parser'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

// Then register the languages you need
hljs.registerLanguage('xml', xml)

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode.type === 'tag') {
      const props = attributesToProps(domNode.attribs)
      Object.keys(props).forEach((key) => {
        if (props[key] === '') props[key] = true
      })

      const mapping = {
        listgroup: ListGroup,
        'listgroup.item': ListGroup.Item,
        'listgroup.link': ListGroup.Link,
        'listgroup.button': ListGroup.Button,
      }
      const Tag = mapping[domNode.name as keyof typeof mapping]
      if (Tag)
        return <Tag {...props}>{domToReact(domNode.children as DOMNode[], options)}</Tag>
    }
    return domNode
  },
}

const listGroup = /* HTML */ `
  <ListGroup>
    <ListGroup.Item>An item</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
    <ListGroup.Item>A fourth item</ListGroup.Item>
    <ListGroup.Item>And a fifth one</ListGroup.Item>
  </ListGroup>
`

const listGroupActive = /* HTML */ `
  <ListGroup>
    <ListGroup.Item active>An active item</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
    <ListGroup.Item>A fourth item</ListGroup.Item>
    <ListGroup.Item>And a fifth one</ListGroup.Item>
  </ListGroup>
`

const listGroupDisabled = /* HTML */ `
  <ListGroup>
    <ListGroup.Item disabled>A disabled item</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
    <ListGroup.Item>A fourth item</ListGroup.Item>
    <ListGroup.Item>And a fifth one</ListGroup.Item>
  </ListGroup>
`

const listGroupLink = /* HTML */ `
  <ListGroup>
    <ListGroup.Link href="#" active>The current link item</ListGroup.Link>
    <ListGroup.Link href="#">A second item</ListGroup.Link>
    <ListGroup.Link href="#">A third item</ListGroup.Link>
    <ListGroup.Link href="#">A fourth item</ListGroup.Link>
    <ListGroup.Link href="#" disabled>A disabled link item</ListGroup.Link>
  </ListGroup>
`

const listGroupButton = /* HTML */ `
  <ListGroup>
    <ListGroup.Button active>The current link item</ListGroup.Button>
    <ListGroup.Button>A second item</ListGroup.Button>
    <ListGroup.Button>A third item</ListGroup.Button>
    <ListGroup.Button>A fourth item</ListGroup.Button>
    <ListGroup.Button disabled>A disabled link item</ListGroup.Button>
  </ListGroup>
`

const listGroupFlush = /* HTML */ `
  <ListGroup flush>
    <ListGroup.Item>An item</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
    <ListGroup.Item>A fourth item</ListGroup.Item>
    <ListGroup.Item>And a fifth one</ListGroup.Item>
  </ListGroup>
`

const listGroupNumbered = /* HTML */ `
  <ListGroup numbered>
    <ListGroup.Item>An item</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
    <ListGroup.Item>A fourth item</ListGroup.Item>
    <ListGroup.Item>And a fifth one</ListGroup.Item>
  </ListGroup>
`

const listGroupNumberedCustom = /* HTML */ `
  <ListGroup numbered>
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span className="badge text-bg-primary rounded-pill">14</span>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span className="badge text-bg-primary rounded-pill">14</span>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span className="badge text-bg-primary rounded-pill">14</span>
    </ListGroup.Item>
  </ListGroup>
`

const listGroupHorizontal = /* HTML */ `
  <ListGroup horizontal>
    <ListGroup.Item>An item (sm)</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
  </ListGroup>
  <ListGroup horizontal="sm">
    <ListGroup.Item>An item (sm)</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
  </ListGroup>
  <ListGroup horizontal="md">
    <ListGroup.Item>An item (md)</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
  </ListGroup>
  <ListGroup horizontal="lg">
    <ListGroup.Item>An item (lg)</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
  </ListGroup>
  <ListGroup horizontal="xl">
    <ListGroup.Item>An item (xl)</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
  </ListGroup>
  <ListGroup horizontal="xxl">
    <ListGroup.Item>An item (xxl)</ListGroup.Item>
    <ListGroup.Item>A second item</ListGroup.Item>
    <ListGroup.Item>A third item</ListGroup.Item>
  </ListGroup>
`

const Page = () => {
  return (
    <Container className='p-4'>
      <div className='col-9'>
        <h1>List group</h1>
        <p className='small'>
          <strong>
            Reference:&nbsp;
            <a
              href='https://getbootstrap.com/docs/5.3/components/list-group/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Bootstrap
            </a>
          </strong>
        </p>
        <p className='lead'>
          List groups are a flexible and powerful component for displaying a series of
          content. Modify and extend them to support just about any content within.
        </p>

        <Section title='Basic example'>
          The most basic list group is an unordered list with list items and the proper
          classes. Build upon it with the options that follow, or with your own CSS as
          needed.
        </Section>
        <Example content={listGroup} options={options} />

        <br />

        <Section title='Active items'>
          Add <code>`active`</code> to a <code>ListGroup.Item</code> to indicate the
          current active selection.
        </Section>
        <Example content={listGroupActive} options={options} />

        <br />

        <Section title='Disabled items'>
          Add <code>disabled</code> to a <code>ListGroup.Item</code> to make it&nbsp;
          <em>appear</em> disabled. Note that some elements with <code>disabled</code>
          &nbsp; will also require custom JavaScript to fully disable their click events
          (e.g., links).
        </Section>
        <Example content={listGroupDisabled} options={options} />

        <br />

        <Section title='Links and buttons'>
          Use <code>&lt;a&gt;</code>s or <code>&lt;button&gt;</code>s to create&nbsp;
          <em>actionable</em> list group items with hover, disabled, and active states by
          adding <code>.list-group-item-action</code>. We separate these pseudo-classes to
          ensure list groups made of non-interactive elements (like&nbsp;
          <code>&lt;li&gt;</code>s or <code>&lt;div&gt;</code>s) don't provide a click or
          tap affordance.
        </Section>
        <Example content={listGroupLink} options={options} />

        <br />

        <p>
          With <code>&lt;button&gt;</code>s, you can also make use of the&nbsp;
          <code>disabled</code> attribute instead of the <code>.disabled</code> class.
          Sadly, <code>&lt;a&gt;</code>s don't support the disabled attribute.
        </p>
        <Example content={listGroupButton} options={options} />

        <br />

        <Section title='Flush'>
          Add <code>.list-group-flush</code> to remove some borders and rounded corners to
          render list group items edge-to-edge in a parent container (e.g., cards).
        </Section>
        <Example content={listGroupFlush} options={options} />

        <br />

        <Section title='Numbered'>
          Add the <code>numbered</code> modifier class to opt into numbered list group
          items. Numbers are generated via CSS (as opposed to a <code>&lt;ol&gt;</code>s
          default browser styling) for better placement inside list group items and to
          allow for better customization.
        </Section>
        <Example content={listGroupNumbered} options={options} />
        <br />
        <p>These work great with custom content as well.</p>
        <Example content={listGroupNumberedCustom} options={options} />

        <br />

        <Section title='Horizontal'>
          Add <code>horizontal</code> to change the layout of list group items from
          vertical to horizontal across all breakpoints. Alternatively, choose a
          responsive variant <code>horizontal=&#123;sm|md|lg|xl|xxl&#125;</code> to make a
          list group horizontal starting at that breakpoint's <code>min-width</code>.
          Currently&nbsp;
          <strong>
            horizontal list groups cannot be combined with flush list groups.
          </strong>
        </Section>
        <p>
          <strong>ProTip:</strong> Want equal-width list group items when horizontal?
          Add&nbsp;
          <code>.flex-fill</code> to each list group item.
        </p>
        <Example content={listGroupHorizontal} options={options} />
      </div>
    </Container>
  )
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{children}</p>
    </>
  )
}

export type ExampleProps = {
  content: string
  options: HTMLReactParserOptions
}
const Example = ({ content, options }: ExampleProps) => {
  return (
    <ExampleCard className='card col-8 overflow-hidden border-2 border-secondary'>
      <div className='card-body'>{parse(content, options)}</div>
      <pre
        className='bg-light mb-0 pb-3 border-top'
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

export const Route = createFileRoute('/list-group')({
  component: Page,
})

// ======================================================================================

type SectionProps = PropsWithChildren<{
  title: string
}>
