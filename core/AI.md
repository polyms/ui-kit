# AI & developer notes for consuming `@polyms/core-ui`

This file ships inside the npm package so AI assistants and developers follow the same conventions when **using** the library in an application. It is **not** the monorepo contributor guide (see `AGENTS.md`).

## Package

- **Name:** `@polyms/core-ui`
- **Peers:** `react` and `react-dom` **>= 19.0.0**
- **Types:** Rely on **`index.d.ts`** and editor IntelliSense — do not guess public APIs.

## Main export

Everything comes from **one entry**: `@polyms/core-ui` (`index.mjs` / `index.d.ts`).

- **Polyms components** — `Button`, `Field`, `Modal`, `Select`, `Toast`, `Offcanvas`, `Menu`, `Tabs`, `Toolbar`, `Avatar`, …
- **Re-exports from Base UI** — `Accordion`, `NavigationMenu`, `Toggle`, `ToggleGroup`, **`useRender`** (from `@base-ui/react/use-render`).
- **Programmatic modals** — **`useModalStore`** with **`showModal`** / **`closeModal`** (see types in `index.d.ts`).
- **Code-splitting** — **`dynamic`** (lazy loader) — confirm availability in `index.d.ts`.

Do **not** use deep imports like `@polyms/core-ui/button`; use the barrel export.

## Colors

### Gray scale: slate, not neutral

Use **slate** (`--color-slate-*`, `text-slate-*`, `bg-slate-*`, `border-slate-*`, …) for all gray UI chrome alongside library components. **Do not** use **neutral** (`--color-neutral-*`, `text-neutral-*`, `bg-neutral-*`, …). When refactoring, replace `neutral` with the closest `slate` step.

Exception: third-party snippets or legacy pages — isolate or migrate gradually.

### Semantic tones

Express intent via named tones; **do not** substitute raw Tailwind palettes (`rose-*`, `emerald-*`, `amber-*`, …) for semantic roles.

| Intent | Tone |
| ------ | ---- |
| Brand / default emphasis | **`primary`** |
| Positive / completion | **`success`** |
| Caution / at-risk | **`warning`** |
| Error / destructive | **`danger`** |
| Surfaces / contrast | **`light`**, **`dark`** |

Default to `primary / success / warning / danger / light / dark` (and **slate** for neutral chrome) for all new code. Only use other Tailwind color families for explicitly documented, non-semantic accents.

## Compound components

Prefer **dot access** on the root export; never invent standalone top-level imports like `ModalHeader`.

| Area | Pattern |
|------|---------|
| Modal | `Modal`, `Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Close`, `Modal.Container` |
| Field | `Field`, `Field.Label`, `Field.Control`, `Field.Description`, `Field.Feedback`, `Field.Floating` |
| Select | `Select`, `Select.Trigger`, `Select.Content`, `Select.Item`, `Select.Group`, … |
| Menu | `Menu`, `Menu.Trigger`, `Menu.Content`, `Menu.Item`, … |
| Offcanvas | `Offcanvas`, `Offcanvas.Trigger`, `Offcanvas.Content`, `Offcanvas.Header`, … |
| Tabs | `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` |
| Toolbar | `Toolbar`, `Toolbar.Button`, `Toolbar.Link`, `Toolbar.Input`, `Toolbar.Group`, `Toolbar.Separator` |
| Toast | `Toast`, `Toast.Container`; **`Toast.useToastManager`** for imperative use |

### Composition trees

Keep the documented component tree intact. Use the root → **Trigger** → **Content** → semantic slots (`Header`, `Body`, `Footer`, `Item`, `Separator`, `Group`, …). **Do not** flatten slots into raw `<div>`s or separate semantic subcomponents from their expected parent — it breaks accessibility (title/description association, roving focus) and library CSS (sibling selectors, fixed regions).

#### Modal

`Modal.Content` owns the portal/backdrop/shell and accepts **`size`**, **`centered`**, **`scrollable`**. `Modal.Header` renders the close button by default.

