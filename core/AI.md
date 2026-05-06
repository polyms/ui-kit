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

## Conventions when composing UI

- Prefer exports from **`@polyms/core-ui`** before reimplementing the same patterns.
- **Tailwind** + **`clsx()`** for conditional classes.
- **Button:** use typed props — **`variant`**, **`size`**, **`outlined`**, **`rounded`**, **`icon`**, **`tooltip`**, etc. — per **`ButtonProps`**, not only raw classes.
- Extending primitives: follow **`useRender.ComponentProps<…>`** patterns already used in the library types.

## Documentation

- **Repository:** https://github.com/polyms/core-ui  
- **README:** `README.md` in this package.  
- **Source of truth:** If this file disagrees with **TypeScript types** for your version, **trust the types**.
