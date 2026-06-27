---
description: >-
  @polyms/core-ui component composition — Button, Toast, Switch, Popover, Tooltip, Menu, Toolbar, Select, Tabs,
  Avatar, Breadcrumb, Accordion, Alert, NumberField, Collapsible, Spinner, Toggle, dynamic, useRender. Field → field.md; Modal/Offcanvas → modal.md.
---

# Component Composition

Prefer exported React components from `@polyms/core-ui` before generating custom markup. Keep compound trees intact so accessibility wiring, focus management, sibling selectors, and animations keep working.

## Public Surface

Use the package barrel only. Common exports include:

- Polyms components: `Alert`, `Button`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Field`, `Modal`, `NumberField`, `Select`, `Toast`, `Offcanvas`, `Menu`, `NavigationMenu`, `Tabs`, `Toolbar`, `Avatar`, `Breadcrumb`, `Accordion`, `Collapsible`, `Spinner`, `Popover`, `Tooltip`, and others — confirm in `index.d.ts`.
- Base UI re-exports: `Toggle`, `ToggleGroup`, and `useRender`.
- Programmatic overlays: `useModalStore` and `useOffcanvasStore`.
- Code splitting: `dynamic` (alias `LazyComponentLoader`) — [Dynamic import](#dynamic-import)

Common compound roots:

| Area | Pattern |
| --- | --- |
| Modal | `Modal`, `Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Close`, `Modal.Container` |
| Field | `Field`, `Field.Label`, `Field.Control`, `Field.Description`, `Field.Feedback`, `Field.Floating` |
| Select | `Select`, `Select.Trigger`, `Select.Content`, `Select.Item`, `Select.Group`, `Select.GroupLabel`, `Select.Separator` |
| Menu | `Menu`, `Menu.Trigger`, `Menu.Content`, `Menu.Item`, `Menu.Separator`, `Menu.SubmenuRoot`, `Menu.SubmenuTrigger` |
| NavigationMenu | `NavigationMenu`, `NavigationMenu.List`, `NavigationMenu.Item`, `NavigationMenu.Trigger`, `NavigationMenu.Icon`, `NavigationMenu.Content`, `NavigationMenu.GroupLabel`, `NavigationMenu.Separator`, `NavigationMenu.Footer`, `NavigationMenu.Link`, `NavigationMenu.Viewport` |
| Offcanvas | `Offcanvas`, `Offcanvas.Trigger`, `Offcanvas.Content`, `Offcanvas.Header`, `Offcanvas.Title`, `Offcanvas.Description`, `Offcanvas.Body`, `Offcanvas.Close`, `Offcanvas.Container` |
| Tabs | `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` |
| Toolbar | `Toolbar`, `Toolbar.Button`, `Toolbar.Link`, `Toolbar.Input`, `Toolbar.Group`, `Toolbar.Separator` |
| Toast | `Toast`, `Toast.Container`; use `Toast.useToastManager` for imperative toast flows |
| Alert | `Alert`, `Alert.Heading` |
| Breadcrumb | `Breadcrumb`, `Breadcrumb.Item` |
| Accordion | `Accordion`, `Accordion.Item`, `Accordion.Header`, `Accordion.Trigger`, `Accordion.Panel` |
| Collapsible | `Collapsible`, `Collapsible.Trigger`, `Collapsible.Panel` |
| NumberField | `NumberField` — standalone numeric control (not a `Field` slot) |

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

**There is no `content` prop.** Do not pass `content='center'` or similar invented props.

### Styling rules (agents miss these)

Prefer **`<Button>` props** over hand-written `btn-*` classes. The component maps props → classes:

| `Button` prop | CSS class | Common mistake |
| --- | --- | --- |
| (no `variant`) | `btn-ghost` | omitting `variant` then adding random Tailwind |
| `variant='primary'` | `btn-primary` | `className='btn-primary'` without `btn` base |
| `size='xl'` | `btn-xl` | `size-xl`, `btn size-xl` |
| `rounded` | `rounded-full` | bare Tailwind `rounded` |
| `outlined` | `outlined` modifier on variant | duplicate border utilities |
| `icon` | `btn-icon` | fixed `w-10 h-10` one-offs |

```tsx
// ✅ Correct
<Button variant='primary' size='xl' rounded>Save changes</Button>

