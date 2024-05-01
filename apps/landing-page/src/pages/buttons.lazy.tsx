import { Button } from '@polyms/core-ui'
import { createLazyFileRoute } from '@tanstack/react-router'

import { Example } from '../components/Example'
import { DocLayout } from '../layouts/DocLayout'
import { Section } from '../layouts/Section'
import { makeOptions } from '../utils/htmlParser.utils'

const options = makeOptions({
  button: Button,
})

const buttonVariants = /* HTML */ `
  <div className="d-flex gap-2 flex-wrap">
    <button variant="primary">Primary</button>
    <button variant="secondary">Secondary</button>
    <button variant="success">Success</button>
    <button variant="danger">Danger</button>
    <button variant="warning">Warning</button>
    <button variant="info">Info</button>
    <button variant="light">Light</button>
    <button variant="dark">Dark</button>
    <button variant="link">Link</button>
  </div>
`

const Page = () => {
  return (
    <DocLayout
      title='Buttons'
      refUrl='https://getbootstrap.com/docs/5.3/components/buttons/'
    >
      <DocLayout.SubTitle>
        Use Bootstrap's custom button styles for actions in forms, dialogs, and more with
        support for multiple sizes, states, and more.
      </DocLayout.SubTitle>

      <Section title='Variants'>
        Bootstrap includes several button variants, each serving its own semantic purpose,
        with a few extras thrown in for more control.
      </Section>
      <Example content={buttonVariants.replace(/button/g, 'Button')} options={options} />
    </DocLayout>
  )
}

export const Route = createLazyFileRoute('/buttons')({
  component: Page,
})
