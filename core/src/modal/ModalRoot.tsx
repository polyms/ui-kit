import { Dialog } from '@base-ui/react/dialog'

// ── Types ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalRootProps extends Dialog.Root.Props {}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

export const ModalRoot = (props: ModalRootProps) => <Dialog.Root {...props} />
