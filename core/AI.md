# AI & developer notes for consuming `@polyms/core-ui`

This file ships inside the npm package so assistants and developers follow the same conventions when **using** the library in an application. It is **not** the monorepo contributor guide (see the repository’s `AGENTS.md`).

## Package

- **Name:** `@polyms/core-ui`
- **Peers:** `react` and `react-dom` **>= 19.0.0**
- **Types:** Prefer **`index.d.ts`** and editor IntelliSense over guessing public APIs.

## What the main export contains

Everything comes from **one entry**: `@polyms/core-ui` (`index.mjs` / `index.d.ts`).

- **Polyms components** — e.g. `Button`, `Field`, `Modal`, `Select`, `Toast`, `Offcanvas`, `Menu`, `Tabs`, `Toolbar`, `Avatar`, …
- **Re-exports from Base UI** — e.g. `Accordion`, `NavigationMenu`, `Toggle`, `ToggleGroup`, plus **`useRender`** from `@base-ui/react/use-render`.
- **Programmatic modals** — **`useModalStore`** with **`showModal`** / **`closeModal`** on the store (see modal types in `index.d.ts`).
- **Code-splitting** — **`dynamic`** (lazy loader) if present in your version — confirm in `index.d.ts`.

Do **not** rely on deep imports like `@polyms/core-ui/button` unless your toolchain explicitly supports them; use the barrel export.

## Gray scale: use **slate**, not **neutral**

`@polyms/core-ui` styles and examples use the **slate** gray ramp. Mixing **neutral** grays produces mismatched borders, text, and surfaces next to library components.

**Rules (apply in consumer apps that compose this library):**

1. **CSS custom properties** — Use **`var(--color-slate-50)`** … **`var(--color-slate-950)`** (and the steps your theme defines). **Do not** use **`var(--color-neutral-*)`** for UI chrome next to core-ui unless you have a deliberate, documented exception.
2. **Tailwind utility classes** — Prefer **`text-slate-*`**, **`bg-slate-*`**, **`border-slate-*`**, **`divide-slate-*`**, **`ring-slate-*`**, **`outline-slate-*`**, **`from-slate-*` / `to-slate-*`** where you would reach for gray. **Avoid** the **`neutral`** scale (**`text-neutral-*`**, **`bg-neutral-*`**, etc.) for the same roles.
3. **When refactoring or generating code** — If you see **`neutral`** used for generic gray UI near Polyms components, **replace with the closest `slate` step** so contrast and hue stay aligned with the design system.
4. **Exceptions** — Third-party snippets, legacy pages, or brand-specific tokens may still use other palettes; isolate those regions or migrate gradually. Default assumption for new UI alongside this package: **slate**.

## Semantic colors: **primary**, **success**, **warning**, **danger**, **light**, **dark**

The design system expresses **intent** through named tones, not through arbitrary Tailwind palette families.

**Prefer these semantics when generating or composing UI with this library:**

| Intent | Tokens / APIs (examples) |
| ------ | ------------------------ |
| Brand / default emphasis | **`primary`** — `btn-primary`, `badge-primary`, `alert-primary`, `link-primary`, `text-primary-*` / `bg-primary-*` where the theme exposes them |
| Positive / completion | **`success`** — `btn-success`, `badge-success`, `alert-success`, … |
| Caution / at-risk | **`warning`** — `btn-warning`, `badge-warning`, `alert-warning`, … |
| Error / destructive | **`danger`** — `btn-danger`, `badge-danger`, `alert-danger`, `link-danger`, … |
| Surfaces / contrast | **`light`**, **`dark`** — `badge-light`, `badge-dark`, `link-light`, `thead-light`, … |

**Do not** substitute unrelated Tailwind color scales (**`rose-*`**, **`red-*`**, **`emerald-*`**, **`amber-*`**, etc.) when you mean **danger**, **success**, or **warning**. Those palettes are not part of the contract for Polyms components and produce inconsistent results next to `btn-*`, `badge-*`, and `alert-*`.

