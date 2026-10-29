---
description: >-
  Theme rules — neutral chrome, semantic tones, dark mode, surface tokens, item-* ghost surfaces.
---

# Theming

Token names and the dark palette are https://ui.polyms.dev/docs/dark-mode.md, https://ui.polyms.dev/design-system.md, and https://ui.polyms.dev/design-tokens.md. After an upgrade, read https://ui.polyms.dev/releases.md before renaming a color utility.

- Gray chrome uses `neutral` (`text-neutral-500`, `border-neutral-300`, `var(--color-neutral-400)`). Do not use `zinc`, `gray`, or `stone` for that job.
- Intent colors are `primary`, `success`, `warning`, `danger`, `info`, `light`, and `dark`. Do not substitute `rose`, `emerald`, `amber`, or `blue` for those roles.
- Dark mode is the `dark` class on `<html>` or an ancestor. Prefer `bg-body`, `text-fg`, `text-muted`, `bg-surface`, `bg-surface-2`, `bg-input`, and `border-line`. Use Tailwind `dark:` only for a one-off override.
- Brand accent overrides `--color-primary-*` after the library styles. Check contrast in both light and dark.
- Ghost hover outside a component uses `item-*`. In custom CSS, mirror that with `color-mix(in oklab, var(--variant) var(--control-tint-hover), transparent)`, not a hardcoded hex. The pressed step is `--control-tint-active`.
- Shared control chrome is `--control-radius`, `--control-ring`, `--control-ring-width`, `--control-ring-danger`, and `--control-tint-*`. Toggle groups and toolbars use `--group-radius`. Menus, popovers, and select popups use `--popup-radius` and `--popup-shadow`. A modal uses `--dialog-radius`; an offcanvas uses `--sheet-radius`. Both panels read `--overlay-bg`, and the scrim is `--overlay-backdrop`. These names are CSS variables, not Tailwind utilities. Only `--control-ring` changes under `.dark`.
- New layout spacing prefers logical directions: `ms-*` / `me-*`, `ps-*` / `pe-*`, `border-s-*` / `border-e-*`.
