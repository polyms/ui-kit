# Component Composition

Prefer exported React components from `@polyms/core-ui` before generating custom markup. Keep compound trees intact so accessibility wiring, focus management, sibling selectors, and animations keep working.

## Public Surface

Use the package barrel only. Common exports include:

- Polyms components: `Button`, `Checkbox`, `Radio`, `RadioGroup`, `Field`, `Modal`, `Select`, `Toast`, `Offcanvas`, `Menu`, `NavigationMenu`, `Tabs`, `Toolbar`, `Avatar`.
- Base UI re-exports: `Accordion`, `Toggle`, `ToggleGroup`, and `useRender`.
- Programmatic overlays: `useModalStore` and `useOffcanvasStore`.
- Code splitting: `dynamic`. Confirm the exact signature in `index.d.ts`.

Common compound roots:

| Area | Pattern |
| --- | --- |
| Modal | `Modal`, `Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Close`, `Modal.Container` |
| Field | `Field`, `Field.Label`, `Field.Control`, `Field.Description`, `Field.Feedback`, `Field.Floating` |
| Select | `Select`, `Select.Trigger`, `Select.Content`, `Select.Item`, `Select.Group` |
| Menu | `Menu`, `Menu.Trigger`, `Menu.Content`, `Menu.Item`, `Menu.Separator`, `Menu.SubmenuRoot`, `Menu.SubmenuTrigger` |
| NavigationMenu | `NavigationMenu`, `NavigationMenu.List`, `NavigationMenu.Item`, `NavigationMenu.Trigger`, `NavigationMenu.Icon`, `NavigationMenu.Content`, `NavigationMenu.GroupLabel`, `NavigationMenu.Separator`, `NavigationMenu.Footer`, `NavigationMenu.Link`, `NavigationMenu.Viewport` |
| Offcanvas | `Offcanvas`, `Offcanvas.Trigger`, `Offcanvas.Content`, `Offcanvas.Header`, `Offcanvas.Title`, `Offcanvas.Description`, `Offcanvas.Body`, `Offcanvas.Close`, `Offcanvas.Container` |
| Tabs | `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` |
| Toolbar | `Toolbar`, `Toolbar.Button`, `Toolbar.Link`, `Toolbar.Input`, `Toolbar.Group`, `Toolbar.Separator` |
| Toast | `Toast`, `Toast.Container`; use `Toast.useToastManager` for imperative toast flows |

## Button

The most-used primitive. `Button` wraps a native `<button>` through `useRender`, so it accepts all native button attributes (`disabled`, `type`, `onClick`, …) plus the `render` prop for polymorphism. With no `variant`, it renders the ghost style (`btn-ghost`).

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'dark' \| 'light'` | — (ghost) | Maps to `btn-*` classes; omit for the transparent ghost button. |
| `size` | `'xs' \| 'sm' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | — (base) | Adds `btn-<size>`; omit for the default medium size. |
| `rounded` | `boolean` | `false` | Pill shape (`rounded-full`). |
| `icon` | `boolean` | `false` | Square icon-only button (`btn-icon`); pair with an `aria-label`. |
| `outlined` | `boolean` | `false` | Outline style for the chosen variant. |
| `active` | `boolean` | `false` | Forces the active/pressed visual state. |
| `tooltip` | `string` | — | Rich tooltip; falls back to the native `title` before hydration. |
| `disabled` | `boolean` | `false` | Native attribute; disables interaction and applies disabled styling. |
| `render` | `useRender` render prop | — | Render as another element (e.g. an `<a>` or router link) while keeping button styling. |

```tsx
import { Button } from '@polyms/core-ui'

<Button variant='primary' size='lg' onClick={save}>
  Save changes
</Button>

<Button variant='danger' outlined disabled>
  Delete
</Button>

<Button icon rounded aria-label='Add item'>
  <PlusIcon />
</Button>
```

When `render` is provided, the default `type='button'` is dropped so the target element keeps its own semantics.