**Rule for AI code generation:** default to **`primary` / `success` / `warning` / `danger` / `light` / `dark`** (and **slate** for neutral chrome per the previous section). Only use other Tailwind color families when the product explicitly requires a non-semantic accent and it is documented locally.

## Compound components (dot notation)

Prefer **dot access** on the root export instead of inventing separate top-level imports.

| Area | Typical pattern |
|------|-----------------|
| Modal | `Modal`, `Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Close`, `Modal.Container` |
| Field | `Field`, `Field.Label`, `Field.Control`, `Field.Description`, `Field.Feedback`, `Field.Floating` |
| Select | `Select` + `Select.Trigger`, `Select.Content`, `Select.Item`, `Select.Group`, … |
| Menu | `Menu`, `Menu.Trigger`, `Menu.Content`, `Menu.Item`, … |
| Offcanvas | `Offcanvas`, `Offcanvas.Trigger`, `Offcanvas.Content`, `Offcanvas.Header`, … |
| Tabs | `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` |
| Toolbar | `Toolbar`, `Toolbar.Button`, `Toolbar.Link`, `Toolbar.Input`, `Toolbar.Group`, `Toolbar.Separator` |
| Toast | `Toast` + `Toast.Container`; **`Toast.useToastManager`** for imperative use where applicable |

If code uses `ModalHeader` as a standalone import, it is likely wrong — use **`Modal.Header`** unless types say otherwise. Confirm names in **`index.d.ts`** for your installed version.

### Composition trees (don’t flatten or misuse children)

Compound components rely on **order and ancestry**. Wrong nesting breaks **accessibility** (`Title` /
`Description`, menu roving focus, submenu relationships) and **library CSS** (sibling selectors, fixed
header/body/footer regions, menu item states).

**General rule for AI code generation:** keep the documented component tree intact. Use the root component,
then its **Trigger**, then **Content**, then the provided semantic slots (`Header`, `Body`, `Footer`, `Item`,
`Separator`, `Group`, …). Do **not** flatten these slots into raw `<div>`s, create fake standalone imports
(`ModalHeader`, `MenuItem`, …), or move description/title-like nodes into arbitrary wrappers.

#### Modal

`Modal.Content` owns the dialog portal/backdrop/shell and accepts layout props such as **`size`**,
**`centered`**, and **`scrollable`**. Put modal structure inside it in this order:

```tsx
<Modal>
  <Modal.Trigger>Open</Modal.Trigger>
  <Modal.Content size='lg' title='Account settings'>
    <Modal.Header>Account settings</Modal.Header>
    <Modal.Body>{/* Main content and form fields */}</Modal.Body>
    <Modal.Footer>
      <Button variant='primary'>Save</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

Use **`Modal.Header`** for the accessible dialog title; it already renders the close button by default.
Use **`Modal.Body`** for scrollable primary content and **`Modal.Footer`** for actions. Do **not** put full
dialog layout utilities on **`Modal.Content`** to recreate header/body/footer spacing; those shells are already
styled by the package CSS.

#### Offcanvas

**`Offcanvas.Description`** is implemented as **`Drawer.Description`**: it must stay associated with
**`Offcanvas.Title`** (`Drawer.Title`) and remain a **direct child** of **`Offcanvas.Content`** — **not** nested
inside **`Offcanvas.Title`**.

Spacing in the bundled CSS assumes **`Offcanvas.Header`** (`offcanvas-heading`) is followed **immediately** by
**`Offcanvas.Description`** when you use both (selector `.offcanvas-heading + .offcanvas-description`).
**Do not** insert **`Offcanvas.Body`** (or unrelated wrappers) between **`Header`** and **`Description`** if you
rely on that layout.

Recommended structure:

```tsx
<Offcanvas>
  <Offcanvas.Trigger>Open</Offcanvas.Trigger>
  <Offcanvas.Content>
    <Offcanvas.Header>
      <Offcanvas.Title>Panel title</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Description>Optional short subtitle tied to the title.</Offcanvas.Description>
    <Offcanvas.Body>{/* Primary scrollable content */}</Offcanvas.Body>
  </Offcanvas.Content>
