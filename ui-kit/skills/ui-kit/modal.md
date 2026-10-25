---
description: >-
  Modal and Offcanvas rules for agents. API and examples: https://ui.polyms.dev/docs/modal.md
  and https://ui.polyms.dev/docs/offcanvas.md. Form inside the overlay → also load field.md.
---

# Modal and Offcanvas

Read https://ui.polyms.dev/docs/modal.md and, for an edge panel, https://ui.polyms.dev/docs/offcanvas.md. This file is the rules those pages do not enforce by themselves.

`Modal` is centered and blocking (confirm, create, edit). `Offcanvas` slides from an edge (filters, detail, nav). Toast, Popover, and Tooltip are not substitutes for a delete confirm.

## Rules

- Keep the compound tree. Do not import `ModalHeader` or `OffcanvasTitle`. Do not pass `title` on `Modal.Content`.
- One `autoFocus` per modal. Form in the body → the first `Field.Control`. Confirm-only (no inputs) → the footer primary action, never Cancel.
- Footer `Modal.Close` is ghost: `render={<Button … />}`, omit `variant`, label in `children`. Do not close with a plain `Button onClick`.
- `Modal.Trigger`, `Offcanvas.Trigger`, and a labeled `Offcanvas.Close` use `render={<Button … />}`.
- `Offcanvas.Description` is a direct child of `Offcanvas.Content`, before `Offcanvas.Body`. There is no `Offcanvas.Footer`.
- `showModal` / `showOffcanvas` need the matching `Container` mounted once and `zustand` in the app. See [setup.md](setup.md). `closeModal` / `closeOffcanvas` wait 300ms for the exit transition.
- Long modal bodies set `scrollable` on `Modal.Content`.
- A dirty form confirms in a nested `Modal` before backdrop, Escape, or swipe dismiss.

## Pre-flight

- [ ] **Primitive** — Modal vs Offcanvas matches the task.
- [ ] **Tree** — Modal has Header, Body, and Footer. Offcanvas has Header, optional Description, and Body.
- [ ] **Container** — programmatic open has `Modal.Container` or `Offcanvas.Container`.
- [ ] **Buttons** — triggers and labeled closes go through `render={<Button … />}`.
- [ ] **Focus** — one `autoFocus`, on the first input when the body is a form.
- [ ] **Scroll** — `scrollable` when the body is long.