// ❌ Wrong — bypasses Button; easy to get class names wrong
<button className='btn btn-primary size-xl content-center rounded' type='button'>
  Save changes
</button>
```

Use raw `className='btn …'` only on **native** `<button>` / `<a>` when `Button` truly cannot be used (rare). Even then, copy the exact mapping above (`btn-xl`, not `size-xl`).

### Compose `Button` through `render`

Primitives that accept Base UI `render` should receive **`render={<Button … />}`** — not `btn-*` classes on the primitive alone:

| Primitive | Pattern |
| --- | --- |
| `Modal.Trigger` | `<Modal.Trigger render={<Button variant='primary' />}>Open</Modal.Trigger>` |
| `Modal.Close` (footer) | `<Modal.Close render={<Button rounded size='xl' />}>Cancel</Modal.Close>` |
| `Offcanvas.Trigger` | `<Offcanvas.Trigger render={<Button variant='primary' outlined />}>Open</Offcanvas.Trigger>` |
| `Offcanvas.Close` (body dismiss) | `<Offcanvas.Close render={<Button rounded />}>Done</Offcanvas.Close>` — not the built-in icon close in `Offcanvas.Content` chrome |
| `Menu.Trigger` | `<Menu.Trigger render={<Button variant='primary' outlined />}>Actions</Menu.Trigger>` |
| `Popover.Trigger` | `<Popover.Trigger render={<Button variant='primary' />}>Details</Popover.Trigger>` |
| `Popover.Close` | `<Popover.Close render={<Button size='sm' variant='light' className='w-full' />}>Close</Popover.Close>` |
| `Collapsible.Trigger` | `<Collapsible.Trigger render={<Button variant='ghost' />}>Toggle</Collapsible.Trigger>` |
| `Toolbar.Button` | `<Toolbar.Button render={<Toggle />}>…</Toolbar.Button>` |

Footer **`Modal.Close`** wires Dialog dismiss — pass **`children`** for a labeled button (with `render={<Button … />}`). Do not use a plain **`Button`** with a manual `onClick` just to close.

When `render` is provided on **`Button`**, the default `type='button'` is dropped so the target element keeps its own semantics.

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

## Toast

Declarative provider + portal container. Imperative toasts via `Toast.useToastManager()`.

```tsx
import { Toast } from '@polyms/core-ui'

export function App() {
  return (
    <Toast>
      <main>{/* routes */}</main>
      <Toast.Container />
    </Toast>
  )
}
```

```tsx
const toastManager = Toast.useToastManager()

toastManager.add({
  title: 'Saved',
  description: 'Profile updated.',
  type: 'success',
})
```

Mount **`Toast.Container`** once under **`Toast`**. Full app-shell wiring (with Modal/Offcanvas containers): [setup.md](setup.md#app-shell).

Deep reference for Modal/Offcanvas overlays: **[modal.md](modal.md)** — Toast is not a dialog; do not use it for confirmations that block workflow.

## Modal & Offcanvas

Deep reference: **[modal.md](modal.md)** (Modal + Offcanvas trees, programmatic stores, anti-patterns). Compound slots: [Public Surface](#public-surface). **`Modal.Trigger`**, footer **`Modal.Close`**, **`Offcanvas.Trigger`**, body **`Offcanvas.Close`**: `render={<Button … />}` — [Compose through `render`](#compose-button-through-render).

## Menu

Keep options as `Menu.Item` or `Menu.SubmenuTrigger` so keyboard navigation, disabled state, and variants work. Use `variant='danger'` for destructive actions. Style **`Menu.Trigger`** with **`render={<Button … />}`** — not hand-written `btn-*` classes.

```tsx
import { Button, Menu } from '@polyms/core-ui'