</Offcanvas>
```

Skip **`Description`** entirely when you don’t need a subtitle.

#### Menu

`Menu` is a Base UI menu wrapper with styled slots. Keep interactive options as **`Menu.Item`** (or
**`Menu.SubmenuTrigger`**) so keyboard navigation, disabled state, and variants work.

Recommended structure:

```tsx
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

For submenus, use **`Menu.SubmenuRoot`** with **`Menu.SubmenuTrigger`** and a nested **`Menu.Content`**:

```tsx
<Menu.SubmenuRoot>
  <Menu.SubmenuTrigger>Export</Menu.SubmenuTrigger>
  <Menu.Content sideOffset={0}>
    <Menu.Item>PDF</Menu.Item>
    <Menu.Item>PNG</Menu.Item>
  </Menu.Content>
</Menu.SubmenuRoot>
```

Do **not** replace **`Menu.Item`** with plain buttons/anchors unless the types explicitly support a custom
render prop for that case. For destructive actions, use **`variant='danger'`** instead of `text-rose-*` or
manual danger classes.

#### Toolbar

`Toolbar` is a Base UI toolbar wrapper with styled slots. Wrap clickable items in **`Toolbar.Button`** so they
participate in the roving focus and inherit the `data-disabled` / `data-pressed` styling.

Recommended structure:

```tsx
<Toolbar aria-label='Formatting'>
  <Toolbar.Group aria-label='Text formatting'>
    <Toolbar.Button>Bold</Toolbar.Button>
    <Toolbar.Button>Italic</Toolbar.Button>
  </Toolbar.Group>
  <Toolbar.Separator orientation='vertical' />
  <Toolbar.Link href='#'>Docs</Toolbar.Link>
</Toolbar>
```

To compose with `Toggle`, `Menu.Trigger`, `Select.Trigger`, `Popover.Trigger`, `Dialog.Trigger`, or
`AlertDialog.Trigger`, pass them through the **`render`** prop of **`Toolbar.Button`** so the toolbar still
owns keyboard navigation:

```tsx
<Toolbar>
  <ToggleGroup className='toolbar-group' aria-label='Alignment'>
    <Toolbar.Button render={<Toggle />} value='left'>Left</Toolbar.Button>
    <Toolbar.Button render={<Toggle />} value='right'>Right</Toolbar.Button>
  </ToggleGroup>
</Toolbar>
```

For tooltips, do the inverse — pass `Toolbar.Button` to `Tooltip.Trigger` via its `render` prop. Use
**`Toolbar.Input`** sparingly and place it at the **end** of a horizontal toolbar so left/right keys keep
working as text-cursor movement. Always provide an `aria-label` on the `Toolbar` itself and on each
`Toolbar.Group` / `ToggleGroup` inside it.

**Other roots** (`Field`, `Select`, `Tabs`, …) follow the same idea: inspect **`index.d.ts`**, match documented
patterns, and avoid inventing wrappers that separate semantic subcomponents from their expected parent.

### Built-in surfaces: avoid redundant utility classes

Polyms primitives ship **pre-styled shells** (`offcanvas-content`, `offcanvas-heading`, `modal-*`, …) in the bundled CSS. Those nodes already define **layout, padding, typography, and motion**.

**Rules for AI and hand-written code:**

1. **Do not** paste large Tailwind bundles (`flex`, `p-*`, `bg-*`, `rounded-*`, `shadow-*`, full **width/height** systems, etc.) onto **library-owned roots** (`Offcanvas.Content`, `Modal.Content`, `Menu.Content`, `Menu.Item`, drawer/viewport internals, …) unless you have a documented one-off override.
2. Prefer **component props** (`closeButton`, `backdrop`, `variant`, `size`, …) and **semantic children** (`Header`, `Body`, …) over re-styling the shell.
3. Apply **`className`** mainly to **your** content inside **`Body`**, custom slots, or small layout wrappers **you** own — not to duplicate what the package CSS already encodes.
4. If the visual result is wrong, first assume **wrong composition** (missing **`Header`**, **`Description`** in the wrong place, …) before adding utilities to the root.

