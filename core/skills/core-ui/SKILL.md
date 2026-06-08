---
name: core-ui
description: Build UI with @polyms/core-ui, a React 19 component library with compound components, semantic theming, programmatic overlays, and CSS utilities. Use when importing from @polyms/core-ui, using Button, Modal, Offcanvas, Menu, NavigationMenu, Tabs, Toolbar, Toast, Field, Checkbox, Radio, Select, or applying design-system classes like item-*, badge, table, bg-body, text-fg, and slate colors.
---

# @polyms/core-ui

Use this skill when building or reviewing UI that consumes `@polyms/core-ui`.

## Hard Rules

1. Import from the package barrel only: `import { Button, Modal } from '@polyms/core-ui'`.
2. Never use deep imports such as `@polyms/core-ui/button`.
3. Trust the installed `node_modules/@polyms/core-ui/index.d.ts` over memory or examples.
4. Use `slate` for gray UI chrome. Do not use `neutral-*`.
5. Use semantic tones: `primary`, `success`, `warning`, `danger`, `light`, `dark`.
6. Keep compound component trees intact. Do not invent standalone imports like `ModalHeader`.
7. Do not restyle library-owned shells with large Tailwind bundles unless it is a documented override.
8. For transparent hover/active surfaces, use `item-*` classes instead of hand-written `hover:bg-*`.

## Before Generating UI

1. Check the relevant symbol in `index.d.ts`.
2. Pick the closest exported component before writing ad-hoc markup.
3. Read the focused reference for the task:
   - Component composition: [components.md](components.md)
   - Theme, color, dark mode: [theming.md](theming.md)
   - CSS-only classes and `item-*`: [css-utilities.md](css-utilities.md)
   - App setup, CSS imports, overlay containers: [setup.md](setup.md)

## App Shell Checklist

- Import either the built CSS file `styles-<hash>.css` or Tailwind entry `styles/tailwind.css`.
- Wrap app content with `Toast` and mount `Toast.Container` once.
- Mount `Modal.Container` once before calling `useModalStore.getState().showModal(...)`.
- Mount `Offcanvas.Container` once before calling `useOffcanvasStore.getState().showOffcanvas(...)`.
- Install `zustand` in the consumer app when using programmatic modal/offcanvas stores.

## Default Patterns

```tsx
import { Button, Modal, Toast } from '@polyms/core-ui'

export function App() {
  return (
    <Toast>
      <Modal.Container />
      <main>{/* routes */}</main>
      <Toast.Container />
    </Toast>
  )
}
```

Use `clsx()` for conditional classes and keep app-specific layout classes on wrappers you own, not on library popup/shell roots.