## Modal

`Modal.Content` owns the portal/backdrop/shell and accepts props such as `size`, `centered`, and `scrollable`. `Modal.Header` renders the close button by default.

```tsx
import { Button, Modal } from '@polyms/core-ui'

<Modal>
  <Modal.Trigger>Open</Modal.Trigger>
  <Modal.Content size='lg' title='Account settings'>
    <Modal.Header>Account settings</Modal.Header>
    <Modal.Body>{/* content */}</Modal.Body>
    <Modal.Footer>
      <Modal.Close>Cancel</Modal.Close>
      <Button variant='primary'>Save</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

For imperative modals, mount `Modal.Container` once and call `useModalStore.getState().showModal(...)`.

## Offcanvas

`Offcanvas.Description` must be a direct child of `Offcanvas.Content`, not nested inside `Offcanvas.Title` and not separated from the header by `Offcanvas.Body`.
Use `size` on `Offcanvas.Content` (`sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`) to control panel width for left/right placement or height for up/down placement. On mobile, the panel remains a full-width bottom drawer regardless of `size`.

```tsx
import { Offcanvas } from '@polyms/core-ui'

<Offcanvas>
  <Offcanvas.Trigger>Open</Offcanvas.Trigger>
  <Offcanvas.Content size='lg'>
    <Offcanvas.Header>
      <Offcanvas.Title>Notifications</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Description>Optional subtitle.</Offcanvas.Description>
    <Offcanvas.Body>{/* scrollable content */}</Offcanvas.Body>
  </Offcanvas.Content>
</Offcanvas>
```

Use `Offcanvas.Container` once for `useOffcanvasStore.getState().showOffcanvas(...)`.

## Menu

Keep options as `Menu.Item` or `Menu.SubmenuTrigger` so keyboard navigation, disabled state, and variants work. Use `variant='danger'` for destructive actions.

```tsx
import { Menu } from '@polyms/core-ui'

<Menu>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item variant='danger'>Delete</Menu.Item>
  </Menu.Content>
</Menu>
```

Submenus use `Menu.SubmenuRoot`, `Menu.SubmenuTrigger`, and nested `Menu.Content`.

## NavigationMenu

Each `NavigationMenu.Item` owns its trigger/content, and one shared `NavigationMenu.Viewport` belongs at the end of the root.

```tsx
import { NavigationMenu } from '@polyms/core-ui'

<NavigationMenu>
  <NavigationMenu.List variant='bare'>
    <NavigationMenu.Item value='products'>
      <NavigationMenu.Trigger size='lg'>
        Products
        <NavigationMenu.Icon />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href='/launchpad' variant='soft'>
          Launchpad
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item>
      <NavigationMenu.Link href='/pricing' size='lg' variant='trigger'>
        Pricing
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>

  <NavigationMenu.Viewport />
</NavigationMenu>
```

Use `NavigationMenu.Link render={...}` for router integration. Use `active` for current page state.

Use `NavigationMenu.GroupLabel`, `NavigationMenu.Separator`, and `NavigationMenu.Footer` to structure mega menu content without raw utility bundles. `NavigationMenu.Icon` renders the default rotating chevron; pass children to swap the icon while preserving open-state rotation.

`NavigationMenu.Link` variants:

- `variant='soft'`: card-style row inside `NavigationMenu.Content`.
- `variant='danger'`: destructive row styling for sign-out, revoke, or delete actions.
- `variant='trigger'`: pill styling for static entries inside `NavigationMenu.List`.

```tsx
<NavigationMenu.Content>
  <NavigationMenu.GroupLabel>Products</NavigationMenu.GroupLabel>
  <NavigationMenu.Link href='/launchpad' variant='soft'>
    Launchpad
  </NavigationMenu.Link>
  <NavigationMenu.Separator />
  <NavigationMenu.Footer>
    <span>Postgres branching is now GA.</span>
    <a className='link link-primary' href='/changelog'>Read changelog</a>
  </NavigationMenu.Footer>
