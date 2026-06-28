---
description: >-
  @polyms/core-ui Modal and Offcanvas — same overlay pattern (Container, showModal, showOffcanvas), compound trees,
  scrollable, render Button on triggers. Read for modal, dialog, offcanvas, drawer, confirmation. Form in body → field.md.
---

# Modal & Offcanvas

Deep reference for **`Modal`** and **`Offcanvas`** — same overlay pattern (compound tree, portal shell, programmatic store + **`Container`**), different layout (centered dialog vs edge panel).

Read for **dialogs**, **drawers**, **confirmations**, **`showModal`**, **`showOffcanvas`**.

Setup: [setup.md](setup.md). `Button` + `render` on triggers: [components.md#compose-button-through-render](components.md#compose-button-through-render). Forms inside body: [field.md](field.md) — compose at usage site.

## Choose which

| Use             | When                                                                                  |
| --------------- | ------------------------------------------------------------------------------------- |
| **`Modal`**     | Confirmations, create/edit flows, focused tasks, nested dialogs                       |
| **`Offcanvas`** | Filters, detail panels, settings, nav, supplementary content without leaving the page |

Both: declarative `<Root>` + `Trigger` + `Content` tree, or `use*Store.getState().show*(id, <Content>…)`. Mount matching **`Container`** once (see [setup.md](setup.md)).

|           | Modal                           | Offcanvas                                          |
| --------- | ------------------------------- | -------------------------------------------------- |
| Container | `Modal.Container`               | `Offcanvas.Container`                              |
| Store     | `useModalStore`                 | `useOffcanvasStore`                                |
| Open      | `showModal(id, element)`        | `showOffcanvas(id, element)`                       |
| Close     | `Modal.Close`, `closeModal(id)` | `Offcanvas.Close`, `closeOffcanvas(id)`            |
| Dismiss   | Escape, backdrop                | Escape, backdrop, swipe (`swipeDirection` on root) |

---

## Modal

**Tree:** `Modal` → `Modal.Trigger` + `Modal.Content` → `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Close`.

```tsx
import { Button, Modal } from '@polyms/core-ui'

;<Modal>
  <Modal.Trigger render={<Button variant='primary' />}>Edit profile</Modal.Trigger>
  <Modal.Content size='lg' scrollable>
    <Modal.Header>Edit profile</Modal.Header>
    <Modal.Body>{/* Field trees — field.md */}</Modal.Body>
    <Modal.Footer>
      <Modal.Close render={<Button rounded size='xl' />}>Cancel</Modal.Close>
      <Button variant='primary'>Save</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

| Rule                       | Detail                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Trigger / footer close** | `render={<Button … />}` with **`children`** for labeled footer close — not `className='btn …'` on primitive alone |
| **Title**                  | `Modal.Header` only — no `title` on `Modal.Content`                                                               |
| **Header close**           | Icon `Modal.Close` in header when `close={true}` (default); `close={false}` to hide                               |
| **Long body**              | `scrollable` on `Modal.Content`                                                                                   |
| **Full screen**            | `size='full'`; often `centered={false}`                                                                           |
| **No fake dialogs**        | No `fixed inset-0` div overlays                                                                                   |

Controlled: `<Modal open={open} onOpenChange={setOpen}>`. Prefer `onOpenChange` over manual backdrop.

Programmatic API: [Programmatic overlays](#programmatic-overlays).

Footer = actions only — no `Field` roots in `Modal.Footer`.

---

## Offcanvas

**Tree:** `Offcanvas` → `Offcanvas.Trigger` + `Offcanvas.Content` → `Offcanvas.Header` (`Offcanvas.Title`), `Offcanvas.Description`, `Offcanvas.Body`, `Offcanvas.Close`.

No `Offcanvas.Footer` — actions live in `Offcanvas.Body` or header area.

```tsx
import { Button, Offcanvas } from '@polyms/core-ui'

;<Offcanvas swipeDirection='right'>
  <Offcanvas.Trigger render={<Button variant='primary' outlined />}>Open filters</Offcanvas.Trigger>
  <Offcanvas.Content size='lg'>
    <Offcanvas.Header>
      <Offcanvas.Title>Filters</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Description>Optional subtitle.</Offcanvas.Description>
    <Offcanvas.Body>
      {/* Field trees or lists — field.md */}
      <Offcanvas.Close render={<Button rounded />}>Done</Offcanvas.Close>
    </Offcanvas.Body>
  </Offcanvas.Content>
</Offcanvas>
```

| Rule                 | Detail                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**          | `render={<Button … />}` — same as `Modal.Trigger`; not `className='btn …'` on primitive alone                                       |
| **Description slot** | `Offcanvas.Description` is a **direct child** of `Offcanvas.Content` — not inside `Offcanvas.Title`, not after `Offcanvas.Body`     |
| **Body dismiss**     | `Offcanvas.Close render={<Button … />}>` with **`children`** for labeled actions (e.g. Done)                                        |
| **Swipe**            | `swipeDirection` on `Offcanvas` root: `left` \| `right` \| `up` \| `down`                                                           |
| **No fake drawers**  | No hand-rolled slide-in panels                                                                                                      |
| **Size**             | `size` on `Offcanvas.Content`: `sm` … `3xl`, `full` — width (left/right) or height (up/down)                                        |
| **Mobile**           | Full-width bottom drawer regardless of `size`                                                                                       |
| **Close button**     | `closeButton={false}` on `Offcanvas.Content` to hide built-in icon closes (mobile header + inner chrome)                            |
| **Built-in close**   | Library renders icon-only `Offcanvas.Close` with `className='offcanvas-close'` — do not restyle with `btn-*`; use `aria-label` only |

Controlled: `<Offcanvas open={open} onOpenChange={setOpen}>`.

Programmatic API: [Programmatic overlays](#programmatic-overlays).

---

## Programmatic overlays

Requires **`Modal.Container`** / **`Offcanvas.Container`** in the app shell ([setup.md#app-shell](setup.md#app-shell)) and **`zustand`** in the consumer app.

| Store               | Open                                                          | Close                                                            |
| ------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| `useModalStore`     | `showModal(id, <Modal.Content>…full tree…</Modal.Content>)`   | `Modal.Close`, `closeModal(id)`, Escape, backdrop                |
| `useOffcanvasStore` | `showOffcanvas(id, <Offcanvas.Content>…</Offcanvas.Content>)` | `Offcanvas.Close`, `closeOffcanvas(id)`, Escape, backdrop, swipe |

`closeModal` / `closeOffcanvas` set `open: false` first, then remove the entry after **300ms** so exit transitions finish. Reusing an `id` replaces the previous panel.

Pass a **full compound tree** as the second argument — same Header/Body/Footer rules as declarative modals.

```tsx
import { Button, Modal, useModalStore } from '@polyms/core-ui'

function confirmDelete() {
  useModalStore.getState().showModal(
    'delete-item',
    <Modal.Content size='sm'>
      <Modal.Header>Delete this item?</Modal.Header>
      <Modal.Body>This cannot be undone.</Modal.Body>
      <Modal.Footer>
        <Modal.Close render={<Button rounded />}>Cancel</Modal.Close>
        <Button onClick={() => useModalStore.getState().closeModal('delete-item')} variant='danger'>
          Delete
        </Button>
      </Modal.Footer>
    </Modal.Content>
  )
}
```

```tsx
import { Offcanvas, useOffcanvasStore } from '@polyms/core-ui'

function openNotifications() {
  useOffcanvasStore.getState().showOffcanvas(
    'notifications',
    <Offcanvas.Content>
      <Offcanvas.Header>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>You're all caught up.</Offcanvas.Body>
    </Offcanvas.Content>
  )
}
```

---

## Composing with other components

| Body content        | Read                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Form fields         | [field.md](field.md) — in `Modal.Body` or `Offcanvas.Body`; `scrollable` on `Modal.Content` for long forms |
| Destructive confirm | `Button variant='danger'` in `Modal.Footer` or body actions                                                |
| Tables / lists      | [css-utilities.md](css-utilities.md) `.table` in body                                                      |

---

## Anti-patterns

**Modal:** `ModalHeader` imports; `title=` on `Modal.Content`; bare `Modal.Content` without Header/Body/Footer; `showModal` without `Modal.Container`; footer `Button onClick` instead of `Modal.Close`.

**Offcanvas:** `OffcanvasTitle` as separate import; `Description` nested in `Title` or below `Body`; `showOffcanvas` without `Offcanvas.Container`.

**Both:** custom portal/backdrop markup; `className='btn …'` on `Modal.Trigger` / footer `Modal.Close` / `Offcanvas.Trigger` / body `Offcanvas.Close` instead of `render={<Button … />}` (built-in icon close in `Offcanvas.Content` chrome is library-owned — do not replace with `btn-*`).

---

## Pre-flight

- [ ] Correct primitive — Modal vs Offcanvas
- [ ] Full compound tree (Modal: Header, Body, Footer; Offcanvas: Header, Description placement, Body)
- [ ] Matching `Container` mounted if using `showModal` / `showOffcanvas`
- [ ] `Modal.Trigger`, footer `Modal.Close`, `Offcanvas.Trigger`, and body `Offcanvas.Close` use `render={<Button … />}` when styled as buttons (not built-in offcanvas icon chrome)
- [ ] `scrollable` on `Modal.Content` when body is long or has forms
