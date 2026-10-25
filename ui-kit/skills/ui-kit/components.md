---
description: >-
  Composition rules — barrel import, dynamic import, useRender, mergeProps, built-in shells.
  Sub-topics → button, inputs, navigation, display, overlays. Field → field.md. Modal → modal.md.
disable-model-invocation: true
---

# Component composition

Prefer an exported component from `@polyms/ui-kit` before custom markup. The public trees and props are the markdown files linked from https://ui.polyms.dev/llms.txt. Confirm every symbol in `index.d.ts`.

- Import from `@polyms/ui-kit` only. `Toggle`, `ToggleGroup`, `useRender`, and `mergeProps` come from that barrel too.
- Do not invent flat names (`ModalHeader`, `FieldInput`). Slots are dot properties.
- Shells (`Modal.Content`, `Offcanvas.Content`, `Menu.Content`, `Select.Content`, `Accordion.Panel`) are already styled. Add layout classes to your children, not replacement padding, background, border, or shadow on the shell.
- Code-splitting: https://ui.polyms.dev/docs/dynamic.md. The factory resolves to a default export. `dynamic` and `LazyComponentLoader` are the same helper.
- Extending a primitive: https://ui.polyms.dev/docs/use-render.md and https://ui.polyms.dev/docs/merge-props.md. Pass `ref` through `useRender({ ref })`. `mergeProps` does not merge refs. React 19 does not need `forwardRef` for this pattern.