</NavigationMenu.Content>
```

## Toolbar

Wrap toolbar actions in `Toolbar.Button` for roving focus. Compose `Toggle`, `Menu.Trigger`, `Select.Trigger`, or `Button` through the `render` prop. Always provide `aria-label` on `Toolbar` and `Toolbar.Group`.

```tsx
import { Toggle, ToggleGroup, Toolbar } from '@polyms/core-ui'

<Toolbar aria-label='Formatting'>
  <Toolbar.Group aria-label='Text alignment'>
    <ToggleGroup className='toolbar-group' aria-label='Alignment'>
      <Toolbar.Button render={<Toggle />} value='left'>
        Left
      </Toolbar.Button>
      <Toolbar.Button render={<Toggle />} value='right'>
        Right
      </Toolbar.Button>
    </ToggleGroup>
  </Toolbar.Group>
</Toolbar>
```

For tooltips, pass `Toolbar.Button` to `Tooltip.Trigger` through `render`. Place `Toolbar.Input` at the end of a horizontal toolbar so text-cursor keyboard behavior remains predictable.

## Field, Checkbox, Radio

Use exported form components instead of raw checkbox/radio markup.

```tsx
import { Checkbox, Field, Radio, RadioGroup } from '@polyms/core-ui'

<Checkbox checked={accepted} onCheckedChange={setAccepted}>
  I accept the terms
</Checkbox>

<Field invalid={hasError}>
  <Field.Label>Payment method</Field.Label>
  <RadioGroup name='payment-method' onValueChange={setPaymentMethod} value={paymentMethod}>
    <Radio value='card'>Card</Radio>
    <Radio value='bank'>Bank transfer</Radio>
  </RadioGroup>
  <Field.Description>You can change this later.</Field.Description>
</Field>
```

`Checkbox`, `Radio`, and `RadioGroup` support sizes and variants. Use `Field` for labels, descriptions, feedback, and invalid state.

### Form submit typing

When wrapping `Field` trees in a native `<form>`, type the submit handler with React's namespaced event type and call `preventDefault` for client-side handling. On `@types/react` 19, the correct type is `React.FormEvent<HTMLFormElement>`. Prefer the inline `React.FormEvent` form over a named `import { FormEvent } from 'react'`. (Note: `React.SubmitEvent` does not exist in `@types/react` 19.x — using it is a compile error.)

```tsx
import { Button, Field } from '@polyms/core-ui'

function SignInForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // submit data…
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field required>
        <Field.Label>Email</Field.Label>
        <Field.Control name='email' type='email' />
      </Field>
      <Button type='submit' variant='primary'>Sign in</Button>
    </form>
  )
}
```

For inline handlers, the event parameter is already inferred — no annotation needed: `onSubmit={(event) => event.preventDefault()}`.

## Select And Tabs

Use `Select.Trigger`, `Select.Content`, `Select.Item`, and `Select.Group` rather than custom listbox markup. Use `Tabs.List`, `Tabs.Tab`, and `Tabs.Panel` so keyboard navigation and selected state attributes remain connected.

## Extending Primitives With useRender

When building a wrapper primitive, use `useRender.ComponentProps<'tag'>` and pass `props.ref` into `useRender`. React 19 does not require `forwardRef` for this pattern.

```tsx
import { useRender } from '@polyms/core-ui'
import clsx from 'clsx'

type ComponentProps = useRender.ComponentProps<'div'>

export function Component({ className, render, ...props }: ComponentProps) {
  return useRender({
    defaultTagName: 'div',
    ref: props.ref,
    render,
    props: {
      ...props,
      className: clsx('component-class', className),
    },
  })
}
```

## Built-In Shells

Library primitives such as `Modal.Content`, `Offcanvas.Content`, `Menu.Content`, and `Select.Content` are already styled. Apply layout classes to your own children or wrappers instead of replacing shell geometry, padding, background, border, or shadow.
