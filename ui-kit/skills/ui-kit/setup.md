---
description: >-
  Wire @polyms/ui-kit into an app — install, styles, Toast/Modal/Offcanvas containers.
disable-model-invocation: true
---

# Setup

Install steps, registry, and style import: https://ui.polyms.dev/installation.md. Do not deep-import feature paths. When a symbol is uncertain, open `node_modules/@polyms/ui-kit/index.d.ts`.

`react` and `react-dom` must be `>=19`. Install `zustand` only when calling `useModalStore` or `useOffcanvasStore`.

## App shell

Mount overlay containers once. Omit `Modal.Container` and `Offcanvas.Container` when the app only uses declarative `<Modal>` / `<Offcanvas>` trees.

```tsx
import { Modal, Offcanvas, Toast } from '@polyms/ui-kit'

export function App() {
  return (
    <Toast>
      <Modal.Container />
      <Offcanvas.Container />
      <main>{/* routes */}</main>
      <Toast.Container />
    </Toast>
  )
}
```

`Toast.Container` stays under `Toast`. Patterns: https://ui.polyms.dev/docs/toast.md. Programmatic overlays: [modal.md](modal.md).

## Agent skill

```bash
pnpm exec ui-kit-skill
```

Copies the skill into `.cursor/skills/ui-kit`, `.claude/skills/ui-kit`, and `.agents/skills/ui-kit`. Re-run after upgrading `@polyms/ui-kit`. Installer options: https://ui.polyms.dev/agent-skill.md.
