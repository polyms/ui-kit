import { Dialog } from '@base-ui/react/dialog'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function Offcanvas(props: Dialog.Root.Props) {
  return <Dialog.Root {...props} />
}

Offcanvas.displayName = 'Offcanvas'
