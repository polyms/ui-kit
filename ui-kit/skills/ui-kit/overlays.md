---
description: >-
  Popover and Tooltip rules. Blocking flows → modal.md.
---

# Popover and Tooltip

These are lightweight overlays, not modals. A blocking confirm is [modal.md](modal.md).

| Surface | Doc                                   | Rule                                                                                                                                           |
| ------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Popover | https://ui.polyms.dev/docs/popover.md | `Popover.Trigger` uses `render={<Button … />}`. `title` and `description` go on `Popover.Content`. No focus trap and no `Modal.Container`.     |
| Tooltip | https://ui.polyms.dev/docs/tooltip.md | Hint on hover or focus. Prefer `tooltip` on `Button` when the hint is on a button. Do not put interactive actions in a tooltip; use `Popover`. |
