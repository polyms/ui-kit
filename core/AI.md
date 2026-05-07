# AI & developer notes for consuming `@polyms/core-ui`

This file ships inside the npm package so assistants and developers follow the same conventions when **using** the library in an application. It is **not** the monorepo contributor guide (see the repository’s `AGENTS.md`).

## Package

- **Name:** `@polyms/core-ui`
- **Peers:** `react` and `react-dom` **>= 19.0.0**
- **Types:** Prefer **`index.d.ts`** and editor IntelliSense over guessing public APIs.

## What the main export contains

Everything comes from **one entry**: `@polyms/core-ui` (`index.mjs` / `index.d.ts`).

- **Polyms components** — e.g. `Button`, `Field`, `Modal`, `Select`, `Toast`, `Offcanvas`, `Menu`, `Tabs`, `Avatar`, …
- **Re-exports from Base UI** — e.g. `Accordion`, `NavigationMenu`, `Toggle`, `ToggleGroup`, plus **`useRender`** from `@base-ui/react/use-render`.
- **Hooks** — **usehooks-ts** is re-exported (e.g. `useBoolean`, `useEventCallback` — confirm names in types).
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
| Toast | `Toast` + `Toast.Container`; **`Toast.useToastManager`** for imperative use where applicable |

If code uses `ModalHeader` as a standalone import, it is likely wrong — use **`Modal.Header`** unless types say otherwise. Confirm names in **`index.d.ts`** for your installed version.

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
