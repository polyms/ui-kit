# Setup

Use this when wiring `@polyms/core-ui` into a consumer app.

## Install

```bash
pnpm add @polyms/core-ui
```

`react` and `react-dom` must be `>=19.0.0`. Install `zustand` when using programmatic modals or offcanvas stores.

```bash
pnpm add zustand
```

## Imports

Import components from the package barrel.

```tsx
import { Button, Field, Modal } from '@polyms/core-ui'
```

Do not deep import feature modules.
When unsure a symbol exists, open `node_modules/@polyms/core-ui/index.d.ts`.

## Styles

Consumers must import the package styles. Pick one path based on the app build pipeline:

- Pre-built CSS: import the installed `styles-<hash>.css` file from `node_modules/@polyms/core-ui/`.
- Tailwind v4 pipeline: import `@polyms/core-ui/styles/tailwind.css`.

Trust the installed package files for exact paths because the hashed CSS filename changes by release.

## Toast

Mount `Toast.Container` once under `Toast`.

```tsx
import { Toast } from '@polyms/core-ui'

export function App() {
  return (
    <Toast>
      {/* routes/layout */}
      <Toast.Container />
    </Toast>
  )
}
```

## Programmatic Modal

Mount `Modal.Container` once before using `showModal`.

```tsx
import { Button, Modal, useModalStore } from '@polyms/core-ui'

function App() {
  return (
    <>
      <Modal.Container />
      {/* routes/layout */}
    </>
  )
}

function DeleteButton() {
  const open = () =>
    useModalStore.getState().showModal(
      'delete-item',
      <Modal.Content size='sm'>
        <Modal.Header>Delete item?</Modal.Header>
        <Modal.Body>This cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Button onClick={() => useModalStore.getState().closeModal('delete-item')} variant='danger'>
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>
    )

  return <Button onClick={open}>Delete</Button>
}
```

`closeModal` sets `open: false` first, then removes the entry after 300ms so exit transitions can finish.

## Programmatic Offcanvas

Mount `Offcanvas.Container` once before using `showOffcanvas`.

```tsx
import { Offcanvas, useOffcanvasStore } from '@polyms/core-ui'

function App() {
  return (
    <>
      <Offcanvas.Container />
      {/* routes/layout */}
    </>
  )
}

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

`closeOffcanvas` follows the same 300ms exit animation before unmount. Close via `Offcanvas.Close`, `closeOffcanvas(id)`, Escape, backdrop click, or swipe handled by `Offcanvas.Container`.