```tsx
<Modal>
  <Modal.Trigger>Open</Modal.Trigger>
  <Modal.Content size='lg' title='Account settings'>
    <Modal.Header>Account settings</Modal.Header>
    <Modal.Body>{/* main content */}</Modal.Body>
    <Modal.Footer>
      <Button variant='primary'>Save</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

#### Offcanvas

`Offcanvas.Description` must be a **direct child of `Offcanvas.Content`** — not nested inside `Offcanvas.Title`. Bundled CSS uses `.offcanvas-heading + .offcanvas-description`; do not insert `Offcanvas.Body` between `Header` and `Description`.

```tsx
<Offcanvas>
  <Offcanvas.Trigger>Open</Offcanvas.Trigger>
  <Offcanvas.Content>
    <Offcanvas.Header>
      <Offcanvas.Title>Panel title</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Description>Optional subtitle.</Offcanvas.Description>
    <Offcanvas.Body>{/* scrollable content */}</Offcanvas.Body>
  </Offcanvas.Content>
</Offcanvas>
```

Omit `Description` when not needed.

#### Menu

Keep interactive options as **`Menu.Item`** (or `Menu.SubmenuTrigger`) so keyboard navigation, disabled state, and variants work. Use `variant='danger'` for destructive actions — **not** `text-rose-*` or manual classes.

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

Submenus use `Menu.SubmenuRoot` + `Menu.SubmenuTrigger` + nested `Menu.Content`:

```tsx
<Menu.SubmenuRoot>
  <Menu.SubmenuTrigger>Export</Menu.SubmenuTrigger>
  <Menu.Content sideOffset={0}>
    <Menu.Item>PDF</Menu.Item>
    <Menu.Item>PNG</Menu.Item>
  </Menu.Content>
</Menu.SubmenuRoot>
```

#### Toolbar

Wrap clickable items in **`Toolbar.Button`** for roving focus and `data-disabled` / `data-pressed` styling. To compose with `Toggle`, `Menu.Trigger`, `Select.Trigger`, etc., pass them through the **`render`** prop so the toolbar still owns keyboard navigation.

```tsx
<Toolbar aria-label='Formatting'>
  <Toolbar.Group aria-label='Text formatting'>
    <Toolbar.Button>Bold</Toolbar.Button>
    <Toolbar.Button>Italic</Toolbar.Button>
  </Toolbar.Group>
  <Toolbar.Separator orientation='vertical' />
  <Toolbar.Link href='#'>Docs</Toolbar.Link>
</Toolbar>

{/* Composing with Toggle */}
<Toolbar>
  <ToggleGroup className='toolbar-group' aria-label='Alignment'>
    <Toolbar.Button render={<Toggle />} value='left'>Left</Toolbar.Button>
    <Toolbar.Button render={<Toggle />} value='right'>Right</Toolbar.Button>
  </ToggleGroup>