## App shell: Toast

```tsx
import { Toast } from '@polyms/core-ui'

export function App() {
  return (
    <Toast>
      {/* routes / layout */}
      <Toast.Container />
    </Toast>
  )
}
```

Keep **`Toast.Container`** where toasts should render (adjust for your router layout).

## Modal store and Zustand

Imperative modals use **`useModalStore`** (**`showModal`** / **`closeModal`**). **zustand** is **external** to the bundle — install it in the consumer app:

```bash
pnpm add zustand
```

Mount **`Modal.Container`** once in the tree when using **`showModal`**; otherwise content may not appear.

## Imports

```ts
import { Button, Modal, Field } from '@polyms/core-ui'
```

When unsure a symbol exists, open **`node_modules/@polyms/core-ui/index.d.ts`**.

## Styles

- **Pre-built CSS:** Package root includes a hashed file such as **`styles-<hash>.css`** (hash changes per release). Import or link it per your bundler from `node_modules/@polyms/core-ui/`.
- **Tailwind v4 integration:** Source entry **`styles/tailwind.css`** under **`styles/`** is for apps that compile Tailwind 4 with a compatible pipeline.

That stylesheet already applies to **exported components**; consumers should **import the package CSS** (or the Tailwind entry) so those rules are active. See **“Built-in surfaces”** under compound components — avoid re-implementing the same look with utilities on component roots.

If anything conflicts, trust **on-disk paths** and **`package.json`** for the version you installed.

## CSS-only UI classes (no React component)

Some UI patterns are provided as CSS classes only. They are still part of the public consumption surface when styles are loaded.

- **Table system:** `.table`, `.table-sm`, `.table-lg`, `.table-striped`, `.table-hover`, `.table-bordered`, `.table-borderless`, `.table-active`, `.table-group-divider`, `.caption-top`, `thead.thead-light`.
- **Badge:** `.badge`, size variants (`.badge-lg`, `.badge-xl`) and tone variants (`.badge-primary`, `.badge-success`, `.badge-info`, `.badge-warning`, `.badge-danger`, `.badge-light`, `.badge-dark`).
- **Card:** `.card`, `.card-body`.
- **Link helpers:** `.link` + flavor classes (`.link-primary`, `.link-danger`, `.link-light`) and `.stretched-link`.
- **Skeleton:** `.skeleton` for loading placeholders.
- **Typography:** `.h1` ... `.h6`.
- **Z-index helpers:** `.z-dropdown`, `.z-sticky`, `.z-fixed`, `.z-toolbar`, `.z-offcanvas`, `.z-modal`, `.z-popover`, `.z-tooltip`, `.z-toast`, etc.
- **Layout utilities:** `.@page` and `.container-page` for container-query based page layout.
- **General utilities:** `.border-light`, `.border-{t|r|b|l|s|e|x|y}-light`, `.bg-light`, and state classes like `.item-primary` ... `.item-dark`.
- **Rule for AI code generation:** if there is no exported React component (for example `Table`), generate semantic HTML + these classes instead of inventing a new component API.

Table example:

```tsx
<table className='table table-striped table-hover table-bordered'>
  <thead className='thead-light'>
    <tr>
      <th scope='col'>Name</th>
      <th scope='col'>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Order #1024</td>
      <td>Paid</td>
    </tr>
  </tbody>
</table>
```

Badge / card example:

```tsx
<div className='card'>
  <div className='card-body'>
    <div className='mb-2 inline-flex gap-2'>
      <span className='badge badge-primary'>New</span>
      <span className='badge badge-light'>Draft</span>
    </div>
    <a className='link link-primary stretched-link' href='/docs'>
      Open docs
    </a>
  </div>
</div>
```

Notes:

