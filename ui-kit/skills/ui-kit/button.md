---
description: >-
  Button rules for agents. API and examples: https://ui.polyms.dev/docs/button.md.
  Omit `type` on `<Button>` unless it is `submit` or `reset`. Never write `type='button'`.
---

# Button

## Type

Read https://ui.polyms.dev/docs/button.md for props, sizes, and examples. Apply these rules on top of that page.

- Omit `type` unless it is `submit` or `reset`. Never write `type='button'`. The component already sets it. When `render` is set, that default is not injected.
- There is no `content` prop.
- Prefer `Button` props (`variant`, `size`, `rounded`, `icon`, `outlined`) over hand-written `btn-*` classes. No `variant` is ghost. There is no `secondary` variant.
- Icon-only buttons use `icon`, `size='lg'` or `xl`, and `aria-label`. Do not shrink a library button with `className='size-6 p-0'`.
- Style triggers and labeled closes with `render={<Button … />}` and put the label in `children`. Do not put `className='btn …'` on the primitive alone.

| Primitive                                                               | Rule                                                                              |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Modal.Trigger`, `Menu.Trigger`, `Popover.Trigger`, `Offcanvas.Trigger` | `render={<Button … />}`                                                           |
| Footer `Modal.Close`                                                    | `render={<Button … />}`, omit `variant` (ghost)                                   |
| Body `Offcanvas.Close`                                                  | `render={<Button … />}` for a labeled dismiss                                     |
| `Collapsible.Trigger`                                                   | `render={<Button />}` when it should look like a button; omit `variant` for ghost |

## Touch targets

Use at least a 44×44px target for interactive controls. For icon-only buttons, prefer `size='lg'` or `size='xl'` and add `min-h-11 min-w-11` when the rendered control is smaller. Do not shrink library buttons with layout classes.