<Menu>
  <Menu.Trigger render={<Button variant='primary' outlined />}>Actions</Menu.Trigger>
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

**`Field`** / **`Field.Floating`**: **[field.md](field.md)**. Form in Modal/Offcanvas: **field.md** + **modal.md**.

```tsx
import { Checkbox, Field, Radio, RadioGroup } from '@polyms/core-ui'

<Checkbox checked={accepted} onCheckedChange={setAccepted}>
  I accept the terms
</Checkbox>

<Field>
  <Field.Label>How do you want to pay?</Field.Label>
  <RadioGroup name='payment-method' onValueChange={setPaymentMethod} value={paymentMethod}>
    <Radio value='card'>Card</Radio>
    <Radio value='bank'>Bank transfer</Radio>
  </RadioGroup>
  <Field.Description>You can change this later.</Field.Description>
</Field>
```

`Checkbox`, `Radio`, and `RadioGroup` support sizes and variants.

## NumberField

Standalone numeric input with increment/decrement and optional label scrub — **not** a `Field` compound slot. Use **`Field`** + `type='number'` only when you need validation feedback trees; use **`NumberField`** for steppers, quantities, and scrub-by-label.

```tsx
import { NumberField } from '@polyms/core-ui'

<NumberField defaultValue={0} label='Quantity' min={0} max={100} step={1} size='lg' />

<NumberField rounded value={value} onValueChange={setValue} label='Amount' />
```

| Prop | Notes |
| --- | --- |
| `label` | Enables scrub area on label drag |
| `min` / `max` / `step` | Value constraints — Base UI NumberField props |
| `value` / `defaultValue` / `onValueChange` | Controlled / uncontrolled |
| `size` | Same scale as `Field` (`sm`, `lg`, `xl`, …) |
| `rounded` | Pill shape on input + increment control |

| Rule | Detail |
| --- | --- |
| **vs Field** | `NumberField` = stepper UX; `Field` = labels, errors, icons, textarea |
| **Shell** | Bundled `number-field-*` classes — do not rebuild increment buttons by hand |

## Switch

Boolean toggle with optional inline label — not a `Field` replacement for settings forms that need validation feedback.

```tsx
import { Switch } from '@polyms/core-ui'

<Switch label='Receive email notifications' labelPos='start' defaultChecked />
<Switch label='Enable dark mode' disabled />
```

| Prop | Notes |
| --- | --- |
| `label` | Optional text beside the control |
| `labelPos` | `'start'` \| `'end'` (default `'end'`) |
| `variant` | `'primary'` when you need the tinted track |
| `checked` / `defaultChecked` | Controlled / uncontrolled — native checkbox under the hood |

Use inside `Modal.Body` or settings panels for instant-effect prefs. For labeled inputs with errors, use **`Field`** ([field.md](field.md)).

## Toggle

Pressed-state control for formatting tools — not a settings **`Switch`**.

```tsx
import { Toggle, ToggleGroup } from '@polyms/core-ui'

<ToggleGroup aria-label='Alignment' className='toggle-group' defaultValue={['left']}>
  <Toggle className='toggle' value='left'>
    Left
  </Toggle>
  <Toggle className='toggle' value='center'>
    Center
  </Toggle>
</ToggleGroup>
```