- Prefer `<thead className='thead-light'>` for a standard header style.
- `thead.bg-neutral` is supported for compatibility in table CSS, but it maps to slate-like styling. For new code, keep using the **slate** rules in this file.
- For new generated code, prioritize CSS-only classes above before introducing custom one-off class names for equivalent behavior.

## Interactive state utilities (`item-*`)

The `item-*` classes encode the **idle → hover → active** transparent palette used across the design system. They turn any block into a *ghost-style* interactive surface (transparent idle, tinted hover) **without rewriting hover/active rules every time**.

Reach for them whenever you build:

- **Nav items** (sidebar links, navbar links, breadcrumbs, tab-like rows)
- **Interactive chips / tags** (clickable, dismissible, counters with `:hover`)
- **List rows** that highlight on hover (command palette items, mention rows, file rows)
- **Custom segmented controls / toolbar-style buttons** outside of `<Toolbar>`
- **Status-tinted action rows** (e.g. a destructive "Move to trash" row)

### Variants

| Class | Idle | Hover (with `(hover: hover)`) | `:active` / `.active` |
| -- | -- | -- | -- |
| **`item-primary`** | transparent, inherits color | `bg-primary-700/10` + `text-primary-700` | `bg-primary-700/10` + `text-primary-700` |
| **`item-success`** | transparent + `text-success-600` | `bg-success-100` + `text-success-700` | `bg-success-200` + `text-success-700` |
| **`item-info`** | transparent + `text-info-600` | `bg-info-500/5` + `text-info-600` | `bg-info-500/5` + `text-info-600` |
| **`item-warning`** | transparent + `text-warning-500` | `bg-warning-100` + `text-warning-600` | `bg-warning-200` + `text-warning-600` |
| **`item-danger`** | transparent + `text-danger-500` | `bg-danger-100` + `text-danger-600` | `bg-danger-200` + `text-danger-600` |
| **`item-light`** | transparent + `text-slate-600` | `bg-slate-100` + `text-slate-900` | `bg-slate-200` + `text-slate-900` |
| **`item-dark`** | transparent + `text-slate-300` | `bg-slate-700` + white | `bg-slate-800` + white |

Properties of the family:

1. **They only own color + background-color** (idle / hover / active). Layout — **padding, font-size, border-radius, gap, width, icon size** — stays the responsibility of the consumer (Tailwind utilities or your own CSS).
2. **Hover** is gated by `@media (hover: hover)` so touch devices don't get stuck on a hover style.
3. **Selected state** is opt-in via the **`.active`** class. `item-*` styles `.active` identically to `:active`, so a router-driven menu item only needs `clsx('item-primary', isCurrent && 'active')`.
4. **Disabled state** is **not** part of `item-*`. Add `disabled:opacity-50 disabled:pointer-events-none` (or your own disabled token) on `<button>` / `<a aria-disabled>`.

### Examples

```tsx
{/* Sidebar / nav item with router-driven active state */}
<a
  href='/dashboard'
  className={clsx(
    'item-primary flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
    isActive && 'active',
  )}
>
  <DashboardIcon />
  Dashboard
</a>

{/* Interactive filter chip with a counter */}
<button
  type='button'
  className='item-light inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs'
>
  In progress
  <span className='font-semibold'>12</span>
</button>

{/* Status row — destructive action */}
<button
  type='button'
  className='item-danger flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium'
>
  Move to trash
  <kbd className='text-xs'>⌫</kbd>
</button>

{/* Custom segmented control / ad-hoc toolbar */}
<div className='inline-flex gap-1 rounded-lg border border-slate-200 p-1'>
  <button type='button' className='item-primary rounded-md px-2 py-1 text-sm active'>Bold</button>
  <button type='button' className='item-primary rounded-md px-2 py-1 text-sm'>Italic</button>
  <button type='button' className='item-primary rounded-md px-2 py-1 text-sm'>Underline</button>
</div>

{/* Top navbar links */}
<nav className='flex items-center gap-1'>
  <a className='item-light rounded-md px-3 py-2 text-sm' href='/'>Home</a>
  <a className='item-light rounded-md px-3 py-2 text-sm active' href='/docs'>Docs</a>
  <a className='item-light rounded-md px-3 py-2 text-sm' href='/pricing'>Pricing</a>
</nav>
```