</Toolbar>
```

For tooltips, pass `Toolbar.Button` to `Tooltip.Trigger` via its `render` prop. Place `Toolbar.Input` at the **end** of a horizontal toolbar to preserve text-cursor key behavior. Always provide `aria-label` on `Toolbar` and each `Toolbar.Group`.

### Built-in surfaces: no redundant utilities

Library primitives (`accordion`, `offcanvas-content`, `modal-*`, …) ship pre-styled shells — layout, padding, typography, and motion are already defined.

- **Do not** apply large Tailwind bundles (`flex`, `p-*`, `bg-*`, `rounded-*`, `shadow-*`, `width/height`) to library-owned roots (`Offcanvas.Content`, `Modal.Content`, `Menu.Content`, …) unless it is a documented one-off override.
- Prefer **component props** (`closeButton`, `backdrop`, `variant`, `size`, …) and **semantic children** over re-styling the shell.
- Apply `className` to **your own** content inside `Body`, custom slots, or layout wrappers you own.
- If the visual result is wrong, check **composition first** (missing `Header`, `Description` in wrong place, …) before adding utility overrides.

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

## Programmatic modals (Zustand)

Use **`useModalStore`** (`showModal` / `closeModal`). **zustand** is external — install it in the consumer:

```bash
pnpm add zustand
```

Mount **`Modal.Container`** once in the tree when using `showModal`; otherwise content will not appear.

## Imports

```ts
import { Button, Modal, Field } from '@polyms/core-ui'
```

When unsure a symbol exists, check **`node_modules/@polyms/core-ui/index.d.ts`**.

## Styles

- **Pre-built CSS:** import the hashed file `styles-<hash>.css` from `node_modules/@polyms/core-ui/` (hash changes per release).
- **Tailwind v4:** use `styles/tailwind.css` for apps compiling Tailwind 4 with a compatible pipeline.

The stylesheet covers exported components; consumers must import it (or the Tailwind entry) to activate those rules. Trust **on-disk paths** and `package.json` for the installed version.

## CSS-only UI classes

These patterns are CSS classes only — no React component export. When no exported React component exists (e.g. `Table`), generate semantic HTML + these classes instead of inventing a new component API.

- **Table:** `.table`, `.table-sm`, `.table-lg`, `.table-striped`, `.table-hover`, `.table-bordered`, `.table-borderless`, `.table-active`, `.table-group-divider`, `.caption-top`, `thead.thead-light`.
- **Badge:** `.badge`, sizes (`.badge-lg`, `.badge-xl`), tones (`.badge-primary`, `.badge-success`, `.badge-info`, `.badge-warning`, `.badge-danger`, `.badge-light`, `.badge-dark`).
- **Card:** `.card`, `.card-body`.
- **Link:** `.link`, `.link-primary`, `.link-danger`, `.link-light`, `.stretched-link`.
- **Skeleton:** `.skeleton`.
- **Typography:** `.h1` … `.h6`.
- **Z-index:** `.z-dropdown`, `.z-sticky`, `.z-fixed`, `.z-toolbar`, `.z-offcanvas`, `.z-modal`, `.z-popover`, `.z-tooltip`, `.z-toast`, …
- **Layout:** `.@page`, `.container-page` (container-query based page layout).
- **Utilities:** `.border-light`, `.border-{t|r|b|l|s|e|x|y}-light`, `.bg-light`, state classes `.item-primary` … `.item-dark`.

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

## Interactive state utilities (`item-*`)

`item-*` classes encode the **idle → hover → active** transparent palette used across the design system: transparent idle, tinted hover. They replace hand-written hover/active chains for ghost-style interactive surfaces.

Use for: nav/sidebar links, interactive chips/tags, hoverable list rows (command palette, file rows), custom segmented controls, status-tinted action rows.

### Variants

| Class | Idle | Hover | Active / `.active` |
| -- | -- | -- | -- |
| **`item-primary`** | transparent, inherits color | `bg-primary-700/10` + `text-primary-700` | same as hover |
| **`item-success`** | `text-success-600` | `bg-success-100` + `text-success-700` | `bg-success-200` + `text-success-700` |
| **`item-info`** | `text-info-600` | `bg-info-500/5` + `text-info-600` | same as hover |
| **`item-warning`** | `text-warning-500` | `bg-warning-100` + `text-warning-600` | `bg-warning-200` + `text-warning-600` |
| **`item-danger`** | `text-danger-500` | `bg-danger-100` + `text-danger-600` | `bg-danger-200` + `text-danger-600` |
| **`item-light`** | `text-slate-600` | `bg-slate-100` + `text-slate-900` | `bg-slate-200` + `text-slate-900` |
| **`item-dark`** | `text-slate-300` | `bg-slate-700` + white | `bg-slate-800` + white |

Properties:
1. Only controls **color + background-color**. Layout (padding, border-radius, font-size, gap, …) is the consumer's responsibility.
2. Hover is gated by `@media (hover: hover)` — touch devices won't get stuck on hover style.
3. **Selected state** = `.active` class. Works with router state: `clsx('item-primary', isCurrent && 'active')`.
4. **Disabled** is not built in — add `disabled:opacity-50 disabled:pointer-events-none` yourself.

### Examples

```tsx
{/* Nav item with router-driven active state */}
<a
  href='/dashboard'
  className={clsx('item-primary flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium', isActive && 'active')}