| Rule | Detail |
| --- | --- |
| **Classes** | `.toggle`, `.toggle-group` — [css-utilities.md](css-utilities.md) |
| **Exclusive vs multi** | Default exclusive; pass `multiple` on `ToggleGroup` for independent toggles |
| **Toolbar** | `Toolbar.Button render={<Toggle />}` — [Toolbar](#toolbar) |
| **vs Switch** | Toggle = pressed tool state; Switch = immediate on/off setting |

## Select

**Tree:** `Select` → `Select.Trigger` + `Select.Content` → `Select.Item`, `Select.Group`, `Select.GroupLabel`, `Select.Separator`.

```tsx
import { Select } from '@polyms/core-ui'

const exportFormats = [
  { label: 'CSV', value: 'csv' },
  { label: 'Excel', value: 'xlsx' },
]

<Select items={exportFormats}>
  <Select.Trigger placeholder='How do you want to export?' />
  <Select.Content>
    <Select.Group>
      <Select.GroupLabel>Spreadsheet</Select.GroupLabel>
      <Select.Item value='csv'>CSV</Select.Item>
      <Select.Item value='xlsx'>Excel</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>
```

| Rule | Detail |
| --- | --- |
| **Items** | Optional `items` on `Select` root for simple data; still render `Select.Item` children for groups |
| **No fake listbox** | No hand-built `<div role='listbox'>` when `Select` fits |
| **Shell** | `Select.Content` is already styled — do not wrap in large Tailwind bundles |
| **vs Menu** | `Select` for choosing a value; `Menu` for actions |

## Tabs

**Tree:** `Tabs` → `Tabs.List` + `Tabs.Tab` … + matching `Tabs.Panel` per `value`.

```tsx
import { Tabs } from '@polyms/core-ui'

<Tabs defaultValue='profile'>
  <Tabs.List>
    <Tabs.Tab value='profile'>Profile</Tabs.Tab>
    <Tabs.Tab value='account'>Account</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value='profile'>
    <h3 className='h3'>Profile</h3>
    <p className='text-muted'>How others see you on this workspace.</p>
  </Tabs.Panel>
  <Tabs.Panel value='account'>
    <h3 className='h3'>Account</h3>
    <p className='text-muted'>Password and security.</p>
  </Tabs.Panel>
</Tabs>
```

| Rule | Detail |
| --- | --- |
| **Values** | `Tabs.Tab` `value` must match its `Tabs.Panel` `value` |
| **Controlled** | `value` + `onValueChange` on `Tabs` root |
| **Panels required** | Every tab needs a `Tabs.Panel` — no tab labels without content |
| **Long lists** | Many sections → prefer `Tabs` over stacked `divide-y` blocks ([quality.md#lists-and-collections](quality.md#lists-and-collections)) |

## Popover

Lightweight anchored panel — **not** a modal. No `Modal.Container`, no focus trap for full workflows.

**Tree:** `Popover` → `Popover.Trigger` + `Popover.Content`.

```tsx
import { Button, Popover } from '@polyms/core-ui'

<Popover>
  <Popover.Trigger render={<Button variant='primary' />}>Details</Popover.Trigger>
  <Popover.Content
    side='bottom'
    title='Storage usage'
    description='You are using 4.2 GB of 10 GB on this plan.'
  />
</Popover>
```

| Rule | Detail |
| --- | --- |
| **Trigger** | Prefer `render={<Button … />}` — not hand-written `btn-*` on `Popover.Trigger` |
| **Content** | `title` / `description` props on `Popover.Content` — optional `children` for extra body |
| **Placement** | `side`, `align` on `Popover.Content` |
| **vs Modal** | Popover for hints, metadata, compact actions; Modal for blocking confirm / multi-step forms ([modal.md](modal.md)) |

## Tooltip

Hover/focus hint — **not** a dialog or toast.

**Simple API** — wrap a single child and pass `title`:

```tsx
import { Button, Tooltip } from '@polyms/core-ui'

<Tooltip.Provider>
  <Tooltip side='top' title='Save your changes before leaving'>
    <Button outlined>Save</Button>
  </Tooltip>
</Tooltip.Provider>
```

| Rule | Detail |
| --- | --- |
| **Provider** | Wrap a region with `Tooltip.Provider` when multiple tooltips share one tree |
| **Child** | One focusable child (often `Button`); `title` renders the tooltip body |
| **Rich tooltips** | `Button` `tooltip` prop uses the same primitive — prefer for icon-only actions |
| **Toolbar** | `Tooltip.Trigger` + `render` when composing with `Toolbar.Button` (see [Toolbar](#toolbar)) |

Confirm API details in `index.d.ts` when using `Tooltip.Trigger` / `Tooltip.Content` directly.

## Avatar

User identity chip — image, initials fallback, or icon.

```tsx
import { Avatar } from '@polyms/core-ui'

<Avatar className='size-10'>
  <Avatar.Image alt='Tifa Lockhart' src='/avatars/tifa.jpg' />
  <Avatar.Fallback delay={0}>TL</Avatar.Fallback>
</Avatar>
```

| Rule | Detail |
| --- | --- |
| **`alt`** | Always on `Avatar.Image` when the image is meaningful |
| **`Avatar.Fallback`** | Initials or icon when image fails or is loading; `delay={0}` avoids flicker for local assets |
| **Sizing** | `className='size-*'` on root — do not invent one-off width/height without need |

## Alert

Inline status banner — **not** Toast (temporary) and **not** Modal (blocking).

```tsx
import { Alert } from '@polyms/core-ui'

<Alert variant='success'>
  <Alert.Heading>Changes saved</Alert.Heading>
  Your profile updates are live on this workspace.
</Alert>

<Alert badge='New' onDismiss={() => setVisible(false)} variant='info'>
  <Alert.Heading>Policy update</Alert.Heading>
  Review the latest terms before your next billing cycle.
</Alert>
```

| Prop | Notes |
| --- | --- |
| `variant` | `primary`, `success`, `info`, `warning`, `danger`, `light`, `dark` |
| `onDismiss` | Adds dismiss button — `alert-dismissible` styling |
| `badge` | Optional slot after body (label, count) |
| `render` | Polymorphic container via `useRender` |

| Rule | Detail |
| --- | --- |
| **Heading** | `Alert.Heading` for title line — not raw `<h4>` with one-off classes |
| **vs Toast** | Alert = persistent inline feedback on the page; Toast = transient notification |
| **vs Modal** | Alert does not trap focus or block the page |
| **Links in body** | Use `.alert-link` on anchors inside the alert body |

## Breadcrumb

**Tree:** `Breadcrumb` → `Breadcrumb.Item` (list items).

```tsx
import { Breadcrumb } from '@polyms/core-ui'

<Breadcrumb>
  <Breadcrumb.Item href='/projects'>Projects</Breadcrumb.Item>
  <Breadcrumb.Item href='/projects/launchpad'>Launchpad</Breadcrumb.Item>
  <Breadcrumb.Item active>Settings</Breadcrumb.Item>
</Breadcrumb>
```

| Rule | Detail |
| --- | --- |
| **Current page** | `active` or omit `href` on the last crumb — sets `aria-current="page"` on that item only; ancestor links with `href` do not |
| **Router links** | `Breadcrumb.Item` `render` for client-side links — confirm props in `index.d.ts` |

## Accordion

Expand/collapse sections — Polyms wrapper on Base UI with bundled `accordion-*` classes and `accordion-panel-body` padding.

**Shorthand** — `title` on `Accordion.Item`:

```tsx
import { Accordion } from '@polyms/core-ui'

<Accordion defaultValue={['billing']}>
  <Accordion.Item title='Shipping' value='shipping'>
    Free shipping on orders over $50.
  </Accordion.Item>
  <Accordion.Item title='Billing' value='billing'>
    Invoices are emailed after checkout.
  </Accordion.Item>
</Accordion>
```

**Full composition** — custom trigger content; put body text directly in `Accordion.Panel` (no extra `<p>` for spacing):

```tsx
<Accordion defaultValue={['notifications']}>
  <Accordion.Item value='notifications'>
    <Accordion.Header>
      <Accordion.Trigger>How will you notify me?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      We email billing and security updates to tifa.lockhart@polyms.dev.
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>
```

**Multiple open** — `multiple` on root; `defaultValue` / `value` are arrays:

```tsx
<Accordion defaultValue={['shipping', 'returns']} multiple>
  <Accordion.Item title='Shipping' value='shipping'>…</Accordion.Item>
  <Accordion.Item title='Returns' value='returns'>…</Accordion.Item>
</Accordion>
```

| Rule | Detail |
| --- | --- |
| **`title` shorthand** | On `Accordion.Item` — auto-builds Header, Trigger, Panel |
| **Panel content** | Text or blocks in `Accordion.Panel`; padding via inner `accordion-panel-body` — no wrapper `<p>` for spacing |
| **`value`** | Required per item; matches `defaultValue` / controlled `value` on root |
| **`multiple`** | Several panels open at once — value arrays on root |
| **vs Tabs** | Accordion = vertical FAQ/settings; Tabs = peer sections with always-visible tab list |
| **vs Collapsible** | Accordion = grouped items, roving focus, optional `multiple`; Collapsible = one toggle unit with fully custom trigger |
| **Maintainer docs CSS** | Scope API Reference accordion grid under `.api-reference` only — [quality.md#maintainer](quality.md#maintainer) |

## Collapsible

Single expand/collapse region — Base UI wrapper with `.collapsible` animation and `.collapsible-icon` rotation when open.

```tsx
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Collapsible } from '@polyms/core-ui'

<Collapsible className='rounded-lg border border-line' defaultOpen>
  <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium hover:bg-surface'>
    <HugeiconsIcon className='collapsible-icon' icon={ArrowRight01Icon} size={16} />
    Show more details
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <div className='border-line border-t p-4 text-muted'>Hidden content.</div>
  </Collapsible.Panel>
</Collapsible>
```

| Rule | Detail |
| --- | --- |
| **Trigger** | Style with `className` or `render={<Button … />}` — you own trigger chrome |
| **Icon** | Add `collapsible-icon` on chevron — rotates 90° when panel open |
| **Panel padding** | You own inner layout (`p-4`, borders) — unlike `Accordion.Panel` body wrapper |
| **Controlled** | `open` + `onOpenChange` on root |
| **`animated`** | `animated={false}` for instant toggle |
| **vs Accordion** | Stack of independent FAQs → multiple `Collapsible` roots; grouped keyboard accordion → `Accordion` |
| **FAQ at scale** | Many sections with shared styling → prefer `Accordion`; one-off disclosure → `Collapsible` |

## Spinner

Loading indicator for async operations — pair with disabled buttons or skeleton layouts.

```tsx
import { Spinner } from '@polyms/core-ui'

<Spinner />
<Spinner className='text-primary' size={24} />
```

| Prop | Notes |
| --- | --- |
| `size` | Pixel width/height (default `12`) |
| `color` / `subColor` | Arc and track — prefer semantic tokens in app chrome over demo hex |
| `className` | Adds `spinner-loader` |

| Rule | Detail |
| --- | --- |
| **Layout loading** | Prefer `.skeleton` placeholders when shape matters — [css-utilities.md](css-utilities.md) |
| **Button loading** | Disable control + inline `Spinner`; do not stack multiple spinners without intent |
| **vs Toast** | Spinner = in-place progress; Toast = completion message after the fact |

## Dynamic import

Utility — wraps **`React.lazy`** + **`Suspense`**. Import as **`dynamic`** or **`LazyComponentLoader`** (same helper). Not a visual primitive.

```tsx
import { dynamic, Spinner } from '@polyms/core-ui'

const SettingsPanel = dynamic(
  () => import('./SettingsPanel'),
  { loadingComponent: <Spinner size={24} /> }
)

function Page() {
  return <SettingsPanel userId={userId} />
}
```

| Rule | Detail |
| --- | --- |
| **Factory** | `() => Promise<{ default: Component }>` — default export required |
| **`loadingComponent`** | Suspense fallback while chunk loads — `Spinner`, `.skeleton`, or `null` |
| **Props / ref** | Returned component forwards props and ref to the lazy default export |
| **vs raw `lazy`** | Prefer `dynamic()` for consistent loading UI across the app |
| **Module Federation** | Same helper for remote entry components — core ships a `module-federation` Vite plugin |
| **When not to use** | Sync components, tiny modules, or trees that already have route-level Suspense |

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

Library primitives such as `Modal.Content`, `Offcanvas.Content`, `Menu.Content`, `Select.Content`, and `Accordion.Panel` are already styled. Apply layout classes to your own children or wrappers instead of replacing shell geometry, padding, background, border, or shadow.