### Rules for AI code generation

1. **Default to `item-*`** instead of hand-writing `hover:bg-slate-100` / `hover:bg-primary-100` chains for any new chip, counter, nav item, breadcrumb item, segmented control, or list row that needs ghost-style interactivity. Using arbitrary Tailwind palettes (`hover:bg-blue-50`, `hover:bg-zinc-100`, `hover:bg-rose-50`, …) here is the same kind of drift as the **slate vs neutral** rule earlier — `item-*` is the single source of truth for **transparent → tinted** interaction tones.
2. **Pick the variant by intent, not aesthetics**: `primary` for default brand emphasis, `success` / `warning` / `danger` for status-tinted rows, `info` for soft informational accents, `light` for neutral chrome, `dark` for surfaces on dark backgrounds.
3. **Selected state = `.active`**, not `data-active` / `aria-selected` styling. `item-*` already styles `.active` identically to `:active`. Combine with router state, e.g. ``clsx('item-primary', match && 'active')``.
4. **Don't fight the family.** If you find yourself adding `hover:bg-*` / `hover:text-*` next to an `item-*` class to "fix" the color, **swap the variant** instead.
5. **Static vs interactive separation:**
   - Use **`.badge` + `.badge-{tone}`** for **static** labels (status pills, counts that don't react to pointer events).
   - Use **`item-*`** for **interactive** surfaces (button / anchor / `role='button'`).
   - A chip that is both visually a badge **and** clickable can compose them: `class='badge badge-light item-light rounded-full'` — but only if the hover behavior is desired.
6. **Compound components first.** If a Polyms component already exists (`Button`, `Toolbar`, `Tabs`, `Menu`, `Field`, …), prefer it. `item-*` is for **ad-hoc** surfaces (custom nav row, custom chip, breadcrumb item, …) where no exported component fits.
7. **Stay tokenized for variants on internal CSS.** Inside your own component CSS, you can mirror this pattern with CSS variables and `color-mix(in oklab, var(--your-variant) 10%, transparent)` — that's exactly how `.toolbar-button` and `.btn` are built. Don't inline raw hex values.

## Conventions when composing UI

- Prefer exports from **`@polyms/core-ui`** before reimplementing the same patterns.
- **Tailwind** + **`clsx()`** for conditional classes.
- **Button:** use typed props — **`variant`**, **`size`**, **`outlined`**, **`rounded`**, **`icon`**, **`tooltip`**, etc. — per **`ButtonProps`**, not only raw classes.
- Extending primitives: follow **`useRender.ComponentProps<…>`** patterns already used in the library types.

## Logical direction spacing (start/end over left/right)

To keep layouts RTL-friendly and consistent, prefer logical-direction utilities and properties.

- **Spacing utilities:** use `ms-*` / `me-*` and `ps-*` / `pe-*` instead of `ml-*` / `mr-*` and `pl-*` / `pr-*` for new generated code.
- **Borders:** prefer `border-s-*` / `border-e-*` over `border-l-*` / `border-r-*` where direction matters.
- **CSS properties:** prefer `margin-inline-start` / `margin-inline-end`, `padding-inline-start` / `padding-inline-end`, and `inset-inline-*` instead of physical left/right properties.
- **Fallback rule:** if existing local code in a file is still physical (`ml`, `mr`, etc.), follow nearby style for minimal diffs; default to logical start/end for all new code.

Example:

```tsx
<div className='flex items-center gap-2 ps-3 pe-2'>
  <span className='me-2'>Label</span>
  <button className='ms-auto'>Action</button>
</div>
```

## Documentation

- **Repository:** https://github.com/polyms/core-ui  
- **README:** `README.md` in this package.  
- **Source of truth:** If this file disagrees with **TypeScript types** for your version, **trust the types**.