>
  <DashboardIcon />
  Dashboard
</a>

{/* Interactive filter chip */}
<button type='button' className='item-light inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs'>
  In progress <span className='font-semibold'>12</span>
</button>

{/* Destructive action row */}
<button type='button' className='item-danger flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium'>
  Move to trash <kbd className='text-xs'>⌫</kbd>
</button>

{/* Segmented control */}
<div className='inline-flex gap-1 rounded-lg border border-slate-200 p-1'>
  <button type='button' className='item-primary rounded-md px-2 py-1 text-sm active'>Bold</button>
  <button type='button' className='item-primary rounded-md px-2 py-1 text-sm'>Italic</button>
  <button type='button' className='item-primary rounded-md px-2 py-1 text-sm'>Underline</button>
</div>

{/* Navbar links */}
<nav className='flex items-center gap-1'>
  <a className='item-light rounded-md px-3 py-2 text-sm' href='/'>Home</a>
  <a className='item-light rounded-md px-3 py-2 text-sm active' href='/docs'>Docs</a>
  <a className='item-light rounded-md px-3 py-2 text-sm' href='/pricing'>Pricing</a>
</nav>
```

### Rules

1. **Default to `item-*`** instead of hand-writing `hover:bg-*` / `hover:text-*` for ghost-style surfaces. Arbitrary palettes (`hover:bg-blue-50`, `hover:bg-zinc-100`, …) here are the same kind of drift as **slate vs neutral** — `item-*` is the single source of truth for transparent → tinted interaction.
2. **Pick variant by intent:** `primary` for brand emphasis, `light` for neutral chrome, `dark` for dark backgrounds, `success/warning/danger/info` for status-tinted rows.
3. **Selected = `.active`**, not `data-active` / `aria-selected` styling. If you need to add `hover:bg-*` next to `item-*` to fix the color, swap the variant instead.
4. **Static vs interactive:** `.badge` + `.badge-{tone}` for non-interactive labels; `item-*` for interactive surfaces. Composing both is valid: `class='badge badge-light item-light rounded-full'`.
5. **Compound components first:** if a Polyms component exists (`Button`, `Toolbar`, `Menu`, …), prefer it. `item-*` is for ad-hoc surfaces with no matching export.
6. **Tokenized in CSS:** inside your own component CSS, mirror with `color-mix(in oklab, var(--variant) 10%, transparent)` — don't inline hex values.

## Composing UI

- Prefer exports from **`@polyms/core-ui`** before re-implementing patterns.
- **Tailwind** + **`clsx()`** for conditional classes.
- **Button:** use typed props (`variant`, `size`, `outlined`, `rounded`, `icon`, `tooltip`, …) per `ButtonProps`, not raw classes.
- Extending primitives: follow **`useRender.ComponentProps<…>`** patterns from library types.

## Logical direction spacing (RTL-friendly)

Prefer logical-direction utilities for all new code:

- Spacing: `ms-*` / `me-*`, `ps-*` / `pe-*` over `ml-*` / `mr-*`, `pl-*` / `pr-*`
- Borders: `border-s-*` / `border-e-*` over `border-l-*` / `border-r-*`
- CSS: `margin-inline-start/end`, `padding-inline-start/end`, `inset-inline-*`
- In existing files still using physical direction, follow nearby style for minimal diffs.

```tsx
<div className='flex items-center gap-2 ps-3 pe-2'>
  <span className='me-2'>Label</span>
  <button className='ms-auto'>Action</button>
</div>
```

## Documentation

- **Repository:** https://github.com/polyms/core-ui
- **README:** `README.md` in this package.
- **Source of truth:** If this file conflicts with TypeScript types for your installed version, **trust the types**.
